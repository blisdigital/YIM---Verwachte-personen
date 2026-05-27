# AppHeader

Vaste app-balk bovenaan het scherm. Bevat hamburger-menu, YiM-logo, gebruikersinfo en taalwisseling. Opent een slide-in zijbalk bij klik op het hamburger-icoon.

**Figma:** [YIM UI Kit — Header (Hamburger=True, Versie=Current)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2263-3944&m=dev) `node-id: 2263:3944`

```vue
<AppHeader />
```

Geen props of events — staat-beheer is volledig lokaal (`drawerOpen` ref).

## Visueel

| Eigenschap | Waarde |
|------------|--------|
| Hoogte | `72px` |
| Achtergrond | `var(--n0)` |
| Border-bottom | `1px solid var(--n300)` |
| Positie | `sticky; top: 0; z-index: 200` |
| Layout | `flex-row`, `align-items: center`, `justify-content: space-between`, `padding-left: 16px` |

**Hamburger-knop** — `<IconButton variant="ghost" size="lg" icon="dehaze" aria-label="Menu openen" />`:

- Icoon: `dehaze` (Material Icons Round), kleur `var(--n1000)` *(afwijking van ghost-standaard `--n700`)*
- `border-radius: 360px` *(afwijking van standaard `--r-s`; volledig rond)*
- Hover / actief (drawer open): `background: var(--n100)` *(conform ghost hover)*
- Gap tussen hamburger en logo: `16px`

**Logo:** `assets/logo.svg`, `max-height: 40px`, `width: auto` (aspect-ratio behouden)

**Gebruikersinfo (rechts):**

- Avatar: initialen, `40×40px`, `border-radius: 360px`, `background: var(--n300)`, tekstkleur `var(--n800)`
  - Initialen — Label S: `12px / 600`, `var(--n800)`, `letter-spacing: 0.12px`, `line-height: 16px`
- Naam + taalcode — Label L: `16px / 600`, `var(--n800)`, `letter-spacing: 0.16px`
- Caret: `expand_more`, `24px`, `var(--n800)`
- Padding per utility-item: `padding-left: 24px`, `padding-right: 12px`, `padding-y: 12px`
- Gap tussen avatar/tekst en chevron: `8px`
- Scheiding: `border-left: 1px solid var(--p50)` per item
- Hover: `background: var(--n50)`

## Implementatieafwijkingen t.o.v. Figma

1. **Geen golvende ondervorm** — de "Vorm"-laag in Figma (golvende onderrand, 96px hoog) vervalt; gebruik een recht vlak `var(--n0)`.
2. **Header-hoogte 72px** (Figma: 96px) — alle kinderen sluiten aan op `h-[72px]`.
3. **Logo kleiner** — `max-height: 40px` i.p.v. de Figma-waarde van 49px, zodat het netjes binnen 72px past; `width: auto` (aspect-ratio behouden).

## Zijbalk (nav-sidebar)

Schuift in van links met een `<Transition name="sidebar">` (translate-X). Geen overlay — klikken buiten de balk sluit hem via een transparante `div.sidebar-dismiss` (`position: fixed; inset: 0; z-index: 140`).

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `272px` |
| Achtergrond | `var(--p700)` |
| Z-index | `150` (onder header, boven pagina-content) |
| Padding-top | `80px` (ruimte voor header) |

**Navigatie-items:**

| Label | Dropdown | Actief |
|-------|----------|--------|
| Accreditaties | ✓ | — |
| Aanmeldingen | — | — |
| Verwachte personen | — | ✓ |
| Aanwezigheidsregistratie | — | — |
| Personen | ✓ | — |
| Credentials | ✓ | — |
| Rapporten | — | — |
| Beheer | — | — |

Links: `16px / 600`, `var(--p100)`, `border-radius: var(--r-s)`
Actief: `background: var(--p600)`, `color: var(--n0)`
Hover: `background: rgba(255,255,255,0.08)`
