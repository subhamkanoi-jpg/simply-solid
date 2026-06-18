import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-[6vw] text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold tracking-tight">
        Nothing here.
      </h1>
      <p className="mt-4 text-muted">
        This page didn&apos;t make the cut — we removed everything that
        didn&apos;t matter.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block bg-ink px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
      >
        Back home
      </Link>
    </section>
  );
}
