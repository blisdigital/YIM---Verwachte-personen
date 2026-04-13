# Action Components

## ActionMenu

Dropdown menu met acties per rij. De beschikbare acties zijn afhankelijk van de status van de persoon.

```vue
<ActionMenu :person="person" @action="handleAction" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `person` | `Person` | — | Persoon voor context |

**Events:**
- `@action` — Actie geselecteerd (`{ action: string, person: Person }`)

**Acties per status:**

**Verwacht:**
```
Inchecken
Pas koppelen
No-show
Annuleren          ← rood (danger)
──────────
Bekijk dossier
Contact opnemen
Bel contactpersoon
```

**Aangekomen:**
```
Uitchecken
Pas ontkoppelen
Pas printen
──────────
Bel persoon
Bekijk dossier
Contactpersoon informeren
```

**No-show:**
```
No-show ongedaan maken
Inchecken
Pas koppelen
Annuleren          ← rood (danger)
──────────
Bel persoon
Bekijk dossier
Contactpersoon informeren
```

**Geannuleerd / Vertrokken:**
```
Bel persoon
Bekijk dossier
Contactpersoon informeren
```

**Icon mapping:**

| Actie | Icon |
|-------|------|
| Inchecken | `login` |
| Uitchecken | `logout` |
| Pas koppelen | `badge` |
| Pas ontkoppelen | `badge` (of `link_off`) |
| Pas printen | `print` |
| No-show | `person_off` |
| No-show ongedaan maken | `undo` |
| Annuleren | `cancel` |
| Bekijk dossier | `folder_open` |
| Contact opnemen | `mail` |
| Bel persoon / Bel contactpersoon | `phone` |
| Contactpersoon informeren | `notifications` |

---

## BulkBar

Toolbar die verschijnt boven de tabel bij 1 of meer geselecteerde rijen.

```vue
<BulkBar
  v-if="selectedCount > 0"
  :count="selectedCount"
  :selected-persons="selectedPersons"
  @action="handleBulkAction"
  @clear="clearSelection"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `count` | `number` | — | Aantal geselecteerd |
| `selectedPersons` | `Person[]` | — | Geselecteerde personen (voor disabled logic) |

**Lay-out:**
```
[N geselecteerd]  [↑ Inchecken] [↓ Uitchecken*] [🪪 Pas koppelen] [🖨️ Pas printen*] [👤 No-show] [✕ Annuleren]        [×]
```
`*` = disabled als er geen Aangekomen-personen geselecteerd zijn (Uitchecken / Pas printen).

**Events:**
- `@action` — Bulk actie (`{ action: 'inchecken' | 'uitchecken' | 'pas-koppelen' | 'pas-printen' | 'no-show' | 'annuleren' }`)
- `@clear` — Selectie wissen (× knop)

---

## SplitButton

Split button met primaire actie én dropdown.

```vue
<!-- Nieuwe registratie -->
<SplitButton
  label="Nieuwe registratie"
  icon="add"
  variant="primary"
  :options="registratieOpties"
  @click="newRegistration"
  @select="handleOption"
/>

<!-- Instellingen -->
<SplitButton
  label="Instellingen"
  icon="settings"
  variant="outlined"
  :options="instellingenOpties"
  @click="openInstellingen"
  @select="handleOption"
/>
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `label` | `string` | — | Button label |
| `icon` | `string` | — | Button icon |
| `variant` | `'primary' \| 'outlined'` | `'primary'` | Visuele stijl |
| `options` | `{ value: string, label: string, icon?: string }[]` | — | Dropdown opties |

**"Nieuwe registratie" dropdown opties:**

```js
[
  { value: 'bezoeker',             label: 'Bezoeker registreren' },
  { value: 'contractor',           label: 'Contractor registreren en autoriseren' },
  { type: 'divider' },
  { value: 'upload-bezoekers',     label: 'Bezoeker(s) uploaden' },
  { value: 'upload-contractors',   label: 'Contractor(s) uploaden' },
]
```

**Dropdown styling (per Figma):**
- Container: `padding: 16px 0`, `gap: 8px` (flex-col), `border-radius: 4px`, `box-shadow: 0px 4px 16px 0px rgba(17,19,19,0.16)`
- Items: `padding: 4px 16px`, geen vaste hoogte (multi-line items groeien mee)
- Divider: `height: 1px`, `background: --n300`, geen eigen margin (gap van container zorgt voor spacing)

**Events:**
- `@click` — Hoofdbutton geklikt
- `@select` — Dropdown optie geselecteerd (`value: string`)
