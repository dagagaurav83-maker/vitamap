"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProgressChart = {
  marker: string;
  value: string;
  change: string;
  goal: string;
  data: { date: string; value: number }[];
};

export function ProgressChartCard({ chart }: { chart: ProgressChart }) {
  const improved = chart.change.includes("improved");

  return (
    <article className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-950">{chart.marker}</h2>
          <p className="mt-1 text-sm text-slate-500">Current: {chart.value}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            improved ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {improved ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
          {chart.change}
        </span>
      </div>

      <div className="mt-5 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart.data} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={improved ? "#22C55E" : "#EF4444"}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700">
        Goal: {chart.goal}
      </p>
    </article>
  );
}
