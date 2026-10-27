import { daysFromNow, type Loc } from "./format";

/* =====================================================================
   Types = contrat attendu de l'API (voir API_CONTRACT.md)
   Les jeux de données ci-dessous ne servent que de SECOURS quand l'API
   est injoignable : l'interface reste utilisable en mode démo.
===================================================================== */

export type Course = {
  id: number;
  title: Loc;
  grade: string;
  teacher: string;
  resources: number;
  live: boolean;
};

export type Notice = {
  id: number;
  type: "urgent" | "event" | "holiday";
  message: Loc;
};

export type Payment = {
  id: number;
  student: string;
  label: Loc;
  receipt: string;
  amount: number;
  status: "paid" | "pending" | "late";
  date: string; // ISO
};

export type Dashboard = {
  term: Loc;
  stats: {
    students: number;
    studentsPrev: number;
    teacherAttendance: number; // %
    teacherAttendancePrev: number; // %
    testimonies: number;
    testimoniesTarget: number;
    openRequests: number;
    parentTickets: number;
  };
  analytics: { label: Loc; performance: number; attendance: number }[];
  notices: Notice[];
  fees: { collected: number; expected: number };
  recentPayments: Payment[];
  courses: Course[];
};

export type Teacher = {
  id: number;
  name: string;
  subject: Loc;
  email: string;
  phone: string;
  classes: string[];
  attendance: number; // %
  status: "active" | "leave";
};

export type Slot = {
  id: number;
  day: 1 | 2 | 3 | 4 | 5; // 1 = lundi
  start: string; // "08:00"
  end: string;
  subject: Loc;
  teacher: string;
  room: string;
  classe: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  category: Loc;
  copies: number;
  available: number;
  borrowed: boolean; // emprunté par l'utilisateur courant
  dueDate?: string;
};

export type Conversation = {
  id: number;
  with: string;
  role: Loc;
  unread: number;
  messages: { id: number; mine: boolean; text: string; at: string }[];
};

export type Exam = {
  id: number;
  subject: Loc;
  classe: string;
  date: string; // ISO
  room: string;
  durationMin: number;
};

export type ExamResult = {
  id: number;
  subject: Loc;
  classe: string;
  average: number; // /20
  best: number;
  lowest: number;
  students: number;
  date: string;
};

/* ------------------------------ Tableau de bord ------------------------------ */

const y = new Date().getFullYear();
const academic = `${y - 1}/${y}`;

export const demoCourses: Course[] = [
  {
    id: 1,
    title: {
      en: "Advanced Mathematics: Calculus III",
      fr: "Mathématiques avancées : Calcul III",
    },
    grade: "Terminale",
    teacher: "Dr Sarah Jenkins",
    resources: 3,
    live: true,
  },
  {
    id: 2,
    title: {
      en: "Quantum Physics Principles",
      fr: "Principes de physique quantique",
    },
    grade: "Première",
    teacher: "Pr Marcus Aurel",
    resources: 12,
    live: false,
  },
  {
    id: 3,
    title: {
      en: "World Literature: 19th Century",
      fr: "Littérature mondiale : XIXᵉ siècle",
    },
    grade: "Seconde",
    teacher: "Elena Rodriguez",
    resources: 8,
    live: false,
  },
  {
    id: 4,
    title: { en: "Advanced Chemistry", fr: "Chimie avancée" },
    grade: "Terminale",
    teacher: "Dr TONE Jonas",
    resources: 10,
    live: true,
  },
  {
    id: 5,
    title: { en: "Geometry Principles", fr: "Principes géométriques" },
    grade: "Troisième",
    teacher: "Prof. KPODAR Aimé",
    resources: 6,
    live: false,
  },
];

export const demoPayments: Payment[] = [
  {
    id: 8829,
    student: "Leo Vance",
    label: { en: "Course fees", fr: "Frais de cours" },
    receipt: "8829",
    amount: 1_200_000,
    status: "paid",
    date: daysFromNow(-1),
  },
  {
    id: 8830,
    student: "Maya Ito",
    label: { en: "Library fees", fr: "Frais de bibliothèque" },
    receipt: "8830",
    amount: 1_500_000,
    status: "paid",
    date: daysFromNow(-2),
  },
  {
    id: 8831,
    student: "Kofi Mensah",
    label: { en: "Tuition – Term 2", fr: "Scolarité – Trimestre 2" },
    receipt: "8831",
    amount: 350_000,
    status: "pending",
    date: daysFromNow(-4),
  },
  {
    id: 8832,
    student: "Ama Dzidzienyo",
    label: { en: "Tuition – Term 2", fr: "Scolarité – Trimestre 2" },
    receipt: "8832",
    amount: 350_000,
    status: "late",
    date: daysFromNow(-20),
  },
  {
    id: 8833,
    student: "Yao Agbeko",
    label: { en: "Exam fees", fr: "Frais d'examen" },
    receipt: "8833",
    amount: 45_000,
    status: "paid",
    date: daysFromNow(-6),
  },
  {
    id: 8834,
    student: "Afi Lawson",
    label: { en: "Canteen", fr: "Cantine" },
    receipt: "8834",
    amount: 60_000,
    status: "pending",
    date: daysFromNow(-3),
  },
];

const months: [string, string][] = [
  ["Sep", "Sep"],
  ["Oct", "Oct"],
  ["Nov", "Nov"],
  ["Dec", "Déc"],
  ["Jan", "Jan"],
  ["Feb", "Fév"],
  ["Mar", "Mar"],
  ["Apr", "Avr"],
  ["May", "Mai"],
  ["Jun", "Juin"],
];
const perf = [62, 66, 64, 70, 69, 73, 75, 74, 78, 81];
const att = [88, 90, 87, 91, 89, 92, 93, 92, 94, 95];

export const demoDashboard: Dashboard = {
  term: {
    en: `Academic Year ${academic} • Term 2`,
    fr: `Année scolaire ${academic} • Trimestre 2`,
  },
  stats: {
    students: 1284,
    studentsPrev: 1232,
    teacherAttendance: 98.2,
    teacherAttendancePrev: 98.1,
    testimonies: 42_000,
    testimoniesTarget: 58_000,
    openRequests: 12,
    parentTickets: 12,
  },
  analytics: months.map(([en, fr], i) => ({
    label: { en, fr },
    performance: perf[i],
    attendance: att[i],
  })),
  notices: [
    {
      id: 1,
      type: "urgent",
      message: {
        en: "Parent-Teacher Conference rescheduled for Friday.",
        fr: "Réunion parents-enseignants reportée au vendredi.",
      },
    },
    {
      id: 2,
      type: "event",
      message: {
        en: "Annual Science Fair registration now open for Grades 6-12.",
        fr: "Inscriptions à la Foire annuelle des sciences ouvertes de la 6ᵉ à la Terminale.",
      },
    },
    {
      id: 3,
      type: "holiday",
      message: {
        en: "School will be closed for National Heritage Day.",
        fr: "L'école sera fermée pour la Journée du patrimoine national.",
      },
    },
  ],
  fees: { collected: 31_700_000, expected: 44_100_000 },
  recentPayments: demoPayments.slice(0, 2),
  courses: demoCourses,
};

/* ------------------------------ Enseignants ------------------------------ */

export const demoTeachers: Teacher[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    subject: { en: "Mathematics", fr: "Mathématiques" },
    email: "s.jenkins@miabeclass.com",
    phone: "+228 90 00 00 01",
    classes: ["Terminale", "Première"],
    attendance: 99,
    status: "active",
  },
  {
    id: 2,
    name: "Marcus Aurel",
    subject: { en: "Physics", fr: "Physique" },
    email: "m.aurel@miabeclass.com",
    phone: "+228 90 00 00 02",
    classes: ["Première"],
    attendance: 97,
    status: "active",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    subject: { en: "Literature", fr: "Littérature" },
    email: "e.rodriguez@miabeclass.com",
    phone: "+228 90 00 00 03",
    classes: ["Seconde", "Troisième"],
    attendance: 98,
    status: "active",
  },
  {
    id: 4,
    name: "Jonas TONE",
    subject: { en: "Chemistry", fr: "Chimie" },
    email: "j.tone@miabeclass.com",
    phone: "+228 90 00 00 04",
    classes: ["Terminale"],
    attendance: 100,
    status: "active",
  },
  {
    id: 5,
    name: "Aimé KPODAR",
    subject: { en: "Geometry", fr: "Géométrie" },
    email: "a.kpodar@miabeclass.com",
    phone: "+228 90 00 00 05",
    classes: ["Troisième"],
    attendance: 96,
    status: "active",
  },
  {
    id: 6,
    name: "Akosua Mensah",
    subject: { en: "History & Geography", fr: "Histoire-Géographie" },
    email: "a.mensah@miabeclass.com",
    phone: "+228 90 00 00 06",
    classes: ["Seconde"],
    attendance: 88,
    status: "leave",
  },
];

/* ------------------------------ Emploi du temps ------------------------------ */

const S = (en: string, fr: string): Loc => ({ en, fr });
const grid: Array<[Slot["day"], string, string, Loc, string, string, string]> =
  [
    [1, "08:00", "09:50", S("Mathematics", "Mathématiques"), "Sarah Jenkins", "A101", "Terminale"],
    [1, "10:10", "12:00", S("Chemistry", "Chimie"), "Jonas TONE", "Lab 2", "Terminale"],
    [1, "14:00", "15:50", S("Literature", "Littérature"), "Elena Rodriguez", "B204", "Seconde"],
    [2, "08:00", "09:50", S("Physics", "Physique"), "Marcus Aurel", "Lab 1", "Première"],
    [2, "10:10", "12:00", S("Mathematics", "Mathématiques"), "Sarah Jenkins", "A101", "Première"],
    [2, "14:00", "15:50", S("Geometry", "Géométrie"), "Aimé KPODAR", "A103", "Troisième"],
    [3, "08:00", "09:50", S("Literature", "Littérature"), "Elena Rodriguez", "B204", "Troisième"],
    [3, "10:10", "12:00", S("Mathematics", "Mathématiques"), "Sarah Jenkins", "A101", "Terminale"],
    [4, "08:00", "09:50", S("Chemistry", "Chimie"), "Jonas TONE", "Lab 2", "Terminale"],
    [4, "10:10", "12:00", S("Physics", "Physique"), "Marcus Aurel", "Lab 1", "Première"],
    [4, "14:00", "15:50", S("History & Geography", "Histoire-Géographie"), "Akosua Mensah", "B101", "Seconde"],
    [5, "08:00", "09:50", S("Geometry", "Géométrie"), "Aimé KPODAR", "A103", "Troisième"],
    [5, "10:10", "12:00", S("Literature", "Littérature"), "Elena Rodriguez", "B204", "Seconde"],
    [5, "14:00", "15:50", S("Mathematics", "Mathématiques"), "Sarah Jenkins", "A101", "Première"],
  ];

export const demoSlots: Slot[] = grid.map(
  ([day, start, end, subject, teacher, room, classe], i) => ({
    id: i + 1,
    day,
    start,
    end,
    subject,
    teacher,
    room,
    classe,
  }),
);

/* ------------------------------ Bibliothèque ------------------------------ */

export const demoBooks: Book[] = [
  { id: 1, title: "Calculus: Early Transcendentals", author: "James Stewart", category: S("Mathematics", "Mathématiques"), copies: 6, available: 4, borrowed: false },
  { id: 2, title: "Physics for Scientists and Engineers", author: "Raymond Serway", category: S("Science", "Sciences"), copies: 4, available: 0, borrowed: false },
  { id: 3, title: "Les Misérables", author: "Victor Hugo", category: S("Literature", "Littérature"), copies: 5, available: 2, borrowed: true, dueDate: daysFromNow(6) },
  { id: 4, title: "Une si longue lettre", author: "Mariama Bâ", category: S("Literature", "Littérature"), copies: 8, available: 5, borrowed: false },
  { id: 5, title: "Organic Chemistry", author: "Paula Bruice", category: S("Science", "Sciences"), copies: 3, available: 1, borrowed: false },
  { id: 6, title: "Histoire de l'Afrique", author: "Joseph Ki-Zerbo", category: S("History", "Histoire"), copies: 4, available: 3, borrowed: false },
  { id: 7, title: "Géométrie plane et dans l'espace", author: "Collectif", category: S("Mathematics", "Mathématiques"), copies: 10, available: 7, borrowed: false },
  { id: 8, title: "Things Fall Apart", author: "Chinua Achebe", category: S("Literature", "Littérature"), copies: 6, available: 6, borrowed: false },
];

/* ------------------------------ Messagerie ------------------------------ */

export const demoConversations: Conversation[] = [
  {
    id: 1,
    with: "Sarah Jenkins",
    role: S("Teacher", "Enseignante"),
    unread: 2,
    messages: [
      { id: 1, mine: false, text: "Bonjour, les copies de Calcul III sont corrigées.", at: daysFromNow(-1, 16, 10) },
      { id: 2, mine: true, text: "Merci ! Pouvez-vous publier les notes avant vendredi ?", at: daysFromNow(-1, 16, 25) },
      { id: 3, mine: false, text: "Oui, c'est prévu pour jeudi.", at: daysFromNow(0, 8, 5) },
      { id: 4, mine: false, text: "Je joins aussi le corrigé type dans la bibliothèque.", at: daysFromNow(0, 8, 6) },
    ],
  },
  {
    id: 2,
    with: "Parent – M. Vance",
    role: S("Parent", "Parent"),
    unread: 1,
    messages: [
      { id: 1, mine: false, text: "Bonjour, quand aura lieu la réunion parents-enseignants ?", at: daysFromNow(0, 7, 40) },
    ],
  },
  {
    id: 3,
    with: "Administration",
    role: S("Staff", "Personnel"),
    unread: 0,
    messages: [
      { id: 1, mine: false, text: "Le planning des examens a été mis à jour.", at: daysFromNow(-3, 11, 0) },
      { id: 2, mine: true, text: "Bien reçu, merci.", at: daysFromNow(-3, 11, 12) },
    ],
  },
];

/* ------------------------------ Examens ------------------------------ */

export const demoExams: Exam[] = [
  { id: 1, subject: S("Mathematics", "Mathématiques"), classe: "Terminale", date: daysFromNow(3, 8), room: "A101", durationMin: 180 },
  { id: 2, subject: S("Physics", "Physique"), classe: "Première", date: daysFromNow(5, 10), room: "Lab 1", durationMin: 120 },
  { id: 3, subject: S("Literature", "Littérature"), classe: "Seconde", date: daysFromNow(9, 8), room: "B204", durationMin: 120 },
  { id: 4, subject: S("Chemistry", "Chimie"), classe: "Terminale", date: daysFromNow(12, 14), room: "Lab 2", durationMin: 150 },
  { id: 5, subject: S("Geometry", "Géométrie"), classe: "Troisième", date: daysFromNow(16, 8), room: "A103", durationMin: 90 },
];

export const demoResults: ExamResult[] = [
  { id: 1, subject: S("Mathematics", "Mathématiques"), classe: "Terminale", average: 13.4, best: 19, lowest: 6, students: 42, date: daysFromNow(-14) },
  { id: 2, subject: S("Chemistry", "Chimie"), classe: "Terminale", average: 12.1, best: 18, lowest: 5, students: 42, date: daysFromNow(-21) },
  { id: 3, subject: S("Literature", "Littérature"), classe: "Seconde", average: 14.8, best: 19.5, lowest: 8, students: 38, date: daysFromNow(-28) },
  { id: 4, subject: S("Physics", "Physique"), classe: "Première", average: 11.2, best: 17, lowest: 4, students: 40, date: daysFromNow(-35) },
];
