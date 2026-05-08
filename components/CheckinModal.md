# CheckinModal

Bevestigingsdialoog voor inchecken en uitchecken. Gebruikt `<ActionPopup>` als wrapper.

```vue
<CheckinModal
  v-model:open="showCheckin"
  :person="activePerson"
  action="inchecken"
  @confirm="handleConfirm"
/>
```

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die in/uitgecheckt wordt |
| `action` | `'inchecken' \| 'uitchecken' \| 'no-show-ongedaan'` | `'inchecken'` | Type actie |

**Events:**

- `@update:open` — Modal sluiten
- `@confirm` — Bevestigd (`{ person, action }`)

**Inhoud:**

- Introtekst: "Wil je deze persoon inchecken?" / "Wil je deze persoon uitchecken?"
- Persoon-kaart: initialen-avatar (40×40px, teal `--p500`) + naam + bedrijf + `<StatusBadge>`
- Infolijst: personeelsnr, locatie(s), datum, verwacht om; bij uitchecken ook ingecheckt-om tijd
- Footer: Annuleren (ghost) + Bevestigen (filled)

**Gedrag:**

- Titel ("Check-in" / "Check-out") en introtekst zijn computed op basis van `action` prop
- Bij bevestigen: emit `confirm` → VerwachtePersonenView roept `personenStore.updateStatus()` aan
- Modal sluit automatisch na bevestigen
- Backdrop sluit popup **niet** — actie vereist expliciete knop (zie `ActionPopup.md`)
