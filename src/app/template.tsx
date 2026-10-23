/**
 * Re-mounts on every navigation, so each new page eases in
 * (.page-enter in globals.css; off for reduced motion).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
