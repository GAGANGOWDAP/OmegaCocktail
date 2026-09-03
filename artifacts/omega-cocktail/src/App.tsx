import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { profiles, services, syrupItems, syrupNames, toSlug, type Service, type SyrupItem } from '@/data/site-data';

const queryClient = new QueryClient();
const syrupImage = `${import.meta.env.BASE_URL}assets/products/cocktail-syrup-range.png`;

function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  }[size];

  return (
    <Link href="/" className="group inline-flex items-center gap-3.5" data-testid="link-logo">
      <div className={`relative grid ${sizeClasses} shrink-0 place-items-center overflow-hidden rounded-full border border-primary/60 bg-black p-0.5 shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_14px_rgba(220,165,75,0.3)]`}>
        <img
          src={`${import.meta.env.BASE_URL}logo-gold.png`}
          alt="OMEGA Cocktails Bar Consultants Logo"
          className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="font-mono-ui text-[11px] leading-[1.15] tracking-[0.22em] text-foreground">
        OMEGA<br />
        <span className="font-medium text-primary">COCKTAIL.CO</span>
      </span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServiceOpen(false);
    setProductOpen(false);
  };

  const isHome = location === '/';
  const isServices = location.startsWith('/services');
  const isProducts = location.startsWith('/products');
  const isAbout = location === '/about';
  const isContact = location === '/contact';

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 md:px-10 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex" aria-label="Primary navigation">
          {/* HOME */}
          <Link
            href="/"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isHome ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-active={isHome}
            data-testid="link-home"
          >
            Home
          </Link>

          {/* SERVICES DROPDOWN */}
          <div className="relative" onMouseEnter={() => setServiceOpen(true)} onMouseLeave={() => setServiceOpen(false)}>
            <button
              type="button"
              onClick={() => setServiceOpen((value) => !value)}
              className={`inline-flex items-center gap-1.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                isServices ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
              }`}
              aria-expanded={serviceOpen}
              data-testid="button-services-menu"
            >
              <span>Services</span>
              <ChevronDown
                size={13}
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${serviceOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}
              />
            </button>
            <div
              className={`absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-sm border border-border/80 bg-card/95 p-2 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                serviceOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
              }`}
            >
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-sm px-3.5 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-primary"
                  data-testid={`link-service-${service.slug}`}
                >
                  <span>{service.name}</span>
                  <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* PRODUCTS DROPDOWN */}
          <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
            <button
              type="button"
              onClick={() => setProductOpen((value) => !value)}
              className={`inline-flex items-center gap-1.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                isProducts ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
              }`}
              aria-expanded={productOpen}
              data-testid="button-products-menu"
            >
              <span>Products</span>
              <ChevronDown
                size={13}
                strokeWidth={1.75}
                className={`transition-transform duration-300 ${productOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}
              />
            </button>
            <div
              className={`absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-sm border border-border/80 bg-card/95 p-2 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                productOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
              }`}
            >
              <Link
                href="/products/cocktail-syrups"
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-sm px-3.5 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-primary"
                data-testid="link-cocktail-syrups-menu"
              >
                <span>Cocktail Syrups</span>
                <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          {/* ABOUT */}
          <Link
            href="/about"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isAbout ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-active={isAbout}
            data-testid="link-about"
          >
            About
          </Link>

          {/* CONTACT US CTA */}
          <Link
            href="/contact"
            className="gold-button inline-flex items-center justify-center rounded-sm border border-primary/70 bg-transparent px-4.5 py-2 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition-all duration-200 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_2px_14px_rgba(220,165,75,0.22)] active:scale-[0.98]"
            data-testid="link-contact"
          >
            Contact Us
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-sm border border-border/80 text-primary transition-colors hover:border-primary md:hidden"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION OVERLAY */}
      <div className={`border-t border-border/80 bg-background/95 backdrop-blur-md md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4" aria-label="Mobile navigation">
          <Link
            href="/"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors ${
              isHome ? 'text-primary font-semibold' : 'text-foreground/90 hover:text-primary'
            }`}
            data-testid="mobile-link-home"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setServiceOpen((value) => !value)}
            className={`flex items-center justify-between border-b border-border/60 px-1 py-3.5 text-left font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors ${
              isServices ? 'text-primary font-semibold' : 'text-foreground/90 hover:text-primary'
            }`}
            data-testid="mobile-button-services"
          >
            <span>Services</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${serviceOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
          </button>
          {serviceOpen && (
            <div className="grid grid-cols-1 border-b border-border/60 pb-2 pl-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={closeMenu}
                  className="py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`mobile-link-service-${service.slug}`}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setProductOpen((value) => !value)}
            className={`flex items-center justify-between border-b border-border/60 px-1 py-3.5 text-left font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors ${
              isProducts ? 'text-primary font-semibold' : 'text-foreground/90 hover:text-primary'
            }`}
            data-testid="mobile-button-products"
          >
            <span>Products</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${productOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
          </button>
          {productOpen && (
            <div className="border-b border-border/60 pb-2 pl-3">
              <Link
                href="/products/cocktail-syrups"
                onClick={closeMenu}
                className="block py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="mobile-link-cocktail-syrups"
              >
                Cocktail Syrups
              </Link>
            </div>
          )}

          <Link
            href="/about"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors ${
              isAbout ? 'text-primary font-semibold' : 'text-foreground/90 hover:text-primary'
            }`}
            data-testid="mobile-link-about"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-4 inline-flex w-full items-center justify-center rounded-sm border border-primary bg-transparent px-4 py-3.5 text-center font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            data-testid="mobile-link-contact"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/80 bg-secondary/40">
      <div className="page-shell grid gap-10 py-14 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
        {/* Column 1: Logo & Description */}
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground/90">
            A beverage studio for hospitality projects, bar teams, and considered events.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Navigate
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link
              href="/"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-link-home"
            >
              <span>Home</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </Link>

            <Link
              href="/services"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-link-services"
            >
              <span>Services</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </Link>

            <Link
              href="/products"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-link-products"
            >
              <span>Products</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </Link>

            <Link
              href="/about"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-link-about"
            >
              <span>About</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-link-contact"
            >
              <span>Contact Us</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Column 3: Direct Contact Details */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Direct
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a
              href="tel:+918971825137"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary"
              data-testid="footer-phone-manoj"
            >
              <span>+91 8971825137</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </a>

            <a
              href="mailto:mjsince1987@gmail.com"
              className="group relative inline-flex w-fit items-center text-muted-foreground transition-colors duration-200 hover:text-primary break-all"
              data-testid="footer-email-manoj"
            >
              <span>mjsince1987@gmail.com</span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Column 4: Location & Square Google Map */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Location
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Ejipura, Bengaluru-560047
          </p>
          <div className="mt-4 overflow-hidden rounded-sm border border-border/80 bg-black aspect-square w-36 max-w-full shadow-lg">
            <iframe
              title="OMEGA Studio Location Map"
              src="https://maps.google.com/maps?q=Ejipura,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0 brightness-[.85] contrast-[1.1] opacity-80 transition-opacity hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="footer-google-map"
            />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="border-t border-border/70 py-6">
        <div className="page-shell flex flex-col gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground/90 sm:flex-row sm:items-center sm:justify-between">
          <span>OMEGA COCKTAIL.CO</span>
          <span>© {currentYear} OMEGA COCKTAIL.CO</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918971825137?text=Hi%20OMEGA%20COCKTAIL.CO%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid h-11 w-11 place-items-center rounded-full border border-primary/50 bg-background/90 text-primary backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
        aria-label="Chat on WhatsApp"
        data-testid="floating-whatsapp"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.708-.518-5.247-1.42l-.376-.222-3.899 1.022 1.04-3.801-.244-.388c-1.002-1.597-1.533-3.468-1.532-5.389 0-5.447 4.433-9.88 9.883-9.88 2.64 0 5.12 1.028 6.985 2.894 1.864 1.866 2.89 4.348 2.889 6.988-.001 5.449-4.435 9.881-9.884 9.881m0-21.681C5.698.162.16 5.699.16 12.535c0 2.185.57 4.32 1.652 6.197L0 24l5.426-1.423c1.796.979 3.821 1.496 5.88 1.498h.005c6.837 0 12.375-5.538 12.376-12.374 0-3.305-1.287-6.413-3.626-8.752A12.316 12.316 0 0 0 12.051.162" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-[10px] font-mono-ui uppercase tracking-wider text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      {/* Instagram Floating Button */}
      <a
        href="https://www.instagram.com/omegacocktails.co?igsi=MmFoZGl5aTBjNzN3"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid h-11 w-11 place-items-center rounded-full border border-primary/50 bg-background/90 text-primary backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 hover:border-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
        aria-label="Follow on Instagram"
        data-testid="floating-instagram"
      >
        <Instagram size={20} />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-[10px] font-mono-ui uppercase tracking-wider text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Follow on Instagram
        </span>
      </a>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingSocials />
    </div>
  );
}

function SectionHeading({ kicker, title, body, align = 'left' }: { kicker: string; title: string; body?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h1 className="mt-5 font-display text-5xl leading-[.98] text-foreground md:text-7xl">{title}</h1>
      {body && <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{body}</p>}
    </div>
  );
}

function Rule() {
  return <div className="section-rule my-7" aria-hidden="true" />;
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`group inline-flex items-center gap-3 border-b pb-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] transition-colors ${light ? 'border-primary/50 text-primary hover:text-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`} data-testid={`link-${href.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`}>
    {children}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
  </Link>;
}

const slideshowImages = [
  `${import.meta.env.BASE_URL}assets/slideshow/slide-1.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-2.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-3.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-4.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-5.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-6.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-7.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-8.jpg`,
  `${import.meta.env.BASE_URL}assets/slideshow/slide-9.jpg`,
];

function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;

  return (
    <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-5 border border-primary/15" />
      <div className="absolute -right-5 -top-5 h-20 w-20 border-r border-t border-primary/60" />
      
      <div className="image-lift relative aspect-[.76] overflow-hidden bg-secondary border border-primary/20 shadow-2xl">
        {slideshowImages.map((src, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === prevIndex;

          return (
            <img
              key={src}
              src={src}
              alt={`OMEGA Studio Bar Craft ${idx + 1}`}
              className={`absolute inset-0 h-full w-full object-cover object-center brightness-[.88] contrast-[1.05] transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10'
                  : isPrev
                  ? 'opacity-100 scale-[1.02] z-5'
                  : 'opacity-0 scale-105 z-0'
              }`}
            />
          );
        })}
        
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/90 via-transparent to-black/20 pointer-events-none" />

        {/* Bottom Bar: Slide Dot Indicators */}
        <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-end">
          <div className="flex items-center gap-1.5">
            {slideshowImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  idx === currentIndex ? 'w-5 bg-primary' : 'w-1.5 bg-primary/40 hover:bg-primary/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[calc(100dvh-74px)] overflow-hidden border-b border-border/80">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,rgba(170,111,50,.18),transparent_30%),linear-gradient(110deg,hsl(var(--background))_18%,rgba(17,15,12,.73)_68%,hsl(var(--background))_100%)]" />
        <div className="page-shell grid min-h-[calc(100dvh-74px)] items-center gap-12 py-16 md:grid-cols-[1.05fr_.95fr] md:py-20">
          <div className="reveal">
            <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.26em] text-primary"><span className="h-px w-10 bg-primary/70" />After hours / O1</div>
            <h1 className="mt-8 max-w-xl font-display text-[clamp(4.2rem,10vw,8.5rem)] leading-[.82] tracking-[-.035em] text-foreground">Make the<br /><em className="text-primary">pour</em> matter.</h1>
            <p className="mt-9 max-w-md text-sm leading-7 text-muted-foreground md:text-base">OMEGA COCKTAIL.CO brings beverage thinking, bar craft, and hospitality operations into one precise point of view.</p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Link href="/services" className="gold-button inline-flex items-center gap-3 bg-primary px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/85" data-testid="button-explore-services">Explore Services <ArrowUpRight size={15} /></Link>
              <ArrowLink href="/products">View Products</ArrowLink>
            </div>
          </div>
          <HeroSlideshow />
        </div>
      </section>
      <section className="page-shell py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div className="reveal"><p className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-primary">A considered practice</p></div>
          <div className="reveal reveal-delay-1">
            <p className="font-display text-4xl leading-[1.05] text-foreground md:text-6xl">A bar is a room, a rhythm, and a reason to stay.</p>
            <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">For hospitality founders, venue owners, and event hosts, we work across the decisions that make the beverage experience feel like it belongs.</p>
            <div className="mt-9"><ArrowLink href="/about">Meet the people behind the work</ArrowLink></div>
          </div>
        </div>
      </section>
      <section className="border-y border-border/80 bg-secondary/35 py-20 md:py-28">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading kicker="The work" title="What we bring to the bar." body="Seven ways to enter the studio. One clear standard: make every decision count." /><ArrowLink href="/services" light>See all services</ArrowLink></div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
      <section className="page-shell py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_.95fr]">
          <div className="reveal order-2 md:order-1">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">The range / 21 varieties</p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.95] md:text-7xl">A little colour<br /><em>for the glass.</em></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">The supplied cocktail syrup range, presented as one complete source sheet. Explore the exact varieties in the collection.</p>
            <div className="mt-9"><ArrowLink href="/products/cocktail-syrups">Explore cocktail syrups</ArrowLink></div>
          </div>
          <Link href="/products/cocktail-syrups" className="image-lift order-1 block border border-primary/25 bg-black p-3 md:order-2" data-testid="link-home-syrup-range">
            <img src={syrupImage} alt="Complete flavour range cocktail syrup source sheet" className="w-full object-contain" />
          </Link>
        </div>
      </section>
      <section className="border-t border-border/80 bg-[#15100d] py-24 md:py-32">
        <div className="page-shell grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Start a conversation</p>
          <div><h2 className="max-w-3xl font-display text-5xl leading-[.95] md:text-7xl">Bring us the room<br />before it opens.</h2><div className="mt-9"><Link href="/contact" className="gold-button inline-flex items-center gap-3 border border-primary px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground" data-testid="button-home-contact">Contact the studio <ArrowUpRight size={15} /></Link></div></div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const isMaster = service.slug === 'all-services';

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative flex min-h-[265px] flex-col justify-between overflow-hidden p-6 transition-all duration-350 ease-out md:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none ${
        isMaster
          ? 'border border-primary/40 bg-[#16120e] hover:border-primary/80 hover:bg-[#1f1913] hover:shadow-[0_10px_35px_rgba(220,165,75,0.12)]'
          : 'border border-border/80 bg-card hover:border-primary/60 hover:bg-[#1a1612] hover:shadow-[0_8px_30px_rgba(220,165,75,0.08)]'
      } hover:scale-[1.02] hover:-translate-y-1.5`}
      data-testid={`card-service-${service.slug}`}
    >
      {/* Top Animated Gold Accent Line */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      {/* Header: Number & Emoji */}
      <div className="flex items-start justify-between">
        <span className="font-mono-ui text-[11px] font-medium tracking-wider text-primary/70 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-primary">
          {service.index}
        </span>
        {service.icon && (
          <span className="select-none font-display text-3xl opacity-85 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-100">
            {service.icon}
          </span>
        )}
      </div>

      {/* Content: Title & Description */}
      <div className="my-4">
        <h3 className="max-w-[13rem] font-display text-3xl leading-none text-foreground transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-white">
          {service.name}
        </h3>
        <p className="mt-4 text-xs leading-6 text-muted-foreground/80 transition-colors duration-300 ease-out group-hover:text-muted-foreground">
          {service.description}
        </p>
      </div>

      {/* CTA: VIEW DETAILS & Animated Underline */}
      <div className="mt-4 flex items-center justify-between">
        <span className="relative inline-flex items-center gap-2 font-mono-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-primary transition-transform duration-300 ease-out group-hover:translate-x-1.5">
          <span>VIEW DETAILS</span>
          <ArrowUpRight size={13} className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
        </span>
        {isMaster && (
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono-ui text-[8px] uppercase tracking-[0.2em] text-primary/90">
            Master Option
          </span>
        )}
      </div>
    </Link>
  );
}

function ServicesPage() {
  return (
    <div className="page-shell py-20 md:py-28">
      <SectionHeading
        kicker="Services / 07"
        title="The work behind the pour."
        body="A full-service beverage studio for hospitality projects, bars, breweries, events, and the teams that bring them to life."
      />
      <Rule />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return (
    <div className="page-shell py-16 md:py-28">
      <Link href="/services" className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary" data-testid="link-back-services"><ArrowLeft size={14} /> All services</Link>
      <div className="mt-16 grid gap-16 md:grid-cols-[.8fr_1.2fr]">
        <div><p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">{service.index} / OMEGA COCKTAIL.CO</p><h1 className="mt-6 font-display text-6xl leading-[.9] md:text-8xl">{service.name}</h1></div>
        <div className="max-w-2xl md:pt-14"><p className="font-display text-3xl leading-tight text-foreground md:text-5xl">{service.detail}</p><Rule /><p className="max-w-lg text-sm leading-7 text-muted-foreground">Bring the particulars of your project to the studio. The shape of the work begins with the brief.</p><div className="mt-9"><Link href="/contact" className="gold-button inline-flex items-center gap-3 bg-primary px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/85" data-testid={`button-contact-${service.slug}`}>Discuss this service <ArrowUpRight size={15} /></Link></div></div>
      </div>
      <div className="mt-24 grid gap-4 border-t border-border pt-8 md:grid-cols-3">{['A clear brief', 'A practical point of view', 'A room that works'].map((item, index) => <div key={item} className="border-l border-primary/50 pl-5"><span className="font-mono-ui text-[10px] text-primary">0{index + 1}</span><p className="mt-3 font-display text-2xl">{item}</p></div>)}</div>
      <div className="mt-24 border-t border-border pt-10"><p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Continue through the studio</p><div className="mt-7 grid gap-3 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group flex items-center justify-between border border-border bg-card p-5 hover:border-primary/60" data-testid={`related-service-${item.slug}`}><span className="font-display text-2xl">{item.name}</span><ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>)}</div></div>
    </div>
  );
}

function ProductsPage() {
  return (
    <div className="page-shell py-20 md:py-28">
      <SectionHeading kicker="Products / 01" title="A range with room to play." body="Cocktail Syrups, shown in the complete flavour range collection." />
      <div className="mt-14 grid gap-8 md:grid-cols-[1.05fr_.95fr] md:items-start">
        <div className="border border-primary/20 bg-card p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">OMEGA COCKTAIL SYRUPS</p>
          <h3 className="mt-3 font-display text-3xl text-foreground">21 Flavour Range</h3>
          <p className="mt-2 text-xs text-muted-foreground">Product visuals pending update</p>
        </div>
        <div className="border-t border-primary/50 pt-6 md:mt-12">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-primary">01 / Cocktail Syrups</p>
          <h2 className="mt-5 font-display text-5xl leading-none">
            The complete<br />
            <em>flavour range.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            Twenty-one varieties crafted for precision, balance, and high-volume bar service. Browse the collection by name.
          </p>
          <div className="mt-8">
            <ArrowLink href="/products/cocktail-syrups">View the range</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyrupImage({ index, alt }: { index: number; alt: string }) {
  return null;
}

function getSyrupCategories(syrup: SyrupItem): string[] {
  const categories = ['All', 'Syrups', 'Classic Cocktails'];
  const fruityNames = ['Jamun', 'Guava Chilli', 'Green Apple', 'Raspberry', 'Strawberry', 'Pineapple', 'Cherry', 'Watermelon', 'Peach', 'Green Melon', 'Litchi'];
  const citrusNames = ['Limoncello', 'Triple Sec', 'Paloma (Grapefruit)', 'Cucumber', 'Blue Curacao', 'Grenadine'];
  const signatureNames = ['Jamun', 'Guava Chilli', 'Pandan', 'Irish Cream', 'Cinnamon', 'Coconut', 'Limoncello'];

  if (fruityNames.includes(syrup.name)) categories.push('Fruity');
  if (citrusNames.includes(syrup.name)) categories.push('Citrus');
  if (signatureNames.includes(syrup.name)) categories.push('Signature');

  return categories;
}

function SyrupsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'az' | 'za' | 'number'>('default');

  const categories = ['All', 'Syrups', 'Classic Cocktails', 'Fruity', 'Citrus', 'Signature'];

  const filteredItems = syrupItems
    .filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && selectedCategory !== 'Syrups' && selectedCategory !== 'Classic Cocktails') {
        const itemCats = getSyrupCategories(item);
        if (!itemCats.includes(selectedCategory)) return false;
      }
      // Search query filter
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.recipe.cocktailName.toLowerCase().includes(q) ||
        item.recipe.garnish.toLowerCase().includes(q) ||
        item.recipe.method.toLowerCase().includes(q) ||
        item.recipe.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const idxA = syrupItems.findIndex((s) => s.slug === a.slug);
      const idxB = syrupItems.findIndex((s) => s.slug === b.slug);
      if (sortBy === 'az') return a.name.localeCompare(b.name);
      if (sortBy === 'za') return b.name.localeCompare(a.name);
      if (sortBy === 'number') return idxA - idxB;
      return idxA - idxB; // default
    });

  return (
    <div className="page-shell py-16 md:py-24">
      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
        data-testid="link-back-products"
      >
        <ArrowLeft size={14} /> Products
      </Link>

      {/* Hero Section */}
      <div className="mt-10 max-w-3xl">
        <SectionHeading
          kicker="Cocktail Syrups / 21 Varieties & Classic Recipes"
          title="Colour & Craft, held in reserve."
          body="Each syrup in the OMEGA collection is paired with a signature classic cocktail recipe developed for precision, balance, and high-volume bar service."
        />
      </div>

      <Rule />

      {/* Sticky Search & Filter Control Bar */}
      <div className="sticky top-[68px] z-30 my-8 border-y border-border/80 bg-background/95 py-5 backdrop-blur-md transition-all duration-300">
        <div className="flex flex-col gap-5">
          {/* Title & Search / Sort Header Row */}
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                21 Classic Recipes &amp; Syrups
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Select any syrup card to view complete recipe measurements, preparation method, and garnish guidance.
              </p>
            </div>

            {/* Search Input & Sort Dropdown Container */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <input
                  type="text"
                  aria-label="Search syrups, cocktails, or spirits"
                  placeholder="Search syrups, cocktails, or spirits..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-border/90 bg-card py-2.5 pl-10 pr-9 text-xs text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                  data-testid="input-search-syrups"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="sr-only">
                  Sort recipes
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto border border-border/90 bg-card px-3 py-2.5 font-mono-ui text-[11px] text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
                  data-testid="select-sort-syrups"
                >
                  <option value="default">Sort: Default</option>
                  <option value="az">Sort: A – Z</option>
                  <option value="za">Sort: Z – A</option>
                  <option value="number">Sort: Syrup Number</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Chips Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            <span className="shrink-0 font-mono-ui text-[9px] uppercase tracking-[0.2em] text-primary/80 mr-1">
              Filter:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.15em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-primary text-primary-foreground border border-primary font-semibold shadow-sm'
                      : 'border border-border/80 bg-card/70 text-muted-foreground hover:border-primary/60 hover:text-foreground'
                  }`}
                  data-testid={`filter-chip-${toSlug(cat)}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recipe Catalog Grid */}
      {filteredItems.length === 0 ? (
        <div className="my-16 border border-dashed border-border/80 bg-card/40 p-12 text-center">
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">No results match your search</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">No syrups or classic recipes found</h3>
          <p className="mt-2 text-xs text-muted-foreground">Try adjusting your search query or selecting another category filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="mt-6 inline-flex items-center gap-2 border border-primary px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const originalIndex = syrupItems.findIndex((s) => s.slug === item.slug);
            const syrupNumStr = String(originalIndex + 1).padStart(2, '0');

            return (
              <Link
                key={item.slug}
                href={`/products/cocktail-syrups/${item.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border/80 bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/60 hover:bg-[#1a1612] hover:shadow-[0_12px_35px_rgba(220,165,75,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
                data-testid={`card-product-${item.slug}`}
              >
                {/* Top Subtle Gold Accent Line */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                <div>
                  {/* Top Row: Syrup Number & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-ui text-[10px] font-medium tracking-wider text-primary">
                      SYRUP / {syrupNumStr}
                    </span>
                    <span className="font-mono-ui text-[8px] uppercase tracking-[0.18em] text-muted-foreground/80 border border-border/60 px-2 py-0.5 rounded-full bg-secondary/50">
                      Classic Recipe
                    </span>
                  </div>

                  {/* Main Syrup Heading */}
                  <h3 className="mt-3 font-display text-3xl leading-none text-foreground transition-colors group-hover:text-white">
                    {item.name}
                  </h3>

                  {/* Signature Serve & Cocktail Info */}
                  <div className="mt-4 border-t border-border/60 pt-4">
                    <span className="font-mono-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                      SIGNATURE SERVE
                    </span>
                    <h4 className="mt-1.5 font-display text-2xl leading-snug text-foreground transition-colors group-hover:text-primary">
                      {item.recipe.cocktailName}
                    </h4>
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground/90 transition-colors group-hover:text-muted-foreground">
                      {item.recipe.method}
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Garnish Info & VIEW RECIPE CTA */}
                <div className="mt-6 border-t border-border/50 pt-3">
                  <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 truncate">
                    <span className="text-primary/80 font-semibold">GARNISH:</span> {item.recipe.garnish}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="relative inline-flex items-center gap-1.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      <span>VIEW RECIPE</span>
                      <ArrowRight size={13} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProductDetailPage() {
  const { product } = useParams<{ product: string }>();
  const syrup = syrupItems.find((item) => item.slug === product || toSlug(item.name) === product);
  if (!syrup) return <NotFound />;

  const index = syrupItems.indexOf(syrup);
  const prevSyrup = syrupItems[(index - 1 + syrupItems.length) % syrupItems.length];
  const nextSyrup = syrupItems[(index + 1) % syrupItems.length];

  return (
    <div className="page-shell py-16 md:py-28">
      <Link href="/products/cocktail-syrups" className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary" data-testid="link-back-syrups">
        <ArrowLeft size={14} /> Back to Cocktail Syrups
      </Link>

      <div className="mt-12 grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
        {/* Left column: Syrup details */}
        <div>
          <div className="border border-border bg-card p-8">
            <p className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-primary">Range Index / {String(index + 1).padStart(2, '0')} of 21</p>
            <h3 className="mt-2 font-display text-4xl">{syrup.name} Syrup</h3>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Formulated for maximum aroma, precise sweetness balance, and clean mixability across classical, contemporary, and high-volume beverage applications.
            </p>
          </div>
        </div>

        {/* Right column: Classic Cocktail Recipe */}
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Classic Cocktail Recipe</p>
          <h1 className="mt-3 font-display text-5xl leading-[.92] text-foreground md:text-7xl">{syrup.recipe.cocktailName}</h1>

          <div className="mt-8 border border-primary/30 bg-card p-6 shadow-xl md:p-8">
            {/* Ingredients */}
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Ingredients</p>
              <ul className="mt-4 grid gap-3">
                {syrup.recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-3 border-b border-border/60 pb-2.5 text-sm md:text-base">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Method */}
            <div className="mt-8">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Preparation Method</p>
              <p className="mt-3 border-l-2 border-primary bg-secondary/40 p-4 text-sm leading-7 text-foreground md:text-base">
                {syrup.recipe.method}
              </p>
            </div>

            {/* Garnish */}
            <div className="mt-8 flex flex-col gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Garnish</p>
                <p className="mt-1 text-sm font-medium text-foreground">{syrup.recipe.garnish}</p>
              </div>
              <Link href="/contact" className="gold-button inline-flex items-center justify-center gap-2 border border-primary/60 px-4 py-2.5 font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground">
                Inquire for Bar Supply <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Navigation between recipes */}
          <div className="mt-10 flex items-center justify-between border-t border-border pt-6 font-mono-ui text-[10px] uppercase tracking-[0.16em]">
            <Link href={`/products/cocktail-syrups/${prevSyrup.slug}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft size={13} /> {prevSyrup.name}
            </Link>
            <Link href="/products/cocktail-syrups" className="text-muted-foreground transition-colors hover:text-primary">
              All 21 Recipes
            </Link>
            <Link href={`/products/cocktail-syrups/${nextSyrup.slug}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              {nextSyrup.name} <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page-shell py-20 md:py-28">
      <SectionHeading kicker="About / The studio" title="Two disciplines. One room." body="OMEGA COCKTAIL.CO brings beverage craft and hospitality project thinking together, from the first conversation to the finished service." />
      <div className="mt-20 grid gap-20">
        {profiles.map((profile, index) => <Profile key={profile.name} profile={profile} reverse={index % 2 === 1} />)}
      </div>
      <div className="mt-24 border-t border-border pt-10">
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">The point of contact</p>
        <div className="mt-7 max-w-xl">
          <div className="border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-3xl">Manoj Alphonse</h3>
            <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
              <p>+91 8971825137</p>
              <p>mjsince1987@gmail.com</p>
              <p>No 6, RA Road, Ejipura, Bengaluru-560047</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ profile, reverse }: { profile: typeof profiles[number]; reverse: boolean }) {
  const imageUrl = profile.image.startsWith('http')
    ? profile.image
    : `${import.meta.env.BASE_URL}${profile.image.replace(/^\//, '')}`;

  return (
    <article className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-20 ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>
      <div className="image-lift overflow-hidden border border-primary/20 bg-secondary">
        <img
          src={imageUrl}
          alt={profile.name}
          className={`aspect-[.9] w-full object-cover ${profile.name === 'Suresh Naidu' ? 'object-[center_28%]' : 'object-center'}`}
        />
      </div>
      <div>
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">{profile.eyebrow}</p>
        <h2 className="mt-5 font-display text-5xl leading-[.9] md:text-7xl">{profile.name}</h2>
        <p className="mt-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{profile.role}</p>
        <p className="mt-7 text-sm leading-7 text-muted-foreground">{profile.biography}</p>
        <Rule />
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Selected experience</p>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
          {profile.experience.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-shell py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        {/* Left Column: Heading & Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="space-y-4">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">
                CONTACT / THE NEXT POUR
              </p>
              <h1 className="font-display text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
                Tell us about the room.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground/90">
                Tell us what you’re building, and let’s create a space worth remembering.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="mt-12 space-y-6 border-t border-border/80 pt-8">
              <a
                href="tel:+918971825137"
                className="group flex items-start gap-4 text-sm text-foreground/90 transition-colors hover:text-primary"
                data-testid="contact-phone-manoj"
              >
                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">Phone</p>
                  <p className="mt-0.5 font-medium tracking-wide">+91 8971825137</p>
                </div>
              </a>

              <a
                href="mailto:mjsince1987@gmail.com"
                className="group flex items-start gap-4 text-sm text-foreground/90 transition-colors hover:text-primary"
                data-testid="contact-email-manoj"
              >
                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">Email</p>
                  <p className="mt-0.5 font-medium break-all">mjsince1987@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 text-sm text-foreground/90">
                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">Studio Location</p>
                  <p className="mt-0.5 font-medium leading-relaxed">No 6, RA Road, Ejipura, Bengaluru-560047</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="rounded-sm border border-border/80 bg-card/90 p-8 shadow-xl md:p-10">
          {submitted ? (
            <div className="flex min-h-[440px] flex-col items-start justify-center">
              <div className="grid h-12 w-12 place-items-center border border-primary text-primary">
                <Check size={22} />
              </div>
              <p className="mt-8 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Message received</p>
              <h2 className="mt-4 font-display text-5xl leading-none">
                The bar is<br /><em>open.</em>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
                Thank you for getting in touch. Your message has been noted by the studio.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 border-b border-primary/50 pb-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary hover:border-primary hover:text-foreground transition-colors"
                data-testid="button-send-another"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-6" data-testid="form-contact">
              {/* NAME Field */}
              <div>
                <label
                  htmlFor="name"
                  className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="mt-2.5 w-full border-b border-border/80 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:ring-0"
                  data-testid="input-name"
                />
              </div>

              {/* EMAIL Field */}
              <div>
                <label
                  htmlFor="email"
                  className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2.5 w-full border-b border-border/80 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:ring-0"
                  data-testid="input-email"
                />
              </div>

              {/* PHONE Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2.5 w-full border-b border-border/80 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:ring-0"
                  data-testid="input-phone"
                />
              </div>

              {/* MESSAGE Field */}
              <div>
                <label
                  htmlFor="message"
                  className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="mt-2.5 w-full resize-none border-b border-border/80 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:ring-0"
                  data-testid="input-message"
                />
              </div>

              {/* Send Message Button & Response Line */}
              <div className="mt-2">
                <button
                  type="submit"
                  className="gold-button group inline-flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(220,165,75,0.2)] active:scale-[0.99] sm:w-auto"
                  data-testid="button-submit-contact"
                >
                  <span>Send message</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </button>

                <p className="mt-4 font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70">
                  We usually respond within 24 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={HomePage} /><Route path="/services" component={ServicesPage} /><Route path="/services/:slug" component={ServiceDetailPage} /><Route path="/products" component={ProductsPage} /><Route path="/products/cocktail-syrups" component={SyrupsPage} /><Route path="/products/cocktail-syrups/:product" component={ProductDetailPage} /><Route path="/about" component={AboutPage} /><Route path="/contact" component={ContactPage} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => { document.title = 'OMEGA COCKTAIL.CO'; }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Shell>
            <Router />
          </Shell>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;