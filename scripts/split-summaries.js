import fs from 'fs';
import path from 'path';

// Helper to convert folder name to Title Case
function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Convert an ALL CAPS heading title to Proper Title Case
// Keeps minor words lowercase unless they are the first word
const MINOR_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of', 'up', 'as', 'vs', 'via']);
function headingTitleCase(str) {
  return str.toLowerCase().split(' ').map((word, i) => {
    if (i === 0 || !MINOR_WORDS.has(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
}

// Ensure the series name matches the expected format
const seriesMap = {
  'suneater': 'The Suneater Series',
  'stormlight': 'The Stormlight Archive',
  'redrising': 'Red Rising',
  'dune': 'Dune',
  'lotr': 'The Lord of the Rings',
  'hp': 'Harry Potter',
  'empyrean': 'The Empyrean Series',
  'hisdarkmaterials': 'His Dark Materials',
  'acotar': 'A Court of Thorns and Roses',
  'inheritance-cycle': 'The Inheritance Cycle',
  'mistborn-era-one': 'Mistborn: Era One',
  'mistborn-era-two': 'Mistborn: Era 2',
};

// Define explicit book orders
const bookOrderMap = {
  'Empire Of Silence': 1,
  'Howling Dark': 2,
  'Demon In White': 3,
  'Kingdoms Of Death': 4,
  'Dune 1': 1,
  'Dune Messiah': 2,
  'Children Of Dune': 3,
  'God Emperor Of Dune': 4,
  'Heretics Of Dune': 5,
  'Chapterhouse Dune': 6,
  'The Way Of Kings': 1,
  'Words Of Radiance': 2,
  'Oathbringer': 3,
  'Rhythm Of War': 4,
  'Wind And Truth': 5,
  'Red Rising': 1,
  'Golden Son': 2,
  'Morning Star': 3,
  'Iron Gold': 4,
  'Dark Age': 5,
  'Light Bringer': 6,
  'The Fellowship Of The Ring': 1,
  'The Two Towers': 2,
  'The Return Of The King': 3,
  'The Sorcerers Stone': 1,
  'The Chamber Of Secrets': 2,
  'The Prison Of Azkaban': 3,
  'The Goblet Of Fire': 4,
  'The Order Of The Phoenix': 5,
  'The Half-Blood Prince': 6,
  'The Half Blood Prince': 6, // Just in case of hyphen splitting
  'The Deathly Hallows': 7,
  'Fourth Wing': 1,
  'Iron Flame': 2,
  'Onyx Storm': 3,
  'The Golden Compass': 1,
  'The Subtle Knife': 2,
  'The Amber Spyglass': 3,
  'A Court Of Thorns And Roses': 1,
  'A Court Of Mist And Fury': 2,
  'A Court Of Wings And Ruin': 3,
  'A Court Of Frost And Starlight': 4,
  'A Court Of Silver Flames': 5,
  'Eragon': 1,
  'Eldest': 2,
  'Brisingr': 3,
  'Inheritance': 4,
  'The Final Empire': 1,
  'The Well of Ascension': 2,
  'The Well Of Ascension': 2,
  'The Hero of Ages': 3,
  'The Hero Of Ages': 3,
  'The Alloy Of Law': 1,
  'Shadows Of Self': 2,
  'The Bands Of Mourning': 3,
  'The Lost Metal': 4,
};

const rawBaseDir = path.join(process.cwd(), 'src', 'data', 'raw-summaries');
const outBaseDir = path.join(process.cwd(), 'src', 'content', 'summaries');

// Clean out directory before running to prevent old atomic chapters from persisting
if (fs.existsSync(outBaseDir)) {
  fs.rmSync(outBaseDir, { recursive: true, force: true });
}

// Get all series folders
const seriesFolders = fs.readdirSync(rawBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const seriesFolder of seriesFolders) {
  const seriesName = seriesMap[seriesFolder] || toTitleCase(seriesFolder);
  const seriesRawPath = path.join(rawBaseDir, seriesFolder);

  const bookFolders = fs.readdirSync(seriesRawPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const bookFolder of bookFolders) {
    const rawBookName = toTitleCase(bookFolder);
    const bookOrder = bookOrderMap[rawBookName] || 99;
    const finalBookName = rawBookName === 'Dune 1' ? 'Dune' : rawBookName;

    const bookRawPath = path.join(seriesRawPath, bookFolder);
    const bookOutPath = path.join(outBaseDir, seriesFolder, bookFolder);

    console.log(`Processing: ${seriesName} - ${finalBookName} (Order: ${bookOrder})...`);

    fs.mkdirSync(bookOutPath, { recursive: true });

    const files = fs.readdirSync(bookRawPath).filter(f => f.endsWith('_Summary.md'));

    for (const file of files) {
      // Extract the range from the filename (e.g. Chapter1-5_Summary.md -> 1-5, Prologue-Chapter4_Summary.md -> Prologue-4)
      let range = file.replace('_Summary.md', '').replace(/^Chapter/, '');
      
      // Clean up common inconsistencies
      range = range.replace('Chapter', ''); // Handle double "Chapter" in names like Prologue-Chapter4
      if (range.startsWith('-')) range = range.slice(1);
      
      if (!range) continue;

      // Calculate a start chapter for sorting
      let startChapter = 0;
      if (!range.toLowerCase().includes('prologue')) {
        const startMatch = range.match(/^(\d+)/);
        if (startMatch) {
          startChapter = parseInt(startMatch[1], 10);
        }
      }

      const rawContent = fs.readFileSync(path.join(bookRawPath, file), 'utf-8');

      // Strip AI sentence-count annotations — handles both:
      //   **Sentence Count Check:** 15   (** closes before number)
      //   **Sentence Count Check: 15**   (** closes after number)
      // Strip artifacts: Sentence count checks and "TASK COMPLETE" markers
      let body = rawContent.replace(/\*{0,2}Sentence Count Check:?.*$/gim, '').trim();
      body = body.replace(/TASK COMPLETE.*$/gim, '').trim();

      // Remove stray horizontal rules left by the AI
      body = body.replace(/^---\s*$/gm, '').trim();

      // Remove ALL top-level H1 headers (e.g. "# Chapter 21-25 Summary" or "# RED RISING: Part III")
      body = body.replace(/^#\s+.*$/gm, '').trim();

      // Fix ALL CAPS heading titles → Proper Title Case
      // Matches: ### 16: THE SILVER GUILLOTINE  or  ### Chapter 3: TITLE HERE
      body = body.replace(/^(###\s+[^:\n]+:\s+)([A-Z][A-Z\s'",.-]{2,})$/gm, (match, prefix, title) => {
        // Only convert if the title is genuinely all-caps (no lowercase letters)
        if (title === title.toUpperCase()) {
          return prefix + headingTitleCase(title.trim());
        }
        return match;
      });

      // Clean up duplicate chapter titles (e.g. "### Chapter 1: Chapter 1" or "### 16: Chapter 16" or "### [Chapter 18]: Chapter 18")
      body = body.replace(/^###\s+(?:\[?Chapter\s+(\d+)\]?|(\d+))[:\s-]+Chapter\s+.*$/gim, '### Chapter $1$2');
      body = body.replace(/###\s+(Chapter\s+\d+)[:\s-]+\1/gi, '### $1');
      body = body.replace(/###\s+\[(Chapter\s+\d+)\][:\s-]+\1/gi, '### $1');

      // Ensure headings are cleanly spaced with exactly three empty lines before them
      // (Uses a lookahead to avoid adding space before the very first heading in the file)
      body = body.replace(/\s*###\s+/g, '\n\n\n\n### ').trim();

      const outContent = `---
title: "Chapters ${range}"
series: "${seriesName}"
book: "${finalBookName}"
bookOrder: ${bookOrder}
range: "${range}"
startChapter: ${startChapter}
---

${body}
`;

      fs.writeFileSync(path.join(bookOutPath, `${range}.md`), outContent);
    }
  }
}

console.log('Chunk summaries successfully processed!');
