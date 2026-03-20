import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, PieChartIcon, Clock } from "lucide-react";
import { getPeakHoursData } from "@/lib/mockData";

type FilterType = "day" | "week" | "month";

// Daily energy distribution by time period
const timeDistribution = [
  { name: "Night", period: "00:00 - 06:00", value: 12, color: "#4f46e5", icon: "🌙" },
  { name: "Morning", period: "06:00 - 12:00", value: 28, color: "#f59e0b", icon: "🌅" },
  { name: "Afternoon", period: "12:00 - 18:00", value: 35, color: "#ef4444", icon: "☀️" },
  { name: "Evening", period: "18:00 - 24:00", value: 25, color: "#8b5cf6", icon: "🌆" },
];

export default function GraphsAnalysis() {
  const [filter, setFilter] = useState<FilterType>("day");

  const hourlyData = useMemo(() => {
    if (filter === "day") {
      return Array.from({ length: 24 }, (_, h) => {
        let base = 800;
        if (h >= 6 && h <= 9) base = 1800;
        if (h >= 12 && h <= 14) base = 2200;
        if (h >= 18 && h <= 22) base = 3000;
        if (h >= 0 && h <= 5) base = 400;
        return {
          time: `${String(h).padStart(2, "0")}:00`,
          power: Math.max(200, Math.round(base + Math.random() * 400 - 200)),
        };
      });
    } else if (filter === "week") {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const bases = [12, 18, 15, 20, 25, 30, 22];
      return days.map((day, i) => ({
        time: day,
        power: Math.round(bases[i] + Math.random() * 5),
      }));
    } else {
      return [
        { time: "Week 1", power: Math.round(85 + Math.random() * 15) },
        { time: "Week 2", power: Math.round(95 + Math.random() * 20) },
        { time: "Week 3", power: Math.round(110 + Math.random() * 25) },
        { time: "Week 4", power: Math.round(100 + Math.random() * 20) },
      ];
    }
  }, [filter]);

  const peakData = useMemo(() => getPeakHoursData(), [filter]);

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: "Day", value: "day" },
    { label: "7 Days", value: "week" },
    { label: "Month", value: "month" },
  ];

  const yUnit = filter === "day" ? "W" : "kWh";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Graphs & Analysis</h2>
          <p className="text-sm text-gray-500 mt-0.5">Detailed energy consumption insights</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant="ghost"
              size="sm"
              onClick={() => setFilter(btn.value)}
              className={`rounded-md px-4 h-8 text-xs font-medium transition-all ${
                filter === btn.value
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm hover:from-indigo-600 hover:to-purple-700 hover:text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Clock className="w-3 h-3 mr-1" />
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <Card className="border-0 shadow-md shadow-gray-100">
        <CardHeader className="pb-2 flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">Energy vs Time</CardTitle>
            <p className="text-xs text-gray-400">
              {filter === "day" ? "Hourly — Today" : filter === "week" ? "Daily — This Week" : "Weekly — This Month"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                  interval={filter === "day" ? 2 : 0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E2E8F0" }}
                  unit={yUnit}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    padding: "10px 14px",
                  }}
                  labelStyle={{ color: "#64748B", fontSize: 12, marginBottom: 4 }}
                  formatter={(value: number) => [`${value} ${yUnit}`, "Power"]}
                />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="url(#lineGradient)"
                  strokeWidth={2.5}
                  dot={filter !== "day"}
                  activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card className="border-0 shadow-md shadow-gray-100">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-gray-900">Peak Consumption</CardTitle>
              <p className="text-xs text-gray-400">Hourly consumption overview</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={{ stroke: "#E2E8F0" }}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    tickLine={false}
                    axisLine={{ stroke: "#E2E8F0" }}
                    unit="W"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      padding: "10px 14px",
                    }}
                    formatter={(value: number) => [`${value} W`, "Consumption"]}
                  />
                  <Bar dataKey="consumption" radius={[4, 4, 0, 0]}>
                    {peakData.map((entry) => (
                      <Cell key={entry.hour} fill={entry.consumption > 2500 ? "#dc2626" : "#16a34a"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart — Daily Time Distribution */}
        <Card className="border-0 shadow-md shadow-gray-100">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <PieChartIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-gray-900">Daily Energy Distribution</CardTitle>
              <p className="text-xs text-gray-400">Consumption by time of day</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      padding: "10px 14px",
                    }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              {timeDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{item.icon}</span>
                      <span className="text-xs font-semibold text-gray-700">{item.name}</span>
                      <span className="text-xs font-bold ml-1" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
