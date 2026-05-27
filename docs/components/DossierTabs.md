# DossierTabs

Horizontale tabstrip voor navigatie tussen secties op de dossierpagina. Ondersteunt `v-model` voor two-way binding van de actieve tab.

**Figma:** nog te definiëren

## Gebruik

```vue
<DossierTabs v-model="activeTab" />
```

## Props

| Prop | Type | Default | Beschrijving |
| --- | --- | --- | --- |
| `modelValue` | `String` | `'dossier'` | De id van de actieve tab. Mogelijke waarden: `'dossier'`, `'credentials'`, `'autorisaties'`, `'aanmeldingen'`, `'kwalificaties'`, `'historie'`. |

## Events

| Event | Payload | Beschrijving |
| --- | --- | --- |
| `update:modelValue` | `String` (tab id) | Wordt geemit bij klik op een tab. Maakt `v-model` binding mogelijk. |

## Tabs

| id | Label |
| --- | --- |
| `dossier` | Dossier |
| `credentials` | Credentials |
| `autorisaties` | Autorisaties |
| `aanmeldingen` | Aanmeldingen |
| `kwalificaties` | Kwalificaties |
| `historie` | Historie |

## Design Tokens

| Element | Token | Waarde |
| --- | --- | --- |
| Font | `--font` | basis lettertypefamilie |
| Tab tekstkleur | `--n900` | donkergrijs/zwart |
| Tab hover achtergrond | `--n50` | lichtgrijs (alleen niet-actieve tabs) |
| Actieve tab achtergrond | `--p50` | licht teal |
| Actieve tab onderrand | `--p500` | teal accent (2px solid) |

## Gedrag

- Elke tab is 200px breed, gecentreerde tekst, met `white-space: nowrap`.
- De actieve tab heeft een teal onderrand (`--p500`, 2px) en een licht-teal achtergrond (`--p50`).
- Niet-actieve tabs krijgen een lichtgrijze hover-achtergrond (`--n50`).
- De component gebruikt `role="tablist"` en `role="tab"` met `aria-selected` voor toegankelijkheid.
- De tabs zijn hardcoded in het component (niet via props). Nieuwe tabs vereisen een code-wijziging.
