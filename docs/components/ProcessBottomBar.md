# ProcessBottomBar

Vaste actie-balk onderaan de pagina voor procesflows (Credential koppelen / Credential printen). Scrollt niet mee met de pagina-inhoud. Altijd zichtbaar als de pagina-inhoud groter wordt dan het viewport.

**Figma:** [`213:59721`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=213-59721)

**Bron spec:** `bottom_button_bar_credential_flows.md`

```vue
<!-- Credential koppelen -->
<ProcessBottomBar flow="koppelen" @cancel="nav.goBack()" @submit="handleSubmit" />

<!-- Credential printen -->
<ProcessBottomBar flow="printen" :primary-disabled="!activateEnabled" @cancel="nav.goBack()" @print="handlePrint" @activate="handleActivate" />
```

---

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `flow` | `'koppelen' \| 'printen'` | — (required) | Bepaalt welke knoppen rechts verschijnen |
| `primaryDisabled` | `boolean` | `false` | Zet de primaire actieknop op disabled |

---

## Events

| Event | Flow | Beschrijving |
|-------|------|--------------|
| `cancel` | beide | Annuleren geklikt |
| `submit` | `koppelen` | "Koppelen" geklikt |
| `print` | `printen` | "Printen" geklikt |
| `activate` | `printen` | "Activeren" geklikt |

---

## Knoppen per flow

### `flow="koppelen"`

```
[Annuleren]                                        [Koppelen]
```

| Positie | Label | Variant | Initial state |
|---------|-------|---------|---------------|
| Links | Annuleren | `ghost` | Enabled |
| Rechts | Koppelen | `filled` | Enabled (stel `primaryDisabled` in vanuit parent) |

### `flow="printen"`

```
[Annuleren]                          [Printen]  [Activeren]
```

| Positie | Label | Variant | Initial state |
|---------|-------|---------|---------------|
| Links | Annuleren | `ghost` | Enabled |
| Midden-rechts | Printen | `outlined-brand` | Enabled |
| Rechts | Activeren | `filled` | Disabled (`:primary-disabled="true"`) |

`Activeren` wordt enabled nadat print → scan → code-invoer geslaagd zijn. De parent beheert deze state.

---

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond | `--p50` | `#f0f7f8` |
| Bovenrand | `--p100` | `#d6e8ec` |
| Padding verticaal | `--sp-s` | `8px` |
| Padding horizontaal | `--sp-l` | `16px` |
| Gap knoppen rechts | `--sp-s` | `8px` |

Knoppen gebruiken `BaseButton` met `size="lg"` (48px hoogte, `12px 24px` padding, Label L font).

Zie [BaseButton.md](BaseButton.md) voor variant-tokens (incl. `outlined-brand`).

---

## Plaatsing in view

De balk is het laatste kind van `.app-layout` (flex column). De `.page-body` erboven heeft `flex: 1` en `overflow: hidden` — de page-main erin scrollt zelfstandig.

```
.app-layout (flex column, min-height: 100vh)
  AppHeader
  .page-body (flex: 1, overflow: hidden)
    ProcessNav
    .page-main (flex: 1, overflow-y: auto)
      [scroll-inhoud]
  ProcessBottomBar  ← altijd zichtbaar onderaan
```
