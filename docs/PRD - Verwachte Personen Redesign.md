# Product Requirements Document

## Verwachte Personen: Redesign Bezoekersregistratie

| | |
|---|---|
| **Systeem** | YIM: Your Identity Management |
| **Module** | Bezoekersregistratie & Verwachte personen |
| **Versie** | 0.3: Concept |
| **Datum** | 31 maart 2026 |
| **Opgesteld door** | Kim van Olderen: Blis Digital |
| **Status** | Ter review |

---

## Changelog

| Versie | Datum | Auteur | Wijzigingen |
|---|---|---|---|
| 0.1 | 31 maart 2026 | Kim van Olderen | Initiële PRD aangemaakt op basis van 17 as-is screenshots van de bezoekersregistratiemodule. |
| 0.2 | 31 maart 2026 | Kim van Olderen | Doelstellingen overgenomen uit epic omschrijving. Strikte scope-scheiding doorgevoerd tussen primair 'Verwachte Personen' scherm en UX debt. Hoofdstuk 5 (UX Debt) toegevoegd voor wizard, dossier en home-scherm. Backlog (H4) uitgebreid met Bron en Prioriteit (MoSCoW) op basis van INVEST-principes. Gap-analyse op basis van epic brief verwerkt: contractors, compliance, passtatus, parkeren, bulkacties, quick presets en overige ontbrekende onderdelen. Open vragen (H6) samengevoegd en uitgebreid met UX discovery vragenlijst voor Maurice. Leeswijzer en INVEST-kolom verwijderd uit H4. Sectienummering gecorrigeerd. |
| 0.3 | 31 maart 2026 | Kim van Olderen | Sectie 3.7 toegevoegd: 12 user flows met stappen, varianten, prioritering en edge cases. Gebruikerstabel (1.3) uitgebreid met Applicatiebeheerder en YIM Beheerder. Twee nieuwe vragen toegevoegd aan H6 (pas/credentials flow en ter-plekke-registratie met accreditatie). |

---

## Inhoudsopgave

1. [Doelstellingen en achtergrond (Epic)](#1-doelstellingen-en-achtergrond-epic)
2. [As-Is situatie](#2-as-is-situatie)
3. [To-Be situatie](#3-to-be-situatie)
4. [DevOps backlog, Features & User Stories] (#4-devops-backlog--features--user-stories)
5. [UX Debt, Verbeterpunten overige schermen] (#5-ux-debt--verbeterpunten-overige-schermen)
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
- De receptie-workflow optimaliseren voor dagelijks gebruik op desktop *(en tablet, zie open vragen)*.

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
| 9 | **Geen parkeerstatus in de lijst.** Parkeerbehoefte en reserveringsstatus zijn niet zichtbaar in het overzicht, terwijl dit operationeel relevant is voor de receptie. |
| 10 | **Geen preset-filters.** Er zijn geen vooraf ingestelde filtersnelkoppelingen (bijv. 'Nu binnen', 'No-shows', 'E-learning niet behaald'), waardoor filteren meerdere handelingen vereist. |

#### Overige schermen: UX debt (buiten scope, zie hoofdstuk 5)

| # | Pijnpunt |
|---|---|
| 6 | **Registratiewizard is complex.** De meerstaps-opzet met substappen in een zijbalk is niet intuïtief als gebruiker op locatie (ad hoc) één of meerdere personen moet invoeren. |
| 7 | **Autorisaties als eerste stap.** Het selecteren van locatie(s) in deze stap is minder goed zichtbaar dan op andere plekken in YIM. Ook ziet het veld er iets anders uit (niet consistent). Daarnaast is het selecteren van datum en tijd gefragmenteerd. Invoeren hiervan is niet intuïtief |
| 8 | **Bulk-registratie is omslachtig.** Het is wel mogelijk om bezoekers te uploaden via XLSX en meerdere bezoekers aan te melden, maar dit is niet snel en gemakkelijk. Via de registratieflow kun je meerdere bezoekers invoeren, maar dit worden een groot aantal velden (onoverzichtelijk) |
| 9 | **Parkeerplaatsselectie is verborgen** in de bezoekersgegevens en niet prominent genoeg in de flow. |

---

## 3. To-Be situatie

### 3.1 Visie op de redesign

De herontworpen module 'Verwachte Personen' transformeert de centrale bezoekerspagina van een statisch tabeloverzicht naar een **uniform, schaalbaar en gebruiksvriendelijk operationeel receptiedashboard**. De pagina wordt de primaire werkplek voor receptiemedewerkers en beveiliging: één overzicht voor alle verwachte personen, bezoekers én contractors, met directe toegang tot alle relevante acties, compliance-informatie en parkeerstatus.

De scope van deze epic omvat het **'Verwachte Personen' scherm** als primaire focus, aangevuld met gerichte aanpassingen aan het bezoekersdossier (bezoekstatus en -historie) en het home-scherm (dagwidget). Bredere verbeterpunten voor de registratiewizard en het dossier worden apart bijgehouden als UX debt (hoofdstuk 5).

---

### 3.2 Centrale pagina — 'Verwachte Personen'

#### Lijstweergave

De herontworpen centrale pagina toont één tabel met alle verwachte personen: zowel bezoekers als contractors. Als een tenant geen bezoekers of contractor types heeft geconfigureerd, worden de betreffende kolommen en filters niet getoond.

De tabel bevat de volgende kolommen:

| Kolom | Toelichting |
|---|---|
| Type persoon | Bezoeker / Contractor |
| Contractor type | Configurabel per tenant |
| Naam | Volledige naam van de verwachte persoon |
| Bedrijf / Werkgever | |
| Bezoekreden / Referentie | |
| Locatie | |
| VIP | Ja / Nee |
| Contactpersoon | Met directe bel-, e-mail- en berichtactie |
| Verwachte aankomsttijd | |
| Status | Verwacht / Aangekomen / Vertrokken / No-show / Geannuleerd |
| Dossier compleet | Ja / Nee, met tooltip bij ontbrekende onderdelen |
| E-learning | Niet vereist / Vereist – Behaald / Vereist – Niet behaald |
| Parkeren | Benodigd (Ja/Nee), Gereserveerd (Ja/Nee), Plek/Code indien bekend |
| Passtatus | Geen / Gekoppeld / Geprint |

#### Acties per persoon

- **Aanmelden (check-in)**: status wordt Aangekomen + timestamp
- **Afmelden (check-out)**: status wordt Vertrokken + timestamp
- **Markeer No-show**
- **Annuleren**: met optionele reden
- **Contactpersoon informeren**: via bellen, e-mail of bericht
- **Open dossier**: bekijken afhankelijk van rechten
- **Pas koppelen, ontkoppelen en printen**

#### Bulkacties

- Meerdere personen tegelijk aanmelden (check-in) of als no-show markeren
- Meerdere passen tegelijk koppelen en/of printen

#### Filters & segmentatie

- Datum range en locatie
- Type persoon (Bezoeker / Contractor) en contractor type (multi-select)
- Status (Verwacht / Aangekomen / Vertrokken / No-show / Geannuleerd)
- Dossierstatus (Compleet / Niet compleet)
- E-learningstatus (Niet vereist / Vereist, Behaald / Vereist, Niet behaald)
- Passtatus (Geen / Gekoppeld / Geprint)
- Parkeerstatus (Benodigd / Gereserveerd)
- Contactpersoon en Bedrijf / Werkgever
- Vrij zoeken op naam, bedrijf, referentie, telefoonnummer
- VIP-status: Ja of Nee

#### Quick filter presets

Vooraf ingestelde filtersnelkoppelingen voor de meest voorkomende gebruikssituaties:

- Status filters: Verwacht vandaa, Nu binnen (Aanwezig), Nog niet binnen (Afwezig), No-shows, Geannuleerd
- Persoonstype: Contractors vandaag, Bezoekers vandaag
- Parkeer nodig, niet gereserveerd
- E-learning vereist, niet behaald
- Dossier niet compleet

#### Overige kenmerken

- **Dagweergave als standaard**: het scherm opent op 'vandaag'; navigatie naar andere dagen en weekoverzicht.
- **VIP-markering prominent**: VIP-bezoekers zijn visueel gemarkeerd in de rij. *(zie ook open vragen)*
- **Toegang tot registratieflow**: nieuw bezoek of contractor registreren is direct mogelijk vanuit de centrale pagina.

---

### 3.3 Bezoekersdossier

In de to-be situatie toont het bezoekersdossier dezelfde bezoeksgegevens als het 'Verwachte Personen' scherm, zodat een gebruiker registraties van een specifieke persoon volledig kan onderzoeken vanuit één plek. Concreet:

- De actuele bezoekstatus (verwacht, aanwezig, vertrokken, no-show) is direct zichtbaar in de dossierheader.
- Toekomstige verwachte bezoeken zijn inzichtelijk binnen het dossier.
- Historische bezoeken zijn inclusief check-in, check-out en no-show tijdstippen raadpleegbaar.

---

### 3.4 Home-scherm

Het home-scherm krijgt een 'Vandaag verwacht'-widget die een actueel beeld geeft van de bezoekersstroom van die dag. De widget toont het aantal verwachte bezoekers met een statussamenvatting en een directe link naar het 'Verwachte Personen' scherm. Als alternatief worden de eerste vijf verwachte bezoekers van die dag direct in de widget getoond.

---

### 3.5 Scope MVP vs. Nice-to-have

#### MVP / Must-have

- Herontwerp centrale pagina 'Verwachte Personen' met dagweergave
- Ondersteuning voor bezoekers én contractors (incl. configureerbare contractor types per tenant)
- Volledige kolomset per brief: type persoon, naam, bedrijf, bezoekreden, locatie, contactpersoon, verwachte aankomsttijd, status, dossiervolledigheid, e-learningstatus, parkeerstatus, passtatus
- Real-time statuskolom (Verwacht / Aangekomen / Vertrokken / No-show / Geannuleerd)
- Eénklik check-in en check-out vanuit de lijst
- No-show en annulering (met optionele reden) registreren vanuit de lijst
- Pas koppelen, ontkoppelen en printen vanuit de lijst
- Compliance-kolommen: dossiervolledigheid (met tooltip) en e-learningstatus
- Parkeerstatus als kolom in de lijst (benodigd, gereserveerd, plek/code)
- Prominente VIP-markering *(afhankelijk van bevestiging epic — zie open vragen)*
- Vrij zoeken en uitgebreide filters (status, type, dossierstatus, e-learning, passtatus, parkeren, contactpersoon, bedrijf)
- Quick filter presets (Verwacht vandaag, Nu binnen, No-shows, Contractors vandaag, etc.)
- Navigatie naar andere dagen en weekoverzicht
- Contactpersoon informeren via bellen, e-mail en bericht vanuit de lijst
- Bulk check-in en bulk no-show voor meerdere personen tegelijk
- Bulk passen koppelen en/of printen
- E-mailnotificatie naar contactpersoon bij check-in (opt-in per registratie)
- E-mailnotificatie / uitnodiging naar bezoeker bij registratie (optioneel)
- Integratie met toegangscontrolesysteem voor automatische statusupdate *(aanname — zie open vragen)*
- Bulk-registratie van groepen (verbetering op bestaande XLSX-upload)
- Statistieken en rapportage bezoekersstromen
- Bezoekersdossier toont actuele status, toekomstige en historische bezoeken
- 'Vandaag verwacht'-widget op het home-scherm

#### Nice-to-have

- SMS- of Teams-notificaties voor contactpersonen (naast e-mail)
- Terugkerende bezoeker-template (snelregistratie)
- Mobiel-geoptimaliseerde receptieweergave *(afhankelijk van tablet-vraagstuk, zie open vragen)*
- Parkeerplaatsbeheer met kaartweergave

---

### 3.6 Registratieproces: UX debt (out of scope MVP)

Het bestaande registratieproces valt buiten de MVP-scope van deze epic vanwege de omvang van de businesslogica in de wizard en het risico op scope creep. Verbeterpunten zijn opgenomen in hoofdstuk 5 (UX Debt). Quick wins die weinig risico meebrengen kunnen wel als onderdeel van deze epic worden meegenomen.

---

### 3.7 User Flows

---

#### Flow 1: Dagelijks overzicht bekijken (primair)

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Start van dienst of continu gedurende de dag
**Doel:** Snel inzicht krijgen in wie er vandaag verwacht wordt

**Stappen**

1. Gebruiker opent YIM en logt in.
2. Gebruiker opent "Verwachte Personen" scherm.
3. Systeem toont standaard de weergave op "Vandaag".
4. Gebruiker scant de lijst op naam, bedrijf, verwachte aankomsttijden, status en persoonstype.
5. Gebruiker past optioneel filters toe op locatie, type, bedrijf, contactpersoon of tijdsvenster.
6. Gebruiker kan specifieke personen zoeken op verschillende zoektermen.
7. Gebruiker voert een compliance-check uit door accreditaties, e-learning en andere vereisten direct in te zien.
8. Gebruiker bekijkt indien nodig het dossier van een specifieke persoon.
9. Gebruiker neemt indien nodig contact op met de contactpersoon of de persoon zelf.

**Verwachte UI-elementen**

Toolbar:

- Vaste acties: Nieuwe registratie (bezoeker of contractor) via dropdownmenu: Nieuwe bezoeker registreren / Nieuwe contractor registreren / Bezoeker(s) uploaden / Contractor(s) uploaden; Instellingen (kolominstellingen).
- Bulkacties: Check in, Check out, No-show, Annuleren, Pas koppelen, Pas printen.

Tab-navigatie: Alle / Bezoekers / Contractors (gelijk aan persoonstype).

Filters (presets):

- Datumfilter: Vandaag, morgen, hele week, dagselector, vrije datum range.
- Status: Verwacht, No-shows, Geannuleerd, Check in, Check out, Aanwezig, Afwezig.
- Persoonstype: Bezoekers, Contractors; Contractor type (multi-select, configurabel per tenant).
- VIP: Ja / Nee.
- Parkeren: Nodig, wel of niet gereserveerd.
- E-learning: Wel of niet behaald.
- Dossier: Compleet / Niet compleet.

Tabelkolommen: Naam persoon, Type persoon, Contractor type, Telefoonnummer, Verwachte aankomsttijd, Bedrijf / Werkgever, Status, Dossier compleet (met tooltip), E-learningstatus, Parkeerstatus, Passtatus, Bezoeklocatie(s), Contactpersoon (met bel/e-mail/bericht actie), Bezoekreden / Referentie.

Rij-acties per persoon: Check in, Check out, No-show, Annuleren, Pas koppelen / ontkoppelen / printen, Contactpersoon informeren, Open dossier.

---

#### Flow 2: Bezoeker/Contractor inchecken

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Persoon arriveert bij receptie
**Doel:** Persoon snel en correct inchecken

**Stappen**

1. Persoon meldt zich bij receptie.
2. Receptionist zoekt persoon op (naam, contactpersoon of bedrijf).
3. Systeem toont match(es).
4. Receptionist selecteert de juiste persoon.
5. Systeem toont persoonsgegevens, contactpersoon, compliance status en eventuele notities.
6. Receptionist controleert ID (indien vereist) en compliance documenten (contractors).
7. Receptionist klikt "Inchecken".
8. Systeem registreert aankomsttijd, print/activeert badge (optioneel) en notificeert contactpersoon.
9. Receptionist overhandigt badge en geeft instructies.
10. Bij problemen: contactpersoon informeren.

**Varianten**

- Snelle check-in: pre-geregistreerd, alles compliant → 1-klik check-in.
- Compliance issue: documenten niet in orde → blokkade of escalatie.
- Walk-in: niet verwacht → doorverwijzen naar "Nieuwe bezoeker" flow.

---

#### Flow 3: Nieuwe verwachte persoon aanmaken

**Gebruiker:** Contactpersoon / Receptionist
**Trigger:** Bezoek of contractor-bezoek moet worden gepland
**Doel:** Persoon correct registreren in het systeem

**Stappen**

1. Gebruiker klikt "Nieuwe registratie".
2. Systeem vraagt type: Bezoeker (eenmalig/terugkerend) of Contractor (type selecteren).
3. Gebruiker vult de registratie- en autorisatieflow in.
4. Gebruiker bevestigt aanmelding.
5. Systeem slaat registratie op, stuurt uitnodiging naar bezoeker/contractor en notificeert relevante partijen.

*Let op: Wat als er een accreditatie vereist is? Zie ook open vragen.*

**Varianten**

- Recurring visit: contractor met vaste dagen of periode.
- Groepsregistratie: meerdere personen tegelijk aanmelden.
- Kopieer vorige: bekende persoon opnieuw uitnodigen.

---

#### Flow 4: Bezoeker/Contractor uitchecken

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Persoon verlaat het pand
**Doel:** Bezoek correct afsluiten

**Stappen**

1. Persoon meldt zich af (of vergeet dit).
2. Receptionist zoekt persoon op in "aanwezig".
3. Receptionist klikt "Uitchecken".
4. Systeem registreert vertrektijd, deactiveert badge en wijzigt status naar "Vertrokken".
5. Indien persoon zelf uitcheckt: inleveren van de badge.

**Varianten**

- Zelf-uitcheck: via kiosk of app.
- Automatisch: na X uur zonder activiteit.
- Badge inleveren: fysieke badge retour.

---

#### Flow 5: Compliance controleren (contractors)

**Gebruiker:** Receptionist / Beveiliger / Facility Manager
**Trigger:** Contractor arriveert of compliance verloopt binnenkort
**Doel:** Zorgen dat contractor voldoet aan alle eisen

**Stappen**

1. Systeem markeert contractor met compliance-waarschuwing.
2. Gebruiker ziet de waarschuwing zowel in de lijst als in het profiel.
3. Gebruiker controleert via dossier: e-learning, accreditatie, geaccrediteerde toegangen en fysiek ID.
4. Bij problemen: contractor weigeren, escaleren naar facility manager, of tijdelijke uitzondering aanvragen.
5. Bij akkoord: procederen met check-in.

---

#### Flow 6: Zoeken en filteren

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Specifieke persoon vinden of overzicht verkleinen
**Doel:** Snel de juiste informatie vinden

**Stappen**

1. Gebruiker klikt op de zoekfunctie.
2. Gebruiker voert zoekterm in (naam, bedrijf, contactpersoon of badge-nummer).
3. Systeem toont resultaten instant (as-you-type).
4. Gebruiker verfijnt met filters op datumbereik, status, type of locatie.
5. Gebruiker selecteert het gewenste resultaat.

---

#### Flow 7: Afspraak wijzigen of annuleren

**Gebruiker:** Contactpersoon / Receptionist
**Trigger:** Planningswijziging
**Doel:** Bestaande afspraak aanpassen

**Stappen**

1. Gebruiker zoekt de bestaande afspraak op.
2. Gebruiker opent de detail-view.
3. Gebruiker kiest actie: Wijzigen (datum/tijd/locatie/contactpersoon) of Annuleren.
4. Systeem vraagt bevestiging.
5. Systeem verwerkt wijziging, notificeert bezoeker/contractor en contactpersoon, en werkt de status bij.

---

#### Flow 8: Notificaties en alerts afhandelen

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Systeem genereert alert
**Doel:** Reageren op urgente situaties

**Stappen**

1. Systeem toont notificatie of verstuurt een e-mail: persoon te laat (no-show warning), compliance issue, VIP aankomst of capaciteitswaarschuwing.
2. Gebruiker bekijkt notificatie.
3. Gebruiker neemt actie: contacteer contactpersoon, escaleer naar security of markeer als afgehandeld.
4. Systeem logt de afhandeling.

---

#### Flow 9: Rapportage bekijken

**Gebruiker:** Facility Manager / Security Manager
**Trigger:** Periodieke rapportage of incident-onderzoek
**Doel:** Inzicht in bezoekersstromen en compliance

**Stappen**

1. Gebruiker navigeert naar de rapportage-sectie.
2. Gebruiker selecteert rapport type: bezoekersaantallen per periode, compliance overzicht contractors, no-show statistieken of piekurenanalyse.
3. Gebruiker past datumbereik en filters toe.
4. Systeem genereert rapport.
5. Gebruiker exporteert indien gewenst (PDF/Excel).

---

#### Flow 10: Pas beheren

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Pas moet gekoppeld, ontkoppeld of (her)geprint worden
**Doel:** Correcte pas-administratie en fysieke toegangscontrole

**Pas koppelen**

1. Gebruiker zoekt persoon op en opent het rij-actiemenu.
2. Gebruiker kiest "Pas koppelen".
3. Systeem toont het credential-scherm.
4. Gebruiker scant pas of voert pasnummer handmatig in.
5. Systeem valideert (pas niet in gebruik, pas geldig) en koppelt.
6. Passtatus wijzigt naar "Gekoppeld".

*Let op: Hoe werkt dit als er meer dan één credential-variant beschikbaar is? Zie ook open vragen.*

**Pas ontkoppelen**

1. Gebruiker zoekt persoon op met gekoppelde pas.
2. Gebruiker kiest "Pas ontkoppelen" en bevestigt.
3. Systeem ontkoppelt pas; passtatus wijzigt naar "Geen".
4. Pas is weer beschikbaar voor hergebruik.

**Pas printen**

1. Gebruiker kiest "Pas printen".
2. Systeem controleert printerconfiguratie en aanwezigheid van vereiste gegevens.
3. Systeem stuurt printopdracht naar badge-printer.
4. Passtatus wijzigt naar "Geprint".

**Varianten**

- Herprinten: pas beschadigd of verloren → nieuwe pas printen, oude deactiveren.
- Tijdelijke pas: standaard pas niet beschikbaar → tijdelijke vervanger met beperkte geldigheid.
- Pas blokkeren: bij verlies of diefstal → pas direct ongeldig maken.

---

#### Flow 11: Bulk pas koppelen/printen

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Meerdere personen tegelijk moeten een pas krijgen
**Doel:** Efficiënt meerdere passen koppelen en/of printen

**Bulk pas koppelen**

1. Gebruiker selecteert meerdere personen via checkboxes.
2. Gebruiker kiest bulkactie "Pas koppelen".
3. Systeem toont credential-scherm met geselecteerde personen.
4. Voor elke persoon: gebruiker scant pas of voert pasnummer in, kiest distributie-methode (digitaal via mail of printen); systeem valideert en koppelt.
5. Systeem toont samenvatting: geslaagd / mislukt per persoon.

**Bulk pas printen**

1. Gebruiker selecteert meerdere personen en kiest "Pas printen".
2. Systeem controleert per persoon of vereiste gegevens aanwezig zijn.
3. Systeem toont preview en stuurt na bevestiging alle opdrachten naar de badge-printer.

**Varianten**

- Gedeeltelijk succes: duidelijke foutmelding per persoon.
- Wachtrij: bij grote aantallen → printopdrachten in wachtrij met voortgangsindicator.

---

#### Flow 12: Contactpersoon informeren

**Gebruiker:** Receptionist / Beveiliger
**Trigger:** Bezoeker/contractor is gearriveerd, of er is een issue
**Doel:** Contactpersoon snel en via het juiste kanaal op de hoogte brengen

**Stappen**

1. Gebruiker klikt op de contactpersoon-kolom of opent het rij-actiemenu.
2. Systeem toont contactopties: Bellen (klikbare telefoonlink), E-mail (sjabloon met vooringevulde gegevens) of Bericht (in-app notificatie).
3. Gebruiker selecteert gewenste methode; bij e-mail/bericht kan tekst worden aangepast voor verzending.
4. Systeem logt het contactmoment bij de bezoeker/contractor.

| Scenario | Actie | Voorgestelde tekst |
|---|---|---|
| Aankomst melden | Bericht / E-mail | "[Naam] van [Bedrijf] is gearriveerd en wacht bij de receptie." |
| Vertraging | Bericht / E-mail | "[Naam] van [Bedrijf] is nog niet gearriveerd. Verwachte tijd was [tijd]." |
| Compliance issue | Bericht / E-mail | "[Naam] van [Bedrijf] kan niet worden ingecheckt vanwege [reden]. Neem contact op met receptie." |
| No-show | Bericht / E-mail | "[Naam] van [Bedrijf] is niet komen opdagen voor de afspraak van [datum/tijd]." |
| Algemeen | Bellen | N.v.t., direct telefonisch contact. |

**Varianten**

- Automatische notificatie: systeem stuurt automatisch bericht bij check-in (configureerbaar).
- Alternatieve contactpersoon: primaire niet bereikbaar → secundaire selecteren.
- Groepsmelding: meerdere personen van dezelfde contactpersoon → één gebundeld bericht.

---

#### Prioritering user flows

| # | Flow | Frequentie | Business Impact | Complexiteit | Prioriteit |
|---|---|---|---|---|---|
| 1 | Dagelijks overzicht bekijken | Continu | Hoog | Laag | MVP / Core |
| 2 | Inchecken | Zeer hoog | Kritiek | Medium | MVP / Core |
| 3 | Nieuwe verwachte persoon aanmaken | Hoog | Hoog | Medium | MVP / Core |
| 4 | Uitchecken | Hoog | Medium | Laag | Must have |
| 5 | Compliance controleren | Medium | Hoog | Medium | Must have |
| 6 | Zoeken en filteren | Continu | Medium | Laag | Must have |
| 10 | Pas beheren | Hoog | Hoog | Medium | Must have |
| 12 | Contactpersoon informeren | Hoog | Medium | Laag | Must have |
| 7 | Afspraak wijzigen / annuleren | Medium | Medium | Laag | Nice to have |
| 8 | Notificaties afhandelen | Variabel | Medium | Medium | Nice to have |
| 9 | Rapportage bekijken | Laag | Medium | Medium | Nice to have |
| 11 | Bulk pas koppelen/printen | Laag | Medium | Medium | Nice to have |

---

#### Edge cases & uitzonderingen

**Identiteit & Matching**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| Dubbele namen | Twee personen met dezelfde naam verwacht | Toon extra identifiers (bedrijf, contactpersoon, tijd) |
| Spelfouten in naam | Bezoeker zegt "Jansen", staat als "Janssen" | Fuzzy search, fonetische matching |
| Onbekende bezoeker | Persoon niet in systeem | Snelle walk-in registratie flow |
| Verkeerde dag | Persoon komt dag te vroeg/laat | Optie om afspraak on-the-fly aan te passen |
| Vervanging | Andere persoon komt namens verwachte | Optie om persoon te wisselen met audit trail |

**Check-in problemen**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| Geen ID | Bezoeker is ID vergeten | Contactpersoon laten bevestigen, risico-notitie |
| Verlopen compliance | Certificaat net verlopen | Override met goedkeuring + harde deadline voor vernieuwing |
| Badge printer offline | Technisch probleem | Handgeschreven badge, notificatie naar IT |
| Systeem offline | Geen netwerk | Offline modus met sync later |
| Groepsaankomst | 10+ personen tegelijk | Bulk check-in optie |

**Contractor specifiek**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| Subcontractor | Contractor neemt eigen mensen mee | Aparte registratie flow voor subcontractors |
| Wisselende mensen | Bedrijf stuurt steeds andere persoon | Bedrijfsregistratie vs. persoonsregistratie |
| Acute klus | Contractor moet nu beginnen, compliance niet compleet | Nood-procedure met tijdslimiet en verplichte follow-up |
| Langdurig verblijf | Contractor werkt 6 maanden op locatie | Omzetten naar semi-permanent profiel |
| Meerdere locaties | Contractor moet naar meerdere gebouwen | Multi-locatie badge/registratie |

**Pas beheer specifiek**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| Pas al in gebruik | Pasnummer gekoppeld aan andere persoon | Foutmelding; optie om andere pas te gebruiken of bestaande koppeling te bekijken |
| Ongeldige pas | Pas is geblokkeerd of verlopen | Foutmelding met reden; doorverwijzen naar pasbeheer |
| Printer storing | Badge-printer geeft foutmelding | Foutmelding tonen; alternatieve printer of handmatige pas als fallback |
| Pas verloren | Persoon meldt pas kwijt | Oude pas blokkeren, nieuwe pas koppelen/printen |
| Geen foto beschikbaar | Foto vereist voor print maar ontbreekt | Waarschuwing; optie om foto toe te voegen of print zonder foto |

**Tijdgerelateerd**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| No-show | Persoon komt niet opdagen | Automatische status na X uur, notificatie naar host |
| Veel te vroeg | Persoon komt 3 uur te vroeg | Tonen in "vroege aankomsten", waarschuwing |
| Nachtelijke shift | Bezoek over middernacht heen | Correcte dag-toewijzing in interface |
| Open tijdslot | "Komt ergens deze week" | Aparte weergave voor open verwachtingen |
| Terugkerend patroon | Elke dinsdag en donderdag | Recurring registratie zonder elke keer opnieuw invoeren |

**Autorisatie & escalatie**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| VIP behandeling | CEO van belangrijke klant | Visuele markering, pre-notificatie host |
| Geweigerde toegang | Persoon staat op blocklist | Duidelijke blokkade, escalatie naar security |
| Conflicterende info | Contactpersoon zegt X, systeem zegt Y | Escalatie-flow naar facility manager |
| Verlopen autorisatie host | Contactpersoon niet meer in dienst | Automatische detectie, alternatieve host toewijzen |

**Technisch & Data**

| Edge Case | Beschrijving | Voorgestelde handling |
|---|---|---|
| Dubbele registratie | Zelfde persoon 2x aangemeld | Merge-suggestie, duplicate detection |
| Import fouten | Bulk upload met fouten | Validatie preview, fout-rapportage |
| Privacy verwijdering | AVG-verzoek | Compliant verwijderen met audit trail |
| Historische data | Zoeken in afgelopen bezoekers | Apart archief met beperkte toegang |

---

## 4. DevOps backlog: Features & User Stories

---

### Feature 1:Centrale pagina: dagweergave & lijstweergave

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F1.1 | Toon alle voor vandaag verwachte **bezoekers** als standaardweergave bij het openen van de pagina, gesorteerd op verwachte aankomsttijd. | M | Brief · Screenshots |
| F1.2 | Toon alle voor vandaag verwachte **contractors** in hetzelfde overzicht als bezoekers, met een kolom 'Type persoon' en 'Contractor type'. | M | Brief |
| F1.3 | Verberg de kolommen 'Type persoon' en 'Contractor type' automatisch als een tenant geen bezoekers resp. contractor types heeft geconfigureerd. | S | Brief |
| F1.4 | Toon een statuskolom met real-time kleurcodering: Verwacht / Aangekomen / Vertrokken / No-show / Geannuleerd. | M | Brief · Screenshots |
| F1.5 | Toon de kolom 'Dossiervolledigheid' (Ja / Nee) met een tooltip die aangeeft welke onderdelen ontbreken. | M | Brief |
| F1.6 | Toon de kolom 'E-learningstatus' per persoon: Niet vereist / Vereist, Behaald / Vereist, Niet behaald. | M | Brief |
| F1.7 | Toon de kolom 'Parkeerstatus': Benodigd (Ja/Nee), Gereserveerd (Ja/Nee), Plek/Code indien beschikbaar. | M | Brief |
| F1.8 | Toon de kolom 'Passtatus' per persoon: Geen / Gekoppeld / Geprint. | M | Brief |
| F1.9 | Stel de standaarddatumfilter in op 'vandaag' en toon deze prominent bovenaan de pagina (niet verborgen in een kolom). | M | Screenshots · PRD |
| F1.10 | Voeg navigatieknoppen toe om te bladeren naar morgen, overmorgen en het weekoverzicht; terugkijken op gisteren. | M | PRD |
| F1.11 | Toon VIP-bezoekers visueel gemarkeerd in de rij (badge of kleuraccent). | ? | Epic ? |
| F1.12 | Voeg een vrij zoekveld toe waarmee gezocht kan worden op naam, bedrijf, referentie en telefoonnummer. | M | Brief |
| F1.13 | Implementeer filters op: datum range, locatie, type persoon en contractor type (multi-select). | M | Brief |
| F1.14 | Implementeer filters op: status, dossierstatus, e-learningstatus, passtatus en parkeerstatus. | M | Brief |
| F1.15 | Implementeer filters op: contactpersoon en bedrijf/werkgever. | M | Brief · Screenshots |
| F1.16 | Implementeer de quick filter presets: Verwacht vandaag, Nu binnen, Nog niet binnen, No-shows, Geannuleerd. | M | Brief |
| F1.17 | Implementeer de quick filter presets: Contractors vandaag, Bezoekers vandaag. | M | Brief |
| F1.18 | Implementeer de quick filter presets: Parkeer nodig (niet gereserveerd), E-learning vereist(niet behaald), Dossier niet compleet. | M | Brief |
| F1.19 | Stel de standaardsortering in op verwachte aankomsttijd (oplopend); maak kolommen klikbaar voor sortering. | S | PRD |
| F1.20 | Maak het mogelijk om een nieuwe bezoeker of contractor te registreren direct vanuit de centrale pagina (zonder navigatie naar een ander scherm). | M | Kim |

---

### Feature 2: Acties & statusbeheer

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F2.1 | Voeg een 'Aanmelden'-actie toe per rij; de status wordt Aangekomen met een timestamp. | M | Brief |
| F2.2 | Voeg een 'Afmelden'-actie toe per rij; de actie is alleen beschikbaar als de persoon de status Aangekomen heeft. Status wordt Vertrokken met een timestamp. | M | Brief |
| F2.3 | Voeg een 'No-show'-actie toe per rij voor personen die niet zijn verschenen. | M | Brief |
| F2.4 | Voeg een 'Annuleren'-actie toe per rij met een optioneel invoerveld voor een reden. | M | Brief |
| F2.5 | Voeg een 'Koppel pas'-actie toe per rij waarmee een toegangspas aan een persoon kan worden gekoppeld. | M | Brief |
| F2.6 | Voeg een 'Ontkoppel pas'-actie toe per rij; beschikbaar als een pas is gekoppeld. | M | Brief |
| F2.7 | Voeg een 'Print pas'-actie toe per rij; beschikbaar als een pas is gekoppeld. | M | Brief |
| F2.8 | Toon een bevestigingsmelding (toast of modal) bij elke statuswijziging of pas-actie. | S | PRD |
| F2.9 | Sla alle statuswijzigingen op in de aanmeldingsgeschiedenis van het dossier, inclusief gebruiker en tijdstip. | M | PRD |
| F2.10 | Zorg dat statuswijzigingen binnen 2 seconden zichtbaar zijn voor alle ingelogde gebruikers op dezelfde pagina (real-time of polling). | M | PRD |
| F2.11 | Voeg een handmatige statusoverschrijving toe voor beheerders om een onjuiste status te corrigeren. | S | PRD |
| F2.12 | Implementeer een bulkactie waarmee meerdere geselecteerde personen tegelijk kunnen worden aangemeld (check-in) of als no-show gemarkeerd. | S | Brief |
| F2.13 | Implementeer een bulkactie waarmee meerdere geselecteerde passen tegelijk kunnen worden gekoppeld en/of geprint. | S | Brief |

---

### Feature 3: Notificaties & Communicatie

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F3.1 | Maak het mogelijk om vanuit de lijst de contactpersoon te bellen via een klikbare telefoonlink. | M | Brief |
| F3.2 | Maak het mogelijk om vanuit de lijst een e-mail te sturen naar de contactpersoon via een klikbare e-maillink. | M | Brief |
| F3.3 | Maak het mogelijk om vanuit de lijst een bericht te sturen naar de contactpersoon. | ? | Brief |
| F3.4 | Stuur automatisch een e-mailnotificatie naar de contactpersoon op het moment dat een bezoeker of contractor wordt ingecheckt. | M | PRD |
| F3.5 | Geef de registrerende gebruiker de mogelijkheid om per registratie in te stellen of de contactpersoon een notificatie ontvangt (opt-in). | M | PRD |
| F3.6 | Stuur optioneel een bevestigings- of uitnodigingsmail naar de bezoeker of contractor bij het aanmaken van een registratie. | S | PRD |
| F3.7 | Stel e-mailsjablonen in voor notificaties, configureerbaar per locatie of bezoekreden. | S | PRD |
| F3.8 | Voeg een notificatielogboek toe aan het dossier dat toont wanneer welke notificatie is verstuurd en aan wie. | S | PRD |
| F3.9 | Stuur automatisch een herinneringsmail aan de verwachte persoon een configureerbaar aantal uur voor het geplande bezoek. | C | PRD |
| F3.10 | Stuur notificaties via SMS of Teams als aanvullend kanaal naast e-mail (nice-to-have). | C | PRD |

---

### Feature 4: Niet-functionele vereisten

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F4.1 | De centrale pagina laadt binnen 2 seconden voor overzichten van maximaal 500 verwachte personen per dag. | M | PRD |
| F4.2 | Alle statuswijzigingen (check-in, check-out, no-show, annulering) worden gelogd in de audittrail van het dossier met gebruiker, actie en tijdstip. | M | PRD |
| F4.3 | De herontworpen pagina voldoet aan WCAG 2.1 AA-toegankelijkheidsnormen (contrast, toetsenbordnavigatie, schermlezer). | S | PRD |
| F4.4 | De pagina is volledig bruikbaar op desktop (minimaal 1280px). | M | PRD |
| F4.5 | De pagina is bruikbaar op tablet (minimaal 768px breedte). | ? | PRD |
| F4.6 | Notificaties worden asynchroon verstuurd en blokkeren de UI-interactie niet. | M | PRD |
| F4.7 | Elke must-have user story heeft minimaal één positief en één negatief acceptatiescenario gedocumenteerd vóór ontwikkelstart. | M | PRD |

---

### Feature 5: Bezoekersdossier: bezoekstatus & -historie

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F5.1 | Toon de actuele bezoekstatus van de persoon (verwacht, aanwezig, vertrokken, no-show) prominent in de dossierheader. | M | Kim |
| F5.2 | Toon toekomstige verwachte bezoeken in het dossier, inclusief locatie, contactpersoon en verwachte aankomsttijd. | M | Kim |
| F5.3 | Toon historische bezoeken in het dossier inclusief check-in tijdstip, check-out tijdstip en eventuele no-show markering. | M | Kim |
| F5.4 | Zorg dat de bezoekstatus in het dossier real-time wordt bijgewerkt wanneer een actie wordt uitgevoerd vanuit de centrale pagina. | M | PRD |

---

### Feature 6: Home-scherm: 'Vandaag verwacht'-widget

| ID | User Story | Prioriteit | Bron |
|---|---|---|---|
| F6.1 | Voeg een 'Vandaag verwacht'-widget toe aan het home-scherm met het totaal aantal verwachte personen en een statussamenvatting (verwacht / aangekomen / vertrokken / no-show). | M | Kim |
| F6.2 | Toon de eerste vijf verwachte personen van die dag direct in de widget met naam, type en verwachte aankomsttijd. | S | Kim |
| F6.3 | Voeg een klikbare link toe in de widget die de centrale pagina opent, gefilterd op vandaag. | M | Kim |
| F6.4 | Toon VIP-bezoekers apart gemarkeerd in de widget. | ? | PRD |

---

## 5. UX Debt: Verbeterpunten overige schermen

Dit hoofdstuk registreert de UX debt voor schermen die buiten de primaire scope van de 'Verwachte Personen' epic vallen: de registratiewizard, het bezoekersdossier en het home-scherm. Verbeterpunten zijn ingedeeld in **quick wins** (lage impact op businesslogica, snel uitvoerbaar) en **grote aanpassingen** (raken aan bestaande logica of vereisen een aparte epic).

---

### 5.1 Registratiewizard

#### Quick wins

- Verplaats 'Autorisaties selecteren' van de eerste naar een conditionele/latere stap, persoonsgegevens zijn een logischer startpunt.
- Vervang de zijbalksub-navigatie door een lineaire stepperbalk bovenaan de wizard.
- Voeg het verwachte aankomsttijdstip toe als optioneel veld in de bezoekdetailsstap.
- Maak parkeerplaatsselectie zichtbaarder als apart optioneel blok (nu verborgen in persoonsgegevens).
- Toon bij de zoekstap de datum van het laatste bezoek bij bestaande profielen voor snelle herkenning.

#### Grote aanpassingen

- Volledige herstructurering van de wizard naar maximaal 4 stappen: Persoon → Bezoekdetails → Contactpersoon → Overzicht & bevestiging.
- Autorisatieselectie als volledig conditionele stap op basis van locatie en bezoekreden.
- Uitnodigingsmail naar bezoeker als optie op de bevestigingspagina.
- Groepsregistratie verbeteren: van XLSX-upload naar een intuïtieve multi-bezoeker UI.
- Concept-status workflow verduidelijken voor eindgebruikers *(zie ook open vragen)*.

---

### 5.2 Bezoekersdossier

#### Quick wins

- Voeg tijdstip van check-in en check-out toe aan het tabblad Aanmeldingen.
- Sorteer het aanmeldingsoverzicht op datum (nieuwste eerst als standaard).
- Verberg tabbladen Credentials en Certificaten standaard voor bezoekers zonder actieve records.

#### Grote aanpassingen

- Verbeter het Geschiedenis-tabblad met een visuele diff-weergave van gewijzigde velden.
- Voeg een snelkoppeling toe naar de actieve of eerstvolgende registratie vanuit de dossierheader.

---

### 5.3 Home-scherm

#### Quick wins

- Toon in de widget 'Recente aanmeldingen' ook de check-in status per item.
- Voeg een snelkoppeling 'Bezoeker inchecken' toe aan de 'Mijn acties'-sectie.

#### Grote aanpassingen

- Voeg een 'Vandaag verwacht' widget toe met statussamenvatting, VIP-markering en directe link naar de centrale pagina *(nice-to-have, aparte epic of latere sprint)*.

---

## 6. Open vragen

> Doel: context ophalen voordat we gaan ontwerpen. Vragen tussen haakjes zijn PRD-aannames die vóór ontwikkelstart bevestigd moeten worden.

---

#### Gebruikers & Context

**Wie zijn de primaire gebruikers?**

- [ ] Receptie en beveiliging worden genoemd: zijn dit dezelfde mensen, of verschillende rollen met verschillende taken?
- [ ] Zijn er nog andere gebruikersgroepen? (facility managers, contactpersonen zelf, beheerders)
- [ ] Hoeveel gebruikers werken er typisch tegelijk in dit scherm?
- [ ] Kan er sprake zijn van verschillende functionaliteiten per gebruikersrol?

**Werkomgeving**

- [ ] Werken ze op desktop, tablet, of beide? Is tablet een harde requirement of een aanname? (Huidig PRD neemt tablet mee als nice-to-have.)
- [ ] Staat het scherm de hele dag open, of openen ze het ad-hoc?
- [ ] Hoeveel verwachte personen zien ze op een gemiddelde dag? En op piekmomenten?
- [ ] Hoeveel schermen hebben gebruikers tot hun beschikking? Hoe vaak komt het voor dat ze op twee schermen werken?

**Huidige pijnpunten**

- [ ] Wat gaat er nu concreet mis met de huidige pagina? Welke klachten horen jullie?
- [ ] Zijn er workarounds die gebruikers nu toepassen? (Excel-lijsten, post-its, eigen notities)
- [ ] Welke huidige behoeften hebben klanten aangekaart?
- [ ] Hebben jullie al direct met gebruikers gesproken over dit onderwerp?

---

#### Bezoekers vs. Contractors

- [ ] Wat is het wezenlijke verschil in hoe receptie omgaat met een bezoeker versus een contractor?
- [ ] Wat is het verschil in functionaliteit tussen bezoeker en contractor? Welke verschillende use cases moeten we rekening mee houden?
- [ ] Komen contractors vaker terug? Is er een "bekende contractor" flow?
- [ ] Hebben contractors een lopend contract/periode, of worden ze ook per dag verwacht?
- [ ] Hoe gaan we om met bulk-aanvragen, zoals het uploaden van bezoekers en contractors? Groeperen of behandelen als losse registraties?

---

#### Statussen & Flows

**Statusmodel**

- [ ] Hoe gaan we om met registraties in de status 'Concept'? Worden ze getoond in de centrale pagina of gefilterd? (Impact op weergavelogica en mogelijke verwarring bij receptie.)
- [ ] In hoeverre verschillen de statussen bij bezoekers en contractors?
- [ ] Is de statusflow lineair (Verwacht → Aangekomen → Vertrokken), of kan iemand heen-en-weer tussen statussen?
- [ ] Kan een "No-show" later alsnog inchecken? Wat gebeurt er dan met de status?
- [ ] Kan een geannuleerde afspraak worden hersteld?
- [ ] Wie mag statussen wijzigen: alleen receptie, of ook de contactpersoon?

**Tijdscomponent**

- [ ] Wat is "verwacht vandaag"? Alles met aankomsttijd vandaag, of ook mensen zonder specifieke tijd?
- [ ] Hoe gaan we om met "open" verwachtingen? (contractor die de hele week of maand mag komen)
- [ ] Wat is de flow als een persoon niet vooraf is geregistreerd en ter plekke op locatie wordt aangemeld? En wat als diezelfde persoon ook geaccrediteerd moet worden — kan dit direct in één handeling, of vereist accreditatie een apart (en tijdrovend) traject?

---

#### Compliance & Dossiers

**Dossier compleet**

- [ ] Welke condities maken een dossier 'niet compleet'? Welke e-learnings zijn vereist en wie configureert dit? (Nodig voor implementatie van de compliance-kolommen.)
- [ ] Wat moet receptie doen als een dossier niet compleet is? Mogen ze iemand dan niet toelaten?

**Handhaving**

- [ ] "Direct zichtbaar en handhaafbaar": wat betekent handhaven concreet? Blokkeren? Waarschuwen?
- [ ] Zijn er harde blokkers (mag absoluut niet inchecken) versus zachte waarschuwingen (mag wel, maar let op)?
- [ ] Wie beslist over uitzonderingen bij compliance-issues? Kan receptie dit zelf, of moet een manager of contactpersoon goedkeuren?

---

#### Parkeren

- [ ] Wat doet receptie als "benodigd = ja" maar "gereserveerd = nee"? Kunnen zij ter plekke reserveren?
- [ ] Wat betekent "Plek/Code indien bekend"? Is dit een kenteken, een vaknummer, een toegangscode?

---

#### Passen

- [ ] "Koppelen" versus "printen": is koppelen het toewijzen van een bestaande pas, en printen het maken van een nieuwe?
- [ ] Kan je zowel koppelen als printen tegelijk, of is het altijd een of/of situatie?
- [ ] Moet de pas fysiek bij de balie geprint worden, of kan dit vooraf/elders?
- [ ] Wat gebeurt er met de pas bij uitchecken? Inleveren, automatisch ontkoppeld?
- [ ] In de epic wordt gesproken over passen koppelen en ontkoppelen. Hoe verhoudt dit zich tot de huidige flow van credentials aanvragen? Kan je alleen koppelen als credentials al aangevraagd zijn? In hoeverre mag een printbare pas ook digitaal worden verstuurd, bijvoorbeeld als QR-code per e-mail?

---

#### Acties & Bulkacties

**Acties per persoon**

- [ ] Via welk platform wordt 'een bericht sturen' naar de contactpersoon afgehandeld? Teams, intern YIM-bericht, WhatsApp, of anders? (Bepalend voor de technische integratie en inschatting van F3.3.)
- [ ] Staat VIP-prominentie expliciet in de epic omschrijving, of is dit een UX-aanname? (Kan ook als filterbaar kolomkenmerk worden opgelost.)
- [ ] Op welke manieren/mogelijkheden kan receptie de contactpersoon informeren?
- [ ] Welke actie wordt door de gebruiker het meeste gebruikt?
- [ ] Waar moeten ze direct bij kunnen? (primaire acties vs. secundaire acties)

**Bulkacties**

- [ ] In welke scenario's checkt receptie meerdere mensen tegelijk in? (groepsbezoek, ploegwisseling contractors?)
- [ ] Hoeveel mensen tegelijk is realistisch: 5, 50, 500?
- [ ] Moeten bulkacties bevestigd worden, of direct uitgevoerd?
- [ ] Welke bulkacties zijn echt nodig, en welke zijn nice-to-have?

---

#### Filters & Zoeken

- [ ] Welke filters worden het meest gebruikt in de huidige situatie?
- [ ] "Quick filters" zijn presets: kunnen gebruikers eigen presets opslaan?
- [ ] Hoe vaak wisselen gebruikers van locatie in de filter? (multi-site organisaties)
- [ ] Moet vrij zoeken ook werken op gedeeltelijke matches en typefouten?
- [ ] In hoeverre moet vrij zoeken werken op alle kolommen?
- [ ] Zijn er filters die altijd actief moeten zijn? (bijv. altijd gefilterd op eigen locatie)

---

#### Tenantconfiguratie

- [ ] Welke contractor types moeten worden ondersteund en hoe worden deze per tenant geconfigureerd? Wie beheert deze configuratie: admin of systeembeheerder? (Bepalend voor datamodel en filterlogica.)
- [ ] Welke andere elementen zijn per tenant configureerbaar? (kolommen, compliance-regels)
- [ ] Als een tenant geen contractors heeft, verdwijnt dan de hele kolom/filter, of blijft de structuur intact?
- [ ] Zijn er tenants met alleen contractors en geen bezoekers?

---

#### Technisch & Integraties

- [ ] Is de koppeling met het toegangscontrolesysteem voor automatische statusupdate bij badge-scan een aanname, of staat dit in de epic? (Grote technische afhankelijkheid; scope-impact is aanzienlijk.)
- [ ] Real-time updates nodig? (als collega iemand incheckt, zie ik dat direct zonder refresh?)
- [ ] Integraties met externe systemen? (parkeer-API, HR-systeem voor contractors, agenda-sync?)
- [ ] Performance-eis: hoe snel moet de lijst laden bij 500+ verwachte personen?
- [ ] Offline scenario's: wat als de internetverbinding wegvalt bij de balie?

---

#### Metrics & Succes

- [ ] Hoe meten we of het redesign geslaagd is? Welke KPI's?
- [ ] Zijn er operationele targets voor receptie? (gemiddelde inchecktijd, no-show registratie?)
- [ ] Wordt er gerapporteerd op deze data? Door wie, en hoe vaak?
- [ ] Hoe halen we feedback op bij gebruikers voordat we dit scherm gaan bouwen?
- [ ] Zijn er andere plekken in YIM, bijvoorbeeld de homepagina, waar functionaliteiten over verwachte personen terug moeten komen?

---

#### Out of scope & Randvoorwaarden

- [ ] Is de aanname correct dat het bezoekersdossier-overzichtsscherm (lijst van alle bezoekers) geen aanpassingen nodig heeft? (Bevestiging nodig voordat dit scherm expliciet buiten scope wordt verklaard.)
- [ ] Wat valt verder expliciet buiten scope van dit redesign?
- [ ] Zijn er afhankelijkheden met andere projecten of releases?
- [ ] Wat zijn de technische randvoorwaarden of beperkingen waarmee we rekening moeten houden?

---

**Volgende stappen na beantwoording**

1. Gebruikersinterviews: observeren hoe receptie/beveiliging nu werkt
2. User journey mapping — uitwerken van de belangrijkste flows
3. Wireframes — eerste schetsen voor feedback

---

## Bijlage — Begrippenlijst

| Term | Definitie |
|---|---|
| YIM | Your Identity Management: het centrale identiteitsbeheersysteem. |
| Bezoeker | Een externe persoon die tijdelijk toegang krijgt tot een locatie. |
| Verwacht persoon | Een bezoeker (of contractor) die vooraf is geregistreerd en verwacht wordt op een specifieke dag. |
| Check-in | De handeling waarbij de aankomst van een bezoeker wordt geregistreerd. |
| Check-out | De handeling waarbij het vertrek van een bezoeker wordt geregistreerd. |
| No-show | Een verwachte bezoeker die niet is verschenen op het geplande tijdstip. |
| Autorisatie | Een toegekend toegangsrecht voor een specifieke locatie of zone. |
| Contactpersoon | De interne medewerker die de bezoeker ontvangt of verantwoordelijk is. |
| VIP | Bezoeker met een bijzondere status die extra aandacht of protocol vereist. |
| Contractor | Een externe medewerker van een derde partij die op locatie werkzaamheden uitvoert. |
| Contractor type | Een configureerbare subcategorie van contractors per tenant (bijv. schoonmaak, beveiliging, onderhoud). |
| Dossiervolledigheid | Indicatie of alle vereiste documenten en gegevens in een dossier aanwezig zijn. |
| Passtatus | De staat van een toegangspas: niet gekoppeld, gekoppeld aan een persoon, of geprint. |
| Quick filter preset | Een vooraf ingestelde filtercombinatie die met één klik een specifieke weergave activeert. |
| UX Debt | Verzameling van bekende UX-verbeterpunten die bewust zijn uitgesteld naar een latere sprint of epic. |
| MVP | Minimum Viable Product: de minimale set functionaliteiten voor de eerste release. |
| DevOps backlog | De geprioriteerde lijst van features en user stories voor het ontwikkelteam. |

---

*Vertrouwelijk — Blis Digital / YIM — v0.2 Concept — 31 maart 2026*
