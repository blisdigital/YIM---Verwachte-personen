# Component Specificaties — Index

Gedetailleerde specificaties per componentgroep staan in `components/`:

| Bestand | Componenten |
|---------|-------------|
| [`components/ui-atoms.md`](components/ui-atoms.md) | BaseButton, StatusBadge, PassStatusDot, ComplianceCell, Dropdown, Modal, Toast, DatePopover, DatePickerCalendar |
| [`components/filters.md`](components/filters.md) | TypeTabs, DateFilterChip, FilterChip, SearchBox |
| [`components/table.md`](components/table.md) | DataTable, TableRow, ColumnFilters, Pagination |
| [`components/actions.md`](components/actions.md) | ActionMenu, BulkBar, SplitButton |
| [`components/settings.md`](components/settings.md) | InstellingenMenu, KolomInstellingenPanel |

## Snel overzicht

```
ui/
  BaseButton           — Generieke knop (primary / outlined / ghost)
  StatusBadge          — Kleur-badge per status (Verwacht, Aangekomen, etc.)
  PassStatusDot        — Gekleurde stip voor passtatus
  ComplianceCell       — Dossier + E-learning iconen
  Dropdown             — Generiek dropdown menu
  Modal                — Modale dialoog
  Toast                — Notificatie toast
  DatePopover          — Gedeeld datum-filterpaneel (Filter titel, datumveld, presets, footer)
  DatePickerCalendar   — Custom kalender in YIM-stijl (maand-nav, dag-grid, states)

filters/
  TypeTabs          — Segmented tabs (Alle / Bezoekers / Contractors) met counts
  DateFilterChip    — Datum-chip met popup (presets + datuminput)
  FilterChip        — Generieke filter-chip met checkbox dropdown
  SearchBox         — Zoek input met debounce

table/
  DataTable         — Tabel container met horizontale scroll
  TableRow          — Enkele rij met cel-rendering per type
  ColumnFilters     — Filterrij onder kolomheaders
  Pagination        — Paginering met page-size selector

actions/
  ActionMenu        — Context menu per rij (acties afhankelijk van status)
  BulkBar           — Toolbar bij selectie (inchecken, uitchecken, etc.)
  SplitButton       — Knop met dropdown (Nieuwe registratie, Instellingen)

settings/
  InstellingenMenu  — Dropdown met Kolominstellingen + Opgeslagen sets
  KolomInstellingenPanel — Popover met kolom toggles, zoeken, sets opslaan
```
