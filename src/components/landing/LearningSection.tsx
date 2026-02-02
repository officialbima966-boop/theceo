import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Learning {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

const IconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Crown: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3 11.54 11.297-3.807 3.797-11.79-12.094zm-1 16h20M5 21h14" />
    </svg>
  ),
  TrendingUp: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L7 15m-4 0h2m-2 4h6" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Lightbulb: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Target: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const LearningSection = () => {
  const [learnings, setLearnings] = useState<Learning[]>([]);

  useEffect(() => {
    supabase
      .from("learnings")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data) setLearnings(data); });
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Kurikulum</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4">
            Apa yang Akan Kamu Pelajari
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {learnings.map((item) => {
            const Icon = IconMap[item.icon];
            return (
              <div
                key={item.id}
                className="p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="w-7 h-7 text-gray-900" />}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningSection;