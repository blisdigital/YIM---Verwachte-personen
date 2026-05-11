# Modal

Modale dialoog voor informatieve weergave en bevestigingsschermen. Sluit bij klik op backdrop.

Voor actie-popups (check-in, no-show, annuleren) gebruik `<ActionPopup>` — zie [ActionPopup.md](ActionPopup.md).

**Figma:** nog te definiëren  
**Versie:** 0.1  
**Datum:** mei 2026

---

## Gebruik

```vue
<Modal v-model:open="showModal" title="Inchecken bevestigen">
  <p>Weet je zeker dat je Sophie van der Berg wilt inchecken?</p>
  <template #footer>
    <BaseButton variant="outlined" @click="showModal = false">Annuleren</BaseButton>
    <BaseButton @click="confirmCheckin">Inchecken</BaseButton>
  </template>
</Modal>
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `title` | `string` | — | Modal titel |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Breedte |

---

## Events

| Event | Payload | Beschrijving |
|-------|---------|--------------|
| `update:open` | `boolean` | Sluitverzoek |

---

## Slots

| Slot | Beschrijving |
|------|-------------|
| `default` | Body content |
| `footer` | Actie knoppen |

---

## Gedrag

- Sluit bij klik op backdrop (onderscheid met `ActionPopup` die dit niet doet)
- Gebruikt `<Teleport to="body">`

---

## Modal vs ActionPopup

| | Modal | ActionPopup |
|---|---|---|
| Sluit op backdrop | ✓ | ✗ |
| Breedte | 3 varianten (sm/md/lg) | Vast 480px |
| Tablet variant | — | Bottom sheet |
| Gebruik | Informatief / detail | Snelle acties |
