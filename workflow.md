# The Lorebrary - Workflow

## 🚀 Deployment & Git Workflow

**How the pipeline works:**
GitHub (`main` branch) → push → Vercel detects the push → auto-builds and deploys within ~1-2 minutes.

**GitHub repo:** `https://github.com/champignonnaire32/TheLorebrary`
**Live site:** Vercel project "thelorebrary" (custom domain or `.vercel.app` URL)

### Making a change and pushing it live

```bash
# 1. Stage the changed file(s)
git add src/path/to/changed-file.astro

# 2. Commit with a message
git commit -m "describe what changed"

# 3. Push to GitHub — Vercel auto-deploys from here
git push
```

After pushing, go to the Vercel dashboard to watch the build. It typically goes live in under 2 minutes.

### Common gotchas

**"Your branch is up to date with 'origin/main'" does NOT mean your files are clean.**
It only means your local branch pointer matches the remote. If you edited a file, it still needs to be staged (`git add`) and committed before it will push. Run `git status` to see the actual state of your working directory.

**Always quote paths that contain brackets `[ ]`:**
The shell interprets `[series]` as a glob pattern. Always wrap these paths in single quotes:
```bash
git add 'src/pages/[series]/[book]/[range].astro'   # correct
git add src/pages/[series]/[book]/[range].astro      # will silently do nothing
```

**CSS/style changes may not appear immediately after deploy.**
Vercel CDN caches assets aggressively. If a style change looks absent on the live site, do a hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows).

**Gemini-swapped files still need to be committed.**
If Gemini replaces a file on disk, git detects it as "modified" but does NOT auto-stage or push it. You must still run `git add` + `git commit` + `git push`.

### Editing content vs. editing the site

| What you want to change | File(s) to edit |
|---|---|
| A chapter summary | `src/data/raw-summaries/[series]/[book]/ChapterXX-XX_Summary.md`, then run `node scripts/split-summaries.js` and re-commit `src/content/summaries/...` |
| Author, genre, or blurb for a series | `src/data/series-metadata.ts` |
| Archive or landing page layout/text | `src/pages/archive.astro` or `src/pages/index.astro` |
| Site-wide layout (nav, fonts, theme) | `src/layouts/Layout.astro` |
| Color tokens / typography | `src/styles/global.css` |
| Reader controls (dark/sepia/font size) | `src/components/ReaderControls.tsx` |

---

## ➕ Adding a New Book or Series (Required Checklist)

*Note: This assumes you have already run the Distiller Python pipeline to prepare the raw Markdown files in `/src/data/raw-summaries/`.*

**Steps:**

1.  **Ingest the Data:** Run `node scripts/split-summaries.js` to parse and ingest the raw chunks into `/src/content/summaries/`.
2.  **Sanity Check - Chapter Numbering:** Review the newly generated files in `/src/content/summaries/`. Ensure the chapter ranges make logical sense (e.g., `1-5`, `6-10`). Look closely for nonsensical numbers, stray letters, or Roman numeral parsing errors that a non-AI script might have accidentally lumped into the metadata.
3.  **Sanity Check - Orphaned Chapters:** Check the final chunk of the book. If it is only a single chapter (e.g., `41-41`), manually combine its content into the previous chunk (making it `36-41`) and delete the orphaned single file. This ensures a consistent reading length for the final page.
4.  **Update Series Metadata (New Series Only):** Open `src/data/series-metadata.ts` and add a new entry:
    ```typescript
    'Exact Series Name As It Appears In Frontmatter': {
      author: 'Author Full Name',
      genre: 'Fantasy' | 'Science Fiction',
      blurb: 'Five sentences about the series...',
    },
    ```
    *(The key must exactly match the `series:` field in your markdown frontmatter).*
5.  **Verify "Next Book" Navigation:** 
    *   **Previous Book Check:** By adding this new book, the *previous* book in the series now has a sequel. Verify that the previous book now successfully displays the "Continue to [New Book]" button.
    *   **Current Book Check:** If this new book is *not* the latest in the series, ensure it successfully points to the next one.
    *   **Placement Verification:** Confirm the button successfully renders in **two places**: at the bottom of the final chapter chunk page (`/[series]/[book]/[final-range]`) AND at the very bottom of the master continuous scroll page (`/[series]/[book]/full`).
6.  **Verify Purchase Buttons:** Purchase buttons (Bookshop.org and Barnes & Noble) are **fully automatic** — they are built into `src/pages/[series]/[book]/index.astro` and generate search URLs from `bookName` at build time. No manual action is required. Simply confirm the book index page loads and both gold buttons appear under the "Get the Book" label. The Libby library note also renders automatically.
7.  **Deploy:** Commit your changes and push to `main` — Vercel auto-deploys.

---

## 🔍 SEO Strategy & Rules for New Content

To ensure we constantly rank well for "Panic Recaps" and catch-up searches, adhere to the following SEO rules when adding new content:

1.  **Strict Naming Conventions:** Ensure the `series` and `book` names in your YAML frontmatter exactly match high-volume search terms. Avoid obscure abbreviations. Use full, official titles (e.g., use "The Stormlight Archive", not "SA").
2.  **Keyword-Rich Blurbs:** When writing the 5-sentence editorial blurb in `src/data/series-metadata.ts`, naturally weave in target keywords. Mention the author's full name, the phrase "story recap", "plot summary", or "catch up before the next release".
3.  **Intent Alignment (The 10-15 Rule):** Search engines reward content that immediately satisfies user intent. Do not pad the generated chunks with fluff or literary analysis. Keeping chapters strictly to 10-15 concrete, plot-focused sentences ensures low bounce rates and high time-on-page, which are massive SEO ranking signals.
4.  **Dynamic Meta Tags Check:** The site automatically generates Title tags and OpenGraph descriptions like `"Empire of Silence Recap: Chapters 1-5"`. Always check the live `<title>` tag after deployment to ensure the metadata parsed your frontmatter cleanly without awkward spacing, missing colons, or casing issues.
5.  **Sitemap & Internal Linking:** Astro automatically adds new pages to the `sitemap.xml`. However, verify that the series index page (`/[series]/index.astro`) correctly lists all books. Robust internal linking (from the Archive homepage -> to the Series -> to the Book -> to the Chapters) is critical for search crawler discovery.