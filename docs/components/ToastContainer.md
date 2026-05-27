# ToastContainer

Container-component dat alle actieve toast-notificaties rendert in de rechteronderhoek van het scherm. Gebruikt de `useToast` composable voor state en het `Toast` component voor individuele items. Eenmalig geplaatst in de root van de applicatie.

**Figma:** nog te definieren

## Gebruik

```vue
<!-- Eenmalig in App.vue of de root layout -->
<ToastContainer />

<!-- Toasts triggeren vanuit elk component via de composable -->
<script setup>
import { useToast } from '@/composables/useToast'
const { show } = useToast()

show('Aangemeld', 'Jan de Vries is succesvol aangemeld.')
</script>
```

## Props

Geen props. ToastContainer leest de toast-lijst rechtstreeks uit de `useToast` composable.

## Events

Geen eigen events. Het `dismiss` event van individuele `Toast` componenten wordt doorgegeven aan `useToast().dismiss()`.

## Relatie met Toast en useToast

### useToast composable

De `useToast` composable (`src/composables/useToast.js`) beheert een gedeelde reactive `toasts` ref (module-level singleton):

| Methode | Signature | Beschrijving |
| --- | --- | --- |
| `show` | `show(title: String, message: String)` | Voegt een toast toe met uniek `id` (timestamp). Wordt automatisch na **4 seconden** verwijderd. |
| `dismiss` | `dismiss(id: Number)` | Verwijdert een specifieke toast direct. |
| `toasts` | `Ref<Array>` | Reactive array van `{ id, title, message }` objecten. |

### Toast component

Elk item in de `toasts` array wordt gerenderd als een `Toast` component. Toast ontvangt een `toast` object als prop en emit `dismiss` met het toast `id` wanneer de gebruiker op de sluitknop klikt.

### Dataflow

```
useToast.show()  -->  toasts ref  -->  ToastContainer  -->  Toast (per item)
                                                                |
useToast.dismiss()  <--  @dismiss  <--  ToastContainer  <--  Toast (sluitknop)
```

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Positie | — | `fixed`, `bottom: 24px`, `right: 24px` |
| Z-index | — | `9999` |
| Gap tussen toasts | — | `8px` |

De visuele styling van individuele toasts (achtergrondkleur, tekst, schaduw) wordt bepaald door het `Toast` component. Zie `Toast.md`.

## Gedrag

- De container is `fixed` gepositioneerd rechtsonder in het viewport.
- Toasts stapelen verticaal met 8px tussenruimte (`flex-direction: column`).
- De container zelf is niet klikbaar (`pointer-events: none`); individuele toasts wel (`pointer-events: all`).
- Wordt via `<Teleport to="body">` gerenderd zodat het altijd bovenop andere content verschijnt.
- **Animaties:** Vue `<TransitionGroup>` met naam `toast-list`:
  - **Enter:** fade-in + slide omhoog vanuit 16px onder (0.3s ease)
  - **Leave:** fade-out + slide omlaag naar 16px onder (0.3s ease)
- Toasts verdwijnen automatisch na 4 seconden, of eerder bij handmatig sluiten via de sluitknop.
