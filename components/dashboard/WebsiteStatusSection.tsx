"use client";

import { Phone, Users, Star, ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  suffix?: string;
};

const STATS: Stat[] = [
  {
    label: "Calls from website",
    value: "14",
    change: 3,
    icon: <Phone size={14} />,
  },
  {
    label: "New leads",
    value: "8",
    change: 1,
    icon: <Users size={14} />,
  },
  {
    label: "Google reviews",
    value: "4.9",
    change: 0,
    icon: <Star size={14} />,
    suffix: "★",
  },
];

function Trend({ change }: { change: number }) {
  if (change > 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--green)" }}>
        <TrendingUp size={11} />
        +{change} vs last week
      </span>
    );
  if (change < 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--red)" }}>
        <TrendingDown size={11} />
        {change} vs last week
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-xs" style={{ color: "var(--muted)" }}>
      <Minus size={11} />
      same as last week
    </span>
  );
}

export default function WebsiteStatusSection() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          {/* Live green dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "var(--green)" }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: "var(--green)" }}
            />
          </span>
          <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
            Your website
          </h2>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded-md"
            style={{ background: "var(--green-light)", color: "var(--green)" }}
          >
            Live &amp; healthy
          </span>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--accent)" }}
          aria-label="View your website"
        >
          View site
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 divide-x"
        style={{ borderTop: "1px solid var(--card-border)", borderColor: "var(--card-border)" }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="px-3 py-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
              {stat.icon}
              <span className="text-xs leading-tight">{stat.label}</span>
            </div>
            <p className="text-xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              {stat.value}
              {stat.suffix && (
                <span className="text-base ml-0.5" style={{ color: "#fbbf24" }}>
                  {stat.suffix}
                </span>
              )}
            </p>
            <Trend change={stat.change} />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        className="px-4 py-2.5 text-xs"
        style={{
          borderTop: "1px solid var(--card-border)",
          color: "var(--muted)",
          background: "var(--background)",
        }}
      >
        This week · Apr 20 – Apr 26
      </div>
    </div>
  );
}
