"use client";

import { useState } from "react";
import { ChevronRight, RefreshCw, ShieldCheck, Search, Star, Mail, Zap } from "lucide-react";
import clsx from "clsx";

type WorkflowStatus = "running" | "paused" | "action_taken";

type Workflow = {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  status: WorkflowStatus;
  lastAction?: string;
  frequency: string;
};

const WORKFLOWS: Workflow[] = [
  {
    id: "seo",
    icon: <Search size={15} />,
    name: "Showing up on Google",
    description: "Keeps your listing accurate and helps you rank above nearby competitors.",
    status: "running",
    lastAction: "Updated your business category 2 days ago",
    frequency: "Checks daily",
  },
  {
    id: "reviews",
    icon: <Star size={15} />,
    name: "Watching your reviews",
    description: "Monitors new reviews and drafts replies for you to approve before they go out.",
    status: "action_taken",
    lastAction: "Drafted a reply to a new 5-star review — needs your OK",
    frequency: "Checks every hour",
  },
  {
    id: "uptime",
    icon: <ShieldCheck size={15} />,
    name: "Keeping your site online",
    description: "Monitors your site 24/7 and alerts you immediately if something goes wrong.",
    status: "running",
    lastAction: "All good — last checked 4 minutes ago",
    frequency: "Checks every 5 min",
  },
  {
    id: "content",
    icon: <RefreshCw size={15} />,
    name: "Keeping content fresh",
    description: "Suggests small updates — seasonal specials, new photos, holiday hours — so your site never goes stale.",
    status: "running",
    lastAction: "Suggested Memorial Day hours banner",
    frequency: "Weekly review",
  },
  {
    id: "leads",
    icon: <Mail size={15} />,
    name: "Following up on leads",
    description: "Sends a friendly follow-up to anyone who filled out your contact form but didn't hear back.",
    status: "running",
    lastAction: "Sent a follow-up to 2 inquiries this week",
    frequency: "Runs automatically",
  },
];

const STATUS_CONFIG: Record<WorkflowStatus, { label: string; bg: string; color: string }> = {
  running: {
    label: "Running",
    bg: "var(--green-light)",
    color: "var(--green)",
  },
  paused: {
    label: "Paused",
    bg: "#f5f5f4",
    color: "#78716c",
  },
  action_taken: {
    label: "Needs OK",
    bg: "#fef3c7",
    color: "#92400e",
  },
};

function WorkflowRow({ workflow }: { workflow: Workflow }) {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_CONFIG[workflow.status];

  return (
    <div style={{ borderBottom: "1px solid var(--card-border)" }}>
      <button
        className="w-full text-left px-4 py-3.5 flex items-center gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Icon */}
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--background)", color: "var(--muted)" }}
        >
          {workflow.icon}
        </span>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
              {workflow.name}
            </span>
            <span
              className="flex-shrink-0 text-xs font-medium px-1.5 py-0.5 rounded-md"
              style={{ background: s.bg, color: s.color }}
            >
              {s.label}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted)" }}>
            {workflow.lastAction}
          </p>
        </div>

        <ChevronRight
          size={15}
          className={clsx("flex-shrink-0 transition-transform duration-200", expanded && "rotate-90")}
          style={{ color: "var(--muted)" }}
        />
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {workflow.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {workflow.frequency}
            </span>
            {workflow.status === "running" && (
              <button
                className="text-xs font-medium"
                style={{ color: "var(--muted)" }}
              >
                Pause this
              </button>
            )}
            {workflow.status === "paused" && (
              <button
                className="text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Resume
              </button>
            )}
            {workflow.status === "action_taken" && (
              <button
                className="text-xs font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Review now →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkflowsSection() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Zap size={15} style={{ color: "var(--muted)" }} />
        <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
          Running for you
        </h2>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          — nothing you need to do
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        {WORKFLOWS.map((w) => (
          <WorkflowRow key={w.id} workflow={w} />
        ))}
        {/* Footer */}
        <div className="px-4 py-3 flex items-center justify-between">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            5 workflows active
          </p>
          <button className="text-xs font-medium" style={{ color: "var(--accent)" }}>
            Manage →
          </button>
        </div>
      </div>
    </div>
  );
}
