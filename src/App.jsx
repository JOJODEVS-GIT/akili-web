import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ConfirmProvider } from '@/components/ui/ConfirmDialog';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CookieBanner } from '@/components/CookieBanner';
import { SupportWidget } from '@/components/support/SupportWidget';

// Pages publiques — chargées dans le bundle initial
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Pages app — lazy-loadées
const DashboardPage   = lazy(() => import('@/pages/DashboardPage'));
const AutomationsPage = lazy(() => import('@/pages/AutomationsPage'));
const RunsPage        = lazy(() => import('@/pages/RunsPage'));
const ConnectionsPage = lazy(() => import('@/pages/ConnectionsPage'));
const DocsPage        = lazy(() => import('@/pages/DocsPage'));
const ProfilePage     = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage    = lazy(() => import('@/pages/SettingsPage'));

// Pages statiques — lazy-loadées
const AboutPage     = lazy(() => import('@/pages/AboutPage'));
const ContactPage   = lazy(() => import('@/pages/ContactPage'));
const StatusPage    = lazy(() => import('@/pages/StatusPage'));
const ChangelogPage = lazy(() => import('@/pages/ChangelogPage'));
const TermsPage     = lazy(() => import('@/pages/legal/TermsPage'));
const PrivacyPage   = lazy(() => import('@/pages/legal/PrivacyPage'));
const CookiesPage   = lazy(() => import('@/pages/legal/CookiesPage'));
const NoticePage    = lazy(() => import('@/pages/legal/NoticePage'));

// Pages marketing spokes — multipage architecture (PR #18)
const ProduitPage       = lazy(() => import('@/pages/marketing/ProduitPage'));
const TemplatesPage     = lazy(() => import('@/pages/marketing/TemplatesPage'));
const IntegrationsPage  = lazy(() => import('@/pages/marketing/IntegrationsPage'));
const SecuritePage      = lazy(() => import('@/pages/marketing/SecuritePage'));
const ManifestoPage     = lazy(() => import('@/pages/marketing/ManifestoPage'));
const VsZapierPage      = lazy(() => import('@/pages/marketing/VsZapierPage'));
const ContactEquipePage = lazy(() => import('@/pages/marketing/ContactEquipePage'));

// Pages dynamiques par slug — auto-générées pour SEO (PR #20)
const IntegrationDetailPage = lazy(() => import('@/pages/marketing/IntegrationDetailPage'));
const TemplateDetailPage    = lazy(() => import('@/pages/marketing/TemplateDetailPage'));

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* Public */}
              <Route path="/"                element={<LandingPage />} />
              <Route path="/login"           element={<LoginPage />} />
              <Route path="/signup"          element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Pages statiques */}
              <Route path="/about"           element={<AboutPage />} />
              <Route path="/contact"         element={<ContactPage />} />
              <Route path="/status"          element={<StatusPage />} />
              <Route path="/changelog"       element={<ChangelogPage />} />
              <Route path="/legal/terms"     element={<TermsPage />} />
              <Route path="/legal/privacy"   element={<PrivacyPage />} />
              <Route path="/legal/cookies"   element={<CookiesPage />} />
              <Route path="/legal/notice"    element={<NoticePage />} />

              {/* Pages marketing spokes — multipage architecture */}
              <Route path="/produit"             element={<ProduitPage />} />
              <Route path="/templates"           element={<TemplatesPage />} />
              <Route path="/templates/:slug"     element={<TemplateDetailPage />} />
              <Route path="/integrations"        element={<IntegrationsPage />} />
              <Route path="/integrations/:slug"  element={<IntegrationDetailPage />} />
              <Route path="/securite"            element={<SecuritePage />} />
              <Route path="/manifesto"           element={<ManifestoPage />} />
              <Route path="/comparaisons/zapier" element={<VsZapierPage />} />
              <Route path="/contact-equipe"      element={<ContactEquipePage />} />

              {/* App protégées */}
              <Route path="/app"             element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/app/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
              <Route path="/app/runs"        element={<ProtectedRoute><RunsPage /></ProtectedRoute>} />
              <Route path="/app/connections" element={<ProtectedRoute><ConnectionsPage /></ProtectedRoute>} />
              <Route path="/app/docs"        element={<ProtectedRoute><DocsPage /></ProtectedRoute>} />
              <Route path="/app/profile"     element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/app/settings"    element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <CookieBanner />
          <SupportWidget />
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
