# StatusDot

Gekleurde stip + label voor bezoekstatus van een persoon. Label erft fontkleur van de parent context.

**Figma:** nog te definiëren  
**Versie:** 0.2  
**Datum:** mei 2026

---

## Gebruik

```vue
<StatusDot status="Verwacht" />
<StatusDot status="Aangemeld" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'Verwacht' \| 'Nog niet aangekomen' \| 'Aangemeld' \| 'Afgemeld' \| 'Niet aangekomen' \| 'Geannuleerd'` | — | Status waarde |

---

## Maatvoering

| Eigenschap | Waarde |
|------------|--------|
| Dot diameter | `12px` |
| Gap dot–label | `8px` |
| Font-size | `14px` |
| Line-height | `20px` |
| Font-weight | `600` (semibold) |
| Labelkleur | `inherit` (erft van parent) |

---

## Kleurmapping (dot only)

| Status | Dot-kleur |
|--------|-----------|
| `Verwacht` | `--info` |
| `Nog niet aangekomen` | `--warn-y500` |
| `Aangemeld` | `--ok` |
| `Afgemeld` | `--n800` |
| `Niet aangekomen` | `--err` |
| `Geannuleerd` | `--n400` |
