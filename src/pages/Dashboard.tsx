import { useState } from "react";
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
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [deviceCode, setDeviceCode] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      setShowDeviceModal(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setDeviceCode("");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex items-center gap-3 border-b border-gray-100">
          <img src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg" className="w-10 h-10 rounded-xl object-cover object-center" style={{minWidth: '40px'}} />
          <div>
            <h2 className="font-bold text-gray-900 text-sm leading-tight">VEAM</h2>
            <p className="text-[11px] text-gray-400">Smart Energy Analysis & Monitor</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

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
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-white/70" />}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 mb-3">
            <p className="text-xs font-medium text-indigo-700">Demo Version</p>
            <p className="text-[11px] text-indigo-500 mt-0.5">Simulated IoT data</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full justify-start gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 text-sm h-9"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 lg:px-6 h-14 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smart Energy Dashboard
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowDeviceModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${connected ? "bg-green-400 animate-pulse" : "bg-gray-300"}`} />
              <span className="text-xs text-gray-500 hidden sm:inline">
                {connected ? "Connected" : "Not Connected"}
              </span>
              {connected
                ? <Wifi className="w-3.5 h-3.5 text-green-500" />
                : <WifiOff className="w-3.5 h-3.5 text-gray-400" />
              }
            </button>
          </div>
        </header>

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
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden">

            {/* Header */}
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

            {/* Body */}
            <div className="p-6 space-y-4">
              {connected ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Wifi className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Device Connected ✅</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Serial: <span className="font-mono text-indigo-600">{deviceCode}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleDisconnect}
                      variant="outline"
                      className="flex-1 h-11 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Disconnect
                    </Button>
                    <Button
                      onClick={() => setShowDeviceModal(false)}
                      className="flex-1 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    Enter the serial number found on your VEAM device to connect it to the dashboard.
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Device Serial Number
                    </label>
                    <input
                      type="text"
                      value={deviceCode}
                      onChange={(e) => setDeviceCode(e.target.value.toUpperCase())}
                      placeholder="VEAM-2026-XXXXXX"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-gray-900 placeholder-gray-300"
                    />
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-3">
                    <p className="text-xs text-indigo-600">
                      💡 The serial number is printed on the back of your VEAM device
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleConnect}
                      disabled={!deviceCode.trim() || connecting}
                      className="flex-1 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all duration-300"
                    >
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
                    <Button
                      onClick={() => setShowDeviceModal(false)}
                      variant="outline"
                      className="flex-1 h-11 rounded-xl border-gray-200 hover:bg-gray-50"
                    >
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
