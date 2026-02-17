import CategoryBar from "@/components/home/CategoryBar";
import AboutSection from "@/components/home/AboutSection";
import NewArrivalsSection from "@/components/home/Newarrivalssection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactSection from "@/components/home/Contactsection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="pt-12 md:pt-16">
        <CategoryBar />
      </div>
      <AboutSection />
      <NewArrivalsSection />
      <WhyChooseUs />
      <div className="relative">
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
