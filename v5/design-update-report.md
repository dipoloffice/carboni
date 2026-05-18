# CARBON-i v2 Gemini A Design Update Report

**Version:** 2.0.1 (Gemini A Edition - Rebuilt from Codex B)
**Design Lead:** Senior Design Director

## 1. Typography Strategy
- **Weight Reduction:** Global font weights reduced from `900/800` to `700/500` to ensure readability and professional "SaaS" aesthetics.
- **Hierarchy:** H1 titles maintain impact with `700/800` weight, while general UI elements (nav, buttons, table headers) use `600/700` for better clarity.

## 2. Professional Color System
- **Primary Blue:** Shifted to a deeper, more trustworthy Navy (`#1E2B7A`) for a premium financial platform feel.
- **Status Indicators:** 
    - **Up (Red):** Adjusted to a sophisticated Crimson (`#AD280B`) to reduce eye strain.
    - **Down (Blue):** Refined to a clear, professional Royal Blue (`#1C56CC`) to distinguish from primary brand colors.
- **Neutral Palette:** Replaced pure blacks with Off-Blacks (`#1C1F24`) for softer, more modern contrast.

## 3. Data Visualization & UI Refinement (Zero-Border Strategy)
- **Market Card Active State (`.market-card.is-active`):** *Crucial Update* - The border color opacity was refined to `0.23` (`rgba(var(--color-primary-link-rgb), 0.23)`) and the shadow was softened. This provides a clear but subtle emphasis for the active card while maintaining the minimalist aesthetic.
- **Page & Carousel Indicators:** Removed hard borders from all side indicators and carousel arrows. Applied soft backdrop blurs and subtle drop shadows (`0.08` opacity) to create a clean, glassmorphic look without visual clutter.
- **Active Dots:** Replaced gradients on active indicator dots with a solid, clean `var(--color-page)` or `var(--color-primary)` to enhance precision.

## 4. Interaction Polish
- **Button Styles:** Removed borders and added refined hover states with smooth transitions (`scale(1.05)` for arrows).
- **Hero Section:** Dark overlays ensure perfect legibility of white text against diverse photographic backgrounds.

---
*This version was rebuilt directly from `v2_codex_b` to ensure no unintended structural changes were introduced, while successfully applying the minimalist, precision-driven design requested by the Director.*
