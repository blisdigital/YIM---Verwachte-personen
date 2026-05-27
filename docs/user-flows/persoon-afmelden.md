# Persoon afmelden

## Wanneer
Receptionist wil een aangemelde persoon uitchecken.

## Voorwaarden
- Status is **Aangemeld**

## Flow

1. Receptionist klikt "Persoon afmelden" via actiemenu of detail panel footer
2. **AfmeldenModal** opent met persoongegevens
3. *Optioneel:* Toggle "Verstuur e-mail naar contactpersoon" (configureerbaar)
4. Receptionist klikt **Bevestigen**

## Resultaat
- Status wijzigt naar **Afgemeld**
- `checkoutTime` wordt gezet
- Toast: "[naam] is afgemeld."
- *Als toggle aan:* e-mail naar contactpersoon

## Opmerkingen
- Bevestigen is altijd enabled (geen verplichte velden)
- Compliance is niet meer relevant — was al gecontroleerd bij aanmelden
