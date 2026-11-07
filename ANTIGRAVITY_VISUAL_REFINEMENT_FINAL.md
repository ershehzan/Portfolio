# ANTIGRAVITY — Portfolio Visual Refinement & Theme Upgrade

## Context

The current Next.js portfolio foundation is already implemented. This is a refinement pass, not a request to rebuild the site from scratch.

Preserve the existing working architecture, sections, components, project content, and interactions wherever possible. First inspect the actual source code and screenshots, then make targeted changes.

The owner has supplied current portfolio screenshots and a vertical reference image showing a dark/light-mode animation. Use those assets as visual references. Do not invent a replacement design.

## 1. Main objective

Fix the current visual inconsistencies:
- Typography looks inconsistent, cramped, or poorly spaced in places.
- Some text is too small or too dense; some headings are oversized or collide with the fixed navigation.
- The color palette changes between sections without a coherent transition.
- The cream Work section, dark sections, bright footer letter tiles, and neon badges currently feel disconnected.
- The site feels visually dull in places despite having many colors.
- Add a complete, intentional light theme and an animated light/dark toggle.
- Fix project video playback behavior and add live demo and GitHub links.

Do not solve this by adding more random colors, gradients, blur, shadows, or animations. Improve hierarchy, spacing, contrast, and consistency.

## 2. Typography system

Audit all current font imports and CSS. Choose a coherent typography system appropriate for an experimental engineering portfolio:
- One strong display face for hero/section headings.
- One highly readable sans-serif for body copy and navigation.
- A monospace face only for code snippets, technical labels, and metadata.

Use the chosen fonts consistently across every section. Avoid mixing multiple unrelated font families or arbitrary weights.

Set responsive type scales using `clamp()` where appropriate. Define consistent:
- Heading sizes and line heights.
- Body size and line height.
- Small metadata/caption size.
- Letter spacing and text-transform rules.
- Font weights.

Fix all clipping, overlap, awkward line breaks, tiny low-contrast copy, and excessive uppercase text. Ensure the sticky/floating navigation never overlaps section headings. Add appropriate scroll-margin/anchor offsets for sections.

Do not reduce all text to tiny editorial labels. Body copy must remain comfortably readable on laptop and mobile.

## 3. Color system and visual consistency

Use design tokens / CSS variables rather than scattered hard-coded colors.

Suggested starting palette (adjust only after checking the supplied references and current UI):

### Dark theme
- Page background: `#0B0E0C`
- Elevated surface: `#141A16`
- Border: `#252D27`
- Primary text: `#F4F5EF`
- Muted text: `#A5B49F`
- Accent: `#C5F36A`

### Light theme
- Page background: `#F5F5EF`
- Elevated surface: `#FFFFFF`
- Border: `#DDE1D7`
- Primary text: `#151A16`
- Muted text: `#626C62`
- Accent: `#668F24`

Rules:
- These are proposed tokens, not claims about exact sampled screenshot colors.
- Use the lime accent consistently for primary emphasis, active states, small indicators, and key links.
- Keep semantic status colors (success/warning/error) separate from the brand accent.
- Do not use unrelated bright rainbow colors for decorative footer tiles or badges.
- Keep card surfaces, borders, shadows, code panels, pills, modal backdrops, and image captions coherent.
- The Work section may use a light surface only if it is a deliberate, well-designed contrast section with a clear transition. It must not look like an accidental separate template.
- Do not flatten everything into one shade; create depth with a restrained surface scale and clear hierarchy.

## 4. Full light theme

Implement a real light theme for the entire site, not a simple `filter: invert()` or partial color swap.

Every component must support both themes:
- Navigation and mobile menu.
- Hero and background grid/texture.
- About section and portrait caption.
- Project cards, category filters, code panels, video modal and controls.
- Stack constellation, nodes, labels, badges and inspection drawer.
- Codolio/DSA section, charts, progress bars, quote panels and screenshot frame.
- Footer, letter/name treatment, social links, email CTA and toast.
- Focus, hover, active, disabled and error states.

Use semantic CSS variables such as `--background`, `--surface`, `--surface-raised`, `--text`, `--muted`, `--border`, `--accent`, and `--accent-contrast`.

Verify WCAG-friendly text contrast in both themes. Images should not be inverted. Preserve image treatment where it is part of the design.

## 5. Animated theme toggle

Add a clearly discoverable theme toggle in the floating navigation. It must be usable on desktop and mobile.

Requirements:
- Sun icon in light mode and moon icon in dark mode.
- **Use a similar animation implemented with CSS and React**; the owner does not require an exact canvas recreation.
- Create a smooth, polished sun/moon transition inspired by the supplied vertical animation reference.
- Animate the icon/knob and theme colors; do not animate every element independently in a distracting way.
- Use approximately 250–450ms transitions for colors and surfaces, with a restrained easing curve.
- Persist the user's choice in `localStorage`.
- **Default theme: follow the visitor's system preference** on first visit.
- If the visitor manually changes the theme, persist that choice in `localStorage` and respect it on later visits.
- Avoid a flash of the wrong theme on initial page load. Use a safe pre-hydration theme initialization strategy compatible with the current Next.js version and App Router.
- Prevent hydration mismatch warnings.
- Add accessible name/label, keyboard support, visible focus state, and `aria-pressed` or an equivalent semantic state.
- Respect `prefers-reduced-motion`; use instant or minimal transitions when requested.
- Test refresh, navigation, and mobile viewport behavior.

### Important: supplied animation code is incomplete

The owner chose a CSS/React animation similar to the reference; an exact canvas recreation is not required. The owner pasted only a fragment:

```html
<style>
.button-wrapper {
  position: relative;
  z-index: 10;
}
</style>

<div class="canvas-holder">
  <canvas id="stage"></canvas>
</div>

<script>
function renderLoop() {
  updatePhysics();
  drawHole();
  drawStickman();
  requestAnimationFrame(renderLoop);
}
</script>
```

This is not a complete working implementation. It does not include canvas sizing, initialization, animation state, `updatePhysics`, `drawHole`, `drawStickman`, device-pixel-ratio handling, event handling, or animation cleanup.

Do not pretend this fragment is sufficient and do not invent the missing original source. Ask Shehzan to provide the complete HTML/CSS/JS or original source/video if he wants that exact canvas animation reproduced. In the meantime, implement the theme toggle itself with a clean accessible CSS/React animation, unless the exact canvas effect is essential—in that case, ask and wait.

## 6. Project videos: playback behavior

The FlowForge and CodeGuard demo videos currently open with an audio/volume experience the owner does not want.

Required behavior:
- **When the user opens a project video modal, automatically start playback muted.**
- Playback must start muted (`muted` and `defaultMuted` where appropriate) and inline (`playsInline`) so browser autoplay policies are respected.
- Do not expose an audio toggle or volume slider in the custom player UI.
- Keep essential playback controls such as pause/play, seek/progress, and close. Do not make the video impossible to pause.
- Do not autoplay every project video on initial page load. Autoplay only after the user explicitly opens the video modal.
- On modal close, pause playback and reset or preserve playback position consistently; prefer reset to start for the next open.
- Handle autoplay rejection gracefully with a visible play control.
- Keep the modal keyboard accessible, trap focus appropriately, close on Escape, and return focus to the trigger.
- On mobile, use `playsInline` and fit the player within the viewport.
- Do not silently remove or edit the original video file's audio track. Muting playback is sufficient unless Shehzan explicitly asks for permanent audio removal.
- If the project preview itself has a play overlay, make its behavior clear and consistent with the modal.

## 7. Project links and project cards

Every project card should have clearly visible, working links for:
1. Live Demo (when a real deployed demo exists).
2. GitHub Repository (when the correct repository URL is verified).
3. Watch Demo (only when a video asset exists).

Use these exact live demo URLs:

### FlowForge AI
Live demo:
https://flowforge-ai-uh0x.onrender.com/

Known repository candidate:
https://github.com/ershehzan/ShopFloorScheduler

### CodeGuard — AI Code Review & Security Assistant
Live demo:
https://codeguard-frontend-kb89.onrender.com/

Repository:
https://github.com/shoryaagrawal553/codeneeti

### SecureWebSocketClient-Cpp
Known repository:
https://github.com/ershehzan/SecureWebSocketClient-Cpp

### PyShop Scheduler
Do not assume this is a separate project from FlowForge. Inspect the repository and documentation. If it is a distinct repository, use its exact verified GitHub URL. If it is the same project/repository or an earlier name, present it as one project with appropriate naming/history, not as a duplicate card.

### VisionEdge / Drone
Include this project in the showcase as requested, but inspect its repository and current implementation. If the repository URL, screenshots, or project status are missing, ask Shehzan. Do not fabricate a GitHub URL, live demo, capabilities, or screenshots.

The project card link layout should be consistent and responsive. Use clear text labels such as `Live Demo ↗`, `GitHub ↗`, and `Watch Demo ▶`; do not hide essential links in hover-only states. Open external links safely in a new tab where appropriate (`rel="noopener noreferrer"`).

Do not label a demo as production-ready unless verified. Render.com services may sleep or take time to wake; do not promise instant availability.

## 8. Claims and content integrity

Audit project descriptions and visible numbers before retaining them:
- 73 passing tests.
- 1,335+ solved problems and its difficulty split.
- 616 active days and 574-day streak.
- 1,598 contest rating / 1,634 peak rating.
- 150+ commits.
- Any library/framework version labels or performance improvement claims.

Keep a number only if it is supported by current source code, test output, or the relevant public profile snapshot and the owner approves it. Add an unobtrusive “last verified” date for time-sensitive DSA stats if practical. Do not present old snapshots as live data.

Do not add fake testimonials, clients, employers, availability guarantees, or fabricated project results.

## 9. Preserve and improve the current design

- Do not rebuild the site from scratch.
- Keep the existing overall section order and recognizable layout unless a concrete usability issue requires a change.
- Preserve the editorial engineering identity and the strongest existing components.
- Remove decorative details that fight the palette or make the page look childish.
- The footer name treatment should use the same brand palette and typography system; no unrelated rainbow treatment unless the screenshots prove it is intentional and Shehzan approves.
- Keep the radial stack concept, but make its labels and nodes legible and usable on touch devices.
- Ensure the DSA section does not overlap the sticky navigation.
- Keep project descriptions concise and readable, with detailed information available through links or case-study expansion.

## 10. QA checklist

Before reporting completion:
- [ ] Compare every section in dark and light themes.
- [ ] Test theme toggle with mouse, keyboard, touch, refresh, and system preference.
- [ ] Confirm no flash of the wrong theme and no hydration errors.
- [ ] Test reduced-motion preference.
- [ ] Check typography and spacing at 360px, 390px, 768px, 1024px, 1440px, and wide desktop.
- [ ] Check sticky navigation and section anchor offsets.
- [ ] Confirm no horizontal overflow, clipped text, or overlapping elements.
- [ ] Open each video modal: autoplay muted, no volume control, pause/seek/close work.
- [ ] Confirm video stops when modal closes.
- [ ] Test all Live Demo and GitHub links.
- [ ] Verify project identity and avoid duplicate FlowForge/PyShop cards.
- [ ] Confirm VisionEdge is included or clearly report what information is missing.
- [ ] Re-run lint, typecheck, and production build.
- [ ] Report exact test/build results and any remaining blockers.

## 11. Required first response

Before changing code, briefly report:
1. Which files/components currently control typography, colors, theme, navigation, project cards, and video playback.
2. Whether a theme toggle already exists.
3. Whether the current video modal uses native controls or a custom player.
4. Which project repository links are verified and which are missing.
5. Whether the full canvas animation source is available.

Ask Shehzan for the complete animation source only if needed for an exact reproduction, and ask for missing repository URLs/assets rather than guessing. Then implement the refinement pass.
