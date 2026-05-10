import { ImageResponse } from 'next/og';
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

    const visibleFields = config.fieldOrder.filter(f => !config.hiddenFields.includes(f));
    const fieldCount = visibleFields.length;
    let height = 150;
    if (config.layout === 'mini') {
      height = 150 + (Math.min(fieldCount, 3) * 35);
    } else if (config.layout === 'wide') {
      height = 340;
    } else {
      height = 150 + (fieldCount * 35);
      if (visibleFields.includes('activity')) height += 40;
      if (visibleFields.includes('tools')) height += 20;
      if (visibleFields.includes('badges')) height += 20;
      if (visibleFields.includes('model')) height += 30;
    }

    const width = config.layout === 'wide' ? 720 : config.layout === 'mini' ? 300 : 380;

    const imgResponse = new ImageResponse(
      (
        <CardPreview stats={stats} config={config} />
      ),
      {
        width,
        height,
        fonts: fonts as any,
      }
    );

    const imgBuffer = await imgResponse.arrayBuffer();

    return new Response(imgBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
