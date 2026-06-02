# Product Requirements Document

## Verwachte Personen: Redesign Bezoekersregistratie

| | |
|---|---|
| **Systeem** | YIM: Your Identity Management |
| **Module** | Bezoekersregistratie & Verwachte personen |
| **Versie** | 0.7: Draft |
| **Datum** | 2 juni 2026 |
| **Opgesteld door** | Kim van Olderen: Blis Digital |
| **Status** | Ter review |

---

## Changelog

| Versie | Datum | Auteur | Wijzigingen |
|---|---|---|---|
| 0.6 | 27 mei 2026 | Kim van Olderen | Volledige herziening op basis van prototype, epic-omschrijving en uitgewerkte user flows. Statusmodel bijgewerkt naar 6 statussen. Featurelijst met business rules en configuratiemogelijkheden toegevoegd. Procesomschrijvingen voor alle user flows. Compliance van "uit te werken" naar volledig gespecificeerd. Credential-flows uitgewerkt in 3 scenario's. Open vragen opgeschoond. Bulkacties naar buiten scope MVP. |
| 0.7 | 2 juni 2026 | Kim van Olderen | Structuurherziening: processen (H4) gemerged in featurelijst, As-Is ingekort, To-Be subsecties samengevoegd. Kolom-telling gecorrigeerd (1 sticky + 20 data). Aankomst wijzigen gepositioneerd als dossier-actie (conform epic). E-learning "Verlopen" als mogelijke status toegevoegd. Quick filter presets uitgebreid conform epic. Deelbeheer als functionele eis opgenomen. |

> Eerdere versies (0.1–0.5): zie git-historie.

---

## Inhoudsopgave

1. [Doelstellingen en achtergrond](#1-doelstellingen-en-achtergrond)
2. [As-Is situatie](#2-as-is-situatie)
3. [To-Be situatie](#3-to-be-situatie)
4. [Featurelijst](#4-featurelijst)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Bijlagen](#bijlage--begrippenlijst)

---

## 1. Doelstellingen en achtergrond

### 1.1 Achtergrond

YIM (Your Identity Management) is het centrale identiteits- en toegangsbeheersysteem voor medewerkers, bezoekers en contractors.

De huidige pagina "Verwachte bezoekers" sluit onvoldoende aan op de dagelijkse workflow: geen real-time status, geen dagelijks overzicht, geen directe acties, en geen ondersteuning voor contractors.

### 1.2 Doelstellingen

- Eén overzicht voor alle verwachte personen (bezoekers én contractors, incl. de verschillende contractor types)
- Duidelijk inzicht in wie komt, wanneer, waarom, bij wie en wat de actuele status is van het bezoek.
- Directe acties vanuit dezelfde pagina (aanmelden of afmelden, credentials koppelen en ontkoppelen, contactpersoon informeren, e-learning pincode verstrekken)
- Compliancy controleren op dossier en eLearning, direct zichtbaar en handhaafbaar
- Inzicht in parkeerbehoefte (wel of niet gereserveerd)
- Krachtige filter- en segmentatiemogelijkheden
- Geoptimaliseerd voor dagelijks gebruik op desktop én tablet (fluid UI)

### 1.3 Gebruikers

| Rol | Beschrijving |
|---|---|
| Receptiemedewerker | Dagelijkse gebruiker: verantwoordelijk voor ontvangst en credential uitgeven |
| Planner / bezoekerscoördinator  | Registreert verwachte bezoekers en contractors vooraf en geeft wijzigingen door |
| Contactpersoon / ontvanger | Wordt geïnformeerd bij aankomst, registreert eigen bezoekers en contractors en geeft wijzigingen door |
| Beveiligingsmedewerker | Beheert toegang en autorisaties; ontvangt soms bezoekers en contractors en geeft credentials uit |
| Facility Manager | Beheert locaties, autorisaties en capaciteit; bekijkt rapportages |
| Applicatiebeheerder | Beheert configuraties in het beheerscherm |
| YIM Beheerder | Applicatie-inrichting per tenant |

### 1.4 Scope

#### In scope

- Herontwerp van het "Verwachte Personen" scherm
- Bezoekers én contractors in één overzicht
- Alle acties uitvoerbaar vanuit het overzicht: aan- en afmelden, credentialbeheer, elearning pincode en contactpersoon op de hoogte stellen.

#### Buiten scope (MVP)

- Bulkacties: meerdere personen tegelijk bewerken. Raakt ook bulkregistratie in het aanmeldproces.
- Ad-hoc aanmeldingen: ter plekke bezoekers en contractors registreren zonder voorafgaande aanmelding.
- Blokkade van personen en bedrijven: onderdeel van een andere feature
- Directe acties vanuit het Verwachte Personen scherm voor het wijzigen van aankomst-/vertrekdatum en -tijden of het annuleren van aanmeldingen. Deze acties worden primair via het dossier uitgevoerd (zie F5, F6). De modal-implementaties bestaan in het prototype maar zijn niet beschikbaar in het actiemenu.
- UX debt in betrokken YIM-schermen i.v.m. aankomend redesign op basis van de nieuwe huisstijl.

---

## 2. As-Is situatie

Huidige "Verwachte bezoekers" pagina: tabeloverzicht met tabs "Geautoriseerd" / "In afwachting", maar overzicht voldoet niet aan de vereisten. Dit scherm focust zich alleen op persoonstype 'bezoeker'.

### Pijnpunten

| # | Pijnpunt |
|---|---|
| 1 | Geen aanmeld- en afmeldstatus |
| 2 | Geen duidelijk "vandaag"-overzicht |
| 3 | Geen snelle acties vanuit centrale pagina |
| 4 | VIP-bezoekers niet prominent |
| 5 | Geen notificatiefunctionaliteit richting contactpersoon |
| 6 | Alleen bezoekers, geen contractors |
| 7 | Geen compliance-inzicht (dossier, e-learning) |
| 8 | Geen credentialbeheer en credentialstatus |
| 9 | Geen parkeerbehoefte-indicatie |
| 10 | Beperkte filteropties, geen quick presets |

---

## 3. To-Be situatie

### 3.1 Overzicht

Het nieuwe "Verwachte Personen" scherm is het centrale overzicht voor receptie en beveiliging. Alle verwachte bezoekers én contractors in één overzicht met verwachte personen, duidelijke aankomst- en vertrekinformatie, duidelijke statussen, directe acties, en zichtbare compliance-checks.

### 3.2 Persoontypen

Bezoekers en contractors in hetzelfde scherm. Tabs Alle / Bezoekers / Contractors.

Hou rekening met meerdere 'persoonstypes' in de toekomst. In het design is een future-proof design gemaakt voor meerdere persoonstypen: [Link naar figma](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=249-47809&t=GLEY2jnXXOR4Tz4F-1).

Button-tabs worden dan vervangen met een dropdown filter. Dropdown filters locatie (i.v.m. deelbeheer) en persoontypen worden dan links uitgelijnd. Reden: zijn belangrijker dan de andere preset filters en zullen naar verwachting vaker gebruikt worden door de gebruiker. Met uitlijning en apart zettenn van de rest van de filters, zorgen we ervoor dat ze opvallen in de UI.

Persoonstype 'contractor' heeft ook meerdere contractortypen. Die worden niet getoond in de tabs, maar wel in het tabel. Via tabel filters is het mogelijk om specifiek te filteren op contractortypen.

### 3.3 Registratieflow

Registratie (Concept) → Accreditatie → Status "Verwacht" → verschijnt in overzicht bij juiste locatie en aankomstdatum. Concept-registraties niet zichtbaar. Pas bij afgeronde aanmeld- en accreditatie wordt verwachte persoon in de lijst getoond met status 'verwacht'.

### 3.4 Kolommen en weergave

Kolomdefinities in `columns.json` (single source of truth): 1 sticky kolom (acties) + 20 datakolommen, waarvan 3 standaard verborgen (personeelsnr, telefoonnummer, e-mailadres). Alle kolommen resizable. Horizontale scroll.

**Parkeren:** drie waarden per persoon — benodigd (ja/nee), gereserveerd (ja/nee), plek/code. Geen reserveringssysteem.

**Tijdsoverschrijding:** geen automatische uitcheck bij verstrijken eindtijd. Focus op zichtbaarheid.

> **Let op:** Kolommen zijn nog niet definitief. Welke informatie getoond moet worden, wordt nog uitgevraagd bij klanten. Volgorde kan nog veranderen.

### 3.5 Statusmodel

Zes statussen, onderverdeeld in receptie-acties en systeem-triggers:

| Status | Betekenis | Trigger |
|--------|-----------|---------|
| **Verwacht** | Geregistreerd, bezoek gepland | Accreditatie goedgekeurd |
| **Nog niet aangekomen** | Aankomsttijd verstreken, niet aangemeld | Automatisch na verstreken aankomsttijd (drempel configureerbaar per klant) |
| **Aangemeld** | Aangemeld op locatie | Receptionist via "Persoon aanmelden" of automatisch naar credential gekoppeld (actief) |
| **Afgemeld** | Uitgecheckt | Receptionist via "Persoon afmelden", of automatisch bij credential inleveren (bijvoorbeeld via inslikker/inleverbak) |
| **Niet aangekomen** | Niet aangekomen op locatie, niet aangemeld en/of credential niet opgehaald | **Automatisch** — dag of vertrekdatum verstreken |
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

#### Beschikbare acties per status

| Actie | Verwacht | Nog niet aangek. | Aangemeld | Afgemeld | Niet aangek. | Geannuleerd |
|-------|:--------:|:-----------------:|:---------:|:--------:|:------------:|:-----------:|
| Persoon aanmelden | ✓ | ✓ | — | — | — | — |
| Persoon afmelden | — | — | ✓ | — | — | — |
| Credential beheer | ✓ | ✓ | ✓ | — | — | — |
| E-learning code | ✓* | ✓* | ✓* | — | — | — |
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
| Verlopen | Geldigheid van de e-learning is verlopen — kan in toekomstige iteratie relevant worden als aparte status |

#### Compliance-regel

Een persoon is **compliant** als dossier compleet is EN e-learning is behaald of niet-vereist.

**Blokkering:** Niet-compliant personen kunnen niet worden aangemeld en kunnen geen actieve credential ontvangen.

### 3.7 Credential-typen

| Type | Beschrijving | Uitgifte |
|------|--------------|----------|
| Fysieke pasjes | Herbruikbare toegangspassen | Fysiek uitreiken |
| QR-codes | Digitale toegangscodes | Mailen of printen |
| Mobiele wallet (toekomstig) | Pas in telefoon-wallet | Via link |

Credential-status: niet-actief, actief, verlopen, ingetrokken, geblokkeerd.

Bij verlopen/ingetrokken/geblokkeerd: geen credential-acties beschikbaar. Credential moet dan eerst opnieuw aangevraagd worden via dossier.

---

## 4. Featurelijst

### F1. Lijstweergave verwachte personen

Centraal tabeloverzicht met alle verwachte bezoekers en contractors voor geselecteerde datum en locatie.

- Bezoekers en contractors in dezelfde tabel met type tabs (Alle/Bezoekers/Contractors)
- Horizontale scroll, actiekolom sticky
- 1 sticky kolom (acties) + 20 datakolommen, waarvan 3 standaard verborgen
- Kolommen resizable door gebruiker
- Hele rij klikbaar → opent detail panel
- **Business rules:** P1 (bezoeker vs contractor bepaling), P3 (dynamische tab counts), D1 (default vandaag), D2 (default receptie-locatie), D4 (reactief sorteren/filteren)
- **Configuratie:** K2 (kolomvolgorde per klant), kolom zichtbaarheid per eindgebruiker instelbaar

### F2. Statusmodel

Zes statussen met gedefinieerde overgangen, triggers en beschikbare acties per status. Zie §3.5.

- Verwacht → Nog niet aangekomen (automatisch bij verstreken aankomsttijd)
- Niet aangekomen → automatisch bij verstreken dag of vertrekdatum
- Afgemeld kan automatisch bij pas inleveren
- **Business rules:** S1 (automatische "Nog niet aangekomen", drempel configureerbaar), S2 (annuleren onomkeerbaar), S3 (alleen Aangemeld → Afgemeld), S4 ("Niet aangekomen" is terminal), S5 (beperkte acties bij Niet aangekomen/Afgemeld/Geannuleerd), S6 (automatisch afmelden bij pas inleveren)
- **Configuratie:** drempel voor "Nog niet aangekomen" per klant instelbaar

### F3. Persoon aanmelden

Receptionist checkt verwachte persoon in via actiemenu of detail panel. Modal toont persoonsgegevens, optioneel identiteitscontrole, optioneel e-mail naar contactpersoon. Na bevestiging: status → Aangemeld, checkinTime gezet.

- Compliance-check blokkeert aanmelden bij niet-compliant (hard)
- Identiteitscontrole in modal (configureerbaar per klant)
- E-mail naar contactpersoon (configureerbaar per klant)
- **Voorwaarden:** Status Verwacht, Nog niet aangekomen of Niet aangekomen. Persoon moet compliant zijn.
- **Business rules:** C1 (compliance definitie), C2 (niet-compliant → geblokkeerd), C4 (blokkering bij welke statussen), I1-I3 (identiteitscontrole varianten)
- **Configuratie:** I2 (drie varianten identiteitscontrole: alleen vinkje / vinkje+documentnr / uit), N1-N3 (notificatie modus)

### F4. Persoon afmelden

Receptionist checkt aangemelde persoon uit. Modal toont persoonsgegevens, optioneel e-mail naar contactpersoon. Na bevestiging: status → Afgemeld, checkoutTime gezet. Kan ook automatisch bij inleveren pas (inslikker/inleverbox).

- Compliance niet meer relevant (al gecontroleerd bij aanmelden)
- **Voorwaarden:** Status Aangemeld.
- **Business rules:** S3 (alleen vanuit Aangemeld), S6 (automatisch bij pas inleveren), C5 (compliance niet meer relevant)
- **Configuratie:** N1-N3 (notificatie modus per klant)

### F5. Aanmelding annuleren

Receptionist annuleert gepland bezoek. Modal toont waarschuwing ("Dit kan niet ongedaan worden gemaakt"), optioneel reden (dropdown), optioneel toelichting (vrij tekst), optioneel e-mail naar contactpersoon. Na bevestiging: status → Geannuleerd. **Onomkeerbaar** — persoon moet opnieuw geregistreerd worden.

- Opgeslagen in dossier-historie
- **Voorwaarden:** Status Verwacht of Nog niet aangekomen.
- **Business rules:** S2 (onomkeerbaar), DH1 (historie in dossier), DH3 (primair in persoonsdossier)
- **Configuratie:** N1-N3 (notificatie modus per klant)

### F6. Aankomst wijzigen

Aanpassen van aankomstdatum en -tijd wordt primair via het dossier uitgevoerd. Een versnelde actie wordt toegevoegd aan het dossier om dit met zo min mogelijk klikken uit te voeren. Nice-to-have: directe actie vanuit Verwachte Personen scherm.

- Vier velden: aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd
- Persoon kan uit gefilterde lijst verdwijnen na wijziging
- Opgeslagen in dossier-historie
- **Voorwaarden:** Status Verwacht of Nog niet aangekomen.
- **Business rules:** D3 (verdwijnt als datum niet matcht), DH1 (historie in dossier), DH2 (primair in dossier, hier nice-to-have)

### F8. Credential activeren

Receptionist koppelt credential (pas of QR-code) aan persoon. Drie scenario's:

**Scenario A — Printbaar (QR-code):** Credentialnummer + periode invullen. Credential mailen of printen (verplicht vóór activering). Dan activeren. Resultaat: credentialStatus → actief.

**Scenario B — Fysiek (pas):** Credentialnummer + periode (permanent of tijdelijk) invullen. Koppelen. Resultaat: credentialStatus → actief, pasnummer gevuld.

**Scenario C — Meerdere Credentials:** Eerst credential type selecteren, daarna formulier van scenario A of B.

Optioneel: accessoire-blok (naam + afbeelding) als geconfigureerd.

- **Voorwaarden:** credentialStatus niet-actief. Status niet Niet aangekomen, Afgemeld of Geannuleerd. Persoon moet compliant zijn.
- **Business rules:** CR1 (credentialType null tot flow voltooid), CR2 (type bepaalt categorie), CR3 (printbaar: mail/print verplicht), CR4 (fysiek: direct koppelen), CR5 (niet bij Niet aangekomen/Afgemeld/Geannuleerd), C3 (geblokkeerd bij niet-compliant), CR8 (koppelen en aanmelden zijn twee losse acties)
- **Configuratie:** beschikbare credential-typen per tenant

### F9. Credential mailen

Receptionist verstuurt actieve QR-code credential per e-mail. Modal toont e-mailadres. Na versturen: toast-bevestiging. Geen statuswijziging.

- **Voorwaarden:** credentialStatus actief + credentialType QR-code. Status niet Niet aangekomen, Afgemeld of Geannuleerd.
- **Business rules:** CR2 (alleen voor printbare credentials), CR5 (niet bij Niet aangekomen/Afgemeld/Geannuleerd)

### F10. Credential ontkoppelen

Receptionist koppelt credential los. Bevestigingsmodal. Na bevestiging: credentialStatus → niet-actief, credentialType → null, pasnummer → null.

- **Voorwaarden:** credentialStatus actief. Status niet Niet aangekomen, Afgemeld of Geannuleerd.
- **Business rules:** CR5 (niet bij Niet aangekomen/Afgemeld/Geannuleerd), CR7 (reset-gedrag), CR9 (bij verlies: ontkoppelen + opnieuw koppelen)

### F11. Informeer contactpersoon

Receptionist informeert contactpersoon via bellen of e-mail. Modal toont contactgegevens. Bij meerdere contactpersonen: keuze via dropdown. Bellen via `tel:` link. Mailen via vervolgscherm met optioneel bericht. Shortcut vanuit detail panel: klik op e-mail icon → direct naar mail-scherm.

- **Voorwaarden:** Beschikbaar bij alle statussen.
- **Business rules:** N4 (beschikbaar bij alle statussen), N5 (keuze bij meerdere contactpersonen), N6 (contactpersonen[0] is primair)
- **Configuratie:** N1 (automatisch of handmatig per klant), N7 (notificatievorm: mail / belknop / beide / niets per klant)

### F12. E-learning uitnodiging

Receptionist helpt persoon met starten verplichte e-learning. Modal met twee opties:

- **Verstuur per e-mail:** E-mailadres vooraf ingevuld (bewerkbaar), link naar e-learning module.
- **Ter plekke starten:** QR-code direct zichtbaar + pincode. Optioneel: print pincode.

Geen statuswijziging. E-learning status wijzigt pas na voltooiing door persoon.

- **Voorwaarden:** elearning niet-behaald. Status niet Niet aangekomen, Afgemeld of Geannuleerd.
- **Business rules:** C6 (alleen bij elearning niet-behaald), CR5-equivalent (niet bij Niet aangekomen/Afgemeld/Geannuleerd)

### F13. Detail panel

Klik op rij opent detail panel als gecentreerde modal. Vier secties: Bezoekgegevens, Compliance, Contactpersoon, Credential. Footer toont status-afhankelijke actieknoppen (aanmelden, afmelden, credential, bekijk dossier). Niet-compliant: relevante knoppen disabled.

- Opent bij klik op rij (niet checkbox of actiemenu)
- Sluit bij klik op overlay
- **Business rules:** M3 (sluit bij klik op overlay), C2-C4 (compliance blokkering op knoppen)

### F14. Filterstrip en zoeken

Filterstrip met type tabs, locatie, datum, status, compliance, parkeren en zoekbalk.

| Element | Beschrijving |
|---------|-------------|
| Type tabs | Alle / Bezoekers / Contractors — segmented buttons met counts |
| Locatie chip | Dropdown met locaties, default receptie-locatie |
| Datum chip | Popup met datuminput + presets (Vandaag / Morgen / Deze week) |
| Status chip | Checkboxes per status |
| Compliance chip | Checkboxes: dossier volledig/onvolledig, e-learning voltooid/niet voltooid |
| Parkeren chip | Checkboxes: gereserveerd / niet gereserveerd |
| Zoekbalk | Zoek op naam, bedrijf, referentie (300ms debounce) |

#### Quick filter presets

| Preset | Beschrijving |
|--------|-------------|
| Verwacht vandaag | Datum = vandaag |
| Contractors vandaag | Persoonstype = Contractor + datum = vandaag |
| Bezoekers vandaag | Persoonstype = Bezoeker + datum = vandaag |
| Parkeer nodig – niet gereserveerd | Parkeren benodigd = ja + gereserveerd = nee |
| E-learning vereist – niet behaald | E-learning = niet-behaald |
| Dossier niet compleet | Dossier = onvolledig |

- **Business rules:** P3 (dynamische tab counts), D1 (default vandaag), D2 (default receptie-locatie)
- **Configuratie:** K3 (locatie als preset filter, default eigen locatie)

### F15. Kolomfilters

Filterrij direct onder kolomheaders met per-kolom filtering.

- Tekst, dropdown of datumfilter per kolomtype
- Default waarden gesynchroniseerd met filterstrip
- Sorteren: klik op kolomheader: geen → aflopend → oplopend → geen (cyclus)
- **Business rules:** D1-D2 (defaults), D4 (reactief herberekenen)

### F16. Kolominstellingen

Kolom zichtbaarheid togglen, sets opslaan en laden.

- Zoekbalk voor kolommen
- Sets opslaan met naam, laden, verwijderen
- **Configuratie:** K2 (kolomvolgorde per klant als default, eindgebruiker kan aanpassen)

### F17. Actiemenu per rij

Drie-puntjesmenu (⋯) met status-afhankelijke acties. Credential-acties dynamisch op basis van credentialStatus.

- Uitgegrijsd als geen acties beschikbaar
- **Business rules:** AM1 (uitgegrijsd zonder acties), AM2 (audit trail), S5 (beperkte acties bij Niet aangekomen/Afgemeld/Geannuleerd), CR5-CR6 (credential-acties condities)

### F18. VIP-markering

VIP-personen visueel gemarkeerd in tabel en detail panel. VIP-badge met kleurcodering. VIP kolom in tabel.

### F19. Paginering

Paginering onderaan tabel met configureerbaar aantal rijen per pagina.

> Volledige business rules specificaties: `docs/user-flows/business-rules.md`

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Requirement | Specificatie |
|-------------|-------------|
| Volume normaal | 200–500 bezoekers per dag |
| Volume piek | Tot 1.000+ personen (incl. contractors) |
| Capaciteit | 1.000+ regels real-time |
| Laadtijd | Doherty threshold: respons binnen 400ms |
| Real-time | Data gesynchroniseerd tussen meerdere gelijktijdige gebruikers |

### 5.2 Device support

| Device | Support |
|--------|---------|
| Desktop | Primair (volledige functionaliteit) |
| Tablet | Ondersteund (responsief design) |

### 5.3 Toegankelijkheid en autorisatie

- Rolgebaseerde UI: light-versie (lezen) vs. uitgebreide versie (alle acties)
- Per tenant configureerbaar welke informatie en persoonstypes zichtbaar zijn
- Deelbeheer: gebruiker ziet alleen personen voor locaties waartoe zij toegang heeft

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
| Niet aangekomen | Status: 'niet aangekomen', automatisch zodra de dag (= vertrekdatum) is verstreken. Niet omkeerbaar |
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
| — | Persoontypen | Welke typen (bezoeker, contractor-subtypes) per tenant | §3.2 |
| — | Credential-typen | Welke credential-typen beschikbaar zijn | §3.7 |
| — | Zichtbare informatie | Welke kolommen/informatie per tenant zichtbaar is | NFR 5.3 |
| — | Rolgebaseerde toegang | Light-versie (lezen) vs. uitgebreid (alle acties) | NFR 5.3 |

---

*Vertrouwelijk — Blis Digital / YIM — v0.7 Draft — 2 juni 2026*
