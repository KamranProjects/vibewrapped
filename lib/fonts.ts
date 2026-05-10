export async function getFonts() {
  const dmSansData = await fetch(
    'https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2'
  ).then(res => res.arrayBuffer());

  const dmMonoData = await fetch(
    'https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthSQBLyM.woff2'
  ).then(res => res.arrayBuffer());

  return [
    {
      name: 'DM Sans',
      data: dmSansData,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'DM Mono',
      data: dmMonoData,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}
