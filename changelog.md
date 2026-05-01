# The Lorebrary - Changelog

All notable changes, accomplishments, and updates to this project will be documented in this file.

## [May 1, 2026 - Purchase Buttons, UI Polish & Content Fixes]

*   **Purchase Buttons:** Added "Get the Book" section to every book index page (`/[series]/[book]/`) with auto-generated Bookshop.org and Barnes & Noble search links built from `bookName`. Includes Libby library note. Amazon intentionally excluded. Both buttons use solid gold fill; Bookshop.org listed first with "supports indie bookshops" caption to subtly signal preference.
*   **Book Index Page Tagline:** Replaced generic "Select a chapter range below..." with "Pick up where your memory left off." across all book index pages.
*   **Mega-Catchup Card Redesign:** Shrunk from full-width to `max-w-xs`, centered on page, text block centered to the right of the book icon, "Mega-Catchup" label removed from inside the card.
*   **"You've Finished This Book" Card on Full Recap:** Added the next-book card and "You've finished this book" label to `full.astro` — previously only appeared on individual chapter pages. Requires `getStaticPaths` to build the series book order map.
*   **Next Book Card Width Fix:** Narrowed the next-book card on chapter pages from `w-full` to `max-w-sm mx-auto`.
*   **Iron Flame Content Fixes:** Replaced revised `Chapter36-40_Summary.md`, re-ran ingestion script. Also committed pre-existing Gemini edits to Iron Flame raw files: fixed wrong chapter numbers in `Chapter56-60` (were labeled Chapter 6–9), removed stale Distiller Archive header from `Chapter16-20`, minor cleanup in `Chapter1-5`.
*   **Series Ideas File:** Generated `lorebrary-ideas.md` on the Desktop with a tiered priority list of series to add next (ACOTAR, Eragon, Mistborn, Wheel of Time, etc.) based on upcoming adaptations and releases.
*   **Documentation Updates:** Added purchase button documentation to `workflow.md` (checklist step 6), `system-architecture.md` (full technical section), and `thelorebrary-disclaimer.md` (good-faith one-liner). Added ISBN future upgrade path to `roadmap-and-design.md`.

## [May 1, 2026 - Documentation & Workflow Overhaul]
*   **Documentation Restructuring:** Modularized the monolithic `GEMINI.md` into a token-efficient, lazy-loading structure (`thelorebrary-overview.md`, `workflow.md`, `roadmap-and-design.md`, `system-architecture.md`, `changelog.md`, `thelorebrary-disclaimer.md`, `the-distiller-engineering.md`).
*   **Workflow Refinement:** Updated `workflow.md` to explicitly include sanity checks for chapter numbering and orphaned chapters, stringent "Next Book" button verification, and a comprehensive SEO strategy section.
*   **AI Context Routing:** Established a strict "Context Routing Guide" in the overview file to dictate exactly which files future AI instances should read or update, preventing "junk drawer" clutter.
*   **Distiller Pipeline Hardening:** Moved the Python prompt dependencies (`chapter-summary-expectations.md`, `chapter-summary-initial-instructions.md`) into the project directory and safely updated the Desktop `.command` scripts to prevent pipeline breakage.
*   **Consolidated Ideas:** Integrated the floating `lorebrary-ideas.md` series list directly into `roadmap-and-design.md` and removed the redundant Desktop file.

## [Prior Accomplishments - Setup Phase]
*   Initialized the Astro project with React and Tailwind integrations.
*   Established the global layout (`Layout.astro`) and base styling.
*   Wrote the `split-summaries.js` script to perfectly parse the unique "stamped" Markdown output from the Python pipeline.
*   Built the dynamic routing system to group atomic chapters into chunks of 5 per page.
*   Implemented Tailwind Typography for a book-like reading experience (indented paragraphs, optimal line-height).
*   Built a custom React floating action button (`ReaderControls.tsx`) that toggles Dark / Sepia / Light mode and adjusts root font size across the site.
*   Fixed the Tailwind v4 dark mode class variant issue across all pages.
*   Ingested the rest of the Sun Eater series (Howling Dark, Demon in White, Kingdoms of Death) and refactored the ingestion script to handle multiple books/series dynamically.
*   Ingested the Dune series (Books 1-6), The Stormlight Archive (Books 1-3), the Red Rising series (Books 1-6), The Lord of the Rings (Books 1-3), Harry Potter (Books 1-7), The Empyrean Series (Books 1-3: Fourth Wing, Iron Flame, Onyx Storm), and His Dark Materials (Books 1-3: The Golden Compass, The Subtle Knife, The Amber Spyglass).
*   Implemented proper `bookOrder` routing sorting and updated the UI to display "Book X" instead of "Volume".
*   Built a smart, fuzzy-search component (`SearchBar.tsx`) powered by `fuse.js` on the homepage to find series and books.
*   Injected dynamic SEO meta tags (Title, Description, OpenGraph, Twitter Cards) targeting "Panic Recap" keywords into the layout templates.
*   Implemented Advanced SEO: auto-generated `sitemap.xml`, `robots.txt`, and Canonical URLs to explicitly guide search crawlers.
*   Full visual identity overhaul — Cinzel/Lora fonts, ink/cream/gold palette, sepia mode.
*   Reader QoL suite — read-state tracking, checkmark badges, progress bar, Continue Reading strip, keyboard nav, breadcrumbs, share button.
*   Series metadata system (`series-metadata.ts`) — author, genre, blurb per series; displayed on archive cards and series index pages.
*   Mega-Catchup (`/full`) static route for full-book continuous scroll.
*   "Next Book" navigation card at the end of each book's final chunk.
*   Custom 404 page.
*   Overhauled legal disclaimers with materially stronger Fair Use language.
*   Project renamed to **The Lorebrary** — updated in Vercel, GitHub, site title, and all page headings.
*   Custom SVG favicon — gold book icon on ink-dark rounded square (replaces Astro default).
*   Landing page split into two visual zones: Hero card (tagline + Enter button + project description) and a separate dashed-border Legal Notices card below it.
*   Floating chapter banner — fixed bar at top of viewport on reading pages showing the current chapter range. Appears only after the page header scrolls out of view. Live on both `[range].astro` and `full.astro`.
*   Fixed mobile padding root cause — `<main class="flex-1 p-8">` in `Layout.astro` was adding 32px to every page; changed to `p-0` and let each page control its own spacing.
*   Fixed `split-summaries.js` — sentence count annotation stripping now handles `**Sentence Count Check:** 15` format (closing `**` before the number); added `headingTitleCase()` to fix ALL CAPS headings (affected His Dark Materials ingestion).
*   Revised Fourth Wing chapters 31-35 summary and resolved git staging issue (Gemini-swapped file wasn't staged; committed and pushed manually).