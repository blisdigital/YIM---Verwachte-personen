# PassStatusDot

Gekleurde stip met label die de credentialStatus van een persoon toont.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<PassStatusDot status="niet-actief" />
<PassStatusDot status="actief" />
<PassStatusDot status="verlopen" />
<PassStatusDot status="ingetrokken" />
<PassStatusDot status="geblokkeerd" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `status` | `'niet-actief' \| 'actief' \| 'verlopen' \| 'ingetrokken' \| 'geblokkeerd'` | — | Credentialstatus waarde |

---

## Events

Geen events. Dit is een puur presentatie-component.

---

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Niet-actief stip | `--n400` | `#b8babb` |
| Actief stip | `--ok` | `#24bb86` |
| Verlopen stip | `--warn` | `#f59e0b` |
| Ingetrokken stip | `--n500` | `#999a9b` |
| Geblokkeerd stip | `--err` | `#bc243b` |
| Tekst standaard | `--n900` | `#1d1e1f` |
| Tekst muted (niet-actief) | `--n500` | `#999a9b` |

---

## Kleurmapping

| Status | Stip kleur | Label | Toelichting |
|--------|-----------|-------|-------------|
| `niet-actief` | `--n400` (grijs) | "Niet actief" | Beginstatus; geen credentialnummer; na ontkoppelen |
| `actief` | `--ok` (groen) | "Actief" | Gekoppeld of geprint met credentialnummer |
| `verlopen` | `--warn` (oranje) | "Verlopen" | Geldigheidsperiode verstreken (printbare passen) |
| `ingetrokken` | `--n500` (donkergrijs) | "Ingetrokken" | Tijdelijk; herbruikbaar; na nieuwe credential of handmatig |
| `geblokkeerd` | `--err` (rood) | "Geblokkeerd" | Permanent buiten gebruik; handmatige actie |
