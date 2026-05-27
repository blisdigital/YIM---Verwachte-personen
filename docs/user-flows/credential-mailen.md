# Credential mailen

## Wanneer
Receptionist wil een actieve QR-code credential per e-mail naar de persoon sturen.

## Voorwaarden
- `credentialStatus === 'actief'`
- `credentialType === 'QR-code'` (printbaar)
- Status is **niet** Afgemeld of Geannuleerd

## Flow

1. Receptionist klikt "Credential mailen" via actiemenu
2. **CredentialMailenModal** opent met e-mailadres van persoon
3. Receptionist klikt **Credential versturen**

## Resultaat
- Toast: "Credential gemaild — Credential verstuurd naar {emailadres}."
- Geen statuswijziging

## Opmerkingen
- Toont "—" als persoon geen e-mailadres heeft
- Wordt ook als sub-modal gebruikt binnen de credential activeren flow (scenario A)
