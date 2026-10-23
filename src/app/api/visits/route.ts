import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

/**
 * Site-wide visit counter. Every page view POSTs here once; GET only reads.
 *
 * On Netlify the total lives in Netlify Blobs (store "site-stats", key
 * "visits") and is incremented with an etag compare-and-swap so concurrent
 * visits are not lost. Anywhere Blobs isn't available (local `next dev`,
 * other hosts) it falls back to an in-memory count that resets on restart.
 */
export const dynamic = "force-dynamic";

const KEY = "visits";
let memoryCount = 0;

type Counter = { count: number };

function blobStore() {
  try {
    return getStore("site-stats", { consistency: "strong" });
  } catch {
    return null;
  }
}

async function readCount(): Promise<number> {
  const store = blobStore();
  if (!store) return memoryCount;
  try {
    const data = (await store.get(KEY, { type: "json" })) as Counter | null;
    return data?.count ?? 0;
  } catch {
    return memoryCount;
  }
}

async function increment(): Promise<number> {
  const store = blobStore();
  if (store) {
    try {
      for (let attempt = 0; attempt < 5; attempt++) {
        const current = await store.getWithMetadata(KEY, { type: "json" });
        const next = ((current?.data as Counter | undefined)?.count ?? 0) + 1;
        const result = current?.etag
          ? await store.setJSON(KEY, { count: next }, { onlyIfMatch: current.etag })
          : await store.setJSON(KEY, { count: next }, { onlyIfNew: true });
        if (result.modified) return next;
      }
    } catch {
      // Blobs unavailable: fall through to the in-memory counter
    }
  }
  memoryCount += 1;
  return memoryCount;
}

const json = (count: number) =>
  NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });

export async function GET() {
  return json(await readCount());
}

export async function POST() {
  return json(await increment());
}
