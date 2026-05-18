# Action Components

## ActionMenu

Dropdown menu met acties per rij. De beschikbare acties zijn afhankelijk van de status van de persoon.

**Figma:** [`6:43682`](https://www.figma.com/design/LuyFTR1cgQe3mT6TAGvzVV/Epic--Verwachte-personen?node-id=6-43682&m=dev)

```vue
<ActionMenu :person="person" @action="handleAction" />
```

| Prop | Type | Default | Beschrijving |
|------|------|---------|--------------|
| `person` | `Person` | — | Persoon voor context |

**Events:**

- `@action` — Actie geselecteerd (`{ action: string, person: Person }`)

**Acties per status:**

**Verwacht / Nog niet aangekomen:**
```
Persoon aanmelden
Credential koppelen (bij fysieke credential types, zoals vaste passen, bezoekerspassen of tijdelijke passen) of Credential printen (bij printbare passen, zoals QR-code)
Aankomst wijzigen
Persoon annuleren          ← rood (danger)
──────────
Informeer contactpersoon
Bekijk dossier
Bel persoon
```

**Aangemeld:**
```
Credential koppelen (bij fysieke credential types, zoals vaste passen, bezoekerspassen of tijdelijke passen) of Credential printen (bij printbare passen, zoals QR-code)
Persoon afmelden
──────────
Informeer contactpersoon
Bekijk dossier
Bel persoon
```

**Niet aangekomen:**
```
Niet aangekomen ongedaan
Persoon aanmelden
Credential koppelen (bij fysieke credential types, zoals vaste passen, bezoekerspassen of tijdelijke passen) of Credential printen (bij printbare passen, zoals QR-code)
Aankomst wijzigen
Persoon annuleren          ← rood (danger)
──────────
Informeer contactpersoon
Bekijk dossier
Bel persoon
```

**Geannuleerd / Afgemeld:**
```
Informeer contactpersoon
Bekijk dossier
Bel persoon
```

**Bij credential status 'actief'**
'Credential ontkoppelen' in plaats van 'Credential koppelen'. Alleen van toepassing in situaties met fysieke credential types.

### Credential type classificatie

| Type | Categorie | Logica |
| ---- | --------- | ------ |
| `QR-code` | Printbaar | Altijd "Credential printen"; geen ontkoppelen (vervalt automatisch op geldigheidsdatum) |
| `Bezoekerspas`, `Contractorpas`, `Vaste pas`, overige | Fysiek | "Credential koppelen" of "Credential ontkoppelen" (afhankelijk van `credentialStatus`) |
| `null` | Geen | Geen credential-actie getoond |

Nieuwe printbare types toevoegen: voeg de `credentialType`-waarde toe aan `PRINTABLE_CREDENTIAL_TYPES` in `ActionMenu.vue`.

### Design tokens

#### Container

| Element | Token | Waarde |
|---------|-------|--------|
| Achtergrond | `--n0` | `#ffffff` |
| `border-radius` | `--r-s` | `4px` |
| Verticale padding | `--sp-l` | `16px` |
| Horizontale padding | — | `0` |
| Gap tussen items | `--sp-s` | `8px` |
| Schaduw | `box-shadow` | `0 4px 16px -2px rgba(17, 19, 19, 0.16)` |

**Layout:** `flex-column`, `align-items: flex-start`, breedte volgt langste label (`width: max-content`).

#### Menu-item

| Element | Token | Waarde |
|---------|-------|--------|
| Horizontale padding | `--sp-l` | `16px` |
| Verticale padding | `--sp-xs` | `4px` |
| Gap icoon + tekst | `--sp-s` | `8px` |
| `border-radius` (hover/active) | `--r-s` | `4px` |

**Layout:** `flex-row`, `align-items: center`, `width: 100%`, `overflow: clip`. Hoogte is niet gefixeerd — volgt line-height + padding.

#### Typografie (Label L)

| Token | Waarde |
|-------|--------|
| `--font` | `Nunito` |
| Gewicht | `600` (semibold) |
| Grootte | `16px` |
| Line-height | `24px` |
| Letter-spacing | `0.16px` |
| Kleur | `--p700` (`#315161`) |

`white-space: nowrap` op elk label — de container schaalt mee, tekst wordt niet afgebroken.

#### Separator

Dunne scheidingslijn tussen actiegroepen: `width: 100%`, `height: 0`, `border-top: 1px solid` (`--n300`). Groepering bepaalt de call-site, niet het component zelf.

### Implementatierichtlijnen

1. **Geen vaste `width`** op de container — gebruik `width: max-content` of `fit-content` zodat het menu meeschaalt met het langste label.
2. **`white-space: nowrap`** op labels behouden; laat het menu breder worden in plaats van tekst te wrappen.
3. **Padding en gap** altijd via tokens (`--sp-*`) uitdrukken, niet in hardgecodeerde pixels.
4. **Separator** alleen renderen tussen groepen — groepslogica bepalen op call-site.
5. **Icoon-slot** is voorzien in de text container (`gap: --sp-s`), ook als de huidige variant geen icoon toont.
