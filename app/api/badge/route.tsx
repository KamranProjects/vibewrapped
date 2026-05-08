import satori from 'satori';
import { NextRequest } from 'next/server';
import { parseParams } from '@/lib/parseParams';
import { getFonts } from '@/lib/fonts';
import { T } from '@/lib/theme';

export const runtime = 'edge';

function fmt(n: number | undefined) {
  if (n === undefined) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return String(n);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { stats, config } = parseParams(searchParams);

    const fonts = await getFonts();
    const t = T[config.theme];

    const label = `⚡ ${stats.model || 'claude'}  |  ${fmt(stats.tokens)} tokens  |  ${stats.ai_pct || 0}% AI`;

    const svg = await satori(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: '6px',
          padding: '4px 12px',
          color: t.text,
          fontSize: '12px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
        }}
      >
        {label}
      </div>,
      {
        height: 28,
        fonts: fonts as any,
      }
    );

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, s-maxage=3600',
      },
    });
  } catch (e: any) {
    return new Response(`Failed to generate badge`, { status: 500 });
  }
}
