# Epic: Verwachte personen

> **Work Item:** #27979 | **Type:** Epic | **Status:** New | **Prioriteit:** 2
> **Area:** YIM\Nsecure | **Iteratie:** Sprint 25.20
> **Aangemaakt:** 30-09-2025 door Maurice Vermaas Nsecure
> **Laatst gewijzigd:** 21-05-2026 door Kim van Olderen

---

## Achtergrond

De huidige pagina *Verwachte bezoekers* voldoet niet meer aan de operationele behoeften. In de praktijk moet de receptie en beveiliging niet alleen bezoekers kunnen beheren, maar ook contractors — en daarbinnen verschillende contractortypen. Dit vraagt om een herdesign van het scherm, waarbij de oude focus op enkel bezoekers wordt verbreed naar een centrale plek voor alle verwachte personen.

Het nieuwe ontwerp biedt:

- Eén overzicht voor zowel bezoekers als contractors (incl. contractor types);
- Duidelijke filters en segmentatie op aanwezigheid, afwezigheid, niet aangekomen en annuleringen;
- Directe toegang tot de belangrijkste acties: aanmelden, afmelden, aankomst wijzigen, annuleren, credential koppelen/printen of ontkoppelen, contactpersoon informeren;
- Zichtbaarheid van compliance-aspecten (dossier compleet, e-learningstatus);
- Inzicht in parkeerbehoefte en reservering.

Doel van het herdesign is een uniform, schaalbaar en gebruiksvriendelijk overzicht waarmee receptie en beveiliging efficiënt kunnen sturen op de dagelijkse toestroom van zowel bezoekers als contractors.

## Doelstellingen

- Eén overzicht voor alle verwachte personen (bezoekers & contractors).
- Duidelijk inzicht in wie komt, wanneer, waarom, bij wie en wat de status is.
- Directe acties vanuit dezelfde pagina uitvoeren.
- Compliance-checks (dossier en e-learning) direct zichtbaar en handhaafbaar.
- Zicht op parkeerbehoefte en reserveringen.
- Krachtige filter- en segmentatiemogelijkheden.

## Afhankelijkheden

- Rekening houden met deelbeheer-functionaliteit: gebruiker ziet de verwachte personen voor de locaties die zij mogen zien op basis van deelbeheer.

## Lijstweergave

- Een tabel met verwachte personen waarin zowel bezoekers als contractors worden getoond.
- Indien een tenant geen bezoekers of contractor types hebben geconfigureerd dan is dit ook niet zichtbaar.

### Kolommen

- **Checkbox** (selecteren): specifiek voor het uitvoeren van bulkacties.
- **Acties**: direct zichtbaar i.v.m horizontaal scrollen.
- **Statussen:**
  - Verwacht: Persoon wordt verwacht en is nog niet aangekomen
  - Nog niet aangekomen: aankomsttijd is verstreken en persoon is nog niet aangemeld.
  - Aangemeld: persoon heeft zich gemeld bij de balie en is aangemeld of pas is gekoppeld/geprint (automatisch op aangemeld).
  - Afgemeld: persoon heeft zich bij de balie afgemeld en is vertrokken of pas is ontkoppeld.
  - Niet aangekomen: einde van de dag nog niet aangemeld, dus niet aangekomen
  - Geannuleerd: persoon is geannuleerd.
- Naam persoon
- Bedrijf / Werkgever
- Aankomstdatum
- Aankomsttijd
- Vertrektijd
- Locatie(s)
- Persoonstype
- Contractortype
- VIP
- *Personeelsnummer (default niet zichtbaar, via kolominstellingen instelbaar)*
- *Telefoonnummer (default niet zichtbaar, via kolominstellingen instelbaar)*
- *E-mailadres (default niet zichtbaar, via kolominstellingen instelbaar)*
- Credential
- Credential status
- Compliance (dossier, e-learning)
  - Dossier compleet (Ja/Nee, met tooltip bij ontbrekende onderdelen)
  - E-learning: Niet vereist / Vereist – Behaald / Vereist – Niet behaald
- Parkeren: Benodigd (Ja/Nee), Gereserveerd (Ja/Nee), Plek/Code (indien bekend)
- Contactpersoon (e-mail actie)
- Bezoekreden / Referentie

### Acties per persoon

- Aanmelden → status = Aangemeld + timestamp
- Afmelden → status = Afgemeld + timestamp
- ~~Markeer No-show~~
  - Besproken: automatisch naar 'nog niet aangekomen' of 'niet aangekomen' op basis van business logica op tijd. Reden: omdat dit niet te controleren is door receptie.
- Annuleer (met of zonder reden)
- Informeer contactpersoon via bellen of e-mail.
- Open dossier (bekijken, afhankelijk van rechten)
- Koppel/Print credential en ontkoppel credential

Aanpassen van aankomstdatum en -tijd wordt via het dossier uitgevoerd. Een versnelde actie wordt toegevoegd aan het dossier om dit met zo min mogelijk klikken uit te voeren.

Bulkacties zijn out-of-scope voor mvp.

## Filters & segmentatie

- Datumrange en locatie
- Type persoon (Bezoeker / Contractor / contractor typen)
- Contractor type (multi-select)
- Aanwezig / Afwezig / No-show / Geannuleerd / Vertrokken
- Dossierstatus (Compleet / Niet compleet)
- E-learningstatus (Niet vereist / Vereist – Behaald / Vereist – Niet behaald)
- Passtatus (Geen / Gekoppeld / Geprint)
- Parkeerstatus (Benodigd / Gereserveerd)
- Contactpersoon
- Bedrijf / Werkgever
- Vrij zoeken (naam, bedrijf, referentie, telefoon)

### Quick filters (presets)

- Op aankomstdatum
  - Verwacht vandaag
- Status
- Persoonstype segmentatie
  - Contractors vandaag
  - Bezoekers vandaag
- Parkeer nodig – niet gereserveerd
- Compliance
  - E-learning vereist – niet behaald
  - Dossier niet compleet
