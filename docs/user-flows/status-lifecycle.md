# Status Lifecycle

## Statussen

| Status | Betekenis |
|--------|-----------|
| **Verwacht** | Persoon is geregistreerd, bezoek gepland |
| **Nog niet aangekomen** | Aankomsttijd is verstreken, persoon niet aangemeld |
| **Aangemeld** | Persoon is ingecheckt op locatie |
| **Afgemeld** | Persoon is uitgecheckt |
| **Niet aangekomen** | Systeem of receptionist markeert persoon als niet aangekomen |
| **Geannuleerd** | Bezoek is geannuleerd door receptionist |

## Triggers

| Status | Getriggerd door |
|--------|-----------------|
| Verwacht | Registratie van nieuw bezoek |
| Nog niet aangekomen | **Automatisch** — aankomsttijd verstreken + niet aangemeld (drempel configureerbaar per klant) |
| Aangemeld | Receptionist via "Persoon aanmelden" actie |
| Afgemeld | Receptionist via "Persoon afmelden" actie, of **automatisch** bij inleveren pas |
| Niet aangekomen | **Automatisch** — dag of vertrekdatum verstreken en persoon niet aangemeld |
| Geannuleerd | Receptionist via "Aanmelding annuleren" actie |

## Toegestane overgangen

```
Verwacht ──────────────► Aangemeld
  │                         │
  │ (tijd verstreken)       │
  ▼                         ▼
Nog niet aangekomen ──► Aangemeld     Afgemeld

Verwacht / Nog niet aangekomen ──► Niet aangekomen (einde dag)
Verwacht / Nog niet aangekomen ──► Geannuleerd
```

| Van | Naar | Actie |
|-----|------|-------|
| Verwacht | Aangemeld | Persoon aanmelden |
| Verwacht | Geannuleerd | Aanmelding annuleren |
| Verwacht | Nog niet aangekomen | *Automatisch (tijd verstreken)* |
| Nog niet aangekomen | Aangemeld | Persoon aanmelden |
| Nog niet aangekomen | Geannuleerd | Aanmelding annuleren |
| Aangemeld | Afgemeld | Persoon afmelden |

## Wat mag per status

| Actie | Verwacht | Nog niet aangek. | Aangemeld | Afgemeld | Niet aangek. | Geannuleerd |
|-------|:--------:|:-----------------:|:---------:|:--------:|:------------:|:-----------:|
| Persoon aanmelden | ✓ | ✓ | — | — | — | — |
| Persoon afmelden | — | — | ✓ | — | — | — |
| Aanmelding annuleren* | ✓ | ✓ | — | — | — | — |
| Aankomst wijzigen* | ✓ | ✓ | — | — | — | — |
| Credential acties | ✓ | ✓ | ✓ | — | — | — |
| E-learning uitnodiging | ✓* | ✓* | ✓* | — | — | — |
| Informeer contactpersoon | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bekijk dossier | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*\* Alleen als `elearning === 'niet-behaald'`*

*\* Annuleren en aankomst wijzigen worden primair via het dossier uitgevoerd, niet via het actiemenu in het Verwachte Personen scherm. Zie PRD §3.5 / F5 / F6.*

## Compliance blokkering

Bij status Verwacht en Nog niet aangekomen geldt:

- **Dossier onvolledig** of **E-learning niet behaald** → "Persoon aanmelden" en "Credential printen/koppelen" zijn **disabled**
- Persoon moet eerst compliant zijn voordat aanmelding mogelijk is
- Bij Aangemeld is compliance al gepasseerd, dus afmelden is altijd mogelijk
