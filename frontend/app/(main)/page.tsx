import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Signature from "@/components/sections/Signature";
export default function Home() {
  return (
    <>
      <section className=" bg-background">
        <Hero />
      </section>
      <section className="bg-background py-15">
        <Features />
      </section>
      <section className="bg-background">
        <Signature />
      </section>
    </>
  );
}
