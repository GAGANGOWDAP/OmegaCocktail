import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { profiles, services, syrupNames, toSlug, type Service } from '@/data/site-data';

const queryClient = new QueryClient();
const syrupImage = '/assets/products/cocktail-syrup-range.png';

function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" data-testid="link-logo">
      <span className="grid h-8 w-8 place-items-center border border-primary/60 text-primary transition-transform group-hover:rotate-45" aria-hidden="true">
        <span className="-rotate-45 font-mono-ui text-[10px]">Ω</span>
      </span>
      <span className="font-mono-ui text-[11px] leading-[1.1] tracking-[0.22em] text-foreground">
        OMEGA<br />COCKTAIL.CO
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

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="page-shell flex min-h-[74px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <Link href="/" className="nav-link font-mono-ui text-[10px] uppercase tracking-[0.18em]" data-active={location === '/'} data-testid="link-home">Home</Link>
          <div className="relative" onMouseEnter={() => setServiceOpen(true)} onMouseLeave={() => setServiceOpen(false)}>
            <button type="button" onClick={() => setServiceOpen((value) => !value)} className="nav-link inline-flex items-center gap-1 font-mono-ui text-[10px] uppercase tracking-[0.18em]" aria-expanded={serviceOpen} data-testid="button-services-menu">
              Services <ChevronDown size={13} strokeWidth={1.5} className={serviceOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={`absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 border border-border bg-card p-2 shadow-2xl transition-all duration-200 ${serviceOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu} className="group flex items-center justify-between px-3 py-3 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary" data-testid={`link-service-${service.slug}`}>
                  <span>{service.name}</span><ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
            <button type="button" onClick={() => setProductOpen((value) => !value)} className="nav-link inline-flex items-center gap-1 font-mono-ui text-[10px] uppercase tracking-[0.18em]" aria-expanded={productOpen} data-testid="button-products-menu">
              Products <ChevronDown size={13} strokeWidth={1.5} className={productOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={`absolute left-1/2 top-full mt-4 w-52 -translate-x-1/2 border border-border bg-card p-2 shadow-2xl transition-all duration-200 ${productOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
              <Link href="/products/cocktail-syrups" onClick={closeMenu} className="group flex items-center justify-between px-3 py-3 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary" data-testid="link-cocktail-syrups-menu">
                Cocktail Syrups <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          </div>
          <Link href="/about" className="nav-link font-mono-ui text-[10px] uppercase tracking-[0.18em]" data-active={location === '/about'} data-testid="link-about">About</Link>
          <Link href="/contact" className="gold-button border border-primary/60 px-4 py-2.5 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary hover:bg-primary hover:text-primary-foreground" data-testid="link-contact">Contact Us</Link>
        </nav>
        <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center border border-border text-primary md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={`border-t border-border bg-card md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <nav className="page-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          <Link href="/" onClick={closeMenu} className="border-b border-border/60 px-1 py-3 font-mono-ui text-[11px] uppercase tracking-[0.18em]" data-testid="mobile-link-home">Home</Link>
          <button type="button" onClick={() => setServiceOpen((value) => !value)} className="flex items-center justify-between border-b border-border/60 px-1 py-3 text-left font-mono-ui text-[11px] uppercase tracking-[0.18em]" data-testid="mobile-button-services">
            Services <ChevronDown size={14} className={serviceOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {serviceOpen && <div className="grid grid-cols-1 border-b border-border/60 pb-2 pl-3">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu} className="py-2.5 text-sm text-muted-foreground" data-testid={`mobile-link-service-${service.slug}`}>{service.name}</Link>)}</div>}
          <button type="button" onClick={() => setProductOpen((value) => !value)} className="flex items-center justify-between border-b border-border/60 px-1 py-3 text-left font-mono-ui text-[11px] uppercase tracking-[0.18em]" data-testid="mobile-button-products">
            Products <ChevronDown size={14} className={productOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {productOpen && <div className="border-b border-border/60 pb-2 pl-3"><Link href="/products/cocktail-syrups" onClick={closeMenu} className="block py-2.5 text-sm text-muted-foreground" data-testid="mobile-link-cocktail-syrups">Cocktail Syrups</Link></div>}
          <Link href="/about" onClick={closeMenu} className="border-b border-border/60 px-1 py-3 font-mono-ui text-[11px] uppercase tracking-[0.18em]" data-testid="mobile-link-about">About</Link>
          <Link href="/contact" onClick={closeMenu} className="mt-3 border border-primary px-4 py-3 text-center font-mono-ui text-[11px] uppercase tracking-[0.18em] text-primary" data-testid="mobile-link-contact">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/80 bg-secondary/40">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">A beverage studio for hospitality projects, bar teams, and considered events.</p>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Navigate</p>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary" data-testid="footer-link-home">Home</Link>
            <Link href="/services" className="hover:text-primary" data-testid="footer-link-services">Services</Link>
            <Link href="/products" className="hover:text-primary" data-testid="footer-link-products">Products</Link>
            <Link href="/about" className="hover:text-primary" data-testid="footer-link-about">About</Link>
            <Link href="/contact" className="hover:text-primary" data-testid="footer-link-contact">Contact Us</Link>
          </div>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Direct</p>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <a href="tel:+918971825137" className="hover:text-primary" data-testid="footer-phone-manoj">+91 8971825137</a>
            <a href="mailto:mjsince1987@gmail.com" className="break-all hover:text-primary" data-testid="footer-email-manoj">mjsince1987@gmail.com</a>
            <a href="tel:9980841016" className="hover:text-primary" data-testid="footer-phone-suresh">9980841016</a>
            <a href="mailto:sureshvat69@gmail.com" className="break-all hover:text-primary" data-testid="footer-email-suresh">sureshvat69@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="page-shell flex flex-col gap-2 border-t border-border/60 py-5 font-mono-ui text-[9px] uppercase tracking-[0.14em] text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <span>OMEGA COCKTAIL.CO</span><span>© {new Date().getFullYear()} OMEGA COCKTAIL.CO</span>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="grain min-h-[100dvh] overflow-x-hidden"><Header /><main>{children}</main><Footer /></div>;
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
          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-5 border border-primary/15" />
            <div className="absolute -right-5 -top-5 h-20 w-20 border-r border-t border-primary/60" />
            <div className="image-lift relative aspect-[.76] overflow-hidden bg-secondary">
              <img src="/assets/people/manoj-alphonse.jpeg" alt="Manoj Alphonse holding a shaker behind a bar" className="h-full w-full object-cover object-center brightness-[.84] contrast-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-primary">The studio / 01</span>
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(194,144,71,.15)]" />
              </div>
            </div>
          </div>
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
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
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
  return (
    <Link href={`/services/${service.slug}`} className="group flex min-h-[240px] flex-col justify-between bg-card p-6 transition-colors hover:bg-[#1b1712] md:p-7" data-testid={`card-service-${service.slug}`}>
      <div className="flex items-start justify-between"><span className="font-mono-ui text-[10px] text-primary">{service.index}</span><span className="font-display text-3xl text-primary/75 transition-transform duration-300 group-hover:rotate-12">{service.icon}</span></div>
      <div><h3 className="max-w-[12rem] font-display text-3xl leading-none">{service.name}</h3><p className="mt-4 text-xs leading-6 text-muted-foreground">{service.description}</p><span className="mt-6 inline-flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">View details <ArrowUpRight size={13} /></span></div>
    </Link>
  );
}

function ServicesPage() {
  return <div className="page-shell py-20 md:py-28"><SectionHeading kicker="Services / 07" title="The work behind the pour." body="A full-service beverage studio for hospitality projects, bars, breweries, events, and the teams that bring them to life." /><Rule /><div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></div>;
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
  return <div className="page-shell py-20 md:py-28"><SectionHeading kicker="Products / 01" title="A range with room to play." body="Cocktail Syrups, shown exactly as supplied in the complete flavour range source sheet." /><div className="mt-14 grid gap-8 md:grid-cols-[1.05fr_.95fr] md:items-start"><Link href="/products/cocktail-syrups" className="image-lift border border-primary/25 bg-black p-4" data-testid="card-products-syrups"><img src={syrupImage} alt="Complete flavour range cocktail syrup source sheet" className="w-full" /></Link><div className="border-t border-primary/50 pt-6 md:mt-12"><p className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-primary">01 / Cocktail Syrups</p><h2 className="mt-5 font-display text-5xl leading-none">The complete<br /><em>flavour range.</em></h2><p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Twenty-one varieties shown on the supplied product source sheet. Browse the collection by name.</p><div className="mt-8"><ArrowLink href="/products/cocktail-syrups">View the range</ArrowLink></div></div></div></div>;
}

function SyrupImage({ index, alt }: { index: number; alt: string }) {
  const positions = ['12% 14%', '30% 14%', '48% 14%', '67% 14%', '86% 14%', '20% 44%', '40% 44%', '60% 44%', '80% 44%', '28% 72%', '48% 72%', '69% 72%', '88% 72%'];
  return <div className="h-52 overflow-hidden bg-black sm:h-60"><img src={syrupImage} alt={alt} className="h-full w-full scale-[2.8] object-cover" style={{ objectPosition: positions[index % positions.length] }} /></div>;
}

function SyrupsPage() {
  return (
    <div className="page-shell py-16 md:py-24">
      <Link href="/products" className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary" data-testid="link-back-products"><ArrowLeft size={14} /> Products</Link>
      <div className="mt-14 grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><SectionHeading kicker="Cocktail Syrups / 21 varieties" title="Colour, held in reserve." body="The names below are transcribed from the supplied source sheet." /><div className="border border-primary/25 bg-black p-3"><img src={syrupImage} alt="Cocktail syrup range source sheet" className="max-h-[520px] w-full object-contain object-top" /></div></div>
      <Rule />
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {syrupNames.map((name, index) => {
          const slug = toSlug(name);
          return <Link key={name} href={`/products/cocktail-syrups/${slug}`} className="group bg-card p-3 transition-colors hover:bg-[#1b1712]" data-testid={`card-product-${slug}`}><SyrupImage index={index} alt={`${name} shown in the supplied cocktail syrup range`} /><div className="flex items-center justify-between gap-3 px-2 pb-1 pt-5"><div><p className="font-mono-ui text-[9px] text-primary">SYRUP / {String(index + 1).padStart(2, '0')}</p><h2 className="mt-2 font-display text-3xl leading-none">{name}</h2></div><ArrowUpRight size={17} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></Link>;
        })}
      </div>
    </div>
  );
}

function ProductDetailPage() {
  const { product } = useParams<{ product: string }>();
  const name = syrupNames.find((item) => toSlug(item) === product);
  if (!name) return <NotFound />;
  const index = syrupNames.indexOf(name);
  return <div className="page-shell py-16 md:py-28"><Link href="/products/cocktail-syrups" className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary" data-testid="link-back-syrups"><ArrowLeft size={14} /> Cocktail Syrups</Link><div className="mt-14 grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-center"><div className="border border-primary/25 bg-black p-4"><SyrupImage index={index} alt={`${name} shown in the supplied cocktail syrup range`} /></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Cocktail Syrup / {String(index + 1).padStart(2, '0')}</p><h1 className="mt-6 font-display text-7xl leading-[.85] md:text-9xl">{name}</h1><Rule /><p className="max-w-md text-sm leading-7 text-muted-foreground">A variety shown in the supplied cocktail syrup source sheet.</p><div className="mt-9"><ArrowLink href="/products/cocktail-syrups">Back to the full range</ArrowLink></div></div></div></div>;
}

function AboutPage() {
  return <div className="page-shell py-20 md:py-28"><SectionHeading kicker="About / The studio" title="Two disciplines. One room." body="OMEGA COCKTAIL.CO brings beverage craft and hospitality project thinking together, from the first conversation to the finished service." /><div className="mt-20 grid gap-20">{profiles.map((profile, index) => <Profile key={profile.name} profile={profile} reverse={index % 2 === 1} />)}</div><div className="mt-24 border-t border-border pt-10"><p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">The point of contact</p><div className="mt-7 grid gap-8 md:grid-cols-2">{profiles.map((profile) => <div key={profile.name} className="border border-border bg-card p-6"><h3 className="font-display text-3xl">{profile.name}</h3><div className="mt-5 grid gap-3 text-sm text-muted-foreground">{profile.contact.map((item) => <p key={item}>{item}</p>)}</div></div>)}</div></div></div>;
}

function Profile({ profile, reverse }: { profile: typeof profiles[number]; reverse: boolean }) {
  return <article className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-20 ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}><div className="image-lift overflow-hidden border border-primary/20 bg-secondary"><img src={profile.image} alt={profile.name} className={`aspect-[.9] w-full object-cover ${profile.name === 'Suresh Naidu' ? 'object-[center_28%]' : 'object-center'}`} /></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">{profile.eyebrow}</p><h2 className="mt-5 font-display text-5xl leading-[.9] md:text-7xl">{profile.name}</h2><p className="mt-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{profile.role}</p><p className="mt-7 text-sm leading-7 text-muted-foreground">{profile.biography}</p><Rule /><p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Selected experience</p><ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">{profile.experience.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></div></article>;
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <div className="page-shell py-20 md:py-28"><div className="grid gap-16 md:grid-cols-[.8fr_1.2fr]"><div><SectionHeading kicker="Contact / The next pour" title="Tell us about the room." body="Share the shape of your project and the studio will have a place to start." /><div className="mt-12 grid gap-6 border-t border-border pt-7 text-sm text-muted-foreground"><a href="tel:+918971825137" className="flex items-start gap-3 hover:text-primary" data-testid="contact-phone-manoj"><Phone size={15} className="mt-1 text-primary" />+91 8971825137</a><a href="mailto:mjsince1987@gmail.com" className="flex items-start gap-3 break-all hover:text-primary" data-testid="contact-email-manoj"><Mail size={15} className="mt-1 text-primary" />mjsince1987@gmail.com</a><a href="tel:9980841016" className="flex items-start gap-3 hover:text-primary" data-testid="contact-phone-suresh"><Phone size={15} className="mt-1 text-primary" />9980841016</a><a href="mailto:sureshvat69@gmail.com" className="flex items-start gap-3 break-all hover:text-primary" data-testid="contact-email-suresh"><Mail size={15} className="mt-1 text-primary" />sureshvat69@gmail.com</a><p className="flex items-start gap-3"><MapPin size={15} className="mt-1 text-primary" />No 6, RA Road, Ejipura, Bengaluru-560047</p></div></div><div className="border border-border bg-card p-6 md:p-10">{submitted ? <div className="flex min-h-[440px] flex-col items-start justify-center"><div className="grid h-12 w-12 place-items-center border border-primary text-primary"><Check size={22} /></div><p className="mt-8 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">Message received</p><h2 className="mt-4 font-display text-5xl leading-none">The bar is<br /><em>open.</em></h2><p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Thank you for getting in touch. Your message has been noted by the studio.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 border-b border-primary/50 pb-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary" data-testid="button-send-another">Send another message</button></div> : <form onSubmit={submit} className="grid gap-6" data-testid="form-contact"><div><label htmlFor="name" className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Name</label><input id="name" name="name" required className="mt-3 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-primary" data-testid="input-name" /></div><div><label htmlFor="email" className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Email</label><input id="email" name="email" type="email" required className="mt-3 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-primary" data-testid="input-email" /></div><div><label htmlFor="phone" className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Phone</label><input id="phone" name="phone" className="mt-3 w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-primary" data-testid="input-phone" /></div><div><label htmlFor="message" className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Message</label><textarea id="message" name="message" required rows={5} className="mt-3 w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-primary" data-testid="input-message" /></div><button type="submit" className="gold-button mt-3 inline-flex items-center justify-center gap-3 bg-primary px-5 py-4 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/85" data-testid="button-submit-contact">Send message <ArrowUpRight size={15} /></button></form>}</div></div></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={HomePage} /><Route path="/services" component={ServicesPage} /><Route path="/services/:slug" component={ServiceDetailPage} /><Route path="/products" component={ProductsPage} /><Route path="/products/cocktail-syrups" component={SyrupsPage} /><Route path="/products/cocktail-syrups/:product" component={ProductDetailPage} /><Route path="/about" component={AboutPage} /><Route path="/contact" component={ContactPage} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  useEffect(() => { document.title = 'OMEGA COCKTAIL.CO'; }, []);
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Shell><Router /></Shell></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;