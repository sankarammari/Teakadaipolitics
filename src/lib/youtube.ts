const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Accepts a bare 11-character id or a youtube.com / youtu.be URL and returns
 * the id, or null when the value is empty or not a recognisable YouTube link.
 */
export function parseYouTubeId(value: string | undefined | null): string | null {
  const input = value?.trim();
  if (!input) return null;
  if (ID_PATTERN.test(input)) return input;

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, "");
  let candidate: string | null = null;

  if (host === "youtu.be") {
    candidate = url.pathname.slice(1).split("/")[0];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") candidate = url.searchParams.get("v");
    else {
      const match = url.pathname.match(/^\/(embed|shorts|live|v)\/([^/?#]+)/);
      candidate = match?.[2] ?? null;
    }
  }

  return candidate && ID_PATTERN.test(candidate) ? candidate : null;
}

/**
 * Privacy-enhanced embed URL. Autoplay is off unless the caller is responding
 * to the reader pressing play (the click-to-load player).
 */
export function getYouTubeEmbedUrl(value: string, { autoplay = false } = {}): string | null {
  const id = parseYouTubeId(value);
  if (!id) return null;
  const params = new URLSearchParams({ rel: "0", modestbranding: "1", autoplay: autoplay ? "1" : "0" });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export function getYouTubeWatchUrl(value: string): string | null {
  const id = parseYouTubeId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}
