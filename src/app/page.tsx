import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollyScene from "@/components/ScrollySceneClient";
import StorySection from "@/components/StorySection";
import BgWord from "@/components/BgWord";
import Image from "next/image";
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
      <Intro />
      <Nav />
      <Hero />
      <ScrollyScene />

      <div id="story">
        <StorySection
          eyebrow="De Oorsprong"
          headline={
            <>
              van
              <br />
              <em className="text-red [font-style:italic]">Bacolav.</em>
            </>
          }
          body={
            <>
              Ergens achterin een bus op weg naar Amsterdam werd de naam geboren.
              Eigenlijk moet de officiële werknaam Balav zijn. Maar Bacolav rolde net iets
              beter van de tong. Ook al dekt het de lading totaal niet.
              <br />
              <br />
              &quot;Cola is voor de kleur&quot;
            </>
          }
          extra={
            <div className="font-bebas mt-6 inline-block bg-[oklch(0.15_0.04_40)] px-3 py-1 text-[1.1rem] tracking-[0.15em] text-gold">
              Est. 2024 · Ergens in een Ollandse bus
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
            <Image
              src="/uploads/story-bus.png"
              alt="Fles Bacolav op een busstoel"
              width={1024}
              height={1024}
              className="w-[300px] h-[400px] object-cover"
            />
          }
        />

        <SectionLine />

        <StorySection
          rightAlign
          eyebrow="Het Recept"
          headline={
            <>
              Cola is
              <br />
              voor de
              <br />
              <em className="text-red [font-style:italic]">kleur.</em>
            </>
          }
          body={
            <>
              Laat je niet misleiden door de naam. Er is bar weinig cola aanwezig in
              dit drankje. We voegen exact genoeg toe om het een kleurtje te geven,
              de rest is rum. Simpel, sterk, en recht voor z'n raap.
            </>
          }
          image={
            <Image
              src="/uploads/story-proces.png"
              alt="Proces foto — handcraft"
              width={1024}
              height={1024}
              className="w-[500px] h-[400px] object-cover"
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
