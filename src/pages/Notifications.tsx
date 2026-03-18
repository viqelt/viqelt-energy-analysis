import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info, Clock } from "lucide-react";

type NotificationType = "critical" | "warning" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "critical",
    title: "High energy consumption detected",
    description: "Power usage spiked to 4,200W at 22:30 — significantly above your daily average.",
    time: "Today, 22:30",
  },
  {
    id: 2,
    type: "critical",
    title: "Unusual spike in power usage",
    description: "Region B recorded a 180% increase in consumption over the last hour.",
    time: "Today, 21:15",
  },
  {
    id: 3,
    type: "warning",
    title: "Your consumption today is higher than average",
    description: "You have consumed 18.4 kWh so far today, compared to your 7-day average of 14.2 kWh.",
    time: "Today, 18:00",
  },
  {
    id: 4,
    type: "warning",
    title: "AC running for extended period",
    description: "Your air conditioner has been running continuously for 6 hours. Consider adjusting the thermostat.",
    time: "Today, 16:45",
  },
  {
    id: 5,
    type: "info",
    title: "Weekly energy report available",
    description: "Your weekly consumption summary is ready. Visit the Graphs & Analysis page for details.",
    time: "Today, 08:00",
  },
  {
    id: 6,
    type: "info",
    title: "System update completed",
    description: "Your Smart Energy Monitor firmware has been updated to version 2.1.4.",
    time: "Yesterday, 03:00",
  },
  {
    id: 7,
    type: "warning",
    title: "Gas consumption above threshold",
    description: "Your gas usage this month has exceeded 120 Th. Review your heating schedule.",
    time: "Yesterday, 12:30",
  },
  {
    id: 8,
    type: "info",
    title: "New AI recommendation",
    description: "Based on your usage patterns, we have a new energy-saving tip. Check the AI Prediction page.",
    time: "2 days ago",
  },
];

const typeConfig: Record<NotificationType, { icon: typeof AlertTriangle; bg: string; border: string; iconColor: string; badge: string; badgeText: string }> = {
  critical: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-500",
    badge: "bg-red-100 text-red-700",
    badgeText: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
    badgeText: "Warning",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-500",
    badge: "bg-blue-100 text-blue-700",
    badgeText: "Info",
  },
};

export default function Notifications() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-0.5">Stay informed about your energy usage alerts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {(["critical", "warning", "info"] as NotificationType[]).map((type) => {
          const config = typeConfig[type];
          const count = notifications.filter((n) => n.type === type).length;
          const Icon = config.icon;
          return (
            <Card key={type} className={`border ${config.border} ${config.bg} shadow-none`}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
                <div>
                  <p className="text-lg font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-500 capitalize">{config.badgeText}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;
          return (
            <Card
              key={notification.id}
              className={`border ${config.border} ${config.bg} shadow-none hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                      {config.badgeText}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notification.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-[11px] text-gray-400">{notification.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}