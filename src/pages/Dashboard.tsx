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

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/dashboard/graphs", label: "Graphs & Analysis", icon: BarChart3 },
  { path: "/dashboard/ai", label: "AI Prediction", icon: Brain },
  { path: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { path: "/dashboard/help", label: "Help & Contact", icon: HelpCircle },
];

const darkCSS = `
  .dw { color-scheme: dark; }
  .dw .bg-white, .dw [class*="bg-white"] { background-color: #1e293b !important; }
  .dw .bg-gray-50, .dw [class*="bg-gray-50"] { background-color: #0f172a !important; }
  .dw .bg-gray-100, .dw [class*="bg-gray-100"] { background-color: rgba(255,255,255,0.06) !important; }
  .dw .bg-indigo-50 { background-color: rgba(99,102,241,0.12) !important; }
  .dw .bg-amber-50 { background-color: rgba(251,191,36,0.08) !important; }
  .dw .bg-red-50 { background-color: rgba(239,68,68,0.08) !important; }
  .dw .bg-blue-50 { background-color: rgba(59,130,246,0.08) !important; }
  .dw .bg-green-100 { background-color: rgba(74,222,128,0.1) !important; }
  .dw .text-gray-900 { color: #f1f5f9 !important; }
  .dw .text-gray-800 { color: #e2e8f0 !important; }
  .dw .text-gray-700 { color: #cbd5e1 !important; }
  .dw .text-gray-600 { color: #94a3b8 !important; }
  .dw .text-gray-500 { color: #64748b !important; }
  .dw .text-gray-400 { color: #475569 !important; }
  .dw .border-gray-100 { border-color: rgba(255,255,255,0.07) !important; }
  .dw .border-gray-200 { border-color: rgba(255,255,255,0.1) !important; }
  .dw .border-amber-200 { border-color: rgba(251,191,36,0.25) !important; }
  .dw .border-red-200 { border-color: rgba(239,68,68,0.25) !important; }
  .dw .border-blue-200 { border-color: rgba(59,130,246,0.25) !important; }
  .dw .border-green-200 { border-color: rgba(74,222,128,0.25) !important; }
  .dw input, .dw textarea {
    background-color: #0f172a !important;
    color: #f1f5f9 !important;
    border-color: rgba(255,255,255,0.12) !important;
  }
  .dw input::placeholder, .dw textarea::placeholder { color: #475569 !important; }
  .dw .shadow-gray-100 { box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important; }
  .dw .shadow-md { box-shadow: 0 4px 16px rgba(0,0,0,0.4) !important; }
  .dw .hover\\:bg-gray-50:hover { background-color: rgba(255,255,255,0.04) !important; }
  .dw .hover\\:bg-gray-100:hover { background-color: rgba(255,255,255,0.07) !important; }
  .dw .hover\\:bg-indigo-50:hover { background-color: rgba(99,102,241,0.1) !important; }
  .dw .rounded-xl.border { border-color: rgba(255,255,255,0.07) !important; }
`;

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("veam-dark-mode") === "true";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("veam-dark-mode", String(darkMode));
  }, [darkMode]);

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const d = darkMode;

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: d ? "#0f172a" : "#f8fafc", transition: "background 0.3s" }}>
      {d && <style>{darkCSS}</style>}

      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          width: 260,
          background: d ? "#1e293b" : "#ffffff",
          borderRight: d ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f1f5f9",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <div style={{
          padding: 20, display: "flex", alignItems: "center", gap: 12,
          borderBottom: d ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f1f5f9",
        }}>
          <img src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg"
            style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover", border: d ? "2px solid rgba(99,102,241,0.4)" : "none" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: d ? "#f1f5f9" : "#111827" }}>VEAM</div>
            <div style={{ fontSize: 11, color: d ? "#64748b" : "#9ca3af", marginTop: 1 }}>Smart Energy Analysis & Monitor</div>
          </div>
          <button onClick={() => setSidebarOpen(false)}
            style={{ marginLeft: "auto", padding: 4, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer" }}
            className="lg:hidden">
            <X style={{ width: 20, height: 20, color: d ? "#94a3b8" : "#6b7280" }} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button key={item.path} onClick={() => handleNav(item.path)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                  background: active ? "linear-gradient(to right, #6366f1, #9333ea)" : "transparent",
                  color: active ? "#ffffff" : d ? "#94a3b8" : "#4b5563",
                  boxShadow: active ? "0 4px 15px rgba(99,102,241,0.35)" : "none",
                }}
                onMouseEnter={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.background = d ? "rgba(255,255,255,0.07)" : "#f3f4f6"; b.style.color = d ? "#f1f5f9" : "#111827"; }}}
                onMouseLeave={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = d ? "#94a3b8" : "#4b5563"; }}}
              >
                <Icon style={{ width: 18, height: 18, color: active ? "#fff" : d ? "#64748b" : "#9ca3af" }} />
                <span>{item.label}</span>
                {active && <ChevronRight style={{ width: 16, height: 16, marginLeft: "auto", color: "rgba(255,255,255,0.7)" }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: 12, borderTop: d ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f1f5f9" }}>
          <div style={{
            padding: 12, borderRadius: 12, marginBottom: 8,
            background: d ? "rgba(99,102,241,0.12)" : "linear-gradient(to right,#eef2ff,#f5f3ff)",
            border: d ? "1px solid rgba(99,102,241,0.2)" : "none",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: d ? "#818cf8" : "#4338ca" }}>Version 3</div>
            <div style={{ fontSize: 11, color: "#6366f1", marginTop: 2 }}>Simulated IoT data</div>
          </div>
          <button onClick={() => navigate("/")}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", borderRadius: 8, fontSize: 14,
              border: "none", cursor: "pointer", background: "transparent",
              color: d ? "#94a3b8" : "#6b7280", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = d ? "rgba(239,68,68,0.12)" : "#fef2f2"; b.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = d ? "#94a3b8" : "#6b7280"; }}
          >
            <LogOut style={{ width: 16, height: 16 }} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-[260px]" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: d ? "rgba(30,41,59,0.9)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: d ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f1f5f9",
          padding: "0 24px", height: 56,
          display: "flex", alignItems: "center", gap: 16,
          transition: "background 0.3s",
        }}>
          <button onClick={() => setSidebarOpen(true)}
            style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }}
            className="lg:hidden">
            <Menu style={{ width: 20, height: 20, color: d ? "#94a3b8" : "#4b5563" }} />
          </button>

          <h1 style={{
            fontSize: 18, fontWeight: 700,
            background: "linear-gradient(to right, #6366f1, #9333ea)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Smart Energy Dashboard
          </h1>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} className="animate-pulse" />
              <span style={{ fontSize: 12, color: d ? "#64748b" : "#9ca3af" }} className="hidden sm:inline">Connected</span>
            </div>

            {/* Toggle */}
            <button onClick={() => setDarkMode(!d)}
              title={d ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                position: "relative", width: 56, height: 28, borderRadius: 999,
                border: "none", cursor: "pointer",
                background: d ? "linear-gradient(135deg, #6366f1, #9333ea)" : "#e2e8f0",
                transition: "all 0.3s",
                boxShadow: d ? "0 0 20px rgba(99,102,241,0.5)" : "none",
                display: "flex", alignItems: "center", padding: "0 3px",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#ffffff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.3s",
                transform: d ? "translateX(28px)" : "translateX(0)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}>
                {d
                  ? <Moon style={{ width: 12, height: 12, color: "#6366f1" }} />
                  : <Sun style={{ width: 12, height: 12, color: "#f59e0b" }} />
                }
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 24, overflow: "auto", transition: "background 0.3s" }}>
          <div className={d ? "dw" : ""}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
