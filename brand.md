# YIM UI Kit — Foundations

This document captures the foundational design tokens of the YIM UI Kit: color palette and elevation (shadow) system. Values are sourced directly from the Figma library.

---

## Colors

All colors are organised in scales from `50` (lightest) to `900` (darkest). Scales are grouped by purpose: Brand, Neutrals, and Semantic (Info / Success / Warning / Error / Misc).

### Brand — Primary (P)

Teal-leaning brand palette. `P500` is the default brand colour.

| Token | Hex | Preview |
|---|---|---|
| `Color / Brand / P50`  | `#f0f7f8` | ░ |
| `Color / Brand / P100` | `#d6e8ec` | ░ |
| `Color / Brand / P200` | `#bcdadf` | ▒ |
| `Color / Brand / P300` | `#a2cbd3` | ▒ |
| `Color / Brand / P400` | `#87bdc6` | ▓ |
| `Color / Brand / P500` | `#6daeba` | ▓ |
| `Color / Brand / P600` | `#598f99` | █ |
| `Color / Brand / P700` | `#315161` | █ |
| `Color / Brand / P800` | `#243f4c` | █ |
| `Color / Brand / P900` | `#132a35` | █ |

### Neutrals (N)

Used for text, surfaces, borders, and disabled states. Note: `N0` and `White` are both `#ffffff`; `N1000` is the deepest neutral.

| Token | Hex |
|---|---|
| `Color / Neutrals / N0`    | `#ffffff` |
| `Color / Neutrals / N50`   | `#f8fafb` |
| `Color / Neutrals / N100`  | `#f3f4f5` |
| `Color / Neutrals / N200`  | `#ebeced` |
| `Color / Neutrals / N300`  | `#eaeced` |
| `Color / Neutrals / N400`  | `#b8babb` |
| `Color / Neutrals / N500`  | `#999a9b` |
| `Color / Neutrals / N600`  | `#707172` |
| `Color / Neutrals / N700`  | `#5d5e5e` |
| `Color / Neutrals / N800`  | `#3e3f40` |
| `Color / Neutrals / N900`  | `#1d1e1f` |
| `Color / Neutrals / N1000` | `#111313` |
| `Colors / Grey / White`    | `#ffffff` |
| `Colors / Grey / Black`    | `#000000` |

### Semantic — Info (B)

Blue scale, used for informational states, links, and neutral highlights.

| Token | Hex |
|---|---|
| `Color / Info / B50`  | `#e9f0f8` |
| `Color / Info / B100` | `#c2d4ec` |
| `Color / Info / B200` | `#9AB8E0` |
| `Color / Info / B300` | `#739cd3` |
| `Color / Info / B400` | `#4b80c7` |
| `Color / Info / B500` | `#2464bb` |
| `Color / Info / B600` | `#1e5299` |
| `Color / Info / B700` | `#174078` |
| `Color / Info / B800` | `#112e56` |
| `Color / Info / B900` | `#0a1c34` |

### Semantic — Success (G)

Green scale, used for positive states, confirmations, and success messaging.

| Token | Hex |
|---|---|
| `Color / Success / G50`  | `#e9f8f3` |
| `Color / Success / G100` | `#c2ecdd` |
| `Color / Success / G200` | `#9ae0c7` |
| `Color / Success / G300` | `#73d3b2` |
| `Color / Success / G400` | `#4bc79c` |
| `Color / Success / G500` | `#24bb86` |
| `Color / Success / G600` | `#1e996e` |
| `Color / Success / G700` | `#177856` |
| `Color / Success / G800` | `#11563e` |
| `Color / Success / G900` | `#0a3426` |

### Semantic — Warning (Y)

Yellow scale, used for cautionary states, pending actions, and attention cues.

| Token | Hex |
|---|---|
| `Color / Warning / Y50`  | `#fefbea` |
| `Color / Warning / Y100` | `#fdf3c4` |
| `Color / Warning / Y200` | `#fceb9e` |
| `Color / Warning / Y300` | `#fbe378` |
| `Color / Warning / Y400` | `#f9db52` |
| `Color / Warning / Y500` | `#f8d32c` |
| `Color / Warning / Y600` | `#cbad24` |
| `Color / Warning / Y700` | `#9f871c` |
| `Color / Warning / Y800` | `#726114` |
| `Color / Warning / Y900` | `#453b0c` |

### Semantic — Error (R)

Red scale, used for destructive actions, validation errors, and critical states.

| Token | Hex |
|---|---|
| `Color / Error / R50`  | `#f8e9eb` |
| `Color / Error / R100` | `#ecc2c8` |
| `Color / Error / R200` | `#e09aa5` |
| `Color / Error / R300` | `#d47382` |
| `Color / Error / R400` | `#c84b5e` |
| `Color / Error / R500` | `#bc243b` |
| `Color / Error / R600` | `#9a1e30` |
| `Color / Error / R700` | `#781726` |
| `Color / Error / R800` | `#56111b` |
| `Color / Error / R900` | `#350a11` |

### Semantic — Misc / Purple (PU)

Purple scale, used for secondary accents, tags, and distinctive categorical colours.

| Token | Hex |
|---|---|
| `Color / Misc / PU50`  | `#eee9f8` |
| `Color / Misc / PU100` | `#cfc2ec` |
| `Color / Misc / PU200` | `#b09ae0` |
| `Color / Misc / PU300` | `#9273d3` |
| `Color / Misc / PU400` | `#734bc7` |
| `Color / Misc / PU500` | `#5424bb` |
| `Color / Misc / PU600` | `#451e99` |
| `Color / Misc / PU700` | `#361778` |
| `Color / Misc / PU800` | `#271156` |
| `Color / Misc / PU900` | `#180a34` |

---

## Typography

Hierarchy is communicated through differences in font weight, size, line height, and letter spacing. The type scale is organised into five roles: **Display**, **Headers**, **Body**, **Labels**, and **Caption**.

### Font families

Both brand and base share the same typeface — a single font family covers the whole system.

| Role | Family |
|---|---|
| Brand | Nunito |
| Base  | Nunito |

### Weights

| Token | Value |
|---|---|
| `Typography/Weight/regular`  | `400` |
| `Typography/Weight/semibold` | `600` |
| `Typography/Weight/bold`     | `700` |

### Type scale

All values are expressed in pixels. Letter-spacing is given as an absolute pixel offset (as stored in Figma) with the equivalent percentage in parentheses.

#### Display & Headers — Bold 700

| Role | Use | Size / Line height | Letter spacing |
|---|---|---|---|
| `Title/Display` | Headline | `56 / 64` | `-0.56` (−1%) |
| `Header/H1`     | Page title | `40 / 48` | `-0.4` (−1%) |
| `Header/H2`     | Section title | `32 / 40` | `-0.16` (−0.5%) |
| `Header/H3`     | Sub-section | `24 / 32` | `-0.12` (−0.5%) |
| `Header/H4`     | Cards, UI sections | `20 / 28` | `-0.5` (−2.5%) |
| `Header/H5`     | Small titles | `18 / 24` | `0` |

#### Body — Regular 400

| Role | Use | Size / Line height | Letter spacing |
|---|---|---|---|
| `Body/Body L` | Long-form text | `16 / 24` | `0` |
| `Body/Body M` | Paragraphs     | `14 / 20` | `0` |
| `Body/Body S` | Caption, meta  | `12 / 16` | `0` |

#### Labels — SemiBold 600

Labels carry a small positive letter-spacing (~1%) to keep UI copy legible at small sizes.

| Role | Use | Size / Line height | Letter spacing |
|---|---|---|---|
| `Labels/Label L` | Large buttons, input labels  | `16 / 24` | `0.16` (1%) |
| `Labels/Label M` | Medium buttons, input labels | `14 / 20` | `0.14` (1%) |
| `Labels/Label S` | Small buttons, input labels  | `12 / 16` | `0.12` (1%) |

#### Miscellaneous — Regular 400

| Role | Use | Size / Line height | Letter spacing |
|---|---|---|---|
| `Misc/Caption` | Helper text | `12 / 12` | `0` |

> Note: a few mismatches between the Figma variable tokens and the values printed on the "Typography — Current YIM" reference sheet:
>
> - **Body sizes on the reference sheet are one step larger** than the variable values — the sheet labels Body L/M/S as 18/16/14, but the variables resolve to 16/14/12. The variable values are treated as the source of truth above.
> - **Header 4 letter-spacing** is `-0.5` px in the variables (≈ −2.5% at 20 px), but the reference sheet lists −0.25%. The `-0.5` value breaks the otherwise clean progression (−1 / −0.5 / −0.5 / …) and is likely a typo.
>
> Worth raising with the design team before these are implemented in code.

### Caption line-height caveat

`Typography/Line-height/caption` is set to `12` — equal to the font size, so 1.0 line-height. This is tighter than normal body text and is appropriate only for single-line helper labels. Avoid it for multi-line copy.

---

## Elevations (Shadows)

The elevation system uses five levels (`xs` → `xl`). Shadow colours are based on `#111313` (N1000) with decreasing opacity as elevation grows in distance.

| Token | CSS `box-shadow` | Use |
|---|---|---|
| `Elevation/xs` | `0 1px 2px 0 rgba(17, 19, 19, 0.08), 0 1px 4px 0 rgba(17, 19, 19, 0.12)` | Subtle separation: cards at rest, input fields, list rows |
| `Elevation/s`  | `0 2px 8px 0 rgba(17, 19, 19, 0.16)` | Raised surfaces: dropdown menus, tooltips, small popovers |
| `Elevation/m`  | `0 4px 16px -2px rgba(17, 19, 19, 0.16)` | Hover/active cards, date pickers, contextual menus |
| `Elevation/l`  | `0 8px 16px -2px rgba(17, 19, 19, 0.16)` | Floating panels, sidebars, large popovers |
| `Elevation/xl` | `0 12px 16px -4px rgba(17, 19, 19, 0.20)` | Modals, dialogs, highest-priority floating surfaces |

### Figma source values

| Token | Layers |
|---|---|
| `Elevation/xs` | drop-shadow `#11131314` offset `(0, 1)` radius `2` spread `0` + drop-shadow `#1113131F` offset `(0, 1)` radius `4` spread `0` |
| `Elevation/s`  | drop-shadow `#11131329` offset `(0, 2)` radius `8` spread `0` |
| `Elevation/m`  | drop-shadow `#11131329` offset `(0, 4)` radius `16` spread `-2` |
| `Elevation/l`  | drop-shadow `#11131329` offset `(0, 8)` radius `16` spread `-2` |
| `Elevation/xl` | drop-shadow `#11131333` offset `(0, 12)` radius `16` spread `-4` |

### Usage guidance

Pick the lowest elevation that still communicates the component's hierarchy. Elevations should correspond to a surface's interactivity and stacking level, not its visual prominence. Avoid mixing elevations within the same layer of the UI — it creates visual noise. When a component becomes interactive (hover, drag), step up by one level (e.g. `s` → `m`) rather than skipping levels.

---

## Dimensions

### Spacing

Spatial tokens for margin, padding, and grid gaps. The scale is roughly doubling (`s` → `m` → `xl`) with two mid-steps (`xxs`, `l`) to give fine control on dense surfaces.

| Token | Value | Typical use |
|---|---|---|
| `Spacing-0`    | `0px`   | Reset / no gap |
| `Spacing-xxs`  | `2px`   | Hairline separation: icon-to-label, inline badges |
| `Spacing-xs`   | `4px`   | Tight clusters: chip internals, stacked metadata |
| `Spacing-s`    | `8px`   | Component internals: input padding, button gaps |
| `Spacing-m`    | `16px`  | Default component spacing: card padding, form rows |
| `Spacing-l`    | `24px`  | Section spacing within a surface |
| `Spacing-xl`   | `32px`  | Separation between related sections |
| `Spacing-2xl`   | `40px`  | Separation between major sections |
| `Spacing-3xl`   | `64px`  | Page-level spacing, hero blocks |
| `Spacing-auto` | `auto`  | Flex auto-spacing (push-apart layouts) |

### Corner radius

Five corner tokens, ranging from square to fully rounded.

| Token | Value | Typical use |
|---|---|---|
| `Corner-0`   | `0px`    | Square edges: tables, strict grid surfaces |
| `Corner-s`   | `4px`    | Small controls: inputs, tags, tooltips |
| `Corner-m`   | `8px`    | Default: buttons, cards, modals |
| `Corner-l`   | `16px`   | Large surfaces: bottom sheets, feature cards |
| `Corner-360` | `360px`  | Fully rounded: pills, avatars, icon buttons |

The `Corner-360` token is a conventional "large-enough-to-always-be-a-pill" value rather than a true infinite radius; when applied to square elements it produces a circle, and on rectangles a pill.

---

## Sources

- [YIM UI Kit — Colors (Figma)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2087-190&m=dev)
- [YIM UI Kit — Elevations (Figma)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2087-1554&m=dev)
- [YIM UI Kit — Spacing (Figma)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2087-818&m=dev)
- [YIM UI Kit — Corner radius (Figma)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2087-1062&m=dev)
- [YIM UI Kit — Typography (Figma)](https://www.figma.com/design/RQhCroVydjMVySUhH4AoIw/YIM-UI-Kit?node-id=2087-1797&m=dev)
