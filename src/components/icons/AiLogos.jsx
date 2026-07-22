import React from "react";

/**
 * Hand-authored SVG marks for the AI agent tooling used across the site.
 * react-icons v4 predates most of these brands, so they live here instead.
 * Every mark uses `currentColor` so it inherits the surrounding text colour.
 */

const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  focusable: "false",
  "aria-hidden": true,
});

/* Claude / Anthropic radial burst — tapered spokes of varying length. */
const CLAUDE_RAYS = [
  { a: 0, len: 9.6, w: 1.5 },
  { a: 31, len: 7.4, w: 1.15 },
  { a: 64, len: 9.2, w: 1.4 },
  { a: 96, len: 6.9, w: 1.05 },
  { a: 128, len: 9.6, w: 1.5 },
  { a: 156, len: 7.1, w: 1.1 },
  { a: 180, len: 8.8, w: 1.35 },
  { a: 212, len: 6.8, w: 1.05 },
  { a: 244, len: 9.4, w: 1.45 },
  { a: 276, len: 7.2, w: 1.1 },
  { a: 308, len: 9.0, w: 1.4 },
  { a: 336, len: 6.7, w: 1.0 },
];

export function ClaudeLogo({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      {CLAUDE_RAYS.map(({ a, len, w }) => (
        <path
          key={a}
          d={`M ${12 - w} 12 L 12 ${12 - len} L ${12 + w} 12 L 12 ${12 + w * 0.7} Z`}
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </svg>
  );
}

/* Cursor — isometric prism, three faces meeting at the centre. */
export function CursorLogo({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M11.93 24 22.35 18 11.93 12 1.5 18Z" opacity="0.95" />
      <path d="M22.35 18V6L11.93 0v12Z" opacity="0.55" />
      <path d="M11.93 0 1.5 6v12l10.43-6Z" opacity="0.75" />
    </svg>
  );
}

/* MCP — nested connective arcs. */
export function McpLogo({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path
        d="M2.5 16.4 11 7.9a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M7.2 16.4 15.7 7.9a3.3 3.3 0 0 1 4.7 4.7l-7.1 7.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* SDD — three stacked spec layers, the framework's own mark. */
export function SddLogo({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 2 22 7l-10 5L2 7l10-5Z" opacity="0.95" />
      <path d="M22 12 12 17 2 12l2.8-1.4L12 14.2l7.2-3.6L22 12Z" opacity="0.65" />
      <path d="M22 17l-10 5-10-5 2.8-1.4L12 19.2l7.2-3.6L22 17Z" opacity="0.4" />
    </svg>
  );
}

export const AGENT_BRANDS = {
  sdd: { Logo: SddLogo, name: "SDD Framework", color: "#a78bfa" },
  claude: { Logo: ClaudeLogo, name: "Claude Code", color: "#d97757" },
  cursor: { Logo: CursorLogo, name: "Cursor", color: "#e2e8f0" },
  mcp: { Logo: McpLogo, name: "MCP", color: "#c084fc" },
};
