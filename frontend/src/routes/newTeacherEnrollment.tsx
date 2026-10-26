import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

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

export const Route = createFileRoute("/newTeacherEnrollment")({
  component: EnrollmentPage,

  head: () => ({
    meta: [
      { title: "New Teacher Enrollment — MiabeClass" },
      {
        name: "description",
        content:
          "Register as a teacher on MiabeClass and provide your personal, professional and teaching information.",
      },
      {
        property: "og:title",
        content: "New Teacher Enrollment — MiabeClass",
      },
      {
        property: "og:description",
        content:
          "Register as a teacher on MiabeClass and provide your personal, professional and teaching information.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
});

type Lang = "en" | "fr";
type Theme = "light" | "dark";

const T = {
  en: {
    nav: {
      back: "Back to Dashboard",
      dashboard: "Dashboard",
    },

    title: "Teacher Registration",
    subtitle:
      "Complete the form below to create your teacher profile on MiabeClass.",

    sections: {
      personal: "Personal Information",
      contact: "Contact Information",
      professional: "Professional Information",
      teaching: "Teaching Information",
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

      email: "Email address",
      phone: "Phone number",
      address: "Home address",
      city: "City",

      professionalTitle: "Professional title",
      specialty: "Specialty / Domain",
      institution: "Current institution",
      experience: "Years of experience",
      education: "Highest qualification",

      subjects: "Subjects / Courses taught",
      teachingLevel: "Teaching level",
      bio: "Professional biography",

      availability: "Availability",
      additionalInfo: "Additional information",

      hasConsent:
        "I confirm that the information provided is accurate and I accept MiabeClass's data policy.",
    },

    placeholders: {
      professionalTitle: "e.g. Mathematics Teacher",
      specialty: "e.g. Mathematics, Computer Science",
      institution: "School, university or organization",
      experience: "e.g. 3",
      education: "e.g. Bachelor's Degree",
      subjects: "e.g. Mathematics, Physics, Programming",
      bio: "Briefly describe your professional background and teaching experience...",
      additionalInfo: "Any additional information you would like to provide...",
    },

    options: {
      beginner: "Less than 1 year",
      oneThree: "1–3 years",
      threeFive: "3–5 years",
      fiveTen: "5–10 years",
      tenPlus: "More than 10 years",

      secondary: "Secondary School",
      university: "University",
      vocational: "Vocational Training",
      professional: "Professional Training",
      primary: "Primary School",
      other: "Other",

      available: "Available",
      partTime: "Part-time",
      fullTime: "Full-time",
    },

    validation: {
      required: "This field is required",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone number",
      minLength: (n: number) => `Must contain at least ${n} characters`,
      maxLength: (n: number) => `Must contain at most ${n} characters`,
      consent: "You must accept the policy to continue",
    },

    submit: "Submit Registration",
    submitting: "Submitting...",

    success: {
      title: "Registration Submitted",
      message:
        "Your teacher registration has been successfully received. Your profile will be reviewed before activation.",
      new: "Register Another Teacher",
    },
  },

  fr: {
    nav: {
      back: "Retour au tableau de bord",
      dashboard: "Tableau de bord",
    },

    title: "Inscription enseignant",
    subtitle:
      "Remplissez le formulaire ci-dessous pour créer votre profil enseignant sur MiabeClass.",

    sections: {
      personal: "Informations personnelles",
      contact: "Coordonnées",
      professional: "Informations professionnelles",
      teaching: "Informations d'enseignement",
      additional: "Informations complémentaires",
    },

    fields: {
      firstName: "Prénom",
      lastName: "Nom",
      dateOfBirth: "Date de naissance",
      gender: "Genre",
      male: "Masculin",
      female: "Féminin",
      other: "Autre",
      nationality: "Nationalité",

      email: "Adresse e-mail",
      phone: "Numéro de téléphone",
      address: "Adresse domiciliaire",
      city: "Ville",

      professionalTitle: "Titre professionnel",
      specialty: "Spécialité / Domaine",
      institution: "Établissement actuel",
      experience: "Années d'expérience",
      education: "Diplôme le plus élevé",

      subjects: "Matières / Cours enseignés",
      teachingLevel: "Niveau d'enseignement",
      bio: "Biographie professionnelle",

      availability: "Disponibilité",
      additionalInfo: "Informations complémentaires",

      hasConsent:
        "Je confirme que les informations fournies sont exactes et j'accepte la politique de confidentialité de MiabeClass.",
    },

    placeholders: {
      professionalTitle: "Ex. Enseignant de mathématiques",
      specialty: "Ex. Mathématiques, Informatique",
      institution: "École, université ou organisation",
      experience: "Ex. 3",
      education: "Ex. Licence",
      subjects: "Ex. Mathématiques, Physique, Programmation",
      bio: "Décrivez brièvement votre parcours professionnel et votre expérience d'enseignement...",
      additionalInfo:
        "Toute information complémentaire que vous souhaitez communiquer...",
    },

    options: {
      beginner: "Moins d'un an",
      oneThree: "1–3 ans",
      threeFive: "3–5 ans",
      fiveTen: "5–10 ans",
      tenPlus: "Plus de 10 ans",

      secondary: "Enseignement secondaire",
      university: "Université",
      vocational: "Formation professionnelle",
      professional: "Formation professionnelle continue",
      primary: "Enseignement primaire",
      other: "Autre",

      available: "Disponible",
      partTime: "Temps partiel",
      fullTime: "Temps plein",
    },

    validation: {
      required: "Ce champ est obligatoire",
      email: "Veuillez saisir une adresse e-mail valide",
      phone: "Veuillez saisir un numéro de téléphone valide",
      minLength: (n: number) => `Doit contenir au moins ${n} caractères`,
      maxLength: (n: number) => `Doit contenir au plus ${n} caractères`,
      consent: "Vous devez accepter la politique pour continuer",
    },

    submit: "Soumettre l'inscription",
    submitting: "Envoi en cours...",

    success: {
      title: "Inscription envoyée",
      message:
        "Votre inscription en tant qu'enseignant a bien été reçue. Votre profil sera examiné avant son activation.",
      new: "Inscrire un autre enseignant",
    },
  },
} as const;

const LANG_KEY = "miabe-lang";
const THEME_KEY = "miabe-theme";

function useLang(): [Lang, (lang: Lang) => void] {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY);

    if (stored === "en" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return [lang, setLang];
}

function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);

    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return [theme, setTheme];
}

function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-brand-secondary/10 bg-white p-0.5 text-[11px] font-bold uppercase tracking-wider">
      {(["fr", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLang(item)}
          className={`rounded-md px-2.5 py-1 transition-all ${
            lang === item
              ? "bg-brand-primary text-white"
              : "text-brand-secondary/60 hover:text-brand-secondary"
          }`}
        >
          {item}
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
  setTheme: (theme: Theme) => void;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-brand-secondary/10 bg-white text-brand-secondary transition-colors hover:text-brand-primary"
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
      .min(1, { message: t.validation.required })
      .email({ message: t.validation.email })
      .max(255),

    phone: z
      .string()
      .min(8, { message: t.validation.phone })
      .max(20, { message: t.validation.maxLength(20) }),

    address: z
      .string()
      .min(5, { message: t.validation.minLength(5) })
      .max(200, { message: t.validation.maxLength(200) }),

    city: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(100, { message: t.validation.maxLength(100) }),

    professionalTitle: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(100, { message: t.validation.maxLength(100) }),

    specialty: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(150, { message: t.validation.maxLength(150) }),

    institution: z
      .string()
      .max(150, { message: t.validation.maxLength(150) })
      .optional()
      .or(z.literal("")),

    experience: z.string().min(1, { message: t.validation.required }),

    education: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(150, { message: t.validation.maxLength(150) }),

    subjects: z
      .string()
      .min(2, { message: t.validation.minLength(2) })
      .max(300, { message: t.validation.maxLength(300) }),

    teachingLevel: z.string().min(1, { message: t.validation.required }),

    bio: z
      .string()
      .min(20, { message: t.validation.minLength(20) })
      .max(1000, { message: t.validation.maxLength(1000) }),

    availability: z.string().min(1, { message: t.validation.required }),

    additionalInfo: z
      .string()
      .max(1000, { message: t.validation.maxLength(1000) })
      .optional()
      .or(z.literal("")),

    hasConsent: z.boolean().refine((value) => value === true, {
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
  address: "",
  city: "",

  professionalTitle: "",
  specialty: "",
  institution: "",
  experience: "",
  education: "",

  subjects: "",
  teachingLevel: "",
  bio: "",

  availability: "",

  additionalInfo: "",
  hasConsent: false,
};

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof UserRound;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="font-display text-lg font-bold sm:text-xl">{title}</h2>
    </div>
  );
}

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

  const onSubmit = async (data: EnrollmentData) => {
    /*
     * TODO:
     * Remplacer cette partie par l'appel à votre backend,
     * Supabase, Lovable Cloud ou API MiabeClass.
     */
    console.log("Teacher enrollment:", data);

    setSubmitted(true);
  };

  const resetForm = () => {
    form.reset(defaultValues);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-surface-bg font-sans text-brand-secondary">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="MiabeClass"
              className="h-8 w-8 shrink-0 rounded-lg object-contain"
            />

            <span className="truncate font-display text-lg font-bold tracking-tight sm:text-xl">
              MiabeClass
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1 rounded-lg border border-brand-secondary/10 bg-white px-3 py-2 text-xs font-semibold transition-colors hover:border-brand-primary/20 hover:text-brand-primary sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.nav.back}
            </Link>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold text-brand-primary">
            <GraduationCap className="h-4 w-4" />
            MiabeClass Teacher
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            {t.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-brand-secondary/60 sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-brand-secondary/5 bg-white p-8 text-center shadow-sm sm:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="mt-6 font-display text-xl font-bold sm:text-2xl">
              {t.success.title}
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-brand-secondary/60">
              {t.success.message}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={resetForm}
                className="rounded-xl bg-brand-primary hover:bg-brand-primary/90"
              >
                {t.success.new}
              </Button>

              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full rounded-xl sm:w-auto"
                >
                  {t.nav.dashboard}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* PERSONAL INFORMATION */}
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeader icon={UserRound} title={t.sections.personal} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.firstName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="male">
                              {t.fields.male}
                            </SelectItem>

                            <SelectItem value="female">
                              {t.fields.female}
                            </SelectItem>

                            <SelectItem value="other">
                              {t.fields.other}
                            </SelectItem>
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
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t.fields.nationality}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* CONTACT */}
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeader icon={MapPin} title={t.sections.contact} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {t.fields.email}
                        </FormLabel>

                        <FormControl>
                          <Input type="email" {...field} />
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
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {t.fields.phone}
                        </FormLabel>

                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.city}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.address}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* PROFESSIONAL */}
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeader
                  icon={BriefcaseBusiness}
                  title={t.sections.professional}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="professionalTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.professionalTitle}</FormLabel>

                        <FormControl>
                          <Input
                            placeholder={t.placeholders.professionalTitle}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.specialty}</FormLabel>

                        <FormControl>
                          <Input
                            placeholder={t.placeholders.specialty}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.institution}</FormLabel>

                        <FormControl>
                          <Input
                            placeholder={t.placeholders.institution}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.education}</FormLabel>

                        <FormControl>
                          <Input
                            placeholder={t.placeholders.education}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t.fields.experience}</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="0">
                              {t.options.beginner}
                            </SelectItem>

                            <SelectItem value="1-3">
                              {t.options.oneThree}
                            </SelectItem>

                            <SelectItem value="3-5">
                              {t.options.threeFive}
                            </SelectItem>

                            <SelectItem value="5-10">
                              {t.options.fiveTen}
                            </SelectItem>

                            <SelectItem value="10+">
                              {t.options.tenPlus}
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* TEACHING */}
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeader icon={BookOpen} title={t.sections.teaching} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t.fields.subjects}</FormLabel>

                        <FormControl>
                          <Input
                            placeholder={t.placeholders.subjects}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teachingLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.teachingLevel}</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="primary">
                              {t.options.primary}
                            </SelectItem>

                            <SelectItem value="secondary">
                              {t.options.secondary}
                            </SelectItem>

                            <SelectItem value="university">
                              {t.options.university}
                            </SelectItem>

                            <SelectItem value="vocational">
                              {t.options.vocational}
                            </SelectItem>

                            <SelectItem value="professional">
                              {t.options.professional}
                            </SelectItem>

                            <SelectItem value="other">
                              {t.options.other}
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.availability}</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="available">
                              {t.options.available}
                            </SelectItem>

                            <SelectItem value="part-time">
                              {t.options.partTime}
                            </SelectItem>

                            <SelectItem value="full-time">
                              {t.options.fullTime}
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>{t.fields.bio}</FormLabel>

                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder={t.placeholders.bio}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* ADDITIONAL */}
              <section className="rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeader
                  icon={GraduationCap}
                  title={t.sections.additional}
                />

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fields.additionalInfo}</FormLabel>

                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={t.placeholders.additionalInfo}
                            {...field}
                          />
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
                          <FormLabel className="text-sm font-medium leading-6">
                            {t.fields.hasConsent}
                          </FormLabel>

                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3 border-t border-brand-secondary/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.nav.back}
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full rounded-xl bg-brand-primary px-6 hover:bg-brand-primary/90 sm:w-auto"
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
