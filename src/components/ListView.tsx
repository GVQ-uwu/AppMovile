import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Course, ScheduleBlock } from "../types/schedule";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Clock, MapPin, User } from "lucide-react";

interface ListViewProps {
  courses: Course[];
  schedule: ScheduleBlock[];
}

export function ListView({ courses, schedule }: ListViewProps) {
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
  ];

  const getCourse = (courseId: string) =>
    courses.find((c) => c.id === courseId);

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      lecture: "Cátedra",
      lab: "Laboratorio",
      tutorial: "Ayudantía",
      online: "Online",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      lecture: "bg-blue-500",
      lab: "bg-green-500",
      tutorial: "bg-purple-500",
      online: "bg-orange-500",
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Vista Lista</h1>
        <p className="text-muted-foreground">
          Todas tus clases organizadas por día
        </p>
      </div>

      <Tabs defaultValue="Lunes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          {days.map((day) => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => {
          const daySchedule = schedule
            .filter((block) => block.day === day)
            .sort((a, b) =>
              a.startTime.localeCompare(b.startTime),
            );

          return (
            <TabsContent key={day} value={day}>
              <div className="space-y-4">
                {daySchedule.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No hay clases programadas para este día
                    </CardContent>
                  </Card>
                ) : (
                  daySchedule.map((block) => {
                    const course = getCourse(block.courseId);
                    if (!course) return null;

                    return (
                      <Card
                        key={block.id}
                        className="border-l-4"
                        style={{
                          borderLeftColor: course.color,
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {course.name}
                                <Badge
                                  className={getTypeColor(
                                    block.type,
                                  )}
                                >
                                  {getTypeLabel(block.type)}
                                </Badge>
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {course.code} • {course.credits}{" "}
                                créditos
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Clock className="h-3 w-3" />
                              {block.startTime} -{" "}
                              {block.endTime}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{block.room}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>{course.professor}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => {
              const courseBlocks = schedule.filter(
                (b) => b.courseId === course.id,
              );
              const totalHours = courseBlocks.reduce(
                (sum, block) => {
                  const start = parseInt(
                    block.startTime.split(":")[0],
                  );
                  const end = parseInt(
                    block.endTime.split(":")[0],
                  );
                  return sum + (end - start);
                },
                0,
              );

              return (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <div>
                      <p className="font-medium">
                        {course.code}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {courseBlocks.length} clases
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {totalHours} horas/semana
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}