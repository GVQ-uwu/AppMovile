import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { CalendarView } from "./components/CalendarView";
import { ListView } from "./components/ListView";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";
import { 
  Home,
  Calendar,
  List,
  Bell,
  Settings,
  Menu,
  X,
  GraduationCap
} from "lucide-react";
import { mockCourses, mockSchedule, mockNotifications, mockImportantDates } from "./data/mockData";
import { Notification } from "./types/schedule";
import { useTheme } from "./hooks/useTheme";

type View = "home" | "calendar" | "list" | "notifications" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { theme, toggleTheme } = useTheme();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: "Inicio", icon: Home, view: "home" as View },
    { name: "Calendario", icon: Calendar, view: "calendar" as View },
    { name: "Lista", icon: List, view: "list" as View },
    { 
      name: "Notificaciones", 
      icon: Bell, 
      view: "notifications" as View,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { name: "Configuración", icon: Settings, view: "settings" as View },
  ];

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomePage
            courses={mockCourses}
            schedule={mockSchedule}
            importantDates={mockImportantDates}
          />
        );
      case "calendar":
        return <CalendarView courses={mockCourses} schedule={mockSchedule} />;
      case "list":
        return <ListView courses={mockCourses} schedule={mockSchedule} />;
      case "notifications":
        return (
          <NotificationsPanel
            notifications={notifications}
            courses={mockCourses}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
          />
        );
      case "settings":
        return <SettingsPanel theme={theme} onToggleTheme={toggleTheme} />;
      default:
        return (
          <HomePage
            courses={mockCourses}
            schedule={mockSchedule}
            importantDates={mockImportantDates}
          />
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-card border-r border-border
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">Mi Horario</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setCurrentView(item.view);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg
                    transition-colors
                    ${currentView === item.view 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent text-foreground'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="px-4 py-3 bg-accent/50 rounded-lg">
                <p className="text-sm font-medium">Semestre</p>
                <p className="text-xs text-muted-foreground">Otoño 2024</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground hidden md:block">
                {new Date().toLocaleDateString("es-ES", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderView()}
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
