import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Zap,
  DollarSign,
  Receipt,
  Fuel,
  Upload,
  CheckCircle2,
  TrendingUp,
  Activity,
  Gauge,
  Radio,
  Waves,
  CircleDot,
  Wifi,
  ShoppingCart,
  X,
  Cpu,
  BarChart2,
  Smartphone,
} from "lucide-react";
import { getRealtimePower, ELECTRICITY_PRICE, getEstimatedMonthlyBill, GAS_PRICE_PER_TH } from "@/lib/mockData";

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current !== target ? count : 0;
    prevTarget.current = target;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  const [currentPower, setCurrentPower] = useState(1250);
  const [gasTh, setGasTh] = useState(150);
  const [includeGas, setIncludeGas] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success">("idle");
  const [lastUpdate, setLastUpdate] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPower(getRealtimePower());
      setLastUpdate(0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setLastUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const monthlyBill = getEstimatedMonthlyBill(currentPower, includeGas, gasTh);

  const handleUpload = () => {
    setUploadStatus("loading");
    setTimeout(() => {
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }, 2000);
  };

  const electricalParams = [
    { label: "Voltage", value: (218 + Math.random() * 4).toFixed(1), unit: "V", icon: Zap, gradient: "from-amber-400 to-orange-500" },
    { label: "Current", value: (currentPower / 220).toFixed(2), unit: "A", icon: Gauge, gradient: "from-blue-400 to-cyan-500" },
    { label: "Frequency", value: (49.9 + Math.random() * 0.2).toFixed(1), unit: "Hz", icon: Waves, gradient: "from-green-400 to-emerald-500" },
    { label: "Power Factor", value: (0.88 + Math.random() * 0.08).toFixed(2), unit: "cos φ", icon: CircleDot, gradient: "from-purple-400 to-violet-500" },
  ];

  const deviceFeatures = [
    { icon: Zap, text: "Real-time energy monitoring" },
    { icon: Cpu, text: "AI-based device detection" },
    { icon: Wifi, text: "WiFi connectivity" },
    { icon: BarChart2, text: "Web dashboard" },
    { icon: Smartphone, text: "Mobile dashboard" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-48">
        <img
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80"
          alt="Energy Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/60 flex items-center justify-between px-6 md:px-8">
          <div>
            <h2 className="text-white text-xl md:text-2xl font-bold">Welcome to Your Energy Hub</h2>
            <p className="text-indigo-200 text-sm mt-1">Monitor, analyze, and optimize your energy consumption</p>
          </div>
          <button
            onClick={() => setShowBuyModal(true)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 border border-white/30 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>🛒 Buy Device</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 group">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">Real-time Power</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">
                {(currentPower / 1000).toFixed(2)}
              </span>
              <span className="text-lg font-medium text-gray-400">kW</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Activity className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Live monitoring</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-sm">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">Electricity Price</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{ELECTRICITY_PRICE}</span>
              <span className="text-lg font-medium text-gray-400">DA/kWh</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Fixed rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-sm">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-500">Est. Monthly Bill</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={monthlyBill} />
              </span>
              <span className="text-lg font-medium text-gray-400">DA</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-purple-600 font-medium">
                {includeGas ? "Electricity + Gas" : "Electricity only"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Electrical Parameters Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Radio className="w-4 h-4 text-indigo-500" />
          Real-time Electrical Parameters
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {electricalParams.map((param) => (
            <Card key={param.label} className="border-0 shadow-sm shadow-gray-100 hover:shadow-md hover:shadow-indigo-100/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${param.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <param.icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium truncate">{param.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900">{param.value}</span>
                    <span className="text-xs font-medium text-gray-400">{param.unit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Indicator */}
      <Card className="border-0 shadow-sm shadow-gray-100 hover:shadow-md transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-sm">
              <Wifi className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-900">Status:</span>
                <span className="text-sm font-semibold text-green-600">Connected</span>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Last Update: <span className="font-medium text-gray-500">{lastUpdate} sec ago</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-600 font-medium hidden sm:inline">Live</span>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <Fuel className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-900">Gas Consumption</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Include gas in your bill calculation</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="gas-toggle" className="text-sm text-gray-600 font-medium">
                Include gas in total calculation
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${!includeGas ? "text-gray-900" : "text-gray-400"}`}>OFF</span>
                <Switch id="gas-toggle" checked={includeGas} onCheckedChange={setIncludeGas} />
                <span className={`text-xs font-medium ${includeGas ? "text-gray-900" : "text-gray-400"}`}>ON</span>
              </div>
            </div>
            <div className={`transition-all duration-300 ${includeGas ? "opacity-100 max-h-40" : "opacity-40 max-h-40 pointer-events-none"}`}>
              <Label htmlFor="gas-amount" className="text-xs text-gray-500">Gas Consumption (Th)</Label>
              <Input
                id="gas-amount"
                type="number"
                value={gasTh}
                onChange={(e) => setGasTh(Number(e.target.value))}
                className="mt-1 h-10 border-gray-200 focus:border-indigo-500 rounded-lg"
                placeholder="Enter gas consumption in Th"
              />
              <p className="text-xs text-gray-400 mt-2">
                Gas price: <span className="font-semibold text-gray-600">{GAS_PRICE_PER_TH} DA per Th</span>
              </p>
              {includeGas && gasTh > 0 && (
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  Gas total: {(gasTh * GAS_PRICE_PER_TH).toFixed(2)} DA
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-sm">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-900">IoT Device Upload</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Sync data from ESP32 via WiFi</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
              alt="IoT Device"
              className="w-full h-28 object-cover rounded-xl"
            />
            <Button
              onClick={handleUpload}
              disabled={uploadStatus === "loading"}
              className={`w-full h-11 rounded-xl font-medium transition-all duration-300 ${
                uploadStatus === "success"
                  ? "bg-green-500 hover:bg-green-600 shadow-green-200"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-200"
              } text-white shadow-lg hover:shadow-xl`}
            >
              {uploadStatus === "loading" ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading from ESP32...</span>
                </div>
              ) : uploadStatus === "success" ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Data Uploaded Successfully!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Data from Device</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Buy Device Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowBuyModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <button
                onClick={() => setShowBuyModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">Smart Energy Device</h2>
                  <p className="text-indigo-200 text-sm">VEAM IoT Monitor</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                A smart device that monitors your home energy consumption in real time using AI — detects which appliances are running and predicts your monthly bill.
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Features</p>
                {deviceFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Price</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-indigo-600">4000</span>
                  <span className="text-sm font-medium text-indigo-400 ml-1">DA</span>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <Button
                  onClick={() => alert("🚧 Demo only — Order feature coming soon!")}
                  className="flex-1 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
                <Button
                  onClick={() => setShowBuyModal(false)}
                  variant="outline"
                  className="flex-1 h-11 rounded-xl font-medium border-gray-200 hover:bg-gray-50 transition-all duration-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
