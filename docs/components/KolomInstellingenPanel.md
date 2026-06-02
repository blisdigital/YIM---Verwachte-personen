# KolomInstellingenPanel

Popover panel voor kolomzichtbaarheid, plus het InstellingenMenu dat het aanstuurt. Gerenderd als `position: absolute` relatief aan `.instellingen-wrap`. Opent bij klik op "Kolominstellingen" in het InstellingenMenu.

## Relaties
- **Gebruikt door:** PageHeader (InstellingenMenu)
- **Gebruikt:** — (geen child-componenten; leest `columns.json` en `columnStore`)

## Gebruik

```vue
<KolomInstellingenPanel :open="showKolomPanel" @close="showKolomPanel = false" />
```

## Props

| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid panel |

## Events

| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `close` | — | Panel sluiten |

## Inhoud

### InstellingenMenu

| Label | Actie |
|-------|-------|
| Kolominstellingen | Opent KolomInstellingenPanel |
| Opgeslagen set toepassen | Submenu met opgeslagen sets |

### Panel layout

400px breed, scrollbare kolommenlijst (max 240px). Footer: Reset standaard, Set opslaan, Toepassen.

### Kolommenlijst

**Vergrendeld:** `naam` (altijd zichtbaar, 45% opacity).
**Standaard AAN:** status, datumVanaf, aankomsttijd, vertrekTijd, vertrekDatum, locaties, persoontype, contractortype, vip, bedrijf, credentialType, credentialStatus, compliance, parkeren, contactpersoon, bezoekreden.
**Standaard UIT:** personeelsnr, telefoonnummer, emailadres.

## Gedrag

- Panel sluit bij: klik "Toepassen", klik buiten panel.
- Wijzigingen zijn lokaal totdat "Toepassen" geklikt wordt.
- Minimum: minstens 1 niet-vergrendelde kolom moet geselecteerd blijven.
- "Set opslaan" opent inline tekstveld in footer.

### State management (columnStore)

`columnStore` exposeert: `visibleColumns`, `savedSets` (localStorage: `'yim-column-sets'`), `DEFAULT_VISIBLE`, `LOCKED_COLUMNS`, `applyColumns(keys)`, `saveSet(name)`, `applySet(set)`, `resetToDefault()`.

`applyColumns` en `applySet` voegen `LOCKED_COLUMNS` altijd toe.

## Design Tokens

| Element | Token | Waarde |
|---------|-------|--------|
| Panel achtergrond | `--n0` | wit |
| Panel radius | `--r-s` | 4px |
| Panel shadow | `--shadow-m` | `0 4px 16px -2px rgba(17,19,19,0.16)` |
| Selecteer alles bg | `--n50` | lichtgrijs |
| Kolom-rij hover | `--p50` | licht teal |
| Kolom-rij label | `--n900` | donkergrijs |
| Checkbox gecheckt | `--p500` | teal |
| Checkbox niet gecheckt | `--n400` | grijs |
