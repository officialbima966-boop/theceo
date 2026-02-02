import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Step {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

const IconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Filter: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
  ),
  Zap: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Building: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m4 4v-8m4 8v-12m4 12v-6m-16 6h16M5 12l7-9 7 9" />
    </svg>
  ),
  LineChart: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l4-4 4 4 6-8M7 17H4m17 0h-3" />
    </svg>
  ),
  Award: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const TimelineSection = () => {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    supabase
      .from("timeline_steps")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data) setSteps(data); });
  }, []);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Alur Program</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4">
            Cara Program Bekerja
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-7 left-0 right-0 h-0.5 bg-border">
              <div className="h-full bg-gradient-gold" style={{ width: "100%" }} />
            </div>
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const Icon = IconMap[step.icon];
                return (
                  <div key={step.id} className="flex flex-col items-center text-center w-1/5">
                    <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mb-4 relative z-10 shadow-lg">
                      {Icon && <Icon className="w-6 h-6 text-gray-900" />}
                    </div>
                    <div className="w-3 h-3 rounded-full bg-accent mb-4" />
                    <h3 className="font-display font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-border">
              <div className="w-full h-full bg-gradient-gold" />
            </div>
            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = IconMap[step.icon];
                return (
                  <div key={step.id} className="flex items-start gap-6">
                    <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-gold flex items-center justify-center relative z-10 shadow-lg">
                      {Icon && <Icon className="w-6 h-6 text-gray-900" />}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-display font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;