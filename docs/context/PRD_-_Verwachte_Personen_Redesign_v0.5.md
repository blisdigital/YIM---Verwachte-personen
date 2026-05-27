# Product Requirements Document

## Verwachte Personen: Redesign Bezoekersregistratie

| | |
|---|---|
| **Systeem** | YIM: Your Identity Management |
| **Module** | Bezoekersregistratie & Verwachte personen |
| **Versie** | 0.5: Concept |
| **Datum** | 9 april 2026 |
| **Opgesteld door** | Kim van Olderen: Blis Digital |
| **Status** | Ter review |

---

## Changelog

| Versie | Datum | Auteur | Wijzigingen |
|---|---|---|---|
| 0.1 | 31 maart 2026 | Kim van Olderen | Initiële PRD aangemaakt op basis van 17 as-is screenshots van de bezoekersregistratiemodule. |
| 0.2 | 31 maart 2026 | Kim van Olderen | Doelstellingen overgenomen uit epic omschrijving. Strikte scope-scheiding doorgevoerd tussen primair 'Verwachte Personen' scherm en UX debt. Hoofdstuk 5 (UX Debt) toegevoegd voor wizard, dossier en home-scherm. Backlog (H4) uitgebreid met Bron en Prioriteit (MoSCoW) op basis van INVEST-principes. Gap-analyse op basis van epic brief verwerkt: contractors, compliance, passtatus, parkeren, bulkacties, quick presets en overige ontbrekende onderdelen. Open vragen (H6) samengevoegd en uitgebreid met UX discovery vragenlijst voor Maurice. Leeswijzer en INVEST-kolom verwijderd uit H4. Sectienummering gecorrigeerd. |
| 0.3 | 31 maart 2026 | Kim van Olderen | Sectie 3.7 toegevoegd: 12 user flows met stappen, varianten, prioritering en edge cases. Gebruikerstabel (1.3) uitgebreid met Applicatiebeheerder en YIM Beheerder. Twee nieuwe vragen toegevoegd aan H6 (pas/credentials flow en ter-plekke-registratie met accreditatie). |
| 0.4 | 9 april 2026 | Kim van Olderen | Verwerking BA Design sessie met Maurice (8 april 2026). Statusmodel (concept) toegevoegd in sectie 3.8 met onderscheid receptie-acties vs. systeem-triggers. Business rules toegevoegd: annuleren niet omkeerbaar, no-show wel omkeerbaar, concept-registraties verschijnen niet in overzicht. Credential-typen uitgebreid (QR, wallet, tickets). Performance-eis toegevoegd: 1.000+ records. Tablet-support bevestigd als requirement. Rolgebaseerde toegang toegevoegd aan NFRs. Scope verduidelijkt: ad-hoc aanmeldingen en bedrijfsblokkade buiten scope. Open vragen opgeschoond op basis van beantwoorde items. |
| 0.5 | 9 april 2026 | Kim van Olderen | Statusmodel aangepast conform epic brief (5 statussen). Nuance uit BA sessie toegevoegd: fysieke aanwezigheid (pas-scan) staat niet gelijk aan administratieve check-in. Tabs bezoekers/contractors als requirement. Performance-eisen: 1.000+ regels real-time, Doherty threshold (400ms). Contractor subtypes sectie toegevoegd (bestaande functionaliteit). Compliance sectie (3.11) toegevoegd met dossier- en e-learning statussen; exacte UI en handhavingsregels nog uit te werken. |

---

## Inhoudsopgave

1. [Doelstellingen en achtergrond (Epic)](#1-doelstellingen-en-achtergrond-epic)
2. [As-Is situatie](#2-as-is-situatie)
3. [To-Be situatie](#3-to-be-situatie)
4. [DevOps backlog, Features & User Stories](#4-devops-backlog--features--user-stories)
5. [UX Debt, Verbeterpunten overige schermen](#5-ux-debt--verbeterpunten-overige-schermen)
6. [Open vragen](#6-open-vragen)
7. [Bijlage: Begrippenlijst](#bijlage--begrippenlijst)

---

## 1. Doelstellingen en achtergrond (Epic)

### 1.1 Achtergrond

YIM (Your Identity Management) is het centrale identiteits- en toegangsbeheersysteem dat gebruikt wordt voor het beheren van medewerkers, bezoekers en contractors. Binnen YIM bestaat de module Bezoekersregistratie, waarmee receptiemedewerkers, security officers en facilitaire medewerkers verwachte bezoekers kunnen registreren, autoriseren en ontvangen.

De huidige pagina 'Verwachte bezoekers' functioneert primair als een tabeloverzicht van geautoriseerde en te verwachten bezoekers. In de praktijk sluit dit scherm onvoldoende aan op de dagelijkse workflow van de receptie: er is geen real-time check-in status, geen dagelijks overzicht en geen mogelijkheid om snel te handelen vanuit het centrale overzicht. Daarnaast richt dit scherm zich alleen op bezoekers en niet op andere personen die voor een korte tijd aanwezig zijn op locaties, zoals contractors van derde partijen die worden ingehuurd om op locatie werkzaamheden uit te voeren.

### 1.2 Doelstellingen

- Eén overzicht voor alle verwachte personen: zowel bezoekers als contractors (inclusief contractor types).
- Duidelijk inzicht in wie komt, wanneer, waarom, bij wie en wat de actuele status is.
- Directe acties uitvoeren vanuit dezelfde pagina (aanmelden, afmelden, no-show, annuleren, pas koppelen/printen, contactpersoon informeren).
- Compliance-checks (dossiervolledigheid en e-learningstatus) direct zichtbaar en handhaafbaar.
- Inzicht in parkeerbehoefte en reserveringen.
- Krachtige filter- en segmentatiemogelijkheden, inclusief snelle preset-filters.
- De receptie-workflow optimaliseren voor dagelijks gebruik op desktop én tablet.

### 1.3 Gebruikers

De volgende rollen zijn betrokken bij of worden geraakt door deze epic:

| Rol | Beschrijving |
|---|---|
| Receptiemedewerker | Dagelijkse gebruiker van de centrale pagina en check-in flow; geeft passen uit. |
| Planner / bezoekerscoördinator | Registreert verwachte bezoekers vooraf. |
| Contactpersoon / ontvanger | Wordt geïnformeerd bij aankomst bezoeker. |
| Beveiligingsmedewerker | Beheert toegang en autorisaties; vergelijkbaar met receptiemedewerker; geeft passen uit. |
| Facility Manager | Beheert locaties en capaciteit; bekijkt rapportages. |
| Applicatiebeheerder | Beheert configuraties voor 'Verwachte personen' in het beheerscherm. |
| YIM Beheerder | Verantwoordelijk voor de applicatie-inrichting per tenant; stelt functionaliteiten beschikbaar. |

### 1.4 Scope

#### In scope

- Herontwerp van het 'Verwachte Personen' scherm
- Bezoekers én contractors in één overzicht
- Real-time synchronisatie tussen meerdere gelijktijdige gebruikers
- Blokkade van personen

#### Buiten scope (dit kwartaal)

- Ad-hoc aanmeldingen (ter plekke registreren zonder voorafgaande aanmelding)
- Blokkade van bedrijven
- Structurele aanpassingen aan het bezoekersdossier-overzichtsscherm
- Aanpassingen aan de registratiewizard (UX debt)

---

## 2. As-Is situatie

### 2.1 Overzicht huidige schermen

De huidige bezoekersmodule in YIM bestaat uit de volgende schermen:

#### 2.1.1 Verwachte bezoekers (centrale pagina)

Dit is het startpunt voor de receptie. Het toont een tabeloverzicht met twee tabs:

- **Geautoriseerd**: bezoekers met een goedgekeurde toegangsaanvraag.
- **In afwachting**: bezoekers waarvan de aanvraag nog niet is verwerkt.

De tabel bevat de volgende kolommen: Locatie, Bezoekreden, Bezoekreferentie, VIP-aanmelding, Persoon, Personeelsnummer, Bedrijf/Werkgever, Datum vanaf, Contactpersoon en contactgegevens. Elke kolom heeft een individueel zoekveld. Er is een datumfilter die standaard op de huidige dag staat.

#### 2.1.2 Bezoeker registreren (wizard)

Het registreren van een nieuwe bezoeker verloopt via een wizard:

- **Stap 1: Bezoekers zoeken**: zoek een bestaand YIM-profiel op basis van naam of e-mailadres. Resultaten tonen eerdere bezoeken met datum.
- **Stap 2: Registratie**: opgesplitst in meerdere substappen via een linkerzijbalk:
  - *Autorisaties selecteren*: kies de autorisatietype(n) voor de bezoeker.
  - *Bezoekreferentie & Bezoekreden*: vrij tekstveld + dropdown.
  - *Bezoeker(s)*, persoonsgegevens: voornaam, initialen, tussenvoegsel, achternaam, bedrijf, e-mailadres, taal, telefoonnummer, VIP-markering, parkeerplaats.
  - *Contactpersoon*: koppel een interne ontvanger of eigen profiel.
  - *Opmerking*: vrij tekstveld.

De aanvraag start in de status 'Concept' en kan worden ingediend of verwijderd. De voortgangsbalk bovenaan toont: Aanvraag, Resultaat dossier, Resultaat autorisatie en Accreditatiedatum.

#### 2.1.3 Bezoekersdossiers: overzichtslijst

Een apart scherm toont alle bekende bezoekers in YIM. Kolommen: Personeelsnummer, Persoon, Bedrijf/Werkgever, Telefoonnummer, E-mailadres, Gemaakt op, Laatste bewerkt. Via 'Mijn acties' kan een nieuwe bezoeker worden geregistreerd.

> *Aanname (te bevestigen): in de nieuwe situatie verwachten we geen structurele aanpassingen op dit overzichtsscherm. Dit scherm toont enkel een overzicht van en toegang tot geregistreerde dossiers — zie open vragen.*

#### 2.1.4 Specifiek bezoekersdossier

Een individueel dossier toont profielinformatie met foto, naam, type (Bezoeker), e-mailadres, bedrijf en datum laatste update. Het dossier heeft zes tabbladen: Dossier, Autorisaties, Aanmeldingen, Geschiedenis, Credentials en Certificaten.

Acties vanuit het dossier: Nieuw bezoek toevoegen, Bezoeker dossier bewerken, Foto upload, Synchroniseer persoon.

#### 2.1.5 Home-scherm

Het home-scherm toont twee widgets: Recente aanmeldingen en Recente accreditaties. Via 'Mijn acties' zijn snelkoppelingen beschikbaar voor veelgebruikte taken.

---

### 2.2 Pijnpunten en ontbrekende functionaliteiten

De pijnpunten zijn gesplitst naar scope: het primaire 'Verwachte bezoekers' scherm (in scope voor deze epic) en de overige schermen (UX debt, zie hoofdstuk 5).

#### Verwachte bezoekers: in scope voor deze epic

| # | Pijnpunt |
|---|---|
| 1 | **Geen real-time check-in/check-out status.** De centrale pagina toont alleen 'geautoriseerd' of 'in afwachting', maar niet of de bezoeker daadwerkelijk aanwezig is. |
| 2 | **Geen dagelijkse weergave.** Er is geen duidelijk 'vandaag'-overzicht. Het datumfilter staat standaard op vandaag maar is niet prominent en verborgen in de tabelkolom. |
| 3 | **Geen snelle acties vanuit de centrale pagina.** Check-in, de contactpersoon informeren of een bezoek annuleren kan niet direct vanuit de lijst. |
| 4 | **VIP-bezoekers zijn niet prominent.** De VIP-markering staat als kolom in de tabel zonder visuele prioritering of kleurcodering. *(zie ook open vragen)* |
| 5 | **Geen notificatiefunctionaliteit.** Contactpersonen/ontvangers worden niet automatisch geïnformeerd wanneer een bezoeker aankomt. |
| 6 | **Alleen bezoekers, geen contractors.** Het huidige scherm ondersteunt geen contractors of contractor types, terwijl receptie en beveiliging beide doelgroepen dagelijks beheren. |
| 7 | **Geen compliance-inzicht.** De volledigheid van een dossier en de e-learningstatus zijn niet zichtbaar in het overzicht, waardoor handmatige controle nodig is. |
| 8 | **Geen passtatus of pas-acties.** De koppeling en printstatus van een toegangspas is niet zichtbaar in de lijst en kan niet vanuit het overzicht worden beheerd. |
| 9 | **Geen parkeerbehoefte-indicatie.** Het is niet zichtbaar of een bezoeker een parkeerplaats nodig heeft of gereserveerd heeft. |
| 10 | **Beperkte filteropties en geen quick presets.** Filters zijn verborgen per kolom; er zijn geen snelle vooraf ingestelde filters voor veelvoorkomende scenario's. |

---

## 3. To-Be situatie

### 3.1 Overzicht

Het nieuwe 'Verwachte Personen' scherm wordt het centrale dashboard voor receptie en beveiliging. Het toont alle verwachte bezoekers én contractors in één overzicht met real-time statusinformatie.

### 3.2 Bezoekers vs. Contractors

| Aspect | Bezoekers | Contractors |
|--------|-----------|-------------|
| Duur | Meestal 1 dag | Langere periode (weken/maanden) |
| Aanmelden | Elke keer opnieuw | Eenmalig voor gehele periode |
| Pas | Tijdelijk / dagpas | Vaste pas voor periode |
| Uitchecken | Bij receptie | Zelfstandig via toegangscontrole |
| In/uit tracking | Via receptie check-in/out | Via onderliggend toegangscontrolesysteem |

Beide persoonstypen worden in hetzelfde scherm getoond. Tabs (bezoekers / contractors) worden gebruikt om focus te leggen en het overzicht behapbaar te houden bij grote aantallen.

### 3.3 Contractor subtypes

Contractor subtypes zijn reeds bestaande functionaliteit in YIM. Voor deze epic:

- Contractor subtypes worden getoond in de tabel (kolom "Contractor type")
- Gebruikers kunnen filteren op contractor subtype
- Configuratie van subtypes per tenant is bestaande functionaliteit — geen aanpassingen nodig

### 3.4 Registratieflow

```
Registratie (Concept) → Accreditatie/Goedkeuring → Status "Verwacht" → Verschijnt in overzicht
```

**Belangrijk:** Registraties met status "Concept" verschijnen NIET in het Verwachte Personen scherm. Pas na goedkeuring van de accreditatie krijgt de registratie status "Verwacht" en wordt deze zichtbaar.

### 3.5 Credential-typen

Het systeem ondersteunt verschillende typen credentials:

| Type | Beschrijving | Uitgifte |
|------|--------------|----------|
| Fysieke pasjes (hard cards) | Herbruikbare toegangspassen | Fysiek uitreiken aan balie |
| Geprinte tickets | Eenmalige passes uit automaat | Printen ter plekke |
| QR-codes | Digitale toegangscodes | Per e-mail versturen |
| Mobiele wallet (toekomstig) | Pas in telefoon-wallet | Via link naar wallet |

**Requirement:** Bestaande credential-flows worden hergebruikt; het koppelen van credentials aan personen moet flexibel zijn per type.

### 3.6 Parkeerbehoefte

Parkeerbehoefte wordt aangegeven tijdens het aanmeldproces en is zichtbaar in het Verwachte Personen overzicht:

- Simpele ja/nee indicatie
- Geen reserveringssysteem in deze epic (mogelijk in toekomst)
- Zichtbaar als kolom of indicator in het overzicht

### 3.7 Tijdsoverschrijding

Er is geen harde controle op eindtijd — personen kunnen langer blijven dan gepland. Het belangrijkste is zichtbaarheid: weten of iemand nog binnen is. Er vindt geen automatische uitcheck plaats bij het verstrijken van de eindtijd.

### 3.8 Bulk-uploads

Zowel bezoekers als contractors kunnen via Excel-upload worden aangemeld:

- Bulk-uploads worden als aparte records getoond (niet gegroepeerd)
- Mogelijkheid tot bulk-behandeling (meerdere personen tegelijk inchecken) moet aanwezig zijn

### 3.9 Statusmodel

| Status | Beschrijving | Trigger |
|--------|--------------|---------|
| Verwacht | Geregistreerd en geaccrediteerd, wacht op komst | Accreditatie goedgekeurd |
| Aangekomen | Persoon is gearriveerd | Aanmelden (check-in) + timestamp |
| Vertrokken | Persoon heeft locatie verlaten | Afmelden (check-out) + timestamp |
| No-show | Niet komen opdagen | Markering door receptie |
| Geannuleerd | Registratie geannuleerd | Annulering door receptie |

> ⚠️ **Opmerking uit BA sessie (Maurice, 8 april 2026):**
> 
> Bij sommige klanten (bijv. DSM) is er een verschil tussen fysieke aanwezigheid en administratieve check-in. Personen kunnen via een pas-scan fysiek het terrein betreden (= "binnen") zonder dat ze formeel zijn ingecheckt bij de receptie. In dat geval gaat er een notificatie naar de contactpersoon, maar heeft de persoon nog geen volledige toegang.
> 
> Dit betekent dat "Aangekomen" in de UI niet altijd gelijk staat aan een pas-scan bij de poort. De exacte interpretatie kan per klant/situatie verschillen. Voor de meeste klanten geldt: Aangekomen = ingecheckt door receptie.

### 3.10 Business Rules

#### Annuleren

- Annuleren mag altijd direct (geen voorwaarden)
- Annuleren is **NIET omkeerbaar** — persoon moet opnieuw geregistreerd worden
- Geannuleerde registraties blijven zichtbaar met status "Geannuleerd" (voor terugkijken/historie)

#### No-show

- No-show is een simpele flag (geen reden vereist)
- No-show is **WEL omkeerbaar** — persoon kan alsnog inchecken als deze later arriveert
- No-shows kunnen later worden omgezet naar Aangekomen

#### Concept-registraties

- Registraties met status "Concept" verschijnen **NIET** in het Verwachte Personen overzicht
- Pas na accreditatie/goedkeuring wordt status "Verwacht" en verschijnt de persoon in het overzicht

### 3.11 Compliance (dossier & e-learning)

Compliance-checks moeten direct zichtbaar en handhaafbaar zijn in het Verwachte Personen overzicht. Dit betreft twee aspecten:

#### Dossiervolledigheid

| Wat we weten | Status |
|--------------|--------|
| Dossier compleet wordt getoond als Ja/Nee | ✅ Bevestigd (epic brief) |
| Bij "Niet compleet": tonen wat er nog mist (tooltip/detail) | ✅ Bevestigd (epic brief) |
| Receptie moet kunnen zien waarom iemand niet compleet is | ✅ Bevestigd |

**Nog uit te werken:**
- Welke velden/documenten maken een dossier "compleet"? (configureerbaar per tenant?)
- Wat moet receptie doen als dossier niet compleet is — blokkeren of waarschuwen?

#### E-learning

E-learning status kent meerdere mogelijke waarden:

| Status | Beschrijving |
|--------|--------------|
| Niet verplicht | Geen e-learning vereist voor deze persoon |
| Verplicht – Behaald | E-learning afgerond en geldig |
| Verplicht – Niet behaald | E-learning nog niet afgerond |
| Verplicht – Verlopen | E-learning eerder behaald maar niet meer geldig |

**Nog uit te werken:**
- Hoe tonen we deze statussen in de UI? (iconen, kleuren, kolom?)
- Wat is de gewenste actie per status? (blokkeren, waarschuwen, informeren?)
- Kan receptie een uitzondering maken?

#### Handhaving

"Handhaafbaar" betekent in deze context: receptie kan op basis van dossier- en e-learningstatus beslissen of iemand toegang krijgt. De exacte handhavingsregels (hard blokkeren vs. waarschuwen) moeten nog worden uitgewerkt.

### 3.12 Configuratie en rechten

#### Rolgebaseerde toegang

Er worden diverse receptierechten ondersteund:

| Rol | Rechten |
|-----|---------|
| Light-versie | Leesrechten: overzicht bekijken, zoeken, filteren |
| Uitgebreide versie | Volledige rechten: inchecken, uitchecken, no-show, annuleren, pas koppelen |

#### Tenant-configuratie

Per tenant configureerbaar:

- Welke informatie zichtbaar is in het overzicht
- Welke persoonstypes (bezoekers, contractors, contractor-subtypes) worden gebruikt
- Welke acties beschikbaar zijn voor welke rol

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Requirement | Specificatie |
|-------------|--------------|
| Volume normaal | 200–500 bezoekers per dag bij grotere klanten |
| Volume piek | Tot 1.000+ personen per dag (incl. contractors) bij turnaround/piekmomenten |
| Capaciteit | 1.000+ regels moeten real-time getoond en geüpdatet kunnen worden |
| Laadtijd | Doherty threshold: systeemrespons binnen 400ms voor optimale gebruikerservaring |
| Real-time | Data moet real-time gesynchroniseerd worden tussen meerdere gelijktijdige gebruikers aan de balie |

### 4.2 Device support

| Device | Support |
|--------|---------|
| Desktop | Primair (volledige functionaliteit) |
| Tablet | Ondersteund (responsief design) |

### 4.3 Toegankelijkheid

- Rolgebaseerde UI: light-versie (lezen) vs. uitgebreide versie (alle acties)
- Per tenant configureerbaar welke informatie en persoonstypes zichtbaar zijn

---

## 5. DevOps backlog — Features & User Stories

*(Bestaande backlog-items blijven ongewijzigd — zie origineel document)*

---

## 6. UX Debt — Verbeterpunten overige schermen

*(Bestaande UX debt items blijven ongewijzigd — zie origineel document)*

---

## 7. Open vragen

### Beantwoord (BA Design sessie 8 april 2026)

De volgende vragen zijn beantwoord tijdens de BA Design sessie met Maurice:

| Vraag | Antwoord |
|-------|----------|
| Moet tablet-formaat ondersteund worden? | Ja, design moet responsief zijn en tablet ondersteunen |
| Is real-time een harde vereiste? | Ja, data moet real-time gesynchroniseerd worden tussen meerdere gebruikers |
| Moeten contractors in hetzelfde scherm? | Ja, bezoekers én contractors in één overzicht (optioneel met tabs) |
| Hoe werkt de credential-flow? | Bestaande flows hergebruiken; flexibel per credential-type |
| Hoe werken bulk-uploads? | Bulk-uploads komen als aparte records (niet gegroepeerd) |
| Is annuleren omkeerbaar? | Nee, persoon moet opnieuw geregistreerd worden |
| Is no-show omkeerbaar? | Ja, persoon kan alsnog inchecken |
| Moet er een tijdscontrole zijn? | Nee, geen harde handhaving; wel zichtbaarheid of iemand nog binnen is |
| Ad-hoc aanmeldingen in scope? | Nee, buiten scope — we gaan ervan uit dat personen vooraf zijn aangemeld |

### Nog openstaand

#### Compliance & Dossiers (wordt nog uitgewerkt)

**Dossiervolledigheid:**
- [ ] Welke velden/documenten maken een dossier "compleet"? Is dit per tenant configureerbaar?
- [ ] Wat moet receptie doen als dossier niet compleet is — blokkeren of waarschuwen?

**E-learning:**
- [ ] Hoe tonen we de e-learning statussen in de UI? (iconen, kleuren, aparte kolom?)
- [ ] Wat is de gewenste actie per status (niet behaald, verlopen)? Blokkeren of waarschuwen?
- [ ] Kan receptie een uitzondering maken bij compliance-issues? Zo ja, wie mag dat?

**Handhaving:**
- [ ] Zijn er harde blokkers (mag absoluut niet inchecken) versus zachte waarschuwingen (mag wel, maar let op)?

#### Parkeren

- [ ] Wat doet receptie als "benodigd = ja" maar "gereserveerd = nee"? Kunnen zij ter plekke reserveren?
- [ ] Wat betekent "Plek/Code indien bekend"? Is dit een kenteken, een vaknummer, een toegangscode?

#### Passen

- [ ] Wat gebeurt er met de pas bij uitchecken? Inleveren, automatisch ontkoppeld?
- [ ] In hoeverre mag een printbare pas ook digitaal worden verstuurd, bijvoorbeeld als QR-code per e-mail?

#### Acties & Bulkacties

- [ ] Via welk platform wordt 'een bericht sturen' naar de contactpersoon afgehandeld? (Teams, intern YIM-bericht, WhatsApp, of anders?)
- [ ] Staat VIP-prominentie expliciet in de epic omschrijving, of is dit een UX-aanname?
- [ ] Op welke manieren/mogelijkheden kan receptie de contactpersoon informeren?
- [ ] Welke actie wordt door de gebruiker het meeste gebruikt?
- [ ] In welke scenario's checkt receptie meerdere mensen tegelijk in? (groepsbezoek, ploegwisseling contractors?)
- [ ] Hoeveel mensen tegelijk is realistisch: 5, 50, 500?
- [ ] Moeten bulkacties bevestigd worden, of direct uitgevoerd?

#### Filters & Zoeken

- [ ] Welke filters worden het meest gebruikt in de huidige situatie?
- [ ] "Quick filters" zijn presets: kunnen gebruikers eigen presets opslaan?
- [ ] Hoe vaak wisselen gebruikers van locatie in de filter? (multi-site organisaties)
- [ ] Moet vrij zoeken ook werken op gedeeltelijke matches en typefouten?

#### Tenantconfiguratie

- [ ] Als een tenant geen contractors heeft, verdwijnt dan de hele kolom/filter, of blijft de structuur intact?
- [ ] Zijn er tenants met alleen contractors en geen bezoekers?

#### Technisch & Integraties

- [ ] Is de koppeling met het toegangscontrolesysteem voor automatische statusupdate bij badge-scan een aanname, of staat dit in de epic?
- [ ] Integraties met externe systemen? (parkeer-API, HR-systeem voor contractors, agenda-sync?)
- [ ] Offline scenario's: wat als de internetverbinding wegvalt bij de balie?

#### Metrics & Succes

- [ ] Hoe meten we of het redesign geslaagd is? Welke KPI's?
- [ ] Zijn er operationele targets voor receptie? (gemiddelde inchecktijd, no-show registratie?)
- [ ] Hoe halen we feedback op bij gebruikers voordat we dit scherm gaan bouwen?

---

## Bijlage — Begrippenlijst

| Term | Definitie |
|---|---|
| YIM | Your Identity Management: het centrale identiteitsbeheersysteem. |
| Bezoeker | Een externe persoon die tijdelijk toegang krijgt tot een locatie. |
| Verwacht persoon | Een bezoeker (of contractor) die vooraf is geregistreerd en verwacht wordt op een specifieke dag. |
| Aanmelden (check-in) | De handeling waarbij de aankomst van een persoon wordt geregistreerd. Status wordt "Aangekomen". |
| Afmelden (check-out) | De handeling waarbij het vertrek van een persoon wordt geregistreerd. Status wordt "Vertrokken". |
| Verwacht | Status: persoon is geregistreerd en geaccrediteerd, wacht op komst. |
| Aangekomen | Status: persoon is gearriveerd en aangemeld. |
| Vertrokken | Status: persoon heeft locatie verlaten en is afgemeld. |
| No-show | Status: verwachte persoon is niet komen opdagen. Omkeerbaar: kan alsnog inchecken. |
| Geannuleerd | Status: registratie is geannuleerd. Niet omkeerbaar: persoon moet opnieuw geregistreerd worden. |
| Autorisatie | Een toegekend toegangsrecht voor een specifieke locatie of zone. |
| Contactpersoon | De interne medewerker die de bezoeker ontvangt of verantwoordelijk is. |
| VIP | Bezoeker met een bijzondere status die extra aandacht of protocol vereist. |
| Contractor | Een externe medewerker van een derde partij die op locatie werkzaamheden uitvoert. |
| Contractor type | Een configureerbare subcategorie van contractors per tenant (bijv. schoonmaak, beveiliging, onderhoud). |
| Credential | Een toegangsmiddel: fysieke pas, geprint ticket, QR-code, of mobiele wallet. |
| Dossiervolledigheid | Indicatie of alle vereiste documenten en gegevens in een dossier aanwezig zijn. |
| Quick filter preset | Een vooraf ingestelde filtercombinatie die met één klik een specifieke weergave activeert. |
| UX Debt | Verzameling van bekende UX-verbeterpunten die bewust zijn uitgesteld naar een latere sprint of epic. |

---

*Vertrouwelijk — Blis Digital / YIM — v0.5 Concept — 9 april 2026*
