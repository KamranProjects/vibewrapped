import satori from 'satori';
import { NextRequest } from 'next/server';
import { parseParams } from '@/lib/parseParams';
import { CardPreview } from '@/components/CardPreview';
import { getFonts } from '@/lib/fonts';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { stats, config } = parseParams(searchParams);

    const fonts = await getFonts();

    // Calculate approximate height based on number of fields
    const fieldCount = config.fieldOrder.length;
    let height = 150; // base header/footer
    if (config.layout === 'wide') {
      height = 340;
    } else {
      height = 150 + (fieldCount * 35);
      if (config.fieldOrder.includes('activity')) height += 40;
      if (config.fieldOrder.includes('tools')) height += 20;
      if (config.fieldOrder.includes('badges')) height += 20;
    }

    const width = config.layout === 'wide' ? 720 : 380;

    const svg = await satori(
      <CardPreview stats={stats} config={config} />,
      {
        width,
        height,
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
    console.error(e.message);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
