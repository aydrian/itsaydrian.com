// Yokai bench stops, numbered the way Fukusaki's paper map numbers them.
// `portrait` is the yokai drawing around the map's edge and `star` is the
// numbered star on the street map, both in pixels on the 2400x1800 map scan.

export type Bench = {
  slug: string;
  stop: string;
  name: string;
  benchAt: string;
  cid: string;
  portrait: [number, number];
  star: [number, number];
  missed?: boolean;
};

export const MAP_WIDTH = 2400;
export const MAP_HEIGHT = 1800;

export const BENCHES: Bench[] = [
  { slug: "amabie", stop: "Start", name: "Amabie", benchAt: "Station-front plaza", cid: "8708203914916699527", portrait: [382, 1374], star: [510, 525] },
  { slug: "yuki-onna", stop: "1", name: "Yuki-onna", benchAt: "Erde Hall", cid: "8789510668582229971", portrait: [144, 1344], star: [750, 370] },
  { slug: "tengu", stop: "2", name: "Tengu", benchAt: "Tengu Sushi", cid: "8313393766074901097", portrait: [198, 1086], star: [620, 530] },
  { slug: "nekomata", stop: "3", name: "Nekomata", benchAt: "Gourmet Meat Nishioka", cid: "11006678157747400489", portrait: [180, 816], star: [735, 680] },
  { slug: "konaki-jiji", stop: "4", name: "Konaki-jiji", benchAt: "Saturday Sun", cid: "4033149372178285159", portrait: [168, 540], star: [1160, 610] },
  { slug: "umibozu", stop: "5", name: "Umibozu", benchAt: "Meat Shop Matsui", cid: "230718668141965013", portrait: [138, 234], star: [1275, 895] },
  { slug: "kappa", stop: "6", name: "Kappa", benchAt: "Tsujikawa Tourism and Exchange Center", cid: "10054686004399504464", portrait: [360, 228], star: [1320, 805] },
  { slug: "kuwazunyobo", stop: "6", name: "Kuwazunyobo", benchAt: "Tsujikawa Tourism and Exchange Center", cid: "7546122633079134031", portrait: [528, 228], star: [1320, 805] },
  { slug: "abura-sumashi", stop: "7", name: "Abura-sumashi", benchAt: "Tsujikawayama Park", cid: "13430944152106365701", portrait: [786, 204], star: [1425, 645] },
  { slug: "zashiki-warashi", stop: "8", name: "Zashiki-warashi", benchAt: "Mochimugi no Yakata", cid: "1829615091394446097", portrait: [1026, 180], star: [1560, 700] },
  { slug: "kappa-komahiki", stop: "9", name: "Kappa-Komahiki", benchAt: "Yokai Book Cafe", cid: "1614005730924687114", portrait: [1332, 126], star: [1565, 760], missed: true },
  { slug: "oni", stop: "10", name: "Oni", benchAt: "Monjuso", cid: "3617564564310246563", portrait: [1662, 126], star: [1860, 445] },
  { slug: "azukiarai", stop: "11", name: "Azukiarai", benchAt: "Tabedokoro Kurosuke", cid: "16103712463270248404", portrait: [1980, 108], star: [1610, 1190] },
  { slug: "sentaku-kitsune", stop: "12", name: "Sentaku Kitsune", benchAt: "Kaishumaru", cid: "14320215467963948837", portrait: [2148, 252], star: [1275, 1195] },
  { slug: "aburabo", stop: "13", name: "Aburabo", benchAt: "Yakiniku House Kitayama", cid: "9897048399790435417", portrait: [2118, 504], star: [1265, 1290] },
  { slug: "hitotsume-kozo", stop: "14", name: "Hitotsume-kozo", benchAt: "Hisaya Salad-kan", cid: "6120101375440920361", portrait: [2136, 828], star: [1265, 1345] },
  { slug: "ittan-momen", stop: "15", name: "Ittan-momen", benchAt: "FamilyMart Fukusaki-Minami IC", cid: "8921526099523736118", portrait: [2172, 1104], star: [1330, 1585] },
  { slug: "sunekosuri", stop: "16", name: "Sunekosuri", benchAt: "Bon Marché Fukusaki", cid: "10451856421042093063", portrait: [2172, 1392], star: [1080, 1030] },
  { slug: "sunakake-baba", stop: "17", name: "Sunakake-baba", benchAt: "Tanyo Shinkin Bank", cid: "1878266094762206036", portrait: [2028, 1584], star: [1265, 1085] },
  { slug: "yamanba", stop: "18", name: "Yamanba", benchAt: "Marufuku", cid: "5024573983316593018", portrait: [1758, 1548], star: [655, 995] },
];

export const pinUrl = (cid: string) => `https://maps.google.com/?cid=${cid}`;
