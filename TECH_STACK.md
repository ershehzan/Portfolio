# Technical Stack — Portfolio

## Proposed stack (not yet locked)
- Framework: Next.js with TypeScript.
- Styling: Tailwind CSS plus a small layer of custom CSS for art-directed layouts.
- Motion: Framer Motion or Motion; use only where it improves storytelling.
- Icons: Lucide.
- Content: typed local data/MDX for projects and case studies.
- Deployment: Vercel or another platform selected by Shehzan.

## Architecture principles
- Keep project content separate from UI components.
- Use reusable components for project cards, case-study sections, navigation, and calls to action.
- Prefer server-rendered/static content for performance and SEO.
- Limit client-side JavaScript to genuinely interactive sections.
- Optimize images and use responsive formats/sizes.
- Avoid unnecessary dependencies and animation libraries used only for decoration.

## Proposed structure
```text
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── projects/
│   │   └── [slug]/page.tsx
│   └── globals.css
├── components/
│   ├── navigation/
│   ├── sections/
│   ├── projects/
│   └── ui/
├── content/
│   └── projects/
├── public/
│   ├── images/
│   └── icons/
├── lib/
├── types/
└── docs/
```

## Quality gates
- TypeScript strict mode.
- ESLint and formatting checks.
- Responsive visual testing.
- Keyboard and reduced-motion testing.
- Lighthouse review before launch.

## Decisions pending
- `TODO: CONFIRM` Next.js vs another framework.
- `TODO: CONFIRM` deployment provider and domain.
- `TODO: CONFIRM` contact form provider or mailto-only contact.
