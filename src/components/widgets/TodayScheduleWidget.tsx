import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Course, ScheduleBlock } from "../../types/schedule";
import { Clock } from "lucide-react";

interface TodayScheduleWidgetProps {
  todayClasses: ScheduleBlock[];
  courses: Course[];
}

export function TodayScheduleWidget({ todayClasses, courses }: TodayScheduleWidgetProps) {
  const getCourse = (courseId: string) => courses.find(c => c.id === courseId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Horario de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        {todayClasses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay clases hoy</p>
        ) : (
          <div className="space-y-2">
            {todayClasses.map((block) => {
              const course = getCourse(block.courseId);
              if (!course) return null;
              
              return (
                <div
                  key={block.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  style={{ borderLeft: `3px solid ${course.color}` }}
                >
                  <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-[80px]">
                    <Clock className="h-3 w-3" />
                    {block.startTime}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{course.code}</p>
                    <p className="text-xs text-muted-foreground">{block.room}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
