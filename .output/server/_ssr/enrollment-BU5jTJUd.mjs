import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as stringType, i as objectType, n as enumType, r as literalType, t as booleanType } from "../_libs/zod.mjs";
import { a as useFormContext, i as useForm, n as Controller, r as FormProvider, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as Check, i as ChevronDown, n as ChevronUp, r as ChevronLeft, t as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enrollment-BU5jTJUd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Form = FormProvider;
var FormFieldContext = import_react.createContext(null);
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, { ...props })
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	if (!itemContext) throw new Error("useFormField should be used within <FormItem>");
	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext(null);
var FormItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: cn("space-y-2", className),
			...props
		})
	});
});
FormItem.displayName = "FormItem";
var FormLabel = import_react.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		ref,
		className: cn(error && "text-destructive", className),
		htmlFor: formItemId,
		...props
	});
});
FormLabel.displayName = "FormLabel";
var FormControl = import_react.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		ref,
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	});
});
FormControl.displayName = "FormControl";
var FormDescription = import_react.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		ref,
		id: formDescriptionId,
		className: cn("text-[0.8rem] text-muted-foreground", className),
		...props
	});
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react.forwardRef(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		ref,
		id: formMessageId,
		className: cn("text-[0.8rem] font-medium text-destructive", className),
		...props,
		children: body
	});
});
FormMessage.displayName = "FormMessage";
var T = {
	en: {
		nav: {
			back: "Back to Dashboard",
			dashboard: "Dashboard"
		},
		title: "New Student Enrollment",
		subtitle: "Complete the form below to register a new student.",
		sections: {
			student: "Student Information",
			parent: "Parent / Guardian",
			academic: "Academic Information",
			additional: "Additional Information"
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
			hasConsent: "I confirm that the information provided is accurate and consent to the school's data policy."
		},
		validation: {
			required: "This field is required",
			email: "Please enter a valid email",
			phone: "Please enter a valid phone number",
			minLength: (n) => `Must be at least ${n} characters`,
			maxLength: (n) => `Must be at most ${n} characters`,
			consent: "You must consent to proceed"
		},
		submit: "Submit Enrollment",
		submitting: "Submitting...",
		success: {
			title: "Enrollment Submitted",
			message: "The student enrollment has been received. A confirmation will be sent shortly.",
			new: "Submit Another"
		}
	},
	fr: {
		nav: {
			back: "Retour au tableau de bord",
			dashboard: "Tableau de bord"
		},
		title: "Nouvelle inscription d'élève",
		subtitle: "Remplissez le formulaire ci-dessous pour inscrire un nouvel élève.",
		sections: {
			student: "Informations sur l'élève",
			parent: "Parent / Tuteur",
			academic: "Informations académiques",
			additional: "Informations complémentaires"
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
			hasConsent: "Je confirme que les informations fournies sont exactes et j'accepte la politique de données de l'école."
		},
		validation: {
			required: "Ce champ est obligatoire",
			email: "Veuillez saisir un courriel valide",
			phone: "Veuillez saisir un numéro de téléphone valide",
			minLength: (n) => `Doit contenir au moins ${n} caractères`,
			maxLength: (n) => `Doit contenir au plus ${n} caractères`,
			consent: "Vous devez donner votre consentement pour continuer"
		},
		submit: "Soumettre l'inscription",
		submitting: "Envoi en cours...",
		success: {
			title: "Inscription soumise",
			message: "L'inscription de l'élève a été reçue. Une confirmation sera envoyée sous peu.",
			new: "Soumettre une autre"
		}
	}
};
var LANG_KEY = "miabe-lang";
var THEME_KEY = "miabe-theme";
function useLang() {
	const [lang, setLang] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		const stored = typeof window !== "undefined" && window.localStorage.getItem(LANG_KEY);
		if (stored === "en" || stored === "fr") setLang(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		window.localStorage.setItem(LANG_KEY, lang);
	}, [lang]);
	return [lang, setLang];
}
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = (typeof window !== "undefined" && window.localStorage.getItem(THEME_KEY)) ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem(THEME_KEY, theme);
	}, [theme]);
	return [theme, setTheme];
}
function LangToggle({ lang, setLang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center rounded-lg border border-brand-secondary/10 bg-white p-0.5 text-[11px] font-bold uppercase tracking-wider",
		children: ["en", "fr"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setLang(l),
			className: `px-2.5 py-1 rounded-md transition-all ${lang === l ? "bg-brand-primary text-white" : "text-brand-secondary/60 hover:text-brand-secondary"}`,
			children: l
		}, l))
	});
}
function ThemeToggle({ theme, setTheme }) {
	const isDark = theme === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setTheme(isDark ? "light" : "dark"),
		"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
		className: "h-9 w-9 rounded-lg border border-brand-secondary/10 bg-white grid place-items-center text-brand-secondary hover:text-brand-primary transition-colors",
		children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
		})
	});
}
function makeSchema(t) {
	return objectType({
		firstName: stringType().min(2, { message: t.validation.minLength(2) }).max(50, { message: t.validation.maxLength(50) }),
		lastName: stringType().min(2, { message: t.validation.minLength(2) }).max(50, { message: t.validation.maxLength(50) }),
		dateOfBirth: stringType().min(1, { message: t.validation.required }),
		gender: enumType([
			"male",
			"female",
			"other"
		], { required_error: t.validation.required }),
		nationality: stringType().min(2, { message: t.validation.minLength(2) }).max(50, { message: t.validation.maxLength(50) }),
		email: stringType().max(255).optional().or(literalType("")).refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), { message: t.validation.email }),
		phone: stringType().max(20).optional().or(literalType("")),
		parentName: stringType().min(2, { message: t.validation.minLength(2) }).max(100, { message: t.validation.maxLength(100) }),
		relationship: stringType().min(2, { message: t.validation.minLength(2) }).max(50, { message: t.validation.maxLength(50) }),
		parentEmail: stringType().min(1, { message: t.validation.required }).email({ message: t.validation.email }).max(255),
		parentPhone: stringType().min(8, { message: t.validation.phone }).max(20, { message: t.validation.maxLength(20) }),
		address: stringType().min(5, { message: t.validation.minLength(5) }).max(200, { message: t.validation.maxLength(200) }),
		grade: stringType().min(1, { message: t.validation.required }),
		program: stringType().min(1, { message: t.validation.required }),
		previousSchool: stringType().max(100, { message: t.validation.maxLength(100) }).optional().or(literalType("")),
		enrollmentDate: stringType().min(1, { message: t.validation.required }),
		medicalNotes: stringType().max(500, { message: t.validation.maxLength(500) }).optional().or(literalType("")),
		hasConsent: booleanType().refine((v) => v === true, { message: t.validation.consent })
	});
}
var defaultValues = {
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
	enrollmentDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
	medicalNotes: "",
	hasConsent: false
};
function EnrollmentPage() {
	const [lang, setLang] = useLang();
	const [theme, setTheme] = useTheme();
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const t = T[lang];
	const form = useForm({
		resolver: u(makeSchema(t)),
		defaultValues,
		mode: "onBlur"
	});
	const onSubmit = (data) => {
		console.log("Enrollment data:", data);
		setSubmitted(true);
	};
	const resetForm = () => {
		form.reset(defaultValues);
		setSubmitted(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface-bg font-sans text-brand-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/80 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "MiabeClass logo",
						className: "h-8 w-8 shrink-0 rounded-lg object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-display text-lg sm:text-xl font-bold tracking-tight text-brand-secondary",
						children: "MiabeClass"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "hidden items-center gap-1 rounded-lg border border-brand-secondary/10 bg-white px-3 py-2 text-xs font-semibold text-brand-secondary hover:text-brand-primary hover:border-brand-primary/20 transition-colors sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), t.nav.back]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {
							theme,
							setTheme
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
							lang,
							setLang
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 sm:mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl sm:text-4xl font-bold tracking-tight",
					children: t.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm sm:text-base text-brand-secondary/60",
					children: t.subtitle
				})]
			}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand-secondary/5 bg-white p-8 text-center shadow-sm sm:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 font-display text-xl font-bold sm:text-2xl",
						children: t.success.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-sm text-brand-secondary/60",
						children: t.success.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: resetForm,
							className: "rounded-xl",
							children: t.success.new
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-xl",
								children: t.nav.dashboard
							})
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-display text-lg font-bold",
								children: t.sections.student
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "firstName",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.firstName }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "lastName",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.lastName }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "dateOfBirth",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.dateOfBirth }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "gender",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.gender }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												onValueChange: field.onChange,
												defaultValue: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "male",
														children: t.fields.male
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "female",
														children: t.fields.female
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "other",
														children: t.fields.other
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "nationality",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.nationality }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "email",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.email }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "email",
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "phone",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.phone }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "tel",
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-display text-lg font-bold",
								children: t.sections.parent
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "parentName",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.parentName }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "relationship",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.relationship }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "parentEmail",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.parentEmail }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "email",
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "parentPhone",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.parentPhone }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "tel",
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "address",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											className: "sm:col-span-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.address }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													rows: 3,
													placeholder: "",
													...field
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
											]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-display text-lg font-bold",
								children: t.sections.academic
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "grade",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.grade }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "program",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.program }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "previousSchool",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.previousSchool }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "enrollmentDate",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.enrollmentDate }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-display text-lg font-bold",
								children: t.sections.additional
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "medicalNotes",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t.fields.medicalNotes }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 4,
											placeholder: "",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "hasConsent",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										className: "flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-brand-secondary/5 bg-slate-50 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: field.value,
											onCheckedChange: field.onChange
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 leading-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												className: "text-sm font-medium",
												children: t.fields.hasConsent
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})]
										})]
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									className: "w-full rounded-xl sm:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), t.nav.back]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: form.formState.isSubmitting,
								className: "w-full rounded-xl bg-brand-primary hover:bg-brand-primary/90 sm:w-auto",
								children: form.formState.isSubmitting ? t.submitting : t.submit
							})]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { EnrollmentPage as component };
