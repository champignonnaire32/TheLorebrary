# The Lorebrary - Changelog

**[AI INSTRUCTIONS FOR UPDATING THIS FILE]**
*   **Location:** Always add the newest entry at the VERY TOP of the log (immediately below this instruction block and above the previous entries).
*   **Format:** Every entry heading must include the **Date**, the **Topic**, and the **Name of the AI** that completed the work (e.g., `## [May 1, 2026 - Feature Name] (by Gemini)`).
*   **Content:** Keep entries concise and bulleted. 

## [May 3, 2026 - Oathbringer Audit & Interlude Overhaul] (by Gemini)
*   **Numbering Fix:** Corrected a labeling error where "On the Ground Looking Up" was marked as Chapter 40; it has been correctly updated to Chapter 41. This resolved a "double Chapter 40" issue in the Part Two summaries.
*   **Sequencing Fix:** Resolved a major sorting bug where the Chapter 88-91 chunk (previously mislabeled `X-91`) was appearing at the start of the book list. Renamed the raw file to `Chapter88-91_Summary.md` to ensure correct `startChapter` derivation.
*   **Interlude Labeling:** Converted generic "Interludes" headers to individual, descriptive labels (e.g., `### Interlude I-1: Puuli`) for all 14 interludes in the book.
*   **Content Completion:** Added missing summaries for Interlude I-9 (*True Labor Begins*) and Interlude I-11 (*Her Reward*) to the Part Three interlude group, ensuring 100% narrative coverage.
*   **Consistency Fix:** Renamed `Chapter54-Interludes_Summary.md` to `Chapter54-57_Summary.md` for cleaner sorting and better range clarity.
*   **Ingestion:** Re-ran `split-summaries.js` to propagate all labeling and sequencing fixes to the live content collection.

---

## [May 3, 2026 - Wind and Truth Content Completion] (by Gemini)
*   **Content Ingestion:** Added missing chapter summaries for *Wind and Truth* (Chapters 121-125 and 138-142).
*   **Consistency Fix:** Ensured all chapters for the final book in the Stormlight Archive are now present and correctly ordered.

---

## [May 3, 2026 - Wind and Truth Chapter Order Fix] (by Gemini)
*   **Chapter Ordering Fix:** Resolved a critical sequencing bug in *Wind and Truth* where the "Interlude 12" chunk was appearing prematurely after Chapter 13.
*   **Metadata Correction:** Updated `startChapter` for `Interlude12-Chapter81_Summary.md` from `12` to `78` to ensure correct numerical sorting.
*   **Prologue Normalization:** Set `startChapter: 0` for the Prologue chunk to guarantee it remains the first entry in the book list.
*   **Verification:** Cross-referenced all 33 chunks for the book and verified a seamless narrative progression from Chapter 1 through the Epilogue.

---

## [May 3, 2026 - UI Polish & Floating Button Fix] (by Claude)
*   **Landing Page Hero Card:** Split the title/tagline into its own gold-background card (ink text, flanking ink rules) visually separate from the body copy. Applied same treatment to the Archive page.
*   **Archive Search Bar:** Moved search bar from directly under the hero card to between the Continue Reading strip and the series grid.
*   **Continue Reading Strip:** Thickened divider lines and added matching bottom rule to visually isolate the section.
*   **Chapter Range Dividers (Full Recap):** Made the between-chunk dividers much larger and more visible — 16pt Cinzel gold text, 2px gold gradient rules, fully opaque.
*   **Book Index Page:** "Support the Author / Buy the Book" trigger button repositioned to top-right of header on desktop; flows below subtitle on mobile. Popup panel stretches full-width on mobile.
*   **Prev/Next Chapter Buttons:** Made compact and side-by-side on mobile instead of full-width stacked.
*   **Floating "Up" Button:** Replaced the "Go Back" navigation button with a scroll-to-top button. Required significant debugging — the button was being hidden (`display: none`) by the browser/network's built-in annoyance content filter. Root cause: `aria-label="Back to top"` is a standard cosmetic filter target in EasyList Annoyances, compounded by `bottom-6 left-6` matching known overlay patterns. Fix: changed `aria-label` to `"Navigate up"`, label text to "Up", and position to arbitrary `bottom-[25px] left-[25px]` to break the pattern match. Implemented as a React island (`TopButton.tsx`) to match the proven `ReaderControls` FAB architecture.

## [May 2, 2026 - Mistborn: Era Two Ingestion] (by Gemini)
*   **Series Ingestion:** Added "Mistborn: Era Two" (The Wax and Wayne Series) to the Lorebrary. Imported all 4 books: *The Alloy of Law*, *Shadows of Self*, *The Bands of Mourning*, and *The Lost Metal*.
*   **Content Standardization:** Applied stylized naming ("Mistborn: Era Two") across all frontmatter. Set chronological `bookOrder` (1-4) and performed a global `sed` update to ensure title consistency.
*   **Orphaned Chapter Merging:** Manually merged "Epilogue 6-7" into "Epilogue 1-5" for *The Lost Metal* per the project's 15-sentence density and length standards.
*   **Chronological Ordering Fix:** Resolved a spoiler bug in *The Alloy of Law* where the Epilogue appeared at the start of the book list due to a `startChapter: 0` error; corrected to `startChapter: 21`.
*   **Metadata & SEO:** Authored a professional, high-density SEO blurb for the series in `series-metadata.ts` focusing on the industrial setting and magic system evolution.
*   **Build & Deploy:** Verified the full site build (677 pages) and pushed to production.

## [May 2, 2026 - Mistborn Era One Ingestion] (by Gemini)
*   **Series Ingestion:** Added "Mistborn: Era One" to the Lorebrary. Copied the generated summaries for *The Final Empire*, *The Well of Ascension*, and *The Hero of Ages* into the `raw-summaries` directory.
*   **Pipeline Updates:** Updated `split-summaries.js` with the correct book ordering and title casing for the Mistborn novels to ensure clean parsing.
*   **Metadata Configuration:** Added author, genre, and an SEO-optimized blurb for the series into `series-metadata.ts`.
*   **Build Verification:** Successfully ran the ingestion script and verified the local build. Confirmed the "Next Book" and "Purchase" buttons automatically populate correctly for the new titles.

## [May 2, 2026 - Mistborn Era 1 PDF Splitting] (by Gemini)
*   **PDF Splitting:** Adapted the `smart_pdf_splitter.py` logic to handle the three-book Mistborn Era 1 PDF.
*   **Folder Structure:** Created individual folders for *The Final Empire*, *The Well of Ascension*, and *The Hero of Ages* in `/Users/flynnp/Desktop/Mistborn Era One/`.
*   **Content Chunking:** Successfully generated 5-chapter markdown files for all three novels in the series.

## [May 1, 2026 - Inheritance Cycle Splitter Standardization] (by Gemini)
*   **Splitter Standardization:** Created `smart_pdf_splitter-inheritance.py` with coordinate-based detection (Y ≈ 98.175) to handle the specific layout of "The Inheritance Cycle" PDFs (Eragon, etc.).
*   **Interactive Command Tool:** Added `PDF_Splitter-Inheritance.command` to the `Splitter Commands` folder on the Desktop. This tool is interactive, allowing for drag-and-drop PDF processing and custom output selection to match existing project workflows.
*   **Convention Alignment:** Renamed and relocated all temporary files to align with the established naming patterns (`smart_pdf_splitter-[series].py` and `PDF_Splitter-[Series].command`).

## [May 1, 2026 - Purchase Buttons, UI Polish & Content Fixes]
*   **Purchase Buttons:** Added "Get the Book" section to every book index page (`/[series]/[book]/`) with auto-generated Bookshop.org and Barnes & Noble search links built from `bookName`. Includes Libby library note. Amazon intentionally excluded. Both buttons use solid gold fill; Bookshop.org listed first with "supports indie bookshops" caption to subtly signal preference.
*   **Book Index Page Tagline:** Replaced generic "Select a chapter range below..." with "Pick up where your memory left off." across all book index pages.
*   **Mega-Catchup Card Redesign:** Shrunk from full-width to `max-w-xs`, centered on page, text block centered to the right of the book icon, "Mega-Catchup" label removed from inside the card.
*   **"You've Finished This Book" Card on Full Recap:** Added the next-book card and "You've finished this book" label to `full.astro` — previously only appeared on individual chapter pages. Requires `getStaticPaths` to build the series book order map.
*   **Next Book Card Width Fix:** Narrowed the next-book card on chapter pages from `w-full` to `max-w-sm mx-auto`.
*   **Iron Flame Content Fixes:** Replaced revised `Chapter36-40_Summary.md`, re-ran ingestion script. Also committed pre-existing Gemini edits to Iron Flame raw files: fixed wrong chapter numbers in `Chapter56-60` (were labeled Chapter 6–9), removed stale Distiller Archive header from `Chapter16-20`, minor cleanup in `Chapter1-5`.
*   **Series Ideas File:** Generated `lorebrary-ideas.md` on the Desktop with a tiered priority list of series to add next (ACOTAR, Eragon, Mistborn, Wheel of Time, etc.) based on upcoming adaptations and releases.
*   **Documentation Updates:** Added purchase button documentation to `workflow.md` (checklist step 6), `system-architecture.md` (full technical section), and `thelorebrary-disclaimer.md` (good-faith one-liner). Added ISBN future upgrade path to `roadmap-and-design.md`.

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