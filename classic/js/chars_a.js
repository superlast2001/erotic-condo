/* Residents (all fictional adults, 21+). Part A: Wolf, Bash */
const CHARS = {};

CHARS.wolf = {
  id: "wolf", name: "Wolf", age: 34, species: "Wolf-dog", img: "assets/wolf.jpg",
  tag: "Gruff tsundere bathhouse regular",
  bio: "A muscular navy-and-orange wolf-dog with a pipe, a black chest harness and a perpetually irritated scowl. Allergic to compliments, secretly starved for gentle attention. (Placeholder name — rename him in your head.)",
  face: [0.38, 0.19, 3.1], blush: [36, 22],
  rent: 70, trust0: 10, need: 40, fav: "whiskey", favZones: ["chest", "face"], nogo: "hands",
  likes: ["sauna", "gym"], moveIn: { cost: 0, req: [] },
  // hotspot polygons (768x1024 art space). Later entries sit on top.
  zones: [
    ["thighs", "0,700 200,625 330,690 500,700 690,620 768,690 768,1024 0,1024"],
    ["abs", "215,520 330,505 545,505 575,600 545,670 440,715 330,700 240,640"],
    ["chest", "128,335 230,280 300,270 430,250 560,280 690,400 765,440 690,502 560,502 300,497 190,502 125,445"],
    ["arms", "520,195 640,165 740,230 768,250 768,340 600,345 540,290"],
    ["arms", "690,520 768,480 768,800 720,840 690,700"],
    ["arms", "30,290 110,275 125,440 60,470 0,500 0,420"],
    ["arms", "0,480 60,480 190,545 180,620 110,720 60,720 0,700"],
    ["neck", "425,105 485,115 585,420 548,442 520,445"],
    ["neck", "108,330 175,215 205,235 138,442 115,442"],
    ["neck", "300,262 420,236 470,300 400,340 310,325"],
    ["hands", "110,710 230,740 315,840 300,960 260,965 230,940 130,900"],
    ["hands", "500,745 570,692 720,692 768,760 700,830 590,858 520,822"],
    ["face", "175,130 280,70 380,120 402,190 335,285 220,275 170,190"],
    ["face", "110,45 190,35 188,112 150,125"],
    ["face", "245,22 272,0 325,0 332,55 290,68"]
  ],
  v: [
    ["Tch. Hands off, brat.", "Do I look like a pet to you? Don't answer that.", "Careful. I bite. Sometimes.", "What's the big idea, huh? Waste of my time.", "You're the landlord, not my keeper. Tch.", "Who gave you permission? ...Nobody. Right. Carry on, I guess.", "S|Don't get ideas. I'm just warm, that's all.", "S|You've got some nerve. Some stupid, brave nerve."],
    ["...Damn it, why's that feel so good?", "Don't look at me like that. I'm not blushing, it's the sauna.", "I didn't ask you to stop. Don't read into it.", "*mutters around the pipe* ...Idiot. Do it again.", "Hnh. You're too gentle. It's annoying. Keep being annoying.", "My tail's wagging on its own. Shut up. Don't mention the tail.", "S|You're making me warm in places I didn't plan on.", "S|Quit grinning. You're gonna ruin my reputation."],
    ["T|*low rumble* ...Yeah. Right there. Don't stop.", "T|You know exactly what you're doing, don't you, brat?", "T|Closer. Come on. I don't bite. ...Much.", "T|My whole body's humming under your hands. Damn you.", "S|Fuck... that's good. Keep going. Please.", "S|I'm not gonna last if you keep touching me like that.", "E|You've got me hard as a rock under this towel. Happy now?", "E|Keep going and I'll haul you onto this bench and show you what a gruff old wolf does with a brat like you."],
    ["T|Please. I'm asking nicely. Don't make me beg more.", "T|*voice cracking* You win, alright? I'm yours. Just don't stop.", "T|Look at me. Look at what you've done to me.", "S|Fuck, I need you. Now. Please, I'm shaking.", "S|Say my name and I'll fall apart right here.", "E|Wreck me. Please. I can't take it, I need you. Just finish this.", "E|I'm throbbing, I'm dripping, I'm begging. What more do you want from a wolf?", "E|Take the towel off. Take everything. I'm yours tonight."]
  ],
  z: {
    face: ["Oi. Muzzle's off limits. Try that again and you'll lose a finger. *bares teeth, not seriously*", "*mutters around the pipe* That's... not completely awful. Don't tell anyone.", "*nuzzles into your palm, eyes half-lidded* Your hands feel good. Damn good.", ["T|*pipe trembling between his teeth* Stop looking at me like I'm yours... or don't. Keep looking.", "E|*pants against your wrist* That's the face of a wolf who wants you to wreck him."]],
    neck: ["Not the harness. That's my favorite harness, brat.", "*tugs the strap straight, flustered* ...It's just a strap. Why are you touching it like that?", "*leans back into your grip* Hold the strap. Pull. ...Yeah. Like that.", ["T|*growls low* Pull it tighter and see what happens.", "E|*rumbling moan* Drag me by it. I dare you."]],
    chest: ["Tch. Looking at the merchandise? Hands off the pecs unless you're buying.", "*chest rising heavier* Warm hands... damn it.", "*groans, pecs flexing into your palms* Yeah... squeeze. Harder.", ["T|*grabs your wrist and presses it to his thundering heart* Feel what you do to me.", "E|*chest heaving, towel visibly rising* Keep going and I swear I'll cum from this alone."]],
    abs: ["*flexes out of pure spite* Like what you see? Too bad.", "*breath catches at the touch* Don't... go lower. ...I said don't.", "*his hand covers yours on his abs* Lower. Please. Or I'll do it for you.", ["T|*abs rippling, voice gravel* I can't think straight when you touch me there.", "E|*the towel is tenting hard* Look what you did. Take responsibility."]],
    arms: ["Go ahead, feel 'em. Years of hauling lumber. Don't make it weird.", "*smirks, flexing slowly* Heh. Like those, huh? ...Just a bit longer.", "*scoops you in with one arm* Come here. I want you where I can feel you.", ["T|*arms locked around you, jaw against your hair* Stay. Just stay like this.", "E|*grinding against your hip* Feel that? That's all you."]],
    hands: ["Tch. Let go. People will talk. ...Fine, five seconds.", "*calloused fingers curl around yours* ...Your hands are warm. That's all.", "*kisses your knuckles gruffly, scowling at himself* Don't. Say. Anything.", ["T|*holds your hand against his chest* Right here. That's where you live now.", "E|*drags your hand down under the towel* Right here too."]],
    thighs: ["OI! Watch the hands, you little— *face flushing under the fur*", "*swats at your hand, ears burning* Not there. Absolutely not. ...Maybe a little there.", "*his legs fall open slowly* You really want to see what you're doing to me?", ["T|*a rough whine escapes* Higher. Please, higher.", "E|*gasps as you graze him through the towel* Fuck, yes. Right there. Don't you dare stop."]]
  },
  finale: {
    build: [
      "He catches your wrist, growls something that isn't quite a protest, and hauls you toward the sauna bench by the harness strap. The pipe goes down on the shelf. \"Last chance to walk away, landlord,\" he mutters. Neither of you moves. Steam swallows the rest of the room.",
      "He drags you into his lap, towel bunching, heat pouring off him. His mouth finds yours, rough and unhurried, smoke and mint. His big hands slide under your shirt like he's afraid you'll vanish. \"Tell me to stop,\" he rumbles. You don't.",
      "He hauls you into his lap and the towel is the first thing to go. Hot, huge, shaking with how badly he wants you, he kisses you like he's starving, hands dragging down your back, pulling you flush against him until you can feel every ridge of muscle and every hard, urgent inch."
    ],
    climax: [
      "Everything blurs into warmth, whispered curses and your name in that gravelly voice. His arms close around you, and for a moment the stubborn old wolf simply holds on, shaking, completely undone.",
      "He moves with you, slow then desperate, groaning into your neck, claws flexing in the cedar. When it breaks over him he gasps your name, not gruff at all, and you follow him over the edge, tangled and breathless.",
      "You find a rhythm that wrings every curse out of him. His hands grip your hips hard enough to bruise, he moans in a low broken voice, begging for more, harder, and then he's coming with a shuddering roar, hot and helpless, dragging you over with him."
    ],
    after: [
      "Later, he's back to scowling at the ceiling, pipe unlit in his teeth. \"Don't tell anybody,\" he grumbles, and keeps his arm around you anyway.",
      "He pulls you against his chest and rests his chin on your head. \"Stay,\" he says, rough and quiet. Not an order. A request. From Wolf, that's practically a love letter."
    ]
  },
  dates: [
    "You haul Wolf out for ramen at a hole-in-the-wall he claims he 'doesn't care about'. He orders for both of you, lights the pipe outside, and complains about the noodles for an hour. He also finishes your leftovers. \"Only because I hate waste,\" he says, ears red.",
    "A night in the sauna, just the two of you. He's out of the harness for once, towel low, pipe unlit. He tells you about the winter he spent alone in a cabin. Then, quieter: \"This is better.\""
  ],
  giftLike: ["Tch. You didn't have to. ...Thanks.", "*pockets it fast* Don't expect me to say anything sappy."],
  giftFav: "*pipe nearly drops* ...How did you know? ...Damn it. Sit down. Drink with me.",
  greet: ["Oi, landlord. Need something?", "*puffs smoke* You staring or what?", "Tch. You again."],
  levelup: ["Fine. You've earned a bit of respect, kid.", "Don't gloat. You've got my trust now. Don't waste it.", "...I'd follow you anywhere. Don't make it weird.", "You're mine and I'm yours. Say it back, brat."]
};

CHARS.bash = {
  id: "bash", name: "Bash", full: "Sebastian 'Bash' Whitlock", age: 29, species: "Snow leopard", img: "assets/bash.webp",
  tag: "Shy bookish snow leopard",
  bio: "A soft-spoken, glasses-wearing snow leopard who reads in the sauna and stammers when anyone is nice to him. Underneath the blushing is a daring romantic who has read far too many love stories.",
  face: [0.4, 0.17, 3.1], blush: [40, 20],
  rent: 55, trust0: 25, need: 30, fav: "book", favZones: ["hands", "neck"], nogo: "thighs",
  likes: ["library", "lounge", "sauna"], moveIn: { cost: 300, req: ["lounge"] },
  zones: [
    ["thighs", "0,750 130,780 320,770 470,760 610,740 700,760 720,1024 0,1024"],
    ["abs", "280,590 480,590 610,640 640,720 560,760 400,760 300,740 270,660"],
    ["chest", "200,380 330,330 480,335 590,420 585,520 480,585 330,590 230,540 200,450"],
    ["arms", "40,400 110,350 200,385 230,520 240,640 200,700 100,720 40,690"],
    ["arms", "500,270 650,280 740,360 768,420 768,780 700,800 640,760 610,560 570,440"],
    ["neck", "235,265 330,305 430,255 480,300 400,345 260,340"],
    ["hands", "130,780 330,860 320,990 230,1000 160,960"],
    ["hands", "470,770 640,770 620,900 540,925 470,880"],
    ["face", "160,70 215,60 300,20 380,5 420,50 415,130 440,170 380,265 320,300 240,270 195,200 160,140"]
  ],
  v: [
    ["O-oh! I—I didn't see you there. Um. Hi?", "Is this... normal? Landlord stuff? I should probably check the lease.", "S-sorry! I'm not used to being touched. At all. By anyone.", "My glasses are fogging up. It's the sauna! Definitely the sauna.", "I— would you mind if I closed my book first? I can't concentrate.", "That's... um. Very forward. Of you. *clutches the book to his chest*", "S|Please don't tease me. I'll never recover.", "S|I've read about this. I did not expect it to be so much."],
    ["I— um— that's... n-nice? I think? It's nice.", "Oh. Oh no, I'm blushing, aren't I? Don't look.", "Could you— a little more? Only if you want to!", "My heart's doing something very unscientific right now.", "I should say something clever. I have nothing. Just— more, please.", "I think I forgot how to breathe. Do you mind? ...Carry on.", "S|You're really warm. I... want to keep being near you.", "S|If this is a dream I'd like to apologize in advance for what I'm about to say."],
    ["T|I— I don't want you to stop. Is that terrible?", "T|*soft, shaky smile* I'm braver than I look. Watch.", "T|Come here. Closer. I'll tell you if it's too much. It won't be.", "T|Every nerve I've got is yours right now.", "S|Please, I... I want more. I want you.", "S|*breathless laugh* The scholar's been replaced by a very needy man.", "E|I'm so hard it hurts, and I'm so embarrassed, and I don't care.", "E|Touch me properly. Please. I've imagined it so many times."],
    ["T|Please, please. I can't think. I can't think at all.", "T|You've broken me. In the best way. Don't stop.", "T|Say my name. Just once. I need to hear it.", "S|I'll do anything. Anything. Just don't leave me like this.", "S|Hold me. Kiss me. I'm shaking.", "E|I'm begging you. Take me. I want everything you'll give me.", "E|Faster. Harder. Oh god, I'm so close just from this.", "E|Fill me, use me, I'm yours. I'm all yours."]
  ],
  z: {
    face: ["*pushes his glasses up with a trembling finger* Is there something on my face? ...Oh.", "*cheeks flaming under his glasses* Th-that's very gentle. I like it. I think.", "*nuzzles into your palm, eyes closing* I've wanted you to do that for weeks.", ["T|*glasses crooked, lips parted* Kiss me. Please. Before I lose my nerve.", "E|*takes your fingers in his mouth, gaze locked on you, voice a whisper* Let me show you what else I can do with it."]],
    neck: ["*squeaks and hunches his shoulders* Ticklish! Very ticklish. Sorry!", "*shivers, leaning into your fingers* Oh. That's... oh.", "*tilts his head, offering his throat* Please. Nibble if you'd like. I'm trusting you.", ["T|*soft purr rumbling in his throat* Keep doing that and I'll melt into the floor.", "E|*moaning into your ear* My neck's my weakest spot. Now you know. Use it."]],
    chest: ["*clutches his book to his chest* P-please don't squish the book. Or me.", "*his heartbeat's racing under your palm* Is it— is it always this loud?", "*arches into your hands* Yes. Right there. Harder, if you don't mind.", ["T|*grips your wrist* Don't stop. I need you to know exactly what you're doing to me.", "E|*gasps as you tease him* Oh, god, my nipples are— please, don't let go."]],
    abs: ["*tries to suck in his stomach* I don't work out! These are... accidental. Mostly.", "*abs flutter under your fingers* Eep. That tickles. And, um, other things.", "*his hand covers yours, guiding it lower* Don't stop. Please. A little lower.", ["T|*stomach tight, voice breaking* I'm so close to losing it, and you've barely touched me.", "E|*towel tenting hard* Sorry. I— can't hide it. Don't look. ...No. Look."]],
    arms: ["*flexes, then immediately blushes* I swear I didn't mean to show off.", "*smiles shyly* You like them? They're... well, from carrying books. A lot of books.", "*wraps his arms around your waist* Is this okay? It feels so right.", ["T|*pulls you against him, spots dark against flushed skin* Stay. Please. Just a little longer.", "E|*presses hard against your hip, breathing hot in your ear* Feel how much I want this?"]],
    hands: ["*gently takes your hand* I— sorry, I'm holding your hand. Is that okay? I can stop.", "*laces his fingers through yours* They fit. Isn't that silly? They fit.", "*kisses your knuckles, trembling* You make me braver than I've ever been.", ["T|*presses your palm to his cheek* I'm yours. In case that wasn't clear.", "E|*guides your hand lower, gasping at the contact* Please. I'm begging you."]],
    thighs: ["EEP! That's— th-that's very close to— to—! *covers his face with the book*", "*knees tremble* I— you're— oh. Oh my. Please keep going.", "*his legs part, breath shaking* Closer. I want to feel you everywhere.", ["T|*clutches your sleeve* I've never wanted anything so badly in my whole life.", "E|*arches into your palm with a muffled cry* Yes, there! Please! I'm so ready, I— please!"]]
  },
  finale: {
    build: [
      "Bash sets his book down very carefully, as if it might break. \"I've imagined this,\" he admits, glasses fogging in the steam. \"Probably too many times.\" His hands shake as he takes yours. Then he leans in, and the shyness gives way to something warm and certain.",
      "He kisses you like he's been rehearsing for weeks, clumsy at first, then not clumsy at all. Glasses off, towel loose, his long fingers trace the line of your jaw, your shoulders, the buttons of your shirt. \"Tell me if I'm doing this right,\" he whispers. You can feel him smiling.",
      "He pushes you back against the cedar bench, glasses discarded, and kisses a slow trail down your throat. \"I read about this,\" he breathes, flustered and shameless at once. \"I'd like to try everything.\" The towel hits the floor and he's already hard, aching, trembling with eagerness."
    ],
    climax: [
      "Time softens. His breath ghosts against your ear, whispered confessions you'll replay later, the quiet gasp as he finally lets go of every careful thought.",
      "He's gentle until he isn't. Then a low, surprised moan escapes him and his whole body shudders. He clutches you tight, spots rippling across flushed skin, saying your name like a spell as the heat crests.",
      "He moves in slow, deep, attentive strokes, his voice breaking on every moan. \"Please, more, I'm close,\" he gasps, the shy scholar gone entirely. He comes with a helpless cry, shuddering through it, dragging you with him into white heat."
    ],
    after: [
      "Afterwards he can't stop blushing. \"That was, I mean, thank you. Is it too early to ask to do it again?\" He retrieves his glasses with a sheepish grin.",
      "He tucks himself under your arm, tail looped around your leg, a book forgotten on the floor. \"I think,\" he murmurs, \"this is better than any story I've read.\""
    ]
  },
  dates: [
    "You take Bash to a tiny second-hand bookshop. He lights up like a lantern, reading you passages in a low voice, then notices you listening and goes pink to the ears. Outside, he quietly takes your hand. \"Is this okay?\" It is.",
    "A candle-lit night in the library. He's read you half a novel in his soft voice when he stops mid-sentence. \"I'd rather be in the story with you,\" he whispers, and closes the book."
  ],
  giftLike: ["Oh! For me? That's— thank you. Really.", "*holds it to his chest, blushing* No one's ever done this for me."],
  giftFav: "*gasps, glasses slipping* This edition?! It's out of print! You— *voice cracks* I'm going to cry. Thank you.",
  greet: ["Oh! Hello. I was just... reading. Mostly looking at you over the page.", "Um, hi. Did you need me?", "*adjusts his glasses* You're here! I mean, hello."],
  levelup: ["You make me braver. I think I'd like to keep trying.", "I wrote something. About you. Don't read it yet!", "I trust you completely. With everything.", "You're my favourite chapter. And all the ones after it."]
};
