# Toast / ToastContainer

Notificatie-toasts beheerd via de `useToast` composable en gerenderd door `ToastContainer`.

**Figma:** [YIM UI Kit — AlertBanner](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2196-3132&m=dev) `node-id: 2196:3132`  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```javascript
const { show, dismiss } = useToast()

show('Ingecheckt', 'Sophie van der Berg is succesvol ingecheckt')
show('Fout', 'Actie kon niet worden uitgevoerd')
```

---

## useToast API

| Functie | Signature | Beschrijving |
|---------|-----------|-------------|
| `show` | `(title, message?)` | Toont een neutral toast; verdwijnt automatisch na 4 seconden |
| `dismiss` | `(id)` | Sluit een specifieke toast direct |
| `toasts` | `Ref<{id, title, message}[]>` | Actieve toasts (module-level singleton) |

---

## Standaard variant (prototype)

Overal in de applicatie wordt de volgende variant gebruikt:

| Prop | Waarde |
|------|--------|
| `type` | `Neutral` |
| `leadingIcon` | `false` |
| `action` | `false` |
| `cancel` | `true` |

Donkere achtergrond (`--n900`) met witte tekst en trailing close-knop (×).

---

## Props (varianten)

| Prop | Type | Default | Opties |
|------|------|---------|--------|
| `type` | `string` | `Neutral` | `Neutral` · `Success` · `Warning` · `Error` |
| `leadingIcon` | `boolean` | `false` | `true` · `false` |
| `action` | `boolean` | `false` | `true` · `false` |
| `cancel` | `boolean` | `false` | `true` · `false` |

---

## Container tokens

| Eigenschap | Token | Waarde |
|-----------|-------|--------|
| Breedte | — | `360px` (fixed) |
| Border-radius | `--dimensions/corners/corner-s` | `4px` |
| Drop shadow | `--elevation/m` | `0px 4px 8px rgba(17,19,19,0.16)` |
| Padding links | `--dimensions/spacing/spacing-l` | `16px` |

### Achtergrondkleur per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-neutrals/-n900` | `#1d1e1f` |
| `Success` | `--color/-success/-g500` | `#24bb86` |
| `Warning` | `--color/-warning/-y500` | `#f8d32c` |
| `Error` | `--color/-error/-r500` | `#bc243b` |

### Tekstkleur per type

| Type | Token | Waarde |
|------|-------|--------|
| `Neutral` | `--color/-neutrals/-n50` | `#f8fafb` |
| `Success` | `--color/-neutrals/-n0` | `#ffffff` |
| `Warning` | `--color/-neutrals/-n900` | `#1d1e1f` |
| `Error` | `--color/-error/-r50` | `#f8e9eb` |

---

## Interne layout

```text
┌─────────────────────────────────────────────────────┐
│ [icon?]  Berichttekst                [Action] [×]   │
└─────────────────────────────────────────────────────┘
```

- Content links: `flex-row`, `align-items: center`, `flex: 1`
- Buttons rechts: `flex-row`, `align-items: center`, `shrink-0`

---

## ToastContainer

- Positie: `fixed`, rechtsonder — `bottom: 24px; right: 24px`
- Gebruikt `<Teleport to="body">` + `<TransitionGroup name="toast-list">`
- Animatie: slide omhoog bij verschijnen/verdwijnen (`translateY(16px)`)

---

## Implementatiedetails

- `toasts` ref is module-level (buiten de functie) — gedeeld singleton over alle componenten
- Auto-dismiss via `setTimeout` van 4000ms (niet configureerbaar)
