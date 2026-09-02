import { type FormEvent, type ReactNode, useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Flame,
  GlassWater,
  Grid,
  HeartHandshake,
  HelpCircle,
  Info,
  Layers,
  LucideIcon,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Package,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wine,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  profiles,
  services,
  syrupItems,
  syrupNames,
  toSlug,
  type Service,
  type SyrupItem,
  type SyrupCategory,
  type CocktailRecipe,
} from '@/data/site-data';

const queryClient = new QueryClient();

// High-resolution slideshow images
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

// Helper to scroll to top on navigation
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// Brand Logo Component
function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  }[size];

  return (
    <Link href="/" className="group inline-flex items-center gap-3.5 focus-visible:outline-none" data-testid="link-logo">
      <div className={`relative grid ${sizeClasses} shrink-0 place-items-center overflow-hidden rounded-full border border-primary/60 bg-black p-0.5 shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(220,165,75,0.35)]`}>
        <img
          src={`${import.meta.env.BASE_URL}logo-gold.png`}
          alt="OMEGA COCKTAIL.CO — Premium Syrups Logo"
          className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="font-mono-ui text-[11px] leading-[1.15] tracking-[0.22em] text-foreground">
        OMEGA<br />
        <span className="font-semibold text-primary">COCKTAIL.CO</span>
      </span>
    </Link>
  );
}

// Header Component
function Header({ onOpenB2B }: { onOpenB2B: (syrupName?: string) => void }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isHome = location === '/';
  const isAbout = location === '/about';
  const isProducts = location.startsWith('/products');
  const isApplications = location === '/applications';
  const isB2B = location === '/b2b';
  const isContact = location === '/contact';

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-border/60 bg-background/95 backdrop-blur-md py-1.5 shadow-xl' : 'border-b border-border/30 bg-background/80 backdrop-blur-sm py-2.5'}`}>
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 md:px-10 lg:px-12">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:gap-9 md:flex" aria-label="Primary navigation">
          <Link
            href="/"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isHome ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-home"
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isAbout ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-about"
          >
            About
          </Link>
          <Link
            href="/products"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isProducts ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-products"
          >
            Products
          </Link>
          <Link
            href="/applications"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isApplications ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-applications"
          >
            Applications
          </Link>
          <Link
            href="/b2b"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isB2B ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-b2b"
          >
            B2B
          </Link>
          <Link
            href="/contact"
            className={`font-mono-ui text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              isContact ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
            }`}
            data-testid="link-contact"
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenB2B()}
            className="gold-button inline-flex items-center justify-center rounded-sm border border-primary/80 bg-primary/10 px-4.5 py-2 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary transition-all duration-200 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_2px_14px_rgba(220,165,75,0.25)]"
            data-testid="button-get-quote"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Navigation Drawer */}
      <div className={`border-t border-border/80 bg-background/98 backdrop-blur-md md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5" aria-label="Mobile navigation">
          <Link
            href="/"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isHome ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isAbout ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            About
          </Link>
          <Link
            href="/products"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isProducts ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            Products (21 Varieties)
          </Link>
          <Link
            href="/applications"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isApplications ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            Applications
          </Link>
          <Link
            href="/b2b"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isB2B ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            B2B & Wholesale
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className={`border-b border-border/60 px-1 py-3.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] ${isContact ? 'text-primary font-semibold' : 'text-foreground/90'}`}
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onOpenB2B();
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-sm border border-primary bg-primary px-4 py-3.5 text-center font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary-foreground font-semibold"
          >
            Get a B2B Quote
          </button>
        </nav>
      </div>
    </header>
  );
}

// B2B Quote & Enquiry Modal Component
function B2BQuoteModal({
  isOpen,
  onClose,
  initialSyrup,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialSyrup?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSyrup, setSelectedSyrup] = useState(initialSyrup || '');

  useEffect(() => {
    if (initialSyrup) setSelectedSyrup(initialSyrup);
  }, [initialSyrup]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-primary/40 bg-card p-6 md:p-10 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary">
              <Check size={28} />
            </div>
            <p className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Enquiry Received</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-foreground">Thank you for connecting.</h3>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Our B2B beverage team will review your requirement and reach out with wholesale pricing and sample pack information within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-8 gold-button inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-6 py-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary-foreground font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">OMEGA B2B & Wholesale Services</p>
            <h3 className="mt-2 font-display text-3xl md:text-4xl text-foreground">Request a B2B Quote</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Share your business requirements for bulk syrup orders, venue menu consultation, or sample kits.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="mt-1.5 w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Company / Venue Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Hotel / Bar / Café Name"
                    className="mt-1.5 w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Business Type *</label>
                  <select className="mt-1.5 w-full border-b border-border/80 bg-card py-2.5 text-xs text-foreground outline-none focus:border-primary">
                    <option value="bar">Bar / Pub / Lounge</option>
                    <option value="hotel">Hotel / Resort</option>
                    <option value="restaurant">Restaurant / Bistro</option>
                    <option value="cafe">Café / Bakery</option>
                    <option value="caterer">Catering / Event Agency</option>
                    <option value="distributor">Distributor / Retailer</option>
                    <option value="other">Other Beverage Business</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, Mumbai, Delhi"
                    className="mt-1.5 w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1.5 w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="mt-1.5 w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Primary Syrup Interest</label>
                  <select
                    value={selectedSyrup}
                    onChange={(e) => setSelectedSyrup(e.target.value)}
                    className="mt-1.5 w-full border-b border-border/80 bg-card py-2.5 text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="">All 21 Varieties (Full Catalogue)</option>
                    {syrupItems.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name} Syrup ({s.category})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Estimated Requirement</label>
                  <select className="mt-1.5 w-full border-b border-border/80 bg-card py-2.5 text-xs text-foreground outline-none focus:border-primary">
                    <option value="sample">Sample Kit / Evaluation</option>
                    <option value="small">1 – 5 Cases (Trial Order)</option>
                    <option value="medium">5 – 20 Cases / Month</option>
                    <option value="bulk">20+ Cases / Wholesale Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Message / Brief (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your menu concept or bulk requirements..."
                  className="mt-1.5 w-full resize-none border-b border-border/80 bg-transparent py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="gold-button mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-6 py-3.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
              >
                <span>Send B2B Quote Request</span>
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Detail Modal Component
function ProductDetailModal({
  syrup,
  onClose,
  onOpenB2B,
}: {
  syrup: SyrupItem | null;
  onClose: () => void;
  onOpenB2B: (name?: string) => void;
}) {
  if (!syrup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-primary/40 bg-card p-6 md:p-10 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X size={18} />
        </button>

        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          {/* Left: Product Info Card */}
          <div className="border border-border/80 bg-secondary/50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-ui text-[10px] font-semibold tracking-wider text-primary">
                  SYRUP INDEX / {syrup.index}
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono-ui text-[8px] uppercase tracking-wider text-primary">
                  {syrup.category}
                </span>
              </div>

              <h2 className="mt-4 font-display text-4xl leading-none text-foreground">{syrup.name}</h2>
              <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {syrup.tag}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{syrup.description}</p>
            </div>

            <div className="mt-8 border-t border-border/60 pt-4">
              <p className="font-mono-ui text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
                TECHNICAL SPECS
              </p>
              <div className="mt-3 grid gap-2 font-mono-ui text-[10px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>Pack Size:</span>
                  <span className="text-foreground">{syrup.volume} Professional Bottle</span>
                </div>
                <div className="flex justify-between">
                  <span>Shelf Life:</span>
                  <span className="text-foreground">12 Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="text-foreground">Cool, dry place</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Recipe & Applications */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
                SIGNATURE SERVE RECIPE
              </span>
              <h3 className="mt-2 font-display text-2xl text-foreground">{syrup.recipe.cocktailName}</h3>

              <div className="mt-4">
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                  Ingredients Ratio:
                </p>
                <ul className="mt-2 grid gap-1.5 text-xs text-foreground/90">
                  {syrup.recipe.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Preparation Method:</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/90">{syrup.recipe.method}</p>
              </div>

              <div className="mt-3">
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Garnish:</p>
                <p className="mt-1 text-xs text-primary">{syrup.recipe.garnish}</p>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Pairing Spirits:</p>
                <p className="mt-1 text-xs text-foreground/90">{syrup.pairingNotes}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenB2B(syrup.name);
              }}
              className="gold-button inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-5 py-3 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
            >
              <span>Enquire About {syrup.name} Syrup</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Slideshow Component with Dual-Layer Crossfade
function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;

  return (
    <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-4 border border-primary/20" />
      <div className="absolute -right-4 -top-4 h-16 w-16 border-r-2 border-t-2 border-primary/70" />
      <div className="absolute -left-4 -bottom-4 h-16 w-16 border-l-2 border-b-2 border-primary/70" />

      <div className="relative aspect-[.78] overflow-hidden bg-card border border-primary/30 shadow-2xl">
        {slideshowImages.map((src, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === prevIndex;

          return (
            <img
              key={src}
              src={src}
              alt={`OMEGA Studio Bar Craft ${idx + 1}`}
              className={`absolute inset-0 h-full w-full object-cover object-center brightness-[.85] contrast-[1.08] transition-all duration-700 ease-in-out ${
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

        {/* Floating Accent Badge */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-full border border-primary/40 bg-black/70 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-primary">21 Signature Syrups</span>
        </div>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between">
          <span className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-foreground/80">
            Studio Collection / 0{currentIndex + 1}
          </span>
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

// Section Heading Helper
function SectionHeading({
  kicker,
  title,
  body,
  align = 'left',
}: {
  kicker: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl leading-[.98] text-foreground md:text-6xl">{title}</h2>
      {body && <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>}
    </div>
  );
}

// Decorative Divider Rule
function Rule() {
  return <div className="section-rule my-8" aria-hidden="true" />;
}

// Floating WhatsApp Button
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918971825137?text=Hi%20OMEGA%20COCKTAIL.CO%2C%20I%20would%20like%20to%20enquire%20about%20your%20cocktail%20syrup%20range."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-primary/60 bg-[#110f0e]/95 px-4 py-2.5 text-primary shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none"
      aria-label="Chat on WhatsApp with OMEGA COCKTAIL.CO"
    >
      <MessageSquare size={16} />
      <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] font-semibold">Chat on WhatsApp</span>
    </a>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-border/80 bg-secondary/40">
      <div className="page-shell grid gap-10 py-16 sm:gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Col 1: Logo & Brand Statement */}
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted-foreground/90">
            OMEGA COCKTAIL.CO — Craft exceptional cocktails, mocktails and beverages with premium-quality flavour syrups. Formulated in Bengaluru for bars, hotels, cafés, and F&B professionals.
          </p>
        </div>

        {/* Col 2: Products */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Products</p>
          <div className="mt-5 flex flex-col gap-2.5 text-xs text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">All 21 Syrups</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Floral & Botanical</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Fruity & Citrus</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Tropical Varieties</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Spiced & Classic</Link>
          </div>
        </div>

        {/* Col 3: Company */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Company</p>
          <div className="mt-5 flex flex-col gap-2.5 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About Omega</Link>
            <Link href="/applications" className="hover:text-primary transition-colors">Beverage Applications</Link>
            <Link href="/b2b" className="hover:text-primary transition-colors">B2B & Wholesale</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Studio</Link>
          </div>
        </div>

        {/* Col 4: Direct Contact */}
        <div>
          <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Direct Contact</p>
          <div className="mt-5 flex flex-col gap-2.5 text-xs text-muted-foreground">
            <a href="tel:+918971825137" className="hover:text-primary transition-colors">+91 8971825137</a>
            <a href="mailto:mjsince1987@gmail.com" className="hover:text-primary transition-colors break-all">mjsince1987@gmail.com</a>
            <span className="text-muted-foreground/70">Ejipura, Bengaluru-560047</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-border/70 py-6">
        <div className="page-shell flex flex-col gap-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <span>OMEGA COCKTAIL.CO — Premium Beverage Syrups</span>
          <span>© {currentYear} OMEGA COCKTAIL.CO. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// Main Page Shell Wrapper
function Shell({
  children,
  onOpenB2B,
}: {
  children: ReactNode;
  onOpenB2B: (syrupName?: string) => void;
}) {
  return (
    <div className="grain min-h-[100dvh] flex flex-col justify-between overflow-x-hidden bg-[#0b0a09]">
      <Header onOpenB2B={onOpenB2B} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// ----------------------------------------------------
// HOMEPAGE COMPONENT
// ----------------------------------------------------
function HomePage({
  onSelectSyrup,
  onOpenB2B,
}: {
  onSelectSyrup: (syrup: SyrupItem) => void;
  onOpenB2B: (name?: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<SyrupCategory>('ALL');

  const categories: SyrupCategory[] = ['ALL', 'FLORAL', 'FRUITY', 'TROPICAL', 'HERBAL', 'CLASSIC'];

  const filteredSyrups = useMemo(() => {
    if (activeCategory === 'ALL') return syrupItems;
    return syrupItems.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-secondary/30">
        <div className="page-shell grid min-h-[calc(88vh-72px)] items-center gap-12 py-12 lg:grid-cols-[1.1fr_.9fr] md:py-20">
          {/* Left Content */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5">
              <Sparkles size={13} className="text-primary" />
              <span className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                PREMIUM BEVERAGE FLAVOURS
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.95] text-foreground">
              Premium Cocktail &<br />
              <span className="italic text-primary">Mocktail Syrups</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Craft exceptional cocktails, mocktails and beverages with refined flavour syrups designed for modern beverage experiences. Formulated for high-volume bars, hotels, cafés, and craft mixologists.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
              >
                <span>EXPLORE SYRUPS</span>
                <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                onClick={() => onOpenB2B()}
                className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary/60 bg-transparent px-6 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
              >
                <span>B2B ENQUIRY</span>
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6 border-t border-border/50 pt-6 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>21 Varieties</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>750 ml Pack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Wholesale Ready</span>
              </div>
            </div>
          </div>

          {/* Right Slideshow & Bottle Visual */}
          <HeroSlideshow />
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="border-b border-border/40 py-20 md:py-28">
        <div className="page-shell grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center">
          <div>
            <SectionHeading
              kicker="ABOUT OMEGA"
              title="Flavour That Defines The Drink"
              body="Omega develops premium flavour solutions that help transform ordinary beverages into memorable cocktail, mocktail and food experiences."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-border/80 bg-card p-6">
              <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">01 / Range</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">21 Signature Varieties</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                From tropical fruit nectars to Mediterranean citrus and exotic spices.
              </p>
            </div>
            <div className="rounded-sm border border-border/80 bg-card p-6">
              <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">02 / Standard</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">750 ml Bar Bottle</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Ergonomic pour-control packaging built for high-speed service.
              </p>
            </div>
            <div className="rounded-sm border border-border/80 bg-card p-6">
              <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">03 / Yield</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">High Concentration</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Optimal sweetness-to-acid ratio ensuring maximum serving yield per bottle.
              </p>
            </div>
            <div className="rounded-sm border border-border/80 bg-card p-6">
              <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">04 / B2B</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">Wholesale Supply</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Dependable supply contracts and menu consultation for F&B partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-20 md:py-28" id="products">
        <div className="page-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker="EXPLORE OUR FLAVOURS"
              title="A Curated Collection of Flavour Syrups"
              body="Created to inspire cocktails, mocktails and modern beverage creations."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-primary hover:underline"
            >
              <span>View Full Catalogue (21)</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/60 pb-6">
            <span className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mr-2">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${
                  activeCategory === cat
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border/80 bg-card text-muted-foreground hover:border-primary/60 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4-Column Product Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredSyrups.slice(0, 8).map((item) => (
              <div
                key={item.slug}
                className="card-hover group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border/80 bg-card p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-ui text-[10px] font-semibold text-primary">
                      {item.index} / SYRUP
                    </span>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono-ui text-[8px] uppercase tracking-wider text-primary">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl leading-none text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-5 border-t border-border/60 pt-3">
                    <span className="font-mono-ui text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
                      SIGNATURE SERVE
                    </span>
                    <p className="mt-1 font-display text-xl text-foreground">{item.recipe.cocktailName}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-mono-ui text-[9px] text-muted-foreground">{item.volume} Bottle</span>
                  <button
                    type="button"
                    onClick={() => onSelectSyrup(item)}
                    className="inline-flex items-center gap-1.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary/10 px-8 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <span>EXPLORE ALL 21 FLAVOUR SYRUPS</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY OMEGA SECTION */}
      <section className="border-y border-border/50 bg-secondary/30 py-20 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker="QUALITY STANDARDS"
            title="Why OMEGA COCKTAIL.CO?"
            body="Engineered specifically for beverage managers, bartenders, and venue operators who demand excellence in every pour."
            align="center"
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-border/80 bg-card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Sparkles size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">PREMIUM FLAVOURS</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Refined flavour profiles designed for modern cocktail, mocktail and artisan beverage creation.
              </p>
            </div>

            <div className="rounded-sm border border-border/80 bg-card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">CONSISTENT QUALITY</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Reliable flavour intensity and liquid performance across high-volume bar applications.
              </p>
            </div>

            <div className="rounded-sm border border-border/80 bg-card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Layers size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">VERSATILE USE</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Suitable for cocktails, mocktails, cafés, iced teas, desserts and food menu development.
              </p>
            </div>

            <div className="rounded-sm border border-border/80 bg-card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Package size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">B2B READY</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Solutions designed for hospitality businesses requiring dependable flavour supply and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APPLICATIONS SECTION */}
      <section className="py-20 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker="VERSATILE APPLICATIONS"
            title="One Syrup. Endless Possibilities."
            body="Formulated for high-performing menus across bars, cafés, hotels, and food establishments."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="group rounded-sm border border-border/80 bg-card p-8 transition-colors hover:border-primary/60">
              <span className="font-mono-ui text-[10px] font-semibold text-primary">APPLICATION / 01</span>
              <h3 className="mt-3 font-display text-3xl text-foreground">COCKTAIL CRAFT</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Formulated for high-volume bars, craft lounges, highball serves, and signature spirit pairings.
              </p>
            </div>

            <div className="group rounded-sm border border-border/80 bg-card p-8 transition-colors hover:border-primary/60">
              <span className="font-mono-ui text-[10px] font-semibold text-primary">APPLICATION / 02</span>
              <h3 className="mt-3 font-display text-3xl text-foreground">MOCKTAILS & ZERO-PROOF</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Botanical spritzes, non-alcoholic aperitifs, and elevated zero-proof beverage programs.
              </p>
            </div>

            <div className="group rounded-sm border border-border/80 bg-card p-8 transition-colors hover:border-primary/60">
              <span className="font-mono-ui text-[10px] font-semibold text-primary">APPLICATION / 03</span>
              <h3 className="mt-3 font-display text-3xl text-foreground">CAFÉS & ARTISAN DRINKS</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Flavoured cold brews, iced teas, specialty lattes, and artisan sodas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEVERAGE CREATION GUIDE */}
      <section className="border-t border-border/50 bg-secondary/20 py-20 md:py-28">
        <div className="page-shell">
          <SectionHeading
            kicker="MIXOLOGY GUIDE"
            title="Create Your Perfect Drink"
            body="Follow this structured 5-step mixing approach to achieve balance and aroma in every serve."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: '01', title: 'CHOOSE FLAVOUR', desc: 'Select your preferred OMEGA syrup variety.' },
              { step: '02', title: 'ADD BASE', desc: 'Add 45-60 ml spirit, soda, or cold brew base.' },
              { step: '03', title: 'MIX & BALANCE', desc: 'Shake or stir over fresh ice for proper dilution.' },
              { step: '04', title: 'GARNISH', desc: 'Accent with fresh citrus, herbs, or botanicals.' },
              { step: '05', title: 'SERVE', desc: 'Pour into chilled glassware & enjoy.' },
            ].map((s) => (
              <div key={s.step} className="rounded-sm border border-border/80 bg-card p-6 text-center">
                <span className="font-mono-ui text-[11px] font-bold text-primary">{s.step}</span>
                <h4 className="mt-3 font-display text-xl text-foreground">{s.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-primary/30 bg-card p-6 md:p-8 max-w-2xl mx-auto text-center">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Standard Mix Ratio</p>
            <p className="mt-2 font-display text-2xl text-foreground">
              20 ml Syrup + 50 ml Base Spirit/Soda + 15 ml Fresh Citrus + Ice
            </p>
          </div>
        </div>
      </section>

      {/* 7. SIGNATURE RECIPES */}
      <section className="py-20 md:py-28">
        <div className="page-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker="SIGNATURE RECIPES"
              title="Inspire Your Next Pour"
              body="Tested recipes formulated to showcase the aroma and mixability of OMEGA syrups."
            />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {syrupItems.slice(0, 6).map((item) => (
              <div key={item.slug} className="rounded-sm border border-border/80 bg-card p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">
                    {item.name} SYRUP
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-foreground">{item.recipe.cocktailName}</h3>

                  <div className="mt-4">
                    <p className="font-mono-ui text-[9px] uppercase text-muted-foreground">Ingredients:</p>
                    <p className="mt-1 text-xs text-foreground/90 leading-relaxed">{item.recipe.ingredients.join(' • ')}</p>
                  </div>

                  <div className="mt-3">
                    <p className="font-mono-ui text-[9px] uppercase text-muted-foreground">Method:</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.recipe.method}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="font-mono-ui text-[9px] text-primary">Garnish: {item.recipe.garnish}</span>
                  <button
                    type="button"
                    onClick={() => onSelectSyrup(item)}
                    className="font-mono-ui text-[10px] uppercase tracking-wider text-primary hover:underline"
                  >
                    View Syrup →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MADE FOR F&B (B2B SECTION) */}
      <section className="border-y border-border/50 bg-secondary/40 py-20 md:py-28" id="b2b">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="B2B & WHOLESALE"
              title="Made For The F&B Industry"
              body="From cafés and restaurants to hotels, bars and beverage businesses, OMEGA helps professionals create consistent flavour experiences at scale."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-sm border border-border/80 bg-card p-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono-ui text-[11px] text-foreground uppercase tracking-wider">Hotels & Resorts</span>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-border/80 bg-card p-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono-ui text-[11px] text-foreground uppercase tracking-wider">Bars & Pubs</span>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-border/80 bg-card p-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono-ui text-[11px] text-foreground uppercase tracking-wider">Restaurants</span>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-border/80 bg-card p-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-mono-ui text-[11px] text-foreground uppercase tracking-wider">Cafés & Bakeries</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenB2B()}
                className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-6 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90"
              >
                <span>START A B2B CONVERSATION</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="rounded-sm border border-primary/40 bg-card p-8 shadow-xl">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Direct Enquiry</p>
            <h3 className="mt-2 font-display text-3xl text-foreground">B2B Quick Quote</h3>
            <p className="mt-2 text-xs text-muted-foreground">Submit your venue requirement for immediate sample packs and wholesale volume pricing.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onOpenB2B();
              }}
              className="mt-6 grid gap-4"
            >
              <div>
                <input
                  type="text"
                  required
                  placeholder="Business / Venue Name"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Business Email"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="gold-button mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-5 py-3.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
              >
                <span>Request B2B Quote</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. CONTACT & LOCATION */}
      <section className="py-20 md:py-28" id="contact">
        <div className="page-shell grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              kicker="CONNECT WITH US"
              title="Tell Us About Your Brief"
              body="Whether you are developing a new beverage menu or stocking your bar, our studio team is here to assist."
            />

            <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
              <a href="tel:+918971825137" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={18} className="text-primary" />
                <span>+91 8971825137</span>
              </a>
              <a href="mailto:mjsince1987@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={18} className="text-primary" />
                <span>mjsince1987@gmail.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span>No 6, RA Road, Ejipura, Bengaluru-560047, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8 flex flex-col justify-between">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">VISIT STUDIO</p>
              <h3 className="mt-2 font-display text-3xl text-foreground">Bengaluru Flavour Lab</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Our main studio and flavour development facility is located in Ejipura, Bengaluru. Appointments available for bar menu consultations and sample tastings.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Ejipura+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
            >
              <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------
// ABOUT PAGE COMPONENT
// ----------------------------------------------------
function AboutPage({ onOpenB2B }: { onOpenB2B: () => void }) {
  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading
          kicker="ABOUT OMEGA COCKTAIL.CO"
          title="Two Disciplines. One Studio."
          body="OMEGA COCKTAIL.CO brings beverage craft, mixology expertise, and hospitality project thinking together to create world-class flavour syrups."
        />

        <div className="mt-16 grid gap-16">
          {profiles.map((profile, index) => (
            <article
              key={profile.name}
              className={`grid gap-10 md:grid-cols-2 md:items-center ${index % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="image-lift overflow-hidden border border-primary/30 bg-card">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="aspect-[.92] w-full object-cover object-center"
                />
              </div>

              <div>
                <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  {profile.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-none text-foreground md:text-5xl">{profile.name}</h2>
                <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {profile.role}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{profile.biography}</p>

                <Rule />

                <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Selected Industry Experience
                </p>
                <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground leading-relaxed">
                  {profile.experience.map((exp) => (
                    <li key={exp} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 rounded-sm border border-primary/30 bg-card p-8 md:p-12 text-center">
          <SectionHeading
            kicker="PARTNER WITH US"
            title="Ready to Elevate Your Beverage Menu?"
            body="Get in touch with our studio team for B2B wholesale pricing, custom flavour formulations, or sample kits."
            align="center"
          />
          <button
            type="button"
            onClick={onOpenB2B}
            className="mt-8 gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-8 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            <span>REQUEST A B2B QUOTE</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PRODUCTS PAGE COMPONENT (FULL 21 CATALOGUE)
// ----------------------------------------------------
function ProductsPage({
  onSelectSyrup,
  onOpenB2B,
}: {
  onSelectSyrup: (syrup: SyrupItem) => void;
  onOpenB2B: (name?: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<SyrupCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: SyrupCategory[] = ['ALL', 'FLORAL', 'FRUITY', 'TROPICAL', 'HERBAL', 'CLASSIC'];

  const filteredSyrups = useMemo(() => {
    return syrupItems.filter((item) => {
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recipe.cocktailName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading
          kicker="COMPLETE PRODUCT CATALOGUE"
          title="21 Exceptional Flavour Syrups"
          body="Explore the complete collection of OMEGA syrups formulated for mixology, cocktails, mocktails and food application."
        />

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-y border-border/60 py-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${
                  activeCategory === cat
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/80 bg-card text-muted-foreground hover:border-primary/60 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 21 syrups or cocktails..."
              className="w-full rounded-full border border-border/80 bg-card py-2 pl-10 pr-4 font-mono-ui text-[11px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* 21 Products Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSyrups.map((item) => (
            <div
              key={item.slug}
              className="card-hover group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border/80 bg-card p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-ui text-[10px] font-semibold text-primary">
                    {item.index} / SYRUP
                  </span>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono-ui text-[8px] uppercase tracking-wider text-primary">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-3xl leading-none text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-5 border-t border-border/60 pt-3">
                  <span className="font-mono-ui text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
                    SIGNATURE SERVE
                  </span>
                  <p className="mt-1 font-display text-xl text-foreground">{item.recipe.cocktailName}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="font-mono-ui text-[9px] text-muted-foreground">{item.volume} Bottle</span>
                <button
                  type="button"
                  onClick={() => onSelectSyrup(item)}
                  className="inline-flex items-center gap-1.5 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL PAGE (DEDICATED ROUTE)
// ----------------------------------------------------
function ProductDetailPage({ onOpenB2B }: { onOpenB2B: (name?: string) => void }) {
  const { product } = useParams<{ product: string }>();
  const syrup = syrupItems.find((item) => item.slug === product || toSlug(item.name) === product);

  if (!syrup) return <NotFound />;

  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={14} /> Back to All 21 Syrups
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-sm border border-primary/40 bg-card p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono-ui text-[10px] font-semibold tracking-wider text-primary">
                SYRUP INDEX / {syrup.index}
              </span>
              <h1 className="mt-3 font-display text-5xl text-foreground">{syrup.name} Syrup</h1>
              <p className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {syrup.category} • {syrup.tag}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{syrup.description}</p>
            </div>

            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                PACK & AVAILABILITY
              </p>
              <p className="mt-2 text-xs text-foreground/90">
                Standard {syrup.volume} Glass Bottle. Wholesale cases of 12 units available for B2B distribution.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                RECIPE & MIXOLOGY SPECIFICATIONS
              </span>
              <h2 className="mt-2 font-display text-3xl text-foreground">{syrup.recipe.cocktailName}</h2>

              <div className="mt-6">
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Ingredients Ratio:
                </p>
                <ul className="mt-2 grid gap-2 text-xs text-foreground/90">
                  {syrup.recipe.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Preparation Method:</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/90">{syrup.recipe.method}</p>
              </div>

              <div className="mt-4">
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Garnish:</p>
                <p className="mt-1 text-xs text-primary">{syrup.recipe.garnish}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenB2B(syrup.name)}
              className="gold-button mt-8 inline-flex items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-6 py-4 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              <span>Get B2B Quote for {syrup.name}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// APPLICATIONS PAGE
// ----------------------------------------------------
function ApplicationsPage({ onOpenB2B }: { onOpenB2B: () => void }) {
  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading
          kicker="BEVERAGE APPLICATIONS"
          title="One Syrup. Endless Possibilities."
          body="Formulated for high performance across craft cocktails, mocktails, specialty coffee, and culinary applications."
        />

        <div className="mt-16 grid gap-10">
          <div className="rounded-sm border border-border/80 bg-card p-8 md:p-12">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">01 / BAR & COCKTAIL</span>
            <h2 className="mt-3 font-display text-4xl text-foreground">High-Volume Cocktail Programs</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Designed to maintain precise acid balance, color intensity, and bouquet even under intense dilution. Ideal for Margaritas, Old Fashioneds, Collins, and signature house drinks.
            </p>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8 md:p-12">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">02 / ZERO-PROOF & MOCKTAIL</span>
            <h2 className="mt-3 font-display text-4xl text-foreground">Zero-Proof & Botanical Spritzes</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Delivers full-bodied palate structure without needing alcohol. Create complex zero-proof aperitifs, herbal fizzes, and artisan sodas.
            </p>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8 md:p-12">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">03 / CAFÉ & COLD BREW</span>
            <h2 className="mt-3 font-display text-4xl text-foreground">Artisan Coffee & Iced Teas</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Flavoured cold brew teas, fruit lattes, and artisan coffee beverages. Smooth solubility without curdling dairy or non-dairy milks.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => onOpenB2B()}
            className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-8 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            <span>DISCUSS YOUR MENU REQUIREMENT</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// B2B PAGE COMPONENT
// ----------------------------------------------------
function B2BPage({ onOpenB2B }: { onOpenB2B: () => void }) {
  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading
          kicker="B2B & WHOLESALE SERVICES"
          title="Made For F&B Professionals"
          body="Wholesale syrup supply, custom flavor curation, and bar team training for hotels, bars, restaurants, and cafés."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm border border-border/80 bg-card p-8">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">01 / WHOLESALE</span>
            <h3 className="mt-3 font-display text-2xl text-foreground">Bulk Case Supply</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Standard 750 ml bottles supplied in 12-unit cases with fast dispatch and reliable regional delivery.
            </p>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">02 / CONSULTATION</span>
            <h3 className="mt-3 font-display text-2xl text-foreground">Menu Development</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Our mixology team works with your venue to design signature cocktail & mocktail menus.
            </p>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8">
            <span className="font-mono-ui text-[10px] font-semibold text-primary">03 / SAMPLES</span>
            <h3 className="mt-3 font-display text-2xl text-foreground">Bar Evaluation Kits</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Sample packs available for qualified beverage managers and head bartenders evaluating new flavours.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => onOpenB2B()}
            className="gold-button inline-flex items-center gap-2.5 rounded-sm border border-primary bg-primary px-8 py-4 font-mono-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            <span>REQUEST A B2B WHOLESALE QUOTE</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CONTACT PAGE COMPONENT
// ----------------------------------------------------
function ContactPage({ onOpenB2B }: { onOpenB2B: () => void }) {
  return (
    <div className="py-16 md:py-24">
      <div className="page-shell">
        <SectionHeading
          kicker="CONTACT STUDIO"
          title="Tell Us What You’re Building"
          body="Whether you have a product question, B2B wholesale brief, or project consultation request, we’d love to hear from you."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl text-foreground">Direct Studio Lines</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Contact Manoj Alphonse or our studio team for immediate assistance.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
              <a href="tel:+918971825137" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={18} className="text-primary" />
                <span>+91 8971825137</span>
              </a>
              <a href="mailto:mjsince1987@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={18} className="text-primary" />
                <span>mjsince1987@gmail.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span>No 6, RA Road, Ejipura, Bengaluru-560047, Karnataka, India</span>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border/60">
              <button
                type="button"
                onClick={() => onOpenB2B()}
                className="gold-button inline-flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-6 py-3 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <span>OPEN B2B QUOTE FORM</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          <div className="rounded-sm border border-border/80 bg-card p-8">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">STUDIO LOCATION</p>
            <h3 className="mt-2 font-display text-3xl text-foreground">Bengaluru Flavour Lab</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Ejipura, Bengaluru, Karnataka 560047. Studio visits by appointment for bar menu tasting sessions.
            </p>

            <a
              href="https://maps.google.com/?q=Ejipura+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-mono-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
            >
              <span>OPEN GOOGLE MAPS</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ROUTER & APP ROOT
// ----------------------------------------------------
function Router({
  onSelectSyrup,
  onOpenB2B,
}: {
  onSelectSyrup: (syrup: SyrupItem) => void;
  onOpenB2B: (name?: string) => void;
}) {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/">
          <HomePage onSelectSyrup={onSelectSyrup} onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/about">
          <AboutPage onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/products">
          <ProductsPage onSelectSyrup={onSelectSyrup} onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/products/:product">
          <ProductDetailPage onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/applications">
          <ApplicationsPage onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/b2b">
          <B2BPage onOpenB2B={onOpenB2B} />
        </Route>
        <Route path="/contact">
          <ContactPage onOpenB2B={onOpenB2B} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const [b2bOpen, setB2bOpen] = useState(false);
  const [selectedSyrupForB2B, setSelectedSyrupForB2B] = useState<string | undefined>();
  const [detailSyrup, setDetailSyrup] = useState<SyrupItem | null>(null);

  useEffect(() => {
    document.title = 'OMEGA COCKTAIL.CO — Premium Cocktail & Mocktail Syrups';
  }, []);

  const handleOpenB2B = (syrupName?: string) => {
    setSelectedSyrupForB2B(syrupName);
    setB2bOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <Shell onOpenB2B={handleOpenB2B}>
            <Router onSelectSyrup={(syrup) => setDetailSyrup(syrup)} onOpenB2B={handleOpenB2B} />
          </Shell>
        </WouterRouter>
        <B2BQuoteModal
          isOpen={b2bOpen}
          onClose={() => setB2bOpen(false)}
          initialSyrup={selectedSyrupForB2B}
        />
        <ProductDetailModal
          syrup={detailSyrup}
          onClose={() => setDetailSyrup(null)}
          onOpenB2B={handleOpenB2B}
        />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;