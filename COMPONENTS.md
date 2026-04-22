# Component Specificaties — Index

Gedetailleerde specificaties per component staan in `components/`:

| Bestand | Componenten |
| --- | --- |
| [`components/AppHeader.md`](components/AppHeader.md) | AppHeader |
| [`components/PageHeader.md`](components/PageHeader.md) | PageHeader |
| [`components/BaseButton.md`](components/BaseButton.md) | BaseButton |
| [`components/IconButton.md`](components/IconButton.md) | IconButton |
| [`components/ui-atoms.md`](components/ui-atoms.md) | StatusBadge, PassStatusDot, CompliancePill, ComplianceCell, Modal, DatePopover, Toast, ToastContainer |
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
| [`components/CheckinModal.md`](components/CheckinModal.md) | CheckinModal |
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
  CompliancePill       — Enkele dossier- of e-learning pill met hover-tooltip
  Modal                — Modale dialoog (slots: default, footer)
  Toast / ToastContainer — Notificatie toasts via useToast() composable
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
  CheckinModal      — Bevestigingsdialoog voor inchecken / uitchecken

detail/
  DetailPanel       — Slide-out paneel rechts met volledige persoonsgegevens en acties

settings/
  InstellingenMenu       — Custom dropdown knop in de PageHeader (Kolominstellingen + Opgeslagen sets)
  KolomInstellingenPanel — Popover met kolom toggles, zoeken, sets opslaan/laden
```

## Noot: Dropdown component

Er is geen zelfstandige `<Dropdown>` component. Alle dropdowns (ActionMenu, FilterChip, InstellingenMenu) implementeren hun eigen positionering via `<Teleport to="body">` met `position: fixed`.

Er is ook geen `<SplitButton>` component. Knoppen met een dropdown (zoals "Nieuwe registratie" in de PageHeader) gebruiken `<BaseButton>` gecombineerd met `<ActionMenu>` — zie [BaseButton.md](components/BaseButton.md).

Voor knoppen zonder label (hamburger, sluiten, ×) wordt `<IconButton>` gebruikt — zie [IconButton.md](components/IconButton.md).
