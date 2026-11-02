# The Grand Line — Reventh Sathish Kumar's Portfolio

A One Piece–inspired developer portfolio built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons. All illustrations (ship, compass, islands, devil fruits, poneglyph glyphs) are original inline SVG — no raster images or third-party artwork.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Updating content

Everything on the page is driven by typed data files in `src/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, degree, GPA, contact links, availability text, **profile photo**, poster bounty |
| `projects.ts` | Project islands — description, tech, highlights, metrics, **GitHub/demo links** |
| `skills.ts` | Devil Fruit skill groups and certifications |
| `research.ts` | Poneglyph research entries and the publications list |
| `timeline.ts` | Experience & achievements timeline (add `volunteer` / `work` entries here) |

- **Profile photo:** put an image in `public/` (e.g. `public/profile.jpg`) and set `photo: '/profile.jpg'` in `profile.ts`.
- **Project links:** set `links: { github: '…', demo: '…' }` on a project. Until then the UI shows a muted "coming soon" label instead of a dead button.

## Contact form

The form validates name, email and message. Delivery depends on configuration:

- **With an endpoint:** copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to any service that accepts a JSON `POST { name, email, message }` (e.g. Formspree). Messages are then sent directly.
- **Without one (default):** the form says so plainly and opens the visitor's email app with the message pre-filled.

## Accessibility & motion

Semantic landmarks, skip link, keyboard-operable dialog with focus trap, visible focus rings, and `prefers-reduced-motion` support (ambient animations stop; Framer Motion transitions are reduced).
