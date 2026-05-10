import { FieldId, StatsData, CardConfig } from '../types/stats';

export const FIELD_DEFINITIONS: Record<FieldId, { icon: string; label: string; type: string }> = {
  username: { icon: '@', label: 'Username', type: 'text' },
  model: { icon: '◈', label: 'Main Model Used', type: 'select' },
  tokens: { icon: '⬡', label: 'Total Tokens', type: 'number' },
  cost: { icon: '$', label: 'Estimated Cost (USD)', type: 'number' },
  ai_pct: { icon: '〜', label: 'AI Contribution %', type: 'number' },
  human_pct: { icon: '◯', label: 'Human Contribution %', type: 'number' },
  streak: { icon: '⚡', label: 'Vibe Coding Streak', type: 'number' },
  chaos: { icon: '💀', label: 'Chaos Level', type: 'number' },
  session_hours: { icon: '◷', label: 'Session Hours', type: 'number' },
  tools: { icon: '⊞', label: 'Top Tools Used', type: 'multi-text' },
  activity: { icon: '▂▄▆', label: '28-day Activity', type: 'activity' },
  badges: { icon: '◉', label: 'Badges', type: 'multi-select' },
  prompt_type: { icon: '✦', label: 'Fav Prompt Type', type: 'text' },
  hallucinations: { icon: '∿', label: 'Lines Hallucinated', type: 'number' },
  last_updated: { icon: '📅', label: 'Last Updated', type: 'date' },
  stars: { icon: '⭐', label: 'GitHub Stars', type: 'number' },
  branding_label: { icon: '🏷️', label: 'Custom Branding', type: 'text' },
  show_logo: { icon: '✨', label: 'Show Logo', type: 'boolean' },
};

export const MODEL_OPTIONS = [
  // Anthropic
  { id: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet', provider: 'Anthropic' },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku', provider: 'Anthropic' },
  { id: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic' },

  // OpenAI
  { id: 'o1-pro', label: 'OpenAI o1 Pro', provider: 'OpenAI' },
  { id: 'o1-preview', label: 'OpenAI o1 Preview', provider: 'OpenAI' },
  { id: 'o1-mini', label: 'OpenAI o1 Mini', provider: 'OpenAI' },
  { id: 'gpt-4.5', label: 'GPT-4.5', provider: 'OpenAI' },
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },

  // Google
  { id: 'gemini-2-pro', label: 'Gemini 2.0 Pro', provider: 'Google' },
  { id: 'gemini-2-flash', label: 'Gemini 2.0 Flash', provider: 'Google' },
  { id: 'gemini-1-5-pro', label: 'Gemini 1.5 Pro', provider: 'Google' },
  { id: 'gemini-1-5-flash', label: 'Gemini 1.5 Flash', provider: 'Google' },

  // DeepSeek
  { id: 'deepseek-r1', label: 'DeepSeek R1', provider: 'DeepSeek' },
  { id: 'deepseek-v3', label: 'DeepSeek V3', provider: 'DeepSeek' },
  { id: 'deepseek-coder-v2', label: 'DeepSeek Coder V2', provider: 'DeepSeek' },

  // Meta
  { id: 'llama-3-3-70b', label: 'Llama 3.3 70B', provider: 'Meta' },
  { id: 'llama-3-1-405b', label: 'Llama 3.1 405B', provider: 'Meta' },
  { id: 'llama-3-1-70b', label: 'Llama 3.1 70B', provider: 'Meta' },

  // Mistral
  { id: 'mistral-large-2', label: 'Mistral Large 2', provider: 'Mistral' },
  { id: 'codestral', label: 'Codestral', provider: 'Mistral' },

  // xAI
  { id: 'grok-3', label: 'Grok 3', provider: 'xAI' },
  { id: 'grok-2', label: 'Grok 2', provider: 'xAI' },

  // Other
  { id: 'custom', label: 'Custom Model', provider: 'Other' },
];

export const TOOL_OPTIONS = [
  { id: 'cursor', label: 'Cursor', domain: 'cursor.com' },
  { id: 'replit', label: 'Replit', domain: 'replit.com' },
  { id: 'claude-code', label: 'Claude Code', domain: 'anthropic.com' },
  { id: 'antigravity', label: 'Antigravity', domain: 'antigravity.google' },
  { id: 'copilot', label: 'GitHub Copilot', domain: 'github.com' },
  { id: 'windsurf', label: 'Windsurf', domain: 'windsurf.ai' },
  { id: 'coderabbit', label: 'CodeRabbit', domain: 'coderabbit.ai' },
  { id: 'lovable', label: 'Lovable', domain: 'lovable.dev' },
  { id: 'v0', label: 'v0.dev', domain: 'v0.dev' },
  { id: 'bolt', label: 'bolt.new', domain: 'stackblitz.com' },
  { id: 'cody', label: 'Cody', domain: 'sourcegraph.com' },
  { id: 'tabnine', label: 'Tabnine', domain: 'tabnine.com' },
  { id: 'supermaven', label: 'Supermaven', domain: 'supermaven.com' },
  { id: 'docker', label: 'Docker', domain: 'docker.com' },
  { id: 'github', label: 'GitHub', domain: 'github.com' },
  { id: 'gitlab', label: 'GitLab', domain: 'gitlab.com' },
  { id: 'aws', label: 'AWS', domain: 'aws.amazon.com' },
  { id: 'vercel', label: 'Vercel', domain: 'vercel.com' },
  { id: 'supabase', label: 'Supabase', domain: 'supabase.com' },
  { id: 'linear', label: 'Linear', domain: 'linear.app' },
];

export const DEFAULT_STATS: StatsData = {
  username: 'vibe_coder_9000',
  models: [
    { id: 'claude-3-5-sonnet', role: 'Main' },
    { id: 'gemini-1-5-pro', role: 'Dev' },
  ],
  tokens: 2847392,
  cost: 34.18,
  ai_pct: 87,
  human_pct: 13,
  streak: 14,
  chaos: 91,
  session_hours: 312,
  tools: [],
  activity: [2, 5, 3, 8, 6, 12, 9, 4, 7, 11, 8, 5, 14, 10, 6, 9, 13, 7, 11, 8, 15, 12, 10, 14, 18, 12, 16, 20],
  badges: ['vibe_coded', 'token_addict'],
  prompt_type: 'Chain of Thought',
  hallucinations: 4204,
  last_updated: '2024-05-08',
  stars: 128,
  activity_label: 'GitHub Commits',
  tool_logos: ['cursor.com', 'anthropic.com', 'replit.com'],
  branding_label: '⚡ Vibe Wrapped',
  show_logo: true,
  show_footer: true,
};

export const DEFAULT_CONFIG: CardConfig = {
  theme: 'light',
  layout: 'compact',
  collapsible: false,
  showBorder: true,
  cornerRadius: 'rounded',
  fieldOrder: [
    'username',
    'model',
    'tokens',
    'cost',
    'streak',
    'chaos',
    'session_hours',
    'ai_pct',
    'activity',
    'tools',
    'badges',
    'stars',
  ],
  hiddenFields: [],
  fontSize: 'default',
};

export const BADGE_DEFINITIONS = [
  { id: 'vibe_master', icon: '⚡', label: 'Vibe Master' },
  { id: 'vibe_coded', icon: '〜', label: '90% Vibe Coded' },
  { id: 'human_verified', icon: '◯', label: 'Human Verified' },
  { id: 'token_addict', icon: '◈', label: 'Token Addict' },
  { id: 'no_grass', icon: '○', label: 'Touched Grass: No' },
  { id: 'chaos_agent', icon: '💀', label: 'Chaos Agent' },
  { id: 'prompt_goblin', icon: '✦', label: 'Prompt Goblin' },
];
