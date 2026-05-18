# ActionPopup

Basis pop-up wrapper voor snelle acties vanuit het Verwachte Personen overzicht.
Alle actie-modals (check-in, check-out, no-show, annuleren) zijn gebouwd op deze component.

**Figma:** nog te definiëren  
**Versie:** 0.1 — Concept  
**Datum:** mei 2026

---

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

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid van de popup |
| `title` | `string` | `''` | Titel in de header |

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Sluitverzoek (v-model compatibel) |

## Slots

| Slot | Beschrijving |
|------|--------------|
| `default` | Body-inhoud (scrollbaar bij overflow) |
| `footer` | Actieknoppen; footer verschijnt alleen als slot gevuld is |

---

## Structuur

```
┌─────────────────────────────────────────┐
│  Popup header                           │
│  [Titel]                    [× sluiten] │
├─────────────────────────────────────────┤
│  Popup body (scrollbaar)                │
│  <slot />                               │
├─────────────────────────────────────────┤
│  Popup footer               (optioneel) │
│                [Annuleren] [Bevestigen] │
└─────────────────────────────────────────┘
```

---

## Gedrag

- **Backdrop** — sluit popup **niet** bij klik; actieknoppen zijn de enige uitgang.
- **Sluiten (×)** — emits `update:open: false`; geen statuswijziging.
- **Body scroll** — als inhoud de max-hoogte overschrijdt, scrollt alleen de body.
- **Body scroll lock** — `document.body.overflow: hidden` terwijl popup open is.
- **Tablet** — wordt een bottom sheet (full-width, afgerond boven, schuift omhoog).

---

## Maatvoering

| Eigenschap | Waarde |
|------------|--------|
| Breedte | `480px` (max `90vw`) |
| Max hoogte | `92vh` (body scrollt) |
| Border radius | `--r-l` (12px) |
| Header min-hoogte | `64px` |
| Footer min-hoogte | `64px` |

---

## Gebuikte tokens

| Token | Gebruik |
|-------|---------|
| `--n0` | Achtergrond popup |
| `--n300` | Header/footer scheidingslijnen, rand |
| `--n900` | Titeltekst |
| `--r-l` | Afronding popup |
| `--shadow-l` | Drop shadow |

---

## Actie-modals gebouwd op ActionPopup

| Component            | Flow                         | Variant                     |
|----------------------|------------------------------|-----------------------------|
| `AanmeldenModal.vue` | Persoon aanmelden / afmelden | Bevestiging + persoonskaart |
| `AnnulerenModal.vue` | Persoon annuleren            | Destructieve bevestiging    |

---

## Close-knop

Gebruik `IconButton` variant `ghost` size `md` icon `close`:

```vue
<IconButton icon="close" aria-label="Sluiten" size="md" variant="ghost" @click="close" />
```

---

## Noot: Modal.vue vs ActionPopup.vue

`Modal.vue` blijft in gebruik voor informatieve/detail-dialogs (3 breedtes, sluit op backdrop).
`ActionPopup.vue` is specifiek voor snelle acties: vaste 480px breedte, geen backdrop-sluiten, tablet bottom sheet.
