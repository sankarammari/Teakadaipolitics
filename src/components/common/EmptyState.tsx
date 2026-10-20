import Link from "next/link";

interface EmptyStateProps {
  title: string;
  message: string;
  action?: { label: string; href: string };
  children?: React.ReactNode;
}

export function EmptyState({ title, message, action, children }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-rule px-6 py-10 text-center">
      <p className="headline text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper hover:bg-ink/85"
        >
          {action.label}
        </Link>
      )}
      {children}
    </div>
  );
}
