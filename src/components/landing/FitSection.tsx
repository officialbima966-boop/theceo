import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Qualification {
  id: string;
  text: string;
  type: "fit" | "not_fit";
  sort_order: number;
}

const FitSection = () => {
  const [fitFor, setFitFor] = useState<Qualification[]>([]);
  const [notFitFor, setNotFitFor] = useState<Qualification[]>([]);

  useEffect(() => {
    supabase
      .from("qualifications")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setFitFor(data.filter((q: Qualification) => q.type === "fit"));
          setNotFitFor(data.filter((q: Qualification) => q.type === "not_fit"));
        }
      });
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Kualifikasi</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4">
            Apakah Ini untuk Kamu?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Cocok */}
          <div className="p-8 rounded-2xl border-2 border-accent/30 bg-accent/5">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Cocok untuk kamu jika:
            </h3>
            <ul className="space-y-4">
              {fitFor.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tidak cocok */}
          <div className="p-8 rounded-2xl border border-border bg-secondary/30">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              Tidak cocok jika:
            </h3>
            <ul className="space-y-4">
              {notFitFor.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitSection;