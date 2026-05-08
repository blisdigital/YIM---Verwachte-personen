# Tooltip

Generiek hover-tooltip component. Toont één of meerdere regels tekst bij hover op het wrapped element. Read-only — geen acties in de tooltip zelf.

---

## Gebruik

```vue
<Tooltip :content="['Dossier niet compleet', 'Dossier afgekeurd']">
  <CompliancePill type="dossier" status="onvolledig" />
</Tooltip>

<Tooltip content="E-learning is verlopen">
  <CompliancePill type="elearning" status="niet-behaald" />
</Tooltip>
```

---

## Props

| Prop | Type | Required | Beschrijving |
| --- | --- | --- | --- |
| `content` | `string \| string[]` | ✓ | Tooltip-tekst. Array = meerdere regels, elk op eigen regel |

---

## Slots

| Slot | Beschrijving |
| --- | --- |
| `default` | Trigger-element waarop gehoverd wordt |

---

## Gedrag

- Tooltip verschijnt bij **mouseenter** op het trigger-element (slot default).
- Tooltip verdwijnt bij **mouseleave** van het trigger-element.
- Meerdere regels (array) worden verticaal gestapeld, elke regel op een eigen regel.
- Positionering: **boven** het trigger-element, horizontaal gecentreerd.
- Geïmplementeerd via `<Teleport to="body">` + `position: fixed` — voorkomt overflow-clipping door tabelcellen.
- Geen tooltip renderen als `content` leeg of afwezig is.

---

## Design Tokens

| Eigenschap | Waarde | Token |
| --- | --- | --- |
| Achtergrond | `#3E3F40` | `--n800` |
| Tekstkleur | `#F8FAFB` | `--n50` |
| Schaduw | `drop-shadow: 0px 2px 4px rgba(17, 19, 19, 0.16)` | Elevation/S |
| Border-radius | `4px` | `--r-xs` |
| Padding | `4px 8px` | `var(--sp-xs) var(--sp-s)` |
| Lettertype | Nunito Regular | — |
| Tekstgrootte | `12px` | Body-S |
| Regelhoogte | `16px` | Line-height/Body-S |
| Letter-spacing | `0px` | — |

---

## Voorbeeld rendering

**Één reden:**
```
Dossier niet compleet
```

**Meerdere redenen gestapeld:**
```
Dossier niet compleet
Dossier afgekeurd
```
