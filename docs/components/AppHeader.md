# AppHeader

Vaste app-balk bovenaan het scherm. Bevat hamburger-menu, YiM-logo, gebruikersinfo en taalwisseling. Opent een slide-in zijbalk bij klik op het hamburger-icoon.

**Figma:** [YIM UI Kit — Header (Hamburger=True, Versie=Current)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2263-3944&m=dev) · node-id: `2263:3944`

## Relaties
- **Gebruikt door:** VerwachtePersonenView, DossierView
- **Gebruikt:** — *(geen child-componenten)*

## Gebruik

```vue
<AppHeader />
```

Geen props of events — state-beheer is volledig lokaal (`drawerOpen` ref).

## Props

Geen.

## Events

Geen.

## Gedrag

- **Hamburger-knop** — toggelt `drawerOpen`; icoon `dehaze` (Material Icons Round), kleur `var(--n1000)`.
  - Hover / actief (drawer open): `background: var(--n100)`.
  - `border-radius: 360px` (volledig rond — afwijking van standaard `--r-s`).
- **Logo:** `assets/logo.svg`, `max-height: 40px`, `width: auto`.
- **Gebruikersinfo (rechts):** avatar (initialen, 40x40 px, rond), naam + taalcode (Label L: `16px / 600`), caret `expand_more`. Scheiding per item: `border-left: 1px solid var(--p50)`. Hover: `background: var(--n50)`.
- **Zijbalk:** schuift in van links met `<Transition name="sidebar">` (translate-X). Breedte `272px`, achtergrond `var(--p700)`, z-index `150`. Klikken buiten sluit via transparante `div.sidebar-dismiss` (z-index `140`).
- Navigatie-items: Accreditaties (dropdown), Aanmeldingen, **Verwachte personen** (actief), Aanwezigheidsregistratie, Personen (dropdown), Credentials (dropdown), Rapporten, Beheer. Links: `16px / 600`, `var(--p100)`. Actief: `background: var(--p600)`, `color: var(--n0)`. Hover: `rgba(255,255,255,0.08)`.

### Implementatieafwijkingen t.o.v. Figma

1. **Geen golvende ondervorm** — de "Vorm"-laag in Figma vervalt; gebruik een recht vlak `var(--n0)`.
2. **Header-hoogte 72px** (Figma: 96px) — alle kinderen sluiten aan op 72px.
3. **Logo kleiner** — `max-height: 40px` i.p.v. Figma 49px; `width: auto`.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Header achtergrond | `--n0` | `#ffffff` |
| Header border-bottom | `--n300` | — |
| Header hoogte | — | `72px` |
| Header positie | — | `sticky; top: 0; z-index: 200` |
| Hamburger kleur | `--n1000` | — |
| Hamburger hover bg | `--n100` | — |
| Hamburger border-radius | `--r-xl` | `360px` |
| Logo max-height | — | `40px` |
| Avatar achtergrond | `--n300` | — |
| Avatar tekst | `--n800` | — |
| Util-item scheiding | `--p50` | — |
| Util-item hover | `--n50` | — |
| Zijbalk achtergrond | `--p700` | — |
| Zijbalk breedte | — | `272px` |
| Nav-link kleur | `--p100` | — |
| Nav-link actief bg | `--p600` | — |
| Nav-link actief kleur | `--n0` | — |
| Nav-link hover bg | — | `rgba(255,255,255,0.08)` |
