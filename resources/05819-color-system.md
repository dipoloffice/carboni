# CARBON-i Color System

Source image: `resources/05819.jpg`

## Primary Colors

| Token | Name | Hex | RGB | Usage |
| --- | --- | --- | --- | --- |
| `--color-primary` | Main Blue | `#253597` | `37, 53, 151` | Primary actions, active buttons, selected states |
| `--color-primary-nav` | Link Blue | `#163D9C` | `22, 61, 156` | Active navigation, key links |
| `--color-primary-link` | Hyperlink Blue | `#1841AB` | `24, 65, 171` | Inline links, clickable text |

## Text Colors

| Token | Name | Hex | RGB | Usage |
| --- | --- | --- | --- | --- |
| `--color-text-strong` | Black | `#000000` | `0, 0, 0` | H1, important headings, strongest emphasis |
| `--color-text-default` | Dark Neutral | `#141414` | `20, 20, 20` | Body text, standard UI labels |
| `--color-text-secondary` | Secondary Gray | `#5A525F` | `90, 82, 95` | Supporting copy, secondary metadata |
| `--color-text-muted` | Muted Gray | `#737375` | `115, 115, 117` | Background labels, low-emphasis text |

## Status Colors

| Token | Name | Hex | RGB | Usage |
| --- | --- | --- | --- | --- |
| `--color-status-up` | Rising Red | `#C72500` | `199, 37, 0` | Positive/rising market change indicators |
| `--color-status-down` | Falling Blue | `#1953F3` | `25, 83, 243` | Negative/falling market change indicators |

## Background And Button Colors

| Token | Name | Hex | RGB | Usage |
| --- | --- | --- | --- | --- |
| `--color-button-active` | Active Button Background | `#253597` | `37, 53, 151` | Active segmented controls, selected buttons |
| `--color-button-inactive` | Inactive Button Background | `#F7F3F2` | `247, 243, 242` | Inactive segmented controls, quiet button backgrounds |
| `--color-page` | Page Background | `#FFFFFF` | `255, 255, 255` | Main page background |

## CSS Variables

```css
:root {
  --color-primary: #253597;
  --color-primary-nav: #163D9C;
  --color-primary-link: #1841AB;

  --color-text-strong: #000000;
  --color-text-default: #141414;
  --color-text-secondary: #5A525F;
  --color-text-muted: #737375;

  --color-status-up: #C72500;
  --color-status-down: #1953F3;

  --color-button-active: #253597;
  --color-button-inactive: #F7F3F2;
  --color-page: #FFFFFF;
}
```

## Usage Notes

- Use `--color-primary` for the strongest brand action color and selected UI state.
- Use `--color-primary-nav` and `--color-primary-link` to separate navigation emphasis from inline link emphasis.
- Keep `--color-text-default` as the standard readable text color; reserve `--color-text-strong` for major headings or high-priority numbers.
- Use `--color-text-secondary` and `--color-text-muted` to reduce hierarchy without lowering contrast excessively.
- In market data contexts, use red for rising values and blue for falling values, matching the source palette convention.
