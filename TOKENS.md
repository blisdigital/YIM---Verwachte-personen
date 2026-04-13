# Design Tokens

Dit document definieert alle design tokens voor het YIM Verwachte Personen prototype.
Gebruik deze variabelen consequent in alle componenten.

## Kleuren

### Primair (Teal)

Gebruikt voor interactieve elementen, accenten en branding.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--p50` | `#f0f7f8` | Hover backgrounds, subtle fills |
| `--p100` | `#d6e8ec` | Selected states, pill backgrounds |
| `--p300` | `#a2cdd8` | Borders (hover) |
| `--p500` | `#6daeba` | **Primary** — buttons, links, active states |
| `--p600` | `#598f99` | Sidebar active item background |
| `--p700` | `#315161` | Text on light backgrounds, headings; sidebar background |
| `--p800` | `#243f4c` | Darker text variants |
| `--p900` | `#1a2e38` | Darkest, rarely used |

### Neutraal (Grijs)

Voor tekst, borders, achtergronden.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--n0` | `#ffffff` | **Page background**, white surfaces |
| `--n50` | `#f8fafb` | Subtle contrast, hover fills |
| `--n100` | `#f0f2f3` | Card backgrounds, dividers |
| `--n300` | `#eaeced` | Borders, separators |
| `--n400` | `#b8babb` | Input borders, disabled elements |
| `--n500` | `#999a9b` | Placeholder text, subtle icons |
| `--n700` | `#6b6c6d` | Secondary text |
| `--n800` | `#3e3f40` | Body text |
| `--n900` | `#1d1e1f` | Primary text, headings |

### Semantisch

Voor feedback en status communicatie.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--ok` | `#2e7d32` | Success text/icons |
| `--ok-bg` | `#e8f5e9` | Success background |
| `--warn` | `#e65100` | Warning text/icons |
| `--warn-bg` | `#fff3e0` | Warning background |
| `--err` | `#c62828` | Error text/icons |
| `--err-bg` | `#ffebee` | Error background |
| `--info` | `#01579b` | Info text/icons |
| `--info-bg` | `#e1f5fe` | Info background |

### VIP

Speciale styling voor VIP bezoekers.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--vip` | `#92400e` | VIP text |
| `--vip-bg` | `#fef3c7` | VIP background |
| `--vip-border` | `#f59e0b` | VIP border, star icon |

### Status Badges

Specifieke kleuren voor de 5 statuswaarden. Pill-shaped (border-radius: 360px).

```css
/* Verwacht */
.status-verwacht {
  background: #e9f0f8;
  color: #2464bb;
}

/* Aangekomen */
.status-aangekomen {
  background: #e9f8f3;
  color: #24bb86;
}

/* Vertrokken */
.status-vertrokken {
  background: #ebeced;
  color: #999a9b;
}

/* No show (weergegeven zonder koppelteken) */
.status-noshow {
  background: #fefbea;
  color: #9f871c;
}

/* Geannuleerd */
.status-geannuleerd {
  background: #f8e9eb;
  color: #bc243b;
}
```

---

## Spacing

Consistente spacing schaal gebaseerd op 4px grid.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--sp-xs` | `4px` | Tight spacing, icon gaps |
| `--sp-s` | `8px` | Small gaps, compact elements |
| `--sp-m` | `12px` | Medium padding, standard gaps |
| `--sp-l` | `16px` | Large padding, section spacing |
| `--sp-xl` | `20px` | Extra large (niet in tokens, gebruik `20px`) |
| `--sp-xxl` | `24px` | Section margins, generous spacing |

**Vuistregel:**
- Binnen componenten: `--sp-s` tot `--sp-m`
- Tussen componenten: `--sp-l` tot `--sp-xxl`
- Page margins: `48px` (niet in tokens)

---

## Border Radius

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--r-s` | `4px` | Buttons, inputs, small cards |
| `--r-m` | `8px` | Cards, dropdowns, panels |
| `--r-l` | `12px` | Modals, large cards |
| `--r-xl` | `360px` | Pills, avatars (fully rounded) |

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

### Font Sizes

| Context | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Page title | `36px` | `700` | `48px` |
| Section title | `18px` | `700` | `24px` |
| Card title | `17px` | `700` | — |
| Body text | `14px` | `400` | `20px` |
| Small text | `13px` | `600` | — |
| Caption | `12px` | `400/600` | — |
| Label | `10px` | `700` | `uppercase` |
| Badge | `14px` | `600` | `24px` |

### Letter Spacing

- Labels/uppercase: `0.6px` - `0.7px`
- Body text: `0.14px`
- Buttons: `0.14px`

---

## Shadows

```css
/* Subtle card shadow */
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

/* Header shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

/* Dropdown shadow */
box-shadow: 0 4px 16px rgba(17, 19, 19, 0.16);

/* Modal shadow */
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);

/* Detail panel shadow */
box-shadow: -4px 0 28px rgba(0, 0, 0, 0.1);

/* Toast shadow */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.14);
```

---

## Icons

Material Icons Rounded via Google Fonts:

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
|---------|------|
| Inchecken | `login` |
| Uitchecken | `logout` |
| No-show | `person_off` |
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

| Layer | Z-Index | Gebruik |
|-------|---------|---------|
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

Het prototype is primair desktop-first, met tablet ondersteuning.

| Breakpoint | Width | Context |
|------------|-------|---------|
| Desktop | `≥1280px` | Volledige tabel |
| Tablet | `768px - 1279px` | Compacte tabel, hamburger menu |
| Mobile | `<768px` | Niet primair ondersteund (receptie use case) |

---

## CSS Custom Properties (volledig)

```css
:root {
  /* Primary (Teal) */
  --p50:  #f0f7f8;
  --p100: #d6e8ec;
  --p300: #a2cdd8;
  --p500: #6daeba;
  --p600: #598f99;
  --p700: #315161;
  --p800: #243f4c;
  --p900: #1a2e38;

  /* Neutral (Grey) */
  --n0:   #ffffff;
  --n50:  #f8fafb;
  --n100: #f0f2f3;
  --n300: #eaeced;
  --n400: #b8babb;
  --n500: #999a9b;
  --n700: #6b6c6d;
  --n800: #3e3f40;
  --n900: #1d1e1f;

  /* Semantic */
  --ok:      #2e7d32;
  --ok-bg:   #e8f5e9;
  --warn:    #e65100;
  --warn-bg: #fff3e0;
  --err:     #c62828;
  --err-bg:  #ffebee;
  --info:    #01579b;
  --info-bg: #e1f5fe;

  /* VIP */
  --vip:        #92400e;
  --vip-bg:     #fef3c7;
  --vip-border: #f59e0b;

  /* Spacing */
  --sp-xs:  4px;
  --sp-s:   8px;
  --sp-m:   12px;
  --sp-l:   16px;
  --sp-xxl: 24px;

  /* Border Radius */
  --r-s:  4px;
  --r-m:  8px;
  --r-l:  12px;
  --r-xl: 360px;

  /* Typography */
  --font: 'Nunito', sans-serif;
}
```
