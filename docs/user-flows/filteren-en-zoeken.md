# Filteren en zoeken

## Filterstrip

Bovenaan de tabel, van links naar rechts:

### Type tabs
- **Alle** / **Bezoekers** / **Contractors** — segmented button group met counts
- Bezoekers: `persoontype === 'Bezoeker'`
- Contractors: alle andere persoontypen

### Locatie filter
- Chip "Locatie" — dropdown met beschikbare locaties
- Default: receptie-locatie (bijv. "Hoofdkantoor Shell")
- Preset wordt automatisch doorgesynchroniseerd naar kolomfilter `locaties`
- Getoond als eerste chip in de filterstrip (vóór datum)

### Datum filter
- Chip "Vandaag" — opent popup met datuminput + presets (Vandaag / Morgen / Deze week)
- Default: vandaag
- Reset-knop zet terug naar vandaag

### Status filter
- Chip met checkboxes: Verwacht, Nog niet aangekomen, Aangemeld, Afgemeld, Niet aangekomen, Geannuleerd
- Meerdere selecteerbaar

### Compliance filter
- Chip met checkboxes: Dossier volledig, Dossier onvolledig, E-learning voltooid, E-learning niet voltooid

### Parkeren filter
- Chip met checkboxes: Gereserveerd, Niet gereserveerd

### Zoeken
- Tekstveld: zoekt op naam, bedrijf, referentie
- 300ms debounce

## Kolom filters
- Filterrij direct onder kolomheaders
- Per kolom: tekst, dropdown of datum filter (afhankelijk van kolomtype)
- Default ingevuld: datumVanaf = vandaag, locaties = receptie-locatie

## Kolominstellingen
- Via "Instellingen" knop in page header
- Kolom zichtbaarheid aan/uit togglen
- Kolomvolgorde is configureerbaar per klant als default; eindgebruiker kan zelf aanpassen
- Sets opslaan en laden
- Kolommen resizable via drag op rechterrand kolomheader

## Sorteren
- Klik op kolomheader: geen → aflopend → oplopend → geen (cyclus)

## Paginering
- Onderaan tabel
- Configureerbaar aantal rijen per pagina
