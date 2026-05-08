"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface Stats {
  username: string;
  model: string;
  tokens: number;
  cost: number;
  aiPct: number;
  humanPct: number;
  streak: number;
  chaos: number;
  tools: string[];
  badges: BadgeId[];
  activity: number[];
}

type BadgeId = "claude_powered" | "vibe_coded" | "token_addict" | "no_grass";

// ─── Theme tokens (mirrors claude.ai exactly) ─────────────────────────────────

const T = {
  dark: {
    bg:          "#1a1a1a",
    surface:     "#212121",
    border:      "#2e2e2e",
    borderHover: "#3a3a3a",
    text:        "#ececec",
    muted:       "#8a8a8a",
    faint:       "#3d3d3d",
    accent:      "#d4a96a",   // claude warm amber
    accentSub:   "#b8864e",
    tag:         "#2a2a2a",
    tagText:     "#d4a96a",
    barBg:       "#2e2e2e",
    barAi:       "#d4a96a",
    barHuman:    "#4a4a5a",
  },
  light: {
    bg:          "#f9f7f4",   // claude.ai warm off-white
    surface:     "#ffffff",
    border:      "#e8e4de",
    borderHover: "#d4cfc8",
    text:        "#1a1a1a",
    muted:       "#7a7570",
    faint:       "#f0ede8",
    accent:      "#c96442",   // claude coral
    accentSub:   "#a84f34",
    tag:         "#f5f0eb",
    tagText:     "#c96442",
    barBg:       "#ede9e3",
    barAi:       "#c96442",
    barHuman:    "#c5bdb4",
  },
};

const BADGES: Record<BadgeId, { icon: string; label: string }> = {
  claude_powered: { icon: "⚡", label: "Powered by Claude" },
  vibe_coded:     { icon: "〜", label: "90% Vibe Coded"   },
  token_addict:   { icon: "◈",  label: "Token Addict"      },
  no_grass:       { icon: "○",  label: "Touched Grass: No" },
};

const MOCK: Stats = {
  username:  "vibe_coder_9000",
  model:     "claude-sonnet-4-6",
  tokens:    2_847_392,
  cost:      34.18,
  aiPct:     87,
  humanPct:  13,
  streak:    14,
  chaos:     91,
  tools:     ["Web Search", "Code Exec", "Artifacts"],
  badges:    ["claude_powered", "vibe_coded", "token_addict", "no_grass"],
  activity:  [2,5,3,8,6,12,9,4,7,11,8,5,14,10,6,9,13,7,11,8,15,12,6,9,10,8,13,11],
};

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

// ─── Tiny Claude logomark (SVG path only) ─────────────────────────────────────

function ClaudeMark({ size = 16, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3C9.373 3 4 8.373 4 15c0 4.418 2.354 8.284 5.875 10.5V21h-.75A1.125 1.125 0 018 19.875v-.75A1.125 1.125 0 019.125 18H10v-3a6 6 0 1112 0v3h.875A1.125 1.125 0 0124 19.125v.75A1.125 1.125 0 0122.875 21h-.75v4.5C25.646 23.284 28 19.418 28 15c0-6.627-5.373-12-12-12z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

// ─── Activity bar chart ───────────────────────────────────────────────────────

function ActivityGraph({ data, accent, barBg }: { data: number[]; accent: string; barBg: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "28px" }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${Math.max(8, (v / max) * 100)}%`,
            background: v >= max * 0.65 ? accent : barBg,
            borderRadius: "2px",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

// ─── Stat row ─────────────────────────────────────────────────────────────────

function Row({ label, value, sub, t }: { label: string; value: string; sub?: string; t: typeof T.dark }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
      <span style={{ fontSize: "12px", color: t.muted, letterSpacing: "0.01em" }}>{label}</span>
      <div style={{ textAlign: "right" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>{value}</span>
        {sub && <span style={{ fontSize: "11px", color: t.muted, marginLeft: "4px" }}>{sub}</span>}
      </div>
    </div>
  );
}

// ─── Split bar ────────────────────────────────────────────────────────────────

function SplitBar({ ai, t }: { ai: number; t: typeof T.dark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12px", color: t.muted }}>AI vs Human</span>
        <span style={{ fontSize: "12px", color: t.muted }}>
          <span style={{ color: t.accent, fontWeight: 600 }}>{ai}%</span>
          {" · "}
          <span style={{ color: t.barHuman }}>{100 - ai}%</span>
        </span>
      </div>
      <div style={{ height: "4px", borderRadius: "99px", background: t.barBg, overflow: "hidden" }}>
        <div style={{ width: `${ai}%`, height: "100%", background: t.barAi, borderRadius: "99px" }} />
      </div>
    </div>
  );
}

// ─── The card itself (this is what goes in README as an image) ────────────────

function Card({ stats, theme }: { stats: Stats; theme: Theme }) {
  const t = T[theme];
  const chaosColor = stats.chaos >= 80 ? "#e05252" : stats.chaos >= 55 ? "#e0904a" : "#7ab87a";

  return (
    <div
      style={{
        width: "380px",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: "14px",
        padding: "20px",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        boxShadow: theme === "light"
          ? "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"
          : "0 1px 3px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ClaudeMark size={18} color={t.accent} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: t.text, letterSpacing: "-0.01em" }}>
            {stats.username}
          </span>
        </div>
        <span
          style={{
            fontSize: "10px",
            padding: "3px 8px",
            borderRadius: "99px",
            background: t.faint,
            color: t.muted,
            letterSpacing: "0.02em",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {stats.model}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: t.border }} />

      {/* Core stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        <Row label="Tokens used"    value={fmt(stats.tokens)}              sub="tokens"   t={t} />
        <Row label="Est. cost"      value={`$${stats.cost.toFixed(2)}`}    sub="USD"      t={t} />
        <Row label="Vibe streak"    value={`${stats.streak} days`}                        t={t} />
        <Row
          label="Chaos level"
          value={`${stats.chaos}%`}
          sub={stats.chaos >= 80 ? "unhinged" : stats.chaos >= 55 ? "chaotic" : "stable"}
          t={{ ...t, text: chaosColor }}
        />
      </div>

      {/* AI split */}
      <SplitBar ai={stats.aiPct} t={t} />

      {/* Activity */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "11px", color: t.muted, letterSpacing: "0.01em" }}>
          28-day activity
        </span>
        <ActivityGraph data={stats.activity} accent={t.barAi} barBg={t.barBg} />
      </div>

      {/* Tools */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {stats.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontSize: "10px",
              padding: "3px 8px",
              borderRadius: "6px",
              background: t.tag,
              color: t.tagText,
              fontFamily: "'DM Mono', monospace",
              border: `1px solid ${t.border}`,
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: t.border }} />

      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {stats.badges.map((id) => {
          const b = BADGES[id];
          return (
            <span
              key={id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                padding: "3px 8px",
                borderRadius: "99px",
                background: t.faint,
                color: t.muted,
                border: `1px solid ${t.border}`,
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ fontSize: "9px", color: t.accent }}>{b.icon}</span>
              {b.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClaudeStatsCard() {
  const [theme, setTheme] = useState<Theme>("light");
  const bg = theme === "light" ? "#f9f7f4" : "#141414";
  const t = T[theme];

  const embedMd = `[![Claude Stats](https://claude-stats.vercel.app/api/card?user=${MOCK.username}&theme=${theme})](https://claude-stats.vercel.app)`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${bg}; }
        @keyframes in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .in { animation: in 0.35s ease both; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
          gap: "32px",
          transition: "background 0.3s",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          className="in"
          style={{
            width: "380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <ClaudeMark size={16} color={t.accent} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: t.text, letterSpacing: "-0.01em" }}>
              claude stats
            </span>
          </div>

          {/* Theme toggle — claude-style pill */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "99px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.muted,
              fontSize: "11px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {theme === "light" ? "☽  Dark" : "○  Light"}
          </button>
        </div>

        {/* The card */}
        <div className="in" style={{ animationDelay: "0.05s" }}>
          <Card stats={MOCK} theme={theme} />
        </div>

        {/* Embed snippet */}
        <div
          className="in"
          style={{
            animationDelay: "0.1s",
            width: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "11px", color: t.muted }}>Embed in README</span>
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              fontSize: "11px",
              color: t.muted,
              fontFamily: "'DM Mono', monospace",
              wordBreak: "break-all",
              lineHeight: 1.7,
              cursor: "text",
              userSelect: "all",
            }}
          >
            {embedMd}
          </div>
          <span style={{ fontSize: "10px", color: t.muted, opacity: 0.6 }}>
            Click the snippet to select all, then copy
          </span>
        </div>
      </div>
    </>
  );
}
