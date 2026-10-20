import { FileWarning } from "lucide-react";

export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-start gap-2.5 rounded-md border-2 border-dashed border-tea bg-tea-light px-4 py-3 font-sans text-[0.95rem]">
      <FileWarning className="mt-0.5 size-5 shrink-0 text-tea" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
