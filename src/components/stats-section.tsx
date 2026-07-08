import { Package, Zap, Trophy } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "22",
    label: "produktov",
    description: "Kompletný sortiment meničov a batérií",
  },
  {
    icon: Zap,
    value: "6-80 kW",
    label: "výkonový rozsah",
    description: "Od rodinných domov po komerčné projekty",
  },
  {
    icon: Trophy,
    value: "#1",
    label: "importér SK",
    description: "Najväčší sklad Deye produktov na Slovensku",
  },
];

export function StatsSection() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wide text-primary">
                {stat.label}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
