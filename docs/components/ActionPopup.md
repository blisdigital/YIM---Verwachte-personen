# ActionPopup

Basis pop-up wrapper voor snelle acties vanuit het Verwachte Personen overzicht. Alle actie-modals (aanmelden, afmelden, annuleren, credential-acties, e-learning) zijn gebouwd op deze component.

## Relaties
- **Gebruikt door:** AanmeldenModal, AfmeldenModal, AnnulerenModal, CredentialActiverenModal, CredentialMailenModal, CredentialOntkoppelenModal, InformeerContactpersoonModal, ElearningUitnodigingModal
- **Gebruikt:** IconButton

## Gebruik

```vue
<ActionPopup :open="isOpen" title="Check-in" @update:open="isOpen = $event">
  <!-- body content -->
  <template #footer>
    <BaseButton variant="ghost" @click="isOpen = false">Annuleren</BaseButton>
    <BaseButton variant="filled" @click="onConfirm">Bevestigen</BaseButton>
  </template>
</ActionPopup>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid van de popup |
| `title` | `string` | `''` | Titel in de header |
| `width` | `string` | `null` | Optionele breedte override (bijv. `'560px'`) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Sluitverzoek (v-model compatibel) |

## Slots

| Slot | Beschrijving |
|------|-------------|
| `default` | Body-inhoud (scrollbaar bij overflow) |
| `footer` | Actieknoppen; footer verschijnt alleen als slot gevuld is |

## Inhoud

```
┌─────────────────────────────────────────┐
│  [Titel]                    [× sluiten] │
│                                         │
│  <slot /> (scrollbaar)                  │
├─────────────────────────────────────────┤
│  <slot #footer />            (optioneel)│
└─────────────────────────────────────────┘
```

Geen scheidingslijn tussen header en body. Wel `border-top` tussen body en footer.

## Gedrag

- **Backdrop** sluit popup **niet** — actieknoppen zijn de enige uitgang
- Sluiten (x) emits `update:open: false`; geen statuswijziging
- Body scrollt bij overflow (max-hoogte `92vh`)
- Body scroll lock (`document.body.overflow: hidden`) terwijl popup open is
- **Tablet** — wordt een bottom sheet (full-width, afgerond boven, schuift omhoog)
- Close-knop: `<IconButton icon="close" variant="ghost" size="md" />`

### Maatvoering

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `480px` (max `90vw`) |
| Max hoogte | `92vh` |
| Border radius | `--r-l` (`12px`) |
| Header min-hoogte | `64px` |
| Footer min-hoogte | `64px` |

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond popup | `--n0` | `#ffffff` |
| Footer border-top | `--n300` | `#eaeced` |
| Titeltekst | `--n900` | `#1d1e1f` |
| Afronding popup | `--r-l` | `12px` |
| Drop shadow | `--shadow-l` | — |
