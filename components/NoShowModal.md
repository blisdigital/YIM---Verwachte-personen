# NoShowModal

Formulier-popup voor het registreren van een no-show. Vraagt de gebruiker een reden te kiezen (verplicht) en optioneel een opmerking toe te voegen. Gebouwd op `<ActionPopup>`.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<NoShowModal
  v-model:open="showNoShow"
  :person="activePerson"
  @confirm="handleNoShowConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die als no-show geregistreerd wordt |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person, reden, opmerking }` | Gebruiker heeft bevestigd |

**Payload details:**
- `reden` — geselecteerde optie uit de dropdown (`string`)
- `opmerking` — vrije tekst of `null` als leeg gelaten

---

## Inhoud

**Veld: Reden** (verplicht)

Selectbox met opties:
- Persoon heeft niet afgezegd
- Persoon heeft afgezegd
- Bezoek niet doorgegaan
- Onbekend

**Veld: Opmerking** (optioneel)

Vrij tekstveld (`<textarea>`, 3 rijen).

**Foutmelding**

Bij bevestigen zonder reden: inline foutmelding onder de selectbox.

**Footer**

Annuleren (ghost) + Bevestigen (filled).

---

## Gedrag

- Bevestigen zonder reden geselecteerd: inline foutmelding, geen `confirm` event
- Foutmelding verdwijnt zodra gebruiker een reden selecteert
- State (`selectedReden`, `opmerking`, `showError`) wordt gereset bij sluiten (via `watch` op `open`)
- Modal sluit automatisch na bevestigen

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Veld achtergrond | `--popup-field-bg` | Popup-specifieke token |
| Veld border | `--popup-field-border` | Popup-specifieke token |
| Veld border-radius | `--popup-field-radius` | Popup-specifieke token |
| Focus ring | `--p500` + `rgba(109,174,186,0.2)` | Teal focus outline |
| Foutmelding kleur | `--err` | Rood |
| Label kleur | `--n700` | Subtiel grijs |
