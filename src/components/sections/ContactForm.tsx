import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import { profile } from '../../data/profile';

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'composed' | 'error';

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || '';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty: Fields = { name: '', email: '', subject: '', message: '' };
const order: (keyof Fields)[] = ['name', 'email', 'subject', 'message'];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!emailPattern.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  else if (f.subject.length > 120) e.subject = 'Please keep the subject under 120 characters.';
  if (f.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  else if (f.message.length > 4000) e.message = 'Please keep your message under 4,000 characters.';
  return e;
}

// Deterministic torn-paper outline: jagged edges in px, positions in %.
const torn = (() => {
  const r = (n: number) => ((Math.sin(n * 91.7) * 1e4) % 1 + 1) % 1;
  const pts: string[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i++) pts.push(`${(i / steps) * 100}% ${(r(i) * 7).toFixed(1)}px`);
  for (let i = 1; i <= steps; i++) pts.push(`calc(100% - ${(r(i + 40) * 6).toFixed(1)}px) ${(i / steps) * 100}%`);
  for (let i = steps - 1; i >= 0; i--) pts.push(`${(i / steps) * 100}% calc(100% - ${(r(i + 80) * 8).toFixed(1)}px)`);
  for (let i = steps - 1; i >= 1; i--) pts.push(`${(r(i + 120) * 6).toFixed(1)}px ${(i / steps) * 100}%`);
  return `polygon(${pts.join(', ')})`;
})();

/**
 * With VITE_CONTACT_ENDPOINT set, messages are POSTed as JSON (Formspree-compatible).
 * Without it, the form says so plainly and hands the message to the visitor's email app.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [e.target.name]: e.target.value };
    setFields(next);
    if (touched[e.target.name as keyof Fields]) setErrors(validate(next));
    if (status !== 'sending') setStatus('idle');
  };

  const onBlur = (e: { target: { name: string } }) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      const first = order.find((k) => found[k]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(fields.subject.trim());
      const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('composed');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setFields(empty);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const field = (name: keyof Fields) => ({
    id: `contact-${name}`,
    name,
    value: fields[name],
    onChange,
    onBlur,
    'aria-invalid': touched[name] && errors[name] ? true : undefined,
    'aria-describedby': touched[name] && errors[name] ? `contact-${name}-error` : undefined,
    className: `mt-1.5 w-full rounded-lg border-0 border-b-2 bg-[#fbf4e2]/70 px-3.5 py-2.5 text-ink placeholder:text-ink/40 outline-none transition focus:bg-[#fffaf0] focus:ring-2 focus:ring-gold-deep/40 ${
      touched[name] && errors[name] ? 'border-ember/80' : 'border-ink/25 focus:border-gold-deep'
    }`,
  });

  const errorText = (name: keyof Fields) =>
    touched[name] && errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1 text-sm font-medium text-ember">
        {errors[name]}
      </p>
    ) : null;

  const label = 'font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink/75';
  const stamped = status === 'sent' || status === 'composed';

  return (
    // Drop shadow lives outside the clip so the torn edge casts it.
    <div className="drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)]">
      <form
        noValidate
        onSubmit={onSubmit}
        aria-labelledby="contact-form-title"
        className="parchment relative overflow-hidden px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-11"
        style={{ clipPath: torn }}
      >
        <ParchmentDetails />

        <header className="relative flex items-start justify-between gap-4">
          <JollyRoger className="h-11 w-11 shrink-0 text-ink/80 sm:h-12 sm:w-12" />
          <div className="min-w-0 flex-1 text-center">
            <p className="font-hand text-lg leading-none text-ink/60">By order of the captain</p>
            <h3 id="contact-form-title" className="mt-1 font-display text-xl font-extrabold uppercase tracking-[0.08em] text-ink sm:text-2xl">
              A Message for the Captain
            </h3>
          </div>
          <p className="hidden shrink-0 text-right font-hand text-base leading-tight text-ink/55 sm:block">
            32°59′ N
            <br />
            96°45′ W
          </p>
        </header>

        <div className="relative mx-auto mt-3 flex items-center gap-3 text-ink/40" aria-hidden>
          <span className="h-px flex-1 bg-current" />
          <span className="font-display text-xs tracking-[0.4em]">✦ ✦ ✦</span>
          <span className="h-px flex-1 bg-current" />
        </div>

        {!endpoint && (
          <p className="relative mt-4 flex gap-2.5 rounded-lg border border-ink/15 bg-white/35 p-3 text-sm leading-snug text-ink/80">
            <Info size={18} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
            <span>
              Direct delivery isn't connected yet, so sending opens your email app with this message ready to go. You can
              also write to <a className="font-semibold underline underline-offset-2" href={`mailto:${profile.email}`}>{profile.email}</a>.
            </span>
          </p>
        )}

        <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={label}>Name</label>
            <input type="text" autoComplete="name" placeholder="Your name" {...field('name')} />
            {errorText('name')}
          </div>
          <div>
            <label htmlFor="contact-email" className={label}>Email</label>
            <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...field('email')} />
            {errorText('email')}
          </div>
        </div>
        <div className="relative mt-4">
          <label htmlFor="contact-subject" className={label}>Subject</label>
          <input type="text" placeholder="An adventure worth sailing for" {...field('subject')} />
          {errorText('subject')}
        </div>
        <div className="relative mt-4">
          <label htmlFor="contact-message" className={label}>Message</label>
          <textarea rows={5} placeholder="What should we build?" {...field('message')} className={`${field('message').className} resize-y`} />
          {errorText('message')}
        </div>

        <div className="relative mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink px-5 py-3.5 text-center font-display text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-parchment shadow-[0_8px_20px_-8px_rgba(42,28,15,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3d2a17] hover:shadow-[0_12px_28px_-10px_rgba(168,123,42,0.9)] disabled:opacity-70 sm:text-xs"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold-soft/25 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]" aria-hidden />
            {status === 'sending' ? (
              <Loader2 size={16} className="shrink-0 animate-spin" aria-hidden />
            ) : (
              <Send size={16} className="shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:translate-x-0.5" aria-hidden />
            )}
            <span>{status === 'sending' ? 'Sending…' : 'Send a message to the Future King of the Pirates'}</span>
          </button>
          <span className="hidden shrink-0 font-hand text-3xl leading-none text-ember/80 sm:block" aria-hidden>
            ✕
          </span>
        </div>

        <div aria-live="polite" className="relative">
          {status === 'sent' && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#2f6b4f]">
              <CheckCircle2 size={18} aria-hidden /> Message sent — thank you! I'll reply soon.
            </p>
          )}
          {status === 'composed' && (
            <p className="mt-4 flex gap-2 text-sm text-ink/80">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#2f6b4f]" aria-hidden />
              Your email app should now be open with the message drafted — press send there to deliver it. Nothing
              happened? Email {profile.email} directly.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 flex gap-2 text-sm font-medium text-ember">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden />
              The message couldn't be delivered. Please email {profile.email} directly.
            </p>
          )}
        </div>

        <AnimatePresence>
          {stamped && (
            <m.span
              key={status}
              initial={{ opacity: 0, scale: 2.2, rotate: -24 }}
              animate={{ opacity: 0.85, scale: 1, rotate: -12 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              className="pointer-events-none absolute right-6 top-24 rounded-md border-[3px] border-ember px-3 py-1.5 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ember sm:right-10"
              aria-hidden
            >
              {status === 'sent' ? 'Delivered' : 'Ready to sail'}
            </m.span>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

/** Folds, scorched corners, a compass watermark and a faint treasure route. */
function ParchmentDetails() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.7%,rgba(90,60,25,0.12)_50%,rgba(255,255,255,0.35)_50.3%,transparent_50.8%),linear-gradient(180deg,transparent_37.7%,rgba(90,60,25,0.1)_38%,rgba(255,255,255,0.3)_38.3%,transparent_38.8%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(70,40,10,0.35),transparent_18%),radial-gradient(circle_at_100%_0%,rgba(70,40,10,0.3),transparent_16%),radial-gradient(circle_at_100%_100%,rgba(70,40,10,0.35),transparent_20%),radial-gradient(circle_at_0%_100%,rgba(70,40,10,0.28),transparent_16%)]" />
      <svg viewBox="0 0 200 200" className="absolute left-1/2 top-1/2 h-[70%] max-h-80 -translate-x-1/2 -translate-y-1/2 text-ink opacity-[0.06]">
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
        {[0, 90, 180, 270].map((a) => (
          <path key={a} d="M100 12 L110 100 L100 90 L90 100Z" fill="currentColor" transform={`rotate(${a} 100 100)`} />
        ))}
        {[45, 135, 225, 315].map((a) => (
          <path key={a} d="M100 40 L106 100 L100 94 L94 100Z" fill="currentColor" transform={`rotate(${a} 100 100)`} />
        ))}
      </svg>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="absolute bottom-6 left-0 h-16 w-full text-ember opacity-25">
        <path d="M10 60 C 70 20, 120 75, 180 40 S 260 30, 285 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** An original skull-and-crossbones mark in ink. */
function JollyRoger({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="10" y1="12" x2="54" y2="56" />
        <line x1="54" y1="12" x2="10" y2="56" />
      </g>
      <g fill="currentColor">
        {[[10, 12], [54, 12], [10, 56], [54, 56]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />
        ))}
      </g>
      <path d="M32 10c-11 0-18 7-18 17 0 6 3 10 7 12v6h22v-6c4-2 7-6 7-12 0-10-7-17-18-17Z" fill="#efe0bd" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="25" cy="28" rx="4.5" ry="5" fill="currentColor" />
      <ellipse cx="39" cy="28" rx="4.5" ry="5" fill="currentColor" />
      <path d="M32 33l-2.5 4h5Z" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6">
        <line x1="27" y1="40" x2="27" y2="45" />
        <line x1="32" y1="40" x2="32" y2="45" />
        <line x1="37" y1="40" x2="37" y2="45" />
      </g>
    </svg>
  );
}
