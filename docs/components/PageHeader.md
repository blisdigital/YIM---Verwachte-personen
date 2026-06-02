# PageHeader

Paginatitel + actieknoppen voor de huidige view. Heeft twee modi: standaard (actieknoppen) en back-modus (terug-knop + optionele subtitle).

## Relaties
- **Gebruikt door:** VerwachtePersonenView
- **Gebruikt:** BaseButton, KolomInstellingenPanel

## Gebruik

```vue
<!-- Standaard -->
<PageHeader title="Verwachte personen" />

<!-- Back-modus -->
<PageHeader
  title="Credential koppelen"
  subtitle="Jan de Vries · Bedrijf BV"
  :show-back="true"
  @back="nav.goBack()"
/>
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `title` | `String` | `'Verwachte personen'` | Paginatitel |
| `subtitle` | `String` | `''` | Optionele subtitel (bijv. persoonsnaam). Alleen zichtbaar in back-modus. |
| `showBack` | `Boolean` | `false` | Schakel terug-knop in; verbergt actieknoppen |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `back` | — | Terug-knop geklikt (alleen in back-modus) |

## Gedrag

- **Standaard** (`showBack: false`) — toont "Instellingen" en "Nieuwe registratie" knoppen.
- **Back-modus** (`showBack: true`) — toont terug-knop + optionele subtitle; geen actieknoppen.
- **Instellingen** — outlined button, opent dropdown met "Kolominstellingen" (opent KolomInstellingenPanel) en "Opgeslagen set toepassen" (submenu). Intern via `useColumnStore`.
- **Nieuwe registratie** — filled button, opent dropdown: Bezoeker registreren, Contractor registreren en autoriseren, divider, Bezoeker(s) uploaden, Contractor(s) uploaden.
- Titel: `40px / 700`, `var(--p700)`, `letter-spacing: -0.4px`, `line-height: 48px`.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Titel kleur | `--p700` | `#1a7a8a` |
| Titel font-size | — | `40px` |
| Titel letter-spacing | — | `-0.4px` |
| Titel line-height | — | `48px` |
| Subtitel kleur | `--n600` | `#6e7071` |
| Back-knop kleur | `--n600` | `#6e7071` |
| Back-knop hover | `--p700` | `#1a7a8a` |
| Instellingen border | `--n400` | `#b8babb` |
| Instellingen hover bg | `--n50` | `#f8fafb` |
| Menu bg | `--n0` | `#ffffff` |
| Menu shadow | `--shadow-m` | `0px 4px 16px -2px rgba(17,19,19,0.16)` |
| Menu item hover | `--n50` | `#f8fafb` |
| Actie-groep gap | `--sp-s` | `8px` |
