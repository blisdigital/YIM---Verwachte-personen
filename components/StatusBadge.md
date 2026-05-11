# StatusBadge

Kleur-badge die de status van een persoon toont.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<StatusBadge status="Verwacht" />
<StatusBadge status="Aangekomen" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'Verwacht' \| 'Aangekomen' \| 'Vertrokken' \| 'No-show' \| 'Geannuleerd'` | — | Status waarde |

---

## Maatvoering

| Eigenschap | Waarde |
|------------|--------|
| Border-radius | `4px` |
| Padding | `4px 12px` |
| Font-size | `14px` |
| Line-height | `24px` |
| Min-width | `116px` |
| Font-weight | `600` (semibold) |
| Text-align | `center` |

---

## Kleurmapping

| Status | Achtergrond | Tekstkleur |
|--------|-------------|------------|
| `Verwacht` | `#e9f0f8` | `#2464bb` |
| `Aangekomen` | `#e9f8f3` | `#24bb86` |
| `Vertrokken` | `--n100` | `--n700` |
| `No-show` | `--warn-bg` | `--warn` |
| `Geannuleerd` | `--err-bg` | `--err` |
