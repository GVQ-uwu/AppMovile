import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Notification, Course } from "../types/schedule";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, AlertTriangle, Info, Calendar, X } from "lucide-react";
import { useState } from "react";

interface NotificationsPanelProps {
  notifications: Notification[];
  courses: Course[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationsPanel({ notifications, courses, onMarkAsRead, onDelete }: NotificationsPanelProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getCourse = (courseId?: string) => {
    if (!courseId) return null;
    return courses.find(c => c.id === courseId);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "cancelled":
        return <X className="h-4 w-4 text-red-500" />;
      case "important":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "reminder":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "info":
        return <Info className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges: { [key: string]: { label: string; className: string } } = {
      cancelled: { label: "Cancelada", className: "bg-red-500" },
      important: { label: "Importante", className: "bg-orange-500" },
      reminder: { label: "Recordatorio", className: "bg-blue-500" },
      info: { label: "Información", className: "bg-green-500" }
    };
    const badge = badges[type] || { label: type, className: "bg-gray-500" };
    return <Badge className={badge.className}>{badge.label}</Badge>;
  };

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const sortedNotifications = [...filteredNotifications].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            Notificaciones
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Mantente al día con tus clases</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
          >
            No leídas
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No hay notificaciones</p>
            </CardContent>
          </Card>
        ) : (
          sortedNotifications.map(notification => {
            const course = getCourse(notification.courseId);
            
            return (
              <Card 
                key={notification.id}
                className={`${!notification.read ? 'border-l-4 border-l-primary bg-accent/20' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{notification.title}</CardTitle>
                          {getTypeBadge(notification.type)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {course && (
                          <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded text-xs" 
                               style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                            {course.code} • {course.name}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.date.toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          Marcar leída
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
