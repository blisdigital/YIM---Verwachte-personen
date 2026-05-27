# E-learning uitnodiging

## Wanneer
Receptionist wil een persoon helpen met het starten van een verplichte e-learning.

## Voorwaarden
- `elearning === 'niet-behaald'`
- Status is **niet** Afgemeld of Geannuleerd

## Flow

Modal opent met twee kolommen:

### Links: Verstuur per e-mail

1. E-mailadres staat vooraf ingevuld (bewerkbaar)
2. Klik **Verstuur uitnodiging**
3. Persoon ontvangt e-mail met link naar e-learning module

### Rechts: Ter plekke starten

1. QR-code is direct zichtbaar (persoon kan scannen met eigen mobiel)
2. Pincode staat zichtbaar (voor invoer op zuil of device)
3. *Optioneel:* Klik **Print pincode** → printvenster opent met QR-code + pincode

## Resultaat
- Bij e-mail: Toast "Uitnodiging verstuurd"
- Bij QR/pincode: informatie direct getoond aan persoon
- Geen statuswijziging
- E-learning status wijzigt pas wanneer persoon de module voltooit (buiten scope van deze actie)

## Opmerkingen
- "Verstuur uitnodiging" disabled als e-mailadres leeg
- Pincode wordt deterministisch gegenereerd per persoon (6 cijfers)
- Footer heeft alleen "Sluiten" knop
