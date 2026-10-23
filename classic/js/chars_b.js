/* Part B: Dante, Kai, Brock */
CHARS.dante = {
  id: "dante", name: "Dante", full: "Dante Moreau", age: 32, species: "Black panther", img: "assets/dante.webp",
  tag: "Smooth, teasing panther chef",
  bio: "A sleek black panther with golden eyes, a gold hoop earring and a smirk that should require a licence. A chef who flirts like breathing, calls you 'boss', and is quietly delighted whenever someone teases him back.",
  face: [0.46, 0.15, 3.1], blush: [45, 17],
  rent: 80, trust0: 15, need: 30, fav: "wine", favZones: ["neck", "abs"], nogo: "face",
  likes: ["kitchen", "rooftop", "lounge"], moveIn: { cost: 600, req: ["lounge"] },
  zones: [
    ["thighs", "100,780 560,770 600,860 520,1024 80,1024 60,900"],
    ["abs", "200,520 460,520 620,540 640,700 580,770 200,780"],
    ["chest", "210,340 330,300 480,330 560,300 600,420 580,520 430,520 330,520 250,500 190,420"],
    ["arms", "0,590 130,500 220,380 180,520 200,640 120,740 0,740"],
    ["arms", "540,290 700,280 768,380 768,860 650,880 600,700 590,500"],
    ["neck", "300,260 400,255 480,280 470,340 330,340"],
    ["hands", "0,590 130,610 150,690 40,720 0,700"],
    ["hands", "520,880 700,860 720,1000 560,1024 520,960"],
    ["face", "235,60 300,25 420,10 460,80 470,150 400,250 330,285 270,240 240,140"]
  ],
  v: [
    ["Careful, boss. You'll burn the roast. Or me.", "Kitchen's closed to the public. Staff only. ...Though I could make an exception.", "Oh? Straight to touching? Bold. I like bold. I'm just not easy.", "Mm. You'll have to work for it. I'm worth the effort.", "Flattery gets you a garnish. Touching gets you a raised eyebrow.", "I plate better than I dodge. Try again?", "S|Don't look at me like that. I'll start thinking you're hungry.", "S|You're dangerous, you know that? Landlords shouldn't be allowed to smile like that."],
    ["Mm. Alright. That's... not terrible, boss. Do it again.", "Careful. You're making this panther purr, and I never purr for free.", "I'm blushing under all this fur, and I hate it. Keep going anyway.", "You've got good hands. Don't let it go to your head.", "Hm. I might actually be losing the upper hand here. Amusing.", "Oh, you're a quick study. Dangerous. I'm into it.", "S|Don't stop. I'm pretending I'm still in control. Let me have that.", "S|If you're going to tease me, at least do it properly."],
    ["T|*purring openly now* Mm. You know exactly what you're doing, don't you, boss?", "T|Come closer. I'll show you what I'm made of.", "T|I'm usually the one doing the cooking. Tonight, you're the main course.", "T|*golden eyes dark* You're getting me riled up. I like it.", "S|Don't stop. Please. I'm— fuck. Not used to saying please.", "S|I want you. Right here. Right now. Say yes.", "E|I'm hard as steel against my apron, boss. Take responsibility.", "E|Tell me where you want my mouth, and I'll make you forget your name."],
    ["T|*voice rough, silk gone* Boss. Please. I'll do anything.", "T|You've undone me. Completely. Don't you dare stop.", "T|I'm yours. The chef, the panther, all of it.", "S|I can't hold on. Please. I need you so badly.", "S|Take me. Mark me. I'm yours tonight.", "E|Fuck, I'm throbbing. Finish me. Please. I'll beg. I'm begging.", "E|On the counter, against the wall, I don't care where. Now.", "E|I want you inside me. Or me inside you. Anything. Everything."]
  ],
  z: {
    face: ["*raises an eyebrow, golden eyes glinting* Touching the chef's face? That's a premium service, boss.", "*a slow, pleased smile* That's good. Gentle. Dangerously good.", "*leans his cheek into your palm, purring* Kiss me. I know you want to.", ["T|*golden eyes half-lidded* You've got me exactly where you want me.", "E|*captures your thumb between his lips, tongue swirling slowly* That's a taste of what I can do."]],
    neck: ["*tilts his head, amused* Checking my pulse? It's steady. Mostly.", "*a low, pleased rumble* There. That spot. How did you find it so fast?", "*arches into your hand* Neck. Nape. Anywhere you like, boss.", ["T|*purring, tail curled around your leg* Bite me. I want to feel it tomorrow.", "E|*moans, grinding back into you* I'll fall apart right here in the kitchen if you keep that up."]],
    chest: ["*smirks, apron strings loose* Admiring the view? Dinner includes a show.", "*his breath catches under your palm* Careful. I'm sensitive there. Don't tell anyone.", "*presses your hand flat against his chest* Feel that? That's the pulse of a panther who wants you.", ["T|*groans* Harder. I'm not made of glass, boss.", "E|*shudders as you tease his nipples, hips pressing into yours* Fuck, yes. Right there."]],
    abs: ["*chuckles* I do two hundred crunches a night. For the staff, of course.", "*abs tensing under your fingers* Heh. That's low enough, boss. ...No, lower is fine.", "*guides your hand across his stomach* Down. Lower. Be brave.", ["T|*golden eyes dark* You're going to make me ruin this apron.", "E|*pushes your hand lower, over the straining front of his trousers* Feel that? That's what you did."]],
    arms: ["*flexes lazily* The arms that carry heavy pots. And light flirts.", "*pulls you closer, smirking* Come on. Don't be shy. I'm only a little dangerous.", "*wraps you in his arms, voice a low rumble* I could lift you onto the counter. Want me to?", ["T|*presses you to his chest, claws tracing your back* Mine. Just for tonight.", "E|*lifts you onto the marble and grinds against you* Say yes."]],
    hands: ["*waggles his fingers, grinning* Careful. These are insured.", "*takes your hand, pressing a kiss to your knuckles* A gentleman always asks first. ...May I?", "*kisses each fingertip slowly* You taste like trouble. I'm weak for trouble.", ["T|*presses your palm to his lips* I'll cook for you every night, boss. Just don't let go.", "E|*guides your hand down his stomach, groaning* Lower. You know where."]],
    thighs: ["Oh? A little forward, boss. Is this part of the lease?", "*his tail flicks, breath uneven* ...Alright. I'll allow it. For now.", "*parts his legs, smirking through a shaky breath* You wanted a tour. Welcome to the thighs.", ["T|*grabs your wrist and presses it upward* Closer. I'm done being patient.", "E|*gasps as you grip him through the cloth* Ah— fuck. Right there. Don't you dare stop."]]
  },
  finale: {
    build: [
      "Dante locks the kitchen door with a lazy flick of the wrist. \"Dinner can wait, boss.\" He steps in close, apron strings dangling, golden eyes bright in the low light. \"I'd much rather have dessert.\"",
      "He lifts you onto the counter, his hands warm at your waist, his smile slow and dangerous. \"Let me take care of you,\" he purrs against your ear, every word a velvet promise. The apron falls to the floor; so does the last of your hesitation.",
      "He pins your wrists to the marble with one big hand and drags his mouth down your throat. \"Tell me what you want, and I'll make you beg for it,\" he growls, hips pressing hard into yours, unmistakably ready. The apron hits the floor. He has all night, and he plans to use it."
    ],
    climax: [
      "He is patient, devastating, attentive in every way. By the time the world narrows to his voice and his hands, you've forgotten what it was like to be anything but his.",
      "He builds you up slowly, wringing every sound from you, murmuring praise against your skin. When he finally lets go himself it's with a low, shaking purr that you feel in your bones.",
      "He takes his time, relentless, exacting, whispering exactly what he's going to do next and then doing it. You're reduced to gasps and his name. When you finally come, he follows with a groan that rattles the glasses on the shelf."
    ],
    after: [
      "He wipes sauce from your cheek and smirks. \"Consider that a complimentary tasting menu.\" He's insufferable. You're grinning anyway.",
      "Later, he hand-feeds you leftover dessert in the dark kitchen, purring. \"Stay for breakfast. I make it better than anyone.\" For once there's no smirk. Just warmth."
    ]
  },
  dates: [
    "Dante cooks a six-course tasting menu for two on the lounge table, wine decanted, candles lit. He narrates every dish in a voice like warm caramel, and feeds you the last bite from his fork. \"Admit it,\" he says. \"This is the best date you've had.\" It might be.",
    "Rooftop, after midnight. He wraps his jacket around your shoulders, pours wine, and for once says nothing clever. \"I don't do this,\" he admits, golden eyes on the skyline. \"Stay close, boss.\""
  ],
  giftLike: ["Mm. A gift for the chef? You're spoiling me, boss.", "*accepts with a theatrical bow* I'll remember this. And I'll repay it. Handsomely."],
  giftFav: "*eyes widen, then the smirk goes soft* A vintage like this? ...You've got taste, boss. I'm opening it tonight. With you.",
  greet: ["Boss. Hungry?", "*leaning on the counter* Looking for me, or looking at me?", "Mm. Back for a taste?"],
  levelup: ["Careful, boss. I might actually start liking you.", "You've got my trust. Rare thing. Handle with care.", "I'd cook for you every night. And do much more besides.", "Mine. And I'm yours. No smirk. Just the truth."]
};

CHARS.kai = {
  id: "kai", name: "Kai", full: "Kai Moreno", age: 24, species: "Human", img: "assets/kai.webp",
  tag: "Sunny golden-retriever lifeguard",
  bio: "A tanned, cheerful, endlessly optimistic human lifeguard in red board shorts, with a whistle he blows far too often. An adult (24) who is warm, honest and a little oblivious — right up until he realises you're flirting. Then he's all-in.",
  face: [0.4, 0.13, 3.1], blush: [40, 14],
  rent: 45, trust0: 35, need: 20, fav: "shake", favZones: ["abs", "arms"], nogo: "neck",
  likes: ["gym", "rooftop"], moveIn: { cost: 400, req: ["gym"] },
  zones: [
    ["thighs", "100,770 560,740 600,850 520,1024 50,1024"],
    ["abs", "260,540 480,545 590,540 620,690 540,780 330,790 250,700"],
    ["chest", "225,330 340,290 520,300 590,390 580,520 480,545 340,540 255,520 220,430"],
    ["arms", "20,540 80,420 235,330 245,520 150,640 120,700 20,680"],
    ["arms", "520,260 660,240 740,330 768,380 768,860 700,900 640,760 620,560 590,420"],
    ["neck", "250,225 330,265 400,230 470,270 440,330 290,330 250,300"],
    ["hands", "95,285 235,300 230,430 130,450 95,370"],
    ["hands", "450,780 620,800 650,900 520,930"],
    ["face", "165,95 250,10 380,0 430,70 410,170 330,265 240,225 200,165"]
  ],
  v: [
    ["Ha! Dude, that tickles! What're you doing?", "Is this a lifeguard inspection? I swear I'm certified!", "Oh— uh— hey! Haha. Sorry. That caught me off guard.", "You okay? You've got that look. The 'I'm about to touch Kai' look.", "I'm just gonna... laugh nervously. One sec.", "Hahaha— wait. Is this flirting? Are you flirting with me?", "S|Okay, that's... kinda nice, actually. Why's that nice?", "S|My brain just went blank. Like, white noise."],
    ["Okay, wow, that's— that's really nice. Keep going?", "I'm not blushing, it's the sun. It's totally the sun. Indoors. Shut up.", "Whoa. You're so warm. Why is that so good?", "I can't stop smiling, look at me. I look ridiculous.", "Can you do that again? Like, a lot?", "Hold on, my heart's going crazy. Is yours? Check.", "S|I think I like you. Like, like-like. Is that weird?", "S|Don't stop. Seriously. Please don't stop."],
    ["T|Oh man. Oh wow. Yeah. Right there. Please.", "T|You're driving me crazy. In the best way.", "T|Come here, come closer. I wanna feel you.", "T|I've never felt like this. It's so intense.", "S|*breathless laugh* I'm all worked up. Look at me.", "S|Kiss me. Please. I wanna taste you.", "E|I'm so hard right now. It's embarrassing. It's awesome. Touch me.", "E|Whatever you want. Take me. I'm yours. Please."],
    ["T|I can't— I can't think. Everything's you. Only you.", "T|Please, I'm shaking. Don't stop. Don't ever stop.", "T|*huge, wrecked grin* This is the best day of my entire life.", "S|I need you. I need you so badly it hurts.", "S|I'm so close, I'm gonna lose it. Please.", "E|Fuck, I'm begging you. Finish me. Please, I'm gonna cum.", "E|Take me right here. On the lounger. I don't care who hears.", "E|I'm all yours. Use me. Wreck me. Anything you want."]
  ],
  z: {
    face: ["Hey! Careful, the sunscreen's still wet! ...What are you doing?", "*grin wobbling, cheeks flushed* Your hands are really warm. It's... nice.", "*closes his eyes and leans in* Come on, kiss me. Please. I've been dying to ask.", ["T|*cups your hand against his cheek, grin gone soft* You're so beautiful. Like, ridiculous.", "E|*kisses your palm, then licks a slow stripe up your finger* Mm. Salt. Delicious."]],
    neck: ["Ah! Not the neck! Seriously, I'm so ticklish! *wriggles away, laughing*", "*shivers* Okay, that tickled. And then it didn't. Weird.", "*tilts his head, exhaling* Okay. Okay. That's... Yeah. Do that.", ["T|*gasps, grabbing your arm* My neck's so sensitive. Why didn't I know that?", "E|*moaning softly* Bite me. Mark me. Everyone can see. I want them to."]],
    chest: ["Oh! Yeah, I work out. You can, uh, feel. If you want? Haha.", "*heart pounding under your palm* Whoa. That's... my heart. It never does that.", "*grins breathlessly, pressing into you* Harder. Come on, I can take it.", ["T|*gasps, back arching* Fuck, that's so good. Don't stop.", "E|*moans as you tease his nipples* Ah, there! Please, more!"]],
    abs: ["Abs! Yeah! Count 'em! Six! Eight if you squint! Haha!", "*muscles quivering, laughter fading* Whoa. That's... different tickling. Good different.", "*bites his lip, hips shifting* Lower. Come on. Please. You can.", ["T|*gripping your shoulder* You're gonna make me lose it, and you're not even trying.", "E|*pushes your hand to his shorts, groaning* Feel what you do to me?"]],
    arms: ["Guns! Haha! Wanna feel? I'm basically a buoy. A very strong buoy.", "*beams, flexing slowly* You like those, huh? I like that you like those.", "*scoops you up and holds you against his chest* Hold on. I've got you. Always.", ["T|*presses his face into your neck, trembling* Stay. Stay right here, please.", "E|*lifts you, grinding against you* Feel how much I want you?"]],
    hands: ["Haha, a high five? Hands are good! Hands!", "*laces his fingers through yours* Hey. This feels... really right.", "*kisses your knuckles, blushing* I've wanted to do that forever.", ["T|*presses your hand to his heart* You're everything. Seriously.", "E|*drags your hand lower under his waistband* Please. Here. Now."]],
    thighs: ["Whoa! Hey! Personal space! Haha— okay, that's close.", "*breath catching, leg shivering* Oh. Oh wow. Okay. That's... Okay.", "*his legs fall open, breathless laugh* Yeah. You can. Do it. Please.", ["T|*clutching the lounger* I can't breathe. In a good way. Don't stop.", "E|*groans as you cup him through the shorts* Ah— oh my god— right there. Please."]]
  },
  finale: {
    build: [
      "Kai's laughing about something dumb when it hits him. You're close, and he goes quiet. \"Hey,\" he says, softer. \"Can I kiss you? Like, a lot?\" His grin is nervous and brilliant at the same time.",
      "He tastes like salt and sunscreen and peppermint gum. He kisses you like a summer wave, enthusiastic, warm, dragging you under. His hands slide up your back. \"You're so hot,\" he breathes, laughing at himself. \"Sorry. I mean, yeah. You're so hot.\"",
      "He pulls you onto the sun-warmed lounger, red shorts already tenting, eager hands everywhere. \"I've wanted to do this since you gave me the keys,\" he confesses against your mouth. \"Can I, please, can I touch you? Everywhere?\""
    ],
    climax: [
      "The sunset burns orange behind you. Everything is laughter, kisses, whispered nonsense, and arms that hold you like you're the best thing that's happened to him all summer.",
      "He's loud, honest, and gorgeous about it, gasping \"oh my god, oh, right there\", clutching you with golden, trembling hands until the wave crashes through him and you ride it out together.",
      "He can't stop talking, can't stop moaning, rolling his hips into yours with desperate enthusiasm. \"Don't stop, I'm gonna, fuck,\" he cries, coming hard and blissful, and the sound drags you over right after."
    ],
    after: [
      "He flops back, grinning at the sky. \"Okay. Wow. Best shift ever.\" He turns, suddenly a little shy. \"So... can we do that again? Soon? Like, tomorrow?\"",
      "He sprawls across you, sun-warmed, heart still hammering. \"I think I'm in love with you,\" he mumbles, then hides his face. \"Pretend I didn't say that. ...Actually, don't.\""
    ]
  },
  dates: [
    "Kai drags you to the beach at dawn, a thermos of terrible coffee in hand. He teaches you to skip stones, loses spectacularly, and laughs so hard he has to sit down. \"Best date ever,\" he decides. You don't argue.",
    "A midnight swim on the rooftop. Kai floats on his back, naming constellations wrongly with total confidence. When you swim over, he takes your hand underwater. \"You're my favourite person here,\" he says, not joking at all."
  ],
  giftLike: ["Whoa, for me? You're the best!", "*huge grin* Dude. I love it. Thank you!"],
  giftFav: "*whoops* A protein shake! Exactly what I needed! You get me! *hugs you hard, dripping, then goes bright red*",
  greet: ["Heyyy! Just finished my shift! You need anything?", "*waves the whistle* Landlord! Looking good!", "Oh hey! I was just thinking about you. Uh— not in a weird way."],
  levelup: ["I'm so glad I moved in. For real.", "You make everything brighter. It's kind of unfair.", "I trust you. Like, completely. That's a big deal for me.", "I love you. Like, a lot. I'm saying it. Out loud."]
};

CHARS.brock = {
  id: "brock", name: "Brock", full: "Brock Halloran", age: 36, species: "Brown bear", img: "assets/brock.webp",
  tag: "Warm, sleepy gentle-giant baker",
  bio: "A big, bearded brown bear who bakes the building's bread at 4am and hugs like he means it. Nurturing, a little shy about his size, quick to blush and quicker to feed you. Calls everyone 'sweetheart' and means it.",
  face: [0.47, 0.17, 3.1], blush: [46, 19],
  rent: 65, trust0: 30, need: 20, fav: "flowers", favZones: ["chest", "abs"], nogo: "hands",
  likes: ["kitchen", "lounge", "sauna"], moveIn: { cost: 500, req: ["lounge"] },
  zones: [
    ["thighs", "120,830 520,800 580,900 560,1024 50,1024"],
    ["abs", "180,540 620,540 650,700 600,800 200,820 180,700"],
    ["chest", "140,300 330,330 600,300 640,430 620,560 480,520 300,520 150,520 110,420"],
    ["arms", "0,520 100,420 150,500 180,640 100,700 0,680"],
    ["arms", "560,250 700,230 768,300 768,860 700,900 640,740 630,560 610,380"],
    ["neck", "230,290 330,300 490,290 650,250 600,320 480,350 280,350"],
    ["hands", "0,740 80,800 130,830 30,840 0,820"],
    ["hands", "510,790 650,740 690,900 600,970 520,930"],
    ["face", "235,45 300,10 420,5 460,60 490,150 440,280 330,300 270,260 240,140"]
  ],
  v: [
    ["Oh! Hello there, sweetheart. Careful, I'm covered in flour.", "Aw shucks. You're gonna make this old bear blush.", "Easy, easy. I'm ticklish. Very ticklish. Don't tell the others.", "Hm? Oh. Oh. Well. That's, uh... unexpected.", "I— you know I'm twice your size, right? ...It's okay. Go on.", "Heh. Gentle hands. I like gentle hands.", "S|You're a brave one, aren't you, sweetheart?", "S|I'm not used to being touched like I'm... wanted."],
    ["Mm. That's nice, sweetheart. Real nice.", "*cheeks turning pink under his fur* Don't stop on my account.", "My, my. You're making my heart do a little dance.", "You smell like cinnamon. Or maybe that's me.", "It's been a long time since someone touched me like that.", "Come closer. I won't crush you. Promise.", "S|*warm rumble* I like having you near. Real close.", "S|Keep that up and this bear's gonna start purring."],
    ["T|*deep, content rumble* Mm. Yes. Right there, sweetheart.", "T|You've got me wrapped around your finger. Not that I mind.", "T|Come here. Let me hold you. I want you close.", "T|I'd give you the whole bakery if you asked.", "S|*pulling you in* Don't stop. Please. It feels too good.", "S|I want you. All of you. Have for a while.", "E|I'm so hard, sweetheart. I've been wanting you for days.", "E|Touch me. Please. I want your hands everywhere."],
    ["T|*voice low and wrecked* Sweetheart. Please. I'm all yours.", "T|You've melted me completely. Like butter.", "T|I can't hold back. Don't make me.", "S|Please. I need you. I need you so much.", "S|Hold me. Never let go. Please.", "E|Take me. Fill me. I'll give you everything. All of it.", "E|I'm so close, sweetheart. Don't stop. Don't you dare.", "E|Ride me, right here on the couch. I'll hold you steady."]
  ],
  z: {
    face: ["*chuckles, whiskers flexing* Careful, you'll get flour on your hand.", "*blushes under his beard, eyes crinkling* That's... thoughtful. Real thoughtful.", "*leans into your palm, eyes sliding shut* Kiss me, sweetheart. I'd like that.", ["T|*nuzzles your wrist, beard tickling* You're so good to me. Too good.", "E|*kisses your fingertips, then sucks one gently* Mm. Sweet. Like honey."]],
    neck: ["Ha! That's my ticklish spot. Don't you dare tell the neighbours.", "*rumbles quietly, shoulders relaxing* Mm. That's good. Right there.", "*tilts his head, exposing his throat* You can bite, if you like. I trust you.", ["T|*shivering, rumbling* Careful. You'll turn me into a puddle.", "E|*groans, pressing back against you* Do that again, sweetheart. I'm weak for it."]],
    chest: ["*laughs softly, patting his chest* Plenty of cushion for the pushin'. Go on.", "*his heart thuds heavy under your palm* Feel that? That's you, sweetheart.", "*pulls your hands closer, flexing* Squeeze. I like when you squeeze.", ["T|*groans deep in his chest* Nobody's ever touched me like that. It's... overwhelming.", "E|*shudders as you tease him, rumbling moan* Right there. Oh, sweetheart, right there."]],
    abs: ["*pats his belly, laughing* Soft on the outside. Strong underneath. Mostly bread.", "*breath hitching* That's... a gentle touch. A real gentle touch.", "*guides your hand slowly lower* Don't be shy, sweetheart. There's plenty to explore.", ["T|*heat rolling off him* You're driving this old bear to distraction.", "E|*the apron is tenting hard* Look what you've done to me. Don't be shy. Touch."]],
    arms: ["Want to feel? Years of kneading dough. Don't tell anyone I'm vain about it.", "*smiles shyly* You like 'em? They're good for hugs. Mostly.", "*scoops you into his lap with one arm* Come here. Let me hold you. I won't let go.", ["T|*cradling you, voice a murmur* Safe. You're safe here. Always.", "E|*rocks you against his lap, rumbling* Feel how much I want you, sweetheart?"]],
    hands: ["Whoops, flour! Let me wipe— oh. Your hand's in mine. Hm.", "*warm paws enclose yours* Hands like yours deserve to be held. Gently.", "*kisses your knuckles, whiskers tickling* Thank you. For being kind to me.", ["T|*holds your hand to his cheek* I could get used to this. I think I already have.", "E|*guides your hand down his belly* Further. Please, sweetheart."]],
    thighs: ["Oh! Well! That's... close. Real close. *clears his throat*", "*thighs trembling under your palm* Easy there. I've got a lot of nerves down there.", "*his legs fall open, big and warm* Go on. I won't mind. I'd like it.", ["T|*grips the couch cushion* Sweetheart. Please. I'm all keyed up.", "E|*groans, hips pushing up* Right there. Don't stop. Please, don't stop."]]
  },
  finale: {
    build: [
      "Brock sets the tray of bread aside with enormous care. \"Come here, sweetheart.\" His voice is soft and sleepy, his arms open. \"Let me hold you a while.\" Warm light, warm hands, the smell of yeast and cinnamon.",
      "He sinks onto the big couch, pulling you into his lap like you weigh nothing. His beard tickles your neck, his hands are enormous and endlessly gentle. \"You've been working so hard,\" he rumbles. \"Let me take care of you.\" His kisses are slow, patient, devastating.",
      "He peels the apron off with a chuckle and gathers you up against all that soft, solid heat. \"I'm a big fella,\" he murmurs, kissing your jaw, \"so I'll go slow. You tell me if it's too much.\" He is hard against your thigh, and stunningly careful."
    ],
    climax: [
      "He holds you through every wave. Murmured praise, a hand stroking your hair, the steady thunder of his heart under your cheek. It's less a fire than a deep, golden tide.",
      "He's slow and thorough, the rumble of his moans echoing in his chest. He murmurs \"that's it, good, you're perfect\" until you're trembling, and then he follows with a deep, groaning sigh and your name on his lips.",
      "He moves with a deep, patient rhythm, whispering praise into your hair, until you're clutching his shoulders and he's moaning low, wrecked, saying your name. When he finally comes it's with a shudder that shakes the whole sofa."
    ],
    after: [
      "He drapes a blanket over both of you and hums, flustered. \"Hope I didn't, well. Was that okay?\" You assure him. He beams, ears pink.",
      "He's already planning breakfast. \"Cinnamon rolls. And then maybe a nap. With you. Always with you.\" He kisses your forehead like it's a promise."
    ]
  },
  dates: [
    "Brock packs a picnic basket with enough food for eight and takes you to the park. He feeds you a still-warm cinnamon roll, thumb brushing sugar from your lip. \"Eat,\" he says gently. \"You're too thin for how hard you work.\"",
    "A quiet evening on the lounge couch, a blanket over both of you, a movie neither of you watches. He falls asleep with his arm around you, snoring softly. You stay exactly where you are."
  ],
  giftLike: ["Aw, for me? You're too kind, sweetheart.", "*clutches it, ears flushing* Thank you. Really. Nobody does this for me."],
  giftFav: "*goes completely misty-eyed* Flowers? For me? ...Sweetheart. *hugs you so carefully, so warmly* I'll keep them forever.",
  greet: ["Morning, sweetheart! Fresh bread's up.", "*wipes his paws on his apron* Oh! Hello, you.", "Come sit. I'll put the kettle on."],
  levelup: ["Feels like home with you around, sweetheart.", "I trust you with my whole heart. Big as it is.", "I'd bake you a cake every day. For the rest of my life.", "I love you. Plain and simple. Always will."]
};
const CHAR_ORDER = ["wolf", "bash", "dante", "kai", "brock"];
