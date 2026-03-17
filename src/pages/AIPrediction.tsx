import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  TrendingDown,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  BadgeDollarSign,
  Info,
  ChevronRight,
} from "lucide-react";
import { getAIPredictions } from "@/lib/mockData";

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

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function AIPrediction() {
  const predictions = getAIPredictions();
  const [visibleCards, setVisibleCards] = useState(0);

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-48">
        <img
          src="https://mgx-backend-cdn.metadl.com/generate/images/446531/2026-03-17/31e7e916-3cfc-485b-ab28-389e045c6018.png"
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
        {/* Predicted Bill */}
        <Card className="border-0 shadow-md shadow-gray-100 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-sm">
              <BadgeDollarSign className="w-5 h-5 text-white" />
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

        {/* Savings */}
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
                index < visibleCards
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
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

      {/* Disclaimer */}
      <Card className="border-0 bg-amber-50 shadow-sm">
        <CardContent className="py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-800">Disclaimer</h4>
            <p className="text-xs text-amber-700 mt-0.5">
              This prediction is based on AI analysis and may not be 100% accurate. Actual energy
              consumption and costs may vary based on real-time usage patterns, weather conditions,
              and appliance efficiency.
            </p>
          </div>
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        </CardContent>
      </Card>
    </div>
  );
}