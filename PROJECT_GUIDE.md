# Muneeb Arif Portfolio: Project Guide

Read this first. It explains what the site is, how it is built, every piece of
custom logic, the content rules, and step by step recipes for the changes that
come up most (adding, replacing and moving videos). It is written so a person or
an AI coding tool can pick up the project cold and make changes safely.

Live site: https://muneebarifai.com
Snapshot of content in this guide: 28 November 2026. The data files are always
the source of truth; update section 13 when you change content.

---

## 1. What this site is

A portfolio for Muneeb Arif, creative director and AI filmmaker. Positioning:
he directs stories; AI is the camera. The site should feel cinematic, premium and
editorial: restraint over decoration, never "template agency" or generic AI.

Most visitors arrive from a link Muneeb sends directly (usually the Work page),
so the Work page has to stand on its own.

---

## 2. Tech stack and running it

- React 18 + TypeScript, built with Vite 5
- Tailwind CSS 3 (design tokens are CSS variables, see section 5)
- Framer Motion (Home hero and closing animations), lucide-react icons
- React Router 6 (client side routing)
- No backend. The contact form posts to Web3Forms. Videos are YouTube embeds.

```bash
npm ci            # install
npm run dev       # local dev server
npm run build     # type check (tsc -b) + production build into dist/
npm run preview   # serve the production build locally
```

`npm run build` must pass before anything is merged. Running it rewrites
`tsconfig.tsbuildinfo`; do not commit that change (`git checkout -- tsconfig.tsbuildinfo`).

---

## 3. Deploying (how changes go live)

- Hosting: **Cloudflare Pages**, connected to this GitHub repo.
- **Whatever is on `main` is live.** Cloudflare rebuilds automatically on every
  push or merge to `main`, usually within one to two minutes.
- Every pull request also gets a Cloudflare preview build; it shows up as the
  "Cloudflare Pages" check on the PR.
- Workflow used so far: make changes on a working branch, open a PR into `main`,
  check the build, merge. Never push a failing build to `main`.
- If Cloudflare's build of `main` ever fails, the site keeps serving the last
  good version, so a bad build does not take the site down.
- To confirm a deploy is live: the HTML at muneebarifai.com references
  `assets/index-XXXX.js`. Compare that file name with the one `npm run build`
  prints locally; if they match, the live site has your change.
- If a visitor still sees an old version, it is their browser cache: open in a
  private tab, use "Open in Safari/Chrome" from in-app browsers (WhatsApp,
  LinkedIn, Instagram), or hard refresh (Ctrl/Cmd + Shift + R).

---

## 4. Folder map

```
index.html                  page shell, title, meta description, Google Fonts
public/
  hero.mp4                  Home hero background video
  thumbs/                   video cover images we created (see section 10)
  assets/                   images for galleries, services, about, thumbnails
src/
  App.tsx                   routes + shared Nav (rendered once, above routes)
  index.css                 design tokens (:root), component classes, animations
  data/                     ALL editable content lives here (see below)
    workData.ts             every Work video, the Work sections, parked videos, image galleries
    featuredWork.ts         "Selected Work" (4 films): shown on Home and at the top of Work
    services.ts             the 7 services
    about.ts                About page acts, method stages, trusted-by
    nav.ts                  nav links (Home, Work, Services, About, Contact)
  pages/                    one file per route
    Home.tsx  Work.tsx  MoreWork.tsx  Services.tsx  About.tsx  Contact.tsx  ComingSoon.tsx
  sections/                 Home page sections (Hero, Thesis, FeaturedWork, Director, ClosingCTA)
  components/               shared pieces (Nav, Footer, Lightbox, WorkVideoGrid, ...)
```

Rule of thumb: **content changes happen in `src/data/`**. Layout and behaviour
changes happen in `src/components/`, `src/pages/` and `src/sections/`.

---

## 5. Design system

- Colours are CSS variables in `src/index.css` (`:root`), exposed to Tailwind in
  `tailwind.config.js`. Use the tokens, not raw hex:
  - `surface` #101a30 page background, `heading` #f2ede4 text, `body` #b9c0cd
    secondary text, `gold` #d9a441 the single accent, `muted` #8a94a8 labels,
    `placeholder` #182444 empty media.
  - Older names still used in places: `ink`, `cream`, `ember`, `mist`.
- Fonts: **Almarai** (everything) and **Instrument Serif italic** (rare accent).
- Page container: `.site-container` with gutters 20px (phone), 24, 32, 48, 64px
  (desktop).
- Breakpoints (Tailwind): `sm` 640px, `md` 768px, `lg` 1024px. "Phone" in this
  guide means below 640px; the nav switches at 768px.
- Motion: tiles fade up as they scroll into view (`.work-reveal` +
  `.is-visible`, and `.reveal-body` on Home). Respect `prefers-reduced-motion`.
- Tone of the UI: navy, warm white, one gold accent, generous spacing, small
  uppercase tracked labels.

---

## 6. Pages

| Route | File | What it is |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero video, Thesis statement, Selected Work (4 films), Director, closing CTA, Footer |
| `/work` | `pages/Work.tsx` | Main portfolio: Video tab (Selected Work, Commercials, Short Stories) and Images tab |
| `/work/more` | `pages/MoreWork.tsx` | "Beyond the Reel": more Commercials and Short Stories, same layout |
| `/services` | `pages/Services.tsx` | 7 services from `data/services.ts`, editorial alternating layout |
| `/about` | `pages/About.tsx` | Banner, five "acts" story, The Method stepper, Trusted By |
| `/contact` | `pages/Contact.tsx` | Contact details + form (Web3Forms) |
| `/work/:slug`, `*` | `pages/ComingSoon.tsx` | Placeholder. No per-project pages exist; nothing links to them |

Shared on every page: `components/Nav.tsx` (top), `components/Footer.tsx`
(bottom, with LinkedIn and WhatsApp links), `components/ScrollToTop.tsx` (scrolls
to top on route change unless the URL has a `#section`).

### Video player (Lightbox)
`components/Lightbox.tsx`. Clicking any video tile opens a full-screen overlay
with a YouTube embed (`youtube-nocookie.com`, autoplay). Escape, the close button
or tapping outside closes it. Image galleries open in the same component with
arrows, swipe and a counter.

Back button: opening the player adds one browser history entry (same URL), so
the phone or browser **Back button closes the player** and leaves the visitor on
the same page at the same scroll position, instead of leaving the site. Closing
with X, Escape or a tap outside removes that entry, so the next Back works
normally.

### Contact form
`pages/Contact.tsx`. Fields: name, email, phone, service (options come from
`data/services.ts`), message, plus a hidden honeypot for bots. Submits to
Web3Forms, which emails the address in `CONTACT_EMAIL`. The Web3Forms access key
in the file is a public key by design.

---

## 7. Navigation logic

`components/Nav.tsx`, rendered once in `App.tsx` so it stays mounted.

- **Desktop (768px and up):** wordmark left, text links right, current page gold.
- **Phone and tablet (below 768px):** there is no hamburger menu. A second row of
  **button tabs** (Home, Work, Services, About, Contact) sits under the wordmark
  on every page, current page filled gold. This was a deliberate choice because
  visitors did not discover the hidden menu and thought the site was one page.
  - Each tab is a 44px tall tap area around a 32px pill. Below 370px wide the
    pills tighten so all five always fit.
- **Coupled numbers, keep in sync if the nav height changes:**
  - Nav height on phones is about 116px (64px row + 52px tabs).
  - `sections/Hero.tsx`: on phones the hero is `h-[calc(100dvh-7.25rem)]`
    (screen minus the nav) so the headline is on the first screen. Desktop hero
    stays `100dvh`.
  - Work section anchors use `scroll-mt-36` on phones (`md:scroll-mt-24` on
    desktop) so `#commercials` / `#short-stories` land below the nav.

---

## 8. Work page logic (the important part)

### 8.1 Data model (`src/data/workData.ts`)

```ts
type VideoItem = {
  videoId: string      // YouTube id
  title: string        // story-led title (see section 11)
  note: string         // "Brand, Product, Type"
  ratio: string        // '16/9' (horizontal) or '9/16' (vertical reel)
  thumbnail?: string   // cover image, see section 10
  category: 'commercial' | 'story'
}
```

Lists:
- `mainWorkVideos`: everything on `/work`
- `secondWorkVideos`: everything on `/work/more`
- `parkedVideos`: removed from the site but kept for later. Nothing renders it.
- `workSections`: the two sections in order, with label, line and URL slug:
  - `commercial` → "Commercials", slug `commercials`
  - `story` → "Short Stories", slug `short-stories` (deliberately not "AI Short
    Stories": the positioning is story first, AI is the camera)
- `sharedImages` (+ `posterImages`, `fominSlides`, etc.): the Images tab
  galleries, shown on both Work pages.

A video's **section** comes from `category`. Its **format** comes from `ratio`.
Its **position** is its order in the list, read left to right.

### 8.2 Grid rules (`src/components/WorkVideoGrid.tsx`)

Each section is laid out by `WorkVideoGrid`. Rules, in order:

1. **Horizontal (16:9) films first, vertical (9:16) reels below**, in every section.
2. **No row ever holds a single film**, apart from the full-width lead:
   - If the section has an **odd** number of 16:9 films, the first one is the
     **lead** (full width) and the rest pair up two per row.
   - If the number is **even**, there is **no lead**; every 16:9 film sits in a
     pair. Add or remove one 16:9 film and the lead appears or disappears by itself.
   - Pairs are two across at **every** screen size, phones included.
3. **Vertical reels:** one shared size, 3 across from 640px, or 4 across from
   1024px when the count divides by 4 (so four reels never leave one alone).
   On phones they become a **sideways swipe row**, with the next reel peeking in.
4. Within each format, order follows the list order in the data file.
5. Exception: `wideLayout="leadRow"` (used only by Selected Work) puts the first
   16:9 film full width and every other 16:9 film in one row below it (3 across
   from 640px, a swipe row on phones).

Phone tile styling (below 640px, in the `Tile` component in both Work pages):
smaller play button (36px), 15px titles, 10px notes, so pairs stay readable.

### 8.3 Section headings, "Up next" card and "See more" buttons

Section headings come from `components/WorkSectionHeader.tsx` (used by both Work
pages). The first section on the page gets a plain heading (on `/work` that is
Selected Work; on `/work/more` it is Commercials). Every later section renders as
an **"Up next" card** (gold "UP NEXT" label, section name, "7 films. <line>",
gold ↓ circle); tapping it scrolls that section to the top. This replaced a thin
divider line that made the page look finished after Commercials, so people
missed Short Stories.

Under each section on `/work` there is a gold-outlined **button** to the same
section on `/work/more`:
"See more commercials" → `/work/more#commercials`, "See more short stories" →
`/work/more#short-stories`. `MoreWork.tsx` reads the `#hash` on arrival and scrolls
to that section below the nav. A link only shows if `/work/more` has videos in
that category.

### 8.4 Selected Work section on the Work page

`/work` opens with a **Selected Work** section (heading "Selected Work", line
"Four films to start with.") showing the same four 16:9 films as Home, for
every visitor. They come straight from `src/data/featuredWork.ts`, so changing
Home's films changes this section too. Layout: the bathrobe film full width, the
other three in one row below (`wideLayout="leadRow"`). Commercials and Short
Stories follow, each opening with an "Up next" card.

History: an earlier version used a `sessionStorage` flag to show Home's films on
Work only to visitors who had not seen Home. Muneeb replaced it on 28 November
2026 with this always-visible section; someone coming from Home sees the three
films on both pages, which is intended. Selected Work films do **not** also
appear inside Commercials, so nothing repeats on the same page: when a film moves
into Selected Work, remove it from `mainWorkVideos`.

The page label at the top of `/work` reads "Work" (it used to read "Selected
Work", which clashed with this section).

Where the page starts: Home's "View all work" opens `/work#commercials`, and
`Work.tsx` scrolls to the `#hash` section on arrival (below the sticky nav), so
those visitors start at the "Up next: Commercials" card and can scroll up to
Selected Work. Every other way in (the Work tab, a shared link) has no hash and
starts at the top.

---

## 9. Home "Selected Work" logic

Data: `src/data/featuredWork.ts`, four entries, all **16:9**, in order. Each has
a Home `title`, a Home `category` label ("For [Brand]") and a Work `note`
("Brand, Product, Type") used by the Work page's Selected Work section.

- Entry 1 runs full width; entries 2 to 4 sit in one row below it (3 across from
  640px, a sideways swipe row on phones). Keep all four horizontal.
- Each tile opens the Lightbox. "View all work" links to `/work#commercials`, so
  visitors coming from Home start at Commercials (they have just seen Selected
  Work); Selected Work stays on the page above.
- Copy style is plain and descriptive: title "A ___ Ad", label "For [Brand]"
  (for example "A Bathrobe Product Ad" / "For NY Threads").
- The same four films appear at the top of `/work` (section 8.4).
- Two quilted pillow films are in the set, so their Home titles name the product
  difference: "A Quilted Cushion Ad" (pink set, sofa cushions) and "A Quilted
  Pillow Ad" (navy studio, bed pillow).
- Vertical reels no longer go on Home; they live in Work > Commercials.

---

## 10. Thumbnails (covers)

The cover is what people judge before pressing play, so it matters.

- Field: `thumbnail` on each video (Work) or project (Home).
- Two kinds of value:
  - A local file: `/thumbs/name.jpg` (stored in `public/thumbs/`). Preferred for
    anything important.
  - A YouTube image URL: `https://img.youtube.com/vi/<ID>/maxresdefault.jpg`.
- If missing or broken, the code falls back through YouTube sizes automatically
  (`videoThumb` and `thumbFallback` in `components/Lightbox.tsx`).
- Sizes: 16:9 covers at 1280×720 or larger; 9:16 covers at 720×1280 or larger.
- Frames YouTube publishes for any video (no video download needed):
  - `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg` (the default cover, 1280×720)
  - `.../maxres1.jpg`, `maxres2.jpg`, `maxres3.jpg`: frames at about 25%, 50%,
    75% through the film, 1280×720
  - For Shorts: `.../oar2.jpg` is the native **vertical** 1080×1920 cover. Use it
    for 9:16 tiles; the normal `maxresdefault` of a Short is a wide image with
    blurred side bars and looks soft when cropped.
- Picking rules used so far: no burned-in text or captions, no motion blur, a
  clear human moment or a premium product detail, cinematic over catalogue.
  When none of the published frames is good, export a frame from the master edit
  and save it into `public/thumbs/`.
- Known covers that still carry on-screen text (replace when a clean frame is
  available): A Quilted Cushion Ad (every published frame has text; the cover is
  the four-scene frame with "ON THE SOFA BY THE BED ANYWHERE"),
  What Your Pillow Has Seen ("Helps Keep Your Pillow Clean"),
  An Outdoor Pillows Ad ("PERFECT for Garden Benches"), Before the First Step,
  Winners Lose More, A Carnival Film. Clocked In, Checked Out is only 640×360.

---

## 11. Copy rules

Titles and labels are part of the work, not filler.

**Work tiles**
- Title: short, story-led, from a moment or tension in the film. Examples:
  "Dressed for Doing Nothing", "Pizza in Bed, No Regrets",
  "The Lamborghini Doesn't Take It Personally", "Sorted Before the Kettle Boils".
- Avoid two titles on the same page sharing an idea (for example two "first
  steps" titles, or two "spill" titles).
- Note: `Brand, Product, Type`, for example
  `Utopia Brands, Quilted Mattress, Amazon Sponsored Ad`. Use **Utopia Brands**
  (not "Utopia Bedding") for all Utopia work. Spec work: `Brand, Spec Ad`.
  Personal pieces: `Personal Concept, Short Film` (or the right type).

**Home tiles**: plain and descriptive, "A Bathrobe Product Ad" / "For NY Threads".

**Writing rules for any visible copy**
- Open with a moment, a tension or a specific detail; never a definition,
  statistic or headline-style hook.
- No em dashes or hyphens used as connectors; rewrite the sentence.
- Banned words: elevate, unlock, seamless, testament to, dive into, game changer,
  in today's landscape, at the end of the day, "it's not just X it's Y", level up,
  transform.
- No listicle copy, no emoji bullets, no three-word fragments for rhythm, no
  rhetorical question openings.
- The pitch stays implicit: show the work and the thinking.

---

## 12. Recipes

All video edits happen in `src/data/workData.ts` (Work) or
`src/data/featuredWork.ts` (Home). After any change: `npm run build`, check the
page, then merge to `main`.

**Add a video to Work**
1. Find the format: open `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`
   or check whether `https://i.ytimg.com/vi/<ID>/oar2.jpg` exists (it does for Shorts).
2. Pick the cover (section 10). Save it to `public/thumbs/` if it is a local file.
3. Add an entry to `mainWorkVideos` (or `secondWorkVideos` for See More) at the
   position you want, with `ratio` `'16/9'` or `'9/16'` and the right `category`.
4. The grid rules (section 8.2) handle the layout; no layout code changes.

**Replace a video**: replace its entry in place (same position), so everything
else stays where it is. Move the old entry into `parkedVideos` unless it should be
deleted for good.

**Move a video to the See More page**: cut its entry from `mainWorkVideos` and
paste it into `secondWorkVideos`.

**Remove but keep for later (park)**: move the entry into `parkedVideos`.
**Bring back**: move it from `parkedVideos` into the list you want.

**Reorder**: change the order of entries. Remember 16:9 and 9:16 are laid out
separately, and a section with an odd number of 16:9 films shows the first as
the full-width lead.

**Change a Selected Work film (Home and top of Work)**: edit
`src/data/featuredWork.ts`. Keep all four 16:9, fill `title`, `category` and
`note`, use local `/thumbs/` covers, and remove the film from `mainWorkVideos` if
it was there.

**Add an image gallery**: add the images under `public/assets/<name>/`, add an
array in `workData.ts`, then an item in `sharedImages` with `gallery`.

**Add or edit a service**: `src/data/services.ts` (image in `public/assets/services/`).

---

## 13. Current content snapshot (28 November 2026)

### Selected Work (`featuredWork.ts`): Home and the top of Work
| # | Title | Home label | Work note | YouTube | Cover |
|---|---|---|---|---|---|
| 1 | A Bathrobe Product Ad | For NY Threads | NY Threads, Bathrobe, Product Ad | TnX0blvHQgM | /thumbs/ny-threads-bathrobe.jpg |
| 2 | A Quilted Cushion Ad | For Utopia Brands | Utopia Brands, Quilted Cushion Pillow, Amazon Listing Film | 1MApmfzbJhY | /thumbs/utopia-quilted-cushion-pillow.jpg |
| 3 | A Fleece Blanket Ad | For Utopia Brands | Utopia Brands, Fleece Blanket, Amazon Sponsored Ad | ZlS4LiIu904 | /thumbs/utopia-fleece-blanket.jpg |
| 4 | A Quilted Pillow Ad | For Utopia Brands | Utopia Brands, Quilted Pillow, Amazon Listing Film | UEplfTsxxeo | /thumbs/utopia-quilted-pillow.jpg |

(Film 4 was "Worth Holding On To" in Commercials before it moved here.)

### Work, Commercials (`mainWorkVideos`, category `commercial`), in display order
16:9 (eight, so no lead; four pairs): Dressed for Doing Nothing (OGmYTN0-q6U),
Throw Everything at It (s2u_Iw9g_a0), Everything Waits for 11.11
(V17p-69EF04), Where the Long Day Ends (0RMtduDUdOE), The Last Listing You Open
(DEpcdM3Divc), What Your Pillow Has Seen (0emVRApaPLo), Pizza in Bed, No Regrets
(8bfadufmMYo), Before the First Step (2MDqA--HfGw).
9:16, first row: A Meta Ad (52Dcns0JX9k, OpenArt AI), A Launch Hype Reel
(xJFqm9V3RcY, UK brand website), An Outdoor Pillows Ad (2c0kI6zEkhg, Utopia
Brands). Second row: Sorted Before the Kettle Boils (BfaJzmyYOHw), The Sheet That
Actually Fits (JRavp3hUfTM), Her Routine, Restocked (hDJfkR8eR2s).

### Work, Short Stories (category `story`)
16:9: Winners Lose More (_P1JNmNTNK0), Even the Miseries Are Beautiful
(ZeVKkwKtJW4), Clocked In, Checked Out (WFrwbl6JVcI), The Lamborghini Doesn't
Take It Personally (crj1sgEz2AI). 9:16: A Carnival Film (KLBiubarXFY), I Asked
ChatGPT About You (I_5153StFJY), Caught in 4K (76lDopB_nqE).

### See More (`secondWorkVideos`)
Commercials 16:9: A Reason to Fly Home (vGgxMBdk0Dg, lead), Something in the
Water (Vy3EzZwrGD4, eyeliner Halloween spec), She Was There for All of It
(LrDN9PQKIEk, Mother's Day). 9:16: Spills Meet Their Match, Never Getting Up
Again, Made to Move, Made for the Loop.
Short Stories 16:9: Karachi in June, The Beautiful Game, On Paper.

### Parked (`parkedVideos`, not shown)
Warm Enough to Stay In, Fluff It Back to Life, Threads Worth Wearing, Small
Hands, Sorted, Every Kitchen Has One, Sink Right In.

---

## 14. Known issues and backlog

- Services copy (`data/services.ts`) and the browser tab title (`index.html`)
  still contain em dashes, which break the writing rules.
- Unused duplicate assets (nothing in `src/` references them): `public/assets/service/`
  (duplicate of `services/`), the `.jpg.jpeg` copies, `public/thumbs/motoreasy.jpg`,
  `motoreasy-thumb.jpg`, `motoreasy-thumb.png`, `lumiere.jpg`, `lumiere-thumb.jpg`,
  `carnival.jpg`, and everything in `public/assets/thumbnails/` except
  `lumiere-thumb.jpg` (used by The Sheet That Actually Fits).
- `vite.config.js` / `vite.config.d.ts` duplicate `vite.config.ts`; build cache
  files `tsconfig*.tsbuildinfo` are committed.
- `Work.tsx` and `MoreWork.tsx` duplicate the `Tile` component; a shared
  component would avoid editing both.
- The video Lightbox uses one fixed frame for every format; vertical videos sit
  inside black bars. A format-aware player with next/previous was proposed.
- `/work/:slug` project pages do not exist yet (placeholder route only).
- Covers with on-screen text, listed in section 10.

---

## 15. Change history (pull requests)

| PR | Change |
|---|---|
| #1 to #4 | Original build: richer dark styling, mobile hero gradient, Home statement reveal, contact form on Web3Forms |
| #5 | Work split into Commercials and Short Stories; gap-free grid; new films and copy; Home reels swapped |
| #6 | One box size per format on Work |
| #7 | Lead film back; "See more" link per section that opens the matching section |
| #8 | Phone nav button tabs replace the hamburger; Home reels swipe row on phones; hero fits below the nav |
| #9 to #11 | NY Threads bathrobe film leads Home, copy and cover; Mother's Day film moves to Work |
| #12 | UK launch hype reel on Home; Motoreasy to Work; Loop Coffee to See More |
| #13, #14 | Utopia bathrobe and mattress protector films; better covers |
| #15 | Quilted pillow and bamboo mattress protector films; rule: no single-film rows |
| #16 | Home's four films folded into Work Commercials for direct visitors (session flag) |
| #17 | Utopia quilted mattress film; pillowcases and Mother's Day shift |
| #18 | "Utopia Brands" label everywhere |
| #19 | Work films two per row on phones; smaller phone play button and labels |
| #20 | This project guide, AGENTS.md and CLAUDE.md |
| #21 | "See more" becomes a button; later sections open with an "Up next" card |
| #22 | Selected Work becomes three 16:9 films (bathrobe, quilted pillow, fleece) on Home and at the top of Work for everyone; session logic removed; the three reels move to Work Commercials; Work page label becomes "Work" |
| #23 | Selected Work grows to four 16:9 films (bathrobe lead + a row of three); Worth Holding On To moves from Commercials into it as "A Quilted Pillow Ad"; the pink-set film is renamed "A Quilted Cushion Ad" |
| #24 | Home's "View all work" opens /work#commercials; Work scrolls to a #section on arrival |
| #25 | Back button closes the video or gallery player instead of leaving the site |
