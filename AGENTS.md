# Instructions for AI coding agents

Read `PROJECT_GUIDE.md` in full before changing anything. It holds the site's
structure, every piece of custom logic, the content and copy rules, and step by
step recipes for common changes.

Key rules:

- Content lives in `src/data/` (`workData.ts` for Work videos, `featuredWork.ts`
  for the four Home films). Change data there, not in components.
- Whatever is on `main` is live (Cloudflare Pages deploys it automatically).
  Run `npm run build` and make sure it passes before merging.
- Work layout rules (`src/components/WorkVideoGrid.tsx`): 16:9 films on top,
  9:16 reels below; never leave a single film alone on a row; a full-width lead
  only when a section's 16:9 count is odd.
- Home's four films also appear in Work > Commercials for visitors who did not
  see them on Home (session flag `seen-home-featured`). See guide section 8.4.
- Covers: prefer clean frames without burned-in text, saved in `public/thumbs/`.
- Copy: story-led titles; notes as `Brand, Product, Type`; "Utopia Brands" for
  Utopia work; no em dashes as connectors; no banned words (guide section 11).
- After changing content, update the snapshot in `PROJECT_GUIDE.md` section 13.
