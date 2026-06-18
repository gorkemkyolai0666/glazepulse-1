import Link from 'next/link';
import { Flame, Layers, Wrench, Droplets, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Flame,
    title: 'Fırın Envanteri',
    description: 'Elektrik, gaz, raku ve odun fırınlarınızı bölge bazında takip edin.',
  },
  {
    icon: Layers,
    title: 'Pişirim Partileri',
    description: 'Bisküvi ve sır pişirimlerini, cone ayarlarını ve gelir kayıtlarını yönetin.',
  },
  {
    icon: Wrench,
    title: 'Fırın Bakımı',
    description: 'Termokupl, eleman ve refrakter arızalarını öncelik sırasıyla takip edin.',
  },
  {
    icon: Droplets,
    title: 'Sır Kontrol Listeleri',
    description: 'Sır karışımı, test plakaları ve pişirim hazırlıklarını planlayın.',
  },
  {
    icon: Package,
    title: 'Kil Siparişleri',
    description: 'Kil tedarikçilerini, kil türlerini ve sipariş durumlarını yönetin.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/80 bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Flame className="h-5 w-5" strokeWidth={2} />
            </div>
            <span className="font-display text-2xl text-primary">GlazePulse</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Giriş Yap</Link>
            </Button>
            <Button asChild className="kiln-btn bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/register">Ücretsiz Başla</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Seramik Atölyesi Operasyonları
            </p>
            <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl">
              Fırınlarınızı, pişirimlerinizi ve sırlarınızı tek platformda yönetin
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Bağımsız seramik atölyeleri için fırın envanteri, pişirim planlaması, bakım kayıtları ve
              sır yönetimi — kağıt defterlerin yerini alan modern bir çözüm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="kiln-btn bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/register">
                  Demo Hesabıyla Başla
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="kiln-btn">
                <Link href="/login">Giriş Yap</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl text-primary">Atölyeniz için her şey</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="kiln-card p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg text-primary">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GlazePulse — Seramik Atölyesi Yönetim Platformu
      </footer>
    </div>
  );
}
