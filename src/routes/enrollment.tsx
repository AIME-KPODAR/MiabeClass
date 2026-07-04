import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/enrollment")({
  component: EnrollmentPage,
  head: () => ({
    meta: [
      { title: "New Enrollment — MiabeClass" },
      {
        name: "description",
        content:
          "Enroll a new student in MiabeClass. Capture student, guardian, and academic information in one secure form.",
      },
      { property: "og:title", content: "New Enrollment — MiabeClass" },
      {
        property: "og:description",
        content:
          "Enroll a new student in MiabeClass. Capture student, guardian, and academic information in one secure form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Lang = "en" | "fr";

const T = {
  en: {
    nav: {
      back: "Back to Dashboard",
      dashboard: "Dashboard",
    },
    title: "New Student Enrollment",
    subtitle: "Complete the form below to register a new student.",
    sections: {
      student: "Student Information",
      parent: "Parent / Guardian",
      academic: "Academic Information",
      additional: "Additional Information",
    },
    fields: {
      firstName: "First name",
      lastName: "Last name",
      dateOfBirth: "Date of birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      nationality: "Nationality",
      email: "Student email",
      phone: "Student phone",
      parentName: "Parent / guardian full name",
      relationship: "Relationship",
      parentEmail: "Parent email",
      parentPhone: "Parent phone",
      address: "Home address",
      grade: "Grade level",
      program: "Academic program",
      previousSchool: "Previous school",
      enrollmentDate: "Enrollment date",
      medicalNotes: "Medical / allergy notes",
      hasConsent:
        "I confirm that the information provided is accurate and consent to the school's data policy.",
    },
    validation: {
      required: "This field is required",
      email: "Please enter a valid email",
      phone: "Please enter a valid phone number",
      minLength: (n: number) => `Must be at least ${n} characters`,
      maxLength: (n: number) => `Must be at most ${n} characters`,
      consent: "You must consent to proceed",
    },
    submit: "Submit Enrollment",
    submitting: "Submitting...",
    success: {
      title: "Enrollment Submitted",
      message:
        "The student enrollment has been received. A confirmation will be sent shortly.",
      new: "Submit Another",
    },
  },
  fr: {
    nav: {
      back: "Retour au tableau de bord",
      dashboard: "Tableau de bord",
    },
    title: "Nouvelle inscription d'élève",
    subtitle: "Remplissez le formulaire ci-dessous pour inscrire un nouvel élève.",
    sections: {
      student: "Informations sur l'élève",
      parent: "Parent / Tuteur",
      academic: "Informations académiques",
      additional: "Informations complémentaires",
    },
    fields: {
      firstName: "Prénom",
      lastName: "Nom de famille",
      dateOfBirth: "Date de naissance",
      gender: "Genre",
      male: "Masculin",
      female: "Féminin",
      other: "Autre",
      nationality: "Nationalité",
      email: "Courriel de l'élève",
      phone: "Téléphone de l'élève",
      parentName: "Nom complet du parent / tuteur",
      relationship: "Lien de parenté",
      parentEmail: "Courriel du parent",
      parentPhone: "Téléphone du parent",
      address: "Adresse domiciliaire",
      grade: "Niveau scolaire",
      program: "Programme académique",
      previousSchool: "École précédente",
      enrollmentDate: "Date d'inscription",
      medicalNotes: "Notes médicales / allergies",
      hasConsent:
        "Je confirme que les informations fournies sont exactes et j'accepte la politique de données de l'école.",
    },
    validation: {
      required: "Ce champ est obligatoire",
      email: "Veuillez saisir un courriel valide",
      phone: "Veuillez saisir un numéro de téléphone valide",
      minLength: (n: number) => `Doit contenir au moins ${n} caractères`,
      maxLength: (n: number) => `Doit contenir au plus ${n} caractères`,
      consent: "Vous devez donner votre consentement pour continuer",
    },
    submit: "Soumettre l'inscription",
    submitting: "Envoi en cours...",
    success: {
      title: "Inscription soumise",
      message:
        "L'inscription de l'élève a été reçue. Une confirmation sera envoyée sous peu.",
      new: "Soumettre une autre",
    },
  },
} as const;

const LANG_KEY = "miabe-lang";
const THEME_KEY = "miabe-theme";

type Theme = "light" | "dark";

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(LANG_KEY)) as Lang | null;
    if (stored === "en" || stored === "fr") setLang(stored);
  }, []);
  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);
  return [lang, setLang];
}

function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(THEME_KEY)) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return [theme, setTheme];
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-lg border border-brand-secondary/10 bg-white p-0.5 text-[11px] font-bold uppercase tracking-wider">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-md transition-all ${
            lang === l
              ? "bg-brand-primary text-white"
              : "text-brand-secondary/60 hover:text-brand-secondary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-9 w-9 rounded-lg border border-brand-secondary/10 bg-white grid place-items-center text-brand-secondary hover:text-brand-primary transition-colors"
    >
      {isDark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function makeSchema(t: (typeof T)[Lang]) {
  return z.object({
    firstName: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(50, { message: t.validation.maxLength(50) }),
    lastName: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(50, { message: t.validation.maxLength(50) }),
    dateOfBirth: z.string().min(1, { message: t.validation.required }),
    gender: z.enum(["male", "female", "other"], {
      required_error: t.validation.required,
    }),
    nationality: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(50, { message: t.validation.maxLength(50) }),
    email: z
      .string()
      .max(255)
      .optional()
      .or(z.literal(""))
      .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
        message: t.validation.email,
      }),
    phone: z
      .string()
      .max(20)
      .optional()
      .or(z.literal("")),
    parentName: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(100, { message: t.validation.maxLength(100) }),
    relationship: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(50, { message: t.validation.maxLength(50) }),
    parentEmail: z
      .string()
      .min(1, { message: t.validation.required })
      .email({ message: t.validation.email })
      .max(255),
    parentPhone: z
      .string()
      .min(8, { message: t.validation.phone })
      .max(20, { message: t.validation.maxLength(20) }),
    address: z
      .string()
      .min(5, { message: t.validation.minLength(5) })
      .max(200, { message: t.validation.maxLength(200) }),
    grade: z.string().min(1, { message: t.validation.required }),
    program: z.string().min(1, { message: t.validation.required }),
    previousSchool: z
      .string()
      .max(100, { message: t.validation.maxLength(100) })
      .optional()
      .or(z.literal("")),
    enrollmentDate: z.string().min(1, { message: t.validation.required }),
    medicalNotes: z
      .string()
      .max(500, { message: t.validation.maxLength(500) })
      .optional()
      .or(z.literal("")),
    hasConsent: z.boolean().refine((v) => v === true, {
      message: t.validation.consent,
    }),
  });
}

type EnrollmentData = z.infer<ReturnType<typeof makeSchema>>;

const defaultValues: EnrollmentData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "male",
  nationality: "",
  email: "",
  phone: "",
  parentName: "",
  relationship: "",
  parentEmail: "",
  parentPhone: "",
  address: "",
  grade: "",
  program: "",
  previousSchool: "",
  enrollmentDate: new Date().toISOString().split("T")[0],
  medicalNotes: "",
  hasConsent: false,
};

function EnrollmentPage() {
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const t = T[lang];

  const schema = makeSchema(t);
  const form = useForm<EnrollmentData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: EnrollmentData) => {
    // TODO: persist to backend once Lovable Cloud/data layer is enabled.
    console.log("Enrollment data:", data);
    setSubmitted(true);
  };

  const resetForm = () => {
    form.reset(defaultValues);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-surface-bg font-sans text-brand-secondary">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="MiabeClass logo"
              className="h-8 w-8 shrink-0 rounded-lg object-contain"
            />
            <span className="truncate font-display text-lg sm:text-xl font-bold tracking-tight text-brand-secondary">
              MiabeClass
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1 rounded-lg border border-brand-secondary/10 bg-white px-3 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-primary hover:border-brand-primary/20 transition-colors sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
              {t.nav.back}
            </Link>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-brand-secondary/60">
            {t.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-brand-secondary/5 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-display text-xl font-bold sm:text-2xl">
              {t.success.title}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-brand-secondary/60">
              {t.success.message}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={resetForm} className="rounded-xl">
                {t.success.new}
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="rounded-xl"
                >
                  {t.nav.dashboard}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-lg font-bold">
                  {t.sections.student}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.firstName}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.lastName}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.dateOfBirth}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.gender}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">{t.fields.male}</SelectItem>
                            <SelectItem value="female">{t.fields.female}</SelectItem>
                            <SelectItem value="other">{t.fields.other}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.nationality}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.email}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.phone}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-lg font-bold">
                  {t.sections.parent}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.parentName}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.relationship}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.parentEmail}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.parentPhone}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t.fields.address}</FormLabel>
                        <FormControl>
                          <Textarea rows={3} placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-lg font-bold">
                  {t.sections.academic}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.grade}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.program}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousSchool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.previousSchool}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enrollmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.enrollmentDate}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 font-display text-lg font-bold">
                  {t.sections.additional}
                </h2>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="medicalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.medicalNotes}</FormLabel>
                        <FormControl>
                          <Textarea rows={4} placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-brand-secondary/5 bg-slate-50 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">
                            {t.fields.hasConsent}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t.nav.back}
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full rounded-xl bg-brand-primary hover:bg-brand-primary/90 sm:w-auto"
                >
                  {form.formState.isSubmitting ? t.submitting : t.submit}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </main>
    </div>
  );
}
