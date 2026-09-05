import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/supports")({
  component: RouteComponent,
});

type Support = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  icon: string;
};

const supportsData: Support[] = [
  {
    id: 1,
    title: "Introduction aux réseaux informatiques",
    description:
      "Support de cours présentant les bases des réseaux, les équipements et les principaux concepts.",
    category: "Réseaux",
    type: "PDF",
    size: "2.4 MB",
    icon: "🌐",
  },
  {
    id: 2,
    title: "Maintenance informatique",
    description:
      "Guide pratique consacré au diagnostic, à l’entretien et au dépannage des ordinateurs.",
    category: "Maintenance",
    type: "PDF",
    size: "3.1 MB",
    icon: "🔧",
  },
  {
    id: 3,
    title: "Architecture des ordinateurs",
    description:
      "Cours sur les composants matériels, leur fonctionnement et leur interaction.",
    category: "Informatique",
    type: "PDF",
    size: "4.2 MB",
    icon: "💻",
  },
  {
    id: 4,
    title: "Programmation en langage C",
    description:
      "Support d’apprentissage destiné aux débutants souhaitant découvrir la programmation en C.",
    category: "Programmation",
    type: "PDF",
    size: "2.8 MB",
    icon: "💻",
  },
  {
    id: 5,
    title: "Systèmes embarqués et IoT",
    description:
      "Introduction aux systèmes embarqués, aux microcontrôleurs et à l’Internet des objets.",
    category: "Systèmes embarqués",
    type: "PDF",
    size: "5.6 MB",
    icon: "⚙️",
  },
  {
    id: 6,
    title: "Exercices de réseaux",
    description:
      "Série d’exercices permettant de renforcer les connaissances en adressage IP et réseaux.",
    category: "Réseaux",
    type: "PDF",
    size: "1.8 MB",
    icon: "📝",
  },
];

const categories = [
  "Tous",
  "Réseaux",
  "Maintenance",
  "Informatique",
  "Programmation",
  "Systèmes embarqués",
];

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");

  const filteredSupports = useMemo(() => {
    return supportsData.filter((support) => {
      const matchesSearch =
        support.title.toLowerCase().includes(search.toLowerCase()) ||
        support.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "Tous" || support.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur">
                📚
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Supports pédagogiques
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Retrouvez les cours, fiches, exercices et ressources
                pédagogiques disponibles sur MiabeClass.
              </p>
            </div>

            <div className="hidden rounded-3xl bg-white/10 p-6 text-center backdrop-blur md:block">
              <div className="text-4xl font-bold">{supportsData.length}</div>

              <div className="mt-1 text-sm text-blue-100">
                Supports disponibles
              </div>
            </div>
          </div>

          {/* Recherche */}
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center rounded-2xl bg-white p-2 shadow-xl">
              <span className="px-4 text-xl text-slate-400">⌕</span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un support..."
                className="w-full bg-transparent px-2 py-3 text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Filtres */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-700 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Résultats */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Ressources disponibles
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredSupports.length} support
                {filteredSupports.length > 1 ? "s" : ""} trouvé
                {filteredSupports.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Cartes */}
          {filteredSupports.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Aucun support trouvé
              </h3>

              <p className="mt-2 text-slate-500">
                Essayez un autre mot-clé ou sélectionnez une autre catégorie.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("Tous");
                }}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSupports.map((support) => (
                <article
                  key={support.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* En-tête carte */}
                  <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                      {support.icon}
                    </div>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                      {support.type}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {support.category}
                    </span>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {support.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {support.description}
                    </p>

                    {/* Informations */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                      <span>📄 {support.type}</span>
                      <span>{support.size}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                      >
                        Consulter
                      </button>

                      <button
                        type="button"
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section information */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 p-8 text-white md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Apprenez à votre rythme</h2>

                <p className="mt-2 max-w-2xl leading-7 text-blue-100">
                  Utilisez les supports MiabeClass pour approfondir vos
                  connaissances, réviser vos cours et vous préparer à vos
                  évaluations.
                </p>
              </div>

              <a
                href="/faq"
                className="shrink-0 rounded-xl bg-white px-6 py-3 text-center font-semibold text-blue-900 transition hover:bg-blue-50"
              >
                Besoin d'aide ?
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
