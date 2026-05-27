# Informeer contactpersoon

## Wanneer
Receptionist wil de contactpersoon van een bezoeker/contractor informeren (bellen of mailen).

## Voorwaarden
- Beschikbaar bij **alle** statussen

## Flow

### Scherm 1 — Contactgegevens

1. Receptionist klikt "Informeer contactpersoon" via actiemenu of detail panel
2. Modal opent met contactgegevens
3. Bij meerdere contactpersonen: dropdown om te kiezen
4. Twee opties:
   - **Bellen** — klikbaar telefoonnummer (`tel:` link)
   - **Mailen** — klik op "Verstuur mail" → gaat naar scherm 2

### Scherm 2 — E-mail opstellen

5. Contactpersoon wordt read-only getoond
6. *Optioneel:* Bericht typen in textarea
7. Klik **Versturen**

## Resultaat
- Toast: "Contactpersoon van [naam] is geïnformeerd."
- Geen statuswijziging

## Shortcut vanuit detail panel
Klik op e-mail icon button naast contactpersoon e-mailadres → opent modal **direct op scherm 2** (scherm 1 overgeslagen).

## Opmerkingen
- Bericht is optioneel — versturen altijd enabled
- Scherm 1 heeft geen footer-knoppen, alleen X om te sluiten
