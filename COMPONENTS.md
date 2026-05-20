# Component Specificaties — Index

Gedetailleerde specificaties per component staan in `components/`:

| Bestand | Componenten |
| --- | --- |
| [`components/AppHeader.md`](components/AppHeader.md) | AppHeader |
| [`components/PageHeader.md`](components/PageHeader.md) | PageHeader |
| [`components/ProcessNav.md`](components/ProcessNav.md) | ProcessNav |
| [`components/BaseButton.md`](components/BaseButton.md) | BaseButton |
| [`components/IconButton.md`](components/IconButton.md) | IconButton |
| [`components/InputField.md`](components/InputField.md) | InputField |
| [`components/Toggle.md`](components/Toggle.md) | Toggle |
| [`components/StatusDot.md`](components/StatusDot.md) | StatusDot |
| [`components/PassStatusDot.md`](components/PassStatusDot.md) | PassStatusDot |
| [`components/CompliancePill.md`](components/CompliancePill.md) | CompliancePill, ComplianceCell |
| [`components/Modal.md`](components/Modal.md) | Modal |
| [`components/DatePopover.md`](components/DatePopover.md) | DatePopover |
| [`components/Toast.md`](components/Toast.md) | Toast, ToastContainer |
| [`components/Tooltip.md`](components/Tooltip.md) | Tooltip |
| [`components/DatePickerCalendar.md`](components/DatePickerCalendar.md) | DatePickerCalendar |
| [`components/TimePopover.md`](components/TimePopover.md) | TimePopover |
| [`components/TypeTabs.md`](components/TypeTabs.md) | TypeTabs |
| [`components/DateFilterChip.md`](components/DateFilterChip.md) | DateFilterChip |
| [`components/FilterChip.md`](components/FilterChip.md) | FilterChip |
| [`components/FilterStrip.md`](components/FilterStrip.md) | FilterStrip |
| [`components/SearchBox.md`](components/SearchBox.md) | SearchBox |
| [`components/DataTable.md`](components/DataTable.md) | DataTable |
| [`components/TableRow.md`](components/TableRow.md) | TableRow |
| [`components/ColumnFilters.md`](components/ColumnFilters.md) | ColumnFilters |
| [`components/Pagination.md`](components/Pagination.md) | Pagination |
| [`components/ActionMenu.md`](components/ActionMenu.md) | ActionMenu |
| [`components/BulkBar.md`](components/BulkBar.md) | BulkBar |
| [`components/ActionPopup.md`](components/ActionPopup.md) | ActionPopup |
| [`components/AanmeldenModal.md`](components/AanmeldenModal.md) | AanmeldenModal |
| [`components/AfmeldenModal.md`](components/AfmeldenModal.md) | AfmeldenModal |
| [`components/AnnulerenModal.md`](components/AnnulerenModal.md) | AnnulerenModal |
| [`components/AankomstWijzigenModal.md`](components/AankomstWijzigenModal.md) | AankomstWijzigenModal |
| [`components/InformeerContactpersoonModal.md`](components/InformeerContactpersoonModal.md) | InformeerContactpersoonModal |
| [`components/ProcessBottomBar.md`](components/ProcessBottomBar.md) | ProcessBottomBar |
| [`components/DetailPanel.md`](components/DetailPanel.md) | DetailPanel |
| [`components/KolomInstellingenPanel.md`](components/KolomInstellingenPanel.md) | InstellingenMenu, KolomInstellingenPanel |
| [`components/InfoSection.md`](components/InfoSection.md) | InfoSection |

## Snel overzicht

```text
layout/
  AppHeader            — App-balk met hamburger, YIM-logo, taal/gebruiker
  PageHeader           — Paginatitel + Instellingen + Nieuwe registratie knoppen
  ProcessNav           — Zijbalk-navigatie voor multi-step processen (Credential koppelen / printen)

ui/
  BaseButton           — Generieke knop met tekstlabel (filled / outlined / outlined-brand / ghost / gray)
  ProcessBottomBar     — Vaste actie-balk onderaan processpagina's (koppelen / printen flows)
  IconButton           — Icon-only knop zonder label (filled / outlined / ghost / gray)
  InputField           — Tekstveld met label, states (default/hover/focus/filled/disabled/readonly/error) en optionele leading/trailing icon
  Toggle               — On/off-schakelaar met label en states (default/hover/focus/disabled)
  StatusDot            — Gekleurde stip + label per status (Verwacht, Aangemeld, etc.)
  PassStatusDot        — Gekleurde stip + label voor credentialStatus
  CompliancePill       — Enkele dossier- of e-learning pill met hover-tooltip (tooltip inline geïmplementeerd)
  ComplianceCell       — Dunne wrapper (CompliancePill.md) die 0-2 pills rendert in tabelcel
  Tooltip              — Generieke hover-tooltip wrapper (content: string | string[])
  ActionPopup          — Basis wrapper voor alle actie-popups (480px, bottom-sheet op tablet)
  Modal                — Modale dialoog (slots: default, footer)
  Toast / ToastContainer — Notificatie toasts via useToast() composable; standaard: Neutral · cancel=true (zie Toast.md)
  DatePopover          — Gedeeld datum-filterpaneel (Filter titel, datumveld, presets, footer)
  DatePickerCalendar   — Custom kalender in YIM-stijl (maand-nav, dag-grid, states)
  TimePopover          — Scrollbare tijdkiezer (uren/minuten kolommen, Nu-knop)
  InfoSection          — Sectie-kaart met h3-titel + label/waarde rijen; gebruikt in credential-pagina's

filters/
  TypeTabs          — Segmented tabs (Alle / Bezoekers / Contractors) met counts
  DateFilterChip    — Datum-chip met popup (presets + datuminput)
  FilterChip        — Generieke filter-chip met checkbox dropdown
  FilterStrip       — Container voor alle filtercomponenten
  SearchBox         — Zoek input met debounce (300ms)

table/
  DataTable         — Tabel container met horizontale scroll + kolom-resize
  TableRow          — Enkele rij met cel-rendering per type
  ColumnFilters     — Filterrij onder kolomheaders (text, dropdown, date, time)
  Pagination        — Paginering met page-size selector

actions/
  ActionMenu        — Context menu per rij (acties afhankelijk van status)
  BulkBar           — Toolbar bij selectie (inchecken, uitchecken, etc.)
  AanmeldenModal    — Bevestigingsdialoog voor persoon aanmelden (gebruikt ActionPopup)
  AfmeldenModal     — Bevestigingsdialoog voor persoon afmelden (gebruikt ActionPopup)
  AnnulerenModal          — Destructieve bevestiging voor annuleren (gebruikt ActionPopup)
  AankomstWijzigenModal   — Datum/tijd wijzigen voor verwachte aankomst (gebruikt ActionPopup)
  InformeerContactpersoonModal — E-mail sturen naar contactpersoon (gebruikt ActionPopup)

detail/
  DetailPanel       — Gecentreerde modal (832px) met volledige persoonsgegevens en acties per status

settings/
  KolomInstellingenPanel — Popover met kolom toggles, zoeken, sets opslaan/laden

  InstellingenMenu is geen zelfstandig component. Het is de dropdown-knop in PageHeader die
  KolomInstellingenPanel opent — geïmplementeerd inline in PageHeader.vue. Zie Settings.md.
```

## Noot: Dropdown component

Er is geen zelfstandige `<Dropdown>` component. Alle dropdowns (ActionMenu, FilterChip, InstellingenMenu) implementeren hun eigen positionering via `<Teleport to="body">` met `position: fixed`.

Er is ook geen `<SplitButton>` component. Knoppen met een dropdown (zoals "Nieuwe registratie" in de PageHeader) gebruiken `<BaseButton>` gecombineerd met `<ActionMenu>` — zie [BaseButton.md](components/BaseButton.md).

Voor knoppen zonder label (hamburger, sluiten, ×) wordt `<IconButton>` gebruikt — zie [IconButton.md](components/IconButton.md).
