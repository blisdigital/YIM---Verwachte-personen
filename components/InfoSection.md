# InfoSection

Sectie-card voor gestructureerde label/waarde-weergave. Gebruikt in credential-pagina's en detail-panels.

Biedt twee varianten:
- **Statisch** via `rows` prop: array van `{ label, value }` objecten
- **Dynamisch** via default slot: custom form-rijen (inputs, datumkiezers, toggles)

---

## Props

| Naam | Type | Default | Beschrijving |
|---|---|---|---|
| `title` | `String` | required | Sectietitel, getoond als H3 in --p700 |
| `rows` | `Array` | `null` | Statische rijen: `[{ label: string, value: string \| null }]`. `null` waarden worden als `—` getoond. |

## Slots

| Naam | Beschrijving |
|---|---|
| `default` | Custom rij-content voor form-elementen. Styling in parent via `.form-row` klasse (zie gebruik). |

## Tokens

| Token | Element |
|---|---|
| `--n0` | Sectie-kaart achtergrond |
| `--n300` | Sectie-kaart border |
| `--r-m` | Sectie-kaart border-radius |
| `--p700` | Sectietitel kleur, rij-label kleur |
| `--p50` | Rij achtergrond |
| `--p100` | Rij border (boven/onder) |
| `--n900` | Rij waarde-tekst kleur |
| `--sp-l` | Sectie padding-top, gap header→body, rij padding-x, gap label→waarde |
| `--sp-m` | Rij padding-y |
| `--sp-s` | Header padding-y |
| `--sp-xxl` | Sectie padding-bottom |

## Gebruik

### Statische rijen (rows prop)

```vue
<InfoSection
  title="Persoonsgegevens"
  :rows="[
    { label: 'Naam',         value: person.naam },
    { label: 'Persoonstype', value: person.persoontype },
    { label: 'Bedrijf',      value: person.bedrijf },
  ]"
/>
```

### Dynamische rijen (slot) — voor form-elementen

In de parent component scoped CSS het volgende patroon toevoegen:

```css
/* Rij-stijl die .info-row in InfoSection visueel matcht */
.form-row {
  display: flex;
  align-items: center;
  gap: var(--sp-l);
  padding: var(--sp-m) var(--sp-l);
  background: var(--p50);
  border-bottom: 1px solid var(--p100);
}
.form-row:first-child { border-top: 1px solid var(--p100); }
.form-row__label {
  width: 200px;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--p700);
  line-height: 24px;
  letter-spacing: 0.16px;
}
```

In de template:
```vue
<InfoSection title="Koppelen">
  <div class="form-row">
    <span class="form-row__label">Credential nummer</span>
    <InputField v-model="credentialNummer" placeholder="14-cijferig nummer" />
    <IconButton icon="qr_code_scanner" aria-label="Scan credential" />
  </div>
</InfoSection>
```

## Opmerkingen

- Combineer `rows` en slot nooit in dezelfde instantie — rijen staan altijd boven slot-content, wat ongewenste border-overlap geeft.
- Slot-content wordt gestyled door de parent, niet door InfoSection zelf (scoped CSS bereikt slot-content niet).
