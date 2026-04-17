# CLAUDE.md — Clair Sun Portfolio 2026

This is the authoritative spec for building Clair Sun's portfolio website using Claude Code.
Read this entire document before writing a single line of code.

---

## 0. Project Overview

**What we're building:** A personal portfolio website for Clair Sun, Senior UX Designer specializing in AI/ML at AWS. Target audience: hiring managers and design leaders at AI companies (Anthropic, OpenAI, Google DeepMind, etc.).

**Tech stack:** React + Vite + Tailwind CSS v4 + `motion/react` (Framer Motion). Already configured. Do not introduce new frameworks.

**Starting point:** The codebase in this directory was exported from Figma Make. The content layer (projects data, case study prose, media URLs) is complete and must be preserved. The visual design layer needs a full redesign per this spec.

**Approach:** Refactor, don't rewrite. Keep file structure, keep all content, keep the SPA view-switching pattern. Change the design system, typography, color, and specific components as instructed.

---

## 1. Design Direction

### 1.1 Aesthetic Reference

The portfolio should feel like: **warm editorial confidence**. Think Anthropic.com meets cofounder.co — generous whitespace, large refined typography, clean card surfaces, nothing gratuitous. It should feel like it was designed by someone who cares about AI interfaces deeply AND cares about people, warmth, and craft.

The signature visual element is an **illustrated landscape** — a painterly, Ghibli-adjacent scene of rolling hills, wildflowers, and open sky — used as the hero background and as a footer illustration bookend. This is what makes the portfolio memorable and completely unlike any other designer's site. Preserve and honor it.

### 1.2 What this is NOT

- Not a cold tech portfolio with Inter font and white-on-dark cards
- Not a maximalist animation showcase
- Not a Dribbble-style colorful gradient splash
- Not a process-heavy case study documentation site
- Not a startup landing page

### 1.3 Tone

Warm. Confident. Human. A calm, considered handshake — not a pitch deck.

---

## 2. Design System

### 2.1 Typography

Replace the existing `fonts.css` entirely. Use Google Fonts.

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
```

**Display / Headlines:** `Playfair Display` — use for hero text, section titles, project titles, large editorial moments. Weight 400 or 500 for most uses. Italic 400 for moments of warmth or emphasis.

**Body / UI:** `Plus Jakarta Sans` — use for all body copy, nav links, labels, captions, metadata, buttons. Never use Inter, Poppins, or Cormorant anywhere.

**Type scale:**
```
Hero headline:      56–72px / Playfair Display 500 / line-height 1.1 / letter-spacing -0.02em
Section title:      36–44px / Playfair Display 400
Project title:      24–28px / Playfair Display 500
Body large:         18–20px / Plus Jakarta Sans 300 / line-height 1.7
Body default:       16px    / Plus Jakarta Sans 400 / line-height 1.65
Label / meta:       13px    / Plus Jakarta Sans 500 / letter-spacing 0.06em / uppercase
Caption:            13px    / Plus Jakarta Sans 400 / color: var(--text-secondary)
Nav links:          16px    / Plus Jakarta Sans 500
```

### 2.2 Color Palette

Replace all Tailwind color usage with these CSS custom properties. Define them in `index.css` or a `globals.css`:

```css
:root {
  /* Backgrounds */
  --bg-primary:     #FAF8F5;   /* warm white — main page background */
  --bg-secondary:   #F2EFE9;   /* slightly warmer — card fills, subtle sections */
  --bg-tertiary:    #E8E3DA;   /* warm gray — hover states, dividers */

  /* Text */
  --text-primary:   #1A1916;   /* warm near-black — headlines */
  --text-secondary: #6B6560;   /* warm gray — body text */
  --text-tertiary:  #9E9891;   /* warm light gray — captions, metadata */

  /* Accent */
  --accent:         #C4A882;   /* warm sand — CTAs, underlines, highlights */
  --accent-light:   #E8D5B7;   /* parchment — subtle fills */

  /* Borders */
  --border:         rgba(26, 25, 22, 0.10);  /* default dividers */
  --border-strong:  rgba(26, 25, 22, 0.20);  /* emphasized borders */
}
```

Force light mode always. Remove any dark mode logic:
```tsx
// In Navbar.tsx useEffect — keep this:
document.documentElement.classList.remove('dark');
document.documentElement.style.setProperty('color-scheme', 'light');
```

Apply `background-color: var(--bg-primary)` to the root `<div>` in App.tsx instead of `bg-white`.

### 2.3 Spacing & Layout

Max content width: `1240px`, centered, with `px-6` (24px) padding on mobile.

Section vertical rhythm: `py-24` (96px) between major sections on desktop, `py-16` on mobile.

Project cards on home: full-width editorial rows, not a masonry grid.

### 2.4 Borders & Surfaces

- All card borders: `1px solid var(--border)` — not Tailwind's default
- Card backgrounds: `var(--bg-secondary)`
- Border radius: `12px` for cards, `8px` for smaller elements, `100px` for pills/tags
- No box shadows except very subtle `0 1px 3px rgba(0,0,0,0.06)` on cards on hover

### 2.5 Motion Principles

Use `motion/react` (already installed). Rules:

- **Page/section entrances:** `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` with `duration: 0.7, ease: [0.22, 1, 0.36, 1]` (custom ease-out cubic)
- **Scroll-triggered:** use `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-80px" }}`
- **Hover on project cards:** `whileHover={{ y: -3 }}` with `transition={{ duration: 0.2 }}`
- **View transitions (AnimatePresence):** keep existing pattern, tune to `duration: 0.4`
- **Stagger children:** use `transition={{ delay: index * 0.08 }}` for lists
- **NO:** TiltCard 3D effect (remove entirely), parallax, cursor trails, loading spinners, scroll-jacking
- **All animations:** wrap with `@media (prefers-reduced-motion: reduce)` respect — set `duration: 0` if reduced motion is preferred

---

## 3. File Architecture

Do not restructure the existing file layout. Work within it:

```
src/
  app/
    components/
      Navbar.tsx          ← REWRITE (keep logic, redesign visual)
      Hero.tsx            ← REWRITE (new concept, keep video bg)
      ProjectGrid.tsx     ← REWRITE (editorial rows, not masonry)
      ProjectDetail.tsx   ← KEEP CONTENT, redesign layout + add stat blocks
      OtherWorkPreview.tsx ← NEW COMPONENT (home page preview strip)
      ForFun.tsx          ← KEEP, aesthetic reskin only
      About.tsx           ← BUILD FROM SCRATCH
      Contact.tsx         ← REWRITE with real content
      Footer.tsx          ← REWRITE (illustrated footer)
      BackToTop.tsx       ← KEEP as-is
      Notes.tsx           ← RENAME to WritingPatterns.tsx, aesthetic reskin
    data/
      projects.ts         ← DO NOT TOUCH
  styles/
    fonts.css             ← REWRITE (new font imports)
```

---

## 4. Component Specifications

### 4.1 Navbar

**Structure:** Fixed top. Logo left, nav links right.

**Logo:** Small circular avatar image (existing Dropbox URL) + "Clair Sun" in Playfair Display 500, ~22px. Clicking either returns to home view.

**Nav links:** `Projects` · `Other Work` · `About` — Plus Jakarta Sans 500, 15px. Active state: full opacity. Inactive: 50% opacity. Hover: full opacity, transition 200ms.

**Scroll behavior:** At `scrollY > 60`: add `backdrop-blur-sm` and `background: rgba(250, 248, 245, 0.92)`. At top: fully transparent background. Transition 300ms.

**Bottom border:** Single `1px solid var(--border)` line — only visible when scrolled (not at top).

**Mobile:** Hamburger → full-screen overlay, nav links centered, Playfair Display, large (32px).

```tsx
// Nav items
const navLinks = [
  { name: 'Projects', view: 'home' },
  { name: 'Other Work', view: 'sidework' },
  { name: 'About', view: 'about' },
];
```

---

### 4.2 Hero

**Concept:** Full-width illustrated landscape as background. Painterly warm sky with rolling hills and wildflowers. A centered glass card floats over it with the intro text. After 1.8s delay, the blur on the image lifts (existing pattern — keep it, just retune).

**Background image:** Use the existing Midjourney video source as-is:
```
https://cdn.midjourney.com/video/ec71a1ff-22b1-4255-bb57-bd7e7d0248c5/0.mp4
```

**Container:** `w-full`, `height: 640px` on desktop / `480px` on mobile. `border-radius: 16px`. `overflow: hidden`. Max width `1240px`, centered.

**Text content (the glass card):**
```
[centered]
Nice to meet you,
I'm Clair Sun

[body text below, Plus Jakarta Sans 300, 17px, max-width 480px, centered]
I'm a product designer inventing AI interaction patterns that don't exist yet.
Currently at Amazon Quick Suite, formerly at C3.ai and CMU.
Co-author of Alverse.design · A' Design Award judge · Webby nominee.
```

**Glass card styling:**
- Background: `rgba(250, 248, 245, 0.52)`
- Backdrop-filter: `blur(20px)`
- Border: `1px solid rgba(255,255,255,0.4)`
- Border-radius: `16px`
- Padding: `40px 48px`
- Max-width: `560px`

**"Nice to meet you," line:** Playfair Display italic 400, 32px, `var(--text-secondary)`
**"I'm Clair Sun"** line: Playfair Display 600, 44px, `var(--text-primary)`

**Transition:** Initial state — full backdrop blur overlay on the whole hero (white/40, blur 24px). After 1.8s, that overlay fades out (`duration: 0.9s`), revealing the illustrated scene. The glass card fades in simultaneously. Keep the existing `AnimatePresence` pattern, just retune timing and styling.

**Remove:** The daisy bullet point icons. Replace bullet list with the flowing paragraph described above.

---

### 4.3 ProjectGrid (Home — Featured Work)

**Layout:** Full-width editorial rows. Each project is its own row with a clear visual hierarchy. Remove the masonry layout and `react-responsive-masonry` import entirely.

**Section header above the grid:**
```
[Plus Jakarta Sans 500, 12px, uppercase, letter-spacing 0.08em, var(--text-tertiary)]
Featured Work
```

**Each project row:**

```
Row layout (alternating):
  Odd rows:  [Media left 58%] [Text right 38%] gap 4%
  Even rows: [Text left 38%] [Media right 58%] gap 4%

Media: rounded-xl (16px), overflow hidden, aspect-ratio 16/9
       hover: scale(1.02), duration 500ms ease-out

Text block (vertically centered):
  - Role + Year tag: 12px / Plus Jakarta Sans 500 / uppercase / var(--text-tertiary) / letter-spacing 0.06em
  - Project title: Playfair Display 500, 32–36px, var(--text-primary)
  - Description: Plus Jakarta Sans 300, 17px, line-height 1.7, var(--text-secondary), max 3 lines
  - "View project →" link: Plus Jakarta Sans 500, 14px, var(--accent), underline on hover
```

**Scroll animation:** Each row `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 40 }}`, `viewport={{ once: true, margin: "-100px" }}`, `transition={{ duration: 0.7, delay: index * 0.1 }}`

**Clicking either the media or "View project →"** calls `onProjectClick(project)`.

**Spacing between rows:** `mb-32` (128px) — give each project room to breathe.

---

### 4.4 OtherWorkPreview (NEW — home page section)

This is a new component to build from scratch. It lives on the home page between the project grid and the footer illustration, showing a teaser of Other Work content.

**Section header:**
```
Done looking at my work? Check out my other stuff :)
[Playfair Display italic 400, 22px, var(--text-secondary)]

                                        [View all →]
                                        [Plus Jakarta Sans 500, 14px, var(--accent)]
```

**Layout:** Horizontal scrollable row of cards on mobile. On desktop: a `5-column grid` of compact cards, truncated to 5 items.

**Each card:**
- Aspect ratio 4/3
- `border-radius: 12px`
- `overflow: hidden`
- Background image fills the card
- On hover: subtle dark overlay (0 → rgba(0,0,0,0.35)), title fades in over image
- Below image: `category tag` (12px, uppercase, var(--text-tertiary)) and `title` (Plus Jakarta Sans 500, 15px, var(--text-primary))

**Content:** Pull from the existing ForFun data (column1Projects + column2Projects arrays in ForFun.tsx). Display the first 5 items.

**"View all →"** calls `onSideWorkClick()` prop to switch to the sidework view.

---

### 4.5 ProjectDetail

**Keep all existing content completely.** Only redesign the layout and add stat blocks.

**Changes:**

1. **Back navigation:** Change from the current "← Back to Projects" button to a minimal breadcrumb in the navbar area: `Work / {project.title}`. Alternatively keep the back button but style it as `Plus Jakarta Sans 400, 14px, var(--text-tertiary)` with a `←` arrow, positioned at the very top with `mb-12`.

2. **Hero media:** Full-width, rounded-2xl, no padding wrapper card. Just the media directly.

3. **Header section:** Project title in Playfair Display 500, 42px. Year and role as `12px / Plus Jakarta Sans 500 / uppercase / var(--text-tertiary)` metadata above the title (not below).

4. **Impact stat block:** Extract the key numbers from the prose and display them in a `3-column stat grid` before the "Read about it" section:
   - Each stat: number in Playfair Display 600 48px `var(--text-primary)`, label in Plus Jakarta Sans 400 13px `var(--text-secondary)` below
   - Background: `var(--bg-secondary)`, `border-radius: 12px`, `padding: 32px`
   - Example for Spaces: `73k+ users` / `72.46% ease of use` / `87.83% task completion`
   - For projects without numbers, skip the stat block

5. **Section headers** (`THE OPPORTUNITY`, `IMPACT` etc.): Change from `uppercase tracking-wider font-bold text-sm` to `Plus Jakarta Sans 500, 12px, uppercase, letter-spacing 0.1em, var(--text-tertiary)`.

6. **Body text:** Switch from `font-light text-foreground/80` to `Plus Jakarta Sans 300, 18px, line-height 1.75, var(--text-secondary)`.

7. **"Get in touch for a case study" CTA:** Style as a button: `border: 1px solid var(--accent)`, `color: var(--accent)`, `padding: 12px 24px`, `border-radius: 8px`, `Plus Jakarta Sans 500, 14px`. Hover: `background: var(--accent-light)`.

8. **Next project link:** Add at the very bottom of each project detail: `← Previous` / `Next →` navigation between projects (by array index, wrapping). Small, `Plus Jakarta Sans 400, 14px, var(--text-tertiary)`.

---

### 4.6 About (BUILD FROM SCRATCH)

**Visual concept:** Simple, warm, human. A decorative illustrated element (a small crop or companion piece from the same Ghibli-style illustration world as the hero) sits in the layout — either as a right-column visual or a top banner. The text is the focus; the illustration adds warmth without being busy.

**Layout (desktop):** Two columns. Left: text content (~55%). Right: illustrated visual or photo placeholder (~40%).

**Content to include:**
```
[Playfair Display 500, 42px — headline]
Hi, I'm Clair.

[Plus Jakarta Sans 300, 18px, line-height 1.8 — bio paragraph]
I'm a product designer based in Seattle, building AI experiences that 
feel human. I've spent the last few years inventing interaction patterns 
at the intersection of generative AI and enterprise work — first as 
founding designer for C3.ai's GenAI suite, now leading design for 
Amazon Quick Suite at AWS.

[Second paragraph]
I care about the moment when a product stops feeling like software and 
starts feeling like a collaborator. Most of my work lives at that edge.

[Credentials section — small cards or simple list]
Currently:    Senior UX Designer, AI/ML · Amazon Web Services
Previously:   Founding Designer · C3.ai Generative AI
Education:    HCI · Carnegie Mellon University

[Awards — small pill tags]
NY Product Design Awards · London Design Awards · 
UX Design Awards · Webby Award Nominee · A' Design Award Judge

[Links]
LinkedIn ↗   GitHub ↗   Alverse.design ↗
```

**Right column visual:** Use this illustrated landscape image as a decorative element, displayed as a tall rounded card:
```
https://cdn.midjourney.com/video/ec71a1ff-22b1-4255-bb57-bd7e7d0248c5/0.mp4
```
(Use the video as a still by using the image poster, or use one of the Dropbox landscape images if available. If no still is available, use a warm `var(--bg-secondary)` placeholder with a subtle flower/leaf SVG illustration.)

**Note on photo:** Leave a clearly marked placeholder `{/* PHOTO_PLACEHOLDER — replace with <img src="your-photo.jpg" /> */}` that Clair can swap in. Don't hardcode a photo that doesn't exist.

---

### 4.7 ForFun → now "Other Work" view

**Keep all existing content and data.** This is now the `sidework` view (rename the view key in App.tsx from `sidethings` to `sidework`).

**Reskin only:**
- Section intro text: keep the "Welcome to the playground" prose, reskin typography to match system
- Card grid: keep the 2-column layout
- Cards: change hover overlay background from `bg-black/40` to `bg-[rgba(26,25,22,0.5)]`
- Card title: Playfair Display 500 instead of `font-serif font-medium`
- Category tag: `Plus Jakarta Sans 500, 11px, uppercase, var(--text-tertiary)`

---

### 4.8 Contact (bottom of home page)

Replace the current placeholder Contact.tsx with a warm, minimal contact section that lives at the bottom of the home page scroll (before the footer illustration).

**Content:**
```
[Playfair Display italic 400, 28px, var(--text-secondary), centered]
Well, you made it this far.

[Playfair Display 500, 44px, var(--text-primary), centered]
Let's talk.

[Plus Jakarta Sans 300, 17px, var(--text-secondary), centered, max-width 440px]
I'm always open to the right conversation — whether it's a role, 
a collaboration, or just an interesting problem.

[Two links, centered, with gap]
clairsun98@gmail.com ↗    LinkedIn ↗
[Plus Jakarta Sans 500, 15px, var(--accent), underline on hover]
```

**Background:** This section has `var(--bg-secondary)` background, `border-radius: 20px`, `padding: 80px 48px`, max-width 720px, centered in the page.

---

### 4.9 Footer (Illustrated)

This is the visual bookend of the site. The bottom of every page (home, other work, about) ends with the illustrated meadow/wildflower scene that mirrors the hero.

**Concept:** A wide illustrated landscape strip — the same warm painterly style as the hero — appears at the very bottom of the page. It should feel like the page is set in a world, not just a document.

**Implementation:**
```tsx
// Use this landscape image as a full-width bottom illustration:
// Option A: Static image — create a <img> with object-fit: cover, height ~200-280px, width 100%
// Option B: A CSS background with the same Midjourney video URL used as poster

// The illustration sits BELOW the copyright footer text
// Layout:
// [© 2026 Clair Sun        All Rights Reserved]   ← small, var(--text-tertiary), Plus Jakarta Sans
// [────────────────────────────────────────────]   ← 1px border
// [   illustrated meadow strip full width      ]   ← the illustration
```

For the illustrated strip: use this approach — a `div` with a warm gradient (`linear-gradient(to bottom, var(--bg-primary), #E8D5B7)`) as a fallback, with the actual illustration layered over using the existing video poster or a landscape image. If no static landscape image is available in the assets, use the SVG illustration approach: a simple CSS/SVG wildflower meadow silhouette in warm tones (`#E8D5B7`, `#C4A882`, `#8B7355` for stems and flowers). Keep it tasteful — the point is warmth, not complexity.

---

### 4.10 Notes → WritingPatterns

**Rename:** `Notes.tsx` → keep the filename but update the component name. This content is now part of the `sidework` view tab, not a separate tab.

**Content stays the same** (4 Alverse.design AI design pattern links). **Aesthetic reskin** to match the design system.

---

## 5. App.tsx — View Structure

Update the view state and routing:

```tsx
type View = 'home' | 'sidework' | 'about';

// View switching:
// 'home'     → Hero + ProjectGrid + OtherWorkPreview + Contact + Footer
// 'sidework' → ForFun (side projects + experiments) + WritingPatterns section + Footer
// 'about'    → About + Footer
// project detail → ProjectDetail (replaces any view)
```

Nav label mapping:
```
'home'     → "Projects" tab active
'sidework' → "Other Work" tab active
'about'    → "About" tab active
```

The `OtherWorkPreview` component on the home page receives `onSideWorkClick={() => { setView('sidework'); window.scrollTo(0,0); }}`.

---

## 6. Password Gate

The `PasswordGate` component is commented out in App.tsx. Keep it commented out during development.

When implementing for production, use an environment variable to control it:

```tsx
// In App.tsx:
const ENABLE_PASSWORD_GATE = import.meta.env.VITE_ENABLE_PASSWORD_GATE === 'true';

// Wrap conditionally:
{ENABLE_PASSWORD_GATE ? (
  <PasswordGate>
    <AppContent />
  </PasswordGate>
) : (
  <AppContent />
)}
```

Add to `.env.development`:
```
VITE_ENABLE_PASSWORD_GATE=false
```

Add to `.env.production`:
```
VITE_ENABLE_PASSWORD_GATE=true
```

**Do not implement the actual password logic** — just wire up the environment flag. Clair will set the password separately.

---

## 7. Component Cleanup

### Remove entirely:
- `TiltCard.tsx` — delete the file, remove all imports and usages
- The 3D perspective/tilt effect in `ProjectGrid.tsx`

### Keep as-is (do not touch):
- `BackToTop.tsx`
- `VideoPlayer.tsx`
- `figma/ImageWithFallback.tsx`
- All files in `src/app/components/ui/` (shadcn components — unused but harmless)
- `src/app/data/projects.ts` — **DO NOT MODIFY**

### Dependencies to add (if not present):
None needed. All required packages are already installed.

### Dependencies to remove (optional, non-blocking):
- `react-responsive-masonry` — no longer used after ProjectGrid rewrite
- `@mui/material` and `@emotion/*` — Figma Make bloat, can remove but not required

---

## 8. Content Reference

### Clair's actual contact info:
- Email: `clairsun98@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/clairsun/` *(use this URL — verify it's correct)*

### Key credentials for About page:
- Currently: Senior UX Designer, AI/ML · Amazon Web Services (East Palo Alto / Seattle)
- Previously: Founding Designer · C3.ai Generative AI Suite
- Previously: Data & Analytics Analyst · Deloitte Consulting
- Education: HCI · Carnegie Mellon University
- Awards: NY Product Design Awards (Gold, Kumo) · London Design Awards (Gold, Kumo) · UX Design Awards (Nominee) · Webby Award Nominee 2026 · A' Design Award Judge (Interaction Design)
- Co-author: Alverse.design (AI design pattern framework)

### Project stat blocks (for ProjectDetail):

**Amazon Quick Spaces (id: 1):**
| Stat | Value |
|------|-------|
| Total users | 73k+ |
| Ease of use | 72.46% |
| Task completion | 87.83% |
| Product avg ease | 62.25% (comparison) |

**Build with AI (id: 2):**
| Stat | Value |
|------|-------|
| GA users | 635k+ |
| Ease of use | 72.5% |
| Previous ease | 55% |

**C3 Generative AI (id: 3):**
| Stat | Value |
|------|-------|
| New companies in 2 days | 60 |
| Client companies | 25 |
| Industries | 19 |
| Revenue generated | $5M |

**Kumo (id: 5):**
- NY Product Design Awards — Gold
- London Design Awards — Gold
- UX Design Awards — Nominee
- Webby Award Nominee 2026

---

## 9. Implementation Order

Work in this sequence to avoid blocking dependencies:

1. **`fonts.css`** — swap fonts first, everything else depends on typography being right
2. **`index.css` / global CSS** — define all CSS custom properties (`--bg-primary`, etc.)
3. **`Navbar.tsx`** — redesign, update nav items to Projects/Other Work/About
4. **`App.tsx`** — update view state (`sidework`), add `VITE_ENABLE_PASSWORD_GATE` flag, wire `OtherWorkPreview`
5. **`Hero.tsx`** — redesign glass card and text content, retune animation timing
6. **`ProjectGrid.tsx`** — rewrite to editorial rows layout
7. **`ProjectDetail.tsx`** — layout redesign + stat blocks
8. **`OtherWorkPreview.tsx`** — build new component
9. **`Contact.tsx`** — rewrite with real content
10. **`Footer.tsx`** — rewrite with illustrated strip concept
11. **`About.tsx`** — build from scratch
12. **`ForFun.tsx`** — aesthetic reskin
13. **Delete `TiltCard.tsx`**, clean up imports

---

## 10. Quality Checks

Before considering any component done, verify:

- [ ] Uses only Playfair Display and Plus Jakarta Sans (no Inter, Poppins, Cormorant, system fonts)
- [ ] All colors use CSS custom properties, not Tailwind color classes (`text-gray-500`, `bg-white`, etc.)
- [ ] No hardcoded hex values except where CSS vars aren't appropriate
- [ ] No TiltCard imports anywhere
- [ ] `projects.ts` is unchanged — run `git diff src/app/data/projects.ts` and it should be empty
- [ ] All Dropbox media URLs preserved and working in VideoPlayer / img tags
- [ ] Mobile responsive: test at 375px, 768px, 1280px
- [ ] `VITE_ENABLE_PASSWORD_GATE=false` in `.env.development`
- [ ] AnimatePresence wraps view transitions in App.tsx
- [ ] `prefers-reduced-motion` respected in animations

---

## 11. Things NOT to Do

- Do not add new pages or routes — this is a SPA with view state
- Do not add a blog, CMS, or dynamic data fetching
- Do not use `localStorage` or `sessionStorage`
- Do not add analytics or tracking scripts
- Do not change `projects.ts` — not a single character
- Do not replace the Midjourney video URL in Hero.tsx
- Do not add emoji to the UI (the `:)` in section copy is fine as text)
- Do not use Tailwind's purple, blue, or green color classes anywhere
- Do not add loading states — all media loads naturally
- Do not build the actual password gate logic — just the env flag toggle

---

*End of CLAUDE.md — if anything is unclear, err toward the aesthetic: warm, editorial, confident, human. When in doubt, add more whitespace and make the type bigger.*
