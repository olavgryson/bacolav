export default function Footer() {
  return (
    <footer className="relative z-30 flex items-center justify-between border-t border-line px-[6vw] py-16">
      <div className="font-bebas text-[2rem] tracking-[0.15em] text-mute-dim">
        BACOLAV
      </div>
      <div className="text-[0.7rem] tracking-[0.1em] text-mute-dim">
        © {new Date().getFullYear()} Bacolav B.V. · Drink met verstand · 18+
      </div>
    </footer>
  );
}
