import { Button } from '@/components/ui/button';
import { Sparkles, Leaf, Heart } from 'lucide-react';

interface HeroSectionProps {
  onStartPractice: () => void;
}

export const HeroSection = ({ onStartPractice }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/30 animate-breathe" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-orange-200/30 animate-breathe" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-emerald-100/40 animate-float" />
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-sky-100/30 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative mx-auto px-4 py-20">
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-emerald-700 shadow-md border border-emerald-100">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              AI-Powered Yoga Assistant
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 font-serif text-5xl font-medium leading-tight text-stone-800 md:text-6xl lg:text-7xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Find Your <span className="text-emerald-600">Inner Peace</span>
            <br />
            Through Movement
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg text-stone-600 md:text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Practice yoga with real-time AI guidance that analyzes your pose, 
            provides voice instructions, and helps you perfect every movement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="zen" size="xl" onClick={onStartPractice}>
              <Leaf className="mr-2 h-5 w-5" />
              Start Your Practice
            </Button>
            <Button variant="outline" size="xl" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="mt-20 grid gap-6 sm:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-emerald-600" />}
              title="AI Pose Detection"
              description="Real-time analysis of your yoga poses using advanced machine learning"
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6 text-orange-500" />}
              title="Voice Guidance"
              description="Calming voice instructions guide you through each pose step by step"
            />
            <FeatureCard
              icon={<Leaf className="h-6 w-6 text-emerald-600" />}
              title="Personal Progress"
              description="Track your practice, improve your form, and celebrate your growth"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="rounded-2xl bg-white/80 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-stone-100 backdrop-blur-sm">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
      {icon}
    </div>
    <h3 className="mb-2 font-serif text-lg font-medium text-stone-800">{title}</h3>
    <p className="text-sm text-stone-600">{description}</p>
  </div>
);
