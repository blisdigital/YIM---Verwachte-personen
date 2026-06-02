# Component Specificaties — Index

Gedetailleerde specificaties per component staan in `docs/components/`:

| Bestand | Componenten |
| --- | --- |
| [`docs/components/AppHeader.md`](docs/components/AppHeader.md) | AppHeader |
| [`docs/components/PageHeader.md`](docs/components/PageHeader.md) | PageHeader |
| [`docs/components/ProcessNav.md`](docs/components/ProcessNav.md) | ProcessNav |
| [`docs/components/BaseButton.md`](docs/components/BaseButton.md) | BaseButton |
| [`docs/components/IconButton.md`](docs/components/IconButton.md) | IconButton |
| [`docs/components/InputField.md`](docs/components/InputField.md) | InputField |
| [`docs/components/Toggle.md`](docs/components/Toggle.md) | Toggle |
| [`docs/components/StatusDot.md`](docs/components/StatusDot.md) | StatusDot |
| [`docs/components/PassStatusDot.md`](docs/components/PassStatusDot.md) | PassStatusDot |
| [`docs/components/CompliancePill.md`](docs/components/CompliancePill.md) | CompliancePill |
| [`docs/components/ComplianceCell.md`](docs/components/ComplianceCell.md) | ComplianceCell |
| [`docs/components/CustomSelect.md`](docs/components/CustomSelect.md) | CustomSelect |
| [`docs/components/FormDateField.md`](docs/components/FormDateField.md) | FormDateField |
| [`docs/components/Modal.md`](docs/components/Modal.md) | Modal |
| [`docs/components/DatePopover.md`](docs/components/DatePopover.md) | DatePopover |
| [`docs/components/Toast.md`](docs/components/Toast.md) | Toast |
| [`docs/components/ToastContainer.md`](docs/components/ToastContainer.md) | ToastContainer |
| [`docs/components/Tooltip.md`](docs/components/Tooltip.md) | Tooltip |
| [`docs/components/DatePickerCalendar.md`](docs/components/DatePickerCalendar.md) | DatePickerCalendar |
| [`docs/components/TimePopover.md`](docs/components/TimePopover.md) | TimePopover |
| [`docs/components/TypeTabs.md`](docs/components/TypeTabs.md) | TypeTabs |
| [`docs/components/DateFilterChip.md`](docs/components/DateFilterChip.md) | DateFilterChip |
| [`docs/components/FilterChip.md`](docs/components/FilterChip.md) | FilterChip |
| [`docs/components/FilterStrip.md`](docs/components/FilterStrip.md) | FilterStrip |
| [`docs/components/LocatieFilterChip.md`](docs/components/LocatieFilterChip.md) | LocatieFilterChip |
| [`docs/components/SearchBox.md`](docs/components/SearchBox.md) | SearchBox |
| [`docs/components/DataTable.md`](docs/components/DataTable.md) | DataTable |
| [`docs/components/TableRow.md`](docs/components/TableRow.md) | TableRow |
| [`docs/components/ColumnFilters.md`](docs/components/ColumnFilters.md) | ColumnFilters |
| [`docs/components/Pagination.md`](docs/components/Pagination.md) | Pagination |
| [`docs/components/ActionMenu.md`](docs/components/ActionMenu.md) | ActionMenu |
| [`docs/components/ActionPopup.md`](docs/components/ActionPopup.md) | ActionPopup |
| [`docs/components/AanmeldenModal.md`](docs/components/AanmeldenModal.md) | AanmeldenModal |
| [`docs/components/AfmeldenModal.md`](docs/components/AfmeldenModal.md) | AfmeldenModal |
| [`docs/components/AnnulerenModal.md`](docs/components/AnnulerenModal.md) | AnnulerenModal |
| [`docs/components/AankomstWijzigenModal.md`](docs/components/AankomstWijzigenModal.md) | AankomstWijzigenModal |
| [`docs/components/InformeerContactpersoonModal.md`](docs/components/InformeerContactpersoonModal.md) | InformeerContactpersoonModal |
| [`docs/components/ElearningUitnodigingModal.md`](docs/components/ElearningUitnodigingModal.md) | ElearningUitnodigingModal |
| [`docs/components/ProcessBottomBar.md`](docs/components/ProcessBottomBar.md) | ProcessBottomBar |
| [`docs/components/DetailPanel.md`](docs/components/DetailPanel.md) | DetailPanel |
| [`docs/components/KolomInstellingenPanel.md`](docs/components/KolomInstellingenPanel.md) | InstellingenMenu, KolomInstellingenPanel |
| [`docs/components/CredentialActiverenModal.md`](docs/components/CredentialActiverenModal.md) | CredentialActiverenModal |
| [`docs/components/CredentialMailenModal.md`](docs/components/CredentialMailenModal.md) | CredentialMailenModal |
| [`docs/components/CredentialOntkoppelenModal.md`](docs/components/CredentialOntkoppelenModal.md) | CredentialOntkoppelenModal |
| [`docs/components/AanmeldingenTable.md`](docs/components/AanmeldingenTable.md) | AanmeldingenTable |
| [`docs/components/DossierHeader.md`](docs/components/DossierHeader.md) | DossierHeader |
| [`docs/components/DossierTabs.md`](docs/components/DossierTabs.md) | DossierTabs |
| [`docs/components/MijnActiesPanel.md`](docs/components/MijnActiesPanel.md) | MijnActiesPanel |
| [`docs/components/InfoSection.md`](docs/components/InfoSection.md) | InfoSection |

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
  ComplianceCell       — Dunne wrapper die 0-2 CompliancePills rendert in tabelcel
  CustomSelect         — Dropdown-select met custom styling en Teleport-menu
  FormDateField        — Datumveld met inline DatePickerCalendar popover
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
  LocatieFilterChip — Locatie-chip met dropdown (filtert op locaties)
  FilterStrip       — Container voor alle filtercomponenten
  SearchBox         — Zoek input met debounce (300ms)

table/
  DataTable         — Tabel container met horizontale scroll + kolom-resize
  TableRow          — Enkele rij met cel-rendering per type
  ColumnFilters     — Filterrij onder kolomheaders (text, dropdown, date, time)
  Pagination        — Paginering met page-size selector

actions/
  ActionMenu        — Context menu per rij (acties afhankelijk van status)
  AanmeldenModal    — Bevestigingsdialoog voor persoon aanmelden (gebruikt ActionPopup)
  AfmeldenModal     — Bevestigingsdialoog voor persoon afmelden (gebruikt ActionPopup)
  AnnulerenModal          — Destructieve bevestiging voor annuleren (gebruikt ActionPopup)
  AankomstWijzigenModal   — Datum/tijd wijzigen voor verwacht bezoek (gebruikt Modal)
  InformeerContactpersoonModal — E-mail sturen naar contactpersoon (gebruikt ActionPopup)
  ElearningUitnodigingModal    — E-learning uitnodiging: activeer op locatie of verstuur per mail (gebruikt ActionPopup)
  CredentialActiverenModal     — Credential activeren/koppelen met scenario-routing (A=printbaar, B=fysiek, C=keuze)
  CredentialMailenModal        — Credential per e-mail versturen (bevestigingsdialoog)
  CredentialOntkoppelenModal   — Credential ontkoppelen van persoon (bevestigingsdialoog)

detail/
  DetailPanel       — Gecentreerde modal (860px; sections: Bezoekgegevens, Credential, Compliance, Contactpersoon + inline credential-invoer + footer-acties per status)

dossier/
  AanmeldingenTable     — Tabel met aanmeldingen binnen het dossier
  DossierHeader         — Header voor dossier-weergave met persoonsnaam en status
  DossierTabs           — Tabnavigatie binnen het dossier (Aanmeldingen, Mijn acties)
  MijnActiesPanel       — Panel met openstaande acties voor de receptiemedewerker

settings/
  KolomInstellingenPanel — Popover met kolom toggles, zoeken, sets opslaan/laden

  InstellingenMenu is geen zelfstandig component. Het is de dropdown-knop in PageHeader die
  KolomInstellingenPanel opent — geïmplementeerd inline in PageHeader.vue. Zie Settings.md.
```

## Noot: Dropdown component

Er is geen zelfstandige `<Dropdown>` component. Alle dropdowns (ActionMenu, FilterChip, InstellingenMenu) implementeren hun eigen positionering via `<Teleport to="body">` met `position: fixed`.

Er is ook geen `<SplitButton>` component. Knoppen met een dropdown (zoals "Nieuwe registratie" in de PageHeader) gebruiken `<BaseButton>` gecombineerd met `<ActionMenu>` — zie [BaseButton.md](docs/components/BaseButton.md).

Voor knoppen zonder label (hamburger, sluiten, ×) wordt `<IconButton>` gebruikt — zie [IconButton.md](docs/components/IconButton.md).
