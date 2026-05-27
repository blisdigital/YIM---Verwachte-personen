# Business Rules

Overzicht van alle business rules die in het prototype gelden. Per domein gegroepeerd.

---

## Compliance

| # | Regel |
|---|-------|
| C1 | Persoon is **compliant** als `dossier === 'compleet'` EN (`elearning === 'behaald'` OF `elearning === 'niet-vereist'`) |
| C2 | Niet-compliant persoon kan **niet worden aangemeld** — knop disabled |
| C3 | Niet-compliant persoon kan **geen credential printen/koppelen** — knop disabled |
| C4 | Compliance-blokkering geldt alleen bij Verwacht, Nog niet aangekomen en Niet aangekomen |
| C5 | Bij status Aangemeld is compliance al gepasseerd — afmelden altijd mogelijk |
| C6 | E-learning uitnodiging is alleen beschikbaar als `elearning === 'niet-behaald'` |

---

## Statussen

| # | Regel |
|---|-------|
| S1 | Status "Nog niet aangekomen" wordt **automatisch** gezet als aankomsttijd verstreken is en persoon niet is aangemeld |
| S2 | Annuleren is **onomkeerbaar** — persoon moet opnieuw geregistreerd worden |
| S3 | Alleen **Aangemeld** → **Afgemeld** is mogelijk; afmelden vanuit andere statussen kan niet |
| S4 | "Niet aangekomen ongedaan" zet status terug naar **Verwacht** |
| S5 | Bij Afgemeld en Geannuleerd zijn alleen "Informeer contactpersoon" en "Bekijk dossier" beschikbaar |

---

## Credentials

| # | Regel |
|---|-------|
| CR1 | `credentialType` is `null` tot de credential activeren-flow is voltooid |
| CR2 | Credential type bepaalt categorie: `QR-code` = printbaar, alle andere = fysiek |
| CR3 | **Printbaar (QR-code):** credential moet eerst gemaild of geprint zijn vóór activering mogelijk is |
| CR4 | **Fysiek:** credential kan direct gekoppeld worden na invullen formulier |
| CR5 | Credential acties zijn **niet beschikbaar** bij status Afgemeld of Geannuleerd |
| CR6 | Bij `credentialStatus` verlopen/ingetrokken/geblokkeerd: **geen** credential-acties |
| CR7 | Na ontkoppelen: `credentialStatus` → `niet-actief`, `credentialType` → `null`, `pasnummer` → `null` |

---

## Contactpersoon notificatie

| # | Regel |
|---|-------|
| N1 | Klantconfiguratie bepaalt modus: **automatisch** of **handmatig** |
| N2 | Automatisch: e-mail wordt altijd verstuurd, toggle niet zichtbaar |
| N3 | Handmatig: toggle zichtbaar in modal, standaard **uit** — receptionist beslist |
| N4 | Informeer contactpersoon is beschikbaar bij **alle** statussen |
| N5 | Bij meerdere contactpersonen: receptionist kiest welke te informeren |
| N6 | `contactpersonen[0]` is altijd de primaire contactpersoon |

---

## Identiteitscontrole

| # | Regel |
|---|-------|
| I1 | Klantconfiguratie bepaalt of identiteitscontrole verplicht is bij aanmelden |
| I2 | Als verplicht: documentnummer-veld verschijnt in AanmeldenModal |
| I3 | Bevestigen-knop disabled zolang documentnummer leeg is |

---

## Persoontypen

| # | Regel |
|---|-------|
| P1 | `persoontype === 'Bezoeker'` = bezoeker; alle andere typen = contractor |
| P2 | Contractor-subtypes (Warehouse, Technisch, Logistiek, etc.) worden in configuratie beheerd — geen code-wijziging nodig |
| P3 | TypeTabs tellen dynamisch: Alle = totaal, Bezoekers = bezoeker-count, Contractors = rest |

---

## Datumfilter & lijst

| # | Regel |
|---|-------|
| D1 | Default datumfilter = vandaag |
| D2 | Wijziging van aankomstdatum kan ertoe leiden dat persoon uit gefilterde lijst verdwijnt |
| D3 | Lijst sorteert en filtert reactief — elke datawijziging herberekent automatisch |

---

## Modals

| # | Regel |
|---|-------|
| M1 | Backdrop klik sluit actie-modals **niet** — expliciete knop (Annuleren/X) vereist |
| M2 | Formuliervelden worden gereset bij sluiten én na bevestigen |
| M3 | Detail panel sluit wél bij klik op overlay |
