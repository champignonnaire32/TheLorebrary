import fs from 'fs';
import path from 'path';

// Helper to convert folder name to Title Case
function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
      // Extract the range from the filename (e.g. Chapter1-5_Summary.md -> 1-5)
      const fileMatch = file.match(/Chapter(.*?)_Summary\.md/);
      if (!fileMatch) continue;
      
      const range = fileMatch[1];
      
      // Calculate a start chapter for sorting
      let startChapter = 0;
      if (!range.toLowerCase().includes('prologue')) {
        const startMatch = range.match(/^(\d+)/);
        if (startMatch) {
          startChapter = parseInt(startMatch[1], 10);
        }
      }

      const rawContent = fs.readFileSync(path.join(bookRawPath, file), 'utf-8');
      
      // Clean up AI metadata
      let body = rawContent.replace(/\*?\*?Sentence Count Check:?\*?\*?\s*\d+/gi, '').trim();
      body = body.replace(/^---\s*$/gm, '').trim();

      // Clean up duplicate chapter titles (e.g. "### Chapter 1: Chapter 1" or "### [Chapter 1]: Chapter 1")
      body = body.replace(/###\s+(Chapter\s+\d+)[:\s-]+\1/gi, '### $1');
      body = body.replace(/###\s+\[(Chapter\s+\d+)\][:\s-]+\1/gi, '### $1');

      // Ensure headings are cleanly spaced
      body = body.replace(/###\s+/g, '\n### ');

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
