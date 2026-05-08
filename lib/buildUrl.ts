import { StatsData, CardConfig } from '../types/stats';

export function buildUrl(stats: StatsData, config: CardConfig, baseUrl: string = '/api/card'): string {
  const params = new URLSearchParams();

  // Config params
  if (config.theme !== 'light') params.set('theme', config.theme);
  if (config.layout !== 'compact') params.set('layout', config.layout);
  if (config.accentColor) params.set('accentColor', config.accentColor);
  if (!config.showBorder) params.set('showBorder', 'false');
  if (config.cornerRadius !== 'rounded') params.set('cornerRadius', config.cornerRadius);
  if (config.fontSize !== 'default') params.set('fontSize', config.fontSize);
  if (config.collapsible) params.set('collapsible', 'true');
  if (config.fieldOrder.length > 0) params.set('fields', config.fieldOrder.join(','));

  // Stats params
  if (stats.username) params.set('username', stats.username);
  if (stats.models && stats.models.length > 0) {
    params.set('models', stats.models.map(m => `${m.role}:${m.id}`).join(','));
  }
  if (stats.tokens !== undefined) params.set('tokens', stats.tokens.toString());
  if (stats.cost !== undefined) params.set('cost', stats.cost.toString());
  if (stats.ai_pct !== undefined) params.set('ai_pct', stats.ai_pct.toString());
  if (stats.streak !== undefined) params.set('streak', stats.streak.toString());
  if (stats.chaos !== undefined) params.set('chaos', stats.chaos.toString());
  if (stats.session_hours !== undefined) params.set('session_hours', stats.session_hours.toString());
  if (stats.tools && stats.tools.length > 0) params.set('tools', stats.tools.join(','));
  if (stats.tool_logos && stats.tool_logos.length > 0) params.set('tool_logos', stats.tool_logos.join(','));
  if (stats.activity && stats.activity.length > 0) params.set('activity', stats.activity.join(','));
  if (stats.activity_label) params.set('activity_label', stats.activity_label);
  if (stats.badges && stats.badges.length > 0) params.set('badges', stats.badges.join(','));
  if (stats.custom_badges && stats.custom_badges.length > 0) params.set('custom_badges', stats.custom_badges.join(','));
  if (stats.prompt_type) params.set('prompt_type', stats.prompt_type);
  if (stats.hallucinations !== undefined) params.set('hallucinations', stats.hallucinations.toString());
  if (stats.last_updated) params.set('last_updated', stats.last_updated);
  if (stats.stars !== undefined) params.set('stars', stats.stars.toString());
  if (stats.branding_label) params.set('branding_label', stats.branding_label);
  if (stats.show_logo !== undefined) params.set('show_logo', stats.show_logo.toString());
  if (stats.show_footer !== undefined) params.set('show_footer', stats.show_footer.toString());

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
