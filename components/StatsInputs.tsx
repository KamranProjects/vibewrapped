import { StatsData, FieldId } from '../types/stats';
import { FIELD_DEFINITIONS, BADGE_DEFINITIONS, MODEL_OPTIONS, TOOL_OPTIONS } from '../lib/defaults';
import { T } from '../lib/theme';
import React from 'react';

interface StatsInputsProps {
  stats: StatsData;
  onChange: (stats: StatsData) => void;
  theme: 'light' | 'dark';
}

export const StatsInputs: React.FC<StatsInputsProps> = ({ stats, onChange, theme }) => {
  const isDark = theme === 'dark';
  const t = T[theme];

  const updateStat = (field: keyof StatsData, value: any) => {
    onChange({ ...stats, [field]: value });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#3a3a3a' : '#e8e4de'}`,
    background: isDark ? '#1a1a1a' : '#ffffff',
    color: isDark ? '#eee' : '#1a1a1a',
    fontSize: '13px',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: isDark ? '#8a8a8a' : '#7a7570',
    marginBottom: '6px',
    display: 'block',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <h3
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: isDark ? '#8a8a8a' : '#7a7570',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Your AI Stats
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Username</label>
          <input
            style={inputStyle}
            value={stats.username || ''}
            onChange={e => updateStat('username', e.target.value)}
            placeholder="@vibe_coder"
          />
        </div>

        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <label style={labelStyle}>Models & Roles</label>
             <button
               onClick={() => {
                 const newModels = [...(stats.models || []), { id: 'claude-3-5-sonnet', role: 'Dev' }];
                 updateStat('models', newModels);
               }}
               style={{
                 fontSize: '10px',
                 padding: '2px 8px',
                 borderRadius: '4px',
                 border: `1px solid ${t.border}`,
                 background: t.faint,
                 color: t.accent,
                 cursor: 'pointer'
               }}
             >
               + Add Model
             </button>
          </div>
          {(stats.models || []).map((m, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={m.role}
                onChange={e => {
                  const newModels = [...(stats.models || [])];
                  newModels[idx].role = e.target.value;
                  updateStat('models', newModels);
                }}
                placeholder="Role (e.g. Backend)"
              />
              <select
                style={{ ...inputStyle, flex: 2 }}
                value={m.id}
                onChange={e => {
                  const newModels = [...(stats.models || [])];
                  newModels[idx].id = e.target.value;
                  updateStat('models', newModels);
                }}
              >
                {MODEL_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
              {idx > 0 && (
                <button
                  onClick={() => {
                    const newModels = (stats.models || []).filter((_, i) => i !== idx);
                    updateStat('models', newModels);
                  }}
                  style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '14px' }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <label style={labelStyle}>GitHub Stars</label>
          <input
            style={inputStyle}
            type="number"
            value={stats.stars || ''}
            onChange={e => updateStat('stars', parseInt(e.target.value))}
          />
        </div>

        <div>
          <label style={labelStyle}>Total Tokens</label>
          <input
            style={inputStyle}
            type="number"
            value={stats.tokens || ''}
            onChange={e => updateStat('tokens', parseInt(e.target.value))}
          />
        </div>

        <div>
          <label style={labelStyle}>Est. Cost (USD)</label>
          <input
            style={inputStyle}
            type="number"
            step="0.01"
            value={stats.cost || ''}
            onChange={e => updateStat('cost', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label style={labelStyle}>AI Contribution %</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            max="100"
            value={stats.ai_pct !== undefined ? stats.ai_pct : ''}
            onChange={e => {
              const val = e.target.value === '' ? 0 : parseInt(e.target.value);
              const safeVal = Math.min(100, Math.max(0, isNaN(val) ? 0 : val));
              onChange({ ...stats, ai_pct: safeVal, human_pct: 100 - safeVal });
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>Vibe Streak (Days)</label>
          <input
            style={inputStyle}
            type="number"
            value={stats.streak || ''}
            onChange={e => updateStat('streak', parseInt(e.target.value))}
          />
        </div>

        <div>
          <label style={labelStyle}>Chaos Level %</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            max="100"
            value={stats.chaos || ''}
            onChange={e => updateStat('chaos', parseInt(e.target.value))}
          />
        </div>

        <div>
          <label style={labelStyle}>Session Hours</label>
          <input
            style={inputStyle}
            type="number"
            value={stats.session_hours || ''}
            onChange={e => updateStat('session_hours', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Activity Label</label>
        <input
          style={inputStyle}
          value={stats.activity_label || ''}
          onChange={e => updateStat('activity_label', e.target.value)}
          placeholder="e.g. GitHub Commits"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Branding Footer</label>
          <input
            style={inputStyle}
            value={stats.branding_label || ''}
            onChange={e => updateStat('branding_label', e.target.value)}
            placeholder="e.g. ⚡ Vibe Wrapped"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={stats.show_logo !== false}
              onChange={e => updateStat('show_logo', e.target.checked)}
              id="show-logo"
            />
            <label htmlFor="show-logo" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Show Sparkle Logo</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={stats.show_footer !== false}
              onChange={e => updateStat('show_footer', e.target.checked)}
              id="show-footer"
            />
            <label htmlFor="show-footer" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Show Branding Footer</label>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={labelStyle}>Tools & Logos</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TOOL_OPTIONS.map(tool => {
            const isToolActive = (stats.tools || []).includes(tool.label);
            const isLogoActive = (stats.tool_logos || []).includes(tool.domain);
            return (
              <div key={tool.id} style={{ display: 'flex', gap: '2px' }}>
                <button
                  onClick={() => {
                    const newTools = isToolActive
                      ? (stats.tools || []).filter(t => t !== tool.label)
                      : [...(stats.tools || []), tool.label];
                    updateStat('tools', newTools);
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px 0 0 8px',
                    border: `1px solid ${isToolActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de')}`,
                    background: isToolActive ? (isDark ? 'rgba(212, 169, 106, 0.1)' : 'rgba(201, 100, 66, 0.05)') : 'transparent',
                    color: isToolActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#8a8a8a' : '#7a7570'),
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  {tool.label}
                </button>
                <button
                  onClick={() => {
                    const newLogos = isLogoActive
                      ? (stats.tool_logos || []).filter(d => d !== tool.domain)
                      : [...(stats.tool_logos || []), tool.domain];
                    updateStat('tool_logos', newLogos);
                  }}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '0 8px 8px 0',
                    borderTop: `1px solid ${isLogoActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de')}`,
                    borderRight: `1px solid ${isLogoActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de')}`,
                    borderBottom: `1px solid ${isLogoActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de')}`,
                    borderLeft: 'none',
                    background: isLogoActive ? (isDark ? 'rgba(212, 169, 106, 0.1)' : 'rgba(201, 100, 66, 0.05)') : 'transparent',
                    color: isLogoActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#8a8a8a' : '#7a7570'),
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Toggle Logo"
                >
                  <img src={`https://img.logo.dev/${tool.domain}?token=pk_WiwXIYQHTe6I5puSNMu9Gw&size=32`} style={{ width: '12px', height: '12px', borderRadius: '2px', filter: isLogoActive ? 'none' : 'grayscale(100%)' }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={labelStyle}>Badges</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BADGE_DEFINITIONS.map(badge => {
            const isActive = (stats.badges || []).includes(badge.id);
            return (
              <button
                key={badge.id}
                onClick={() => {
                  const newBadges = isActive
                    ? (stats.badges || []).filter(id => id !== badge.id)
                    : [...(stats.badges || []), badge.id];
                  updateStat('badges', newBadges);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '99px',
                  border: `1px solid ${isActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de')}`,
                  background: isActive ? (isDark ? 'rgba(212, 169, 106, 0.1)' : 'rgba(201, 100, 66, 0.05)') : 'transparent',
                  color: isActive ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#8a8a8a' : '#7a7570'),
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s',
                }}
              >
                <span>{badge.icon}</span>
                {badge.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={labelStyle}>Custom Badges</label>
        <input
          style={inputStyle}
          value={(stats.custom_badges || []).join(', ')}
          onChange={e => {
            const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            updateStat('custom_badges', val);
          }}
          placeholder="e.g. React Master, NextJS Pro"
        />
      </div>
    </div>
  );
};
