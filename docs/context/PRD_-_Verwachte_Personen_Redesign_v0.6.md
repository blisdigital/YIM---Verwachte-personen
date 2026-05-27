# Product Requirements Document

## Verwachte Personen: Redesign Bezoekersregistratie

| | |
|---|---|
| **Systeem** | YIM: Your Identity Management |
| **Module** | Bezoekersregistratie & Verwachte personen |
| **Versie** | 0.6: Draft |
| **Datum** | 27 mei 2026 |
| **Opgesteld door** | Kim van Olderen: Blis Digital |
| **Status** | Ter review |

---

## Changelog

| Versie | Datum | Auteur | Wijzigingen |
|---|---|---|---|
| 0.1 | 31 maart 2026 | Kim van Olderen | Initiële PRD aangemaakt op basis van 17 as-is screenshots van de bezoekersregistratiemodule. |
| 0.2 | 31 maart 2026 | Kim van Olderen | Doelstellingen overgenomen uit epic omschrijving. Strikte scope-scheiding doorgevoerd tussen primair 'Verwachte Personen' scherm en UX debt. Hoofdstuk 5 (UX Debt) toegevoegd voor wizard, dossier en home-scherm. Backlog (H4) uitgebreid met Bron en Prioriteit (MoSCoW) op basis van INVEST-principes. Gap-analyse op basis van epic brief verwerkt: contractors, compliance, passtatus, parkeren, bulkacties, quick presets en overige ontbrekende onderdelen. Open vragen (H6) samengevoegd en uitgebreid met UX discovery vragenlijst voor Maurice. Leeswijzer en INVEST-kolom verwijderd uit H4. Sectienummering gecorrigeerd. |
| 0.3 | 31 maart 2026 | Kim van Olderen | Sectie 3.7 toegevoegd: 12 user flows met stappen, varianten, prioritering en edge cases. Gebruikerstabel (1.3) uitgebreid met Applicatiebeheerder en YIM Beheerder. Twee nieuwe vragen toegevoegd aan H6 (pas/credentials flow en ter-plekke-registratie met accreditatie). |
| 0.4 | 9 april 2026 | Kim van Olderen | Verwerking BA Design sessie met Maurice (8 april 2026). Statusmodel (concept) toegevoegd in sectie 3.8. Business rules toegevoegd. Credential-typen uitgebreid. Performance-eisen en tablet-support bevestigd. Rolgebaseerde toegang toegevoegd. Scope verduidelijkt. |
| 0.5 | 9 april 2026 | Kim van Olderen | Statusmodel aangepast conform epic brief (5 statussen). Tabs bezoekers/contractors. Performance-eisen: 1.000+ regels, Doherty threshold. Contractor subtypes. Compliance sectie met dossier- en e-learning statussen. |
| 0.6 | 27 mei 2026 | Kim van Olderen | Volledige herziening op basis van prototype, epic-omschrijving en uitgewerkte user flows. Statusmodel bijgewerkt naar 6 statussen. Featurelijst met business rules en configuratiemogelijkheden toegevoegd. Procesomschrijvingen voor alle user flows. Compliance van "uit te werken" naar volledig gespecificeerd. Credential-flows uitgewerkt in 3 scenario's. Open vragen opgeschoond. Bulkacties naar buiten scope MVP. |

---

## Inhoudsopgave

1. [Doelstellingen en achtergrond](#1-doelstellingen-en-achtergrond)
2. [As-Is situatie](#2-as-is-situatie)
3. [To-Be situatie](#3-to-be-situatie)
4. [Processen](#4-processen)
5. [Featurelijst](#5-featurelijst)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [UX Debt](#7-ux-debt)
8. [Open vragen](#8-open-vragen)
9. [Bijlage: Begrippenlijst](#bijlage--begrippenlijst)

---

## 1. Doelstellingen en achtergrond

### 1.1 Achtergrond

YIM (Your Identity Management) is het centrale identiteits- en toegangsbeheersysteem voor medewerkers, bezoekers en contractors. De module Bezoekersregistratie wordt gebruikt door receptiemedewerkers, security officers en facilitaire medewerkers.

De huidige pagina "Verwachte bezoekers" sluit onvoldoende aan op de dagelijkse workflow: geen real-time status, geen dagelijks overzicht, geen directe acties, en geen ondersteuning voor contractors.

### 1.2 Doelstellingen

- Eén overzicht voor alle verwachte personen (bezoekers én contractors, incl. contractor types)
- Duidelijk inzicht in wie komt, wanneer, waarom, bij wie en wat de actuele status is
- Directe acties vanuit dezelfde pagina (aanmelden, afmelden, annuleren, credential beheer, contactpersoon informeren)
- Compliance-checks (dossiervolledigheid en e-learningstatus) direct zichtbaar en handhaafbaar
- Inzicht in parkeerbehoefte en reserveringen
- Krachtige filter- en segmentatiemogelijkheden
- Geoptimaliseerd voor dagelijks gebruik op desktop én tablet

### 1.3 Gebruikers

| Rol | Beschrijving |
|---|---|
| Receptiemedewerker | Dagelijkse gebruiker: check-in, pas uitgifte, overzicht beheren |
| Planner / bezoekerscoördinator | Registreert verwachte bezoekers vooraf |
| Contactpersoon / ontvanger | Wordt geïnformeerd bij aankomst |
| Beveiligingsmedewerker | Beheert toegang en autorisaties; geeft passen uit |
| Facility Manager | Beheert locaties en capaciteit; bekijkt rapportages |
| Applicatiebeheerder | Beheert configuraties in het beheerscherm |
| YIM Beheerder | Applicatie-inrichting per tenant |

### 1.4 Scope

#### In scope

- Herontwerp van het "Verwachte Personen" scherm
- Bezoekers én contractors in één overzicht
- Alle acties uitvoerbaar vanuit het overzicht: aan- en afmelden, credentialbeheer, elearning pincode en contactpersoon op de hoogte stellen.

#### Buiten scope (MVP)

- Bulkacties (meerdere personen tegelijk bewerken, bulkregistraties — raakt ook registratieproces en andere YIM-onderdelen)
- Ad-hoc aanmeldingen (ter plekke registreren zonder voorafgaande aanmelding)
- Blokkade van bedrijven
- Structurele aanpassingen aan het bezoekersdossier-overzichtsscherm
- UX debt overige YIM-schermen (registratiewizard, dossieroverzicht, etc.)

---

## 2. As-Is situatie

### 2.1 Overzicht huidige schermen

#### Verwachte bezoekers (centrale pagina)

Startpunt voor receptie. Tabeloverzicht met twee tabs: "Geautoriseerd" en "In afwachting". Kolommen: Locatie, Bezoekreden, Bezoekreferentie, VIP-aanmelding, Persoon, Personeelsnummer, Bedrijf/Werkgever, Datum vanaf, Contactpersoon. Per kolom een individueel zoekveld en een datumfilter (standaard vandaag).

#### Bezoeker registreren (wizard)

Wizard met zoekstap (bestaand profiel) en registratiestap (autorisaties, bezoekreden, persoonsgegevens, contactpersoon, opmerking). Voortgangsbalk: Aanvraag → Resultaat dossier → Resultaat autorisatie → Accreditatiedatum. Status start als "Concept".

#### Bezoekersdossiers: overzichtslijst

Alle bekende bezoekers in YIM. Geen structurele aanpassingen voorzien.

#### Specifiek bezoekersdossier

Profielinformatie met zes tabbladen: Dossier, Autorisaties, Aanmeldingen, Geschiedenis, Credentials, Certificaten.

#### Home-scherm

Widgets: Recente aanmeldingen, Recente accreditaties. Snelkoppelingen via "Mijn acties".

### 2.2 Pijnpunten

| # | Pijnpunt |
|---|---|
| 1 | Geen real-time aanmeld- en afmeldstatus |
| 2 | Geen duidelijk "vandaag"-overzicht |
| 3 | Geen snelle acties vanuit centrale pagina |
| 4 | VIP-bezoekers niet prominent |
| 5 | Geen notificatiefunctionaliteit richting contactpersoon |
| 6 | Alleen bezoekers, geen contractors |
| 7 | Geen compliance-inzicht (dossier, e-learning) |
| 8 | Geen passtatus of pas-acties |
| 9 | Geen parkeerbehoefte-indicatie |
| 10 | Beperkte filteropties, geen quick presets |

---

## 3. To-Be situatie

### 3.1 Overzicht

Het nieuwe "Verwachte Personen" scherm is het centrale dashboard voor receptie en beveiliging. Alle verwachte bezoekers én contractors in één overzicht met real-time statusinformatie, directe acties, en compliance-checks.

### 3.2 Bezoekers vs. Contractors

| Aspect | Bezoekers | Contractors |
|--------|-----------|-------------|
| Duur | Meestal 1 dag | Langere periode (weken/maanden) |
| Aanmelden | Elke keer opnieuw | Eenmalig voor gehele periode |
| Pas | Tijdelijk / dagpas | Vaste pas voor periode |
| Uitchecken | Bij receptie | Zelfstandig via toegangscontrole |
| In/uit tracking | Via receptie | Via onderliggend toegangscontrolesysteem |

Beide persoonstypen in hetzelfde scherm. Tabs (Alle / Bezoekers / Contractors) voor focus en overzicht.

### 3.3 Persoontypen

`persoontype === 'Bezoeker'` = bezoeker. Alle andere typen = contractor. Hou er rekening mee dat er in de toekomst meerdere persoonstypen kunnen bestaan.

Contractor-subtypes (Warehouse, Technisch, Logistiek, Construction, Inspection, IT, etc.) worden in configuratie beheerd. Geen code-wijziging nodig bij nieuwe subtypes. Contractortype wordt als aparte kolom getoond.

### 3.4 Registratieflow

```
Registratie (Concept) → Accreditatie/Goedkeuring → Status "Verwacht" → Verschijnt in overzicht 'verwachte personen' bij de juiste locatie en met de juiste aankomstdatum. 
```

Registraties met status "Concept" verschijnen **niet** in het Verwachte Personen scherm.

### 3.5 Statusmodel

Zes statussen, onderverdeeld in receptie-acties en systeem-triggers:

| Status | Betekenis | Trigger |
|--------|-----------|---------|
| **Verwacht** | Geregistreerd, bezoek gepland | Accreditatie goedgekeurd |
| **Nog niet aangekomen** | Aankomsttijd verstreken, niet aangemeld | Automatisch na verstreken aankomsttijd (drempel configureerbaar per klant) |
| **Aangemeld** | Aangemeld op locatie | Receptionist via "Persoon aanmelden" of automatisch naar credential gekoppeld (actief) |
| **Afgemeld** | Uitgecheckt | Receptionist via "Persoon afmelden", of automatisch bij credential inleveren (bijvoorbeeld via inslikker/inleverbak) |
| **Niet aangekomen** | Niet aangekomen op locatie, niet aangemeld en/of credential niet opgehaald| Systeem (einde dag) of handmatig |
| **Geannuleerd** | Bezoek geannuleerd | Annuleren wordt gedaan via dossier. Alleen door receptie indien dit via configuratie is aangezet |

#### Toegestane overgangen

| Van | Naar | Actie |
|-----|------|-------|
| Verwacht | Aangemeld | Persoon aanmelden |
| Verwacht | Geannuleerd | Aanmelding annuleren |
| Verwacht | Nog niet aangekomen | Automatisch (tijd verstreken) |
| Nog niet aangekomen | Aangemeld | Persoon aanmelden |
| Nog niet aangekomen | Geannuleerd | Aanmelding annuleren |
| Aangemeld | Afgemeld | Persoon afmelden |
| Niet aangekomen | Verwacht | Niet aangekomen ongedaan |
| Niet aangekomen | Aangemeld | Persoon aanmelden |

#### Beschikbare acties per status

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

### 3.6 Compliance

Compliance-checks zijn **harde blokkers**, geen zachte waarschuwingen.

#### Dossiervolledigheid

- Dossier is compleet of onvolledig
- Bij onvolledig: tooltip toont ontbrekende onderdelen
- Niet-OK bij: verlopen identiteitsbewijs, verlopen certificering, of geblokkeerd
- Bij geblokkeerd is accreditatie ingetrokken

#### E-learning

| Status | Beschrijving |
|--------|--------------|
| Niet vereist | Geen e-learning nodig |
| Behaald | E-learning afgerond en geldig |
| Niet behaald | E-learning nog niet afgerond, eventueel op locatie uitvoeren |
| Verlopen | Geldigheid van de E-learning is verlopen |  

#### Compliance-regel

Een persoon is **compliant** als dossier compleet is EN e-learning is behaald of niet-vereist.

**Blokkering:** Niet-compliant personen kunnen niet worden aangemeld en geen actieve credential ontvangen.

### 3.7 Credential-typen

| Type | Beschrijving | Uitgifte |
|------|--------------|----------|
| Fysieke pasjes | Herbruikbare toegangspassen | Fysiek uitreiken |
| QR-codes | Digitale toegangscodes | Mailen of printen |
| Mobiele wallet (toekomstig) | Pas in telefoon-wallet | Via link |

Credential-status: niet-actief, actief, verlopen, ingetrokken, geblokkeerd.

Bij verlopen/ingetrokken/geblokkeerd: geen credential-acties beschikbaar. Credential moet dan eerst opnieuw aangevraagd worden via dossier.

### 3.8 Kolommen

De tabel heeft horizontale scroll. Actiekolom is sticky.

**Standaard zichtbaar:** Status, Naam, Bedrijf, Aankomstdatum, Aankomsttijd, Vertrektijd, Locatie(s), Persoonstype, Contractortype, VIP, Credential, Credential status, Compliance (dossier + e-learning), Parkeren, Contactpersoon, Bezoekreden.

**Standaard verborgen (via kolominstellingen):** Personeelsnummer, Telefoonnummer, E-mailadres.

Alle kolommen zijn resizable door de gebruiker.

### 3.9 Parkeren

Drievoudig zichtbaar per persoon:
- **Benodigd**: ja/nee
- **Gereserveerd**: ja/nee
- **Plek/Code**: indien bekend

Geen reserveringssysteem beschikbaar.

### 3.10 Tijdsoverschrijding

Geen harde controle op eindtijd. Geen automatische uitcheck bij verstrijken eindtijd. Focus is op zichtbaarheid: weten of iemand nog binnen is.

---

## 4. Processen

Beknopte omschrijving van alle user flows. Gedetailleerde specificaties in `docs/user-flows/`.

### 4.1 Persoon aanmelden

Receptionist checkt een verwachte persoon in. Via actiemenu of detail panel. Modal toont persoonsgegevens, optioneel identiteitscontrole (configureerbaar), optioneel e-mail naar contactpersoon (configureerbaar). Na bevestiging: status → Aangemeld, checkinTime gezet.

**Voorwaarden:** Status Verwacht, Nog niet aangekomen of Niet aangekomen. Persoon moet compliant zijn.

### 4.2 Persoon afmelden

Receptionist checkt een aangemelde persoon uit. Modal toont persoonsgegevens, optioneel e-mail naar contactpersoon. Na bevestiging: status → Afgemeld, checkoutTime gezet.

Kan ook **automatisch** bij inleveren pas (inslikker/inleverbox): pas inleveren → pas ontkoppelen → status afgemeld in één actie.

**Voorwaarden:** Status Aangemeld.

### 4.3 Aanmelding annuleren

Receptionist annuleert een gepland bezoek. Modal toont waarschuwing ("Dit kan niet ongedaan worden gemaakt"), optioneel reden (dropdown), optioneel toelichting (vrij tekst), optioneel e-mail naar contactpersoon. Na bevestiging: status → Geannuleerd.

**Onomkeerbaar** — persoon moet opnieuw geregistreerd worden. Wordt opgeslagen in dossier-historie.

**Voorwaarden:** Status Verwacht of Nog niet aangekomen.

### 4.4 Aankomst wijzigen

Receptionist past datum of tijd van een verwacht bezoek aan. Modal met vooraf ingevulde waarden: aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd. Optioneel opmerking en e-mail naar contactpersoon.

Na bevestiging worden waarden bijgewerkt. Status blijft ongewijzigd. Persoon kan uit gefilterde lijst verdwijnen als nieuwe datum niet matcht met actief datumfilter.

**Voorwaarden:** Status Verwacht of Nog niet aangekomen.

### 4.5 Niet aangekomen ongedaan maken

Receptionist maakt een onterechte no-show ongedaan. Directe actie via actiemenu — geen modal of bevestiging. Status → Verwacht. Persoon is weer beschikbaar voor aanmelden.

**Voorwaarden:** Status Niet aangekomen.

### 4.6 Credential activeren

Receptionist koppelt een credential (pas of QR-code) aan een persoon. Drie scenario's op basis van beschikbare opties:

**Scenario A — Printbaar (QR-code):**
Credentialnummer + periode invullen. Credential **mailen of printen** (verplicht vóór activering). Dan activeren. Resultaat: credentialStatus → actief, credentialType → QR-code.

**Scenario B — Fysiek (pas):**
Credentialnummer + periode (permanent of tijdelijk) invullen. Koppelen. Resultaat: credentialStatus → actief, credentialType → pastype, pasnummer gevuld.

**Scenario C — Meerdere Credentials:**
Eerst credential type selecteren, daarna formulier van scenario A of B.

Optioneel: accessoire-blok (naam + afbeelding) als geconfigureerd.

**Voorwaarden:** credentialStatus niet-actief. Status niet Afgemeld of Geannuleerd. Persoon moet compliant zijn.

### 4.7 Credential mailen

Receptionist verstuurt een actieve QR-code credential per e-mail. Modal toont e-mailadres. Na versturen: toast-bevestiging. Geen statuswijziging.

**Voorwaarden:** credentialStatus actief + credentialType QR-code. Status niet Afgemeld of Geannuleerd.

### 4.8 Credential ontkoppelen

Receptionist koppelt een credential los. Bevestigingsmodal. Na bevestiging: credentialStatus → niet-actief, credentialType → null, pasnummer → null.

**Voorwaarden:** credentialStatus actief. Status niet Afgemeld of Geannuleerd.

### 4.9 Informeer contactpersoon

Receptionist informeert de contactpersoon via bellen of e-mail. Modal toont contactgegevens. Bij meerdere contactpersonen: keuze via dropdown. Bellen via `tel:` link. Mailen via vervolgscherm met optioneel bericht.

Shortcut vanuit detail panel: klik op e-mail icon naast contactpersoon → direct naar mail-scherm.

**Voorwaarden:** Beschikbaar bij alle statussen.

### 4.10 E-learning uitnodiging

Receptionist helpt persoon met starten verplichte e-learning. Modal met twee opties:

- **Verstuur per e-mail:** E-mailadres vooraf ingevuld (bewerkbaar), link naar e-learning module.
- **Ter plekke starten:** QR-code direct zichtbaar + pincode. Optioneel: print pincode.

Geen statuswijziging. E-learning status wijzigt pas na voltooiing door persoon.

**Voorwaarden:** elearning niet-behaald. Status niet Afgemeld of Geannuleerd.

### 4.11 Detail bekijken

Klik op rij opent detail panel als gecentreerde modal. Vier secties: Bezoekgegevens, Compliance, Contactpersoon, Credential. Footer toont status-afhankelijke actieknoppen (aanmelden, afmelden, credential, bekijk dossier). Niet-compliant: relevante knoppen disabled.

### 4.12 Filteren en zoeken

#### Filterstrip (bovenaan tabel)

| Element | Beschrijving |
|---------|-------------|
| Type tabs | Alle / Bezoekers / Contractors — segmented buttons met counts |
| Locatie chip | Dropdown met locaties, default receptie-locatie |
| Datum chip | Popup met datuminput + presets (Vandaag / Morgen / Deze week) |
| Status chip | Checkboxes per status |
| Compliance chip | Checkboxes: dossier volledig/onvolledig, e-learning voltooid/niet voltooid |
| Parkeren chip | Checkboxes: gereserveerd / niet gereserveerd |
| Zoekbalk | Zoek op naam, bedrijf, referentie (300ms debounce) |

#### Kolomfilters

Filterrij direct onder kolomheaders. Per kolom: tekst, dropdown of datumfilter. Default: datumVanaf = vandaag, locaties = receptie-locatie.

#### Kolominstellingen

Via "Instellingen" knop in page header. Kolom zichtbaarheid togglen, sets opslaan en laden. Kolomvolgorde configureerbaar per klant als default.

#### Sorteren

Klik op kolomheader: geen → aflopend → oplopend → geen (cyclus).

---

## 5. Featurelijst

### F1. Lijstweergave verwachte personen

Centraal tabeloverzicht met alle verwachte bezoekers en contractors voor geselecteerde datum en locatie.

- Bezoekers en contractors in dezelfde tabel met type tabs (Alle/Bezoekers/Contractors)
- Horizontale scroll, checkbox- en actiekolom sticky
- 21 kolommen (2 sticky + 19 data, waarvan 3 standaard verborgen)
- Kolommen resizable door gebruiker
- Hele rij klikbaar → opent detail panel
- **Business rules:** P1 (bezoeker vs contractor bepaling), P3 (dynamische tab counts), D1 (default vandaag), D2 (default receptie-locatie), D4 (reactief sorteren/filteren)
- **Configuratie:** K2 (kolomvolgorde per klant), kolom zichtbaarheid per eindgebruiker instelbaar

### F2. Statusmodel

Zes statussen met gedefinieerde overgangen, triggers en beschikbare acties per status.

- Verwacht → Nog niet aangekomen (automatisch bij verstreken aankomsttijd)
- Niet aangekomen → einde dag, automatisch of handmatig
- Afgemeld kan automatisch bij pas inleveren
- **Business rules:** S1 (automatische "Nog niet aangekomen", drempel configureerbaar), S2 (annuleren onomkeerbaar), S3 (alleen Aangemeld → Afgemeld), S4 ("Niet aangekomen ongedaan" → Verwacht), S5 (beperkte acties bij Afgemeld/Geannuleerd), S6 (automatisch afmelden bij pas inleveren)
- **Configuratie:** drempel voor "Nog niet aangekomen" per klant instelbaar

### F3. Persoon aanmelden

Check-in van verwachte persoon met compliance-controle en optionele identiteitscontrole.

- Compliance-check blokkeert aanmelden bij niet-compliant (hard)
- Identiteitscontrole in modal (configureerbaar per klant)
- E-mail naar contactpersoon (configureerbaar per klant)
- **Business rules:** C1 (compliance definitie), C2 (aanmelden geblokkeerd bij niet-compliant), C4 (blokkering geldt bij Verwacht/Nog niet aangekomen/Niet aangekomen), I1-I3 (identiteitscontrole varianten)
- **Configuratie:** I2 (drie varianten identiteitscontrole: alleen vinkje / vinkje+documentnr / uit), N1-N3 (notificatie automatisch of handmatig per klant)

### F4. Persoon afmelden

Check-out van aangemelde persoon. Optioneel met e-mail naar contactpersoon.

- Compliance niet meer relevant (al gecontroleerd bij aanmelden)
- Automatisch afmelden bij pas inleveren (inslikker/inleverbox) gewenst
- **Business rules:** S3 (alleen vanuit Aangemeld), S6 (automatisch bij pas inleveren), C5 (compliance niet meer relevant)
- **Configuratie:** N1-N3 (notificatie modus per klant)

### F5. Aanmelding annuleren

Bezoek annuleren met optionele reden en toelichting. Onomkeerbaar.

- Waarschuwing in modal: "Dit kan niet ongedaan worden gemaakt"
- Reden (dropdown) en toelichting (vrij tekst) optioneel
- Opgeslagen in dossier-historie
- **Business rules:** S2 (onomkeerbaar), DH1 (historie in dossier), DH3 (primair in persoonsdossier)
- **Configuratie:** N1-N3 (notificatie modus per klant)

### F6. Aankomst wijzigen

Datum en tijd van verwacht bezoek aanpassen. Vier velden: aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd.

- Persoon kan uit gefilterde lijst verdwijnen na wijziging
- Opgeslagen in dossier-historie
- **Business rules:** D3 (persoon verdwijnt als datum niet meer matcht), D4 (lijst herberekent), DH1 (historie in dossier), DH2 (primair in bezoekersdossier, in dit scherm nice-to-have)
- **Configuratie:** DH2 (beschikbaarheid configureerbaar per klant voor latere iteratie)

### F7. Niet aangekomen ongedaan maken

Onterechte no-show terugdraaien. Directe actie zonder bevestiging.

- Status terug naar Verwacht
- **Business rules:** S4 (terug naar Verwacht)

### F8. Credential activeren

Credential koppelen aan persoon via drie scenario's (printbaar/fysiek/keuze).

- Printbaar (QR-code): mailen of printen verplicht vóór activering
- Fysiek (pas): direct koppelen na formulier, permanent of tijdelijk
- Keuze: eerst type selecteren, dan juiste formulier
- Optioneel: accessoires tonen
- **Business rules:** CR1 (credentialType null tot flow voltooid), CR2 (type bepaalt categorie), CR3 (printbaar: mail/print verplicht), CR4 (fysiek: direct koppelen), CR5 (niet bij Afgemeld/Geannuleerd), C3 (geblokkeerd bij niet-compliant), CR8 (koppelen en aanmelden zijn twee losse acties)
- **Configuratie:** beschikbare credential-typen per tenant

### F9. Credential mailen

Actieve QR-code credential per e-mail versturen.

- **Business rules:** CR2 (alleen voor printbare credentials), CR5 (niet bij Afgemeld/Geannuleerd)

### F10. Credential ontkoppelen

Credential loskoppelen van persoon.

- Reset: credentialStatus → niet-actief, credentialType → null, pasnummer → null
- **Business rules:** CR5 (niet bij Afgemeld/Geannuleerd), CR7 (reset-gedrag), CR9 (bij verlies: ontkoppelen + opnieuw koppelen)

### F11. Informeer contactpersoon

Contactpersoon bellen of mailen vanuit modal.

- Keuze bij meerdere contactpersonen
- Bellen via tel: link
- Mailen met optioneel bericht
- Shortcut vanuit detail panel (direct naar mail-scherm)
- **Business rules:** N4 (beschikbaar bij alle statussen), N5 (keuze bij meerdere contactpersonen), N6 (contactpersonen[0] is primair)
- **Configuratie:** N1 (automatisch of handmatig per klant), N7 (notificatievorm: mail / belknop / beide / niets per klant)

### F12. E-learning uitnodiging

Persoon uitnodigen voor verplichte e-learning via e-mail of ter plekke (QR + pincode).

- E-mail: uitnodiging met link naar e-learning module
- Ter plekke: QR-code + pincode zichtbaar, optioneel printen
- E-learning status wijzigt pas na voltooiing door persoon
- **Business rules:** C6 (alleen bij elearning niet-behaald), CR5-equivalent (niet bij Afgemeld/Geannuleerd)

### F13. Detail panel

Slide-in panel met alle gegevens van een persoon. Vier secties: Bezoekgegevens, Compliance, Contactpersoon, Credential. Status-afhankelijke actieknoppen in footer.

- Opent bij klik op rij (niet checkbox of actiemenu)
- Disabled knoppen bij niet-compliant
- **Business rules:** M3 (sluit bij klik op overlay), C2-C4 (compliance blokkering op knoppen)

### F14. Filterstrip en zoeken

Filterstrip met type tabs, locatie, datum, status, compliance, parkeren en zoekbalk.

- Type tabs met dynamische counts
- Locatie synct naar kolomfilter
- Datum presets: Vandaag, Morgen, Deze week
- Vrij zoeken op naam, bedrijf, referentie (300ms debounce)
- **Business rules:** P3 (dynamische tab counts), D1 (default vandaag), D2 (default receptie-locatie)
- **Configuratie:** K3 (locatie als preset filter, default eigen locatie)

### F15. Kolomfilters

Filterrij direct onder kolomheaders met per-kolom filtering.

- Tekst, dropdown of datumfilter per kolomtype
- Default waarden gesynchroniseerd met filterstrip
- **Business rules:** D1-D2 (defaults), D4 (reactief herberekenen)

### F16. Kolominstellingen

Kolom zichtbaarheid togglen, sets opslaan en laden.

- Zoekbalk voor kolommen
- Sets opslaan met naam, laden, verwijderen
- **Configuratie:** K2 (kolomvolgorde per klant als default, eindgebruiker kan aanpassen)

### F17. Actiemenu per rij

Drie-puntjesmenu (⋯) met status-afhankelijke acties. Credential-acties dynamisch op basis van credentialStatus.

- Uitgegrijsd als geen acties beschikbaar
- **Business rules:** AM1 (uitgrijsd zonder acties), AM2 (audit trail), S5 (beperkte acties bij Afgemeld/Geannuleerd), CR5-CR6 (credential-acties condities)

### F18. VIP-markering

VIP-personen visueel gemarkeerd in tabel en detail panel.

- VIP-badge met kleurcodering
- VIP kolom in tabel

### F19. Paginering

Paginering onderaan tabel met configureerbaar aantal rijen per pagina.

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Requirement | Specificatie |
|-------------|-------------|
| Volume normaal | 200–500 bezoekers per dag |
| Volume piek | Tot 1.000+ personen (incl. contractors) |
| Capaciteit | 1.000+ regels real-time |
| Laadtijd | Doherty threshold: respons binnen 400ms |
| Real-time | Data gesynchroniseerd tussen meerdere gelijktijdige gebruikers |

### 6.2 Device support

| Device | Support |
|--------|---------|
| Desktop | Primair (volledige functionaliteit) |
| Tablet | Ondersteund (responsief design) |

### 6.3 Toegankelijkheid

- Rolgebaseerde UI: light-versie (lezen) vs. uitgebreide versie (alle acties)
- Per tenant configureerbaar welke informatie en persoonstypes zichtbaar zijn

---

## Bijlage — Begrippenlijst

| Term | Definitie |
|---|---|
| YIM | Your Identity Management: centraal identiteitsbeheersysteem |
| Bezoeker | Externe persoon met tijdelijke toegang tot een locatie |
| Contractor | Externe medewerker van derde partij die op locatie werkzaamheden uitvoert |
| Contractor type | Configureerbare subcategorie van contractors per tenant (bijv. Warehouse, Technisch, Logistiek) |
| Verwacht persoon | Vooraf geregistreerde bezoeker of contractor die verwacht wordt op een specifieke dag |
| Aanmelden (check-in) | Registratie van aankomst. Status wordt "Aangemeld" |
| Afmelden (check-out) | Registratie van vertrek. Status wordt "Afgemeld" |
| Verwacht | Status: geregistreerd en geaccrediteerd, wacht op komst |
| Nog niet aangekomen | Status: aankomsttijd verstreken, nog niet aangemeld (automatisch) |
| Aangemeld | Status: ingecheckt op locatie |
| Afgemeld | Status: uitgecheckt en vertrokken |
| Niet aangekomen | Status: no-show. Omkeerbaar via "Niet aangekomen ongedaan" |
| Geannuleerd | Status: bezoek geannuleerd. Niet omkeerbaar |
| Credential | Toegangsmiddel: fysieke pas, QR-code, of mobiele wallet |
| Compliance | Combinatie van dossiervolledigheid en e-learningstatus |
| Contactpersoon | Interne medewerker die de persoon ontvangt of verantwoordelijk is |
| VIP | Persoon met bijzondere status die extra aandacht vereist |
| Autorisatie | Toegekend toegangsrecht voor specifieke locatie of zone |
| Dossiervolledigheid | Indicatie of alle vereiste documenten en gegevens aanwezig zijn |
| Deelbeheer | Gebruiker ziet alleen personen voor locaties waartoe zij toegang heeft |

---

## Bijlage — Overzicht configuratiemogelijkheden

Alle elementen die per klant/tenant configureerbaar zijn:

| # | Configuratie | Beschrijving | Referentie |
|---|---|---|---|
| K1 | Beschikbare acties | Acties passen zich aan op klantconfiguratie | Business rule K1 |
| K2 | Kolomvolgorde | Default kolomvolgorde per klant | Business rule K2 |
| K3 | Locatie preset | Default locatiefilter per receptie | Business rule K3 |
| I2 | Identiteitscontrole | Drie varianten: vinkje / vinkje+documentnr / uit | Business rule I1-I2 |
| N1 | Notificatie modus | Automatisch of handmatig per klant | Business rule N1-N3 |
| N7 | Notificatie vorm | Mail / belknop / beide / niets | Business rule N7 |
| S1 | Drempel "Nog niet aangekomen" | Tijd na aankomsttijd (bijv. 5 min, 15 min) | Business rule S1 |
| — | Persoontypen | Welke typen (bezoeker, contractor-subtypes) per tenant | Sectie 3.3 |
| — | Credential-typen | Welke credential-typen beschikbaar zijn | Sectie 3.7 |
| — | Zichtbare informatie | Welke kolommen/informatie per tenant zichtbaar is | NFR 6.3 |
| — | Rolgebaseerde toegang | Light-versie (lezen) vs. uitgebreid (alle acties) | NFR 6.3 |

---

## Bijlage — Overzicht business rules

Alle business rules gegroepeerd per domein. Gedetailleerde specificaties in `docs/user-flows/business-rules.md`.

### Compliance (C1–C8)

| # | Regel |
|---|---|
| C1 | Compliant = dossier compleet EN (e-learning behaald OF niet-vereist) |
| C2 | Niet-compliant → aanmelden geblokkeerd |
| C3 | Niet-compliant → credential printen/koppelen geblokkeerd |
| C4 | Blokkering geldt bij Verwacht, Nog niet aangekomen, Niet aangekomen |
| C5 | Bij Aangemeld is compliance gepasseerd — afmelden altijd mogelijk |
| C6 | E-learning uitnodiging alleen bij elearning niet-behaald |
| C7 | Dossier niet-OK bij: verlopen ID, verlopen certificering, of geblokkeerd |
| C8 | Bij geblokkeerd: accreditatie ingetrokken |

### Statussen (S1–S6)

| # | Regel |
|---|---|
| S1 | "Nog niet aangekomen" automatisch, drempel configureerbaar per klant |
| S2 | Annuleren onomkeerbaar |
| S3 | Alleen Aangemeld → Afgemeld |
| S4 | "Niet aangekomen ongedaan" → Verwacht |
| S5 | Afgemeld/Geannuleerd: alleen informeer contactpersoon + bekijk dossier |
| S6 | Automatisch afmelden bij pas inleveren |

### Credentials (CR1–CR9)

| # | Regel |
|---|---|
| CR1 | credentialType null tot flow voltooid |
| CR2 | Type bepaalt categorie: QR-code = printbaar, overig = fysiek |
| CR3 | Printbaar: mail/print verplicht vóór activering |
| CR4 | Fysiek: direct koppelen |
| CR5 | Niet beschikbaar bij Afgemeld/Geannuleerd |
| CR6 | Bij verlopen/ingetrokken/geblokkeerd: geen credential-acties |
| CR7 | Na ontkoppelen: reset naar niet-actief/null/null |
| CR8 | Koppelen en aanmelden zijn twee losse acties |
| CR9 | Bij verlies: ontkoppelen + opnieuw koppelen |

### Notificaties (N1–N7)

| # | Regel |
|---|---|
| N1 | Modus (automatisch/handmatig) per klant |
| N2 | Automatisch: e-mail altijd verstuurd, toggle niet zichtbaar |
| N3 | Handmatig: toggle zichtbaar, standaard uit |
| N4 | Informeer contactpersoon bij alle statussen |
| N5 | Keuze bij meerdere contactpersonen |
| N6 | contactpersonen[0] = primair |
| N7 | Notificatievorm configureerbaar per klant |

### Identiteitscontrole (I1–I3)

| # | Regel |
|---|---|
| I1 | Verplicht bij aanmelden = klantconfiguratie |
| I2 | Drie varianten: alleen vinkje / vinkje+documentnr / uit |
| I3 | Bevestigen disabled bij verplichte lege velden |

### Persoontypen (P1–P5)

| # | Regel |
|---|---|
| P1 | persoontype Bezoeker = bezoeker, overig = contractor |
| P2 | Subtypes in configuratie beheerd |
| P3 | Tab counts dynamisch |
| P4 | Contractortype als aparte kolom |
| P5 | Term "contractor" wordt op termijn losser |

### Overig (K1–K3, D1–D4, AM1–AM2, DH1–DH3, M1–M3)

| # | Regel |
|---|---|
| K1 | Beschikbare acties per klantconfiguratie |
| K2 | Kolomvolgorde configureerbaar per klant |
| K3 | Locatie als preset filter |
| D1 | Default datumfilter = vandaag |
| D2 | Default locatiefilter = receptie-locatie |
| D3 | Datumwijziging kan persoon uit lijst halen |
| D4 | Lijst reactief bij datawijziging |
| AM1 | Drie-puntjesmenu uitgegrijsd zonder acties |
| AM2 | Alle acties gelogd in audit trail |
| DH1 | Wijzigingen opgeslagen in dossier-historie |
| DH2 | Aankomst wijzigen: primair in bezoekersdossier, hier nice-to-have |
| DH3 | Annuleren: primair in persoonsdossier |
| M1 | Backdrop sluit actie-modals niet |
| M2 | Velden reset bij sluiten/bevestigen |
| M3 | Detail panel sluit bij overlay-klik |

---

*Vertrouwelijk — Blis Digital / YIM — v0.6 Draft — 27 mei 2026*
