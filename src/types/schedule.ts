export interface Course {
  id: string;
  name: string;
  code: string;
  professor: string;
  color: string;
  credits: number;
}

export interface ScheduleBlock {
  id: string;
  courseId: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  type: "lecture" | "lab" | "tutorial" | "online";
}

export interface Notification {
  id: string;
  type: "cancelled" | "important" | "reminder" | "info";
  title: string;
  message: string;
  date: Date;
  courseId?: string;
  read: boolean;
}

export interface ImportantDate {
  id: string;
  title: string;
  date: Date;
  type: "exam" | "assignment" | "holiday" | "event";
  courseId?: string;
}
