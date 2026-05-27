# Persoon aanmelden

## Wanneer
Receptionist wil een verwachte persoon inchecken op locatie.

## Voorwaarden
- Status is **Verwacht**, **Nog niet aangekomen** of **Niet aangekomen**
- Persoon is **compliant** (dossier compleet + e-learning behaald of niet-vereist)

## Flow

1. Receptionist klikt "Persoon aanmelden" via actiemenu (⋯) of detail panel footer
2. **AanmeldenModal** opent met persoongegevens (naam, type, bedrijf, contactpersoon)
3. *Optioneel:* Identiteitscontrole-sectie — documentnummer invullen (configureerbaar per klant)
4. *Optioneel:* Toggle "Verstuur e-mail naar contactpersoon" (configureerbaar per klant)
5. Receptionist klikt **Bevestigen**

## Resultaat
- Status wijzigt naar **Aangemeld**
- `checkinTime` wordt gezet
- Toast: "[naam] is aangemeld."
- *Als toggle aan:* e-mail naar contactpersoon

## Blokkering
- Bevestigen-knop disabled als identiteitscontrole verplicht is en documentnummer leeg
- Niet-compliant personen: knop disabled in detail panel, actie niet beschikbaar
