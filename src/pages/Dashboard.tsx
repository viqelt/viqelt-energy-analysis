import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  Brain,
  HelpCircle,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Wifi,
  WifiOff,
  Info,
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
  { path: "/dashboard/about", label: "About Us", icon: Info },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [deviceCode, setDeviceCode] = useState(() =>
    localStorage.getItem("veam-device-code") || ""
  );
  const [connected, setConnected] = useState(() =>
    localStorage.getItem("veam-device-connected") === "true"
  );
  const [connecting, setConnecting] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("veam-dark") === "true";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("veam-dark", String(darkMode));
  }, [darkMode]);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleConnect = () => {
    if (!deviceCode.trim()) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      localStorage.setItem("veam-device-connected", "true");
      localStorage.setItem("veam-device-code", deviceCode);
      setShowDeviceModal(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setDeviceCode("");
    localStorage.removeItem("veam-device-connected");
    localStorage.removeItem("veam-device-code");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 flex transition-colors duration-300">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 z-50 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-gray-100 dark:border-slate-800">
          <img
            src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg"
            className="w-10 h-10 rounded-xl object-cover object-center bg-white p-0.5"
            style={{ minWidth: "40px" }}
          />
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">VEAM</h2>
            <p className="text-[11px] text-gray-400 dark:text-slate-500">Voltage Energy Analysis & Monitor</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
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
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? "text-white" : "text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-white"}`} />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-white/70" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 mb-3 border dark:border-indigo-900/30">
            <p className="text-xs font-medium text-indigo-700 dark:text-indigo-400">Demo Version</p>
            <p className="text-[11px] text-indigo-500 mt-0.5">Simulated IoT data</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => { sessionStorage.removeItem("veam-logged-in"); navigate("/"); }}
            className="w-full justify-start gap-2 text-gray-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 dark:hover:text-red-400 text-sm h-9"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 px-4 lg:px-6 h-14 flex items-center gap-4 transition-colors duration-300">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-slate-400" />
          </button>

          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smart Energy Dashboard
          </h1>

          <div className="ml-auto flex items-center gap-3">
            {/* Connected button */}
            <button
              onClick={() => setShowDeviceModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${connected ? "bg-green-400 animate-pulse" : "bg-gray-300 dark:bg-slate-600"}`} />
              <span className="text-xs text-gray-500 dark:text-slate-400 hidden sm:inline">
                {connected ? "Connected" : "Not Connected"}
              </span>
              {connected
                ? <Wifi className="w-3.5 h-3.5 text-green-500" />
                : <WifiOff className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
              }
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 focus:outline-none"
              style={{
                background: darkMode ? "linear-gradient(135deg, #6366f1, #9333ea)" : "#e2e8f0",
                boxShadow: darkMode ? "0 0 16px rgba(99,102,241,0.4)" : "none",
              }}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div
                className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300"
                style={{ transform: darkMode ? "translateX(28px)" : "translateX(0)" }}
              >
                {darkMode
                  ? <Moon className="w-3 h-3 text-indigo-600" />
                  : <Sun className="w-3 h-3 text-amber-500" />
                }
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Device Connect Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowDeviceModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <button
                onClick={() => setShowDeviceModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">Connect Your Device</h2>
                  <p className="text-indigo-200 text-sm">VEAM IoT Energy Monitor</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {connected ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto">
                    <Wifi className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Device Connected ✅</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      Serial: <span className="font-mono text-indigo-600">{deviceCode}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleDisconnect} variant="outline"
                      className="flex-1 h-11 rounded-xl border-red-200 text-red-600 hover:bg-red-50">
                      Disconnect
                    </Button>
                    <Button onClick={() => setShowDeviceModal(false)}
                      className="flex-1 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Enter the serial number found on your VEAM device to connect it to the dashboard.
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                      Device Serial Number
                    </label>
                    <input
                      type="text"
                      value={deviceCode}
                      onChange={(e) => setDeviceCode(e.target.value.toUpperCase())}
                      placeholder="VEAM-2026-XXXXXX"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-gray-900 placeholder-gray-300"
                    />
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-950/50 rounded-xl p-3">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                      💡 The serial number is printed on the back of your VEAM device
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleConnect} disabled={!deviceCode.trim() || connecting}
                      className="flex-1 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all duration-300">
                      {connecting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4" />
                          <span>Connect</span>
                        </div>
                      )}
                    </Button>
                    <Button onClick={() => setShowDeviceModal(false)} variant="outline"
                      className="flex-1 h-11 rounded-xl border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-slate-300">
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
