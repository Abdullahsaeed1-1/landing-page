import Hero from "@/sections/Hero";
import ScrollVideoSection from "@/sections/ScrollVideoSection";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import CaseStudies from "@/sections/CaseStudies";
import About from "@/sections/About";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main className="bg-black text-[#ECE9E9]">
      <Hero />
      <ScrollVideoSection>
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <FinalCTA />
        <Footer />
      </ScrollVideoSection>
    </main>
  );
}
