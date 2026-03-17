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
} from "lucide-react";
import { getRealtimePower, ELECTRICITY_PRICE, getEstimatedMonthlyBill } from "@/lib/mockData";

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
      // Ease out cubic
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
  const [gasAmount, setGasAmount] = useState(500);
  const [includeGas, setIncludeGas] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success">("idle");

  // Simulate real-time power updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPower(getRealtimePower());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const monthlyBill = getEstimatedMonthlyBill(currentPower, includeGas, gasAmount);

  const handleUpload = () => {
    setUploadStatus("loading");
    setTimeout(() => {
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-48">
        <img
          src="https://mgx-backend-cdn.metadl.com/generate/images/446531/2026-03-17/587c17fb-fa37-421f-b3fb-902bc4805415.png"
          alt="Energy Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/60 flex items-center px-6 md:px-8">
          <div>
            <h2 className="text-white text-xl md:text-2xl font-bold">Welcome to Your Energy Hub</h2>
            <p className="text-indigo-200 text-sm mt-1">Monitor, analyze, and optimize your energy consumption</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Real-time Power */}
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
                <AnimatedCounter target={currentPower} />
              </span>
              <span className="text-lg font-medium text-gray-400">W</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Activity className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Live monitoring</span>
            </div>
          </CardContent>
        </Card>

        {/* Electricity Price */}
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

        {/* Estimated Monthly Bill */}
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gas Input */}
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
                Include Gas
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${!includeGas ? "text-gray-900" : "text-gray-400"}`}>OFF</span>
                <Switch
                  id="gas-toggle"
                  checked={includeGas}
                  onCheckedChange={setIncludeGas}
                />
                <span className={`text-xs font-medium ${includeGas ? "text-gray-900" : "text-gray-400"}`}>ON</span>
              </div>
            </div>
            <div className={`transition-all duration-300 ${includeGas ? "opacity-100 max-h-20" : "opacity-40 max-h-20 pointer-events-none"}`}>
              <Label htmlFor="gas-amount" className="text-xs text-gray-500">
                Gas Amount (DA)
              </Label>
              <Input
                id="gas-amount"
                type="number"
                value={gasAmount}
                onChange={(e) => setGasAmount(Number(e.target.value))}
                className="mt-1 h-10 border-gray-200 focus:border-indigo-500 rounded-lg"
                placeholder="Enter gas cost in DA"
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Data */}
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
              src="https://mgx-backend-cdn.metadl.com/generate/images/446531/2026-03-17/ffe48386-02af-4d30-bac7-fa6b9d6aa9e8.png"
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
    </div>
  );
}