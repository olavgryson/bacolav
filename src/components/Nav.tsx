export default function Nav() {
  return (
    <nav className="nav-fade fixed top-0 right-0 left-0 z-100 flex items-center justify-between px-12 py-6">
      <div className="font-bebas relative text-[1.8rem] tracking-[0.15em] text-cream">
        BACOLAV
      </div>
      <ul className="relative flex list-none gap-10">
        {[
          ["Verhaal", "#story"],
          ["Ingrediënten", "#ingredients"],
          ["Pre-order", "#cta"],
        ].map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              className="text-[0.8rem] tracking-[0.2em] text-cream uppercase opacity-70 transition-opacity hover:opacity-100"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
