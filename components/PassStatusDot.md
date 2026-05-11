# PassStatusDot

Gekleurde stip met label die de passtatus van een persoon toont.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<PassStatusDot status="niet-gekoppeld" />
<PassStatusDot status="gekoppeld" />
<PassStatusDot status="geprint" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'niet-gekoppeld' \| 'gekoppeld' \| 'geprint'` | — | Passtatus waarde |

---

## Kleurmapping

| Status | Stip kleur | Label |
|--------|-----------|-------|
| `niet-gekoppeld` | `--n400` (grijs) | "Niet gekoppeld" |
| `gekoppeld` | blauw | "Gekoppeld" |
| `geprint` | `--ok` (groen) | "Geprint" |
