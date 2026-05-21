
# Epic:Verwachte personen redesign

De huidige pagina Verwachte bezoekers voldoet niet meer aan de operationele behoeften. In de praktijk moet de receptie en beveiliging niet alleen bezoekers kunnen beheren, maar ook contractors — en daarbinnen verschillende contractortypen. Dit vraagt om een herdesign van het scherm, waarbij de oude focus op enkel bezoekers wordt verbreed naar een centrale plek voor alle verwachte personen.

Het nieuwe ontwerp biedt:

- één overzicht voor zowel bezoekers als contractors (incl. contractor types);
- duidelijke filters en segmentatie op aanwezigheid, afwezigheid, no-shows en annuleringen;
- directe toegang tot de belangrijkste acties: melden, afmelden, no-show, annuleren, pas koppelen/printen, contactpersoon informeren;
- zichtbaarheid van compliance-aspecten (dossier compleet, e-learningstatus);
- inzicht in parkeerbehoefte en reservering.
- Doel van het herdesign is een uniform, schaalbaar en gebruiksvriendelijk overzicht waarmee receptie en beveiliging efficiënt kunnen sturen op de dagelijkse toestroom van zowel bezoekers als contractors.

## Doelstellingen

- Eén overzicht voor alle verwachte personen (bezoekers & contractors).
- Duidelijk inzicht in wie komt, wanneer, waarom, bij wie en wat de status is.
- Directe acties vanuit dezelfde pagina uitvoeren.
- Compliance-checks (dossier en e-learning) direct zichtbaar en handhaafbaar.
- Zicht op parkeerbehoefte en reserveringen.
- Krachtige filter- en segmentatiemogelijkheden.

## Lijstweergave

- Een tabel met verwachte personen waarin zowel bezoekers als contractors worden getoond.
- Indien een tenant geen bezoekers of contractor types hebben geconfigureerd dan is dit ook niet zichtbaar.

### Kolommen

- Type persoon (Bezoeker / Contractor)
- Contractor type (configurabel per tenant)
- Naam persoon
- Bedrijf / Werkgever
- Bezoekreden / Referentie
- Locatie
- Contactpersoon (met bel/e-mail/bericht actie)
- Verwachte aankomsttijd
- Status: Verwacht / Aangekomen / Vertrokken / No-show / Geannuleerd
- Dossier compleet (Ja/Nee, met tooltip bij ontbrekende onderdelen)
- E-learning: Niet vereist / Vereist – Behaald / Vereist – Niet behaald
- Parkeren: Benodigd (Ja/Nee), Gereserveerd (Ja/Nee), Plek/Code (indien bekend )
- Passtatus: Geen / Gekoppeld / Geprint

## Acties

Acties per persoon:

- Aanmelden (check-in) → status = Aangekomen + timestamp
- Afmelden (check-out) → status = Vertrokken + timestamp
- Markeer No-show
- Annuleren (met of zonder reden)
- Informeer contactpersoon via bellen, e-mail of bericht
- Open dossier (bekijken, afhankelijk van rechten)
- Koppel pas, ontkoppel pas en Print pas

## Bulkacties

- Meerdere personen tegelijk markeren als Aangekomen of No-show
- Meerdere passen koppelen en/of printen

## Filters & segmentatie

- Datum range en locatie
- Type persoon (Bezoeker / Contractor/ contractor typen)
- Contractor type (multi-select)
- Aanwezig / Afwezig / No-show / Geannuleerd / Vertrokken
- Dossierstatus (Compleet / Niet compleet)
- E-learningstatus (Niet vereist / Vereist – Behaald / Vereist – Niet behaald)
- Passtatus (Geen / Gekoppeld / Geprint)
- Parkeerstatus (Benodigd / Gereserveerd)
- Contactpersoon
- Bedrijf / Werkgever
- Vrij zoeken (naam, bedrijf, referentie, telefoonnummer)
- VIP: Ja of Nee

## Quick filters (presets)

- Status: Verwacht, No-shows, Geannuleerd, check in, check out, aanwezig, afwezig
- Persoonstype: Contractors, Bezoekers
- Parkeer nodig – wel of niet gereserveerd
- E-learning vereist – Wel of niet niet behaald
- Dossier: compleet, niet compleet
