# CheckinModal

Bevestigingsdialoog voor inchecken en uitchecken. Gebruikt `<Modal>` als wrapper.

```vue
<CheckinModal
  v-model:open="showCheckin"
  :person="activePerson"
  action="inchecken"
  @confirm="handleConfirm"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die in/uitgecheckt wordt |
| `action` | `'inchecken' \| 'uitchecken'` | `'inchecken'` | Type actie |

**Events:**
- `@update:open` — Modal sluiten
- `@confirm` — Bevestigd (`{ person, action }`)

**Inhoud:**
- Persoon-avatar (initialen uit naam, 40×40px, teal `--p500`)
- Naam + bedrijf + huidige `<StatusBadge>`
- Infolijst: personeelsnr, aankomsttijd, locatie(s), en (bij uitchecken) ingecheckt-om tijd
- Bevestigingsbericht met passend icoon (`login` groen / `logout` oranje)
- Footer: Annuleren (outlined) + Inchecken/Uitchecken bevestigen (primary)

**Gedrag:**
- Titel, bevestigingsknop en bericht zijn computed op basis van `action` prop
- Bij bevestigen: emit `confirm` → VerwachtePersonenView roept `personenStore.updateStatus()` aan
- Modal sluit automatisch na bevestigen
