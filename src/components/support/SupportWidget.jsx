/**
 * SupportWidget — Chatbot scripté style Crisp, brandé Nuit & Lumière.
 *
 * Trois états :
 *  1. Closed   → FAB rond corail en bas-droite avec animation pulse
 *  2. Launcher → carte compacte "Une question ?" + 2 CTAs
 *  3. Chat     → conversation scriptée avec quick-replies
 *
 * Pas d'IA, pas de backend : knowledge base statique + bouton mailto
 * pour escalader vers l'équipe humaine.
 *
 * Persistance : la position (closed/launcher/chat) ET l'historique
 * messages survit aux changements de route via localStorage.
 *
 * Caché sur les routes auth (/login, /signup, /forgot-password) pour
 * ne pas distraire l'utilisateur d'un flow critique.
 */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatCircleDots, X, PaperPlaneRight, ArrowLeft, ArrowRight, Lightning as Zap,
} from '@phosphor-icons/react';
import { GREETING, KNOWLEDGE, FALLBACK, TEAM } from '@/data/chatbot-knowledge';
import { cn } from '@/lib/cn';

const HIDDEN_ROUTES = ['/login', '/signup', '/forgot-password'];
const STORAGE_KEY = 'akili.support-widget.v1';

// Petit composant pour rendre du texte multi-ligne avec formatage **gras**
function BotText({ text }) {
  // Split sur \n pour les sauts de ligne
  const parts = text.split('\n');
  return (
    <>
      {parts.map((line, i) => {
        // Convertit **xxx** en strong + `xxx` en code mono
        const tokens = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return (
          <span key={i} className="block">
            {tokens.map((t, j) => {
              if (t.startsWith('**') && t.endsWith('**')) {
                return <strong key={j} className="font-bold text-akili-charbon">{t.slice(2, -2)}</strong>;
              }
              if (t.startsWith('`') && t.endsWith('`')) {
                return <code key={j} className="font-mono text-[12px] bg-akili-papyrus-deep px-1 py-0.5 rounded">{t.slice(1, -1)}</code>;
              }
              return <span key={j}>{t}</span>;
            })}
            {i < parts.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

// Animation 3 dots typing
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-akili-charbon-mute"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Avatar Akili team via pravatar avec fallback initiales
function TeamAvatar({ slug, name, size = 28 }) {
  const [errored, setErrored] = useState(false);
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  if (errored) {
    return (
      <span
        className="rounded-full bg-akili-or text-akili-indigo font-display font-extrabold flex items-center justify-center"
        style={{ width: size, height: size, fontSize: size * 0.34 }}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={`https://i.pravatar.cc/100?u=akili-${slug}`}
      alt={name}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className="rounded-full object-cover ring-2 ring-akili-indigo bg-akili-papyrus-deep shrink-0"
    />
  );
}

export function SupportWidget() {
  const { pathname } = useLocation();
  const isHidden = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));

  const [view, setView] = useState('closed'); // 'closed' | 'launcher' | 'chat'
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.messages?.length) setMessages(saved.messages);
    } catch {/* ignore */}
  }, []);

  // Persist on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
    } catch {/* ignore — quota / disabled */}
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Initialise la conversation avec le greeting si vide quand on ouvre le chat
  useEffect(() => {
    if (view === 'chat' && messages.length === 0) {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages([{ from: 'bot', ...GREETING, id: 'greeting' }]);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [view, messages.length]);

  const handleQuickReply = (intentKey) => {
    const intent = KNOWLEDGE[intentKey];
    if (!intent) return;
    // 1. Push user message
    setMessages((m) => [...m, { from: 'user', body: intent.label, id: `u-${Date.now()}` }]);
    // 2. Bot typing
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          from: 'bot',
          body: intent.answer,
          quickReplies: intent.followups || intent.quickReplies || [],
          cta: intent.cta,
          id: `b-${Date.now()}`,
        },
      ]);
    }, 900);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', body: text, id: `u-${Date.now()}` }]);
    setDraft('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', ...FALLBACK, id: `b-${Date.now()}` }]);
    }, 900);
  };

  const resetConversation = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {/* ignore */}
  };

  const teamLine = useMemo(() => TEAM.map((t) => t.name.split(' ')[0]).join(', '), []);

  if (isHidden) return null;

  return (
    <>
      {/* Backdrop sur mobile quand le chat est ouvert */}
      <AnimatePresence>
        {view === 'chat' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-akili-indigo/40 z-40"
            onClick={() => setView('closed')}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Container principal — fixed bottom-right */}
      <div className="fixed z-50 bottom-5 right-5 md:bottom-6 md:right-6 flex flex-col items-end gap-3">
        {/* Launcher card */}
        <AnimatePresence>
          {view === 'launcher' && (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[300px] bg-white rounded-2xl shadow-akili-xl border border-akili-line p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display font-extrabold text-[16px] text-akili-charbon tracking-tight">
                    Une question ? 👋
                  </p>
                  <p className="font-sans text-[12px] text-akili-success font-semibold mt-1 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-akili-success animate-pulse" />
                    L'équipe est en ligne
                  </p>
                </div>
                <button
                  onClick={() => setView('closed')}
                  className="text-akili-charbon-mute hover:text-akili-charbon transition-colors"
                  aria-label="Fermer"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Avatars team */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {TEAM.map((t) => (
                    <TeamAvatar key={t.slug} slug={t.slug} name={t.name} size={32} />
                  ))}
                </div>
                <span className="font-sans text-[11px] text-akili-charbon-mute leading-tight">
                  {teamLine} & l'équipe
                </span>
              </div>

              <button
                onClick={() => setView('chat')}
                className="w-full mt-5 bg-akili-coral hover:bg-akili-coral-700 text-white font-display font-bold text-sm py-3 rounded-akili transition-colors shadow-akili-coral inline-flex items-center justify-center gap-2"
              >
                Discuter avec l'équipe <ArrowRight size={14} weight="bold" />
              </button>
              <a
                href="mailto:hello@akili.app?subject=Question%20Akili"
                className="w-full mt-2 text-akili-charbon-soft hover:text-akili-charbon font-display font-bold text-[13px] py-2.5 rounded-akili transition-colors inline-flex items-center justify-center gap-2 hover:bg-akili-papyrus-deep"
              >
                ✉️  Ou écrire un email
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat card */}
        <AnimatePresence>
          {view === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[calc(100vw-2.5rem)] md:w-[380px] h-[560px] md:h-[600px] bg-white rounded-2xl shadow-akili-xl border border-akili-line overflow-hidden flex flex-col"
            >
              {/* Header Indigo Nuit */}
              <header className="bg-akili-indigo text-akili-papyrus px-4 py-4 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    right: -40,
                    top: -40,
                    width: 200,
                    height: 200,
                    background:
                      'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 65%)',
                  }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <button
                    onClick={() => { setView('launcher'); }}
                    className="text-akili-papyrus/70 hover:text-akili-or transition-colors"
                    aria-label="Retour"
                  >
                    <ArrowLeft size={18} weight="bold" />
                  </button>

                  <div className="flex flex-col items-center flex-1">
                    <div className="flex -space-x-2">
                      {TEAM.map((t) => (
                        <TeamAvatar key={t.slug} slug={t.slug} name={t.name} size={32} />
                      ))}
                    </div>
                    <p className="font-display font-extrabold text-[15px] mt-2.5 tracking-tight">
                      Discuter avec Akili
                    </p>
                    <p className="font-sans text-[11px] text-akili-or-50 mt-0.5 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-akili-success animate-pulse" />
                      Réponse sous 4 h
                    </p>
                  </div>

                  <button
                    onClick={() => setView('closed')}
                    className="text-akili-papyrus/70 hover:text-akili-or transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-akili-papyrus-warm"
              >
                {messages.map((m) => (
                  <Message key={m.id} message={m} onQuickReply={handleQuickReply} />
                ))}
                {typing && (
                  <div className="flex items-end gap-2">
                    <TeamAvatar slug={TEAM[0].slug} name={TEAM[0].name} size={26} />
                    <div className="bg-white rounded-2xl rounded-bl-sm border border-akili-line/60">
                      <TypingDots />
                    </div>
                  </div>
                )}
                {messages.length > 0 && !typing && (
                  <button
                    onClick={resetConversation}
                    className="block mx-auto mt-3 text-[11px] text-akili-charbon-mute hover:text-akili-charbon-soft underline underline-offset-2 transition-colors"
                  >
                    Nouvelle conversation
                  </button>
                )}
              </div>

              {/* Compose */}
              <form
                onSubmit={handleSend}
                className="border-t border-akili-line px-3 py-3 flex items-center gap-2 bg-white"
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écris un message..."
                  className="flex-1 px-3 py-2 rounded-akili bg-akili-papyrus-deep text-[13.5px] text-akili-charbon placeholder:text-akili-charbon-mute outline-none focus:ring-2 focus:ring-akili-or/40 transition-all"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="w-9 h-9 rounded-akili bg-akili-coral text-white flex items-center justify-center hover:bg-akili-coral-700 disabled:bg-akili-charbon-mute disabled:cursor-not-allowed transition-colors shrink-0"
                  aria-label="Envoyer"
                >
                  <PaperPlaneRight size={14} weight="fill" />
                </button>
              </form>

              {/* Footer signature Akili */}
              <div className="px-3 py-2 bg-akili-papyrus-deep border-t border-akili-line">
                <p className="text-center font-sans text-[10px] text-akili-charbon-mute">
                  <Zap size={10} weight="fill" className="inline-block text-akili-or align-text-bottom mr-1" />
                  Propulsé par <span className="font-display font-bold text-akili-charbon-soft">Akili</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB toggle */}
        <motion.button
          onClick={() => setView(view === 'closed' ? 'launcher' : 'closed')}
          className="w-14 h-14 rounded-full bg-akili-coral text-white shadow-akili-coral hover:shadow-akili-xl flex items-center justify-center relative"
          aria-label={view === 'closed' ? 'Ouvrir le chat' : 'Fermer le chat'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse ring quand fermé */}
          {view === 'closed' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-akili-coral"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden
            />
          )}
          <AnimatePresence mode="wait">
            {view === 'closed' ? (
              <motion.span
                key="chat-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <ChatCircleDots size={22} weight="fill" />
              </motion.span>
            ) : (
              <motion.span
                key="close-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} weight="bold" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

function Message({ message, onQuickReply }) {
  const isBot = message.from === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'flex items-end gap-2',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && <TeamAvatar slug={TEAM[0].slug} name={TEAM[0].name} size={26} />}
      <div className={cn('max-w-[78%] flex flex-col gap-2', !isBot && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-[1.5]',
            isBot
              ? 'bg-white border border-akili-line/60 rounded-bl-sm text-akili-charbon'
              : 'bg-akili-coral text-white rounded-br-sm'
          )}
        >
          <BotText text={message.body} />
        </div>

        {/* CTA single button (e.g. mailto) */}
        {message.cta && (
          <a
            href={message.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-akili bg-akili-indigo text-akili-papyrus font-display font-bold text-[12.5px] hover:bg-akili-indigo-700 transition-colors w-fit"
          >
            {message.cta.label}
          </a>
        )}

        {/* Quick replies pills */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.quickReplies.map((key) => {
              const intent = KNOWLEDGE[key];
              if (!intent) return null;
              return (
                <button
                  key={key}
                  onClick={() => onQuickReply(key)}
                  className="text-[12px] font-display font-bold text-akili-coral border border-akili-coral/30 hover:bg-akili-coral hover:text-white hover:border-akili-coral px-3 py-1.5 rounded-pill transition-all"
                >
                  {intent.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
