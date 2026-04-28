import { useState } from 'react';
import { EnvelopeSimple as Mail, ChatCircle as MessageCircle, GithubLogo as Github, PaperPlaneTilt as Send } from '@phosphor-icons/react';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Question générale', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = (e) => {
    e?.preventDefault?.();
    if (!form.email.includes('@') || !form.message.trim()) {
      toast({ type: 'error', title: 'Champs manquants', description: 'Email et message sont requis.' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', subject: 'Question générale', message: '' });
      toast({ type: 'success', title: 'Message envoyé', description: 'On revient vers toi sous 24 h ouvrées.' });
    }, 800);
  };

  return (
    <LegalLayout
      eyebrow="Contact"
      title="On t'écoute. Vraiment."
    >
      <p className="font-sans text-base leading-relaxed text-akili-charbon-soft mb-8 max-w-2xl">
        Une question, une suggestion, un bug, une opportunité ? Choisis le canal qui te convient. On répond à tout.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
        <ContactChannel
          Icon={Mail}
          label="Email direct"
          value="contact@akili.app"
          href="mailto:contact@akili.app"
          color="coral"
        />
        <ContactChannel
          Icon={MessageCircle}
          label="Discord"
          value="rejoindre la communauté"
          href="https://discord.gg/akili"
          color="indigo"
        />
        <ContactChannel
          Icon={Github}
          label="GitHub Issues"
          value="bugs &amp; features"
          href="https://github.com/akili-app"
          color="or"
        />
      </div>

      <Card variant="flat" padding="lg">
        <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mb-1.5">
          Ou écris-nous ici
        </h2>
        <p className="text-sm text-akili-charbon-soft mb-6">
          On lit chaque message, on répond sous 24 h ouvrées maximum.
        </p>

        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Ton nom"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="Aïcha"
            autoFocus
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="aicha@studio.io"
          />
          <div className="sm:col-span-2">
            <label className="text-[13px] font-medium text-akili-charbon-soft mb-1.5 block">
              Sujet
            </label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full h-11 bg-white border border-akili-line rounded-akili px-3.5 text-[15px] text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50"
            >
              <option>Question générale</option>
              <option>Bug à signaler</option>
              <option>Demande de partenariat</option>
              <option>Presse / médias</option>
              <option>Job / candidature spontanée</option>
              <option>Autre</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-[13px] font-medium text-akili-charbon-soft mb-1.5 block">
              Message <span className="text-akili-coral">*</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              placeholder="Dis-nous tout..."
              className="w-full bg-white border border-akili-line rounded-akili px-3.5 py-3 text-[15px] text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50 resize-none"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" variant="primary" loading={loading} iconLeft={<Send size={16} />}>
              {loading ? 'On envoie...' : 'Envoyer le message'}
            </Button>
          </div>
        </form>
      </Card>
    </LegalLayout>
  );
}

function ContactChannel({ Icon, label, value, href, color }) {
  const colors = {
    coral:  'bg-akili-coral-50 text-akili-coral',
    or:     'bg-akili-or-50 text-akili-or-700',
    indigo: 'bg-akili-indigo-50 text-akili-indigo',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white border border-akili-line rounded-akili hover:-translate-y-0.5 hover:shadow-akili-md transition-all"
    >
      <div className={`w-10 h-10 rounded-akili ${colors[color]} flex items-center justify-center`}>
        <Icon size={18} />
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-wider font-bold text-akili-charbon-mute">
        {label}
      </div>
      <div className="font-display font-bold text-sm mt-0.5" dangerouslySetInnerHTML={{ __html: value }} />
    </a>
  );
}
