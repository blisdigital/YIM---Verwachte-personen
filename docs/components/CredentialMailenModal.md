# CredentialMailenModal

Bevestigingsdialoog voor het versturen van een credential per e-mail. Toont het e-mailadres van de persoon en vraagt om bevestiging. Gebouwd op `<ActionPopup>`. Wordt ook als sub-modal gebruikt binnen `CredentialActiverenModal`.

## Relaties
- **Gebruikt door:** VerwachtePersonenView, CredentialActiverenModal
- **Gebruikt:** ActionPopup, BaseButton

## Gebruik
```vue
<CredentialMailenModal
  v-model:open="showMailen"
  :person="activePerson"
  @confirm="handleMailenConfirm"
/>
```

## Props
| Prop | Type | Default | Beschrijving |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Zichtbaarheid (v-model:open) |
| `person` | `Person \| null` | `null` | Persoon naar wie de credential gemaild wordt. `person.emailadres` wordt getoond |

## Events
| Event | Payload | Beschrijving |
|-------|---------|-------------|
| `update:open` | `boolean` | Modal sluiten |
| `confirm` | -- | Gebruiker heeft bevestigd dat de credential verstuurd mag worden |

## Inhoud

1. **Intro-tekst** — "Je gaat de credential mail naar het volgende e-mailadres:"
2. **E-mail box** — Teal achtergrondvlak met `person.emailadres`. Toont "--" als er geen e-mailadres beschikbaar is.

**Footer:** Annuleren (ghost) + Credential versturen (filled).

## Gedrag
- Bij bevestigen: emit `confirm` (zonder payload) en sluit modal.
- Modal breedte: 480px. Backdrop sluit modal niet.
- Als sub-modal binnen `CredentialActiverenModal`: ouder zet `heeftGemaild` op `true`.

## Design Tokens
| Element | Token | Waarde |
|---------|-------|--------|
| Intro tekst kleur | `--n800` | Donker grijs |
| E-mail box achtergrond | `--p50` | Licht teal |
| E-mail box afronding | `--r-s` | Klein |
| E-mail box padding | `16px` | -- |
| E-mail tekst kleur | `--p700` | Donker teal |
| E-mail tekst grootte | `16px` | -- |
| E-mail tekst gewicht | `600` | Semi-bold |
