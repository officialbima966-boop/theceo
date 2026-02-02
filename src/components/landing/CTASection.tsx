import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import WhatsAppCTA from "./WhatsAppCTA";

const CTASection = () => {
  const [email, setEmail] = useState("info@example.com");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "contact_email")
      .single()
      .then(({ data }) => { if (data?.value) setEmail(data.value); });
  }, []);

  return (
    <section className="py-24 md:py-32 bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-accent/30 rounded-full">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-white/80">Kuota Terbatas • Batch Akan Segera Ditutup</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Kesempatan Ini{" "}
            <span className="text-gradient-gold">Tidak untuk Semua Orang</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Kuota terbatas. Seleksi ketat.
            <br />
            <span className="text-white font-medium">Jika kamu merasa layak, buktikan.</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-6">
            <WhatsAppCTA className="px-12 py-5 text-xl" />
            <div className="flex items-center gap-2 text-sm text-white/60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Pendaftaran gratis • Tanpa komitmen finansial</span>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">
              Pertanyaan? Hubungi kami di{" "}
              <a href={`mailto:${email}`} className="text-accent hover:underline">
                {email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;