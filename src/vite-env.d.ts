/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (e.g. Formspree / Netlify function) that accepts JSON POSTs. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
