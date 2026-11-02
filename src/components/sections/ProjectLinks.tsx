import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../data/projects';

/**
 * Renders real links when a verified URL exists in the data, and an honest,
 * non-interactive "coming soon" label otherwise — never a dead button.
 */
export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { github, demo } = project.links;
  const pending = 'inline-flex items-center gap-1.5 rounded-full border border-dashed border-mist/20 px-3 py-1.5 text-xs text-mist/55';
  const live = 'inline-flex items-center gap-1.5 rounded-full border border-mist/25 px-3 py-1.5 text-xs font-semibold text-parchment transition hover:border-gold/60 hover:text-gold-soft';

  return (
    <>
      {github ? (
        <a href={github} target="_blank" rel="noreferrer" className={live}>
          <Github size={14} aria-hidden /> Source
        </a>
      ) : (
        <span className={pending} title="Repository link will be added">
          <Github size={14} aria-hidden /> {compact ? 'Repo soon' : 'Repository link coming soon'}
        </span>
      )}
      {demo ? (
        <a href={demo} target="_blank" rel="noreferrer" className={live}>
          <ExternalLink size={14} aria-hidden /> Live demo
        </a>
      ) : (
        !compact && (
          <span className={pending} title="No public demo yet">
            <ExternalLink size={14} aria-hidden /> Demo not yet public
          </span>
        )
      )}
    </>
  );
}
