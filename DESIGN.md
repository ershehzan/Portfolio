# DESIGN.md — Shehzan Khan | Software Engineer Portfolio

> **Design reference:** [Deborah A. — UX Designer & AI Design Engineer](https://debbie-portfolio-three.vercel.app/)
>
> **Adaptation rule:** Reuse the reference site's information architecture, editorial rhythm, section numbering, typography-led presentation, category navigation, and interactive storytelling. Do not copy its identity, wording, client logos, testimonials, project content, or booking product. This portfolio represents Shehzan Khan as a software engineer focused on C++, backend engineering, systems, and problem solving.

---

## 1. Design vision

Create an experimental, high-craft engineering portfolio with the personality of an Awwwards-style creative developer site and the clarity of a strong technical case-study archive.

The experience should communicate three things quickly:

1. **Engineering credibility** — real projects, architecture, implementation decisions, and measurable outcomes where verified.
2. **Creative confidence** — expressive typography, deliberate composition, distinctive visual transitions, and memorable art direction.
3. **Recruiter usability** — clear role, skills, project evidence, GitHub/Codolio links, and an easy way to make contact.

The site should feel authored rather than generated from a generic developer template. Visual effects must support navigation and storytelling, never obscure the work.

## 2. Reference-site patterns to adapt

The reference portfolio uses a concise navigation bar, a bold statement-led hero, numbered editorial sections, a personal introduction, grouped work categories, a tool-focused stack section, social proof, a booking/contact interaction, and a compact footer.

Adapt those patterns as follows:

| Reference pattern | Shehzan portfolio adaptation |
|---|---|
| Large hero headline and short positioning statement | Engineering-led headline and concise software engineering value proposition |
| About section with portrait and animated role descriptors | About section with professional portrait, engineering philosophy, and role/interest descriptors |
| Filterable work categories | Filterable software projects grouped by systems, backend, AI/ML, and applications |
| Tools displayed as a visual collection | Languages, frameworks, databases, developer tools, and engineering practices |
| Testimonials | Verified recommendations only; omit the section until genuine testimonials are supplied |
| Booking calendar | Contact / collaboration section with email and professional links; no fake booking availability |
| Social links in footer | GitHub, Codolio, LinkedIn, and email once confirmed |

Do not reproduce the reference's UX design services, creator channels, client-brand strip, or calendar booking flow.

## 3. Brand and visual identity

### 3.1 Personality

- Experimental, precise, confident, technical, curious.
- Editorial rather than corporate.
- High contrast with restrained color.
- Strong visual hierarchy and generous negative space.
- Technical details may appear as annotations, coordinates, labels, terminal-like snippets, or diagram fragments.

### 3.2 Art direction

- Default to a near-black / charcoal canvas.
- Use warm off-white for primary text and muted gray for secondary information.
- Choose one vivid accent color. **Recommended direction: electric lime** for a distinctive engineering feel. Keep orange as an alternative only if a later visual review establishes a better fit.
- Use oversized display typography, compact uppercase section labels, and monospace metadata.
- Use asymmetric grids and occasional full-bleed project visuals.
- Use subtle grain, hairline rules, and restrained gradients only when they add depth.
- Prefer authentic project screenshots, diagrams, code excerpts, terminal captures, and architecture visuals over stock imagery.

### 3.3 Provisional color tokens

These are implementation starting points, not measured values from the reference. Validate contrast and tune during visual QA.

```css
:root {
  --color-bg: #101110;
  --color-bg-elevated: #171A17;
  --color-surface: #1D211D;
  --color-surface-hover: #252B24;
  --color-text: #F2F3EC;
  --color-text-muted: #A5AAA0;
  --color-text-subtle: #747B72;
  --color-border: rgba(242, 243, 236, 0.14);
  --color-accent: #C7F36B;
  --color-accent-contrast: #101110;
  --color-success: #9BE3A5;
}
```

Rules:
- Accent is reserved for primary actions, active filters, key highlights, small markers, and selected interactive states.
- Do not use the accent for every heading or every card.
- Keep body copy comfortably readable; muted text must still pass contrast checks.
- Do not use color alone to communicate status.

## 4. Typography

### 4.1 Font roles

- **Display / headings:** Space Grotesk, Geist, or a similarly distinctive modern grotesk.
- **Body:** Inter or Geist Sans for clarity and long-form reading.
- **Technical labels / code / metadata:** JetBrains Mono or Geist Mono.

Use a maximum of two sans-serif families plus one monospace family. Load only the weights actually used.

### 4.2 Typographic behavior

- Hero headline: large, tightly tracked, short line lengths; allow deliberate line breaks on desktop.
- Section headings: oversized but smaller than the hero; use consistent scale progression.
- Body: readable line length and relaxed line height.
- Metadata: small uppercase or monospace labels with restrained tracking.
- Use fluid sizing with `clamp()` rather than many breakpoint-specific font sizes.

Suggested starting scale:

```css
:root {
  --text-xs: clamp(0.72rem, 0.68rem + 0.12vw, 0.8rem);
  --text-sm: clamp(0.84rem, 0.8rem + 0.16vw, 0.95rem);
  --text-base: clamp(1rem, 0.94rem + 0.22vw, 1.125rem);
  --text-lg: clamp(1.2rem, 1.05rem + 0.55vw, 1.55rem);
  --text-xl: clamp(1.55rem, 1.2rem + 1.2vw, 2.3rem);
  --text-display: clamp(3.2rem, 9vw, 8.5rem);
}
```

## 5. Layout and grid

- Maximum content width: 1440px, with selected visual sections allowed to bleed wider.
- Desktop side gutters: approximately 5–7vw.
- Tablet gutters: approximately 4–5vw.
- Mobile gutters: 20–24px.
- Use a 12-column desktop grid; collapse to 8 columns on tablet and 4 columns on mobile where appropriate.
- Maintain consistent vertical rhythm between numbered sections.
- Use thin horizontal dividers to establish section boundaries.
- Avoid excessive card containers; some content should sit directly on the page canvas.

## 6. Information architecture and page composition

The page should follow the reference's numbered, single-page narrative while prioritizing technical proof.

### 00 — Navigation

**Desktop navigation:**
- Wordmark: `SHEHZAN KHAN` or a compact `SK` monogram.
- Links: `Home`, `Work`, `About`, `Stack`, `Achievements`, `Contact`.
- Primary action: `Let's Talk ↗`.

**Behavior:**
- Sticky or fixed navigation only if it remains visually light and does not cover anchor targets.
- Active section state should be subtle and accessible.
- Mobile navigation becomes a compact menu with a clear open/close state.
- Use smooth anchor scrolling, with reduced-motion fallback.

### 01 — Hero / Home

Purpose: communicate identity, specialty, and strongest next action immediately.

Suggested copy direction (final copy belongs in `CONTENT.md`):

- Eyebrow: `SOFTWARE ENGINEER · C++ · BACKEND`
- Headline: `Engineer. Build. Solve.` or another approved engineering-led statement.
- Supporting line: a concise statement about building reliable software, backend systems, and intelligent applications.
- Primary CTA: `Explore Selected Work ↘`.
- Secondary CTA: `Get in Touch ↗`.
- Optional small availability/status label only if accurate and approved.
- Add a scroll cue and a small index/coordinate motif to reinforce the editorial art direction.

The hero should not claim years of experience, client counts, brand counts, or employment status without verification.

### 02 — About

Purpose: introduce the person behind the engineering work.

Composition:
- Professional portrait supplied by Shehzan; never substitute a generated or stock portrait.
- Large `About` / `A little about me` heading.
- Short first-person biography.
- Role and interest descriptors, such as `Software Engineer`, `C++ Developer`, `Backend Engineering`, and `Systems & Problem Solving`.
- A compact facts/links area only for verified information.
- Link to GitHub and Codolio.

Optional animated text loop may rotate through engineering interests. Keep it slow, readable, and non-essential to understanding the content.

### 03 — Work / Projects

Purpose: make project evidence the centerpiece of the portfolio.

Use a category filter inspired by the reference site. Suggested categories:
- `All`
- `Systems & C++`
- `Backend`
- `AI / ML`
- `Applications`

Show every approved major project, but give stronger visual priority to the most substantial and relevant work. The grid should support a mix of large feature cards and smaller supporting projects.

Known candidate projects from prior portfolio discussions (verify current repository links, status, and claims before publishing):
- **FlowForge AI** — autonomous production scheduling and resilience; scheduling heuristics, genetic algorithm optimization, disruption handling, and FastAPI backend.
- **CyberResilience Simulator** — cybersecurity-focused simulation concept combining AI and security; confirm implementation scope and current state.
- **SecureWebSocketClient-Cpp** — C++ WebSocket client; verify features, build instructions, and repository state.
- **VisionEdge / Drone project** — computer vision work involving YOLO and DeepSORT; confirm exact project name and implemented capabilities.
- **OneStopRecs** — recommendation system; confirm dataset, algorithm, and interface details.
- **Other repositories** — include only after reviewing the GitHub profile and confirming the project has enough substance to present.

Each project card should contain:
- Category / project type.
- Project name.
- One-sentence problem and solution summary.
- Relevant technology labels (only technologies actually used).
- Authentic visual: screenshot, diagram, demo frame, or terminal capture.
- Links: `Case Study`, `GitHub`, and `Live Demo` where available.

Each project detail/case-study view should use a consistent structure:
1. Overview
2. Problem / motivation
3. Requirements and constraints
4. Architecture and key components
5. Engineering decisions and trade-offs
6. Implementation highlights
7. Challenges and what changed
8. Results (only measurable and verifiable results)
9. Tech stack
10. Repository / demo links

Do not invent performance improvements, user counts, production deployment, team size, or business impact. Mark unavailable facts as pending verification in the source content rather than displaying placeholders publicly.

### 04 — Stack / Tools

Purpose: show practical engineering range without presenting a meaningless wall of logos.

Organize the stack into clear groups:
- **Languages:** C++, Java, Python (confirm current proficiency and usage).
- **Backend:** FastAPI, Flask, and other verified tools.
- **Core engineering:** Data Structures & Algorithms, OOP, REST APIs, concurrency/networking where supported by project evidence.
- **AI / ML:** list only frameworks and libraries used in actual projects.
- **Developer tools:** Git, GitHub, VS Code, build/debug tooling, and deployment platforms actually used.

Visual direction:
- Use a typographic tool wall or modular grid with small iconography.
- Highlight core strengths with larger type; keep secondary tools quieter.
- Avoid fake usage counters, arbitrary proficiency percentages, and skill progress bars.
- Optional hover reveals a short context sentence explaining where the tool was used.

### 05 — Achievements / Engineering Journey

Purpose: show evidence of consistency, learning, and initiative.

Potential content, subject to confirmation:
- DSA problem-solving milestone (previously reported as 700+ solved; verify current count before publishing).
- Hackathon participation and CyberResilience Simulator idea.
- Google Student Ambassador activities and technical community sessions.
- Relevant courses, workshops, awards, or technical contributions.

Use a concise timeline, editorial list, or evidence-led highlight grid. Every claim must be factual and dated where possible.

### 06 — Contact / Let's Talk

Purpose: make it effortless for recruiters and engineering teams to reach Shehzan.

- Large closing headline, e.g. `Have a problem worth solving?`.
- Short invitation for software engineering roles, technical conversations, and collaboration.
- Email CTA once the user confirms the address.
- Links to GitHub, Codolio, LinkedIn (once supplied), and optionally a downloadable resume.
- Do not implement a calendar booking system unless a real scheduling workflow is requested and configured.
- A contact form is optional; if implemented, it must validate input and submit to a real configured endpoint. Never show a fake success state.

### Footer

- Name / compact wordmark.
- Role: `Software Engineer | C++ & Backend`.
- GitHub, Codolio, LinkedIn, email links (only confirmed destinations).
- Current year generated dynamically in implementation.
- Small back-to-top action.

## 7. Components and interaction rules

### Navigation and buttons
- Clear focus and hover states.
- Primary CTA uses the accent color with strong contrast.
- Secondary CTA uses a border or text-link treatment.
- Hit targets should be comfortable on touch devices.

### Project cards
- Distinct image/visual area and concise project metadata.
- Hover may reveal a small directional cue or subtle image movement.
- Card must remain understandable without hover, especially on touch devices.
- Entire card should not be nested inside another interactive link if it contains multiple actions.

### Filters
- Filters must update the visible project collection.
- Include an obvious selected state and keyboard-operable controls.
- Avoid animated layout shifts that make content difficult to follow.

### About portrait
- Use the user's supplied image and crop it responsively.
- Preserve natural appearance; do not apply face-altering filters.
- Provide meaningful alt text.

### Stack items
- Tool name remains visible without hover.
- Any tooltip or reveal must be keyboard accessible and not carry essential information exclusively.

### Contact form (if included)
- Labels must remain visible.
- Validate email and required fields.
- Provide loading, success, and error states based on actual server response.
- Protect against spam and do not expose secrets in client code.

## 8. Motion and transitions

See `ANIMATIONS.md` for implementation detail. High-level rules:
- Use purposeful section reveals, restrained parallax, and subtle hover feedback.
- Keep page navigation and content access immediate.
- Avoid long intro animations, cursor effects that block interaction, and scroll hijacking.
- Respect `prefers-reduced-motion` throughout.
- Provide a static, complete experience when JavaScript or animation libraries fail.

## 9. Responsive behavior

### Desktop (approximately 1200px and above)
- Full editorial grid, expressive typography, multi-column project layouts, and larger portrait composition.
- Navigation links visible inline.

### Tablet (approximately 768px–1199px)
- Reduce grid complexity and headline scale.
- Keep project cards readable and avoid narrow multi-column text.
- Simplify hover-dependent interactions.

### Mobile (below approximately 768px)
- Single-column content flow.
- Compact menu and touch-friendly controls.
- Avoid horizontal scrolling except for intentional, clearly signposted carousels.
- Use smaller but still expressive hero typography.
- Keep project metadata and CTA links visible without hover.
- Reduce or disable parallax and large motion distances.

Exact breakpoints should be finalized in implementation and documented in `TECH_STACK.md` or the codebase.

## 10. Accessibility and performance

- Target WCAG 2.2 AA contrast and interaction expectations.
- Semantic landmarks and heading order.
- Full keyboard navigation and visible focus rings.
- Meaningful alt text for portrait and project imagery; decorative visuals use empty alt text.
- Reduced-motion support.
- Do not rely on color, animation, or hover alone to communicate information.
- Optimize images, use modern formats, lazy-load below-the-fold media, and avoid layout shifts.
- Ensure project links have descriptive accessible names.
- Maintain readable text sizes and line lengths.

## 11. Content integrity rules

- The portfolio is exclusively about Shehzan's software engineering identity and work.
- Do not include another person's employment history or professional details.
- Do not include BPO, customer support, operations, or financial crime work history.
- Do not fabricate client testimonials, employers, endorsements, project metrics, awards, users, or production usage.
- Distinguish completed projects from prototypes, concepts, and works in progress.
- Use exact repository and demo URLs after verification.
- Keep public claims aligned with the latest resume and project repositories.

## 12. Design QA checklist

- [ ] Navigation labels and anchors match the final page sections.
- [ ] Hero communicates software engineering focus within the first viewport.
- [ ] Professional portrait is supplied by Shehzan and displays correctly on mobile and desktop.
- [ ] Project categories filter the correct projects.
- [ ] All project descriptions, technology stacks, metrics, and links are verified.
- [ ] Stack section distinguishes core strengths from tools used occasionally.
- [ ] Achievements are accurate and supported by evidence.
- [ ] Testimonials are omitted until genuine, approved testimonials are supplied.
- [ ] Contact actions work and do not simulate successful submission.
- [ ] No borrowed identity, client logos, quotes, or service descriptions from the reference site remain.
- [ ] Responsive layouts have no unintended overflow.
- [ ] Keyboard, screen-reader, contrast, and reduced-motion checks pass.
- [ ] Images are optimized and page loading remains fast.

---

## 13. Reference

- Reference portfolio: [Deborah A. — https://debbie-portfolio-three.vercel.app/](https://debbie-portfolio-three.vercel.app/)
- Inspiration to retain: section-led editorial flow, expressive hero, personal introduction, categorized work, visual tool stack, strong closing CTA, and compact footer.
- Inspiration to reinterpret: booking and testimonials become a recruiter-friendly contact area and verified engineering achievements.
