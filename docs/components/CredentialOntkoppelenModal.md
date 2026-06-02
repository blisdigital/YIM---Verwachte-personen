# CredentialOntkoppelenModal

Bevestigingsdialoog voor het ontkoppelen van een credential van een persoon. Simpele destructieve bevestiging gebouwd op `<ActionPopup>`.

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** ActionPopup, BaseButton

## Gebruik
```vue
<CredentialOntkoppelenModal
  v-model:open="showOntkoppelen"
  :person="activePerson"
  @confirm="handleOntkoppelConfirm"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvan de credential ontkoppeld wordt |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person }` | Gebruiker heeft bevestigd — ouder verantwoordelijk voor het ontkoppelen |

## Inhoud

1. **Body-tekst** — "Weet je zeker dat je deze credential wil ontkoppelen?"

**Footer:** Annuleren (ghost) + Bevestigen (filled).

## Gedrag
- Bij bevestigen: emit `confirm` met `{ person }` en sluit modal.
- Modal breedte: 440px. Backdrop sluit modal niet.
- Geen formuliervelden, geen validatie — enkel een bevestigingsvraag.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Body tekst kleur | `--n800` | Donker grijs |
| Body tekst grootte | `14px` | -- |
