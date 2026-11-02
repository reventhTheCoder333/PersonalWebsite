import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import { profile } from '../../data/profile';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'composed' | 'error';

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || '';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!emailPattern.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  else if (f.message.length > 4000) e.message = 'Please keep your message under 4,000 characters.';
  return e;
}

/**
 * With VITE_CONTACT_ENDPOINT set, messages are POSTed as JSON (Formspree-compatible).
 * Without it, the form says so plainly and hands the message to the visitor's email app.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
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
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${fields.name.trim()}`);
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
        body: JSON.stringify({ name: fields.name.trim(), email: fields.email.trim(), message: fields.message.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setFields({ name: '', email: '', message: '' });
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
    className: `mt-1.5 w-full rounded-xl border bg-[#fbf4e2]/80 px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition focus:bg-white/90 focus:ring-2 focus:ring-gold-deep/50 ${
      touched[name] && errors[name] ? 'border-ember/70' : 'border-ink/20 focus:border-gold-deep'
    }`,
  });

  const errorText = (name: keyof Fields) =>
    touched[name] && errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm font-medium text-ember">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="parchment relative rounded-[1.5rem] p-6 sm:p-8" aria-labelledby="contact-form-title">
      <p className="font-hand text-xl text-ink/60">A message in a bottle</p>
      <h3 id="contact-form-title" className="font-display text-2xl font-bold text-ink">
        Send word to the captain
      </h3>

      {!endpoint && (
        <p className="mt-4 flex gap-2.5 rounded-xl border border-ink/15 bg-white/40 p-3 text-sm leading-snug text-ink/80">
          <Info size={18} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
          <span>
            Direct delivery isn't connected yet, so sending opens your email app with this message ready to go. You can
            also write to <a className="font-semibold underline underline-offset-2" href={`mailto:${profile.email}`}>{profile.email}</a>.
          </span>
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-ink/85">Name</label>
          <input type="text" autoComplete="name" placeholder="Your name" {...field('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-ink/85">Email</label>
          <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...field('email')} />
          {errorText('email')}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-semibold text-ink/85">Message</label>
        <textarea rows={5} placeholder="What should we build?" {...field('message')} className={`${field('message').className} resize-y`} />
        {errorText('message')}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold tracking-wide text-parchment transition hover:bg-[#3d2a17] disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
        {endpoint ? (status === 'sending' ? 'Sending…' : 'Send message') : 'Open in my email app'}
      </button>

      <div aria-live="polite" className="min-h-0">
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
    </form>
  );
}
