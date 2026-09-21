// The only file most projects need to edit. Name the project, its navigation and the links in the
// footer. Everything else in the template reads from here, so a new project is this file plus pages.
import type { NavEntry, NavLink } from '@/lib/nav';

// `datum-ui new` fills the {{placeholders}}. Until then the template runs as the kit's own gallery
// under these fallbacks, so it can be opened and judged as it is.
const ph = (v: string, fallback: string) => (v.startsWith('{{') && v.endsWith('}}') ? fallback : v);

// Declared with their types (rather than inline) so the sidebar and the palette always see the wide
// NavEntry shape, even in a project whose nav has no sub-items.
const NAV: NavEntry[] = [
    { href: '/', label: 'Start here', icon: 'home' },
    { href: '/foundations', label: 'Foundations', icon: 'palette' },
    { href: '/components', label: 'Components', icon: 'squares' },
    {
      href: '/patterns', label: 'Patterns', icon: 'layout',
      children: [
        { href: '/patterns/list', label: 'List page' },
        { href: '/patterns/detail', label: 'Detail page' },
        { href: '/patterns/form', label: 'Form page' },
        { href: '/patterns/states', label: 'Empty, loading, error' },
        { href: '/landing', label: 'Landing page' },
      ],
    },
];
const LINKS: NavLink[] = [
    { href: 'https://www.datumlab.xyz', label: 'datumlab.xyz' },
    { href: 'https://github.com/DatumLabMHQ/datum-ui-kit', label: 'The kit on GitHub' },
];

export const site = {
  name: ph('{{title}}', 'Datum UI kit'),
  // One sentence: what this is and who it is for. Used as the meta description and on the home page.
  description: ph('{{description}}', 'How we build interfaces at Datum Labs: shadcn/ui components on the Datum tokens, one shell, one set of rules, and the checks that keep them true.'),
  // The line under the wordmark in the sidebar, and the browser tab suffix.
  owner: 'Datum Labs',
  // Left nav. `icon` is a name from lib/nav.ts ICONS; `children` render as a collapsible list.
  nav: NAV,
  // Shown in the footer and the command palette's "Datum" group.
  links: LINKS,
  // One line in the footer: what a reader should know about this app. Keep it honest.
  footnote: 'Built on the Datum UI kit: shadcn/ui components, Datum tokens, Phosphor icons.',
};
export type Site = typeof site;
