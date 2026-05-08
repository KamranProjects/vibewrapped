import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const CopyButton: React.FC<{ value: string; label?: string; theme: 'light' | 'dark' }> = ({ value, label, theme }) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: '8px',
        background: copied ? (isDark ? '#2e4a2e' : '#e7f5e7') : (isDark ? '#2a2a2a' : '#f5f0eb'),
        border: `1px solid ${isDark ? '#3a3a3a' : '#e8e4de'}`,
        color: copied ? (isDark ? '#7ab87a' : '#2e7d32') : (isDark ? '#ececec' : '#1a1a1a'),
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : label || 'Copy'}
    </button>
  );
};

export const Toggle: React.FC<{
  label: string;
  active: boolean;
  onChange: (val: boolean) => void;
  theme: 'light' | 'dark';
}> = ({ label, active, onChange, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <span style={{ fontSize: '13px', color: isDark ? '#eee' : '#1a1a1a' }}>{label}</span>
      <button
        onClick={() => onChange(!active)}
        style={{
          width: '40px',
          height: '22px',
          borderRadius: '99px',
          background: active ? (isDark ? '#d4a96a' : '#c96442') : (isDark ? '#3a3a3a' : '#e8e4de'),
          position: 'relative',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            background: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '3px',
            left: active ? '21px' : '3px',
            transition: 'left 0.2s',
          }}
        />
      </button>
    </div>
  );
};
