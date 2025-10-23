import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Clock, MapPin, User } from "lucide-react";

export function Schedule() {
  const schedule = {
    Monday: [
      { subject: "Mathematics", time: "08:00 - 09:30", room: "Room 101", teacher: "Dr. Smith", grade: "10th Grade" },
      { subject: "Physics", time: "10:00 - 11:30", room: "Lab 2", teacher: "Prof. Johnson", grade: "11th Grade" },
      { subject: "Chemistry", time: "12:00 - 13:30", room: "Lab 1", teacher: "Dr. Wilson", grade: "10th Grade" },
      { subject: "Literature", time: "14:00 - 15:30", room: "Room 205", teacher: "Ms. Davis", grade: "12th Grade" },
    ],
    Tuesday: [
      { subject: "History", time: "08:00 - 09:30", room: "Room 103", teacher: "Mr. Brown", grade: "10th Grade" },
      { subject: "Mathematics", time: "10:00 - 11:30", room: "Room 101", teacher: "Dr. Smith", grade: "11th Grade" },
      { subject: "Physical Education", time: "12:00 - 13:30", room: "Gym", teacher: "Coach Martinez", grade: "All Grades" },
      { subject: "Biology", time: "14:00 - 15:30", room: "Lab 3", teacher: "Dr. Lee", grade: "11th Grade" },
    ],
    Wednesday: [
      { subject: "English", time: "08:00 - 09:30", room: "Room 202", teacher: "Ms. Taylor", grade: "10th Grade" },
      { subject: "Chemistry", time: "10:00 - 11:30", room: "Lab 1", teacher: "Dr. Wilson", grade: "11th Grade" },
      { subject: "Art", time: "12:00 - 13:30", room: "Art Studio", teacher: "Ms. Garcia", grade: "All Grades" },
      { subject: "Physics", time: "14:00 - 15:30", room: "Lab 2", teacher: "Prof. Johnson", grade: "12th Grade" },
    ],
    Thursday: [
      { subject: "Mathematics", time: "08:00 - 09:30", room: "Room 101", teacher: "Dr. Smith", grade: "10th Grade" },
      { subject: "Literature", time: "10:00 - 11:30", room: "Room 205", teacher: "Ms. Davis", grade: "11th Grade" },
      { subject: "Computer Science", time: "12:00 - 13:30", room: "Computer Lab", teacher: "Mr. Anderson", grade: "All Grades" },
      { subject: "History", time: "14:00 - 15:30", room: "Room 103", teacher: "Mr. Brown", grade: "12th Grade" },
    ],
    Friday: [
      { subject: "Biology", time: "08:00 - 09:30", room: "Lab 3", teacher: "Dr. Lee", grade: "10th Grade" },
      { subject: "English", time: "10:00 - 11:30", room: "Room 202", teacher: "Ms. Taylor", grade: "11th Grade" },
      { subject: "Music", time: "12:00 - 13:30", room: "Music Room", teacher: "Mr. Rodriguez", grade: "All Grades" },
      { subject: "Review Session", time: "14:00 - 15:30", room: "Various", teacher: "Various", grade: "All Grades" },
    ],
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      Mathematics: "bg-blue-100 text-blue-700 border-blue-200",
      Physics: "bg-purple-100 text-purple-700 border-purple-200",
      Chemistry: "bg-green-100 text-green-700 border-green-200",
      Literature: "bg-pink-100 text-pink-700 border-pink-200",
      History: "bg-amber-100 text-amber-700 border-amber-200",
      Biology: "bg-emerald-100 text-emerald-700 border-emerald-200",
      English: "bg-indigo-100 text-indigo-700 border-indigo-200",
      Art: "bg-rose-100 text-rose-700 border-rose-200",
      Music: "bg-violet-100 text-violet-700 border-violet-200",
    };
    return colors[subject] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Class Schedule</h1>
        <p className="text-muted-foreground">View weekly class schedule and room assignments</p>
      </div>

      <Tabs defaultValue="Monday" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="Monday">Monday</TabsTrigger>
          <TabsTrigger value="Tuesday">Tuesday</TabsTrigger>
          <TabsTrigger value="Wednesday">Wednesday</TabsTrigger>
          <TabsTrigger value="Thursday">Thursday</TabsTrigger>
          <TabsTrigger value="Friday">Friday</TabsTrigger>
        </TabsList>

        {Object.entries(schedule).map(([day, classes]) => (
          <TabsContent key={day} value={day}>
            <div className="grid gap-4">
              {classes.map((class_, index) => (
                <Card key={index} className={`border-l-4 ${getSubjectColor(class_.subject)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{class_.subject}</CardTitle>
                        <CardDescription>{class_.grade}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {class_.time}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{class_.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{class_.teacher}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
          <CardDescription>Classes per day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {Object.entries(schedule).map(([day, classes]) => (
              <div key={day} className="text-center p-4 border rounded-lg">
                <p className="font-medium mb-2">{day}</p>
                <p className="text-2xl font-bold text-primary">{classes.length}</p>
                <p className="text-xs text-muted-foreground mt-1">classes</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
