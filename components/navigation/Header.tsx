'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { solutions } from '@/app/solutions/solutionsData';
import { productCategories } from '@/app/products/productCategories';

/* ======================================================
   SUB-SUBMENU FLAGS (0 = hide, 1 = show)
   These control Antennas / Power Solutions / Network Switches
====================================================== */
const SUBMENU_FLAGS: Record<string, 0 | 1> = {
  antennas: 0,
  power_solutions: 0,
  network_switches: 0,
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);

  /* ---------------- Lock body scroll on mobile ---------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ---------------- Reset on route change ---------------- */
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const h = compact ? 64 : 80;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
  }, [compact]);

  const navigate = (href: string) => {
    if (href === '/' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(href);
    }
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ================= DESKTOP PRODUCTS MENU ================= */
  const desktopProductMenu = useMemo(
    () =>
      productCategories.map((cat) => {
        const showSub = SUBMENU_FLAGS[cat.id] === 1;

        return (
          <div key={cat.id} className="border-b border-neutral-200 last:border-0">
            <Link
              href={`/products#${cat.id}`}
              className="block px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg"
            >
              {cat.name}
            </Link>

            {showSub &&
              cat.products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products#${p.id}`}
                  className="block pl-8 pr-4 py-2 text-xs text-neutral-700 hover:text-green-700 transition"
                >
                  {p.name}
                </Link>
              ))}
          </div>
        );
      }),
    []
  );

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#FCFBF9]/95 backdrop-blur-md border-b border-neutral-200">
        <nav className={`container mx-auto px-4 ${compact ? 'h-16' : 'h-20'} flex items-center justify-between transition-all duration-200`}>
          {/* LOGO */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-neutral-900 font-bold text-xl group"
            onClick={handleHomeClick}
          >
            <div className="relative">
              <Image src="/logo.png" alt="Network Orbiter" width={compact ? 34 : 42} height={compact ? 34 : 42} className="relative z-10 transition-all duration-200" />
              <div className="absolute inset-0 bg-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="tracking-tight">
              Network <span className="text-green-600">Orbiter</span>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="/" onClick={handleHomeClick}>Home</NavLink>

            {/* SOLUTIONS */}
            <HoverDropdown
              label="Solutions"
              open={openMenu === 'solutions'}
              onOpen={() => setOpenMenu('solutions')}
              onClose={() => setOpenMenu(null)}
              href="/solutions"
            >
              {solutions.map((s) => (
                <Link
                  key={s.id}
                  href={`/solutions/${s.id}`}
                  className="block px-4 py-3 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg"
                >
                  {s.navLabel}
                </Link>
              ))}
            </HoverDropdown>

            {/* PRODUCTS */}
            <HoverDropdown
              label="Products"
              open={openMenu === 'products'}
              onOpen={() => setOpenMenu('products')}
              onClose={() => setOpenMenu(null)}
              href="/products"
            >
              {desktopProductMenu}
            </HoverDropdown>

            <NavLink href="/about">About</NavLink>
            <NavLink href="/#demo-form">Contact</NavLink>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="lg:hidden text-neutral-900 text-2xl"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>
      </header>

      {/* ================= MOBILE BACKDROP ================= */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#FCFBF9] z-50
        transform transition-transform duration-300 ease-out lg:hidden
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}
      >
        <div className="h-full overflow-y-auto p-6 space-y-4">
          <MobileLink label="Home" onClick={() => navigate('/')} />

          {/* SOLUTIONS */}
          <MobileAccordion
            title="Solutions"
            open={openMenu === 'solutions'}
            onToggle={() =>
              setOpenMenu(openMenu === 'solutions' ? null : 'solutions')
            }
          >
            {solutions.map((s) => (
              <MobileSubLink
                key={s.id}
                label={s.navLabel}
                onClick={() => navigate(`/solutions/${s.id}`)}
              />
            ))}
          </MobileAccordion>

          {/* PRODUCTS */}
          <MobileAccordion
            title="Products"
            open={openMenu === 'products'}
            onToggle={() =>
              setOpenMenu(openMenu === 'products' ? null : 'products')
            }
          >
            {productCategories.map((cat) => {
              const showSub = SUBMENU_FLAGS[cat.id] === 1;

              return (
                <div key={cat.id} className="space-y-1">
                  <MobileSubLink
                    label={cat.name}
                    onClick={() => navigate(`/products#${cat.id}`)}
                  />

                  {showSub &&
                    cat.products.map((p) => (
                      <MobileSubSubLink
                        key={p.id}
                        label={p.name}
                        onClick={() => navigate(`/products#${p.id}`)}
                      />
                    ))}
                </div>
              );
            })}
          </MobileAccordion>

          <MobileLink label="About" onClick={() => navigate('/about')} />
          <MobileLink label="Contact" onClick={() => navigate('/#demo-form')} />
        </div>
      </aside>
    </>
  );
};

/* ======================================================
   REUSABLE COMPONENTS (ALL IN SAME FILE)
====================================================== */

const NavLink = ({ href, onClick, children }: any) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="text-neutral-800 hover:text-green-700 transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

/* ---- Desktop hover dropdown (no flicker) ---- */
const HoverDropdown = ({ label, open, onOpen, onClose, children, href }: any) => (
  <div
    className="relative"
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
  >
    {/* Hover bridge to prevent gap */}
    <div className="absolute -bottom-3 left-0 w-full h-3" />

    {href ? (
      <Link href={href} className="flex items-center gap-1 text-neutral-800 hover:text-green-700 transition-colors duration-200 font-medium">
        {label}
        <Chevron open={open} />
      </Link>
    ) : (
      <button className="flex items-center gap-1 text-neutral-800 hover:text-green-700 transition-colors duration-200 font-medium">
        {label}
        <Chevron open={open} />
      </button>
    )}

    <div
      className={`absolute top-full left-0 mt-1 w-80 bg-[#FCFBF9] border border-neutral-200 rounded-xl shadow-2xl backdrop-blur-xl
      transition-all duration-200 origin-top
      ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      {children}
    </div>
  </div>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ---- Mobile components ---- */

const MobileLink = ({ label, onClick }: any) => (
  <button
    onClick={onClick}
    className="block w-full text-left text-neutral-900 py-3 text-lg hover:text-green-700 transition-colors"
  >
    {label}
  </button>
);

const MobileSubLink = ({ label, onClick }: any) => (
  <button
    onClick={onClick}
    className="block w-full text-left text-neutral-800 py-2 text-sm hover:text-green-700 transition-colors"
  >
    {label}
  </button>
);

const MobileSubSubLink = ({ label, onClick }: any) => (
  <button
    onClick={onClick}
    className="block w-full text-left pl-6 text-neutral-700 py-1 text-xs hover:text-green-700 transition-colors"
  >
    {label}
  </button>
);

const MobileAccordion = ({ title, open, onToggle, children }: any) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-neutral-900 py-2"
    >
      {title}
      <Chevron open={open} />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {children}
    </div>
  </div>
);

export default Header;
