# SEAM

Where the right talent meets the right startup.

React + TypeScript + Vite, with a public homepage and interactive, browser-local Talent and Startup products. No backend, authentication, database, messaging or payments.

## Run and validate

Use Node 24 LTS:

```sh
npm install
npm run dev
```

Checks:

```sh
npm run build
npm run lint
```

## Routes

| URL | Experience |
| --- | --- |
| `/` | Existing public Talent-focused homepage |
| `/for-startups` | Preserved public startup homepage |
| `/startup` | Founder overview and workspace summary |
| `/startup/talent` | Matched talent, need filters and shortlist |
| `/startup/projects` | Project publishing and submission review |
| `/startup/roles` | Open/draft roles and their matches |
| `/startups/*` | Compatibility redirects to `/startup/*` |
| `/talent` | Talent overview, identity, video, profile strength and sample matches |
| `/talent/opportunities` | Searchable opportunities and industry filters |
| `/talent/micro-projects` | Micro-project briefs and workspaces |
| `/talent/my-seam` | Editable identity, portfolio, proof and learning plan |
| `/about`, `/privacy`, `/terms` | Existing public informational pages |

Each product uses its own shared top bar. The public navbar remains on `/`, `/for-startups` and informational pages. Header/footer links distinguish public storytelling from the interactive products. The Startup workspace is loaded as a separate route chunk.

## Working product interactions

- Edit name, direction, career stage, location, availability, skills, interests and goals.
- Preview a demo introduction structure; choose a video filename to simulate replacing it. Video bytes are never read, stored or uploaded.
- Explore five fictional startups, filter by industry/search, inspect fit reasons and gaps, and express interest locally.
- Prepare for each role with four tailored questions and saved practice notes.
- Start three sample micro-projects, save a draft/link, view a seven-day demo deadline in Sydney time, and simulate submission.
- View submitted work in My SEAM. Work-sample counts update, but new submissions remain awaiting review and unverified. Existing completed proof and founder feedback are explicitly sample content.
- Add Product Analytics or Customer Discovery to a targeted learning plan.

Native modal dialogs support focus containment, Escape and focus restoration. Mobile routes and dialogs adapt to small screens; transitions respect reduced motion.

## Local persistence

`src/lib/talentStorage.ts` reads and validates `seam.talent.v1` in localStorage. It stores profile fields, selected video filename, opportunity interest IDs, project status/start time/draft/submission, learning-plan items and per-question interview notes. Long notes and empty question positions are preserved.

Malformed or incompatible data falls back to the sample state. If browser storage is blocked or full, the app stays usable in memory and shows a session-only notice. Data is not shared across devices, users or browser profiles. Clearing this localStorage key resets the demo.

Fit scores are fixed sample values and do not recalculate after profile edits. The profile-strength indicator is illustrative and changes with local work submissions. No founder is contacted and no real review or verification takes place.

## Startup workspace

`/startup` provides a separate founder workspace for the fictional Forma team. The original public founder homepage remains at `/for-startups`; `/startups` and nested paths redirect compatibly to the product.

Working interactions:

- Post a need with a plain-language description, commitment, type and selected skills. A brief analysis transition leads to a suggested role and matched sample people.
- Deterministic matching selects one of four tracks: design (6 profiles), frontend (4), AI (9), and growth (3). Full-time requests return no matches because the sample pool is part-time. This is not an AI service or real ranking system.
- Save a suggested need as an open role, filter discovery by the need, search talent, shortlist/unshortlist and view richer profile/video previews.
- Save a conversation or role invitation locally. No email or message is sent.
- Publish a local micro-project, or turn a need into a prefilled project brief.
- Explore six sample onboarding submissions, with three top outputs shown first. Open the clickable work prototype, read notes, inspect demonstrated skills, open the profile/video preview and save or edit founder feedback.
- Saved feedback changes review status/counts and also appears on the candidate's profile.
- Open roles show matched people; the sample Frontend Builder role is explicitly a draft, giving an initial summary of 2 open roles, 3 projects, 11 unique strong matches and 4 shortlisted profiles. Counts derive from the records and local actions.

`seam.startup.v1` stores shortlists, invitations, posted needs, active need filter, locally published projects/roles and founder feedback. Schema guards filter malformed records and unknown candidate IDs. Blocked storage falls back to memory with a visible notice.

The Startup and Talent namespaces are independent. Actions do not sync between devices, browser profiles, or the two fictional workspaces. Video previews contain illustrative portfolio content, not hosted recordings. Saving a founder review is not a real-world verification. Unsaved form drafts are not persisted.

## Source map

- `src/pages/talent/TalentApp.tsx`: product state, route composition and panel actions
- `src/components/talent/TalentHeader.tsx`: product navigation
- `TalentViews.tsx`: overview, discovery, micro-project list and My SEAM
- `TalentPanels.tsx`: fit details, interview prep, workspace, profile editor and video interaction
- `TalentDialog.tsx`: accessible native dialog shell
- `src/data/talent.ts`: typed fictional product data and default profile
- `src/lib/talentStorage.ts`: guarded versioned persistence and safe deliverable links
- `src/styles/talent.css`: product-specific styles
- `src/pages/startup/StartupApp.tsx`: founder state, routes and panel actions
- `src/components/startup/StartupHeader.tsx`: founder navigation
- `StartupViews.tsx`: overview, discovery, project/results lists and role matches
- `StartupForms.tsx`: need form, deterministic analysis display and project creation
- `StartupPanels.tsx`: rich profiles, video previews and submission feedback/invites
- `WorkPreview.tsx`: submission thumbnails and interactive example prototype
- `src/data/startup.ts`: typed fictional talent, needs, roles, projects and submissions
- `src/lib/startupStorage.ts`: separate versioned founder persistence
- `src/styles/startup.css`: orange-led product styles, responsive layout and reduced motion
- `src/pages/LandingPage.tsx` and `src/components/story/`: preserved public storytelling
- `src/components/brand/BrandLogo.tsx`: approved logo and optional partner asset

## Vercel

`vercel.json` selects Vite, builds with `npm run build`, serves `dist`, and adds the SPA deep-link fallback described in [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas). No environment variables are required.

Deploy this repository with the Vite preset and repository root as the project root. The configuration is prepared for deployment; no hosted deployment has been created by this task.

## Brand and placeholders

The final logo loads from `/brand/seam-logo.png`. The existing navbar/footer use the shared artwork. Place the official UTS Startups asset at `public/brand/partners/uts-startups.png`; its text lockup remains until the image is supplied. Public contact details and legal policies remain placeholders pending supplied copy.

No Git commit is included.

## Public MVP deployment checklist

- Import GitHub repository `snehamsinha/SEAM-` into Vercel.
- Framework preset: **Vite**. Root directory: repository root (`./`).
- Node.js: **24.x**, also pinned in package.json.
- Install command: `npm ci`. Build command: `npm run build`. Output: `dist`.
- No environment variables, backend, functions or databases are required.
- Keep the SPA rewrite in `vercel.json`; do not enable `cleanUrls` or override the output directory.
- `npm run preview` serves the built demo locally for final route and interaction checks.

The exact site title and description are defined in `index.html` and remain consistent across routes. The approved PNG is optimized for its display size, and the favicon uses the approved emblem.

A subtle **Reset demo** control is available in public and product footers. Confirmation clears only versioned `seam.talent.*` and `seam.startup.*` browser storage, reloads the homepage, and restores original mock data on the next workspace visit. Other site storage is retained. If storage is blocked, the reset dialog reports that condition rather than pretending to clear data.

Both products load as separate route chunks. A recovery boundary handles render/chunk failures; malformed URL fragments and incomplete local data do not crash the demo. Native dialogs support Escape and focus restoration, and reset is keyboard-accessible.

Before deployment, review the remaining public Privacy/Terms placeholder copy. Video portfolios and founder feedback remain clearly illustrative; no real recordings, invitations, applications or verification are sent or stored on a server.

No commit or deployment was performed automatically. When ready:

```sh
git status
git add .
git commit -m "Build SEAM MVP"
git push
```
