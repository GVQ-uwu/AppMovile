import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, MapPin } from "lucide-react";
import { Course, ScheduleBlock } from "../../types/schedule";

interface NextClassWidgetProps {
  nextClass?: ScheduleBlock;
  course?: Course;
}

export function NextClassWidget({ nextClass, course }: NextClassWidgetProps) {
  if (!nextClass || !course) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Próxima Clase</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No hay clases próximas hoy</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Próxima Clase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${course.color}20`, borderLeft: `4px solid ${course.color}` }}
        >
          <p className="font-medium">{course.name}</p>
          <p className="text-sm text-muted-foreground">{course.code}</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{nextClass.startTime} - {nextClass.endTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{nextClass.room}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
