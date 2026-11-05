export type GearItem = {
  slug: string;
  name: string;
  blurb: string;
  link: string;
};

export const GEAR: GearItem[] = [
  {
    slug: "rechargeable-hand-warmers",
    name: "Rechargeable Hand Warmers (2-pack)",
    blurb:
      "Two magnetic halves that split into a warmer for each pocket, three heat levels, and they charge over USB-C. Standing still for 90 minutes in December is a lot more fun with these.",
    link: "https://link.amazon/B09FxA1j8",
  },
  {
    slug: "anker-nano-3in1",
    name: "Anker Nano 3-in-1 Portable Charger",
    blurb:
      "The one I take on trips. The USB-C cable and the wall plug are built in, so there is nothing else to pack and nothing to lose in a hotel room.",
    link: "https://link.amazon/B06KzpxH1",
  },
  {
    slug: "anker-zolo-magnetic",
    name: "Anker Zolo Magnetic Power Bank",
    blurb:
      "The magnetic one. It sticks to the back of the phone and charges wirelessly, which is what you want when the phone is also the camera.",
    link: "https://link.amazon/B00tRlvMN",
  },
  {
    slug: "moft-snap-tripod",
    name: "MOFT Snap Tripod Stand & Wallet",
    blurb:
      "A card wallet that folds into a phone tripod. It lives in my jacket pocket, and it is how I shoot dusk photos of the lights without hauling a full tripod around my neck.",
    link: "https://link.amazon/B0ce6VuWY",
  },
];

export const GEAR_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";
