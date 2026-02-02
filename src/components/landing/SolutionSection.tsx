import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Highlight {
  id: string;
  icon: string;
  text: string;
  sort_order: number;
}

// Simple icon map for lucide icons stored as strings in DB
const IconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Wallet: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9zm0 0V6a2 2 0 012-2h16a2 2 0 012 2v4M3 10h18M7 14h.01" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Building2: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m4 4v-8m4 8v-12m4 12v-6m-16 6h16M5 12l7-9 7 9" />
    </svg>
  ),
  HeartHandshake: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

const SolutionSection = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    supabase
      .from("solution_highlights")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data) setHighlights(data); });
  }, []);

  return (
    <section className="py-24 bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Solusi Kami</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Kami Tidak Mengajar dari Buku
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Kami <span className="text-accent font-semibold">menyerahkan bisnis langsung ke tanganmu.</span>
            <br />
            Kamu belajar dengan melakukan, bukan dengan mendengarkan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {highlights.map((item) => {
            const Icon = IconMap[item.icon];
            return (
              <div
                key={item.id}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:border-accent/50 transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  {Icon && <Icon className="w-7 h-7 text-accent" />}
                </div>
                <span className="font-semibold text-white">{item.text}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-full border border-accent/30">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-medium">Program ini GRATIS — bersyarat untuk yang serius</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;