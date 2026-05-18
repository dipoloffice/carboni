const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const baseCss = fs.readFileSync(path.join(root, "design-refresh.css"), "utf8");
const notionCss = fs.readFileSync(path.join(root, "notion-theme.css"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

assert(html.includes('class="hero-section"'), "v1_notion should keep the v3_codex_a hero section");
assert(html.includes('class="market-section'), "v1_notion should keep the market dashboard section");
assert(html.includes("news-section"), "v1_notion should keep the news section");
assert(html.includes("service-section"), "v1_notion should keep the service section");
assert(html.includes("./notion-theme.css"), "Notion design-system override CSS should be loaded");
assert(html.includes("./assets/carbon-i-transparent-logo.svg"), "CARBON-i logo should be bundled inside the site assets folder");
assert((html.match(/class="hero-bg/g) || []).length === 7, "hero slider structure should be preserved from v3_codex_a");
assert((html.match(/data-section-indicator=/g) || []).length >= 12, "section navigation indicators should be preserved");

assert(notionCss.includes("--notion-primary: #6c47ff"), "Notion purple token should be defined");
assert(notionCss.includes("--notion-navy: #071b3a"), "Notion navy token should be defined");
assert(notionCss.includes("--notion-yellow: #ffe45c"), "Notion bold yellow token should be defined");
assert(/font-family:\s*"Notion Sans"/.test(notionCss), "Notion Sans font stack should be applied");
assert(notionCss.includes("--notion-header-bottom-gap: 14px"), "Notion header should define an explicit bottom breathing space");
assert(/\.site-header\s*\{[\s\S]*?height:\s*calc\(var\(--header-h,\s*84px\) \+ var\(--notion-header-bottom-gap\)\)/.test(notionCss), "fixed header height should include the bottom breathing space");
assert(/\.hero-inner\s*\{[\s\S]*?var\(--notion-header-bottom-gap\)[\s\S]*?\+ 44px/.test(notionCss), "hero content should be offset by the same header bottom space");
assert(/\.hero-section\s*\{[\s\S]*?var\(--notion-navy\)/.test(notionCss), "hero should be restyled as a deep navy Notion-style band");
assert(/\.join-button,[\s\S]*?border-radius:\s*8px/.test(notionCss), "CTA buttons should use Notion's 8px rectangular radius");
assert(/\.market-menu\s*\{[\s\S]*?0 24px 48px -8px/.test(notionCss), "hero workspace/menu card should receive Notion-like deep mockup shadow");
assert(notionCss.includes("--notion-sky") && notionCss.includes("--notion-lavender") && notionCss.includes("--notion-mint"), "pastel feature tints should be available");
assert(baseCss.includes("scroll-snap-type"), "v3_codex_a snap-scroll base behavior should remain available");
assert(script.includes("canScrollWithinCurrentSection"), "oversized section scroll handling should be preserved");

console.log("v1_notion recreated from v3_codex_a with Notion theme checks passed");
