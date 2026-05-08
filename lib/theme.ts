export const T = {
  dark: {
    bg: '#1a1a1a',
    surface: '#212121',
    border: '#2e2e2e',
    borderHover: '#3a3a3a',
    text: '#ececec',
    muted: '#8a8a8a',
    faint: '#3d3d3d',
    accent: '#d4a96a', // claude warm amber
    accentSub: '#b8864e',
    tag: '#2a2a2a',
    tagText: '#d4a96a',
    barBg: '#2e2e2e',
    barAi: '#d4a96a',
    barHuman: '#4a4a5a',
  },
  light: {
    bg: '#f9f7f4', // claude.ai warm off-white
    surface: '#ffffff',
    border: '#e8e4de',
    borderHover: '#d4cfc8',
    text: '#1a1a1a',
    muted: '#7a7570',
    faint: '#f0ede8',
    accent: '#c96442', // claude coral
    accentSub: '#a84f34',
    tag: '#f5f0eb',
    tagText: '#c96442',
    barBg: '#ede9e3',
    barAi: '#c96442',
    barHuman: '#c5bdb4',
  },
};

export type ThemeTokens = typeof T.light;
