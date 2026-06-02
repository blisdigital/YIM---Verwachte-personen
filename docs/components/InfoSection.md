# InfoSection

Sectie-card voor gestructureerde label/waarde-weergave. Gebruikt in credential-pagina's en detail-panels. Biedt twee varianten: statisch via `rows` prop, dynamisch via default slot.

## Relaties
- **Gebruikt door:** — (geen directe imports gevonden; bedoeld voor credential-pagina's en detail-panels)
- **Gebruikt:** — (geen child-componenten)

## Gebruik

### Statische rijen

```vue
<InfoSection
  title="Persoonsgegevens"
  :rows="[
    { label: 'Naam', value: person.naam },
    { label: 'Bedrijf', value: person.bedrijf },
  ]"
/>
```

### Dynamische rijen (slot)

```vue
<InfoSection title="Koppelen">
  <div class="form-row">
    <span class="form-row__label">Credential nummer</span>
    <InputField v-model="credentialNummer" placeholder="14-cijferig nummer" />
  </div>
</InfoSection>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `title` | `String` | `null` | Sectietitel (H3, `--p700`). Header verborgen als `null`. |
| `rows` | `Array` | `null` | Statische rijen: `[{ label, value }]`. `null` waarden als `--` getoond. |

## Slots

| Slot | Beschrijving |
|------|-------------|
| `default` | Custom rij-content voor form-elementen. |

## Gedrag

- Combineer `rows` en slot nooit in dezelfde instantie (border-overlap)
- Slot-content wordt gestyled door de parent via `.form-row` klasse

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Kaart achtergrond | `--n0` | wit |
| Kaart border | `--n300` | lichtgrijs |
| Kaart radius | `--r-m` | 8px |
| Titel kleur | `--p700` | teal |
| Rij label kleur | `--p700` | teal |
| Rij achtergrond | `--p50` | licht teal |
| Rij border | `--p100` | teal licht |
| Rij waarde kleur | `--n900` | donkergrijs |
| Rij padding-y | `--sp-m` | 12px |
| Rij padding-x / gap | `--sp-l` | 16px |
