import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  );
}
