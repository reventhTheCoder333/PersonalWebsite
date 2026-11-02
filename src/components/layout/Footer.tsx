import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-abyss py-10">
      <div className="container-sea flex flex-col items-center justify-between gap-6 text-sm text-mist/70 md:flex-row">
        <p className="text-center md:text-left">
          <span className="font-display tracking-[0.2em] text-parchment">{profile.name}</span>
          <br />
          <span className="text-xs">© {new Date().getFullYear()} · Designed &amp; built on the Grand Line.</span>
        </p>
        <ul className="flex items-center gap-2">
          {[
            { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
            { href: profile.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
            { href: profile.links.github, label: 'GitHub', Icon: Github },
          ].map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="grid h-10 w-10 place-items-center rounded-full border border-mist/15 transition hover:border-gold/60 hover:text-gold-soft"
              >
                <Icon size={16} />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#home"
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-mist/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest transition hover:border-tide/60 hover:text-parchment"
            >
              <ArrowUp size={14} /> Back to port
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
