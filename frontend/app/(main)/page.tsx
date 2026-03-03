import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Signature from "@/components/sections/Signature";
import Battles from "@/components/sections/Battles";
import Faq from "@/components/sections/Faq";
export default function Home() {
  return (
    <>
      <section className=" bg-background">
        <Hero />
      </section>
      <section className="bg-background py-15">
        <Features />
      </section>
      <section className="bg-background py-15">
        <Battles />
      </section>
      <section className="bg-background py-15">
        <Signature />
      </section>
      <section className="bg-background py-15">
        <Faq />
      </section>
    </>
  );
}
