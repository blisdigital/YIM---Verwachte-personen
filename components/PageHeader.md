# PageHeader

Paginatitel + actieknoppen voor de huidige view. Heeft twee modi:

- **Standaard** (`showBack: false`) — toont "Instellingen" en "Nieuwe registratie" knoppen
- **Back-modus** (`showBack: true`) — toont een terug-knop + optionele subtitle; geen actieknoppen

```vue
<!-- Standaard -->
<PageHeader title="Verwachte personen" />

<!-- Back-modus (bijv. detail-/actie-pagina's) -->
<PageHeader
  title="Credential koppelen"
  subtitle="Jan de Vries · Bedrijf BV"
  :show-back="true"
  @back="nav.goBack()"
/>
```

| Prop       | Type      | Default                 | Beschrijving                                                              |
| ---------- | --------- | ----------------------- | ------------------------------------------------------------------------- |
| `title`    | `string`  | `'Verwachte personen'`  | Paginatitel                                                               |
| `subtitle` | `string`  | `''`                    | Optionele subtitel (bijv. persoonsnaam). Alleen zichtbaar in back-modus.  |
| `showBack` | `boolean` | `false`                 | Schakel terug-knop in; verbergt actieknoppen                              |

| Event  | Payload | Beschrijving                              |
| ------ | ------- | ----------------------------------------- |
| `back` | —       | Terug-knop geklikt (alleen in back-modus) |

Acties ("Instellingen", "Nieuwe registratie") worden intern afgehandeld via `useToast` en `useColumnStore` — alleen beschikbaar in standaardmodus.

## Titel

`40px / 700`, `var(--p700)`, `letter-spacing: -0.4px`, `line-height: 48px`

## Instellingen-knop

```vue
<BaseButton variant="outlined" size="lg" icon="expand_more" icon-position="right">Instellingen</BaseButton>
```

Zie [BaseButton.md](BaseButton.md). Opent een custom dropdown met KolomInstellingenPanel en submenu voor opgeslagen sets. Volledige spec: [Settings.md](Settings.md).

## Nieuwe registratie

```vue
<BaseButton variant="filled" size="lg" icon="expand_more" icon-position="right">Nieuwe registratie</BaseButton>
```

Zie [BaseButton.md](BaseButton.md). Bij klik opent een `<ActionMenu>` als dropdown — zie [ActionMenu.md](ActionMenu.md).

Dropdown-opties:
```js
[
  { value: 'bezoeker',           label: 'Bezoeker registreren' },
  { value: 'contractor',         label: 'Contractor registreren en autoriseren' },
  { type: 'divider' },
  { value: 'upload-bezoekers',   label: 'Bezoeker(s) uploaden' },
  { value: 'upload-contractors', label: 'Contractor(s) uploaden' },
]
```
