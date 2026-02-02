import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import LearningSection from "@/components/landing/LearningSection";
import TimelineSection from "@/components/landing/TimelineSection";
import RoadmapSection from "@/components/landing/RoadmapSection";
import FitSection from "@/components/landing/FitSection";
import MentorSection from "@/components/landing/MentorSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import FloatingCTA from "@/components/landing/FloatingCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <LearningSection />
      <TimelineSection />
      <RoadmapSection />
      <FitSection />
      <MentorSection />
      <FAQSection />
      <CTASection />
      <FloatingCTA />
    </main>
  );
};

export default Index;
