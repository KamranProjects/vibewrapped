import React, { useState } from 'react';
import { CopyButton } from './ui';

interface EmbedPanelProps {
  url: string;
  theme: 'light' | 'dark';
  collapsible?: boolean;
}

export const EmbedPanel: React.FC<EmbedPanelProps> = ({ url, theme, collapsible }) => {
  const [tab, setTab] = useState<'markdown' | 'html' | 'badge'>('markdown');
  const [fullUrl, setFullUrl] = useState(url);
  const isDark = theme === 'dark';

  React.useEffect(() => {
    setFullUrl(`${window.location.origin}${url}`);
  }, [url]);

  const codes = {
    markdown: collapsible 
      ? `<details>\n<summary>View Vibe Wrapped Stats</summary>\n\n![Vibe Wrapped](${fullUrl})\n</details>`
      : `![Vibe Wrapped](${fullUrl})`,
    html: collapsible
      ? `<details>\n<summary>View Vibe Wrapped Stats</summary>\n\n<img src="${fullUrl}" alt="Vibe Wrapped" />\n</details>`
      : `<img src="${fullUrl}" alt="Vibe Wrapped" />`,
    badge: `[![Vibe Wrapped](${fullUrl})](https://github.com/your-username)`,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
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
        Embed Your Card
      </h3>

      <div style={{ display: 'flex', gap: '4px', background: isDark ? '#2a2a2a' : '#f5f0eb', padding: '4px', borderRadius: '10px' }}>
        {(['markdown', 'html', 'badge'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: tab === t ? (isDark ? '#3d3d3d' : '#ffffff') : 'transparent',
              color: tab === t ? (isDark ? '#ececec' : '#1a1a1a') : (isDark ? '#8a8a8a' : '#7a7570'),
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

      <div
        style={{
          background: isDark ? '#1a1a1a' : '#f9f7f4',
          border: `1px solid ${isDark ? '#2e2e2e' : '#e8e4de'}`,
          borderRadius: '10px',
          padding: '12px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: isDark ? '#d4a96a' : '#c96442',
          wordBreak: 'break-all',
          minHeight: '60px',
        }}
      >
        {codes[tab]}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CopyButton value={codes[tab]} theme={theme} />
        <a
          href="https://vercel.com/new/clone?repository-url=https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '11px',
            color: isDark ? '#d4a96a' : '#c96442',
            textDecoration: 'none',
          }}
        >
          Deploy your own ↗
        </a>
      </div>
    </div>
  );
};
