# Credential ontkoppelen

## Wanneer
Receptionist wil een credential loskoppelen van een persoon.

## Voorwaarden
- `credentialStatus === 'actief'`
- Status is **niet** Afgemeld of Geannuleerd

## Flow

1. Receptionist klikt "Credential ontkoppelen" via actiemenu
2. **CredentialOntkoppelenModal** toont bevestigingsvraag: *"Weet je zeker dat je deze credential wil ontkoppelen?"*
3. Receptionist klikt **Bevestigen**

## Resultaat
- `credentialStatus` → `niet-actief`
- `credentialType` → `null`
- `pasnummer` → `null`

## Opmerkingen
- Beschikbaar voor zowel QR-code als fysieke credentials
- Simpele ja/nee bevestiging, geen formuliervelden
