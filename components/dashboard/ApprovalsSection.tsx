"use client";

import { useState } from "react";
import { CheckCircle, X, ChevronRight, Star, FileText, Image as ImageIcon } from "lucide-react";
import clsx from "clsx";

type ApprovalItem = {
  id: string;
  type: "review_reply" | "content_update" | "photo";
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  preview?: string;
  badge?: string;
};

const APPROVALS: ApprovalItem[] = [
  {
    id: "1",
    type: "review_reply",
    icon: <Star size={15} />,
    iconBg: "#fbbf24",
    title: "Reply to a new Google review",
    description: "A customer left a 5-star review. We drafted a reply — take a look before it goes live.",
    preview: `"Thank you so much for the kind words! We bake everything fresh every morning and it means the world to hear you noticed. See you soon! — Maria"`,
    badge: "⭐⭐⭐⭐⭐ New review",
  },
  {
    id: "2",
    type: "content_update",
    icon: <FileText size={15} />,
    iconBg: "var(--accent)",
    title: "Update your holiday hours",
    description: "Memorial Day is coming up. We can add a banner to your homepage so customers aren't surprised.",
    preview: "Banner: \"Closed Monday, May 26 for Memorial Day. Back Tuesday at 7am!\"",
    badge: "May 26",
  },
  {
    id: "3",
    type: "photo",
    icon: <ImageIcon size={15} />,
    iconBg: "#16a34a",
    title: "Add your new croissant photo",
    description: "We spotted a great photo you posted on Instagram. Want us to add it to your menu page?",
    badge: "From Instagram",
  },
];

export default function ApprovalsSection() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = APPROVALS.filter(
    (a) => !dismissed.has(a.id) && !approved.has(a.id)
  );

  const handleApprove = (id: string) => {
    setApproved((prev) => new Set(prev).add(id));
  };

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  if (visible.length === 0) {
    return (
      <div
        className="rounded-2xl p-5 flex items-center gap-3"
        style={{
          background: "var(--green-light)",
          border: "1px solid #bbf7d0",
        }}
      >
        <CheckCircle size={20} color="var(--green)" />
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--green)" }}>
            You&apos;re all caught up
          </p>
          <p className="text-sm mt-0.5" style={{ color: "#15803d" }}>
            Nothing needs your attention right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
          Needs your OK
        </h2>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: "#fef3c7",
            color: "#92400e",
          }}
        >
          {visible.length} waiting
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--card)",
              border: "1px solid var(--card-border)",
            }}
          >
            {/* Main row */}
            <button
              className="w-full text-left px-4 py-4 flex items-start gap-3"
              onClick={() =>
                setExpanded(expanded === item.id ? null : item.id)
              }
            >
              {/* Icon */}
              <span
                className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: item.iconBg }}
              >
                {item.icon}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.title}
                  </p>
                  {item.badge && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--accent)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm mt-0.5 leading-snug"
                  style={{ color: "var(--muted)" }}
                >
                  {item.description}
                </p>
              </div>

              <ChevronRight
                size={16}
                className={clsx(
                  "flex-shrink-0 mt-1 transition-transform duration-200",
                  expanded === item.id && "rotate-90"
                )}
                style={{ color: "var(--muted)" }}
              />
            </button>

            {/* Expanded preview */}
            {expanded === item.id && item.preview && (
              <div
                className="mx-4 mb-3 rounded-xl p-3 text-sm leading-relaxed italic"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--card-border)",
                }}
              >
                {item.preview}
              </div>
            )}

            {/* Action buttons */}
            <div
              className="flex gap-2 px-4 pb-4"
              style={expanded !== item.id ? { paddingTop: 0 } : {}}
            >
              <button
                onClick={() => handleApprove(item.id)}
                className="flex-1 h-9 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Looks good — go ahead
              </button>
              <button
                onClick={() => handleDismiss(item.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{
                  border: "1px solid var(--card-border)",
                  color: "var(--muted)",
                }}
                aria-label="Dismiss"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
