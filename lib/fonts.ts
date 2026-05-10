export async function getFonts() {
  const [dmSansData, dmMonoData] = await Promise.all([
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-400-normal.ttf").then(r => r.arrayBuffer()),
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/dm-mono@latest/latin-400-normal.ttf").then(r => r.arrayBuffer())
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
