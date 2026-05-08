export type Theme = 'light' | 'dark';
export type Layout = 'compact' | 'wide';

export type FieldId =
  | 'username'
  | 'model'
  | 'tokens'
  | 'cost'
  | 'ai_pct'
  | 'human_pct'
  | 'streak'
  | 'chaos'
  | 'session_hours'
  | 'tools'
  | 'activity'
  | 'badges'
  | 'prompt_type'
  | 'hallucinations'
  | 'last_updated'
  | 'stars'
  | 'branding_label'
  | 'show_logo';

export interface StatsData {
  username?: string;
  models?: { id: string; role: string }[]; // Support multiple models
  tokens?: number;
  cost?: number;
  ai_pct?: number;
  human_pct?: number;
  streak?: number;
  chaos?: number;
  session_hours?: number;
  tools?: string[];
  tool_logos?: string[]; 
  activity?: number[];
  activity_label?: string;
  badges?: string[];
  custom_badges?: string[];
  prompt_type?: string;
  hallucinations?: number;
  last_updated?: string;
  stars?: number;
  branding_label?: string; // Custom footer text
  show_logo?: boolean;
  show_footer?: boolean;
}

export interface CardConfig {
  theme: Theme;
  layout: Layout;
  accentColor?: string;
  showBorder: boolean;
  cornerRadius: 'rounded' | 'sharp';
  fieldOrder: FieldId[];
  hiddenFields: FieldId[];
  fontSize: 'default' | 'compact' | 'spacious';
  collapsible?: boolean;
}
