/* Shared physical-reaction "beats" per zone and stage. Tags: T = Teasing+, S = Steamy+, E = Explicit only.
   Fiction only: every resident is a fictional adult. Text only. */
const ZONES = [
  ["face", "Face"], ["neck", "Neck & shoulders"], ["chest", "Chest"], ["abs", "Abs"],
  ["arms", "Arms"], ["hands", "Hands"], ["thighs", "Thighs"]
];
const STAGE_NAMES = ["Guarded", "Flustered", "Aroused", "Needy"];
const INTENS = ["Teasing", "Steamy", "Explicit"];

const BEATS = {
  face: [
    ["*flinches back a little*", "*blinks, caught off guard*", "*his eyes dart away from yours*", "*a muscle in his jaw tightens*", "*tilts his head out of reach, then back*", "*lets out a short breath through his nose*"],
    ["*a flush creeps across his face*", "*his gaze flicks to your lips and away*", "*swallows, throat bobbing*", "*leans in a fraction before catching himself*", "*his smile wobbles*", "*his cheeks go warm under your hand*"],
    ["*eyes half-lidded, leaning into your palm*", "*his breath hitches against your wrist*", "*he nuzzles into your touch*", "S|*lips parted, panting softly*", "S|*he turns his head and kisses the heel of your hand*", "E|*he drags his tongue slowly over your thumb, eyes locked on yours*"],
    ["*eyes glassy, hanging on your every move*", "*he presses his forehead to yours, shaking*", "*his whole face is flushed, breath ragged*", "S|*he moans quietly into your hand*", "S|*he catches your fingers in his mouth, whimpering*", "E|*he sucks your fingers in deep, groaning around them*"]
  ],
  neck: [
    ["*stiffens and rolls his shoulders*", "*shrugs your hand off, half-heartedly*", "*goosebumps ripple down his arms*", "*tucks his chin defensively*", "*lets out a nervous laugh*", "*tenses like a drawn bowstring*"],
    ["*a shiver runs down his spine*", "*tilts his head, offering more of his neck without noticing*", "*his pulse jumps under your fingertips*", "*he exhales unevenly*", "*his shoulders slowly lose their tension*", "*he closes his eyes for a second*"],
    ["*he bares his neck to you, eyes shut*", "*a low hum vibrates in his throat*", "*he leans back against you, surrendering*", "S|*a soft moan slips out as you stroke the back of his neck*", "S|*his hips shift restlessly*", "E|*he groans and grinds back against you without meaning to*"],
    ["*he melts, head lolling back*", "*he clutches your wrist, keeping it there*", "*his voice shakes with every breath*", "S|*he whimpers, goosebumps everywhere*", "S|*he begs with his whole body, trembling*", "E|*he moans your name raw and low, hips rolling*"]
  ],
  chest: [
    ["*puffs out his chest on instinct*", "*catches your wrist but doesn't push it away*", "*his heartbeat thuds under your palm*", "*huffs, folding an arm over himself*", "*flexes, then immediately regrets it*", "*looks down at your hand like it's a puzzle*"],
    ["*his breathing deepens*", "*his pecs flex under your fingers*", "*his heartbeat quickens visibly*", "*he lets your hand linger, avoiding your gaze*", "*a flustered cough escapes him*", "*his chest rises and falls heavier*"],
    ["*he presses your hand flat against his thundering heart*", "*groans low, chest arching into you*", "*his breath comes in short pulls*", "S|*he squeezes your wrist, urging you firmer*", "S|*his nipples tighten under your thumbs and he gasps*", "E|*he arches hard, moaning as you pinch and tease*"],
    ["*his chest heaves, skin burning hot*", "*he drags your hand lower along his own body*", "*he's breathing like he ran a mile*", "S|*he groans, shamelessly rolling into your hands*", "S|*he whines when you pull away*", "E|*he's panting, moaning your name, so hard it's obvious*"]
  ],
  abs: [
    ["*his abs tighten reflexively*", "*he twitches and almost laughs*", "*sucks in his stomach, caught off guard*", "*catches your hand, but only holds it there*", "*gives you a warning look*", "*flinches, ticklish*"],
    ["*his stomach flutters under your fingers*", "*a shaky breath, muscles quivering*", "*he watches your hand slide, mouth slightly open*", "*heat rolls off his skin*", "*he bites his lip*", "*his hips shift a little*"],
    ["*muscles jump with each pass of your hand*", "*he lets out a trembling sigh*", "*his hand covers yours, guiding it lower, then stopping*", "S|*he's visibly hard now and trying not to show it*", "S|*a needy whine as your fingers reach his waistband*", "E|*he grinds up toward your hand, groaning*"],
    ["*he shudders, abs rippling*", "*he catches his breath in broken little gasps*", "*he's trembling like a wire about to snap*", "S|*he whimpers, begging with his hips*", "S|*he rolls into your touch, desperate*", "E|*he's aching and leaking, pleading for you to touch him properly*"]
  ],
  arms: [
    ["*flexes without thinking*", "*raises a brow, amused despite himself*", "*shifts to give you a better look, then scowls at himself*", "*his bicep twitches under your hand*", "*rolls a shoulder, showing off*", "*lets you squeeze, deadpan*"],
    ["*he watches your hand wrap around his arm*", "*his bicep tenses on purpose*", "*he catches himself leaning closer*", "*a pleased flush rises on his face*", "*he pulls you a little nearer*", "*he clears his throat, flustered*"],
    ["*he pulls you in by the arm until you're chest to chest*", "*he wraps his arms around your waist*", "*his grip tightens possessively*", "S|*he pins you gently against the wall, breath hot*", "S|*he holds you tight, trembling with need*", "E|*he hauls you against him, hard and urgent against your hip*"],
    ["*he clings to you, arms trembling*", "*he buries his face in your shoulder*", "*he can't let go*", "S|*he lifts you against him, kissing at your jaw*", "S|*he holds you like he'll fall apart if he lets go*", "E|*he drags you into his lap, rolling up against you with a groan*"]
  ],
  hands: [
    ["*looks at your hand in his like it's a trick*", "*pulls his hand back, then doesn't*", "*glances at your fingers, then at you*", "*huffs and lets you hold it*", "*squeezes briefly, then lets go*", "*his thumb twitches against yours*"],
    ["*his fingers curl around yours*", "*he threads his fingers through yours, shy*", "*he rubs his thumb over your knuckles*", "*he lifts your hand like he's studying it*", "*a small smile slips out*", "*he doesn't let go*"],
    ["*he kisses your knuckles, eyes up at you*", "*he tugs you closer by the hand*", "*he places your palm against his cheek*", "S|*he guides your hand down his chest and abs*", "S|*he takes your fingertip between his lips*", "E|*he draws your hand lower, pressing it against his heat*"],
    ["*he holds your hand to his chest, shaking*", "*he kisses your palm over and over*", "*he laces his fingers with yours, gripping hard*", "S|*he sucks your fingers, eyes fluttering shut*", "S|*he moans against your palm*", "E|*he presses your hand between his legs, shuddering at the contact*"]
  ],
  thighs: [
    ["*snaps his legs together*", "*catches your wrist, eyebrows raised*", "*goes very still*", "*coughs, shifting away half an inch*", "*lets out a startled laugh*", "*his face heats instantly*"],
    ["*his leg trembles under your palm*", "*he parts his knees an inch, unaware*", "*his breath goes shallow*", "*he looks at the ceiling, pretending not to feel it*", "*muscles twitch under your touch*", "*he swallows hard*"],
    ["*he lets his legs fall open a little more*", "*he guides your hand higher, then stops, breathless*", "*a low, shaky groan*", "S|*he rolls his hips up into the touch*", "S|*he whispers a desperate 'higher'*", "E|*he's painfully hard and pushes up into your palm*"],
    ["*he trembles, knees falling wide*", "*he pulls you closer by the thigh*", "*he gasps your name*", "S|*he arches up, moaning, begging for more*", "S|*he drags your hand where he needs it*", "E|*he gasps, grinding against your hand, begging you to finish him*"]
  ]
};

/* Zone defaults: sensitivity multiplier (applied per character via fav/nogo) */
const ROOMS = {
  lounge:  { name: "Lounge", icon: "🛋️", cost: 600,  income: 25, lock: null, color: "#6b3a5c", furn: ["Worn sofa", "Velvet sectional", "Cinema wall & bar cart"], blurb: "Cosy hangout. Residents unwind here." },
  gym:     { name: "Gym", icon: "🏋️", cost: 1200, income: 40, lock: null, color: "#2f5b7a", furn: ["Bench & dumbbells", "Rack & cable tower", "Pro studio with mirrors"], blurb: "Sweat, mirrors and shirtless selfies." },
  bedroom: { name: "Bedroom", icon: "🛏️", cost: 900,  income: 0, lock: null, color: "#52305f", furn: ["Single bed", "Double bed & lamps", "King bed & silk sheets"], blurb: "Housing for one resident. Better beds, better rent.", housing: true },
  kitchen: { name: "Kitchen", icon: "🍳", cost: 1000, income: 30, lock: ["dante", 2], color: "#7a4a2a", furn: ["Two-ring stove", "Chef's island", "Open show-kitchen"], blurb: "Dinner service. Unlocked by Dante's affection Lv2." },
  library: { name: "Library", icon: "📚", cost: 1100, income: 35, lock: ["bash", 2], color: "#3b4d3a", furn: ["Bookshelves", "Reading nook", "Grand reading room"], blurb: "Quiet study. Unlocked by Bash's affection Lv2." },
  sauna:   { name: "Sauna & Bath", icon: "🧖", cost: 2200, income: 70, lock: ["wolf", 2], color: "#8a4b2d", furn: ["Cedar sauna", "Sauna + cold plunge", "Private bathhouse"], blurb: "Steam and towels. Unlocked by Wolf's affection Lv2." },
  rooftop: { name: "Rooftop", icon: "🌇", cost: 3500, income: 110, lock: ["kai", 2], color: "#26426e", furn: ["Deck chairs", "Plunge pool", "Skyline infinity pool"], blurb: "Sunset pool deck. Unlocked by Kai's affection Lv2." }
};

const GIFTS = [
  { id: "flowers", name: "Flowers", icon: "💐", cost: 30 },
  { id: "bread", name: "Fresh pastries", icon: "🥐", cost: 20 },
  { id: "shake", name: "Protein shake", icon: "🥤", cost: 25 },
  { id: "dinner", name: "Cook dinner", icon: "🍲", cost: 35 },
  { id: "book", name: "Rare book", icon: "📖", cost: 40 },
  { id: "whiskey", name: "Single malt", icon: "🥃", cost: 60 },
  { id: "cologne", name: "Cologne", icon: "🧴", cost: 90 },
  { id: "wine", name: "Vintage wine", icon: "🍷", cost: 120 },
  { id: "robe", name: "Silk robe", icon: "🥋", cost: 150 }
];

const LEVELS = [0, 25, 70, 140, 240]; // XP to reach Lv1..Lv5
const LEVEL_REWARD = [0, 0, 500, 1000, 1500, 2500];

const INTENS_HINT = {
  Teasing: "Flirty, implied, suggestive only.",
  Steamy: "Openly aroused: moans, pleading, heated talk.",
  Explicit: "Graphic dirty talk and explicit text (text only)."
};
