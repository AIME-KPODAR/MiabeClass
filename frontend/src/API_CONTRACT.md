# Contrat API — MiabeClass

Base : `VITE_API_URL` (défaut `http://localhost:3000/api`).
Chaque réponse peut être `{ success: true, data: ... }` ou directement l'objet/tableau.
Si un endpoint échoue, la page affiche des données de démonstration + un bandeau « API injoignable ».
Les types exacts sont dans `src/lib/demo-data.ts`.

Les textes peuvent être une chaîne simple ou `{ "en": "...", "fr": "..." }`.

| Page | GET | Écritures |
|---|---|---|
| Tableau de bord (`/`) | `/dashboard` (rafraîchi toutes les 60 s) | — |
| Cours | `/courses` | — |
| Enseignants | `/teachers` | — |
| Frais | `/fees/payments` | `POST /fees/payments` |
| Emploi du temps | `/timetable` | — |
| Bibliothèque | `/library/books` | `POST /library/books/:id/borrow`, `POST /library/books/:id/return` |
| Messagerie | `/messages` (toutes les 20 s) | `POST /messages/:conversationId` `{text}`, `PATCH /messages/:conversationId/read` |
| Examens | `/exams`, `/exams/results` | — |
| Cloche de notifications | `/notifications`, `/notifications/count` (toutes les 30 s) | `PATCH /notifications/:id/read`, `PATCH /notifications/read-all` |

## `GET /dashboard`

```json
{
  "term": "Année scolaire 2025/2026 • Trimestre 2",
  "stats": {
    "students": 1284, "studentsPrev": 1232,
    "teacherAttendance": 98.2, "teacherAttendancePrev": 98.1,
    "testimonies": 42000, "testimoniesTarget": 58000,
    "openRequests": 12, "parentTickets": 12
  },
  "analytics": [{ "label": "Sep", "performance": 62, "attendance": 88 }],
  "notices": [{ "id": 1, "type": "urgent|event|holiday", "message": "..." }],
  "fees": { "collected": 31700000, "expected": 44100000 },
  "recentPayments": [{ "id": 1, "student": "...", "label": "...", "receipt": "8829", "amount": 1200000, "status": "paid", "date": "ISO" }],
  "courses": [{ "id": 1, "title": "...", "grade": "Terminale", "teacher": "...", "resources": 3, "live": true }]
}
```

Calculé côté interface : variation des élèves (%), tendance de présence, % de l'objectif,
% et montant en attente des frais, échelle du graphique.

## Autres formats

- `/teachers` : `[{ id, name, subject, email, phone, classes: [], attendance, status: "active|leave" }]`
- `/timetable` : `[{ id, day: 1-5, start: "08:00", end: "09:50", subject, teacher, room, classe }]`
- `/library/books` : `[{ id, title, author, category, copies, available, borrowed, dueDate? }]`
- `/messages` : `[{ id, with, role, unread, messages: [{ id, mine, text, at }] }]`
- `/exams` : `[{ id, subject, classe, date, room, durationMin }]`
- `/exams/results` : `[{ id, subject, classe, average, best, lowest, students, date }]`

Montants en francs CFA (XOF), formatés avec `Intl.NumberFormat`.
