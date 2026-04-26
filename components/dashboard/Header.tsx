"use client";

export default function Header() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
          {greeting}
        </p>
        <h1
          className="text-2xl font-semibold mt-0.5 tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Maria&apos;s Bakery
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Here&apos;s what&apos;s happening with your website this week.
        </p>
      </div>

      {/* Agency logo / nav */}
      <div className="flex items-center gap-3 mt-1">
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
          aria-label="Account menu"
        >
          M
        </button>
      </div>
    </div>
  );
}
