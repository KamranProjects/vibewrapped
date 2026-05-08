import { StatsData, CardConfig, Theme, Layout, FieldId } from '../types/stats';
import { DEFAULT_STATS, DEFAULT_CONFIG } from './defaults';

export function parseParams(searchParams: URLSearchParams): { stats: StatsData; config: CardConfig } {
  const stats: StatsData = { ...DEFAULT_STATS };
  const config: CardConfig = { ...DEFAULT_CONFIG };

  // Parse Config
  const theme = searchParams.get('theme') as Theme;
  if (theme === 'light' || theme === 'dark') config.theme = theme;

  const layout = searchParams.get('layout') as Layout;
  if (layout === 'compact' || layout === 'wide') config.layout = layout;

  const accentColor = searchParams.get('accentColor');
  if (accentColor) config.accentColor = accentColor;

  const showBorder = searchParams.get('showBorder');
  if (showBorder === 'false') config.showBorder = false;

  const cornerRadius = searchParams.get('cornerRadius');
  if (cornerRadius === 'rounded' || cornerRadius === 'sharp') config.cornerRadius = cornerRadius;

  const fontSize = searchParams.get('fontSize');
  if (fontSize === 'default' || fontSize === 'compact' || fontSize === 'spacious') config.fontSize = fontSize;

  const collapsible = searchParams.get('collapsible');
  if (collapsible === 'true') config.collapsible = true;

  const fields = searchParams.get('fields');
  if (fields) {
    config.fieldOrder = fields.split(',') as FieldId[];
  }

  // Parse Stats
  const username = searchParams.get('username');
  if (username) stats.username = username;

  const modelsStr = searchParams.get('models');
  if (modelsStr) {
    stats.models = modelsStr.split(',').map(m => {
      const [role, id] = m.split(':');
      return { role: role || 'Model', id: id || 'claude-3-5-sonnet' };
    });
  }

  const tokens = parseInt(searchParams.get('tokens') || '');
  if (!isNaN(tokens)) stats.tokens = tokens;

  const cost = parseFloat(searchParams.get('cost') || '');
  if (!isNaN(cost)) stats.cost = cost;

  const ai_pct = parseInt(searchParams.get('ai_pct') || '');
  if (!isNaN(ai_pct)) {
    stats.ai_pct = Math.min(100, Math.max(0, ai_pct));
    stats.human_pct = 100 - stats.ai_pct;
  }

  const streak = parseInt(searchParams.get('streak') || '');
  if (!isNaN(streak)) stats.streak = streak;

  const chaos = parseInt(searchParams.get('chaos') || '');
  if (!isNaN(chaos)) stats.chaos = Math.min(100, Math.max(0, chaos));

  const session_hours = parseInt(searchParams.get('session_hours') || '');
  if (!isNaN(session_hours)) stats.session_hours = session_hours;

  const tools = searchParams.get('tools');
  if (tools) stats.tools = tools.split(',');

  const tool_logos = searchParams.get('tool_logos');
  if (tool_logos) stats.tool_logos = tool_logos.split(',');

  const activity = searchParams.get('activity');
  if (activity) stats.activity = activity.split(',').map(n => parseInt(n)).filter(n => !isNaN(n));

  const activity_label = searchParams.get('activity_label');
  if (activity_label) stats.activity_label = activity_label;

  const badges = searchParams.get('badges');
  if (badges) stats.badges = badges.split(',');

  const custom_badges = searchParams.get('custom_badges');
  if (custom_badges) stats.custom_badges = custom_badges.split(',');

  const prompt_type = searchParams.get('prompt_type');
  if (prompt_type) stats.prompt_type = prompt_type;

  const hallucinations = parseInt(searchParams.get('hallucinations') || '');
  if (!isNaN(hallucinations)) stats.hallucinations = hallucinations;

  const last_updated = searchParams.get('last_updated');
  if (last_updated) stats.last_updated = last_updated;

  const stars = parseInt(searchParams.get('stars') || '');
  if (!isNaN(stars)) stats.stars = stars;

  const branding_label = searchParams.get('branding_label');
  if (branding_label) stats.branding_label = branding_label;

  const show_logo = searchParams.get('show_logo');
  if (show_logo === 'false') stats.show_logo = false;
  else if (show_logo === 'true') stats.show_logo = true;

  const show_footer = searchParams.get('show_footer');
  if (show_footer === 'false') stats.show_footer = false;
  else if (show_footer === 'true') stats.show_footer = true;

  return { stats, config };
}
