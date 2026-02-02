import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Mentor {
  id: string;
  title: string;
  bio: string;
  quote: string;
}

interface Credential {
  id: string;
  icon: string;
  text: string;
  sort_order: number;
}

const IconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Award: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Briefcase: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  GraduationCap: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-4.5m8 4.5v-4.5" />
    </svg>
  ),
};

const MentorSection = () => {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("mentors").select("*").single(),
      supabase.from("mentor_credentials").select("*").order("sort_order", { ascending: true }),
    ]).then(([mentorRes, credRes]) => {
      if (mentorRes.data) setMentor(mentorRes.data);
      if (credRes.data) setCredentials(credRes.data);
    });
  }, []);

  if (!mentor) return null;

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Mentor</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4">
            Dibimbing Langsung oleh Praktisi
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-md border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar Placeholder */}
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gray-800 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-display font-bold text-accent">M</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {mentor.title}
                </h3>
                <p className="text-muted-foreground mb-6">{mentor.bio}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {credentials.map((cred) => {
                    const Icon = IconMap[cred.icon];
                    return (
                      <div key={cred.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        {Icon && <Icon className="w-5 h-5 text-accent" />}
                        <span className="text-sm text-foreground">{cred.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex gap-4">
                <svg className="w-10 h-10 text-accent/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 14s2-1 2-4-2-5-4-5-4 2-4 5 2 4 2 4h4zm-8 0s2-1 2-4-2-5-4-5-4 2-4 5 2 4 2 4h4z" />
                </svg>
                <blockquote className="text-lg md:text-xl text-foreground italic leading-relaxed">
                  "{mentor.quote}"
                </blockquote>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-muted-foreground">
            <span className="text-accent font-semibold">Bukan teori, full praktik.</span> Yang kamu pelajari adalah apa yang mentor lakukan setiap hari.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;