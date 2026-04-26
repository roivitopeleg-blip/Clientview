import ApprovalsSection from "@/components/dashboard/ApprovalsSection";
import RequestSection from "@/components/dashboard/RequestSection";
import WebsiteStatusSection from "@/components/dashboard/WebsiteStatusSection";
import WorkflowsSection from "@/components/dashboard/WorkflowsSection";
import Header from "@/components/dashboard/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
        <Header />

        {/* Approvals first — most important thing they see */}
        <section className="mt-8">
          <ApprovalsSection />
        </section>

        {/* Make a request via AI */}
        <section className="mt-6">
          <RequestSection />
        </section>

        {/* Website health + this week's numbers */}
        <section className="mt-6">
          <WebsiteStatusSection />
        </section>

        {/* Autonomous workflows running on their behalf */}
        <section className="mt-6">
          <WorkflowsSection />
        </section>
      </div>
    </div>
  );
}
