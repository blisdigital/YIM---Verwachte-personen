# TableRow

Enkele rij in de tabel. De hele rij is klikbaar en opent het detail model pop-up in het midden van het scherm.

Figma: [Sticky row cells `53:1341`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=53-1341&m=dev) + [Lijst-Nieuw `6:14979`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-14979&m=dev)

```vue
<TableRow
  :person="person"
  :selected="isSelected(person.id)"
  @select="toggleSelect(person.id)"
  @open-detail="openDetail(person)"
  @action="handleAction"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `person` | `Person` | — | Persoon data |
| `selected` | `boolean` | `false` | Is geselecteerd |

**Events:**

- `@select` — Checkbox toggle
- `@open-detail` — Rij geklikt (buiten checkbox/actiemenu)
- `@action` — Actie uit dropdown menu

---

## Rij-states

| State | Achtergrond (alle cellen) | Trigger |
|-------|--------------------------|---------|
| Default | `--n0` `#ffffff` | — |
| Hover | `--n50` `#f8fafb` | muis over rij |
| Selected | `--p50` `#f0f7f8` | checkbox checked |
| Selected + hover | `--p100` `#d6e8ec` | hover op geselecteerde rij |

Sticky cellen (checkbox + actie) gebruiken `background: inherit` zodat ze de rij-state overnemen zonder eigen achtergrondkleur. Cel-borders (`N200` bottom + right) blijven zichtbaar in alle states.

---

## 1. Sticky cellen

Twee cellen links, `position: sticky`, z-index boven scrollbare cellen.

### Cel 1 — Checkbox (40×40)

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `48px` |
| Hoogte | `48px` (via `height: 48px` op alle `td`-cellen) |
| Achtergrond | `inherit` (volgt rij-state) |
| Border-bottom + border-right | `1px solid --n200` |
| Padding | `10px` rondom |
| Display | `flex; align-items: center; justify-content: center` |
| `position: sticky; left: 0` | — |

**Checkbox:**

| Onderdeel | Waarde |
|-----------|--------|
| State-layer wrapper | padding `4px` (`--s-xs`), `border-radius: 360px` |
| State-layer hover | `background: rgba(17,19,19,0.06)` |
| Checkbox unchecked | 20×20, bg `--n0`, `1px solid --n800`, `border-radius: 4px` |
| Checkbox checked | 20×20, bg `--p500`, `border-radius: 4px`, check-icon 16px `--n0` |

### Cel 2 — Actie-menu (48×rij-hoogte)

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `48px` |
| Hoogte | `48px` |
| Achtergrond | `inherit` (volgt rij-state) |
| Border-bottom + border-right | `1px solid --n200` |
| Padding | `4px` horizontaal + `4px` verticaal |
| Display | `flex; align-items: center; justify-content: center` |
| `position: sticky; left: 48px` | — |

**Icon-button (more-horiz):**

| Onderdeel | Waarde |
|-----------|--------|
| State-layer | padding `8px` (`--s-s`), `border-radius: 360px` |
| State-layer hover | `background: rgba(17,19,19,0.06)` |
| Icon | 24×24 `more-horiz` (Material), kleur `--n800` |

**Sticky shadow bij horizontaal scrollen:** zodra `scrollLeft > 0` op de tabelcontainer:

```css
.row[data-scrolled="true"] .row__sticky-cell:last-child {
  box-shadow: 4px 0 4px -2px rgba(17, 19, 19, 0.08);
}
```

---

## 2. Scrollbare cellen — basis

Alle data-cellen delen deze wrapper-stijling. Alleen de inhoud verschilt per kolom.

| Eigenschap | Waarde |
|------------|--------|
| Achtergrond | `inherit` (volgt rij-state) |
| Border-bottom + border-right | `1px solid --n200` |
| Padding | `16px` horizontaal × `12px` verticaal |
| Display | `flex; align-items: center` |
| Typografie | Body M — Nunito Regular 14/20, kleur `--n900` |
| Overflow | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` |
| Tooltip | Lange waarden altijd via `title`-attribuut; volledige tekst zichtbaar on hover |
| Breedte | auto op inhoud by default; expliciet (px) na gebruiker-resize via `columnWidths`; sticky cellen altijd `48px` |

Lege velden: lege cel (geen dash).

---

## 3. Cel rendering per kolom

| Kolom | Rendering |
|-------|-----------|
| `select` | `<Checkbox />` — sticky, stopt propagatie |
| `actions` | `<ActionMenu />` via ••• icoon — sticky, stopt propagatie |
| `naam` | Plain tekst `<span>` — rij-click opent detail panel |
| `personeelsnr` | Plain tekst Body M `--n900` (standaard verborgen) |
| `telefoonnummer` | Plain tekst Body M `--n900` (standaard verborgen) |
| `emailadres` | Plain tekst Body M `--n900` (standaard verborgen) |
| `vip` | Zie §3.1 |
| `persoontype` | Plain tekst (bijv. "Bezoeker", "Warehouse", "Technisch") |
| `bedrijf` | Plain tekst |
| `locaties` | Pills (bg `--p100`, tekst `--p700`, radius `--r-xl`); max 3 zichtbaar. Bij >3 totaal: overflow-pill `+n` (bg `--n0`, tekst `--p500`) met `Tooltip` (alle locaties). |
| `datumVanaf` | Geformatteerde datum `DD-MM-YYYY` |
| `aankomsttijd` | Tijd `HH:mm` |
| `vertrekTijd` | Tijd `HH:mm`; lege cel als null |
| `status` | Zie §3.2 |
| `credentialType` | Plain tekst (bijv. "QR-code", "Bezoekerspas", "Vaste pas"); lege cel als null |
| `credentialStatus` | Zie §3.3 |
| `compliance` | Zie §3.4 |
| `parkeren` | Zie §3.5 |
| `contactpersoon` | Plain tekst |
| `bezoekreden` | Plain tekst |

### 3.1 VIP

Kolom 88px. Padding `4px` (`--s-xs`) rondom, `justify-content: center`.

| State | Inhoud |
| --- | --- |
| VIP = true | 20px `star` (Material, **filled**), kleur `--vip-border` `#f59e0b` |
| VIP = false | lege cel |

Gebruik altijd de filled variant — niet `star_outline`.

### 3.2 Status chip

| Eigenschap | Waarde |
|------------|--------|
| Padding | `4px` verticaal × `12px` horizontaal |
| Border-radius | `4px` |
| Typografie | Label M — Nunito SemiBold 14/20, letter-spacing 0.14px |
| Display | `inline-flex; align-items: center` |

| Status | Achtergrond | Tekstkleur |
|--------|-------------|------------|
| Verwacht | `--b50` `#e9f0f8` | `--b500` `#2464bb` |
| Nog niet aangekomen | `--y50` `#fefbea` | `--y700` `#9f871c` |
| Aangemeld | `--g50` `#e9f8f3` | `--g500` `#24bb86` |
| Afgemeld | `--n100` `#f3f4f5` | `--n800` `#3e3f40` |
| Niet aangekomen | `--r50` `#f8e9eb` | `--r500` `#bc243b` |
| Geannuleerd | `--r50` `#f8e9eb` | `--r500` `#bc243b` |

### 3.3 Credential status dot + label

`display: inline-flex; align-items: center; gap: 8px` (`--s-s`). Dot: 12×12, `border-radius: 360px`.

| Credential status | Dot-kleur | Tekstkleur |
| --- | --- | --- |
| Niet actief | `--n400` | `--n500` (muted) |
| Actief | `--ok` | `--n900` |
| Verlopen | `--warn` | `--n900` |
| Ingetrokken | `--n500` | `--n900` |
| Geblokkeerd | `--err` | `--n900` |

"Niet actief" heeft dimmere tekst (`--n500`) om aan te geven dat er nog geen credential actief is.

### 3.4 Compliance (twee pills)

Kolom 216px. Container: `display: flex; gap: 4px; padding: 10px 8px`.

**Per pill:**

| Eigenschap | Waarde |
|------------|--------|
| Achtergrond | `--p50` `#f0f7f8` |
| Border | `1px solid --p100` `#d6e8ec` |
| Border-radius | `360px` (pill-vorm) |
| Padding | `4px 12px 4px 8px` (v / r / v / l) |
| Gap | `4px` tussen icon en label |
| Typografie | Body M — Nunito Regular 14/20, kleur `--n900` |
| Icon | 16×16 |

| State | Icon (Material) | Icon-kleur |
|-------|-----------------|------------|
| OK — dossier volledig / e-learning voltooid | `check` | `--g500` `#24bb86` |
| Not-OK — dossier onvolledig / e-learning niet voltooid | `warning` (driehoek) | `--r500` `#bc243b` |

De pill-achtergrond blijft altijd `--p50` — alleen de icon-kleur wisselt per state.

### 3.5 Parkeren

Plain tekst, Body M `--n900`. Geen chip-styling.

| Inhoud | Weergave |
|--------|---------|
| Gereserveerd met plek | Kenteken, bv. `00-AAB-11` |
| Niet gereserveerd | Tekst `Niet gereserveerd` in `--n900` |
