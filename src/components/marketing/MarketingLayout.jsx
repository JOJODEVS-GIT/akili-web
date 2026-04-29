/**
 * MarketingLayout — wrapper partagé par toutes les pages publiques (spokes).
 *
 * Évite de répéter Navbar + Footer dans chaque page spoke.
 * Utilisé par : /produit, /templates, /integrations, /securite, /manifesto,
 * /comparaisons/*, /contact-equipe.
 *
 * La landing (/) garde son layout custom dans LandingPage.jsx vu que la
 * Navbar y est sticky avec backdrop-blur sur scroll.
 */
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-akili-papyrus flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
