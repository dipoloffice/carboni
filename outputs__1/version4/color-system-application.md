# Version 4 Color System Application

Base version: `outputs__1/version2`

Color source: `resources/05819-color-system.md`

## Applied Tokens

- Primary: `--color-primary`, `--color-primary-nav`, `--color-primary-link`
- Text: `--color-text-strong`, `--color-text-default`, `--color-text-secondary`, `--color-text-muted`
- Status: `--color-status-up`, `--color-status-down`
- Background and buttons: `--color-button-active`, `--color-button-inactive`, `--color-page`

## Implementation Notes

- `styles.css` now defines the full color system at `:root`.
- Existing version2 aliases such as `--navy-950`, `--primary-700`, `--signal-400`, and `--teal-400` remain for layout compatibility, but they now point back to the official `--color-*` tokens.
- Main UI text, links, navigation highlights, cards, status indicators, charts, and service cards now reference the defined token system.
- Tints, transparent overlays, and chart backgrounds use RGB channel tokens or `color-mix()` derived from the defined colors instead of introducing separate hard-coded brand colors.
