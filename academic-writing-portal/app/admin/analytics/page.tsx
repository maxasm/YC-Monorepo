"use client";

import { PageHeader } from "@/components/common/page-header";
import { RevenueChart, TaskVolumeChart } from "@/components/charts/analytics";
import { Card } from "@/components/common/card";

// Mock analytics data
const revenueData = [
  { label: "Week 1", value: 850 },
  { label: "Week 2", value: 920 },
  { label: "Week 3", value: 780 },
  { label: "Week 4", value: 1100 },
  { label: "Week 5", value: 1150 },
  { label: "Week 6", value: 900 },
  { label: "Week 7", value: 1050 },
];

const taskVolumeData = [
  { label: "Week 1", completed: 8, pending: 5 },
  { label: "Week 2", completed: 10, pending: 6 },
  { label: "Week 3", completed: 7, pending: 8 },
  { label: "Week 4", completed: 12, pending: 4 },
  { label: "Week 5", completed: 11, pending: 3 },
  { label: "Week 6", completed: 9, pending: 5 },
  { label: "Week 7", completed: 13, pending: 2 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Analytics & Reports"
        description="Monitor platform performance and revenue trends"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <TaskVolumeChart data={taskVolumeData} />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-slate-50">
          <div>
            <p className="text-sm text-slate-600">Total Revenue (30 days)</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">$6,750</p>
            <p className="mt-1 text-xs text-slate-500">Avg: $963/week</p>
          </div>
        </Card>

        <Card className="bg-slate-50">
          <div>
            <p className="text-sm text-slate-600">Total Tasks Completed</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">70</p>
            <p className="mt-1 text-xs text-slate-500">10/week average</p>
          </div>
        </Card>

        <Card className="bg-slate-50">
          <div>
            <p className="text-sm text-slate-600">Avg Task Price</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">$96</p>
            <p className="mt-1 text-xs text-slate-500">Range: $50–$300</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
