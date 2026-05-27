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

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Backdrop achtergrond | — | `rgba(0, 0, 0, 0.4)` |
| Modal achtergrond | `--n0` | `#ffffff` |
| Modal radius | `--r-l` | `12px` |
| Modal shadow | `--shadow-xl` | `0px 8px 32px -4px rgba(17,19,19,0.24)` |
| Header border | `--n300` | `#eaeced` |
| Titel kleur | `--n900` | `#1d1e1f` |
| Close knop kleur | `--n700` | `#555657` |
| Close knop hover | `--n100` | `#f3f4f5` |
| Close knop radius | `--r-s` | `4px` |
| Footer border | `--n300` | `#eaeced` |

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
