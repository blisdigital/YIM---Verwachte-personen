# CredentialOntkoppelenModal

Bevestigingsdialoog voor het ontkoppelen van een credential van een persoon. Simpele destructieve bevestiging gebouwd op `<ActionPopup>`.

**Figma:** nog te definieren

---

## Gebruik

```vue
<CredentialOntkoppelenModal
  v-model:open="showOntkoppelen"
  :person="activePerson"
  @confirm="handleOntkoppelConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon waarvan de credential ontkoppeld wordt |

---

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person }` | Gebruiker heeft bevestigd -- ouder verantwoordelijk voor het ontkoppelen van de credential |

---

## Inhoud

1. **Body-tekst** -- "Weet je zeker dat je deze credential wil ontkoppelen?"

**Footer:** Annuleren (ghost) + Bevestigen (filled)

---

## Gedrag

- Bij bevestigen: emit `confirm` met `{ person }` en sluit modal via `update:open`.
- Bij annuleren: sluit modal via `update:open`.
- De modal heeft een breedte van 440px.
- Backdrop sluit modal niet -- actie vereist expliciete knop (zie `ActionPopup.md`).
- Geen formuliervelden, geen validatie -- enkel een bevestigingsvraag.

---

## Design Tokens

| Element | Token | Beschrijving |
| --- | --- | --- |
| Body tekst kleur | `--n800` | Donker grijs |
| Body tekst grootte | `14px` | -- |
