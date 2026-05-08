export async function getFonts() {
  const dmSansData = await fetch(
    'https://fonts.gstatic.com/s/dmsans/v14/rP2Fp2K8zQ2OLK8fT5asWvO_ADU.ttf'
  ).then(res => res.arrayBuffer());

  const dmMonoData = await fetch(
    'https://fonts.gstatic.com/s/dmmono/v14/33X7da9MBy89S0C3mSkI6X0.ttf'
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
