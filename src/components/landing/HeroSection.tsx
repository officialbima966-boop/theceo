import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HeroData {
  badge_text: string;
  headline: string;
  headline_highlight: string;
  subheadline: string;
}

interface StatData {
  value: string;
  label: string;
  sort_order: number;
}

// ─── Skeleton placeholders while loading ─────────────────────
const SkeletonLine = ({ className = "" }) => (
  <div className={`animate-pulse bg-white/10 rounded ${className}`} />
);

const HeroSection = ({ onWhatsApp }: { onWhatsApp: () => void }) => {
  // Set default values to prevent empty display
  const [hero, setHero] = useState<HeroData>({
    badge_text: "Kuota Terbatas • Seleksi Ketat",
    headline: "Bukan Magang.",
    headline_highlight: "Ini Jalur Menuju CEO.",
    subheadline: "Program magang entrepreneurship GRATIS namun bersyarat. Pegang bisnis nyata, dimodali penuh, dibimbing mentor 15+ tahun. Peserta terbaik diangkat sebagai CEO."
  });

  const [stats, setStats] = useState<StatData[]>([
    { value: "15+", label: "Tahun Pengalaman Mentor", sort_order: 1 },
    { value: "100%", label: "Praktik Langsung", sort_order: 2 },
    { value: "0", label: "Modal Diperlukan", sort_order: 3 }
  ]);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, statsRes] = await Promise.all([
          supabase.from("hero_section").select("*").single(),
          supabase.from("stats").select("*").order("sort_order", { ascending: true }),
        ]);

        // Only update if we got data from database
        if (heroRes.data) {
          setHero(heroRes.data);
        }
        
        if (heroRes.error) {
          console.error("Error fetching hero data:", heroRes.error);
          setError("Gagal memuat data hero");
        }

        if (statsRes.data && statsRes.data.length > 0) {
          setStats(statsRes.data);
        }

        if (statsRes.error) {
          console.error("Error fetching stats data:", statsRes.error);
        }

      } catch (err) {
        console.error("Error in fetchData:", err);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  const scrollToQualification = () => {
    const qualSection = document.getElementById('kualifikasi');
    if (qualSection) {
      qualSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* subtle dot pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      
      {/* gold top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {!loaded ? (
            <SkeletonLine className="w-64 h-10 mx-auto mb-8" />
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-accent/30 rounded-full animate-fade-in">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-white/80 tracking-wider uppercase">{hero.badge_text}</span>
            </div>
          )}

          {/* Main Headline */}
          {!loaded ? (
            <>
              <SkeletonLine className="w-3/4 h-16 mx-auto mb-4" />
              <SkeletonLine className="w-1/2 h-16 mx-auto mb-6" />
            </>
          ) : (
            <h1 
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in" 
              style={{ animationDelay: "0.2s" }}
            >
              {hero.headline}
              <br />
              <span className="text-gradient-gold">{hero.headline_highlight}</span>
            </h1>
          )}

          {/* Subheadline */}
          {!loaded ? (
            <SkeletonLine className="w-2/3 h-12 mx-auto mb-10" />
          ) : (
            <p 
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" 
              style={{ animationDelay: "0.4s" }}
            >
              {hero.subheadline}
            </p>
          )}

          {/* Error message (if any) */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" 
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={onWhatsApp}
              className="px-8 py-4 text-lg font-bold bg-gradient-gold text-gray-900 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              DAFTAR SEKARANG
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={scrollToQualification}
              className="px-8 py-4 text-lg font-semibold border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
            >
              CEK KUALIFIKASI
            </button>
          </div>

          {/* Stats */}
          {loaded && stats.length > 0 && (
            <div 
              className="mt-16 pt-8 border-t border-white/10 animate-fade-in" 
              style={{ animationDelay: "1s" }}
            >
              <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                {stats.map((stat) => (
                  <div key={stat.sort_order} className="text-center">
                    <div className="text-3xl sm:text-4xl font-display font-bold text-accent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;