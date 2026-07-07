import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { DashboardPreview } from "@/components/home/DashboardPreview";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DashboardPreview />
    </main>
  );
}
