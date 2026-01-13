"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/common/card";
import type { AnalyticsPoint } from "@/types";

interface RevenueChartProps {
  data: AnalyticsPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card title="Revenue Trend" description="Monthly platform revenue">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}
            formatter={(value) => `$${Number(value).toLocaleString()}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            name="Revenue (USD)"
            dot={{ fill: "#4f46e5" }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

interface TaskVolumeChartProps {
  data: Array<{ label: string; completed: number; pending: number }>;
}

export function TaskVolumeChart({ data }: TaskVolumeChartProps) {
  return (
    <Card title="Task Volume" description="Completed vs pending tasks by week">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
          <Legend />
          <Bar dataKey="completed" fill="#10b981" name="Completed" />
          <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
