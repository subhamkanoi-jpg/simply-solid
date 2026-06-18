import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-[6vw] py-9 text-[11px] uppercase tracking-[0.2em] text-muted">
      <div>© {new Date().getFullYear()} SIMPLY SOLID</div>
      <div className="flex gap-7">
        <Link href="/products" className="transition-colors hover:text-ink">
          Shop
        </Link>
        <a href="#" className="transition-colors hover:text-ink">
          Instagram
        </a>
        <a href="#" className="transition-colors hover:text-ink">
          TikTok
        </a>
        <a href="#" className="transition-colors hover:text-ink">
          Press
        </a>
      </div>
    </footer>
  );
}
