import React from 'react';
import { StatsData, CardConfig, FieldId } from '../types/stats';
import { T } from '../lib/theme';
import { FIELD_DEFINITIONS, BADGE_DEFINITIONS } from '../lib/defaults';

interface CardPreviewProps {
  stats: StatsData;
  config: CardConfig;
}

function fmt(n: number | undefined) {
  if (n === undefined) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return String(n);
}

const SparkleIcon = ({ size = 16, color }: { size?: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
    <path d="m19 8-4 4" />
    <path d="m15 8 4 4" />
  </svg>
);

const StarIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} />
  </svg>
);

const HexagonIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const ZapIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} />
  </svg>
);

const ClockIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FlameIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const DollarIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CalendarIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const AlertIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const TerminalIcon = ({ color, size = 12 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ActivityGraph = ({ data, accent, barBg }: { data: number[]; accent: string; barBg: string }) => {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '28px', width: '100%' }}>
      {data.slice(-28).map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.max(8, (v / max) * 100)}%`,
            background: v >= max * 0.65 ? accent : barBg,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

const Row = ({ label, value, sub, t, icon, customIcon }: { label: string; value: string; sub?: string; t: any; icon?: string; customIcon?: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '14px', display: 'flex', justifyContent: 'center' }}>
        {customIcon || <span style={{ fontSize: '10px', color: t.accent }}>{icon}</span>}
      </div>
      <span style={{ fontSize: '12px', color: t.muted, letterSpacing: '0.01em' }}>{label}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', textAlign: 'right' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>{value}</span>
      {sub && <span style={{ fontSize: '11px', color: t.muted, marginLeft: '4px' }}>{sub}</span>}
    </div>
  </div>
);

const SplitBar = ({ ai, t }: { ai: number; t: any }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: '12px', color: t.muted }}>AI vs Human</span>
      <span style={{ fontSize: '12px', color: t.muted }}>
        <span style={{ color: t.accent, fontWeight: 600 }}>{ai}%</span>
        {' · '}
        <span style={{ color: t.barHuman }}>{100 - ai}%</span>
      </span>
    </div>
    <div style={{ height: '4px', borderRadius: '99px', background: t.barBg, display: 'flex' }}>
      <div style={{ width: `${ai}%`, height: '100%', background: t.barAi, borderRadius: '99px' }} />
    </div>
  </div>
);

export const CardPreview: React.FC<CardPreviewProps> = ({ stats, config }) => {
  const t = T[config.theme];
  const accent = config.accentColor || t.accent;
  const tWithAccent = { ...t, accent, barAi: accent, tagText: accent };

  const chaosColor = (stats.chaos || 0) >= 80 ? '#e05252' : (stats.chaos || 0) >= 55 ? '#e0904a' : '#7ab87a';

  const renderField = (fieldId: FieldId) => {
    if (config.hiddenFields.includes(fieldId)) return null;

    const def = FIELD_DEFINITIONS[fieldId];
    if (!def) return null;

    switch (fieldId) {
      case 'username':
        return null; // Handled in header if not hidden
      case 'model':
        return (
          <div key={fieldId} style={{ display: 'flex', gap: '8px', width: '100%' }}>
            {(stats.models || []).map((m, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: t.faint,
                  border: `1px solid ${t.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '9px', color: t.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.role}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: t.text }}>{m.id}</span>
              </div>
            ))}
          </div>
        );
      case 'tokens':
        return <Row key={fieldId} label="Tokens used" value={fmt(stats.tokens)} sub="tokens" t={tWithAccent} customIcon={<HexagonIcon color={tWithAccent.accent} />} />;
      case 'cost':
        return <Row key={fieldId} label="Est. cost" value={`$${(stats.cost || 0).toFixed(2)}`} sub="USD" t={tWithAccent} customIcon={<DollarIcon color={tWithAccent.accent} />} />;
      case 'streak':
        return <Row key={fieldId} label="Vibe streak" value={`${stats.streak || 0} days`} t={tWithAccent} customIcon={<ZapIcon color={tWithAccent.accent} />} />;
      case 'chaos':
        return (
          <Row
            key={fieldId}
            label="Chaos level"
            value={`${stats.chaos || 0}%`}
            sub={(stats.chaos || 0) >= 80 ? 'unhinged' : (stats.chaos || 0) >= 55 ? 'chaotic' : 'stable'}
            t={{ ...tWithAccent, text: chaosColor }}
            customIcon={<FlameIcon color={chaosColor} />}
          />
        );
      case 'session_hours':
        return <Row key={fieldId} label="Session hours" value={`${stats.session_hours || 0}h`} t={tWithAccent} customIcon={<ClockIcon color={tWithAccent.accent} />} />;
      case 'ai_pct':
        return <SplitBar key={fieldId} ai={stats.ai_pct || 0} t={tWithAccent} />;
      case 'activity':
        return (
          <div key={fieldId} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            <span style={{ fontSize: '11px', color: t.muted, letterSpacing: '0.01em' }}>{stats.activity_label || '28-day activity'}</span>
            <ActivityGraph data={stats.activity || []} accent={tWithAccent.barAi} barBg={t.barBg} />
          </div>
        );
      case 'tools':
        return (
          <div key={fieldId} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
             <div style={{ display: 'flex', gap: '6px' }}>
              {(stats.tools || []).slice(0, 4).map(tool => (
                <span
                  key={tool}
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: t.tag,
                    color: tWithAccent.tagText,
                    fontFamily: 'DM Mono, monospace',
                    border: `1px solid ${t.border}`,
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
            {stats.tool_logos && stats.tool_logos.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {stats.tool_logos.slice(0, 10).map(domain => (
                  <img
                    key={domain}
                    src={`https://img.logo.dev/${domain}?token=pk_WiwXIYQHTe6I5puSNMu9Gw&size=48`}
                    style={{ width: '22px', height: '22px', borderRadius: '4px' }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'stars':
        return <Row key={fieldId} label="GitHub Stars" value={fmt(stats.stars)} t={tWithAccent} customIcon={<StarIcon color={tWithAccent.accent} />} />;
      case 'badges':
        return (
          <div key={fieldId} style={{ display: 'flex', gap: '5px', width: '100%' }}>
            {(stats.badges || []).slice(0, 3).map(id => {
              const b = BADGE_DEFINITIONS.find(bd => bd.id === id);
              if (!b) return null;
              return (
                <span
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    background: t.faint,
                    color: t.muted,
                    border: `1px solid ${t.border}`,
                    letterSpacing: '0.01em',
                  }}
                >
                  <span style={{ fontSize: '9px', color: tWithAccent.accent }}>{b.icon}</span>
                  {b.label}
                </span>
              );
            })}
            {(stats.custom_badges || []).slice(0, 2).map((text, idx) => (
              <span
                key={`custom-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  padding: '3px 8px',
                  borderRadius: '99px',
                  background: t.faint,
                  color: t.muted,
                  border: `1px solid ${t.border}`,
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ fontSize: '9px', color: tWithAccent.accent }}>◈</span>
                {text}
              </span>
            ))}
          </div>
        );
      case 'prompt_type':
        return <Row key={fieldId} label="Fav Prompt" value={stats.prompt_type || 'N/A'} t={tWithAccent} customIcon={<TerminalIcon color={tWithAccent.accent} />} />;
      case 'hallucinations':
        return <Row key={fieldId} label="Hallucinations" value={fmt(stats.hallucinations)} sub="lines" t={tWithAccent} customIcon={<AlertIcon color={tWithAccent.accent} />} />;
      case 'last_updated':
        return <Row key={fieldId} label="Updated" value={stats.last_updated || 'N/A'} t={tWithAccent} customIcon={<CalendarIcon color={tWithAccent.accent} />} />;
      default:
        return null;
    }
  };

  const isWide = config.layout === 'wide';
  const isMini = config.layout === 'mini';
  const width = isWide ? 720 : isMini ? 300 : 380;
  const borderRadius = config.cornerRadius === 'rounded' ? '14px' : '0px';

  const fieldsToShow = isMini 
    ? config.fieldOrder.filter(f => !config.hiddenFields.includes(f)).slice(0, 3)
    : config.fieldOrder;

  return (
    <div
      style={{
        width: `${width}px`,
        background: t.surface,
        border: config.showBorder ? `1px solid ${t.border}` : 'none',
        borderRadius,
        padding: '20px',
        fontFamily: 'DM Sans, system-ui, sans-serif',
        boxShadow: config.theme === 'light'
          ? '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      {!config.hiddenFields.includes('username') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
          <SparkleIcon size={18} color={tWithAccent.accent} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: t.text, letterSpacing: '-0.01em' }}>
            {stats.username || 'vibe_coder'}
          </span>
        </div>
      )}

      {!config.hiddenFields.includes('username') && <div style={{ height: '1px', background: t.border, width: '100%' }} />}

      {isWide ? (
        <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {config.fieldOrder.filter(f => !['activity', 'badges'].includes(f)).slice(0, Math.ceil(config.fieldOrder.filter(f => !['activity', 'badges'].includes(f)).length / 2)).map(renderField)}
            {!config.hiddenFields.includes('activity') && renderField('activity')}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {config.fieldOrder.filter(f => !['activity', 'badges'].includes(f)).slice(Math.ceil(config.fieldOrder.filter(f => !['activity', 'badges'].includes(f)).length / 2)).map(renderField)}
            {!config.hiddenFields.includes('badges') && renderField('badges')}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMini ? '8px' : '12px', width: '100%' }}>
          {fieldsToShow.map(renderField)}
        </div>
      )}

      {config.collapsible && isMini && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '-8px' }}>
          <span style={{ fontSize: '10px', color: t.accent, fontWeight: 600 }}>▼ Click to expand</span>
        </div>
      )}

      {/* Footer Branding */}
      {stats.show_footer !== false && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
             {stats.show_logo && <SparkleIcon size={12} color={tWithAccent.accent} />}
             <span style={{ fontSize: '9px', color: t.muted }}>{stats.branding_label || '⚡ Vibe Wrapped'}</span>
          </div>
          <span style={{ fontSize: '9px', color: t.muted, opacity: 0.5 }}>vibewrapped.vercel.app</span>
        </div>
      )}
    </div>
  );
};
