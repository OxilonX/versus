import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
export default function Home() {
  return (
    <>
      <section className=" bg-background">
        <Hero />
      </section>
      <section className="bg-background py-15">
        <Features />
      </section>
    </>
  );
}
