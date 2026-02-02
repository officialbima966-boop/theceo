import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Problem {
  id: string;
  text: string;
  subtext: string;
  sort_order: number;
}

const ProblemSection = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    supabase
      .from("problems")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data) setProblems(data); });
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Masalah Nyata</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4">
            Keresahan yang Kamu Rasakan
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg border border-border hover:border-accent/30 transition-colors group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {problem.text}
                </h3>
                <p className="text-muted-foreground mt-1">{problem.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-xl text-muted-foreground italic">
          "Kalau kamu merasakan ini, kamu bukan sendiri."
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;