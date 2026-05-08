import React from 'react';
import { CardConfig, Theme, Layout } from '../types/stats';
import { Toggle } from './ui';

interface CustomizePanelProps {
  config: CardConfig;
  onChange: (config: CardConfig) => void;
  theme: 'light' | 'dark';
}

export const CustomizePanel: React.FC<CustomizePanelProps> = ({ config, onChange, theme }) => {
  const isDark = theme === 'dark';

  const updateConfig = (updates: Partial<CardConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        background: isDark ? '#212121' : '#ffffff',
        border: `1px solid ${isDark ? '#2e2e2e' : '#e8e4de'}`,
        borderRadius: '14px',
        padding: '20px',
      }}
    >
      <h3
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: isDark ? '#8a8a8a' : '#7a7570',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Customize Appearance
      </h3>

      {/* Theme */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: isDark ? '#8a8a8a' : '#7a7570' }}>Theme</span>
        <div style={{ display: 'flex', gap: '4px', background: isDark ? '#2a2a2a' : '#f5f0eb', padding: '4px', borderRadius: '10px' }}>
          {(['light', 'dark'] as Theme[]).map(t => (
            <button
              key={t}
              onClick={() => updateConfig({ theme: t })}
              style={{
                flex: 1,
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: config.theme === t ? (isDark ? '#3d3d3d' : '#ffffff') : 'transparent',
                color: config.theme === t ? (isDark ? '#ececec' : '#1a1a1a') : (isDark ? '#8a8a8a' : '#7a7570'),
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: isDark ? '#8a8a8a' : '#7a7570' }}>Layout</span>
        <div style={{ display: 'flex', gap: '4px', background: isDark ? '#2a2a2a' : '#f5f0eb', padding: '4px', borderRadius: '10px' }}>
          {(['compact', 'wide', 'mini'] as Layout[]).map(l => (
            <button
              key={l}
              onClick={() => updateConfig({ layout: l })}
              style={{
                flex: 1,
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: config.layout === l ? (isDark ? '#3d3d3d' : '#ffffff') : 'transparent',
                color: config.layout === l ? (isDark ? '#ececec' : '#1a1a1a') : (isDark ? '#8a8a8a' : '#7a7570'),
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', background: isDark ? '#2e2e2e' : '#e8e4de' }} />

      {/* Toggles */}
      <Toggle
        label="Show Border"
        active={config.showBorder}
        onChange={val => updateConfig({ showBorder: val })}
        theme={config.theme}
      />

      <Toggle
        label="Rounded Corners"
        active={config.cornerRadius === 'rounded'}
        onChange={val => updateConfig({ cornerRadius: val ? 'rounded' : 'sharp' })}
        theme={config.theme}
      />

      <Toggle
        label="Collapsible Card"
        active={!!config.collapsible}
        onChange={val => updateConfig({ collapsible: val })}
        theme={config.theme}
      />

      {/* Font Size */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: isDark ? '#8a8a8a' : '#7a7570' }}>Font Size</span>
        <div style={{ display: 'flex', gap: '4px', background: isDark ? '#2a2a2a' : '#f5f0eb', padding: '4px', borderRadius: '10px' }}>
          {(['compact', 'default', 'spacious'] as const).map(s => (
            <button
              key={s}
              onClick={() => updateConfig({ fontSize: s })}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '6px',
                border: 'none',
                background: config.fontSize === s ? (isDark ? '#3d3d3d' : '#ffffff') : 'transparent',
                color: config.fontSize === s ? (isDark ? '#ececec' : '#1a1a1a') : (isDark ? '#8a8a8a' : '#7a7570'),
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button
          onClick={() => {
            if (confirm('Reset all stats and settings to defaults?')) {
              window.location.href = window.location.pathname;
            }
          }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: `1px solid ${isDark ? '#3a3a3a' : '#e8e4de'}`,
            background: 'transparent',
            color: isDark ? '#8a8a8a' : '#7a7570',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.borderColor = isDark ? '#d4a96a' : '#c96442')}
          onMouseOut={e => (e.currentTarget.style.borderColor = isDark ? '#3a3a3a' : '#e8e4de')}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};
