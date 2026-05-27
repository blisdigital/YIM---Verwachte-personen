# Credential activeren

## Wanneer
Receptionist wil een credential (pas of QR-code) koppelen aan een persoon.

## Voorwaarden
- `credentialStatus === 'niet-actief'`
- Status is **niet** Afgemeld of Geannuleerd
- Persoon moet **compliant** zijn (bij Verwacht/Nog niet aangekomen/Niet aangekomen)

## Scenario's

Het scenario wordt bepaald door `person.credentialOpties`:

### Scenario A — Printbaar (QR-code)

1. Modal opent met titel "Credential activeren"
2. Credentialnummer invullen
3. Datum vanaf + datum tot en met invullen
4. Credential **mailen** of **printen** (verplicht vóór activering)
5. Klik **Activeren**

**Resultaat:**
- `credentialStatus` → `actief`
- `credentialType` → `QR-code`
- Credential is gemaild/geprint naar persoon

### Scenario B — Fysiek (pas)

1. Modal opent met titel "Credential koppelen"
2. Credentialnummer invullen
3. Periode kiezen: Permanent of Tijdelijk (met einddatum)
4. Datum vanaf invullen (+ datum tot en met bij tijdelijk)
5. Klik **Koppelen**

**Resultaat:**
- `credentialStatus` → `actief`
- `credentialType` → `Bezoekerspas` / `Contractorpas` / `Vaste pas`
- `pasnummer` wordt gevuld

### Scenario C — Keuze

1. Stap 1: Selecteer credential type uit dropdown
2. Stap 2: Formulier van scenario A of B verschijnt
3. Verder zoals gekozen scenario

## Validatie
- Scenario A: "Mailen" en "Printen" enabled als credentialnummer + beide datums ingevuld. "Activeren" enabled na minstens één mail of print.
- Scenario B: "Koppelen" enabled als credentialnummer + datum(s) ingevuld.

## Accessoires
Als `credentialOpties.accessoires` niet leeg is, toont modal een accessoire-blok (naam + afbeelding).
