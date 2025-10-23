import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function Grades() {
  const gradesBySubject = {
    Mathematics: [
      { student: "María García", exam1: 9.5, exam2: 9.0, project: 9.2, final: 9.2, trend: "up" },
      { student: "Juan Pérez", exam1: 8.0, exam2: 8.5, project: 8.8, final: 8.4, trend: "up" },
      { student: "Ana Martínez", exam1: 8.5, exam2: 8.7, project: 9.0, final: 8.7, trend: "up" },
      { student: "Carlos López", exam1: 9.0, exam2: 8.8, project: 9.2, final: 9.0, trend: "stable" },
    ],
    Physics: [
      { student: "María García", exam1: 8.8, exam2: 9.0, project: 8.5, final: 8.8, trend: "up" },
      { student: "Juan Pérez", exam1: 8.2, exam2: 8.0, project: 8.3, final: 8.2, trend: "down" },
      { student: "Ana Martínez", exam1: 8.9, exam2: 9.1, project: 8.7, final: 8.9, trend: "up" },
      { student: "Carlos López", exam1: 9.2, exam2: 9.0, project: 9.3, final: 9.2, trend: "stable" },
    ],
    Chemistry: [
      { student: "María García", exam1: 9.0, exam2: 9.2, project: 9.5, final: 9.2, trend: "up" },
      { student: "Juan Pérez", exam1: 8.5, exam2: 8.3, project: 8.0, final: 8.3, trend: "down" },
      { student: "Ana Martínez", exam1: 8.7, exam2: 8.8, project: 8.9, final: 8.8, trend: "up" },
      { student: "Carlos López", exam1: 8.9, exam2: 9.0, project: 8.8, final: 8.9, trend: "stable" },
    ],
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 9) return <Badge className="bg-green-500">Excellent</Badge>;
    if (grade >= 8) return <Badge className="bg-blue-500">Good</Badge>;
    if (grade >= 7) return <Badge className="bg-yellow-500">Average</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Grades & Assessments</h1>
        <p className="text-muted-foreground">Track student performance across all subjects</p>
      </div>

      <Tabs defaultValue="Mathematics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="Mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="Physics">Physics</TabsTrigger>
          <TabsTrigger value="Chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="Literature">Literature</TabsTrigger>
        </TabsList>

        {Object.entries(gradesBySubject).map(([subject, grades]) => (
          <TabsContent key={subject} value={subject}>
            <Card>
              <CardHeader>
                <CardTitle>{subject} Grades</CardTitle>
                <CardDescription>Detailed breakdown of student assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="text-center">Exam 1</TableHead>
                      <TableHead className="text-center">Exam 2</TableHead>
                      <TableHead className="text-center">Project</TableHead>
                      <TableHead className="text-center">Final Grade</TableHead>
                      <TableHead className="text-center">Performance</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((record) => (
                      <TableRow key={record.student}>
                        <TableCell className="font-medium">{record.student}</TableCell>
                        <TableCell className="text-center">{record.exam1.toFixed(1)}</TableCell>
                        <TableCell className="text-center">{record.exam2.toFixed(1)}</TableCell>
                        <TableCell className="text-center">{record.project.toFixed(1)}</TableCell>
                        <TableCell className="text-center font-medium">{record.final.toFixed(1)}</TableCell>
                        <TableCell className="text-center">{getGradeBadge(record.final)}</TableCell>
                        <TableCell className="text-center flex justify-center">
                          {getTrendIcon(record.trend)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Students with highest average grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "María García", average: 9.2, subjects: 5 },
                { name: "Carlos López", average: 9.0, subjects: 5 },
                { name: "Ana Martínez", average: 8.8, subjects: 5 },
                { name: "Juan Pérez", average: 8.5, subjects: 5 },
              ].map((student, index) => (
                <div key={student.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.subjects} subjects</p>
                    </div>
                  </div>
                  <div className="text-lg font-medium">{student.average.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Average grades by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Literature", average: 9.1, students: 267 },
                { subject: "Mathematics", average: 8.7, students: 245 },
                { subject: "Chemistry", average: 8.5, students: 210 },
                { subject: "Physics", average: 8.2, students: 198 },
              ].map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{subject.subject}</p>
                    <p className="text-sm text-muted-foreground">{subject.students} students</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium">{subject.average.toFixed(1)}</div>
                    {getGradeBadge(subject.average)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
