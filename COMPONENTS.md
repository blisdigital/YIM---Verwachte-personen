# Component Specificaties — Index

Gedetailleerde specificaties per component staan in `components/`:

| Bestand | Componenten |
| --- | --- |
| [`components/AppHeader.md`](components/AppHeader.md) | AppHeader |
| [`components/PageHeader.md`](components/PageHeader.md) | PageHeader |
| [`components/BaseButton.md`](components/BaseButton.md) | BaseButton |
| [`components/IconButton.md`](components/IconButton.md) | IconButton |
| [`components/StatusBadge.md`](components/StatusBadge.md) | StatusBadge |
| [`components/PassStatusDot.md`](components/PassStatusDot.md) | PassStatusDot |
| [`components/CompliancePill.md`](components/CompliancePill.md) | CompliancePill |
| [`components/ComplianceCell.md`](components/ComplianceCell.md) | ComplianceCell |
| [`components/Modal.md`](components/Modal.md) | Modal |
| [`components/DatePopover.md`](components/DatePopover.md) | DatePopover |
| [`components/Toast.md`](components/Toast.md) | Toast, ToastContainer |
| [`components/Tooltip.md`](components/Tooltip.md) | Tooltip |
| [`components/DatePickerCalendar.md`](components/DatePickerCalendar.md) | DatePickerCalendar |
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
| [`components/Bulkbar.md`](components/Bulkbar.md) | BulkBar |
| [`components/ActionPopup.md`](components/ActionPopup.md) | ActionPopup |
| [`components/CheckinModal.md`](components/CheckinModal.md) | CheckinModal |
| [`components/NoShowModal.md`](components/NoShowModal.md) | NoShowModal |
| [`components/AnnulerenModal.md`](components/AnnulerenModal.md) | AnnulerenModal |
| [`components/BezoekDetail.md`](components/BezoekDetail.md) | DetailPanel |
| [`components/Settings.md`](components/Settings.md) | InstellingenMenu, KolomInstellingenPanel |

## Snel overzicht

```text
layout/
  AppHeader            — App-balk met hamburger, YIM-logo, taal/gebruiker
  PageHeader           — Paginatitel + Instellingen + Nieuwe registratie knoppen

ui/
  BaseButton           — Generieke knop met tekstlabel (filled / outlined / ghost / gray)
  IconButton           — Icon-only knop zonder label (filled / outlined / ghost / gray)
  StatusBadge          — Kleur-badge per status (Verwacht, Aangekomen, etc.) — border-radius 4px
  PassStatusDot        — Gekleurde stip + label voor passtatus
  ComplianceCell       — Compositie van 0-2 CompliancePills per tabelcel
  CompliancePill       — Enkele dossier- of e-learning pill met hover-tooltip (tooltip inline geïmplementeerd)
  Tooltip              — Generieke hover-tooltip wrapper (content: string | string[])
  ActionPopup          — Basis wrapper voor alle actie-popups (480px, bottom-sheet op tablet)
  Modal                — Modale dialoog (slots: default, footer)
  Toast / ToastContainer — Notificatie toasts via useToast() composable; standaard: Neutral · cancel=true (zie Toast.md)
  DatePopover          — Gedeeld datum-filterpaneel (Filter titel, datumveld, presets, footer)
  DatePickerCalendar   — Custom kalender in YIM-stijl (maand-nav, dag-grid, states)

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
  CheckinModal      — Bevestigingsdialoog voor inchecken / uitchecken (gebruikt ActionPopup)
  NoShowModal       — No-show registratie met reden-dropdown + opmerking (gebruikt ActionPopup)
  AnnulerenModal    — Destructieve bevestiging voor annuleren (gebruikt ActionPopup)

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
