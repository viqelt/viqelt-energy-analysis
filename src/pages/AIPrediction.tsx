import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingDown,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  CircleDollarSign,
  Info,
  ChevronRight,
  Leaf,
  Car,
  Flame,
  RefreshCw,
  BarChart2,
  Clock,
  Zap,
  Database,
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
import { getAIPredictions } from "@/lib/mockData";

const SHEET_ID = "1g9XRplcjctpLaOnxmsy7C_0o8dc9Yy4-Zny6m7XSyXg";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

function AnimatedValue({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

interface SheetAnalysis {
  totalEnergy: number;
  avgPower: number;
  peakPower: number;
  peakTime: string;
  estimatedBill: number;
  topDevices: { name: string; power: number; percentage: number }[];
  recommendations: string[];
  rowCount: number;
}

export default function AIPrediction() {
  const predictions = getAIPredictions();
  const [visibleCards, setVisibleCards] = useState(0);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [sheetAnalysis, setSheetAnalysis] = useState<SheetAnalysis | null>(null);
  const [sheetError, setSheetError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prev) => {
        if (prev >= predictions.recommendations.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [predictions.recommendations.length]);

  const monthlyKwh = predictions.predictedBill / 4;
  const co2Kg = parseFloat((monthlyKwh * 0.5).toFixed(1));
  const carKm = Math.round(co2Kg * 4);
  const co2Level = co2Kg < 40 ? "low" : co2Kg < 80 ? "medium" : "high";
  const co2Config = co2Level === "low"
    ? { color: "#22c55e", bg: "from-green-400 to-emerald-500", label: "Low Impact 🌱", msg: "Great! Your carbon footprint is below average" }
    : co2Level === "medium"
    ? { color: "#f59e0b", bg: "from-amber-400 to-orange-500", label: "Medium Impact 🌿", msg: "Consider reducing consumption to lower your CO₂" }
    : { color: "#ef4444", bg: "from-red-400 to-rose-500", label: "High Impact ⚠️", msg: "Your carbon footprint is above average" };

  const analyzeSheetData = async () => {
    setLoadingSheet(true);
    setSheetError("");
    setSheetAnalysis(null);

    try {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const lines = text.trim().split("\n");
      const rows: { time: string; power: number; device: string }[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",").map(c => c.replace(/"/g, "").trim());
        if (cols.length >= 7) {
          rows.push({ time: cols[0], power: parseFloat(cols[3]), device: cols[6] });
        }
      }

      if (rows.length === 0) throw new Error("No data");

      const totalEnergy = parseFloat((rows.reduce((s, r) => s + r.power, 0) / 1000).toFixed(2));
      const avgPower = Math.round(rows.reduce((s, r) => s + r.power, 0) / rows.length);
      const peakRow = rows.reduce((max, r) => r.power > max.power ? r : max, rows[0]);
      const estimatedBill = Math.round(totalEnergy * 30 * 4);

      const deviceMap: Record<string, number[]> = {};
      rows.forEach(r => {
        if (!deviceMap[r.device]) deviceMap[r.device] = [];
        deviceMap[r.device].push(r.power);
      });

      const totalPower = rows.reduce((s, r) => s + r.power, 0);
      const topDevices = Object.entries(deviceMap)
        .map(([name, powers]) => ({
          name,
          power: Math.round(powers.reduce((a, b) => a + b, 0) / powers.length),
          percentage: Math.round((powers.reduce((a, b) => a + b, 0) / totalPower) * 100),
        }))
        .sort((a, b) => b.power - a.power)
        .slice(0, 5);

      const recommendations = [
        `⚡ Peak consumption at ${peakRow.time} reaching ${peakRow.power}W — shift tasks to off-peak hours`,
        `🔌 ${topDevices[0]?.name} uses ${topDevices[0]?.percentage}% of total energy — optimize its schedule`,
        `💰 Estimated monthly bill: ${estimatedBill} DA — reducing AC by 1h/day saves ~400 DA`,
        `🌱 Daily CO₂: ~${(totalEnergy * 0.5).toFixed(1)} kg — equivalent to ${Math.round(totalEnergy * 0.5 * 4)} km by car`,
      ];

      setSheetAnalysis({ totalEnergy, avgPower, peakPower: peakRow.power, peakTime: peakRow.time, estimatedBill, topDevices, recommendations, rowCount: rows.length });
    } catch {
      setSheetError("Failed to load data. Make sure the Google Sheet is public.");
    } finally {
      setLoadingSheet(false);
    }
  };

  const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-48">
        <img
          src="https://images.unsplash.com/photo-1620714223084-8fcacc2dbed5?w=1200&q=80"
          alt="AI Prediction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/60 flex items-center px-6 md:px-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-purple-300" />
              <span className="text-purple-300 text-sm font-medium">AI-Powered Analysis</span>
            </div>
            <h2 className="text-white text-xl md:text-2xl font-bold">Smart Predictions</h2>
            <p className="text-purple-200 text-sm mt-1">AI-driven insights to optimize your energy usage</p>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-sm">
              <CircleDollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">Predicted Monthly Bill</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <AnimatedValue target={predictions.predictedBill} />
              </span>
              <span className="text-lg font-medium text-gray-400">DA</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Based on current consumption patterns</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-sm">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">Potential Savings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-emerald-600">
                <AnimatedValue target={predictions.totalSavings} />
              </span>
              <span className="text-lg font-medium text-gray-400">DA</span>
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              💡 You can save up to {predictions.totalSavings.toLocaleString()} DA this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-0 shadow-md shadow-gray-100">
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">Smart Recommendations</CardTitle>
            <p className="text-xs text-gray-400">AI-generated tips to reduce your energy bill</p>
          </div>
          <Sparkles className="w-4 h-4 text-amber-400 ml-auto" />
        </CardHeader>
        <CardContent className="space-y-3">
          {predictions.recommendations.map((rec, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-all duration-300 group cursor-default ${
                index < visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
            >
              <span className="text-2xl flex-shrink-0">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900">{rec.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{rec.description}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-sm font-bold text-emerald-600">-{rec.savings} DA</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 🌍 Carbon Footprint */}
      <Card className="border-0 shadow-md shadow-gray-100 overflow-hidden">
        <div className={`h-1.5 w-full bg-gradient-to-r ${co2Config.bg}`} />
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${co2Config.bg} flex items-center justify-center`}>
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">Carbon Footprint</CardTitle>
            <p className="text-xs text-gray-400">Estimated CO₂ emissions from your energy usage</p>
          </div>
          <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: `${co2Config.color}18`, color: co2Config.color }}>
            {co2Config.label}
          </span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${co2Config.color}18` }}>
                <Flame className="w-6 h-6" style={{ color: co2Config.color }} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">This month you produced</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ color: co2Config.color }}>{co2Kg}</span>
                  <span className="text-sm font-medium text-gray-400">kg CO₂</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-xs text-gray-400">vs avg 80 kg</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.min((co2Kg / 120) * 100, 100)}%`, background: co2Config.color }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
            <Car className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-600">Equivalent to driving <span className="font-bold text-gray-900 mx-1">{carKm} km</span> by car</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${co2Config.color}10` }}>
            <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: co2Config.color }} />
            <p className="text-xs" style={{ color: co2Config.color }}>{co2Config.msg}</p>
          </div>
        </CardContent>
      </Card>

      {/* 📊 Google Sheets Analysis */}
      <Card className="border-0 shadow-md shadow-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600" />
        <CardHeader className="pb-3 flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">Real Data Analysis</CardTitle>
            <p className="text-xs text-gray-400">Analyze your energy data from Google Sheets</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={analyzeSheetData}
            disabled={loadingSheet}
            className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all duration-300"
          >
            {loadingSheet ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing data...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Analyze from Google Sheets</span>
              </div>
            )}
          </Button>

          {sheetError && <p className="text-xs text-red-500 text-center">{sheetError}</p>}

          {sheetAnalysis && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <p className="text-xs text-green-600 font-medium text-center">✅ {sheetAnalysis.rowCount} records analyzed successfully</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Daily Energy", value: `${sheetAnalysis.totalEnergy} kWh`, icon: Zap, color: "text-amber-500" },
                  { label: "Avg Power", value: `${sheetAnalysis.avgPower} W`, icon: BarChart2, color: "text-blue-500" },
                  { label: "Peak Power", value: `${sheetAnalysis.peakPower} W`, icon: TrendingDown, color: "text-red-500" },
                  { label: "Peak Time", value: sheetAnalysis.peakTime, icon: Clock, color: "text-purple-500" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-gray-50 flex items-center gap-2">
                    <s.icon className={`w-4 h-4 flex-shrink-0 ${s.color}`} />
                    <div>
                      <p className="text-[11px] text-gray-400">{s.label}</p>
                      <p className="text-sm font-bold text-gray-900">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Est Bill */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-indigo-600 font-medium">Estimated Monthly Bill</p>
                  <p className="text-2xl font-bold text-indigo-700">{sheetAnalysis.estimatedBill} <span className="text-sm font-medium text-indigo-400">DA</span></p>
                </div>
                <CircleDollarSign className="w-10 h-10 text-indigo-300" />
              </div>

              {/* Chart */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Top Energy Consumers</p>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sheetAnalysis.topDevices} margin={{ top: 5, right: 10, left: -10, bottom: 35 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94A3B8" }} angle={-15} textAnchor="end" />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} unit="W" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: 12 }}
                        formatter={(v: number) => [`${v} W`, "Avg Power"]}
                      />
                      <Bar dataKey="power" radius={[6, 6, 0, 0]}>
                        {sheetAnalysis.topDevices.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Insights</p>
                {sheetAnalysis.recommendations.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-gray-50">
                    <span className="text-sm">{r.split(" ")[0]}</span>
                    <p className="text-xs text-gray-600">{r.substring(r.indexOf(" ") + 1)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-0 bg-amber-50 shadow-sm">
        <CardContent className="py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-800">Disclaimer</h4>
            <p className="text-xs text-amber-700 mt-0.5">
              This prediction is based on AI analysis and may not be 100% accurate. Actual energy consumption and costs may vary based on real-time usage patterns, weather conditions, and appliance efficiency.
            </p>
          </div>
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        </CardContent>
      </Card>
    </div>
  );
}
