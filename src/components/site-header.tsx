"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Nexzora Solution home" onClick={() => setMenuOpen(false)}>
        <Image src="/nexzora-logo.png" alt="Nexzora Solution" width={453} height={239} priority />
      </Link>
      <button
        className={`menu-toggle${menuOpen ? " menu-toggle-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>
      <nav id="main-navigation" className={menuOpen ? "site-nav site-nav-open" : "site-nav"} aria-label="Main navigation">
        {pages.map((page) => (
          <Link key={page.href} href={page.href} onClick={() => setMenuOpen(false)} aria-current={pathname === page.href ? "page" : undefined}>
            <span>{page.label}</span>
          </Link>
        ))}
        <Link className="nav-quote" href="/contact" onClick={() => setMenuOpen(false)}>
          Get a Quote <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
