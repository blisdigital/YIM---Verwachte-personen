# Status Lifecycle

## Statussen

| Status | Betekenis |
|--------|-----------|
| **Verwacht** | Persoon is geregistreerd, bezoek gepland |
| **Nog niet aangekomen** | Aankomsttijd is verstreken, persoon niet aangemeld |
| **Aangemeld** | Persoon is ingecheckt op locatie |
| **Afgemeld** | Persoon is uitgecheckt |
| **Niet aangekomen** | Systeem of receptionist markeert als no-show |
| **Geannuleerd** | Bezoek is geannuleerd door receptionist |

## Triggers

| Status | Getriggerd door |
|--------|-----------------|
| Verwacht | Registratie van nieuw bezoek |
| Nog niet aangekomen | **Automatisch** — aankomsttijd verstreken + niet aangemeld |
| Aangemeld | Receptionist via "Persoon aanmelden" actie |
| Afgemeld | Receptionist via "Persoon afmelden" actie |
| Niet aangekomen | Systeem (einde dag) of handmatig |
| Geannuleerd | Receptionist via "Aanmelding annuleren" actie |

## Toegestane overgangen

```
Verwacht ──────────────► Aangemeld
  │                         │
  │ (tijd verstreken)       │
  ▼                         ▼
Nog niet aangekomen ──► Aangemeld     Afgemeld
  │
  ▼
Niet aangekomen ──────► Aangemeld (via "ongedaan maken")

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
| Niet aangekomen | Verwacht | Niet aangekomen ongedaan |
| Niet aangekomen | Aangemeld | Persoon aanmelden |

## Wat mag per status

| Actie | Verwacht | Nog niet aangek. | Aangemeld | Afgemeld | Niet aangek. | Geannuleerd |
|-------|:--------:|:-----------------:|:---------:|:--------:|:------------:|:-----------:|
| Persoon aanmelden | ✓ | ✓ | — | — | ✓ | — |
| Persoon afmelden | — | — | ✓ | — | — | — |
| Aanmelding annuleren | ✓ | ✓ | — | — | — | — |
| Aankomst wijzigen | ✓ | ✓ | — | — | — | — |
| Niet aangekomen ongedaan | — | — | — | — | ✓ | — |
| Credential acties | ✓ | ✓ | ✓ | — | ✓ | — |
| E-learning uitnodiging | ✓* | ✓* | ✓* | — | ✓* | — |
| Informeer contactpersoon | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bekijk dossier | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*\* Alleen als `elearning === 'niet-behaald'`*

## Compliance blokkering

Bij status Verwacht, Nog niet aangekomen en Niet aangekomen geldt:

- **Dossier onvolledig** of **E-learning niet behaald** → "Persoon aanmelden" en "Credential printen/koppelen" zijn **disabled**
- Persoon moet eerst compliant zijn voordat aanmelding mogelijk is
- Bij Aangemeld is compliance al gepasseerd, dus afmelden is altijd mogelijk
