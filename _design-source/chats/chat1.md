# Bacolav Premium Scrollytelling

_Started 2026-05-04 14:10 UTC_

---

## User

Concept & Merk:
Ontwerp een premium, high-end scrollytelling landingpage voor een fictief, exclusief bacardicola merk genaamd "Bacolav". De website moet aanvoelen als een luxe, moderne Zuid-Europese merkbeleving (denk aan hoogwaardige gastronomie of ambachtelijke producten), maar dan met een subtiele, droge humoristische ondertoon.

Art Direction & Stijl:

    Typografie: Gebruik gigantische, expressieve lettertypes. De koppen (bijv. in een elegant of juist heel robuust schreeflettertype) moeten zo groot zijn dat ze als grafische elementen fungeren, schermvullend zijn en gelaagdheid creëren.

    Sfeer: De algehele uitstraling is warm, uitnodigend, filmisch en uiterst professioneel. Het draait om grote, gedurfde contrasten in de opmaak zonder rommelig te worden. Minimalistisch, maar met maximale impact.

Interactie & Scrollytelling (De Kernervaring):

    Vaste Focus: In het midden van het scherm staat een centraal, gefixeerd element: een bierkrat. Dit krat blijft in beeld terwijl de rest van de pagina scrolt.

    De Scroll Flow: De pagina bestaat uit meerdere hoge secties met sterke, korte copywriting die over of achter het centrale krat heen scrollen.

    De Hero-Animatie: Wanneer de gebruiker begint met scrollen, reageert de pagina hier direct op. Een los bierflesje komt vloeiend omhoog uit het krat. Naarmate men verder scrolt, zweeft dit flesje naar het middelpunt van de aandacht en maakt het een soepele 360-graden rotatie om zijn eigen as, zodat het "Bacolav" logo perfect en prominent in beeld komt.

Doel:
Het eindresultaat moet een boterzachte, interactieve presentatie zijn waarbij scrollen gelijk staat aan het vertellen van een verhaal en het onthullen van het product. Zorg voor een adembenemende eerste indruk.

## Assistant

_[tool: view_image]_

Geweldig logo — ik zie het meteen: warm, dramatisch, met die rum-cola energie en droge humor ("Gasolina in a bottle!"). Laat me dit bouwen.

**Mijn aanpak:**
- **Palet:** Diep zwart/donkerbruin achtergrond, vuurrood accent (#CC1414 tint), warm goud — direct uit het logo
- **Typografie:** Playfair Display (elegant schreefletter voor koppen) + DM Sans (clean body)
- **Scrollytelling:** Sticky bierkrat in viewport-midden, fles zweeft omhoog en roteert 360° terwijl je scrolt
- **Tone of voice:** Premium Zuid-Europees, maar met die droge knipoog ("60% rum. 100% fun. 0% apologies.")

_[tool: update_todos]_

Ik ga nu direct bouwen — geen vragen meer nodig, ik heb alles wat ik nodig heb!

_[tool: write_file]_

_[tool: show_html]_

_[tool: done]_

Schoon — geen fouten. Laat me de verifier erop loslaten.

_[tool: fork_verifier_agent]_

De pagina staat live! Hier is wat je hebt:

**Bacolav — Scrollytelling Landing Page**

- 🍺 **Sticky bierkrat** blijft centraal in beeld terwijl je scrolt
- 🍾 **Fles-animatie** in 3 fasen: opstijgen → schalen → 360° rotatie
- 📖 **Tekst panels** vliegen in/uit gesynchroniseerd met de scroll
- 🎨 **Donker, filmisch palet** — zwart/bruine achtergrond, vuurrood, warm goud — direct uit het logo
- ✍️ **Droge copywriting** ("60% rum. 100% fun. 0% apologies.")
- 🎛️ **Tweaks panel** (via toolbar) — accent kleur, fles schaal, animatiesnelheid

**Secties:** Hero → Scrollytelling zone → Verhaal → Ingrediënten → Stats → Quote → Logo → CTA → Footer

Wil je aanpassingen? Denk aan:
- Andere copy of toon
- Extra scroll-secties
- Achtergrond textuur of video-loop
- Ander typografie-karakter

## User

Verifier agent check completed

## Assistant

✅ Verifier goedgekeurd — alles ziet er goed uit!

Scroll door de pagina om de animatie te zien: de fles stijgt op uit het krat, zweeft omhoog en draait 360° terwijl je scrolt. Laat me weten als je iets wil aanpassen!

## User

ik heb een image die ik zou willen gebruiken als foto in de hero.

## Assistant

Prachtige foto! Warm licht, echte fles, filmische sfeer — perfect voor de hero. Ik verwerk hem meteen.

_[tool: read_file]_

_[tool: grep]_

Nu ga ik de hero updaten met de foto als full-bleed achtergrond — met een mooie filmische overlay zodat de tekst goed leesbaar blijft.

_[tool: str_replace_edit]_

Nu voeg ik de HTML-elementen toe in de hero sectie:

_[tool: str_replace_edit]_

Nu voeg ik een subtiele parallax-scrolleffect toe op de hero foto, en zorg ik dat de tekst mooi contrasteert:

_[tool: str_replace_edit]_

_[tool: done]_

✅ Schoon — de foto staat erin!

De hero heeft nu:
- **Full-bleed productfoto** met warm zonnelicht als achtergrond
- **Filmische overlay** — links donker zodat de tekst scherp afsteekt, rechts opent de foto zich
- **Warme kleurgrading** over de foto (subtle amber glow)
- **Parallax scrolleffect** — foto beweegt iets langzamer dan de tekst bij scrollen

Wil je nog meer aanpassingen? Bijv:
- De tekst-positie of grootte
- Foto anders uitsnijden (meer gericht op de fles)
- Een tweede foto ergens anders in de pagina verwerken

## User

ik ontbreek nog wat animaties op de website. Zou het mogelijk zijn om deze nog toe te voegen. ik heb het voornamelijk over het deel vanaf "het verhaal"

## Assistant

Laat me eerst de huidige staat van de story-secties bekijken zodat ik precies weet wat er is.

_[tool: read_file]_

Goed plan! Ik ga rijke, gevarieerde animaties toevoegen aan alle secties na het scrollytelling-deel. Denk aan:

- **"Het Verhaal"** — tekst slide van links, foto fade+scale in
- **"Ingrediënten"** — cards staggered omhoog één voor één
- **"Stats"** — nummers tellen op (counter animatie)
- **"Quote"** — dramatische fade met lichte scale
- **"Logo"** — glow pulse en fade in
- **"CTA"** — letters druppelen omlaag per regel

_[tool: read_file]_

Nu vervang ik het simpele reveal-systeem met een rijke animatie-engine voor alle secties:

_[tool: str_replace_edit]_

Nu voeg ik ook CSS toe voor de ingredient cards hover-animatie en een subtiele floating animatie op het logo:

_[tool: str_replace_edit]_

En een floating logo-animatie in CSS:

_[tool: str_replace_edit]_

Nu activeer ik de floating class op het logo zodra het in beeld komt, en voeg ik de stat glow toe:

_[tool: str_replace_edit]_

En stat numbers krijgen een glow animatie nadat ze uitgeteld zijn:

_[tool: str_replace_edit]_

Nu even checken en live zetten:

_[tool: done]_

✅ Geen fouten — alles werkt!

Hier is wat er nu geanimeerd is terwijl je scrolt:

**Nieuwe animaties:**
- 📖 **"Het Verhaal" & "De Filosofie"** — tekst glijdt van links in, foto van rechts (en omgekeerd voor de gespiegelde sectie). Eyebrow-tekst heeft een clip-reveal, de rode divider-lijn expandeert horizontaal
- 🃏 **Ingrediënten** — drie cards staggeren één voor één omhoog (elke 120ms vertraging). Hover = lift met schaduw
- 🔢 **Stats** — nummers tellen op van 0 naar eindwaarde, daarna een rode glow-pulse animatie
- 💬 **Quote** — dramatische scale + fade in vanuit het centrum
- 🏷️ **Logo** — fade+scale in met glow burst, daarna eeuwig zweeft het logo licht op en neer
- 📢 **CTA** — regels druppelen stuk voor stuk omlaag in
- **Section-lines** — horizontale wipe van links naar rechts

Scrول langzaam door de pagina om alles te zien! Wil je nog aanpassingen?

