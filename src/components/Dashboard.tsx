import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Users, BookOpen, Calendar, TrendingUp, Award } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Courses",
      value: "48",
      change: "+3",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Average Grade",
      value: "8.5",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Attendance Rate",
      value: "94%",
      change: "+2%",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    { student: "María García", activity: "Submitted Math Assignment", time: "10 min ago", grade: "A" },
    { student: "Juan Pérez", activity: "Attended Biology Class", time: "1 hour ago", grade: null },
    { student: "Ana Martínez", activity: "Quiz Completed - History", time: "2 hours ago", grade: "B+" },
    { student: "Carlos López", activity: "Project Submission - Physics", time: "3 hours ago", grade: "A-" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1>School Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest student activities and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{activity.student}</p>
                    <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.grade && (
                    <div className="flex items-center gap-1 text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                      <Award className="h-3 w-3" />
                      {activity.grade}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", time: "09:00 - 10:30", room: "Room 101", teacher: "Dr. Smith" },
                { subject: "Physics", time: "11:00 - 12:30", room: "Lab 2", teacher: "Prof. Johnson" },
                { subject: "Literature", time: "14:00 - 15:30", room: "Room 205", teacher: "Ms. Davis" },
                { subject: "Chemistry", time: "16:00 - 17:30", room: "Lab 1", teacher: "Dr. Wilson" },
              ].map((class_, index) => (
                <div key={index} className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{class_.subject}</p>
                    <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                    <p className="text-xs text-muted-foreground">{class_.room}</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {class_.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Performance overview by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", average: 8.7, students: 245, color: "bg-blue-500" },
              { subject: "Physics", average: 8.2, students: 198, color: "bg-green-500" },
              { subject: "Chemistry", average: 8.5, students: 210, color: "bg-purple-500" },
              { subject: "Literature", average: 9.1, students: 267, color: "bg-orange-500" },
              { subject: "History", average: 8.0, students: 234, color: "bg-pink-500" },
            ].map((subject) => (
              <div key={subject.subject} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm text-muted-foreground">{subject.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${subject.color} h-2 rounded-full`}
                      style={{ width: `${(subject.average / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="font-medium text-lg">{subject.average}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
