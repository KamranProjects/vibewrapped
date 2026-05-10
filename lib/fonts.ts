export async function getFonts() {
  const [dmSansData, dmMonoData] = await Promise.all([
    fetch("https://fonts.bunny.net/dm-sans/files/dm-sans-latin-500-normal.ttf").then(r => r.arrayBuffer()),
    fetch("https://fonts.bunny.net/dm-mono/files/dm-mono-latin-400-normal.ttf").then(r => r.arrayBuffer())
  ]);

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
