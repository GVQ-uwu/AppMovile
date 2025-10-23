import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImportantDate } from "../../types/schedule";
import { Calendar, AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";

interface UpcomingDatesWidgetProps {
  dates: ImportantDate[];
}

export function UpcomingDatesWidget({ dates }: UpcomingDatesWidgetProps) {
  const upcomingDates = dates
    .filter(d => d.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "exam":
        return <Badge variant="destructive" className="text-xs">Examen</Badge>;
      case "assignment":
        return <Badge className="bg-blue-500 text-xs">Tarea</Badge>;
      case "holiday":
        return <Badge className="bg-green-500 text-xs">Feriado</Badge>;
      case "event":
        return <Badge className="bg-purple-500 text-xs">Evento</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays < 7) return `En ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Fechas Importantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDates.map((date) => (
            <div key={date.id} className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium">{date.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(date.date)}</p>
              </div>
              {getTypeBadge(date.type)}
            </div>
          ))}
          {upcomingDates.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay fechas próximas</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
