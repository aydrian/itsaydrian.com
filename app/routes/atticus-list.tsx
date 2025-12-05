import { useLocation } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import hideAndSeekBurrito from "~/images/atticus-list-items/burrito.jpg";
import chuckitBall from "~/images/atticus-list-items/chuckit.jpg";
import dogFoodScoop from "~/images/atticus-list-items/dog-food-scoop.jpg";
import dualDogLeash from "~/images/atticus-list-items/dual-leash.jpg";
import ettaSaysChews from "~/images/atticus-list-items/etta.jpg";
import waterproofMat from "~/images/atticus-list-items/feeding-mat.jpg";
import afloiaGroomingKit from "~/images/atticus-list-items/grooming-kit.jpg";
import waterproofBlanket from "~/images/atticus-list-items/pet-blanket.jpg";
import poopBags from "~/images/atticus-list-items/poop-bags.jpg";
import petlabDentalPowder from "~/images/atticus-list-items/probright.jpg";
import brilliantSalmonOil from "~/images/atticus-list-items/salmonoil.jpg";
import seatBelt from "~/images/atticus-list-items/seat-belt.jpg";
import slowFeederInsert from "~/images/atticus-list-items/slow-feeder.jpg";
import snuffleMat from "~/images/atticus-list-items/snufflemat.jpg";
import spikyBalls from "~/images/atticus-list-items/spikyball.jpg";
import atticus from "~/images/atticus.jpg";

export interface FavoriteItem {
  bfDeal?: boolean;
  description: string;
  name: string;
  ogImage?: null | string;
  url: string;
}

interface FavoriteCategory {
  category: string;
  emoji: string;
  items: FavoriteItem[];
}

const favoriteThings: FavoriteCategory[] = [
  {
    category: "Toys",
    emoji: "🧸",
    items: [
      {
        description:
          "WOOF! TWELVE whole squeaky balls that make the BEST noises and they're spiky so they massage my gums while I chomp! They bounce, they float, AND they help keep my teefies clean! My human says they're non-toxic which I guess is important but I just know they're SO MUCH FUN to chase with my short corgi legs!",
        name: "Spiky Dog Balls 12 pack",
        ogImage: spikyBalls,
        url: "https://amzn.to/43TTq52"
      },
      {
        description:
          "This is THE BEST ball for fetch time! It bounces SO high and my human can throw it super far (even if it takes me a bit longer to run there with my stumpy legs). Plus it floats in water so I can play in the pool! The rubber is nice and durable - perfect for when I get my zoomies!",
        name: "Chuckit! Ultra Ball",
        ogImage: chuckitBall,
        url: "https://amzn.to/49K86HK"
      },
      {
        description:
          "OH BOY OH BOY! This mat is like a treasure hunt for SNACKS! My human hides treats in all the little folds and I get to use my super corgi nose to find them all! It's like foraging in the wild but from the comfort of my living room! Makes me tired in a good way and slows down my eating so no more tummy aches!",
        name: "Snuffle Mat for Dogs",
        ogImage: snuffleMat,
        url: "https://amzn.to/3M3MvQH"
      },
      {
        description:
          "A BURRITO WITH SQUEAKY AVOCADOS INSIDE! This is basically my dream toy! I love pulling out the little avocado friends and then putting them back in (okay, my human helps with that part). They crinkle AND squeak! Perfect for when I want to show everyone my toy-hunting skills!",
        name: "Hide and Seek Plush Burrito",
        ogImage: hideAndSeekBurrito,
        url: "https://amzn.to/3M1BTlf"
      }
    ]
  },
  {
    category: "Treats",
    emoji: "🦴",
    items: [
      {
        description:
          "Mmmmm these crunchy chews are DELICIOUS! They come in fancy flavors like duck, rabbit, and buffalo - it's like a gourmet meal for my teeth! They're grain-free (whatever that means) and help keep my chompers clean. I could chew on these for ages and my human says they're made in the USA!",
        name: "etta says! Premium Crunchy Dog Chews",
        ogImage: ettaSaysChews,
        url: "https://amzn.to/4onXbah"
      }
    ]
  },
  {
    category: "Supplements",
    emoji: "✨",
    items: [
      {
        description:
          "My human sprinkles this magic powder on my food and it helps keep my breath fresh and my teeth sparkly white! I'm not sure how it works but apparently it fights tartar (sounds scary but the powder makes it go away!). Now I can give my human MORE kisses!",
        name: "PetLab Co. ProBright Dental Powder",
        ogImage: petlabDentalPowder,
        url: "https://amzn.to/3Xi9jhZ"
      },
      {
        description:
          "This fishy oil makes my coat SO SHINY and soft! My human says it's from fancy Norwegian salmon and it has omega thingies that are good for me. It helps with my itchies and makes my fur extra fluffy - perfect for maximum petting! Plus it makes my dinner taste even better!",
        name: "Brilliant Salmon Oil for Dogs",
        ogImage: brilliantSalmonOil,
        url: "https://amzn.to/4ai8VaN"
      }
    ]
  },
  {
    category: "Other",
    emoji: "🐾",
    items: [
      {
        description:
          "Perfect for walkies with my best doggo friend! This leash lets both of us walk together without getting all tangled up (which used to happen ALL the time). It has a bungee part so if I see a squirrel and pull, it doesn't hurt my human's arm. The handles are comfy for my human too!",
        name: "iYoShop Dual Dog Leash",
        ogImage: dualDogLeash,
        url: "https://amzn.to/4imHBdH"
      },
      {
        description:
          "Okay so these are for the not-so-fun part of walks BUT they smell like lavender and my human says they're leak-proof which I guess is important for cleanup duty! They come with 540 bags so that's like... a LOT of walks! Plus they have a dispenser that clips to my leash!",
        name: "Amazon Basics Dog Poop Bags",
        ogImage: poopBags,
        url: "https://amzn.to/3JZfVPn"
      },
      {
        description:
          "This scoop is VERY important because it measures my kibble! It has different sizes (1/4, 1/2, 3/4, and 1 cup) which means my human can give me EXACTLY the right amount of food. Or maybe a little extra if I'm extra good? It's easy to clean and dishwasher safe!",
        name: "Dog Food Scoop",
        ogImage: dogFoodScoop,
        url: "https://amzn.to/3Ks7ADN"
      },
      {
        description:
          "Car rides are SO exciting but this belt keeps me safe! It has a bungee part so I can still move around a bit to look out the window for squirrels, but I won't go flying if my human has to stop fast. Safety first, then squirrel watching!",
        name: "Seat Belt for Dogs With Elastic Bungee Buffer",
        ogImage: seatBelt,
        url: "https://amzn.to/3M8Ckdu"
      },
      {
        description:
          "This thing is like a spa day at home! It vacuums up all my loose fur while my human grooms me, which means less corgi hair tumbleweeds around the house! It's pretty quiet so it doesn't scare me, and it has tools for trimming and nail grinding too. I look SO handsome after!",
        name: "Afloia 6-in-1 Dog Grooming Kit",
        ogImage: afloiaGroomingKit,
        url: "https://amzn.to/4ojjj5u"
      },
      {
        description:
          "This flowery insert goes in my bowl and makes eating into a fun puzzle! I have to work around the petals to get my food, which stops me from inhaling it all in 2 seconds flat. My human says it's better for my digestion and the suction cups keep it from sliding around!",
        name: "Slow Feeder Dog Bowls Insert",
        ogImage: slowFeederInsert,
        url: "https://amzn.to/48h8o6j"
      },
      {
        description:
          "I'm a messy eater (I admit it!) but this mat catches ALL the spills and splashes! It has raised edges so water doesn't escape onto the floor. My human loves it because it's super easy to clean - just wipe or throw in the dishwasher! Plus it's non-slip so my bowls stay put!",
        name: "Waterproof Pet Feeding Mat",
        ogImage: waterproofMat,
        url: "https://amzn.to/3M8D6qU"
      },
      {
        description:
          "This is MY special blanket for the couch! It's super soft and fluffy on one side, and waterproof so if I come in from the rain or have an accident, the furniture stays protected. My human can throw it in the wash and it comes out perfect! It's basically a force field for couches!",
        name: "Waterproof Dog Blanket",
        ogImage: waterproofBlanket,
        url: "https://amzn.to/4ioApNS"
      }
    ]
  }
];

export default function AtticusList() {
  const location = useLocation();
  const title = "Atticus's Favorite Things";
  const description =
    "A curated list of products we use and love. From toys to treats to supplements, these are Atticus's top picks for a happy and healthy doggo life.";
  const imageUrl = `https://itsaydrian.com${atticus}`;
  const pageUrl = `https://itsaydrian.com${location.pathname}`;

  return (
    <>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />
      <meta content={pageUrl} property="og:url" />
      <meta content="website" property="og:type" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image" />
      <meta content="@itsaydrian" name="twitter:creator" />

      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <img
            alt="Atticus the Corgi"
            className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
            src={atticus}
          />
          <h1 className="text-foreground text-3xl font-bold">
            Atticus&apos;s Favorite Things
          </h1>
          <p className="text-foreground/80 mt-2 text-lg">{description}</p>
          <p className="text-foreground/80 mt-2 text-sm">
            As an Amazon affiliate, I earn from qualifying purchases.
          </p>
        </header>

        <nav className="mb-12 flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {favoriteThings.map((section) => (
              <li key={section.category}>
                <a
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring border-input hover:bg-accent rounded-full border bg-transparent px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  href={`#${section.category.toLowerCase()}`}
                >
                  <span className="mr-2">{section.emoji}</span>
                  <span>{section.category}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="space-y-12">
          {favoriteThings.map((section) => (
            <section id={section.category.toLowerCase()} key={section.category}>
              <h2 className="text-foreground mb-6 text-2xl font-semibold">
                {section.emoji} {section.category}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <a
                    className="group"
                    href={item.url}
                    key={item.name}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Card className="flex h-full cursor-pointer flex-col transition-all hover:scale-[1.02] hover:shadow-lg">
                      {item.ogImage && (
                        <CardContent className="p-0">
                          <img
                            alt={item.name}
                            className="aspect-video w-full rounded-t-lg object-contain"
                            src={item.ogImage}
                          />
                        </CardContent>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle>{item.name}</CardTitle>
                          {item.bfDeal && (
                            <Badge variant="destructive">
                              Cyber Monday Deal
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}
