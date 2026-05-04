import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollyScene from "@/components/ScrollyScene";
import StorySection from "@/components/StorySection";
import BgWord from "@/components/BgWord";
import HatchPlaceholder from "@/components/HatchPlaceholder";
import Ingredients from "@/components/Ingredients";
import Stats from "@/components/Stats";
import Quote from "@/components/Quote";
import LogoSection from "@/components/LogoSection";
import CtaSection from "@/components/CtaSection";
import SectionLine from "@/components/SectionLine";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ScrollyScene />

      <div id="story">
        <StorySection
          eyebrow="Het Verhaal"
          headline={
            <>
              Geboren
              <br />
              in een
              <br />
              <em className="text-red [font-style:italic]">krat.</em>
            </>
          }
          body={
            <>
              Ergens in het zuiden van Europa — of was het de keuken van oom
              Ricardo — werd dit drankje uitgevonden. Drie ingrediënten. Eén
              missie. Onbeperkt vermaak.
            </>
          }
          extra={
            <div className="font-bebas mt-6 inline-block bg-[oklch(0.15_0.04_40)] px-3 py-1 text-[1.1rem] tracking-[0.15em] text-gold">
              Est. 2024 · Fictief maar fel
            </div>
          }
          bgWord={
            <BgWord
              className="opacity-40"
              style={{ bottom: "-5vh", left: "-5vw" }}
            >
              RUM
            </BgWord>
          }
          image={
            <HatchPlaceholder
              containerWidth={300}
              containerHeight={400}
              width={300}
              height={400}
              patternId="hatch1"
              rotate={45}
              spacing={12}
              caption="[ sfeer foto — zon & krat ]"
            />
          }
        />

        <SectionLine />

        <StorySection
          rightAlign
          eyebrow="De Filosofie"
          headline={
            <>
              Simpel.
              <br />
              <em className="text-red [font-style:italic]">Sterk.</em>
              <br />
              Eerlijk.
            </>
          }
          body={
            <>
              We hebben geen ingewikkelde tasting notes. Het smaakt naar rum en
              cola. Dat is precies de bedoeling. Niets meer, niets minder — en
              dat is eigenlijk best veel.
            </>
          }
          image={
            <HatchPlaceholder
              containerWidth={340}
              containerHeight={280}
              width={340}
              height={280}
              patternId="hatch2"
              rotate={-30}
              spacing={16}
              caption="[ proces foto — handcraft ]"
            />
          }
        />
      </div>

      <SectionLine />
      <Ingredients />

      <SectionLine />
      <Stats />

      <Quote />
      <LogoSection />
      <CtaSection />
      <Footer />
    </>
  );
}
