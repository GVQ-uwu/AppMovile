import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, UserPlus, Mail, Phone, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Students() {
  const students = [
    {
      id: 1,
      name: "María García",
      email: "maria.garcia@school.edu",
      phone: "+34 612 345 678",
      grade: "10th Grade",
      status: "Active",
      average: 9.2,
      avatar: null
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan.perez@school.edu",
      phone: "+34 623 456 789",
      grade: "11th Grade",
      status: "Active",
      average: 8.5,
      avatar: null
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana.martinez@school.edu",
      phone: "+34 634 567 890",
      grade: "10th Grade",
      status: "Active",
      average: 8.8,
      avatar: null
    },
    {
      id: 4,
      name: "Carlos López",
      email: "carlos.lopez@school.edu",
      phone: "+34 645 678 901",
      grade: "12th Grade",
      status: "Active",
      average: 9.0,
      avatar: null
    },
    {
      id: 5,
      name: "Laura Sánchez",
      email: "laura.sanchez@school.edu",
      phone: "+34 656 789 012",
      grade: "11th Grade",
      status: "Active",
      average: 8.3,
      avatar: null
    },
    {
      id: 6,
      name: "Diego Rodríguez",
      email: "diego.rodriguez@school.edu",
      phone: "+34 667 890 123",
      grade: "10th Grade",
      status: "Inactive",
      average: 7.8,
      avatar: null
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Students</h1>
          <p className="text-muted-foreground">Manage and view all student information</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={student.avatar || undefined} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.grade}</p>
                    <p className="text-sm text-muted-foreground">Average: {student.average}</p>
                  </div>
                  <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Student</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
