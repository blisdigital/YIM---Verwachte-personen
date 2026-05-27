# Aankomst wijzigen

## Wanneer
Receptionist wil datum of tijd van een verwacht bezoek aanpassen.

## Voorwaarden
- Status is **Verwacht** of **Nog niet aangekomen**

## Flow

1. Receptionist klikt "Aankomst wijzigen" (beschikbaar via actiemenu, niet via detail panel footer)
2. **AankomstWijzigenModal** opent met huidige waarden vooraf ingevuld
3. Receptionist past aan: aankomstdatum, aankomsttijd, vertrekdatum, vertrektijd
4. *Optioneel:* Opmerking toevoegen
5. *Optioneel:* Toggle "Verstuur e-mail naar contactpersoon"
6. Receptionist klikt **Bevestigen**

## Resultaat
- `datumVanaf`, `aankomsttijd`, `vertrekTijd` worden bijgewerkt
- Toast: "Bezoek van [naam] is gewijzigd naar [datum] om [tijd]."
- Status blijft ongewijzigd
- Lijst herberekent automatisch:
  - Persoon verdwijnt als nieuwe datum niet meer matcht met actief datumfilter
  - Sorteervolgorde past zich aan op basis van nieuwe aankomsttijd

## Dossier-historie
- Wijziging wordt opgeslagen in de historie van het bezoekersdossier
- Aankomst wijzigen hoort primair in het bezoekersdossier — in dit scherm als nice-to-have, configureerbaar per klant

## Opmerkingen
- Bevestigen altijd enabled (velden zijn vooraf gevuld)
- Vier velden: aankomstdatum + tijd, vertrekdatum + tijd
