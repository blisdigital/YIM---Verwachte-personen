# Design Tokens — Verwachte Personen Prototype

Dit document definieert alle design tokens voor het YIM Verwachte Personen prototype.
Gebruik deze variabelen consequent in alle componenten.

> **Relatie met `brand.md`**
> `brand.md` is de spiegel van de YIM UI Kit in Figma — de *source of truth* voor wat het design system definieert.
> Dit bestand (`TOKENS.md`) beschrijft hoe het prototype die foundations implementeert als CSS custom properties, plús de prototype-specifieke toevoegingen (status badges, VIP, icons, z-index, breakpoints) die niet in de kit zitten.
> Waar dit bestand afwijkt van de kit, wordt dat expliciet benoemd via een "Figma mapping" kolom of ⚠ markering.
>
> **Gewijzigd in deze revisie** (t.o.v. eerdere versie)
>
> - Kleur-hexwaardes uitgelijnd met Figma (`--p300`, `--p900`, `--n100`, `--n700` waren gedrift)
> - Semantische kleuren (`--ok`, `--warn`, `--err`, `--info`) gebruiken nu de Figma Info/Success/Warning/Error schalen — consistent met de status-badge CSS
> - Spacing en corner-radius tabellen tonen nu de Figma-tegenhanger per token
> - Prototype-only toevoegingen (`--sp-m 12px`, `--sp-xl 20px`, `--r-l 12px`, typografie) expliciet gemarkeerd
> - `--n200` toegevoegd (was al gebruikt in specs maar ontbrak in tokens)

---

## Kleuren

### Primair (Teal)

Gebruikt voor interactieve elementen, accenten en branding. Alle waardes komen 1:1 uit de Figma Brand schaal.

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--p50` | `#f0f7f8` | `Color / Brand / P50` | Hover backgrounds, subtle fills |
| `--p100` | `#d6e8ec` | `Color / Brand / P100` | Selected states, pill backgrounds |
| `--p300` | `#a2cbd3` | `Color / Brand / P300` | Borders (hover) |
| `--p400` | `#87bdc6` | `Color / Brand / P400` | Mid-tint — hover fills, focus rings |
| `--p500` | `#6daeba` | `Color / Brand / P500` | **Primary** — buttons, links, active states |
| `--p600` | `#598f99` | `Color / Brand / P600` | Sidebar active item background |
| `--p700` | `#315161` | `Color / Brand / P700` | Text on light backgrounds, headings; sidebar background |
| `--p800` | `#243f4c` | `Color / Brand / P800` | Darker text variants |
| `--p900` | `#132a35` | `Color / Brand / P900` | Darkest, rarely used |

### Neutraal (Grijs)

Voor tekst, borders, achtergronden. Alle waardes komen 1:1 uit de Figma Neutrals schaal.

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--n0` | `#ffffff` | `Color / Neutrals / N0` | **Page background**, white surfaces |
| `--n50` | `#f8fafb` | `Color / Neutrals / N50` | Subtle contrast, hover fills |
| `--n100` | `#f3f4f5` | `Color / Neutrals / N100` | Card backgrounds, dividers |
| `--n200` | `#ebeced` | `Color / Neutrals / N200` | Toggle hover track, button pressed state, tabel rij-borders |
| `--n300` | `#eaeced` | `Color / Neutrals / N300` | Borders, separators |
| `--n400` | `#b8babb` | `Color / Neutrals / N400` | Input borders, disabled elements |
| `--n500` | `#999a9b` | `Color / Neutrals / N500` | Placeholder text, subtle icons |
| `--n600` | `#7b7c7d` | ⚠ *prototype-only* | Tertiary text, subtitle kleuren |
| `--n700` | `#5d5e5e` | `Color / Neutrals / N700` | Secondary text |
| `--n800` | `#3e3f40` | `Color / Neutrals / N800` | Body text |
| `--n900` | `#1d1e1f` | `Color / Neutrals / N900` | Primary text, headings |
| `--n1000` | `#111313` | `Color / Neutrals / N1000` | Deepest neutral — shadow base colour (`rgba(17,19,19,…)`) |

### Semantisch

Voor feedback en status communicatie. De semantische tokens gebruiken nu de Figma Info (B), Success (G), Warning (Y) en Error (R) schalen — dezelfde waardes als de status-badges hieronder.

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--ok` | `#24bb86` | `Color / Success / G500` | Success text/icons |
| `--ok-bg` | `#e9f8f3` | `Color / Success / G50` | Success background |
| `--warn` | `#9f871c` | `Color / Warning / Y700` | Warning text/icons |
| `--warn-bg` | `#fefbea` | `Color / Warning / Y50` | Warning background |
| `--warn-y500` | `#f8d32c` | `Color / Warning / Y500` | Status dot fill — "Nog niet aangekomen" (accent only, niet voor tekst) |
| `--err` | `#bc243b` | `Color / Error / R500` | Error text/icons |
| `--err-bg` | `#f8e9eb` | `Color / Error / R50` | Error background |
| `--err-hover` | `#a01e32` | ⚠ *prototype-only* | Destructive button hover (10% darker than R500) |
| `--err-active` | `#871929` | ⚠ *prototype-only* | Destructive button pressed (20% darker than R500) |
| `--info` | `#2464bb` | `Color / Info / B500` | Info text/icons |
| `--info-bg` | `#e9f0f8` | `Color / Info / B50` | Info background |

> **Waarom Y700 voor `--warn`?** `Y500 #f8d32c` (het "hoofdgeel") voldoet niet aan WCAG-contrast op lichte achtergronden. `Y700` is een donkerder geel-bruin en is veilig voor tekst. De status-niet-aangekomen badge gebruikt om dezelfde reden Y700 op Y50.

### VIP

Speciale styling voor VIP bezoekers. ⚠ **Prototype-specifiek** — geen equivalent in de YIM UI Kit.

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--vip` | `#92400e` | VIP text |
| `--vip-bg` | `#fef3c7` | VIP background |
| `--vip-border` | `#f59e0b` | VIP border, star icon |

Als de kit in de toekomst een VIP/highlight schaal toevoegt: vervangen door die tokens.

### Status Badges

Specifieke kleuren voor de 5 statuswaarden. Pill-shaped (`border-radius: 360px`). Alle background/color paren komen uit de Figma semantische schalen.

```css
/* Verwacht — Info */
.status-verwacht {
  background: #e9f0f8;  /* B50  */
  color: #2464bb;       /* B500 */
}

/* Aangekomen — Success */
.status-aangekomen {
  background: #e9f8f3;  /* G50  */
  color: #24bb86;       /* G500 */
}

/* Vertrokken — Neutral */
.status-vertrokken {
  background: #ebeced;  /* N200 */
  color: #999a9b;       /* N500 */
}

/* Niet aangekomen — Warning */
.status-niet-aangekomen {
  background: #fefbea;  /* Y50  */
  color: #9f871c;       /* Y700 */
}

/* Geannuleerd — Error */
.status-geannuleerd {
  background: #f8e9eb;  /* R50  */
  color: #bc243b;       /* R500 */
}
```

---

## Spacing

Consistente spacing schaal gebaseerd op een 4 px grid. Het prototype gebruikt een dichtere schaal dan de YIM UI Kit — twee stappen (12 px en 20 px) zijn niet in Figma aanwezig.

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--sp-xs` | `4px` | `Spacing-xs` | Tight spacing, icon gaps |
| `--sp-s` | `8px` | `Spacing-s` | Small gaps, compact elements |
| `--sp-m` | `12px` | ⚠ *niet in Figma* | Medium padding, standard gaps |
| `--sp-l` | `16px` | `Spacing-m` | Large padding, section spacing |
| `--sp-xl` | `20px` | ⚠ *niet in Figma* | Extra large |
| `--sp-xxl` | `24px` | `Spacing-l` | Section margins, generous spacing |

> **Let op — naam-verschuiving.** Het prototype en Figma gebruiken andere naamgeving voor dezelfde waardes:
> prototype `--sp-l` = 16 px = Figma `Spacing-m`, prototype `--sp-xxl` = 24 px = Figma `Spacing-l`.
> De CSS variabelnamen zijn hier ongewijzigd gelaten om bestaande prototype-code niet te breken. Voor productie: overwegen hernoemen of migreren naar de Figma namen.

**Vuistregel:**

- Binnen componenten: `--sp-s` tot `--sp-m`
- Tussen componenten: `--sp-l` tot `--sp-xxl`
- Page margins: `48px` (niet in tokens)

---

## Border Radius

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--r-s` | `4px` | `Corner-s` | Buttons, inputs, small cards |
| `--r-m` | `8px` | `Corner-m` | Cards, dropdowns, panels |
| `--r-l` | `12px` | ⚠ *niet in Figma* | Modals, large cards |
| `--r-xl` | `360px` | `Corner-360` | Pills, avatars (fully rounded) |

> `--r-l 12px` ligt tussen Figma's `Corner-m` (8) en `Corner-l` (16). Voor productie: overwegen te vervangen door `Corner-l` (16 px) of deze stap toe te voegen aan de kit.

---

## Typography

### Font Family

```css
--font: 'Nunito', sans-serif;
```

Laad via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
```

Dit komt overeen met `Typography/Font/Header` en `Typography/Font/Body` uit de Figma kit (beide Nunito).

### Font Sizes

⚠ **De prototype-schaal wijkt substantieel af van de Figma type-scale.** Het prototype gebruikt context-specifieke sizes (17 px card title, 10 px label) die niet in de kit zitten. Voor productie aanbevolen: migreren naar de Figma Display / H1–H5 / Body L–S / Label L–S / Caption schaal (zie `brand.md`).

| Context | Size | Weight | Line Height | Dichtstbijzijnde Figma |
| --- | --- | --- | --- | --- |
| Page title | `40px` | `700` | `48px` | `Header/H1` (40/48) |
| Section title | `18px` | `700` | `24px` | `Header/H5` (18/24) |
| Card title | `17px` | `700` | — | ⚠ geen directe match |
| Body text | `14px` | `400` | `20px` | `Body/Body M` (14/20) |
| Caption | `12px` | `400/600` | `16px` | `Body/Body S` (400) of `Labels/Label S` (600) |
| Sectie-label | `11px` | `700` uppercase | — | ⚠ geen directe match — kleinste Figma label is 12 px |
| Status badge | `12px` | `600` | `16px` | `Labels/Label S` (12/16/600) |

### Letter Spacing

- Labels/uppercase: `0.6px` - `0.7px`
- Body text: `0.14px`
- Buttons: `0.14px`

De Figma Label schaal gebruikt 1% letter-spacing (`0.16/0.14/0.12px` voor L/M/S) — vergelijkbaar. Het prototype's `0.6–0.7px` voor uppercase labels is hoger (~6–7%), passend bij de kleine 10 px schaal.

---

## Shadows

Vier shadow-tokens zijn opgenomen in `_tokens.css`. De meeste Figma Elevation-niveaus gebruiken `rgba(17,19,19,…)` als kleur (N1000); `--shadow-l` en `--shadow-panel` gebruiken transparant zwart omdat ze zwaarder of directioneel zijn. Voor productie aanbevolen: volledig afstemmen op de Figma Elevation-schaal (zie `brand.md → Elevations`).

| Token | Waarde | Figma | Gebruik |
| --- | --- | --- | --- |
| `--shadow-xs` | `0 1px 2px rgba(17,19,19,.08), 0 1px 4px rgba(17,19,19,.12)` | `Elevation/xs` | Tabelrijen |
| `--shadow-s` | `0 2px 8px rgba(17, 19, 19, 0.16)` | `Elevation/s` | Button hover, compliance pill tooltip |
| `--shadow-m` | `0 4px 16px -2px rgba(17, 19, 19, 0.16)` | `Elevation/m` | Dropdowns, popovers, menus |
| `--shadow-l` | `0 8px 16px -2px rgba(17, 19, 19, 0.16)` | `Elevation/l` | Floating panels, grote popovers |
| `--shadow-xl` | `0 12px 16px -4px rgba(17, 19, 19, 0.20)` | `Elevation/xl` | Modals, dialogs |
| `--shadow-panel` | `-4px 0 24px rgba(0, 0, 0, 0.12)` | geen directe match | Detail panel (slide-in rechts) |

> **Sidebar shadow** (`AppHeader.vue` — `2px 0 16px rgba(0,0,0,0.15)`) is directioneel tegenovergesteld aan `--shadow-panel` en niet als token opgenomen.

### Popup tokens

⚠ **Prototype-specifiek** — afgeleide tokens voor de check-in/out en annuleren flows. Nog geen definitief Figma-ontwerp; waardes gebaseerd op semantische tokens.

| Token | Waarde | Gebruik |
| --- | --- | --- |
| `--popup-person-bg` | `var(--n50)` | Persoon-card achtergrond in popup |
| `--popup-field-bg` | `var(--n0)` | Formulier veld achtergrond |
| `--popup-field-border` | `var(--n400)` | Formulier veld rand (rust) |
| `--popup-field-radius` | `var(--r-s)` | Formulier veld hoekafronding |
| `--popup-warn-bg` | `var(--warn-bg)` | Waarschuwingsblok achtergrond |
| `--popup-warn-icon` | `var(--warn)` | Waarschuwingsblok icon kleur |
| `--popup-cancel-bg` | `var(--err-bg)` | Annuleren-blok achtergrond |
| `--popup-cancel-border` | `#eac8cc` | Annuleren-blok rand (err-bg verdonkerd) |
| `--popup-cancel-icon` | `var(--err)` | Annuleren-blok icon kleur |

---

## Icons

⚠ **Prototype-specifiek** — de Figma kit gebruikt geen specifieke icon set. Material Icons Rounded via Google Fonts:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
```

Gebruik met de `.mi` utility class:

```css
.mi {
  font-family: 'Material Icons Round';
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  white-space: nowrap;
  font-size: 18px;
  vertical-align: middle;
  user-select: none;
}
```

### Veelgebruikte icons

| Context | Icon |
| --- | --- |
| Inchecken | `login` |
| Uitchecken | `logout` |
| Niet aangekomen | `person_off` |
| Annuleren | `cancel` |
| Pas koppelen | `badge` |
| Pas printen | `print` |
| Bewerken | `edit` |
| Verwijderen | `delete` |
| VIP ster | `star` |
| Zoeken | `search` |
| Filter | `filter_list` |
| Kalender | `today` |
| Compliance OK | `check_circle` |
| Compliance Warn | `warning` |
| Telefoon | `phone` |
| Email | `mail` |
| Meer opties | `more_horiz` |
| Navigatie prev | `chevron_left` |
| Navigatie next | `chevron_right` |

---

## Z-Index Schaal

⚠ **Prototype-specifiek** — niet in de YIM UI Kit.

| Layer | Z-Index | Gebruik |
| --- | --- | --- |
| Base | `1` | Inline elevated elements |
| Dropdown backdrop | `100` | Click-away overlay achter dropdowns/panels |
| Dropdown button | `101` | Instellingen-button (boven eigen backdrop) |
| Dropdown / Panel | `102` | Kolominstellingen panel, Instellingen menu |
| Sidebar dismiss | `140` | Transparante click-capture laag achter sidebar |
| Sidebar | `150` | Nav sidebar (schuift in van links) |
| Header | `200` | App header (sticky, boven alles in page content) |
| Detail panel | `250` | Detail panel (slide-out rechts) |
| Modal | `500` | Modal overlay |
| Toast | `1000` | Toast notifications |

---

## Breakpoints

⚠ **Prototype-specifiek** — niet in de YIM UI Kit. Het prototype is primair desktop-first, met tablet ondersteuning.

| Breakpoint | Width | Context |
| --- | --- | --- |
| Desktop | `≥1280px` | Volledige tabel |
| Tablet | `768px - 1279px` | Compacte tabel, hamburger menu |
| Mobile | `<768px` | Niet primair ondersteund (receptie use case) |

---

## CSS Custom Properties (volledig)

```css
:root {
  /* Primary (Teal) — Figma: Color / Brand / P* */
  --p50:  #f0f7f8;
  --p100: #d6e8ec;
  --p300: #a2cbd3;
  --p400: #87bdc6;
  --p500: #6daeba;
  --p600: #598f99;
  --p700: #315161;
  --p800: #243f4c;
  --p900: #132a35;

  /* Neutral (Grey) — Figma: Color / Neutrals / N* */
  --n0:    #ffffff;
  --n50:   #f8fafb;
  --n100:  #f3f4f5;
  --n200:  #ebeced;
  --n300:  #eaeced;
  --n400:  #b8babb;
  --n500:  #999a9b;
  --n600:  #7b7c7d;  /* ⚠ prototype-only */
  --n700:  #5d5e5e;
  --n800:  #3e3f40;
  --n900:  #1d1e1f;
  --n1000: #111313;  /* shadow base colour */

  /* Semantic — Figma: Info (B), Success (G), Warning (Y), Error (R) */
  --ok:        #24bb86;  /* G500 */
  --ok-bg:     #e9f8f3;  /* G50  */
  --warn:      #9f871c;  /* Y700 */
  --warn-bg:   #fefbea;  /* Y50  */
  --warn-y500: #f8d32c;  /* Y500 — status dot accent, niet voor tekst */
  --err:       #bc243b;  /* R500 */
  --err-bg:    #f8e9eb;  /* R50  */
  --err-hover:  #a01e32; /* ⚠ prototype-only */
  --err-active: #871929; /* ⚠ prototype-only */
  --info:      #2464bb;  /* B500 */
  --info-bg:   #e9f0f8;  /* B50  */

  /* VIP — prototype-specific, not in Figma */
  --vip:        #92400e;
  --vip-bg:     #fef3c7;
  --vip-border: #f59e0b;

  /* Spacing — Figma: Spacing-* (12px and 20px are prototype-only) */
  --sp-xs:  4px;   /* Spacing-xs */
  --sp-s:   8px;   /* Spacing-s  */
  --sp-m:   12px;  /* ⚠ prototype-only */
  --sp-l:   16px;  /* Spacing-m  */
  --sp-xl:  20px;  /* ⚠ prototype-only */
  --sp-xxl: 24px;  /* Spacing-l  */

  /* Border Radius — Figma: Corner-* (12px is prototype-only) */
  --r-s:  4px;    /* Corner-s   */
  --r-m:  8px;    /* Corner-m   */
  --r-l:  12px;   /* ⚠ prototype-only */
  --r-xl: 360px;  /* Corner-360 */

  /* Shadows — Figma Elevation tokens */
  --shadow-xs:    0 1px 2px rgba(17, 19, 19, 0.08), 0 1px 4px rgba(17, 19, 19, 0.12); /* Elevation/xs */
  --shadow-s:     0 2px 8px rgba(17, 19, 19, 0.16);                /* Elevation/s  */
  --shadow-m:     0 4px 16px -2px rgba(17, 19, 19, 0.16);          /* Elevation/m  */
  --shadow-l:     0 8px 16px -2px rgba(17, 19, 19, 0.16);          /* Elevation/l  */
  --shadow-xl:    0 12px 16px -4px rgba(17, 19, 19, 0.20);         /* Elevation/xl */
  --shadow-panel: -4px 0 24px rgba(0, 0, 0, 0.12);                 /* directional  */

  /* Popup tokens — prototype-specific, awaiting definitive Figma design */
  --popup-person-bg:     var(--n50);
  --popup-field-bg:      var(--n0);
  --popup-field-border:  var(--n400);
  --popup-field-radius:  var(--r-s);
  --popup-warn-bg:       var(--warn-bg);
  --popup-warn-icon:     var(--warn);
  --popup-cancel-bg:     var(--err-bg);
  --popup-cancel-border: #eac8cc;
  --popup-cancel-icon:   var(--err);

  /* Typography */
  --font: 'Nunito', sans-serif;
}
```

---

## Prototype-only vs. Figma-aligned — overzicht

Een snel overzicht van wat uit de kit komt en wat het prototype zelf toevoegt:

**Uit de Figma kit (brand.md):**

- Alle kleuren — Primair, Neutraal, Semantisch (na deze revisie)
- Spacing 4, 8, 16, 24 px
- Corner radius 4, 8, 360 px
- Font family Nunito

**Prototype-specifieke toevoegingen:**

- Spacing 12, 20 px
- Corner radius 12 px
- Typografie (context-named sizes, kleiner dan de kit)
- Shadows (zwart-basis, niet N1000-basis)
- Status badges (stijl-conventie bovenop de semantische schalen)
- VIP styling
- Z-index schaal
- Breakpoints
- Material Icons

De prototype-specifieke items zijn pragmatische keuzes voor deze applicatie. Voor productie: doorpraten met design team of deze opgenomen moeten worden in de kit, of dat het prototype migreert naar de kit-waardes.
