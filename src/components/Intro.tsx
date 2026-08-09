"use client";

import { useRef, useState } from "react";
import BgWord from "./BgWord";
import RecordCrate, { type VinylRecord } from "./RecordCrate";

// Drop the mp3's in public/music/ under these names, or edit the paths.
const RECORDS: VinylRecord[] = [
  {
    title: "Gasolina",
    artist: "Zijde A",
    src: "/music/gasolina.mp3",
    color: "oklch(0.72 0.16 75)",
  },
  {
    title: "Ollandse Bus",
    artist: "Zijde A",
    src: "/music/ollandse-bus.mp3",
    color: "oklch(0.94 0.02 75)",
  },
  {
    title: "Cola Voor De Kleur",
    artist: "Zijde B",
    src: "/music/cola-voor-de-kleur.mp3",
    color: "oklch(0.55 0.20 25)",
  },
  {
    title: "Rum Riddim",
    artist: "Zijde A",
    src: "/music/rum-riddim.mp3",
    color: "oklch(0.65 0.14 145)",
  },
  {
    title: "Laatste Ronde",
    artist: "Zijde B",
    src: "/music/laatste-ronde.mp3",
    color: "oklch(0.60 0.13 250)",
  },
];

export default function Intro() {
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasTrack, setHasTrack] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const enter = () =>
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });

  const pick = (index: number | null) => {
    if (index === null) return;
    const audio = audioRef.current;
    if (audio) {
      audio.src = RECORDS[index].src;
      setHasTrack(true);
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false), // missing file or blocked — walk in regardless
      );
    }
    enter();
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused)
      audio.play().then(
        () => setPlaying(true),
        () => {},
      );
    else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" />

      <section className="relative h-screen w-full overflow-hidden bg-darker">
        <video
          src="/video/pov-opening-door.mp4"
          poster="/video/pov-opening-door-poster.jpg"
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-darker/25" />
        <p className="absolute top-1/2 left-1/2 w-[80vw] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(1rem,2.2vw,1.6rem)] leading-relaxed font-light text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Kzie dat je dust et. Kom ein drinken!
        </p>
        <a
          href="#platen"
          className="absolute bottom-[6vh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-60 transition-opacity hover:opacity-100"
        >
          <span className="text-[0.65rem] tracking-[0.3em] text-cream uppercase">
            Scroll
          </span>
          <span className="animate-scroll-pulse h-[60px] w-px bg-gradient-to-b from-cream to-transparent" />
        </a>
      </section>

      <section
        id="platen"
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-darker px-[6vw] py-[12vh]"
      >
        <BgWord
          className="opacity-60"
          style={{ top: "28vh", left: "50%", transform: "translateX(-50%)" }}
        >
          PLATEN
        </BgWord>

        <p className="font-display relative z-10 max-w-[16ch] text-center text-[clamp(2rem,5vw,4.2rem)] leading-[1.05] font-black text-cream italic">
          Kiest een <span className="text-red">plate</span> vo tijdens u
          rondleidinge
        </p>

        <div className="relative z-10 mt-[7vh] w-full max-w-[900px]">
          <RecordCrate
            records={RECORDS}
            selected={selected}
            onSelect={setSelected}
            onPick={pick}
          />
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-center">
          <div className="flex min-h-[3.4rem] flex-col items-center justify-start">
            {selected === null ? (
              <div className="text-[0.7rem] tracking-[0.3em] text-mute uppercase">
                Ga over een plate met de muis
              </div>
            ) : (
              <>
                <div className="font-bebas text-[1.6rem] leading-none tracking-[0.18em] text-gold">
                  {RECORDS[selected].title}
                </div>
                <div className="mt-2 text-[0.65rem] tracking-[0.3em] text-mute uppercase">
                  {RECORDS[selected].artist}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => pick(selected)}
            disabled={selected === null}
            className="font-bebas mt-8 cursor-pointer border border-gold px-10 py-3 text-[1.1rem] tracking-[0.2em] text-gold uppercase transition hover:bg-gold hover:text-dark disabled:cursor-not-allowed disabled:border-line-strong disabled:text-mute-dim disabled:hover:bg-transparent"
          >
            Zet op
          </button>
          <button
            type="button"
            onClick={enter}
            className="mt-5 cursor-pointer text-[0.7rem] tracking-[0.3em] text-mute uppercase transition hover:text-cream"
          >
            Liever stilte
          </button>
        </div>
      </section>

      {hasTrack && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Muziek pauzeren" : "Muziek afspelen"}
          className="fixed bottom-6 left-6 z-90 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-dark/80 text-gold backdrop-blur transition hover:border-gold"
        >
          <span
            className={`block h-4 w-4 rounded-full border-2 border-current ${
              playing ? "animate-[spin_3.6s_linear_infinite]" : "opacity-50"
            }`}
          >
            <span className="block h-full w-full scale-[0.25] rounded-full bg-current" />
          </span>
        </button>
      )}
    </>
  );
}
