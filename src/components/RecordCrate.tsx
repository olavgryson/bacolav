"use client";

export interface VinylRecord {
  /** Title printed on the label. */
  title: string;
  /** Second line on the label. */
  artist: string;
  /** Audio file under /public. */
  src: string;
  /** Label colour. */
  color: string;
}

interface Props {
  records: VinylRecord[];
  selected: number | null;
  /** A record was pulled out of the crate. */
  onSelect: (index: number) => void;
  /** The record that was already out got clicked again. */
  onPick: (index: number) => void;
}

/** Photographed plank grain; the gradient over it is the light on that face. */
const PLANKS = "url(/uploads/wood.webp)";

const WOOD_FRONT = `linear-gradient(180deg, rgba(255,225,190,0.14) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 100%), ${PLANKS}`;
const WOOD_RIM = `linear-gradient(180deg, rgba(255,230,195,0.30) 0%, rgba(0,0,0,0.25) 100%), ${PLANKS}`;
const WOOD_BACK = `linear-gradient(180deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.94) 100%), ${PLANKS}`;

export default function RecordCrate({
  records,
  selected,
  onSelect,
  onPick,
}: Props) {
  return (
    <div className="relative w-full [--disc:clamp(115px,15vw,205px)] [--lift:0]">
      {/* Bare bulb hanging over the crate */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: "calc(var(--disc) * -1.1)",
          width: "calc(var(--disc) * 5)",
          height: "calc(var(--disc) * 3.4)",
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.58 0.11 70 / 0.40) 0%, oklch(0.36 0.08 55 / 0.15) 40%, transparent 72%)",
        }}
      />

      {/* Slight look-down on the whole crate */}
      <div
        className="relative mx-auto w-fit"
        style={{ transform: "perspective(1600px) rotateX(7deg)" }}
      >
        {/* Back wall */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
          style={{
            height: "calc(var(--disc) * 0.74)",
            background: WOOD_BACK,
            backgroundSize: "auto, calc(var(--disc) * 2.4) auto",
            boxShadow: "inset 0 26px 46px rgba(0,0,0,0.85)",
          }}
        />

        {/* The records, filed on edge */}
        <div className="relative z-10 flex items-end px-[calc(var(--disc)*0.13)] pt-[calc(var(--disc)*0.62)]">
          {records.map((record, index) => (
            <Record
              key={record.src}
              record={record}
              index={index}
              count={records.length}
              out={index === selected}
              onClick={() =>
                index === selected ? onPick(index) : onSelect(index)
              }
            />
          ))}
        </div>

        {/* Front panel — records vanish behind it, which is where the depth is */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{
            height: "calc(var(--disc) * 0.54)",
            background: WOOD_FRONT,
            backgroundSize: "auto, calc(var(--disc) * 2.4) auto",
            boxShadow:
              "0 34px 70px rgba(0,0,0,0.8), inset 0 -3px 0 oklch(0.24 0.05 45)",
          }}
        >
          {/* Thickness of the front board, laid back toward the records */}
          <span
            className="absolute inset-x-0 bottom-full block"
            style={{
              height: "calc(var(--disc) * 0.07)",
              transformOrigin: "bottom center",
              transform: "perspective(700px) rotateX(-68deg)",
              background: WOOD_RIM,
              backgroundSize: "auto, calc(var(--disc) * 2.4) auto",
            }}
          />
          <span className="font-bebas absolute bottom-[16%] left-1/2 -translate-x-1/2 text-[clamp(0.7rem,1.5vw,1.05rem)] tracking-[0.45em] whitespace-nowrap text-cream/15">
            BACOLAV
          </span>
        </div>
      </div>

      {/* Contact shadow on the floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{
          bottom: "calc(var(--disc) * -0.1)",
          width: "calc(var(--disc) * 3.1)",
          height: "calc(var(--disc) * 0.42)",
          background: "rgba(0,0,0,0.9)",
        }}
      />
    </div>
  );
}

function Record({
  record,
  index,
  count,
  out,
  onClick,
}: {
  record: VinylRecord;
  index: number;
  count: number;
  out: boolean;
  onClick: () => void;
}) {
  return (
    // The button is a slab-shaped hit area that never rotates, so an edge-on
    // record stays clickable instead of collapsing to a two-pixel target.
    <button
      type="button"
      onClick={onClick}
      aria-pressed={out}
      // `--lift` runs 0..1 from filed away to pulled out. Hover and focus set it
      // through the cascade; the chosen record pins it inline so it stays out.
      className="group relative shrink-0 cursor-pointer outline-none hover:[--lift:1] focus-visible:[--lift:1]"
      style={{
        width: "calc(var(--disc) * 0.36)",
        height: "var(--disc)",
        zIndex: `calc(${count - index} + 30 * var(--lift))`,
        ["--i" as string]: index,
        ...(out ? { ["--lift" as string]: 1 } : null),
        perspective: "calc(var(--disc) * 7)",
        filter: "brightness(calc(0.66 + 0.34 * var(--lift)))",
        transition: "filter 0.75s ease",
      }}
    >
      <span
        className="pointer-events-none absolute top-0 left-1/2 block aspect-square"
        style={{
          width: "var(--disc)",
          // Filed away edge-on at 90°; lifting turns it 70° into the light.
          transform:
            "translateX(-50%) " +
            "translateY(calc(var(--disc) * -0.44 * var(--lift))) " +
            "translateZ(calc(var(--disc) * (0.5 * var(--lift) - 0.03 * var(--i)))) " +
            "rotateY(calc(-80deg + 70deg * var(--lift))) " +
            "rotateZ(calc((var(--i) - 2) * 1.4deg * (1 - var(--lift))))",
          transformOrigin: "50% 100%",
          transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 block rounded-full shadow-[0_34px_54px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,220,175,0.10)]"
          style={{
            // Records further back sit deeper in the shadow of the crate.
            filter: "brightness(calc(1 - 0.1 * var(--i) * (1 - var(--lift))))",
            backgroundImage: "url(/uploads/vinyl.webp)",
            backgroundSize: "cover",
          }}
        />

        {/* Paper label */}
        <span
          className="pointer-events-none absolute top-1/2 left-1/2 flex aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
          style={{ background: record.color }}
        >
          <span className="font-bebas px-2 text-[0.72rem] leading-tight tracking-[0.08em] text-dark uppercase">
            {record.title}
          </span>
          <span className="mt-0.5 text-[0.45rem] tracking-[0.2em] text-dark/70 uppercase">
            {record.artist}
          </span>
          <span className="absolute h-[9%] w-[9%] rounded-full bg-darker" />
        </span>
      </span>
    </button>
  );
}
