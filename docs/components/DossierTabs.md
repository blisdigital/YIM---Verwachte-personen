# DossierTabs

Horizontale tabstrip voor navigatie tussen secties op de dossierpagina. Ondersteunt `v-model` voor two-way binding van de actieve tab.

## Relaties
- **Gebruikt door:** DossierView
- **Gebruikt:** — (geen child-componenten)

## Gebruik

```vue
<DossierTabs v-model="activeTab" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `modelValue` | `String` | `'dossier'` | Actieve tab id: `'dossier'`, `'credentials'`, `'autorisaties'`, `'aanmeldingen'`, `'kwalificaties'`, `'historie'`. |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:modelValue` | `String` (tab id) | Klik op een tab. |

## Inhoud

| id | Label |
|----|-------|
| `dossier` | Dossier |
| `credentials` | Credentials |
| `autorisaties` | Autorisaties |
| `aanmeldingen` | Aanmeldingen |
| `kwalificaties` | Kwalificaties |
| `historie` | Historie |

## Gedrag

- Elke tab 200px breed, gecentreerde tekst, `white-space: nowrap`
- Actieve tab: teal onderrand (`--p500`, 2px) + licht-teal achtergrond (`--p50`)
- Niet-actieve tabs: hover `--n50`
- Toegankelijkheid: `role="tablist"` en `role="tab"` met `aria-selected`
- Tabs zijn hardcoded in het component

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Tab tekstkleur | `--n900` | donkergrijs/zwart |
| Tab hover achtergrond | `--n50` | lichtgrijs |
| Actieve tab achtergrond | `--p50` | licht teal |
| Actieve tab onderrand | `--p500` | teal accent (2px solid) |
