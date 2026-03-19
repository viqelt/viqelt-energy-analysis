import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  GraduationCap,
  Zap,
  Brain,
  Wifi,
  BarChart2,
  Shield,
  Github,
  ExternalLink,
} from "lucide-react";

const teamMembers = [
  {
    name: "Oussama Benzaara",
    role: "Master Industrial Electrotechnics",
    email: "oussama.benzaara@gmail.com",
    gradient: "from-indigo-500 to-purple-600",
    initials: "OB",
  },
  {
    name: "Amina Touati",
    role: "Master Automatic Control & Industrial Informatics",
    email: "aminatouati732@gmail.com",
    gradient: "from-purple-500 to-pink-500",
    initials: "AT",
  },
];

const features = [
  { icon: Zap, title: "Real-time Monitoring", desc: "Live voltage, current, frequency and power factor measurement via Open CT sensor", gradient: "from-amber-400 to-orange-500" },
  { icon: Brain, title: "AI Device Detection", desc: "NILM algorithm identifies running appliances from consumption patterns", gradient: "from-purple-400 to-indigo-500" },
  { icon: Wifi, title: "IoT Connectivity", desc: "ESP32 microcontroller transmits data wirelessly via WiFi in real time", gradient: "from-blue-400 to-cyan-500" },
  { icon: BarChart2, title: "Smart Analytics", desc: "Interactive graphs and AI predictions to optimize your energy usage", gradient: "from-green-400 to-emerald-500" },
  { icon: Shield, title: "Energy Score", desc: "Intelligent scoring system evaluating your home energy efficiency", gradient: "from-rose-400 to-pink-500" },
  { icon: ExternalLink, title: "Carbon Footprint", desc: "Track your CO₂ emissions and environmental impact in real time", gradient: "from-teal-400 to-green-500" },
];

export default function AboutUs() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-48 md:h-56">
        <img
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80"
          alt="About VEAM"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-900/70 flex items-center px-6 md:px-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg"
                 className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 bg-white p-0.5"
              />
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">VEAM</h1>
                <p className="text-indigo-200 text-sm">Voltage Energy Analysis & Monitor</p>
              </div>
            </div>
            <p className="text-indigo-100 text-sm max-w-lg">
              An AI-powered IoT system for real-time home energy monitoring and intelligent device detection
            </p>
          </div>
        </div>
      </div>

      {/* About the Project */}
      <Card className="border-0 shadow-md shadow-gray-100">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            About the Project
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-900">VEAM</strong> is a smart energy monitoring system developed as a Master's graduation project. 
            It combines an <strong className="text-indigo-600">Open CT sensor</strong> with an <strong className="text-indigo-600">ESP32 microcontroller</strong> to measure 
            real-time electrical parameters — voltage, current, frequency, and power factor — and transmits this data wirelessly to a web dashboard.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Using <strong className="text-purple-600">Non-Intrusive Load Monitoring (NILM)</strong> techniques, the AI engine identifies 
            which household appliances are running based on their unique consumption signatures, without requiring direct connection to each device.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Accuracy", value: "~90%" },
              { label: "Update Rate", value: "3 sec" },
              { label: "Parameters", value: "4 live" },
            ].map((stat) => (
              <div key={stat.label} className="bg-indigo-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-indigo-600">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <Card key={f.title} className="border-0 shadow-sm shadow-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <f.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-500" />
          Project Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-0 shadow-md shadow-gray-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-0.5">{member.role}</p>
                  <a href={`mailto:${member.email}`}
                    className="flex items-center gap-1 mt-1.5 text-xs text-gray-400 hover:text-indigo-500 transition-colors">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* University + Location */}
      <Card className="border-0 shadow-md shadow-gray-100">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">University of Souk Ahras</p>
            <p className="text-sm text-indigo-600 font-medium mt-0.5">
              Department of Electrical Engineering
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400">Souk Ahras, Souk Ahras, Algeria</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600">
              2026 — 2027
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <div className="text-center pb-2">
        <p className="text-xs text-gray-400">
          VEAM — Voltage Energy Analysis & Monitor · Startup Project 2027
        </p>
        
      </div>

    </div>
  );
}
