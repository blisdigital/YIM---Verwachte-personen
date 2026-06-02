# ActionMenu

Dropdown menu met acties per rij. Beschikbare acties zijn afhankelijk van de status en credential-status van de persoon.

**Figma:** [`6:43682`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-43682&m=dev)

## Relaties
- **Gebruikt door:** TableRow
- **Gebruikt:** -- (geen child components)

## Gebruik

```vue
<ActionMenu :person="person" @action="handleAction" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `person` | `Object` | *required* | Persoon voor context (status, credentialStatus, elearning, credentialType) |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `action` | `{ action: string, person: Person }` | Actie geselecteerd uit menu |

## Gedrag

### Credential-acties (alle statussen behalve Niet aangekomen/Geannuleerd/Afgemeld)

| credentialStatus | Acties |
|---|---|
| `niet-actief` | Credential koppelen |
| `actief` + printbaar | Credential printen, Credential mailen, Credential ontkoppelen |
| `actief` + fysiek | Credential ontkoppelen |
| `verlopen` / `ingetrokken` / `geblokkeerd` | Geen credential-acties |

### E-learning uitnodiging

Alleen zichtbaar als `elearning === 'niet-behaald'` en status niet Niet aangekomen/Geannuleerd/Afgemeld.

### Status: Verwacht / Nog niet aangekomen

```
Persoon aanmelden
<credential-acties>
E-learning uitnodiging       (als elearning niet-behaald)
──────────
Informeer contactpersoon
Bekijk dossier
```

### Status: Aangemeld

```
<credential-acties>
E-learning uitnodiging       (als elearning niet-behaald)
Persoon afmelden
──────────
Informeer contactpersoon
Bekijk dossier
```

### Status: Niet aangekomen / Geannuleerd / Afgemeld

```
Informeer contactpersoon
Bekijk dossier
```

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Container bg | `--n0` | `#ffffff` |
| Container radius | `--r-s` | 4px |
| Container padding | `--sp-l` | 16px verticaal |
| Container shadow | -- | `0 4px 16px -2px rgba(17,19,19,0.16)` |
| Item padding | `--sp-l` / `--sp-xs` | 16px H / 4px V |
| Label font | Nunito 600 | 16px/24px, 0.16px |
| Label kleur | `--p700` | `#315161` |
| Separator | `--n300` | 1px solid |
