import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { NextClassWidget } from "./widgets/NextClassWidget";
import { TodayScheduleWidget } from "./widgets/TodayScheduleWidget";
import { UpcomingDatesWidget } from "./widgets/UpcomingDatesWidget";
import { Course, ScheduleBlock, ImportantDate } from "../types/schedule";
import { BookOpen, GraduationCap } from "lucide-react";

interface HomePageProps {
  courses: Course[];
  schedule: ScheduleBlock[];
  importantDates: ImportantDate[];
}

export function HomePage({ courses, schedule, importantDates }: HomePageProps) {
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  
  const todayClasses = schedule
    .filter(block => block.day === todayCapitalized)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const nextClass = todayClasses.find(block => block.startTime > currentTime);
  const nextCourse = nextClass ? courses.find(c => c.id === nextClass.courseId) : undefined;

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalClasses = schedule.length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Bienvenido de vuelta</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Ramos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">{totalCredits} créditos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Clases esta Semana</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
            <p className="text-xs text-muted-foreground">Total de bloques</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Clases Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayClasses.length}</div>
            <p className="text-xs text-muted-foreground">{todayCapitalized}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {importantDates.filter(d => d.date >= new Date()).length}
            </div>
            <p className="text-xs text-muted-foreground">Fechas importantes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <NextClassWidget nextClass={nextClass} course={nextCourse} />
          <TodayScheduleWidget todayClasses={todayClasses} courses={courses} />
        </div>

        <div className="space-y-6">
          <UpcomingDatesWidget dates={importantDates} />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Mis Ramos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    style={{ borderLeft: `4px solid ${course.color}` }}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{course.code}</p>
                      <p className="text-sm text-muted-foreground">{course.name}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{course.credits} cr</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
