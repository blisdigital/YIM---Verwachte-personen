# Detail bekijken

## Wanneer
Receptionist wil alle gegevens van een persoon inzien.

## Flow

1. Klik op een rij in de tabel (niet op checkbox of actiemenu)
2. **DetailPanel** opent als gecentreerde modal met overlay

## Inhoud

Vier secties:

| Sectie | Velden |
|--------|--------|
| **Bezoekgegevens** | Status, datum, aankomsttijd, vertrektijd*, locatie(s), VIP*, telefoonnummer*, e-mailadres* |
| **Compliance** | Dossier status, e-learning status |
| **Contactpersoon** | Naam, telefoonnummer*, e-mailadres* + mail icon button |
| **Credential** | Type*, nummer*, status |

*\* Conditioneel — alleen zichtbaar als veld gevuld is*

## Acties vanuit detail panel

Footer toont status-afhankelijke knoppen:

| Status | Knoppen |
|--------|---------|
| Verwacht / Nog niet aangekomen | Bekijk dossier, Credential printen/koppelen*, **Persoon aanmelden*** |
| Aangemeld | Bekijk dossier, Credential printen/koppelen/ontkoppelen*, **Persoon afmelden** |
| Niet aangekomen / Afgemeld / Geannuleerd | Bekijk dossier |

*\* Disabled bij niet-compliant persoon*

## Sluiten
- Klik op X-knop
- Klik op overlay
