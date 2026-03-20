import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  BarChart2,
  Thermometer,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const SHEET_ID = "1g9XRplcjctpLaOnxmsy7C_0o8dc9Yy4-Zny6m7XSyXg";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

interface EnergyRow {
  time: string;
  voltage: number;
  current: number;
  power: number;
  powerFactor: number;
  frequency: number;
  device: string;
}

interface Analysis {
  totalEnergy: number;
  avgPower: number;
  peakPower: number;
  peakTime: string;
  estimatedBill: number;
  topDevices: { name: string; power: number; percentage: number }[];
  recommendations: string[];
  avgVoltage: number;
  avgPowerFactor: number;
}

function analyzeData(rows: EnergyRow[]): Analysis {
  const totalEnergy = rows.reduce((sum, r) => sum + r.power, 0) / 1000; // kWh
  const avgPower = rows.reduce((sum, r) => sum + r.power, 0) / rows.length;
  const peakRow = rows.reduce((max, r) => r.power > max.power ? r : max, rows[0]);
  const estimatedBill = Math.round(totalEnergy * 30 * 4); // 4 DA per kWh * 30 days

  // Device usage
  const deviceMap: Record<string, number> = {};
  rows.forEach(r => {
    if (!deviceMap[r.device]) deviceMap[r.device] = 0;
    deviceMap[r.device] += r.power;
  });

  const totalPower = Object.values(deviceMap).reduce((a, b) => a + b, 0);
  const topDevices = Object.entries(deviceMap)
    .map(([name, power]) => ({
      name,
      power: Math.round(power / rows.filter(r => r.device === name).length),
      percentage: Math.round((power / totalPower) * 100),
    }))
    .sort((a, b) => b.power - a.power)
    .slice(0, 5);

  const avgVoltage = rows.reduce((sum, r) => sum + r.voltage, 0) / rows.length;
  const avgPowerFactor = rows.reduce((sum, r) => sum + r.powerFactor, 0) / rows.length;

  // Recommendations
  const recommendations: string[] = [];
  if (peakRow.power > 1500) recommendations.push(`⚡ Peak consumption at ${peakRow.time} — consider shifting high-power tasks to off-peak hours`);
  if (avgPowerFactor < 0.93) recommendations.push(`📊 Average Power Factor is ${avgPowerFactor.toFixed(2)} — consider power factor correction`);
  if (topDevices[0]?.percentage > 40) recommendations.push(`🔌 ${topDevices[0].name} consumes ${topDevices[0].percentage}% of total energy — optimize its usage`);
  if (estimatedBill > 3000) recommendations.push(`💰 Estimated bill ${estimatedBill} DA — reducing AC usage by 1h/day saves ~400 DA`);
  recommendations.push(`🌱 Your carbon footprint: ~${(totalEnergy * 30 * 0.5).toFixed(1)} kg CO₂/month`);

  return {
    totalEnergy: parseFloat(totalEnergy.toFixed(2)),
    avgPower: Math.round(avgPower),
    peakPower: peakRow.power,
    peakTime: peakRow.time,
    estimatedBill,
    topDevices,
    recommendations,
    avgVoltage: parseFloat(avgVoltage.toFixed(1)),
    avgPowerFactor: parseFloat(avgPowerFactor.toFixed(2)),
  };
}

export default function AIAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [rowCount, setRowCount] = useState(0);

  const fetchAndAnalyze = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const res = await fetch(SHEET_URL);
      const text = await res.text();

      const lines = text.trim().split("\n");
      const rows: EnergyRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map(c => c.replace(/"/g, "").trim());
        if (cols.length >= 7) {
          rows.push({
            time: cols[0],
            voltage: parseFloat(cols[1]),
            current: parseFloat(cols[2]),
            power: parseFloat(cols[3]),
            powerFactor: parseFloat(cols[4]),
            frequency: parseFloat(cols[5]),
            device: cols[6],
          });
        }
      }

      if (rows.length === 0) throw new Error("No data found");

      setRowCount(rows.length);
      const result = analyzeData(rows);
      setAnalysis(result);
    } catch (e) {
      setError("Failed to load data. Make sure the Google Sheet is public.");
    } finally {
      setLoading(false);
    }
  };

  const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-48">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
          alt="AI Analysis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-900/70 flex items-center px-6 md:px-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-purple-300" />
              <span className="text-purple-300 text-sm font-medium">AI-Powered</span>
            </div>
            <h2 className="text-white text-xl md:text-2xl font-bold">Real Data Analysis</h2>
            <p className="text-indigo-200 text-sm mt-1">Analyze your energy data from Google Sheets</p>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <Card className="border-0 shadow-md shadow-gray-100">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Click to load and analyze your energy data from Google Sheets
          </p>
          <Button
            onClick={fetchAndAnalyze}
            disabled={loading}
            className="h-12 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Analyze from Google Sheets</span>
              </div>
            )}
          </Button>
          {rowCount > 0 && (
            <p className="text-xs text-green-600 font-medium">
              ✅ {rowCount} records loaded successfully
            </p>
          )}
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {analysis && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Daily Energy", value: `${analysis.totalEnergy} kWh`, icon: Zap, gradient: "from-amber-400 to-orange-500" },
              { label: "Avg Power", value: `${analysis.avgPower} W`, icon: TrendingUp, gradient: "from-blue-400 to-indigo-500" },
              { label: "Est. Monthly Bill", value: `${analysis.estimatedBill} DA`, icon: BarChart2, gradient: "from-purple-400 to-pink-500" },
              { label: "Peak at", value: analysis.peakTime, icon: Clock, gradient: "from-red-400 to-rose-500" },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm shadow-gray-100">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">{stat.label}</p>
                    <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Electrical Quality */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow-sm shadow-gray-100">
              <CardContent className="p-4 text-center">
                <Thermometer className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{analysis.avgVoltage} V</p>
                <p className="text-xs text-gray-400">Avg Voltage</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm shadow-gray-100">
              <CardContent className="p-4 text-center">
                <Zap className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{analysis.avgPowerFactor}</p>
                <p className="text-xs text-gray-400">Avg Power Factor</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Devices Chart */}
          <Card className="border-0 shadow-md shadow-gray-100">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">Top Energy Consumers</CardTitle>
                <p className="text-xs text-gray-400">Detected from consumption patterns</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis.topDevices} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94A3B8" }} angle={-20} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} unit="W" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px", color: "#f1f5f9" }}
                      formatter={(value: number) => [`${value} W`, "Avg Power"]}
                    />
                    <Bar dataKey="power" radius={[6, 6, 0, 0]}>
                      {analysis.topDevices.map((_, i) => (
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {analysis.topDevices.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: colors[i % colors.length] }} />
                    <span className="text-xs text-gray-600 truncate">{d.name}</span>
                    <span className="ml-auto text-xs font-semibold text-gray-500">{d.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-md shadow-gray-100">
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold text-gray-900">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
