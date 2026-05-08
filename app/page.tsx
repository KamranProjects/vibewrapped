'use client';

import React, { useState, useMemo } from 'react';
import { CardPreview } from '@/components/CardPreview';
import { FieldSelector } from '@/components/FieldSelector';
import { CustomizePanel } from '@/components/CustomizePanel';
import { StatsInputs } from '@/components/StatsInputs';
import { EmbedPanel } from '@/components/EmbedPanel';
import { DEFAULT_STATS, DEFAULT_CONFIG } from '@/lib/defaults';
import { buildUrl } from '@/lib/buildUrl';
import { StatsData, CardConfig, FieldId } from '@/types/stats';
import { SparkleIcon } from '@/components/SparkleIcon';
import { T } from '@/lib/theme';

export default function BuilderPage() {
  const [stats, setStats] = useState<StatsData>(DEFAULT_STATS);
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG);

  const embedUrl = useMemo(() => buildUrl(stats, config), [stats, config]);

  const isDark = config.theme === 'dark';
  const t = T[config.theme];
  const bg = isDark ? '#141414' : '#f9f7f4';

  const handleToggleField = (id: FieldId) => {
    setConfig(prev => ({
      ...prev,
      hiddenFields: prev.hiddenFields.includes(id)
        ? prev.hiddenFields.filter(f => f !== id)
        : [...prev.hiddenFields, id],
    }));
  };

  const handleOrderChange = (newOrder: FieldId[]) => {
    setConfig(prev => ({ ...prev, fieldOrder: newOrder }));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: t.text,
        fontFamily: 'DM Sans, system-ui, sans-serif',
        transition: 'background 0.3s, color 0.3s',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SparkleIcon size={24} color={t.accent} />
          <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em' }}>Vibe Wrapped</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setConfig(prev => ({ ...prev, theme: isDark ? 'light' : 'dark' }))}
            style={{
              padding: '8px 16px',
              borderRadius: '99px',
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.text,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isDark ? '○ Light Mode' : '☾ Dark Mode'}
          </button>
        </div>
      </header>

      <main
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr 340px',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Left Panel: Inputs & Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <section
            style={{
              background: t.surface,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${t.border}`,
            }}
          >
            <StatsInputs stats={stats} onChange={setStats} theme={config.theme} />
          </section>

          <section
            style={{
              background: t.surface,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${t.border}`,
            }}
          >
            <FieldSelector
              fieldOrder={config.fieldOrder}
              hiddenFields={config.hiddenFields}
              onOrderChange={handleOrderChange}
              onToggleField={handleToggleField}
              theme={config.theme}
            />
          </section>
        </div>

        {/* Center Panel: Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            position: 'sticky',
            top: '40px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: t.muted,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Live Preview
            </span>
          </div>
          <div style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
            <CardPreview stats={stats} config={config} />
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '400px' }}>
            <p style={{ fontSize: '13px', color: t.muted, lineHeight: 1.6 }}>
              Your data is encoded in the URL. No database, no tracking.
              Just a beautiful SVG card for your GitHub profile.
            </p>
          </div>
        </div>

        {/* Right Panel: Customize & Embed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CustomizePanel config={config} onChange={setConfig} theme={config.theme} />
          <EmbedPanel url={embedUrl} theme={config.theme} collapsible={config.collapsible} />

          <section
            style={{
              background: isDark ? 'rgba(212, 169, 106, 0.05)' : 'rgba(201, 100, 66, 0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: `1px dashed ${t.accent}44`,
            }}
          >
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: t.accent, marginBottom: '8px' }}>Pro Tip</h4>
            <p style={{ fontSize: '12px', color: t.muted, lineHeight: 1.5 }}>
              Enter your token usage from your AI provider settings (Claude, OpenAI, etc.).
              Update your card manually to refresh your profile stats whenever you reach a new milestone!
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '80px', textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontSize: '13px', color: t.muted }}>
          Inspired by <strong>github-readme-stats</strong>. Built for the <strong>AI developer</strong> community.
        </p>
      </footer>
    </div>
  );
}
