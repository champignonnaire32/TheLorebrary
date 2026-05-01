export interface SeriesMetadata {
  author: string;
  genre: 'Fantasy' | 'Science Fiction';
  blurb: string;
}

export const seriesMetadata: Record<string, SeriesMetadata> = {
  'His Dark Materials': {
    author: 'Philip Pullman',
    genre: 'Fantasy',
    blurb: 'His Dark Materials is Philip Pullman\'s landmark fantasy trilogy set across multiple parallel worlds, following the fierce and headstrong Lyra Belacqua as she unravels a conspiracy involving stolen children, mysterious Dust, and the authoritarian power of the Magisterium. Beginning in an Oxford where humans are accompanied by animal-shaped soul-companions called dæmons, the series rapidly expands in scope to encompass armored polar bears, witches, knife-wielding travelers between worlds, and the very nature of consciousness and free will. Pullman draws openly from Milton\'s Paradise Lost, inverting the Christian myth of the Fall to argue that knowledge, experience, and moral autonomy are not sin but salvation. The trilogy is as philosophically dense as it is propulsively plotted, making it one of the few works of fantasy that genuinely rewards rereading for its ideas as much as its story. These recaps are essential before returning to its dense cast of characters and its intricate multi-world cosmology.',
  },
  'Dune': {
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    blurb: 'Dune is the foundational text of modern science fiction, set in a distant future where noble houses wage war for control of Arrakis — the sole source of the spice melange, the most valuable substance in the universe. Following young Paul Atreides, it charts his transformation from a duke\'s son to a messianic figure among the indigenous Fremen people of an unforgiving desert world. The novel weaves political intrigue, ecological philosophy, and religious manipulation into a slow-burning epic that rewards patient readers willing to immerse themselves in its dense world-building. Successive books grow increasingly metaphysical, tracing the long consequences of Paul\'s fateful choice across millennia of human history and evolution. Herbert\'s saga remains the definitive exploration of power, prophecy, and the seductive danger of charismatic leadership.',
  },
  'Harry Potter': {
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    blurb: 'Harry Potter is the defining fantasy series of a generation, following an orphaned boy who discovers on his eleventh birthday that he is a wizard and heir to a legacy both celebrated and haunted. Set across seven years at Hogwarts School of Witchcraft and Wizardry, the series tracks Harry\'s deepening friendships, his confrontations with the dark wizard Voldemort, and the gradual revelation of the war that shaped his birth. Each book escalates in tone and complexity, transforming a whimsical school adventure into a war narrative about sacrifice, prejudice, and the courage to face death. The world-building is dense with invented lore — Quidditch, Horcruxes, wand theory, and Ministry politics — making these recaps essential before returning to later installments. Rowling\'s series endures because it maps the emotional experience of growing up onto the grand canvas of mythic conflict.',
  },
  'Red Rising': {
    author: 'Pierce Brown',
    genre: 'Science Fiction',
    blurb: 'Red Rising is a propulsive science fiction epic that begins as a brutal dystopian uprising and expands into a galaxy-spanning war for civilization. Darrow, a lowly Red miner on terraformed Mars, is surgically remade into a Gold — the ruling elite — and infiltrates their most prestigious military academy as a sleeper agent for the revolution. Brown\'s prose is kinetic and visceral, drawing from Roman mythology to name its color-coded caste system while channeling gladiatorial spectacle with far greater political scope. The series evolves dramatically across six books, trading the academy setting for full-scale interplanetary conflict, shifting perspectives, and morally fractured alliances that make allegiances genuinely uncertain. Few series in contemporary genre fiction match its momentum or its willingness to inflict permanent, irreversible consequences on its cast.',
  },
  'The Lord of the Rings': {
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    blurb: 'The Lord of the Rings is the cornerstone of modern fantasy, following the Fellowship\'s desperate quest to destroy the One Ring in the fires of Mount Doom before the dark lord Sauron reclaims it and enslaves all of Middle-earth. Tolkien\'s trilogy unfolds across a vast tapestry — from the pastoral Shire to the golden halls of Rohan, the besieged city of Gondor, and the volcanic wasteland of Mordor — with a deliberate, mythological pace rooted in decades of linguistic and historical invention. The narrative is as much an elegiac meditation on the passing of an age as it is a war story, suffused with loss, ancient song, and a deep sense of history stretching far beyond the frame of the tale. Characters like Frodo, Aragorn, Gandalf, and Sam have become archetypes so influential that nearly every fantasy work written since owes them a direct debt. The dense cast of named characters and historical asides accumulate quickly, making these recaps indispensable before re-entering Tolkien\'s world.',
  },
  'The Stormlight Archive': {
    author: 'Brandon Sanderson',
    genre: 'Fantasy',
    blurb: 'The Stormlight Archive is Brandon Sanderson\'s most ambitious work: a projected ten-book epic set on the storm-ravaged world of Roshar, where cyclic apocalyptic events called Desolations appear to be returning after millennia of absence. The series follows multiple protagonists — brooding spearman Kaladin, scholar-princess Shallan, and broken highprince Dalinar — whose interlocking stories converge on the rediscovery of the Radiants, ancient warriors bonded to magical creatures called spren. Sanderson\'s trademark hard magic system, Stormlight, is meticulously rule-bound and deeply integrated into both the combat and the emotional arcs of its characters. Each volume runs over a thousand pages and ends with a cascading "sanderlanche" of compounding revelations, making these recaps essential before each new release. The series sits within Sanderson\'s vast shared cosmology, the Cosmere, though it functions fully as a self-contained epic.',
  },
  'The Empyrean Series': {
    author: 'Rebecca Yarros',
    genre: 'Fantasy',
    blurb: 'The Empyrean Series is Rebecca Yarros\'s romantasy phenomenon set at Basgiath War College, where the children of Navarre compete to bond with dragons and become riders — or die trying on the treacherous parapet crossing. Violet Sorrengail, daughter of the commanding general and trained her whole life to be a scribe, is thrust into the Riders Quadrant against her will, where survival depends on strength she has had to learn to find in unconventional ways. The series blends military fantasy with a high-tension enemies-to-lovers romance as Violet navigates the brutal hierarchy of her quadrant alongside Xaden Riorson, the enigmatic wingleader whose father led a failed rebellion against the kingdom. Beneath the bonding flights and war games, a far darker secret about the reason Basgiath exists at all threatens to unravel everything Violet has been taught to believe about her world and her country. Yarros\'s series became a global publishing phenomenon, beloved for its propulsive pacing, emotionally devastating twists, and a magic system rooted in the unique signet abilities that manifest when a rider bonds their dragon.',
  },
  'The Suneater Series': {
    author: 'Christopher Ruocchio',
    genre: 'Science Fiction',
    blurb: 'The Suneater Series is Christopher Ruocchio\'s sweeping space opera, told in retrospect by the immortal Hadrian Marlowe — a man who has lived ten thousand years and destroyed a sun in the course of humanity\'s war against the alien Cielcin. The prose is deliberately archaic and literary, evoking classical epics and the roman à clef tradition, reflecting Hadrian\'s narration of his own life from an immense temporal distance with the full weight of its tragedy already known to him. The series follows Hadrian\'s reluctant rise from a noble house\'s youngest son to an interstellar figure of legend, navigating a feudal far-future civilization policed by a rigid caste system and enforced by the church-like Chantry. Each volume deepens the tension between Hadrian\'s pacifist nature and the civilizational violence he is repeatedly compelled to commit on behalf of a species that may not deserve saving. Ruocchio\'s work stands apart in modern science fiction for its genuine literary ambition and its willingness to let grief and consequence accumulate across thousands of in-universe years.',
  },
};
