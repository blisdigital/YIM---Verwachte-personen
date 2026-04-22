# BulkBar

Toolbar die verschijnt boven de tabel bij 1 of meer geselecteerde rijen.

Figma node: `6:45704` — [Epic - Verwachte personen](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-45704&m=dev)

```vue
<BulkBar
  v-if="selectedCount > 0"
  :count="selectedCount"
  :selected-persons="selectedPersons"
  @action="handleBulkAction"
  @clear="clearSelection"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `count` | `number` | — | Aantal geselecteerd |
| `selectedPersons` | `Person[]` | — | Geselecteerde personen (voor disabled logic) |

**Lay-out:**
```
[N geselecteerd]  [↑ Inchecken] [↓ Uitchecken] [🪪 Pas koppelen] [🔓 Pas ontkoppelen] [🖨️ Pas printen] [👤 No-show] [✕ Annuleren]        [×]
```

**Enabled/disabled per actie:**

| Actie | Enabled als selectie ≥1 persoon bevat met status |
| --- | --- |
| Inchecken | `Verwacht` of `No-show` |
| Uitchecken | `Aangekomen` |
| Pas koppelen | `Verwacht` of `No-show` |
| Pas ontkoppelen | `Aangekomen` |
| Pas printen | `Aangekomen` |
| No-show | `Verwacht` |
| Annuleren | `Verwacht` of `No-show` |

Personen met status `Geannuleerd` of `Vertrokken` dragen nergens aan bij — een selectie uitsluitend van deze statussen heeft alle knoppen disabled.

**Gemengde selecties:** de actie wordt uitgevoerd op de relevante subset. Inchecken bij een mix van `Verwacht` + `Aangekomen` checkt alleen de `Verwacht`-personen in; Uitchecken alleen de `Aangekomen`.

**Events:**

- `@action` — Bulk actie (`{ action: 'inchecken' | 'uitchecken' | 'pas-koppelen' | 'pas-ontkoppelen' | 'pas-printen' | 'no-show' | 'annuleren' }`)
- `@clear` — Selectie wissen (× knop)

**Sluitknop (×):** `<IconButton variant="ghost" size="md" icon="close" aria-label="Selectie wissen" />` — triggert `@clear`. Hit-area 32×32px, `border-radius: var(--r-xl)` op hover (volledig rond).

---

## Design Tokens

### Container

| Token | Waarde | Gebruik |
|---|---|---|
| `--p50` | `#f0f7f8` | Achtergrondkleur bar |
| `--sp-l` | `16px` | Horizontale padding (`px`) |
| `--sp-s` | `8px` | Verticale padding (`py`) |
| — | `4px` | `border-radius` container |
| — | `48px` | Totale hoogte (content-driven: padding + 32px knophoogte) |

Layout: `flex-row`, `align-items: center`, `justify-content: space-between`, volle breedte van de tabel.

### Links — teller + knoppen

| Element | Token | Waarde |
|---|---|---|
| Gap teller ↔ knoppen-groep | — | `16px` |
| Gap knoppen onderling | — | `8px` |

**Teller ("N geselecteerd")** — tekststijl Labels/Label M:

| Token | Waarde |
|---|---|
| Font | `Nunito` |
| Weight | `600` (semibold) |
| Size | `14px` |
| Line-height | `20px` |
| Letter-spacing | `0.14px` |
| Kleur | `--p700` `#315161` |

### Actieknoppen — Small / Outlined / Icon Left

Hergebruik `BaseButton` met de juiste props; schrijf geen losse stijlen.

**Enabled state:**

| Token | Waarde | Gebruik |
|---|---|---|
| `--n0` | `#ffffff` | Achtergrond |
| `--n400` | `#b8babb` | 1px solid border |
| `--n900` | `#1d1e1f` | Tekst- en icoonkleur |
| `--r-s` | `4px` | `border-radius` |
| Padding | `pl: 8px · pr: 12px · py: 8px` | Asymmetrisch (icon-left convention) |
| Gap icoon ↔ label | `8px` | |
| Icon-size | `16×16px` | |

**Disabled state:**

| Token | Waarde | Gebruik |
|---|---|---|
| `--n0` | `#ffffff` | Achtergrond (ongewijzigd) |
| `--n300` | `#eaeced` | 1px solid border (lichter) |
| `--n400` | `#b8babb` | Tekst- en icoonkleur |

**Destructive state ("Annuleren")** — zelfde Small/Outlined layout, alleen tekst/icoon rood:

| Token | Waarde | Gebruik |
|---|---|---|
| `--n0` | `#ffffff` | Achtergrond |
| `--n400` | `#b8babb` | 1px solid border (ongewijzigd) |
| `--err` | `#bc243b` | Tekst- en icoonkleur |

> Gebruik geen filled-rood voor destructieve acties in de bar — te veel visuele dominantie.

**Tekststijl knoppen** — Labels/Label S:

| Token | Waarde |
|---|---|
| Font | `Nunito` |
| Weight | `600` (semibold) |
| Size | `12px` |
| Line-height | `16px` |
| Letter-spacing | `0.12px` |

### Sluitknop (rechts)

| Token | Waarde | Gebruik |
|---|---|---|
| — | `32×32px` | Hit-area |
| `--sp-s` | `8px` | Padding binnen button |
| `--r-xl` | `360px` | `border-radius` op hover (volledig rond) |
| — | `16×16px` | Icon-size |
| `--n900` | `#1d1e1f` | Icoonkleur |

Hover-achtergrond: `rgba(17, 19, 19, 0.06)`.
