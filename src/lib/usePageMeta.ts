import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Imported image asset (Vite resolves this to a URL at build time). */
  image: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/* Sets a unique document title, meta description, Open Graph, and Twitter Card tags
   for the current route. Pure <head> side effect — no rendered output, so it can't
   affect layout/styling. Since this is a client-only SPA (no SSR/prerendering), these
   tags are only visible to crawlers that execute JavaScript; index.html's static tags
   (used by non-JS crawlers hitting any route, since all paths rewrite to it) reflect
   the home page as the most sensible default. */
export function usePageMeta({ title, description, image }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const absoluteImage = new URL(image, window.location.origin).href;
    const url = window.location.href;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);
  }, [title, description, image]);
}
