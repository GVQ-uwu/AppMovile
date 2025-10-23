import { Course, ScheduleBlock, Notification, ImportantDate } from "../types/schedule";

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Cálculo Diferencial",
    code: "MAT-101",
    professor: "Dr. González",
    color: "#3b82f6",
    credits: 4
  },
  {
    id: "2",
    name: "Programación I",
    code: "INF-102",
    professor: "Prof. Martínez",
    color: "#8b5cf6",
    credits: 5
  },
  {
    id: "3",
    name: "Física General",
    code: "FIS-103",
    professor: "Dr. Rodríguez",
    color: "#10b981",
    credits: 4
  },
  {
    id: "4",
    name: "Química Orgánica",
    code: "QUI-104",
    professor: "Dra. López",
    color: "#f59e0b",
    credits: 4
  },
  {
    id: "5",
    name: "Literatura Española",
    code: "LIT-105",
    professor: "Prof. Sánchez",
    color: "#ec4899",
    credits: 3
  },
  {
    id: "6",
    name: "Historia Contemporánea",
    code: "HIS-106",
    professor: "Dr. Fernández",
    color: "#06b6d4",
    credits: 3
  }
];

export const mockSchedule: ScheduleBlock[] = [
  // Lunes
  {
    id: "s1",
    courseId: "1",
    day: "Lunes",
    startTime: "08:00",
    endTime: "10:00",
    room: "Aula 301",
    type: "lecture"
  },
  {
    id: "s2",
    courseId: "2",
    day: "Lunes",
    startTime: "10:30",
    endTime: "12:30",
    room: "Lab Comp 1",
    type: "lab"
  },
  {
    id: "s3",
    courseId: "5",
    day: "Lunes",
    startTime: "14:00",
    endTime: "16:00",
    room: "Aula 205",
    type: "lecture"
  },
  // Martes
  {
    id: "s4",
    courseId: "3",
    day: "Martes",
    startTime: "08:00",
    endTime: "10:00",
    room: "Lab Física",
    type: "lab"
  },
  {
    id: "s5",
    courseId: "4",
    day: "Martes",
    startTime: "10:30",
    endTime: "12:30",
    room: "Aula 401",
    type: "lecture"
  },
  {
    id: "s6",
    courseId: "6",
    day: "Martes",
    startTime: "14:00",
    endTime: "15:30",
    room: "Aula 102",
    type: "lecture"
  },
  // Miércoles
  {
    id: "s7",
    courseId: "1",
    day: "Miércoles",
    startTime: "08:00",
    endTime: "10:00",
    room: "Aula 301",
    type: "tutorial"
  },
  {
    id: "s8",
    courseId: "2",
    day: "Miércoles",
    startTime: "10:30",
    endTime: "12:30",
    room: "Lab Comp 2",
    type: "lab"
  },
  // Jueves
  {
    id: "s9",
    courseId: "3",
    day: "Jueves",
    startTime: "08:00",
    endTime: "10:00",
    room: "Aula 305",
    type: "lecture"
  },
  {
    id: "s10",
    courseId: "4",
    day: "Jueves",
    startTime: "10:30",
    endTime: "12:30",
    room: "Lab Química",
    type: "lab"
  },
  {
    id: "s11",
    courseId: "5",
    day: "Jueves",
    startTime: "14:00",
    endTime: "16:00",
    room: "Aula 205",
    type: "lecture"
  },
  // Viernes
  {
    id: "s12",
    courseId: "1",
    day: "Viernes",
    startTime: "08:00",
    endTime: "10:00",
    room: "Aula 301",
    type: "lecture"
  },
  {
    id: "s13",
    courseId: "6",
    day: "Viernes",
    startTime: "10:30",
    endTime: "12:00",
    room: "Aula 102",
    type: "tutorial"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "cancelled",
    title: "Clase Cancelada",
    message: "La clase de Programación I del viernes ha sido cancelada",
    date: new Date(2025, 9, 17),
    courseId: "2",
    read: false
  },
  {
    id: "n2",
    type: "important",
    title: "Examen Próximo",
    message: "Examen de Cálculo Diferencial el próximo lunes",
    date: new Date(2025, 9, 20),
    courseId: "1",
    read: false
  },
  {
    id: "n3",
    type: "reminder",
    title: "Entrega de Proyecto",
    message: "Recordatorio: Proyecto de Programación I vence mañana",
    date: new Date(2025, 9, 15),
    courseId: "2",
    read: true
  },
  {
    id: "n4",
    type: "info",
    title: "Cambio de Aula",
    message: "La clase de Física se moverá al Lab 2 la próxima semana",
    date: new Date(2025, 9, 14),
    courseId: "3",
    read: true
  }
];

export const mockImportantDates: ImportantDate[] = [
  {
    id: "d1",
    title: "Examen Parcial - Cálculo",
    date: new Date(2025, 9, 20),
    type: "exam",
    courseId: "1"
  },
  {
    id: "d2",
    title: "Entrega Proyecto Final - Programación",
    date: new Date(2025, 9, 28),
    type: "assignment",
    courseId: "2"
  },
  {
    id: "d3",
    title: "Examen Final - Física",
    date: new Date(2025, 10, 5),
    type: "exam",
    courseId: "3"
  },
  {
    id: "d4",
    title: "Día Feriado - Día de la Independencia",
    date: new Date(2025, 9, 18),
    type: "holiday"
  },
  {
    id: "d5",
    title: "Feria de Ciencias",
    date: new Date(2025, 9, 25),
    type: "event"
  },
  {
    id: "d6",
    title: "Entrega Ensayo - Literatura",
    date: new Date(2025, 9, 22),
    type: "assignment",
    courseId: "5"
  }
];
