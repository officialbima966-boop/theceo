import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Phase {
  id: string;
  icon: string;
  days: string;
  title: string;
  description: string;
  sort_order: number;
}

const IconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Brain: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Rocket: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Crown: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3 11.54 11.297-3.807 3.797-11.79-12.094zm-1 16h20M5 21h14" />
    </svg>
  ),
};

const RoadmapSection = () => {
  const [phases, setPhases] = useState<Phase[]>([]);

  useEffect(() => {
    supabase
      .from("roadmap_phases")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data) setPhases(data); });
  }, []);

  return (
    <section className="py-24 bg-gradient-dark text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Roadmap</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
            90 Hari Transformasi
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {phases.map((phase, index) => {
            const Icon = IconMap[phase.icon];
            return (
              <div
                key={phase.id}
                className="relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-accent/50 transition-all group"
              >
                <div className="absolute -top-6 left-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg">
                    {Icon && <Icon className="w-6 h-6 text-gray-900" />}
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-accent font-semibold text-sm">{phase.days}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-2 mb-4">
                    {phase.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{phase.description}</p>
                </div>
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-display font-bold text-white">
            Yang kuat naik. <span className="text-accent">Yang tidak siap gugur.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;