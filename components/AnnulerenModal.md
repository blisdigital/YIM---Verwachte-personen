# AnnulerenModal

Destructieve bevestigingsdialoog voor het annuleren van een verwachte persoon. Gebouwd op `<ActionPopup>`.

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<AnnulerenModal
  v-model:open="showAnnuleren"
  :person="activePerson"
  @confirm="handleAnnulerenConfirm"
/>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon die geannuleerd wordt |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | `{ person }` | Gebruiker heeft bevestigd — ouder verantwoordelijk voor statuswijziging |

---

## Inhoud

Waarschuwingsblok met:
- Icoon: `warning` (Material Icons Round, 20px)
- Tekst: "Weet je zeker dat je **[naam]** wil annuleren? De persoon moet opnieuw worden aangemeld."

Als geen persoon meegegeven: "Weet je zeker dat je **deze verwachte persoon** wil annuleren?"

**Footer:** Annuleren (ghost) + Bevestigen (destructive — rode achtergrond).

---

## Gedrag

- Geen formulierveld — directe bevestiging zonder extra invoer
- Bevestigen: emit `confirm` → modal sluit direct
- Bevestigingsknop gebruikt `variant="destructive"` (rode achtergrond)

---

## Design Tokens

| Element | Token | Beschrijving |
|---------|-------|--------------|
| Waarschuwingsblok achtergrond | `--popup-cancel-bg` | Popup-specifieke token |
| Waarschuwingsblok border | `--popup-cancel-border` | Popup-specifieke token |
| Waarschuwingsicoon kleur | `--popup-cancel-icon` | Popup-specifieke token |
| Afronding blok | `--r-m` | 8px |
