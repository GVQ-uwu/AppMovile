import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const attendanceData = [
    { student: "María García", status: "present", time: "08:05", total: 95 },
    { student: "Juan Pérez", status: "present", time: "08:10", total: 92 },
    { student: "Ana Martínez", status: "late", time: "08:35", total: 88 },
    { student: "Carlos López", status: "present", time: "08:02", total: 98 },
    { student: "Laura Sánchez", status: "absent", time: "-", total: 85 },
    { student: "Diego Rodríguez", status: "present", time: "08:15", total: 90 },
  ];

  const weeklyStats = {
    present: 142,
    absent: 8,
    late: 12,
    total: 162
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Late
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Attendance Tracking</h1>
        <p className="text-muted-foreground">Monitor student attendance and punctuality</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{weeklyStats.present}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((weeklyStats.present / weeklyStats.total) * 100).toFixed(1)}% attendance rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{weeklyStats.late}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((weeklyStats.late / weeklyStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{weeklyStats.absent}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((weeklyStats.absent / weeklyStats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
              {date?.toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((record) => (
                <div
                  key={record.student}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{record.student}</p>
                    <p className="text-sm text-muted-foreground">
                      Check-in: {record.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{record.total}%</p>
                      <p className="text-xs text-muted-foreground">Overall rate</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
          <CardDescription>Student attendance percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Carlos López", rate: 98, trend: "up" },
              { name: "María García", rate: 95, trend: "stable" },
              { name: "Juan Pérez", rate: 92, trend: "up" },
              { name: "Diego Rodríguez", rate: 90, trend: "down" },
              { name: "Ana Martínez", rate: 88, trend: "down" },
              { name: "Laura Sánchez", rate: 85, trend: "down" },
            ].map((student) => (
              <div key={student.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{student.name}</span>
                    <span className="text-sm font-medium">{student.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        student.rate >= 95 ? 'bg-green-500' : 
                        student.rate >= 90 ? 'bg-blue-500' : 
                        student.rate >= 85 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${student.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
