// The brand slot: what the header and the sidebar show as the mark, and the icons the browser shows.
// The default is Datum. A client-facing project sets `brand` in site.config.ts to its own files, kept
// outside public/brand (which the kit syncs), and sets `wordmark` to null when the mark carries the
// name. Every path is under public/.
export type Brand = {
  mark: {
    onLight: string;        // the file shown on the light ground
    onDark?: string;        // the file shown on the dark ground; falls back to onLight
    width: number;          // rendered size in CSS pixels
    height: number;
    alt?: string;           // empty when a wordmark beside it says the name
    rounded?: boolean;      // the Datum mark is a square PNG that wants soft corners; most logos do not
  };
  wordmark: { text: string; accent?: string } | null;
  icons: { icon: { url: string; sizes?: string; type?: string }[]; apple?: string };
};

export const DEFAULT_BRAND: Brand = {
  mark: { onLight: '/brand/datum-mark.png', width: 22, height: 22, alt: '', rounded: true },
  wordmark: { text: 'datum', accent: 'labs' },
  icons: { icon: [{ url: '/brand/favicon-32.png', sizes: '32x32' }, { url: '/brand/favicon-64.png', sizes: '64x64' }], apple: '/brand/apple-touch-icon.png' },
};

// Projects scaffolded before the slot existed have no `brand` in site.config.ts; they keep the default.
export function brandOf(site: { brand?: Brand }): Brand {
  return site.brand ?? DEFAULT_BRAND;
}
