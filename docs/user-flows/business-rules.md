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
| C7 | Dossier "niet OK" bij: verlopen identiteitsbewijs, verlopen certificering, of geblokkeerd |
| C8 | Bij geblokkeerd is accreditatie ingetrokken — persoon kan niet aangemeld worden |

---

## Statussen

| # | Regel |
|---|-------|
| S1 | Status "Nog niet aangekomen" wordt **automatisch** gezet als aankomsttijd verstreken is en persoon niet is aangemeld. Drempel is **configureerbaar per klant** (bijv. 5 min, 15 min) |
| S2 | Annuleren is **onomkeerbaar** — persoon moet opnieuw geregistreerd worden |
| S3 | Alleen **Aangemeld** → **Afgemeld** is mogelijk; afmelden vanuit andere statussen kan niet |
| S4 | "Niet aangekomen ongedaan" zet status terug naar **Verwacht** |
| S5 | Bij Afgemeld en Geannuleerd zijn alleen "Informeer contactpersoon" en "Bekijk dossier" beschikbaar |
| S6 | Afmelden kan ook **automatisch** gebeuren wanneer pas wordt ingeleverd (inslikker/inleverbox) — pas inleveren → pas ontkoppelen → status afgemeld in één actie |

---

## Credentials

| # | Regel |
|---|-------|
| CR1 | `credentialType` is `null` tot de credential activeren-flow is voltooid |
| CR2 | Credential type bepaalt categorie: `QR-code` = printbaar, alle andere (fysieke pas, sleutel) = fysiek. Digitale QR (op telefoon) valt ook onder printbaar |
| CR3 | **Printbaar (QR-code):** credential moet eerst gemaild of geprint zijn vóór activering mogelijk is |
| CR4 | **Fysiek:** credential kan direct gekoppeld worden na invullen formulier |
| CR5 | Credential acties zijn **niet beschikbaar** bij status Afgemeld of Geannuleerd |
| CR6 | Bij `credentialStatus` verlopen/ingetrokken/geblokkeerd: **geen** credential-acties |
| CR7 | Na ontkoppelen: `credentialStatus` → `niet-actief`, `credentialType` → `null`, `pasnummer` → `null` |
| CR8 | Pas koppelen en aanmelden zijn **twee losse acties** — credential kan vooraf gekoppeld worden (bijv. 30 passen voor een event) |
| CR9 | Bij **verlies van credential**: receptionist moet snel een actie kunnen uitvoeren vanuit dit scherm (ontkoppelen + opnieuw koppelen) |

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
| N7 | Vorm van notificatie (mail / belknop / beide / niets) is **configureerbaar per klant** |

---

## Identiteitscontrole

| # | Regel |
|---|-------|
| I1 | Klantconfiguratie bepaalt of identiteitscontrole verplicht is bij aanmelden |
| I2 | Drie varianten: **alleen vinkje** "ID gecontroleerd", **vinkje + documentnummer** opvoeren, of **helemaal niet** |
| I3 | Bevestigen-knop disabled zolang verplichte velden leeg zijn |

---

## Persoontypen

| # | Regel |
|---|-------|
| P1 | `persoontype === 'Bezoeker'` = bezoeker; alle andere typen = contractor |
| P2 | Contractor-subtypes (Warehouse, Technisch, Logistiek, Construction, Inspection, IT, etc.) worden in configuratie beheerd — geen code-wijziging nodig |
| P3 | TypeTabs tellen dynamisch: Alle = totaal, Bezoekers = bezoeker-count, Contractors = rest |
| P4 | **Contractortype** wordt getoond als aparte kolom in de tabel naast persoonstype |
| P5 | Term "contractor" wordt op termijn losser — meer typen mogelijk (studenten, huurders, chauffeurs). Raakt bredere YIM-structuur |

---

## Klantconfiguratie

| # | Regel |
|---|-------|
| K1 | Beschikbare acties passen zich aan op klantconfiguratie — als aanmelden niet bestaat bij een klant, wordt alleen "credential koppelen" getoond |
| K2 | Kolomvolgorde is **configureerbaar per klant** als default; eindgebruiker kan zelf kolommen aan/uit zetten |
| K3 | Locatie is beschikbaar als **preset filter** — receptionist filtert default op eigen locatie |

---

## Datumfilter & lijst

| # | Regel |
|---|-------|
| D1 | Default datumfilter = vandaag |
| D2 | Default locatiefilter = receptie-locatie (preset in kolomfilter) |
| D3 | Wijziging van aankomstdatum kan ertoe leiden dat persoon uit gefilterde lijst verdwijnt |
| D4 | Lijst sorteert en filtert reactief — elke datawijziging herberekent automatisch |

---

## Actiemenu

| # | Regel |
|---|-------|
| AM1 | Drie-puntjesmenu is **uitgrijsd** wanneer er geen acties beschikbaar zijn |
| AM2 | Alle acties worden **gelogd in audit trail** (bestaande YIM-functionaliteit) |

---

## Dossier & historie

| # | Regel |
|---|-------|
| DH1 | Aankomst wijzigen en annuleren worden opgeslagen in de **historie van het dossier** |
| DH2 | Aankomst wijzigen hoort primair in het **bezoekersdossier** — in dit scherm als nice-to-have, default niet zichtbaar, configureerbaar per klant voor latere iteratie |
| DH3 | Annuleren hoort primair in het **persoonsdossier** — in dit scherm beschikbaar maar niet als must-have |

---

## Modals

| # | Regel |
|---|-------|
| M1 | Backdrop klik sluit actie-modals **niet** — expliciete knop (Annuleren/X) vereist |
| M2 | Formuliervelden worden gereset bij sluiten én na bevestigen |
| M3 | Detail panel sluit wél bij klik op overlay |
