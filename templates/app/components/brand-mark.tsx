// The brand in the header and the sidebar: the mark, and the wordmark when the mark does not carry the
// name. Reads the brand slot in site.config.ts, so a client-facing project swaps its own in without
// touching a shell. Server component; both shells render it inside their home link.
import Image from 'next/image';
import { site } from '@/site.config';
import { brandOf } from '@/lib/brand';
import { cn } from '@/lib/utils';

export function BrandMark({ className }: { className?: string }) {
  const { mark, wordmark } = brandOf(site);
  const img = (src: string, extra?: string) => (
    <Image src={src} alt={mark.alt ?? ''} width={mark.width} height={mark.height} priority unoptimized={src.endsWith('.svg')}
      className={cn('shrink-0', mark.rounded && 'rounded-[6px]', extra)} style={{ width: mark.width, height: mark.height }} />
  );
  const swaps = !!mark.onDark && mark.onDark !== mark.onLight;
  return (
    <span className={cn('flex items-center gap-2', className)}>
      {swaps ? <>{img(mark.onLight, 'dark:hidden')}{img(mark.onDark as string, 'hidden dark:block')}</> : img(mark.onLight)}
      {wordmark ? <span className="text-base font-semibold">{wordmark.text}{wordmark.accent ? <span className="text-(--brand-blue)">{wordmark.accent}</span> : null}</span> : null}
    </span>
  );
}
