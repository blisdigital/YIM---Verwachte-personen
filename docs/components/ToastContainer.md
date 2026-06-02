# ToastContainer

Container-component dat alle actieve toast-notificaties rendert in de rechteronderhoek van het scherm. Eenmalig geplaatst in de root layout.

## Relaties
- **Gebruikt door:** VerwachtePersonenView, DossierView
- **Gebruikt:** Toast, useToast (composable)

## Gebruik

```vue
<!-- Eenmalig in de root layout -->
<ToastContainer />

<!-- Toasts triggeren vanuit elk component -->
<script setup>
import { useToast } from '@/composables/useToast'
const { show } = useToast()
show('Aangemeld', 'Jan de Vries is succesvol aangemeld.')
</script>
```

## Props

Geen props. Leest de toast-lijst uit de `useToast` composable.

## Events

Geen eigen events. `dismiss` van individuele Toast-componenten wordt doorgegeven aan `useToast().dismiss()`.

## Gedrag

- `fixed` gepositioneerd rechtsonder (`bottom: 24px`, `right: 24px`).
- Toasts stapelen verticaal met `8px` gap (`flex-direction: column`).
- Container zelf niet klikbaar (`pointer-events: none`); individuele toasts wel (`pointer-events: all`).
- Via `<Teleport to="body">` -- altijd bovenop andere content.
- Vue `<TransitionGroup name="toast-list">`:
  - **Enter:** fade-in + slide omhoog vanuit 16px onder (0.3s ease)
  - **Leave:** fade-out + slide omlaag naar 16px onder (0.3s ease)
- Toasts verdwijnen automatisch na 4 seconden, of eerder bij handmatig sluiten.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Positie | -- | `fixed`, `bottom: 24px`, `right: 24px` |
| Z-index | -- | `9999` |
| Gap tussen toasts | -- | `8px` |

Visuele styling van individuele toasts wordt bepaald door `Toast`. Zie `Toast.md`.
