import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}