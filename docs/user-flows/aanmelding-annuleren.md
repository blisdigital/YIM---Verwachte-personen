# Aanmelding annuleren

## Wanneer
Receptionist wil een gepland bezoek annuleren (persoon komt niet meer).

## Voorwaarden
- Status is **Verwacht** of **Nog niet aangekomen**

## Flow

1. Receptionist klikt "Aanmelding annuleren" via actiemenu
2. **AnnulerenModal** opent met waarschuwing: *"Dit kan niet ongedaan worden gemaakt. Persoon moet dan opnieuw geregistreerd en aangemeld worden."*
3. *Optioneel:* Reden selecteren uit dropdown
4. *Optioneel:* Toelichting invullen (vrij tekstveld)
5. *Optioneel:* Toggle "Verstuur e-mail naar contactpersoon"
6. Receptionist klikt **Bevestigen**

## Resultaat
- Status wijzigt naar **Geannuleerd**
- Toast: "De aankomst van [naam] is geannuleerd."
- *Als toggle aan:* e-mail naar contactpersoon

## Belangrijk
- **Onomkeerbaar** — geannuleerde persoon kan niet meer worden aangemeld
- Reden en toelichting zijn optioneel
