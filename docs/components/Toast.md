# Toast

Individuele toast-notificatie met titel, optioneel bericht en sluitknop. Wordt beheerd via de `useToast` composable en gerenderd door `ToastContainer`.

**Figma:** [YIM UI Kit -- AlertBanner](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2196-3132&m=dev) -- node-id: `2196:3132`

## Relaties
- **Gebruikt door:** ToastContainer
- **Gebruikt:** geen child components

## Gebruik

```vue
<!-- Niet direct gebruikt; ToastContainer rendert Toast per item -->
<Toast :toast="{ id: 1, title: 'Aangemeld', message: 'Succesvol' }" @dismiss="handler" />
```

Toasts triggeren via de composable:

```javascript
const { show } = useToast()
show('Ingecheckt', 'Sophie van der Berg is succesvol ingecheckt')
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `toast` | `Object` | -- (required) | Object met `id`, `title`, `message` |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `dismiss` | `id: Number` | Gebruiker klikt op sluitknop |

## Gedrag

- Donkere achtergrond (`--n900`) met witte tekst en trailing close-knop.
- Auto-dismiss na 4 seconden (afgehandeld door `useToast`).
- Handmatig sluiten via sluitknop emit `dismiss`.

### useToast API

| Methode | Signature | Beschrijving |
|---------|-----------|-------------|
| `show` | `(title, message?)` | Toont toast; auto-dismiss na 4s |
| `dismiss` | `(id)` | Sluit specifieke toast direct |
| `toasts` | `Ref<{id, title, message}[]>` | Actieve toasts (module-level singleton) |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Breedte | -- | `360px` (fixed) |
| Border-radius | `--r-s` | `4px` |
| Drop shadow | Elevation/M | `0px 4px 8px rgba(17,19,19,0.16)` |
| Padding | -- | `8px 8px 8px 16px` |
| Achtergrond (Neutral) | `--n900` | `#1d1e1f` |
| Tekst (Neutral) | `--n50` | `#f8fafb` |

### Achtergrond- en tekstkleur per type (design system)

| Type | Achtergrond | Tekst |
|------|-------------|-------|
| `Neutral` | `--n900` `#1d1e1f` | `--n50` `#f8fafb` |
| `Success` | `--ok` `#24bb86` | `--n0` `#ffffff` |
| `Warning` | `--warn-y500` `#f8d32c` | `--n900` `#1d1e1f` |
| `Error` | `--err` `#bc243b` | `--r50` `#f8e9eb` |
