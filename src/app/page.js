import Hero from "@/components/Home/Hero";
import Section from "@/components/Home/Section";
import Pricing from "@/components/Home/Pricing";
export default function Home() {
  return (
    <>
      <div className="w-full">
        <Hero />
        <Section />
        <Pricing/>
      </div>
    </>
  );
}
