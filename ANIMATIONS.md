# Animation and Interaction Specification

## Principles
- Motion communicates hierarchy, continuity, or feedback; it is not decoration for its own sake.
- Keep interactions responsive and avoid blocking the user.
- Respect `prefers-reduced-motion` and provide a low-motion experience.
- Avoid scroll hijacking, forced cursor effects, and long intro sequences.

## Proposed interactions
1. Hero entrance: short staggered reveal of name, role, and calls to action.
2. Navigation: subtle active-section state and restrained hover feedback.
3. Project index: image reveal or subtle transform on hover/focus.
4. Case study: lightweight section transitions; content remains readable without animation.
5. Page transitions: optional short opacity/position transition, only if routing remains fast.
6. Contact actions: clear pressed, copied, success, and error feedback as applicable.

## Performance constraints
- Prefer transform and opacity animations.
- Avoid animating layout-heavy properties where possible.
- Lazy-load below-the-fold media.
- Do not autoplay audio or video with sound.
- Avoid large animation bundles for small effects.

## Accessibility
- All hover interactions must have keyboard equivalents.
- Reduced-motion mode removes parallax, large transforms, and nonessential stagger effects.
- Do not hide essential content until an animation completes.
