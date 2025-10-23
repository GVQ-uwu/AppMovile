import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Course, ScheduleBlock } from "../types/schedule";
import { Badge } from "./ui/badge";

interface CalendarViewProps {
  courses: Course[];
  schedule: ScheduleBlock[];
}

export function CalendarView({ courses, schedule }: CalendarViewProps) {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

  const getCourse = (courseId: string) => courses.find(c => c.id === courseId);

  const getBlocksForDayAndHour = (day: string, hour: number) => {
    return schedule.filter(block => {
      if (block.day !== day) return false;
      const startHour = parseInt(block.startTime.split(':')[0]);
      const endHour = parseInt(block.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      lecture: "Cátedra",
      lab: "Laboratorio",
      tutorial: "Ayudantía",
      online: "Online"
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Vista Calendario</h1>
        <p className="text-muted-foreground">Horario semanal de clases</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="text-sm font-medium text-center py-2">Hora</div>
                {days.map(day => (
                  <div key={day} className="text-sm font-medium text-center py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="text-xs text-muted-foreground text-center py-2">
                    {String(hour).padStart(2, '0')}:00
                  </div>
                  {days.map(day => {
                    const blocks = getBlocksForDayAndHour(day, hour);
                    const block = blocks[0]; // Take first block if multiple
                    
                    if (!block) {
                      return (
                        <div key={day} className="border border-border/50 rounded min-h-[60px]" />
                      );
                    }

                    const course = getCourse(block.courseId);
                    if (!course) return null;

                    const startHour = parseInt(block.startTime.split(':')[0]);
                    const endHour = parseInt(block.endTime.split(':')[0]);
                    const duration = endHour - startHour;
                    
                    // Only render on the first hour of the block
                    if (hour !== startHour) {
                      return <div key={day} />;
                    }

                    return (
                      <div
                        key={day}
                        className="border rounded p-2 text-xs"
                        style={{
                          backgroundColor: `${course.color}20`,
                          borderColor: course.color,
                          gridRow: `span ${duration}`
                        }}
                      >
                        <p className="font-medium" style={{ color: course.color }}>
                          {course.code}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{course.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{block.room}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {getTypeLabel(block.type)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {block.startTime} - {block.endTime}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leyenda de Colores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <div key={course.id} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: course.color }}
                />
                <div>
                  <p className="text-sm font-medium">{course.code}</p>
                  <p className="text-xs text-muted-foreground">{course.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
