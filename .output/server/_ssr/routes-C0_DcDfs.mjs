import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C0_DcDfs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var T = {
	en: {
		nav: {
			dashboard: "Dashboard",
			institutions: "Institutions",
			records: "Academic Records",
			fees: "Fee Management"
		},
		hero: {
			school: "St. Andrews International",
			term: "Academic Year 2023/2024 • Term 2",
			report: "Generate Report",
			enroll: "New Enrollment"
		},
		stats: {
			students: "Total Students",
			teachers: "Teacher Attendance",
			stable: "Stable",
			fees: "Fee Collection",
			target: "72% Target",
			requests: "Open Requests",
			tickets: "Parent Tickets"
		},
		courses: {
			title: "Course Management & Materials",
			viewAll: "View All",
			resources: (n) => `${n} Resources`,
			materials: (n) => `${n} Materials`,
			live: "Live now",
			c1: {
				title: "Advanced Mathematics: Calculus III",
				meta: "Grade 12 • Dr. Sarah Jenkins"
			},
			c2: {
				title: "Quantum Physics Principles",
				meta: "Grade 11 • Prof. Marcus Aurel"
			},
			c3: {
				title: "World Literature: 19th Century",
				meta: "Grade 10 • Elena Rodriguez"
			}
		},
		analytics: {
			title: "Institutional Performance Analytics",
			performance: "Performance",
			attendance: "Attendance"
		},
		notices: {
			title: "Recent School Notices",
			urgent: "Urgent",
			urgentMsg: "Parent-Teacher Conference rescheduled for Friday, Oct 12.",
			event: "Event",
			eventMsg: "Annual Science Fair registration now open for Grades 6-12.",
			holiday: "Holiday",
			holidayMsg: "School will be closed for National Heritage Day.",
			broadcast: "Broadcasting System"
		},
		fees: {
			title: "Fee Collection Status",
			pending: "$12,400 pending this month",
			tuition: "Tuition Fee - Leo Vance",
			library: "Library Fund - Maya Ito",
			receipt: (n) => `Receipt #${n}`
		},
		quick: {
			library: "Digital Library",
			messaging: "Messaging",
			timetable: "Timetable",
			exams: "Exams"
		},
		footer: {
			copy: "© 2024 MiabeClass Digital Education Systems. All rights reserved.",
			privacy: "Privacy Policy",
			security: "Security Settings",
			status: "System Status"
		}
	},
	fr: {
		nav: {
			dashboard: "Tableau de bord",
			institutions: "Établissements",
			records: "Dossiers scolaires",
			fees: "Gestion des frais"
		},
		hero: {
			school: "St. Andrews International",
			term: "Année scolaire 2023/2024 • Trimestre 2",
			report: "Générer un rapport",
			enroll: "Nouvelle inscription"
		},
		stats: {
			students: "Total des élèves",
			teachers: "Présence enseignants",
			stable: "Stable",
			fees: "Encaissement des frais",
			target: "72 % de l'objectif",
			requests: "Demandes ouvertes",
			tickets: "Tickets parents"
		},
		courses: {
			title: "Gestion des cours et supports",
			viewAll: "Tout voir",
			resources: (n) => `${n} ressources`,
			materials: (n) => `${n} supports`,
			live: "En direct",
			c1: {
				title: "Mathématiques avancées : Calcul III",
				meta: "Terminale • Dr Sarah Jenkins"
			},
			c2: {
				title: "Principes de physique quantique",
				meta: "Première • Pr Marcus Aurel"
			},
			c3: {
				title: "Littérature mondiale : XIXᵉ siècle",
				meta: "Seconde • Elena Rodriguez"
			}
		},
		analytics: {
			title: "Analyses de performance de l'établissement",
			performance: "Performance",
			attendance: "Assiduité"
		},
		notices: {
			title: "Avis récents de l'école",
			urgent: "Urgent",
			urgentMsg: "Réunion parents-enseignants reportée au vendredi 12 octobre.",
			event: "Événement",
			eventMsg: "Inscriptions à la Foire annuelle des sciences ouvertes pour la 6ᵉ à la Terminale.",
			holiday: "Congé",
			holidayMsg: "L'école sera fermée pour la Journée du patrimoine national.",
			broadcast: "Système de diffusion"
		},
		fees: {
			title: "État de l'encaissement des frais",
			pending: "12 400 $ en attente ce mois-ci",
			tuition: "Frais de scolarité - Leo Vance",
			library: "Fonds de bibliothèque - Maya Ito",
			receipt: (n) => `Reçu n°${n}`
		},
		quick: {
			library: "Bibliothèque numérique",
			messaging: "Messagerie",
			timetable: "Emploi du temps",
			exams: "Examens"
		},
		footer: {
			copy: "© 2024 MiabeClass Systèmes d'Éducation Numérique. Tous droits réservés.",
			privacy: "Politique de confidentialité",
			security: "Paramètres de sécurité",
			status: "État du système"
		}
	}
};
function Stat({ label, value, delta, deltaTone = "accent" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-bold uppercase tracking-wider text-brand-secondary/40",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-baseline gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-3xl font-bold",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs font-medium ${deltaTone === "accent" ? "text-brand-accent" : deltaTone === "amber" ? "text-amber-500" : "text-brand-secondary/60"}`,
				children: delta
			})]
		})]
	});
}
function CourseRow({ letter, color, title, meta, chips }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 px-4 py-4 sm:flex sm:items-center sm:gap-4 sm:px-6 sm:py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-bold sm:text-xl",
					children: letter
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "truncate text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-brand-secondary/60",
					children: meta
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:justify-end",
				children: chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2.5 py-1 text-[10px] font-bold uppercase whitespace-nowrap ${c.tone === "live" ? "bg-brand-accent/10 text-brand-accent" : "bg-slate-100 text-brand-secondary"}`,
					children: c.label
				}, c.label))
			})
		]
	});
}
function AnalyticsChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 800 300",
		className: "w-full aspect-[21/9] rounded-xl bg-slate-50",
		preserveAspectRatio: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g1",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#4f46e5",
					stopOpacity: "0.25"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#4f46e5",
					stopOpacity: "0"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "g2",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#10b981",
					stopOpacity: "0.2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#10b981",
					stopOpacity: "0"
				})]
			})] }),
			[
				60,
				120,
				180,
				240
			].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				x2: "800",
				y1: y,
				y2: y,
				stroke: "#e2e8f0",
				strokeDasharray: "4 6"
			}, y)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,200 C80,180 140,120 220,140 C300,160 360,80 440,90 C520,100 580,60 660,70 C720,78 760,55 800,50 L800,300 L0,300 Z",
				fill: "url(#g1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,200 C80,180 140,120 220,140 C300,160 360,80 440,90 C520,100 580,60 660,70 C720,78 760,55 800,50",
				fill: "none",
				stroke: "#4f46e5",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,230 C90,220 160,190 240,200 C320,210 380,170 460,175 C540,180 600,150 680,145 C740,141 780,130 800,125 L800,300 L0,300 Z",
				fill: "url(#g2)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,230 C90,220 160,190 240,200 C320,210 380,170 460,175 C540,180 600,150 680,145 C740,141 780,130 800,125",
				fill: "none",
				stroke: "#10b981",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			})
		]
	});
}
function QuickLink({ letter, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-2xl border border-brand-secondary/5 bg-white p-4 text-center hover:border-brand-primary/20 transition-all cursor-pointer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-10 w-10 rounded-full bg-slate-50 grid place-items-center mb-2 font-bold text-brand-primary",
			children: letter
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-bold uppercase tracking-tight",
			children: label
		})]
	});
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
var LANG_KEY = "miabe-lang";
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
		const initial = (typeof window !== "undefined" && window.localStorage.getItem("miabe-theme")) ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem("miabe-theme", theme);
	}, [theme]);
	return [theme, setTheme];
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
function Index() {
	const [lang, setLang] = useLang();
	const [theme, setTheme] = useTheme();
	const t = T[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface-bg font-sans text-brand-secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-0 z-50 w-full border-b border-brand-secondary/5 bg-white/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.png",
								alt: "MiabeClass logo",
								className: "h-8 w-8 shrink-0 rounded-lg object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-display text-lg sm:text-xl font-bold tracking-tight text-brand-secondary",
								children: "MiabeClass"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden lg:flex items-center gap-8 text-sm font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#dashboard",
									className: "text-brand-primary",
									children: t.nav.dashboard
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#courses",
									className: "hover:text-brand-primary transition-colors",
									children: t.nav.institutions
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#analytics",
									className: "hover:text-brand-primary transition-colors",
									children: t.nav.records
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#fees",
									className: "hover:text-brand-primary transition-colors",
									children: t.nav.fees
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2 sm:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {
									theme,
									setTheme
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
									lang,
									setLang
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden sm:grid size-10 shrink-0 overflow-hidden rounded-full border border-brand-secondary/10 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 place-items-center font-display font-bold text-brand-secondary text-sm",
									children: "AV"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12",
				id: "dashboard",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl sm:text-4xl font-bold tracking-tight",
								children: t.hero.school
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm sm:text-base text-brand-secondary/60",
								children: t.hero.term
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex-1 sm:flex-none rounded-xl bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-brand-secondary/10 hover:bg-slate-50 transition-all",
								children: t.hero.report
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/enrollment",
								className: "flex-1 sm:flex-none rounded-xl bg-brand-primary px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary/90 transition-all inline-flex items-center justify-center",
								children: t.hero.enroll
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.stats.students,
								value: "1,284",
								delta: "+4.2%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.stats.teachers,
								value: "98.2%",
								delta: t.stats.stable
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.stats.fees,
								value: "$42k",
								delta: t.stats.target,
								deltaTone: "amber"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: t.stats.requests,
								value: "12",
								delta: t.stats.tickets,
								deltaTone: "muted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2 space-y-8",
							id: "courses",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-brand-secondary/5 bg-white overflow-hidden shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-brand-secondary/5 bg-slate-50/50 px-6 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display font-bold",
										children: t.courses.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-xs font-bold text-brand-primary",
										children: t.courses.viewAll
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "divide-y divide-brand-secondary/5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
											letter: "M",
											color: "bg-brand-primary/5 text-brand-primary",
											title: t.courses.c1.title,
											meta: t.courses.c1.meta,
											chips: [{ label: t.courses.resources(3) }, {
												label: t.courses.live,
												tone: "live"
											}]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
											letter: "P",
											color: "bg-amber-500/10 text-amber-600",
											title: t.courses.c2.title,
											meta: t.courses.c2.meta,
											chips: [{ label: t.courses.materials(12) }]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
											letter: "L",
											color: "bg-rose-500/10 text-rose-600",
											title: t.courses.c3.title,
											meta: t.courses.c3.meta,
											chips: [{ label: t.courses.resources(8) }]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm",
								id: "analytics",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6 flex items-center justify-between flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display font-bold",
										children: t.analytics.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-brand-primary" }), t.analytics.performance]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-brand-accent" }), t.analytics.attendance]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsChart, {})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-brand-secondary p-6 text-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-lg font-bold",
											children: t.notices.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-l-2 border-brand-primary pl-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-brand-primary uppercase tracking-widest",
														children: t.notices.urgent
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-sm font-medium",
														children: t.notices.urgentMsg
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-l-2 border-white/20 pl-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-white/40 uppercase tracking-widest",
														children: t.notices.event
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-sm font-medium",
														children: t.notices.eventMsg
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-l-2 border-white/20 pl-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-white/40 uppercase tracking-widest",
														children: t.notices.holiday
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-sm font-medium",
														children: t.notices.holidayMsg
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "mt-6 w-full rounded-xl bg-white/10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all",
											children: t.notices.broadcast
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-brand-secondary/5 bg-white p-6 shadow-sm",
									id: "fees",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display font-bold",
											children: t.fees.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative flex-1 h-2 rounded-full bg-slate-100",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-[72%] rounded-full bg-brand-accent" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold",
												children: "72%"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-brand-secondary/60",
											children: t.fees.pending
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-lg border border-brand-secondary/5 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold",
													children: t.fees.tuition
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-brand-secondary/50",
													children: t.fees.receipt("8829")
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-brand-accent",
													children: "+$1,200"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between rounded-lg border border-brand-secondary/5 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold",
													children: t.fees.library
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-brand-secondary/50",
													children: t.fees.receipt("8830")
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-brand-accent",
													children: "+$150"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
											letter: "B",
											label: t.quick.library
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
											letter: "M",
											label: t.quick.messaging
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
											letter: "T",
											label: t.quick.timetable
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
											letter: "E",
											label: t.quick.exams
										})
									]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 border-t border-brand-secondary/5 text-brand-secondary/40 text-xs flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.footer.copy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-brand-secondary",
							children: t.footer.privacy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-brand-secondary",
							children: t.footer.security
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-brand-secondary",
							children: t.footer.status
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
