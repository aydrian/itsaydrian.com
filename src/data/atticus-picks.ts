export type PickCategory = "toys" | "treats" | "supplements" | "walks-home";

export type Pick = {
  slug: string;
  name: string;
  category: PickCategory;
  link: string;
  image?: string;
  imageAlt?: string;
  atticus: string;
  human: string;
  bestFor?: string[];
  featured?: boolean;
  added: string;
};

export const CATEGORIES: { id: PickCategory; label: string; emoji: string; blurb: string }[] = [
  {
    id: "toys",
    label: "Toys",
    emoji: "🧸",
    blurb: "Things he still plays with after week one. Cheap enough to replace when they lose.",
  },
  {
    id: "treats",
    label: "Treats",
    emoji: "🦴",
    blurb: "Chews and training treats that last longer than thirty seconds.",
  },
  {
    id: "supplements",
    label: "Supplements",
    emoji: "✨",
    blurb: "The two he gets every day, and why they stayed.",
  },
  {
    id: "walks-home",
    label: "Walks & Home",
    emoji: "🐾",
    blurb: "Leashes, clean-up, feeding, and the grooming tool that saves the couch.",
  },
];

export const PICKS: Pick[] = [
  {
    slug: "spiky-balls",
    name: "Spiky Dog Balls 12-pack",
    category: "toys",
    link: "https://link.amazon/B00BGOPA0",
    atticus:
      "WOOF! TWELVE whole squeaky balls that make the BEST noises and they're spiky so they massage my gums while I chomp! They bounce, they float, AND they help keep my teefies clean! My human says they're non-toxic which I guess is important but I just know they're SO MUCH FUN to chase with my short corgi legs!",
    human: "Twelve at a time, because they vanish under the couch constantly.",
    bestFor: ["heavy chewers"],
    added: "2026-05-31",
  },
  {
    slug: "chuckit-ultra-ball",
    name: "Chuckit! Ultra Ball",
    category: "toys",
    link: "https://link.amazon/B0hj6lXZM",
    atticus:
      "This is THE BEST ball for fetch time! It bounces SO high and my human can throw it super far (even if it takes me a bit longer to run there with my stumpy legs). Plus it floats in water so I can play in the pool! The rubber is nice and durable, perfect for when I get my zoomies!",
    human: "The one ball that survives a full corgi bite and still bounces.",
    bestFor: ["fetch"],
    featured: true,
    added: "2026-05-31",
  },
  {
    slug: "snuffle-mat",
    name: "Snuffle Mat for Dogs",
    category: "toys",
    link: "https://link.amazon/B07mW0U4c",
    atticus:
      "OH BOY OH BOY! This mat is like a treasure hunt for SNACKS! My human hides treats in all the little folds and I get to use my super corgi nose to find them all! It's like foraging in the wild but from the comfort of my living room! Makes me tired in a good way and slows down my eating so no more tummy aches!",
    human: "Ten minutes of nose work tires him out like a two-mile walk.",
    bestFor: ["boredom busters"],
    added: "2026-05-31",
  },
  {
    slug: "burrito-plush",
    name: "Hide and Seek Plush Burrito",
    category: "toys",
    link: "https://link.amazon/B0bYB0Ppf",
    atticus:
      "A BURRITO WITH SQUEAKY AVOCADOS INSIDE! This is basically my dream toy! I love pulling out the little avocado friends and then putting them back in (okay, my human helps with that part). They crinkle AND squeak! Perfect for when I want to show everyone my toy-hunting skills!",
    human: "Puzzle, squeaker and crinkle in one. The combination that holds his attention.",
    bestFor: ["puzzle toys"],
    added: "2026-05-31",
  },
  {
    slug: "etta-crunchy-chews",
    name: "etta says! Premium Crunchy Dog Chews",
    category: "treats",
    link: "https://link.amazon/B0imwPrrg",
    atticus:
      "Mmmmm these crunchy chews are DELICIOUS! They come in fancy flavors like duck, rabbit, and buffalo. It's like a gourmet meal for my teeth! They're grain-free (whatever that means) and help keep my chompers clean. I could chew on these for ages and my human says they're made in the USA!",
    human: "Grain-free chews that last long enough to actually matter.",
    bestFor: ["dental chews", "grain-free"],
    featured: true,
    added: "2026-05-31",
  },
  {
    slug: "probright-dental-powder",
    name: "PetLab Co. ProBright Dental Powder",
    category: "supplements",
    link: "https://link.amazon/B0aQLqJkD",
    atticus:
      "My human sprinkles this magic powder on my food and it helps keep my breath fresh and my teeth sparkly white! I'm not sure how it works but apparently it fights tartar (sounds scary but the powder makes it go away!). Now I can give my human MORE kisses!",
    human: "Sprinkled on dinner. Plaque control without a toothbrush fight.",
    bestFor: ["dental care"],
    featured: true,
    added: "2026-05-31",
  },
  {
    slug: "salmon-oil",
    name: "Brilliant Salmon Oil for Dogs",
    category: "supplements",
    link: "https://link.amazon/B0fP2xpDw",
    atticus:
      "This fishy oil makes my coat SO SHINY and soft! My human says it's from fancy Norwegian salmon and it has omega thingies that are good for me. It helps with my itchies and makes my fur extra fluffy, perfect for maximum petting! Plus it makes my dinner taste even better!",
    human: "Omega-3s for coat and skin, and the pump bottle makes it a routine.",
    bestFor: ["coat and skin"],
    added: "2026-05-31",
  },
  {
    slug: "dual-leash",
    name: "iYoShop Dual Dog Leash",
    category: "walks-home",
    link: "https://link.amazon/B0cotj50L",
    atticus:
      "Perfect for walkies with my best doggo friend! This leash lets both of us walk together without getting all tangled up (which used to happen ALL the time). It has a bungee part so if I see a squirrel and pull, it doesn't hurt my human's arm. The handles are comfy for my human too!",
    human: "Walks two dogs without tangling, and the bungee takes the pull out of a lunge.",
    bestFor: ["two dogs"],
    added: "2026-05-31",
  },
  {
    slug: "poop-bags",
    name: "Amazon Basics Dog Poop Bags",
    category: "walks-home",
    link: "https://link.amazon/B0czXamYv",
    atticus:
      "Okay so these are for the not-so-fun part of walks BUT they smell like lavender and my human says they're leak-proof which I guess is important for cleanup duty! They come with 540 bags so that's like… a LOT of walks! Plus they have a dispenser that clips to my leash!",
    human: "540 of them, lavender scented, with a dispenser that clips to the leash.",
    bestFor: ["everyday"],
    added: "2026-05-31",
  },
  {
    slug: "food-scoop",
    name: "Dog Food Scoop",
    category: "walks-home",
    link: "https://link.amazon/B0f4MXQxQ",
    atticus:
      "This scoop is VERY important because it measures my kibble! It has different sizes (1/4, 1/2, 3/4, and 1 cup) which means my human can give me EXACTLY the right amount of food. Or maybe a little extra if I'm extra good? It's easy to clean and dishwasher safe!",
    human: "Measures from a quarter cup to a full one, so portioning stops being a guess.",
    bestFor: ["portioning"],
    added: "2026-05-31",
  },
  {
    slug: "dog-seat-belt",
    name: "Seat Belt for Dogs",
    category: "walks-home",
    link: "https://link.amazon/A03FXM1X5",
    atticus:
      "Car rides are SO exciting but this belt keeps me safe! It has a bungee part so I can still move around a bit to look out the window for squirrels, but I won't go flying if my human has to stop fast. Safety first, then squirrel watching!",
    human: "Bungee buffer keeps him safe and still able to watch for squirrels.",
    bestFor: ["car rides"],
    added: "2026-05-31",
  },
  {
    slug: "grooming-kit",
    name: "Afloia 6-in-1 Dog Grooming Kit",
    category: "walks-home",
    link: "https://link.amazon/B0hxuggP6",
    atticus:
      "This thing is like a spa day at home! It vacuums up all my loose fur while my human grooms me, which means less corgi hair tumbleweeds around the house! It's pretty quiet so it doesn't scare me, and it has tools for trimming and nail grinding too. I look SO handsome after!",
    human: "A vacuum groomer, so the corgi fur ends up in the bin instead of the rug.",
    bestFor: ["shedding"],
    added: "2026-05-31",
  },
  {
    slug: "slow-feeder",
    name: "Slow Feeder Dog Bowls Insert",
    category: "walks-home",
    link: "https://link.amazon/B06yV7WSB",
    atticus:
      "This flowery insert goes in my bowl and makes eating into a fun puzzle! I have to work around the petals to get my food, which stops me from inhaling it all in 2 seconds flat. My human says it's better for my digestion and the suction cups keep it from sliding around!",
    human: "Turns dinner into a puzzle. Fewer gulped meals, fewer upset stomachs.",
    bestFor: ["fast eaters"],
    added: "2026-05-31",
  },
  {
    slug: "feeding-mat",
    name: "Waterproof Pet Feeding Mat",
    category: "walks-home",
    link: "https://link.amazon/B0dg8FaAx",
    atticus:
      "I'm a messy eater (I admit it!) but this mat catches ALL the spills and splashes! It has raised edges so water doesn't escape onto the floor. My human loves it because it's super easy to clean, just wipe or throw in the dishwasher! Plus it's non-slip so my bowls stay put!",
    human: "Raised edges. The water stays off the floor.",
    added: "2026-05-31",
  },
  {
    slug: "dog-blanket",
    name: "Waterproof Dog Blanket",
    category: "walks-home",
    link: "https://link.amazon/B06p98e92",
    atticus:
      "This is MY special blanket for the couch! It's super soft and fluffy on one side, and waterproof so if I come in from the rain or have an accident, the furniture stays protected. My human can throw it in the wash and it comes out perfect! It's basically a force field for couches!",
    human: "Waterproof underneath, fleece on top. The couch stays clean.",
    bestFor: ["furniture"],
    added: "2026-05-31",
  },
];

export const REVIEWED = "November 2026";

export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";
