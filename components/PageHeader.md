# PageHeader

Paginatitel + actieknoppen voor de huidige view. Bevat de "Instellingen"-knop (custom dropdown) en "Nieuwe registratie" (inline `<BaseButton>` + dropdown — geen `<SplitButton>`).

```vue
<PageHeader title="Verwachte personen" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `title` | `string` | `'Verwachte personen'` | Paginatitel |

Geen events — acties worden intern afgehandeld via `useToast` en `useColumnStore`.

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
