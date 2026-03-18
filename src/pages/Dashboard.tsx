import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Brain,
  HelpCircle,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/dashboard/graphs", label: "Graphs & Analysis", icon: BarChart3 },
  { path: "/dashboard/ai", label: "AI Prediction", icon: Brain },
  { path: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { path: "/dashboard/help", label: "Help & Contact", icon: HelpCircle },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("veam-dark-mode") === "true";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("veam-dark-mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const dm = darkMode;

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${dm ? "bg-[#0f172a]" : "bg-gray-50/50"}`}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] z-50 flex flex-col transition-all duration-300 ease-in-out border-r ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${dm
          ? "bg-[#1e293b] border-white/10"
          : "bg-white border-gray-100"
        }`}
      >
        {/* Logo */}
        <div className={`p-5 flex items-center gap-3 border-b ${dm ? "border-white/10" : "border-gray-100"}`}>
          <img
            src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <h2 className={`font-bold text-sm leading-tight ${dm ? "text-white" : "text-gray-900"}`}>VEAM</h2>
            <p className={`text-[11px] ${dm ? "text-gray-400" : "text-gray-400"}`}>Smart Energy Analysis & Monitor</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`ml-auto lg:hidden p-1 rounded-lg ${dm ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          >
            <X className={`w-5 h-5 ${dm ? "text-gray-400" : "text-gray-500"}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                    : dm
                    ? "text-gray-400 hover:bg-white/10 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? "text-white" : dm ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-white/70" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className={`p-3 border-t ${dm ? "border-white/10" : "border-gray-100"}`}>
          <div className={`p-3 rounded-xl mb-3 ${dm ? "bg-indigo-500/10 border border-indigo-500/20" : "bg-gradient-to-r from-indigo-50 to-purple-50"}`}>
            <p className={`text-xs font-medium ${dm ? "text-indigo-400" : "text-indigo-700"}`}>Version 3</p>
            <p className={`text-[11px] mt-0.5 ${dm ? "text-indigo-500" : "text-indigo-500"}`}>Simulated IoT data</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className={`w-full justify-start gap-2 text-sm h-9 ${dm ? "text-gray-400 hover:text-red-400 hover:bg-red-500/10" : "text-gray-500 hover:text-red-600 hover:bg-red-50"}`}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 lg:px-6 h-14 flex items-center gap-4 transition-colors duration-300 ${
          dm
            ? "bg-[#1e293b]/80 border-white/10"
            : "bg-white/80 border-gray-100"
        }`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden p-2 rounded-lg ${dm ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          >
            <Menu className={`w-5 h-5 ${dm ? "text-gray-300" : "text-gray-600"}`} />
          </button>

          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Smart Energy Dashboard
          </h1>

          <div className="ml-auto flex items-center gap-3">
            {/* Connected */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className={`text-xs hidden sm:inline ${dm ? "text-gray-400" : "text-gray-500"}`}>Connected</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
                dm
                  ? "bg-indigo-600 shadow-lg shadow-indigo-500/30"
                  : "bg-gray-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                dm
                  ? "translate-x-7 bg-white"
                  : "translate-x-0 bg-white"
              }`}>
                {dm
                  ? <Moon className="w-3 h-3 text-indigo-600" />
                  : <Sun className="w-3 h-3 text-amber-500" />
                }
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className={`transition-colors duration-300 ${dm ? "[&_.text-gray-900]:text-white [&_.text-gray-700]:text-gray-200 [&_.text-gray-600]:text-gray-300 [&_.text-gray-500]:text-gray-400 [&_.text-gray-400]:text-gray-500 [&_.bg-white]:bg-[#1e293b] [&_.shadow-gray-100]:shadow-slate-900 [&_.border-gray-100]:border-white/10 [&_.border-gray-200]:border-white/10 [&_.bg-gray-50]:bg-[#0f172a] [&_.bg-gray-100]:bg-white/10 [&_.hover\\:bg-gray-50]:hover:bg-white/5 [&_.hover\\:bg-gray-100]:hover:bg-white/10" : ""}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
