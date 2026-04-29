/**
 * /templates/{slug} — Page détaillée par template (20 pages SEO).
 *
 * Une seule page React qui se génère dynamiquement selon l'URL param.
 * Chaque template a sa propre URL indexable Google : /templates/t01,
 * /templates/t09, etc.
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Lightning, Clock } from '@phosphor-icons/react';
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CTA } from '@/components/landing/CTA';
import { TEMPLATES, CATEGORIES } from '@/data/templates';
import { getIntegrationBySlug } from '@/data/integrations';

export default function TemplateDetailPage() {
  const { slug } = useParams();
  const template = TEMPLATES.find((t) => t.id === slug);

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const category = CATEGORIES[template.category];
  const integrations = template.integrations
    .map(getIntegrationBySlug)
    .filter(Boolean);

  // Templates similaires (même catégorie, autres templates)
  const similar = TEMPLATES
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  return (
    <MarketingLayout>
      {/* Hero spécifique au template */}
      <section className="relative overflow-hidden bg-akili-papyrus pt-24 pb-22">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            right: -80,
            top: 60,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(242,201,76,0.16) 0%, rgba(242,201,76,0) 60%)',
          }}
        />

        <Container size="xl" className="relative">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-akili-charbon-mute">
              <Link to="/templates" className="hover:text-akili-coral transition-colors">
                Templates
              </Link>
              <span>·</span>
              <span>{category.label}</span>
            </div>

            <div className="flex items-start gap-5 mt-6">
              <span className="w-16 h-16 rounded-akili bg-akili-coral-50 text-akili-coral flex items-center justify-center shrink-0 shadow-akili-md">
                <template.Icon size={32} weight="duotone" />
              </span>
              <div>
                <Badge variant="coral">{category.label}</Badge>
                <h1 className="font-display font-extrabold text-[40px] sm:text-[52px] tracking-[-0.04em] leading-[1.02] mt-3 text-balance">
                  {template.name}
                </h1>
              </div>
            </div>

            <p className="font-sans text-lg leading-relaxed text-akili-charbon-soft mt-6 max-w-[640px]">
              {template.desc}
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Clock size={20} weight="duotone" className="text-akili-coral" />
                <div>
                  <div className="font-display font-extrabold text-lg text-akili-charbon">{template.savings}</div>
                  <div className="font-sans text-[11px] text-akili-charbon-mute uppercase tracking-wider">Gain estimé</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Lightning size={20} weight="duotone" className="text-akili-or-700" />
                <div>
                  <div className="font-display font-extrabold text-lg text-akili-charbon capitalize">{template.level}</div>
                  <div className="font-sans text-[11px] text-akili-charbon-mute uppercase tracking-wider">Niveau</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} weight="duotone" className="text-akili-success" />
                <div>
                  <div className="font-display font-extrabold text-lg text-akili-charbon">60 s</div>
                  <div className="font-sans text-[11px] text-akili-charbon-mute uppercase tracking-wider">Setup</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3.5 mt-9">
              <Link to="/signup">
                <Button size="lg" variant="primary" shape="pill" iconRight={<ArrowRight size={18} />}>
                  Utiliser ce template
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" shape="pill">
                  Voir les 20 templates
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Intégrations utilisées */}
      <section className="py-22 bg-akili-papyrus-warm">
        <Container size="xl">
          <div className="max-w-3xl mx-auto">
            <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
              · Intégrations utilisées ·
            </span>
            <h2 className="font-display font-extrabold text-[32px] sm:text-[40px] leading-[1.05] tracking-[-0.03em] mt-4">
              Ce template branche {integrations.length} outil{integrations.length > 1 ? 's' : ''}.
            </h2>
            <p className="font-sans text-base text-akili-charbon-soft mt-3 leading-relaxed">
              Tous via OAuth officiel. Aucun mot de passe à entrer. Tu valides chez le provider et c'est branché.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {integrations.map((integration) => (
                <Link
                  key={integration.slug}
                  to={`/integrations/${integration.slug}`}
                  className="flex items-center gap-3 p-4 bg-white border border-akili-line rounded-akili hover:border-akili-or hover:shadow-akili-md transition-all duration-300"
                >
                  <span
                    className="w-10 h-10 rounded-akili flex items-center justify-center shrink-0"
                    style={{ background: `${integration.color}15`, color: integration.color }}
                  >
                    <integration.Icon size={20} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm text-akili-charbon">{integration.name}</div>
                    <div className="font-sans text-[11px] text-akili-charbon-mute truncate">{integration.short}</div>
                  </div>
                  <ArrowRight size={14} weight="bold" className="text-akili-charbon-mute shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Templates similaires */}
      {similar.length > 0 && (
        <section className="py-22 bg-akili-papyrus">
          <Container size="xl">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
                · Templates similaires ·
              </span>
              <h2 className="font-display font-extrabold text-[32px] sm:text-[40px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
                Autres templates dans {category.label}.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 max-w-5xl mx-auto">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  to={`/templates/${s.id}`}
                  className="bg-white border border-akili-line rounded-akili p-5 hover:border-akili-coral hover:shadow-akili-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-akili bg-akili-coral-50 text-akili-coral flex items-center justify-center mb-4">
                    <s.Icon size={20} weight="duotone" />
                  </div>
                  <h3 className="font-display font-bold text-[15px] leading-[1.25] text-balance">
                    {s.name}
                  </h3>
                  <p className="font-sans text-[12px] text-akili-charbon-mute mt-2 line-clamp-2">
                    {s.desc}
                  </p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-1.5 font-display font-bold text-[11px] uppercase tracking-wider text-akili-coral">
                    Voir <ArrowRight size={11} weight="bold" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA />
    </MarketingLayout>
  );
}
