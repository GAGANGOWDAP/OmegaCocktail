import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[70dvh] items-center justify-center py-20">
      <div className="w-full max-w-xl border border-border bg-card p-8 md:p-12">
        <Compass className="h-8 w-8 text-primary" strokeWidth={1.4} />
        <p className="mt-10 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-primary">The quiet corner</p>
        <h1 className="mt-5 font-display text-6xl leading-none md:text-8xl">Nothing<br /><em>poured here.</em></h1>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">This page is not part of the current menu.</p>
        <Link href="/" className="mt-9 inline-flex items-center gap-3 border-b border-primary/50 pb-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-primary hover:text-foreground" data-testid="link-404-home"><ArrowLeft size={14} /> Return home</Link>
      </div>
    </div>
  );
}