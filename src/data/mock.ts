import type { Product, Seller } from "@/types";

const footballVisuals = {
  stadium: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1400&q=80",
  shirts: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
  pitch: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
  boots: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
  crowd: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
  worldCup: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
  locker: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
};

export const sellers: Seller[] = [
  { id: "s1", name: "KitVault Factory", marketplace: "AliExpress", rating: 4.8, trustScore: 92, orders: 18420, refundRate: 1.8, avgDeliveryDays: 9 },
  { id: "s2", name: "GoalEra Apparel", marketplace: "DHGate", rating: 4.6, trustScore: 86, orders: 11304, refundRate: 2.7, avgDeliveryDays: 12 },
  { id: "s3", name: "Matchday Direct", marketplace: "Temu", rating: 4.5, trustScore: 81, orders: 8201, refundRate: 3.1, avgDeliveryDays: 7 },
  { id: "s4", name: "Retro11 Store", marketplace: "AliExpress", rating: 4.9, trustScore: 95, orders: 32110, refundRate: 1.1, avgDeliveryDays: 10 },
  { id: "s5", name: "Terrace Archive NL", marketplace: "Instagram Seller", rating: 4.7, trustScore: 89, orders: 6240, refundRate: 2.2, avgDeliveryDays: 5 },
  { id: "s6", name: "Classic Kit Market", marketplace: "Retro Marketplace", rating: 4.8, trustScore: 93, orders: 9420, refundRate: 1.5, avgDeliveryDays: 6 },
  { id: "s7", name: "Prime Fanwear", marketplace: "Amazon", rating: 4.4, trustScore: 78, orders: 28900, refundRate: 3.6, avgDeliveryDays: 3 }
];

const baseProducts: Product[] = [
  {
    id: "p1",
    slug: "barcelona-2009-retro-home-shirt",
    title: "Barcelona 2009 Retro Home Shirt",
    club: "FC Barcelona",
    player: "Messi",
    season: "2008/09",
    version: "Retro",
    category: "Retro Shirts",
    image: footballVisuals.shirts,
    images: [footballVisuals.shirts, footballVisuals.stadium, footballVisuals.pitch],
    colors: ["Blue", "Garnet"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["retro", "laliga", "champions league", "messi", "club"],
    qualityScore: 94,
    aiTrustScore: 91,
    aiDealScore: 96,
    fakeReviewRisk: 8,
    reviewSummary: "Buyers praise badge stitching, collar accuracy and fast EU delivery. Sizing runs slightly slim.",
    priceHistory: [{ date: "Jan", price: 31 }, { date: "Feb", price: 29 }, { date: "Mar", price: 27 }, { date: "Apr", price: 24.9 }, { date: "May", price: 22.4 }],
    offers: [
      { id: "o1", productId: "p1", marketplace: "AliExpress", sellerId: "s4", sellerName: "Retro11 Store", price: 24.9, currency: "EUR", shippingPrice: 2.8, deliveryDays: 10, affiliateUrl: "https://www.aliexpress.com/w/wholesale-barca-2009.html", rating: 4.9, reviewCount: 4210, stock: 88 },
      { id: "o2", productId: "p1", marketplace: "DHGate", sellerId: "s2", sellerName: "GoalEra Apparel", price: 22.4, currency: "EUR", shippingPrice: 4.5, deliveryDays: 13, affiliateUrl: "https://www.dhgate.com/wholesale/search.do?searchkey=barca-2009", rating: 4.6, reviewCount: 1420, stock: 34 },
      { id: "o7", productId: "p1", marketplace: "Instagram Seller", sellerId: "s5", sellerName: "Terrace Archive NL", price: 34.2, currency: "EUR", shippingPrice: 4.95, deliveryDays: 5, affiliateUrl: "https://www.aliexpress.com/w/wholesale-instagram-barca-2009.html", rating: 4.7, reviewCount: 318, stock: 12 }
    ]
  },
  {
    id: "p5",
    slug: "netherlands-wk26-home-player-version-shirt",
    title: "Netherlands WK26 Home Player Version Shirt",
    club: "Netherlands",
    player: "Gakpo",
    season: "WK26",
    version: "Player",
    category: "WK26 National Teams",
    image: footballVisuals.worldCup,
    images: [footballVisuals.worldCup, footballVisuals.pitch, footballVisuals.locker],
    colors: ["Orange", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["wk26", "world cup 2026", "netherlands", "national team", "player version", "gakpo"],
    qualityScore: 91,
    aiTrustScore: 90,
    aiDealScore: 97,
    fakeReviewRisk: 7,
    reviewSummary: "AI match confidence is high across marketplace thumbnails. Best listings include stitched federation badge photos and clear heat-map texture shots.",
    priceHistory: [{ date: "Jan", price: 42 }, { date: "Feb", price: 39 }, { date: "Mar", price: 36 }, { date: "Apr", price: 32 }, { date: "May", price: 29 }],
    offers: [
      { id: "o12", productId: "p5", marketplace: "AliExpress", sellerId: "s1", sellerName: "KitVault Factory", price: 29, currency: "EUR", shippingPrice: 0, deliveryDays: 9, affiliateUrl: "https://www.aliexpress.com/w/wholesale-netherlands-wk26.html", rating: 4.8, reviewCount: 1822, stock: 104 },
      { id: "o13", productId: "p5", marketplace: "DHGate", sellerId: "s2", sellerName: "GoalEra Apparel", price: 27.8, currency: "EUR", shippingPrice: 3.6, deliveryDays: 12, affiliateUrl: "https://www.dhgate.com/wholesale/search.do?searchkey=netherlands-wk26", rating: 4.6, reviewCount: 894, stock: 57 },
      { id: "o14", productId: "p5", marketplace: "Amazon", sellerId: "s7", sellerName: "Prime Fanwear", price: 44.9, currency: "EUR", shippingPrice: 0, deliveryDays: 3, affiliateUrl: "https://www.amazon.com/s?k=netherlands-wk26", rating: 4.4, reviewCount: 244, stock: 22 }
    ]
  },
  {
    id: "p6",
    slug: "brazil-wk26-away-fan-version-shirt",
    title: "Brazil WK26 Away Fan Version Shirt",
    club: "Brazil",
    player: "Vinicius Jr",
    season: "WK26",
    version: "Fan",
    category: "WK26 National Teams",
    image: footballVisuals.locker,
    images: [footballVisuals.locker, footballVisuals.crowd, footballVisuals.stadium],
    colors: ["Blue", "Yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["wk26", "world cup 2026", "brazil", "national team", "fan version", "vinicius"],
    qualityScore: 88,
    aiTrustScore: 86,
    aiDealScore: 92,
    fakeReviewRisk: 12,
    reviewSummary: "Strong value for fan-version buyers. The safest listings show neck label, sleeve trim and customer daylight photos.",
    priceHistory: [{ date: "Jan", price: 34 }, { date: "Feb", price: 33 }, { date: "Mar", price: 31 }, { date: "Apr", price: 29 }, { date: "May", price: 25 }],
    offers: [
      { id: "o15", productId: "p6", marketplace: "Temu", sellerId: "s3", sellerName: "Matchday Direct", price: 24.8, currency: "EUR", shippingPrice: 2.9, deliveryDays: 7, affiliateUrl: "https://www.temu.com/search_result.html?search_key=brazil-wk26", rating: 4.5, reviewCount: 1204, stock: 133 },
      { id: "o16", productId: "p6", marketplace: "Retro Marketplace", sellerId: "s6", sellerName: "Classic Kit Market", price: 35.4, currency: "EUR", shippingPrice: 4.95, deliveryDays: 6, affiliateUrl: "https://www.aliexpress.com/w/wholesale-retro-brazil-wk26.html", rating: 4.8, reviewCount: 411, stock: 19 }
    ]
  },
  {
    id: "p2",
    slug: "netherlands-1988-retro-home-shirt",
    title: "Netherlands 1988 Retro Home Shirt",
    club: "Netherlands",
    player: "Van Basten",
    season: "1988",
    version: "Retro",
    category: "Countries",
    image: footballVisuals.pitch,
    images: [footballVisuals.pitch, footballVisuals.crowd, footballVisuals.shirts],
    colors: ["Orange", "White"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["retro", "national team", "euro", "orange", "countries"],
    qualityScore: 90,
    aiTrustScore: 88,
    aiDealScore: 93,
    fakeReviewRisk: 11,
    reviewSummary: "Strong color match and embroidery quality. Best reviews mention breathable fabric and secure packaging.",
    priceHistory: [{ date: "Jan", price: 28 }, { date: "Feb", price: 26 }, { date: "Mar", price: 25 }, { date: "Apr", price: 23.1 }, { date: "May", price: 19.7 }],
    offers: [
      { id: "o3", productId: "p2", marketplace: "Temu", sellerId: "s3", sellerName: "Matchday Direct", price: 19.7, currency: "EUR", shippingPrice: 3.2, deliveryDays: 8, affiliateUrl: "https://www.temu.com/search_result.html?search_key=nl-1988", rating: 4.5, reviewCount: 992, stock: 117 },
      { id: "o4", productId: "p2", marketplace: "AliExpress", sellerId: "s1", sellerName: "KitVault Factory", price: 23.1, currency: "EUR", shippingPrice: 0, deliveryDays: 11, affiliateUrl: "https://www.aliexpress.com/w/wholesale-nl-1988.html", rating: 4.8, reviewCount: 3098, stock: 71 },
      { id: "o8", productId: "p2", marketplace: "Retro Marketplace", sellerId: "s6", sellerName: "Classic Kit Market", price: 38.5, currency: "EUR", shippingPrice: 5.5, deliveryDays: 6, affiliateUrl: "https://www.aliexpress.com/w/wholesale-retro-nl-1988.html", rating: 4.8, reviewCount: 644, stock: 18 }
    ]
  },
  {
    id: "p3",
    slug: "real-madrid-2024-player-version-shirt",
    title: "Real Madrid 2024 Player Version Shirt",
    club: "Real Madrid",
    player: "Bellingham",
    season: "2024/25",
    version: "Player",
    category: "Player Version",
    image: footballVisuals.boots,
    images: [footballVisuals.boots, footballVisuals.stadium, footballVisuals.crowd],
    colors: ["White", "Gold"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["player version", "laliga", "bellingham", "white", "club"],
    qualityScore: 87,
    aiTrustScore: 84,
    aiDealScore: 86,
    fakeReviewRisk: 14,
    reviewSummary: "Lightweight material and heat-pressed details score well. Badge alignment varies by batch.",
    priceHistory: [{ date: "Jan", price: 39 }, { date: "Feb", price: 36 }, { date: "Mar", price: 34 }, { date: "Apr", price: 31.2 }, { date: "May", price: 28.9 }],
    offers: [
      { id: "o5", productId: "p3", marketplace: "DHGate", sellerId: "s2", sellerName: "GoalEra Apparel", price: 28.9, currency: "EUR", shippingPrice: 3.9, deliveryDays: 12, affiliateUrl: "https://www.dhgate.com/wholesale/search.do?searchkey=madrid-2024", rating: 4.6, reviewCount: 733, stock: 45 },
      { id: "o6", productId: "p3", marketplace: "AliExpress", sellerId: "s1", sellerName: "KitVault Factory", price: 31.2, currency: "EUR", shippingPrice: 0, deliveryDays: 9, affiliateUrl: "https://www.aliexpress.com/w/wholesale-madrid-2024.html", rating: 4.8, reviewCount: 1288, stock: 53 },
      { id: "o9", productId: "p3", marketplace: "Amazon", sellerId: "s7", sellerName: "Prime Fanwear", price: 42.9, currency: "EUR", shippingPrice: 0, deliveryDays: 3, affiliateUrl: "https://www.amazon.com/s?k=madrid-2024", rating: 4.4, reviewCount: 501, stock: 36 }
    ]
  },
  {
    id: "p4",
    slug: "ac-milan-training-suit-2025",
    title: "AC Milan 2025 Training Suit",
    club: "AC Milan",
    season: "2025/26",
    version: "Training",
    category: "Training Suits",
    image: footballVisuals.crowd,
    images: [footballVisuals.crowd, footballVisuals.boots, footballVisuals.pitch],
    colors: ["Black", "Red"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["training suit", "serie a", "milan", "tracksuit"],
    qualityScore: 82,
    aiTrustScore: 80,
    aiDealScore: 84,
    fakeReviewRisk: 18,
    reviewSummary: "Warm fabric and strong zipper reviews. Best value comes from sellers with verified customer photos.",
    priceHistory: [{ date: "Jan", price: 48 }, { date: "Feb", price: 44 }, { date: "Mar", price: 41 }, { date: "Apr", price: 39 }, { date: "May", price: 36 }],
    offers: [
      { id: "o10", productId: "p4", marketplace: "Facebook Shop", sellerId: "s5", sellerName: "Terrace Archive NL", price: 36, currency: "EUR", shippingPrice: 6.95, deliveryDays: 4, affiliateUrl: "https://www.aliexpress.com/w/wholesale-facebook-milan-training.html", rating: 4.7, reviewCount: 214, stock: 9 },
      { id: "o11", productId: "p4", marketplace: "Temu", sellerId: "s3", sellerName: "Matchday Direct", price: 33.4, currency: "EUR", shippingPrice: 5.1, deliveryDays: 9, affiliateUrl: "https://www.temu.com/search_result.html?search_key=milan-training", rating: 4.3, reviewCount: 603, stock: 66 }
    ]
  }
];

const expandedProducts: Product[] = [
  makeProduct("p7", "france-wk26-home-fan-version-shirt", "France WK26 Home Fan Version Shirt", "France", "Mbappe", "WK26", "Fan", "WK26 National Teams", footballVisuals.stadium, ["Blue", "White"], ["wk26", "france", "national team", "mbappe", "fan version"], 89, 88, 91, 10, 32, "france-wk26"),
  makeProduct("p8", "argentina-wk26-home-player-version-shirt", "Argentina WK26 Home Player Version Shirt", "Argentina", "Messi", "WK26", "Player", "WK26 National Teams", footballVisuals.pitch, ["Sky Blue", "White"], ["wk26", "argentina", "messi", "player version"], 92, 89, 94, 9, 34, "argentina-wk26"),
  makeProduct("p9", "portugal-wk26-away-fan-version-shirt", "Portugal WK26 Away Fan Version Shirt", "Portugal", "Ronaldo", "WK26", "Fan", "WK26 National Teams", footballVisuals.crowd, ["White", "Green"], ["wk26", "portugal", "ronaldo", "fan version"], 86, 84, 88, 13, 27, "portugal-wk26"),
  makeProduct("p10", "turkey-wk26-home-fan-version-shirt", "Turkey WK26 Home Fan Version Shirt", "Turkey", "Guler", "WK26", "Fan", "WK26 National Teams", footballVisuals.worldCup, ["Red", "White"], ["wk26", "turkey", "national team", "fan version"], 85, 83, 87, 14, 26, "turkey-wk26"),
  makeProduct("p11", "germany-1990-retro-home-shirt", "Germany 1990 Retro Home Shirt", "Germany", "Matthaus", "1990", "Retro", "Retro WK Shirts", footballVisuals.shirts, ["White", "Black"], ["retro", "world cup", "germany", "1990"], 93, 90, 92, 8, 31, "germany-1990"),
  makeProduct("p12", "brazil-2002-retro-home-shirt", "Brazil 2002 Retro Home Shirt", "Brazil", "Ronaldo", "2002", "Retro", "Retro WK Shirts", footballVisuals.locker, ["Yellow", "Green"], ["retro", "world cup", "brazil", "2002"], 94, 91, 95, 7, 33, "brazil-2002"),
  makeProduct("p13", "manchester-united-2025-home-fan-shirt", "Manchester United 2025 Home Fan Shirt", "Manchester United", "Mainoo", "2025/26", "Fan", "Club Shirts", footballVisuals.boots, ["Red", "White"], ["club", "premier league", "fan version"], 84, 82, 85, 16, 25, "manchester-united-2025"),
  makeProduct("p14", "ajax-2025-away-player-version-shirt", "Ajax 2025 Away Player Version Shirt", "Ajax", "Brobbey", "2025/26", "Player", "Club Shirts", footballVisuals.pitch, ["Black", "Red"], ["club", "eredivisie", "player version"], 86, 85, 88, 12, 28, "ajax-2025"),
  makeProduct("p15", "liverpool-2025-training-suit", "Liverpool 2025 Training Suit", "Liverpool", undefined, "2025/26", "Training", "Training Suits", footballVisuals.crowd, ["Black", "Red"], ["training suit", "premier league", "club"], 83, 82, 84, 15, 39, "liverpool-training-2025"),
  makeProduct("p16", "mystery-world-cup-shirt-box", "Mystery World Cup Shirt Box", "Mixed teams", undefined, "WK26", "Mystery", "Mystery Shirts", footballVisuals.stadium, ["Mixed"], ["mystery shirts", "world cup", "gift"], 80, 78, 82, 19, 22, "mystery-world-cup"),
  makeProduct("p17", "kids-netherlands-wk26-home-shirt", "Kids Netherlands WK26 Home Shirt", "Netherlands", "Gakpo", "WK26", "Kids", "Kids Shirts", footballVisuals.worldCup, ["Orange", "Black"], ["kids", "wk26", "netherlands"], 84, 86, 90, 11, 21, "kids-netherlands-wk26"),
  makeProduct("p18", "italy-2006-retro-home-shirt", "Italy 2006 Retro Home Shirt", "Italy", "Pirlo", "2006", "Retro", "Retro WK Shirts", footballVisuals.shirts, ["Blue", "Gold"], ["retro", "world cup", "italy", "2006"], 92, 89, 93, 9, 30, "italy-2006")
];

export const products: Product[] = [...baseProducts, ...expandedProducts];

function makeProduct(
  id: string,
  slug: string,
  title: string,
  club: string,
  player: string | undefined,
  season: string,
  version: Product["version"],
  category: string,
  image: string,
  colors: string[],
  tags: string[],
  qualityScore: number,
  aiTrustScore: number,
  aiDealScore: number,
  fakeReviewRisk: number,
  basePrice: number,
  urlKey: string
): Product {
  const sizes = version === "Kids" ? ["116", "128", "140", "152", "164"] : ["S", "M", "L", "XL", "XXL"];
  return {
    id,
    slug,
    title,
    club,
    player,
    season,
    version,
    category,
    image,
    images: [image, footballVisuals.pitch, footballVisuals.locker],
    colors,
    sizes,
    tags,
    qualityScore,
    aiTrustScore,
    aiDealScore,
    fakeReviewRisk,
    reviewSummary: `AI found consistent marketplace photos, stable sizing comments and enough seller history for ${title}. Check close-up badge and daylight customer images before buying.`,
    priceHistory: [
      { date: "Jan", price: basePrice + 8 },
      { date: "Feb", price: basePrice + 6 },
      { date: "Mar", price: basePrice + 4 },
      { date: "Apr", price: basePrice + 2 },
      { date: "May", price: basePrice }
    ],
    offers: [
      { id: `${id}-a`, productId: id, marketplace: "AliExpress", sellerId: "s1", sellerName: "KitVault Factory", price: basePrice, currency: "EUR", shippingPrice: 0, deliveryDays: 9, affiliateUrl: `https://www.aliexpress.com/w/wholesale-${urlKey}.html`, rating: 4.8, reviewCount: 900 + basePrice * 11, stock: 40 + basePrice },
      { id: `${id}-d`, productId: id, marketplace: "DHGate", sellerId: "s2", sellerName: "GoalEra Apparel", price: Math.max(18, basePrice - 1.7), currency: "EUR", shippingPrice: 3.8, deliveryDays: 12, affiliateUrl: `https://www.dhgate.com/wholesale/search.do?searchkey=${urlKey}`, rating: 4.6, reviewCount: 420 + basePrice * 7, stock: 30 + basePrice },
      { id: `${id}-m`, productId: id, marketplace: "Temu", sellerId: "s3", sellerName: "Matchday Direct", price: Math.max(16, basePrice - 3.2), currency: "EUR", shippingPrice: 4.2, deliveryDays: 7, affiliateUrl: `https://www.temu.com/search_result.html?search_key=${urlKey}`, rating: 4.5, reviewCount: 300 + basePrice * 5, stock: 25 + basePrice }
    ]
  };
}

export const categories = ["WK26 Shirts", "National Teams", "Retro WK Shirts", "Player Version", "Fan Version", "Training Suits", "Mystery Shirts", "Kids Shirts"];

export const popularClubs = ["FC Barcelona", "Real Madrid", "AC Milan", "Manchester United", "Liverpool", "Ajax"];

export const popularNationalTeams = ["Netherlands", "France", "Argentina", "Brazil", "Portugal", "Turkey"];

export const popularPlayers = ["Messi", "Bellingham", "Gakpo", "Vinicius Jr", "Mbappe", "Ronaldo"];

export const seoPages = [
  { slug: "goedkope-wk26-shirts", title: "Goedkope WK26 Shirts", description: "Vergelijk goedkope WK26 shirts met AI deal score, seller trust en snelle levering." },
  { slug: "wk26-voetbalshirts", title: "WK26 Voetbalshirts", description: "Vind WK26 voetbalshirts van nationale teams, fan versions en player versions." },
  { slug: "retro-wk-shirts", title: "Retro WK Shirts", description: "Ontdek retro WK shirts en vergelijk aanbieders, reviews en echte productfoto's." },
  { slug: "player-version-wk-shirts", title: "Player Version WK Shirts", description: "Vergelijk player version WK shirts op kwaliteit, prijs en marketplace betrouwbaarheid." },
  { slug: "goedkope-voetbalshirts", title: "Goedkope Voetbalshirts", description: "Vergelijk goedkope voetbalshirts met trust score, levering en AI deal score." },
  { slug: "clubshirts", title: "Clubshirts", description: "Vergelijk clubshirts van topclubs met AI seller trust, prijsontwikkeling en marketplace fotoanalyse." },
  { slug: "retro-voetbalshirts", title: "Retro Voetbalshirts", description: "Vind premium retro shirts per club, land, seizoen en verkoper." },
  { slug: "football-shirt-deals", title: "Football Shirt Deals", description: "International football shirt deals ranked by AI deal score, delivery reliability and seller trust." },
  { slug: "player-version-shirts", title: "Player Version Shirts", description: "Vergelijk lichte player version shirts met kwaliteitsscore en echte productfoto's." },
  { slug: "fan-version-shirts", title: "Fan Version Shirts", description: "Ontdek fan version voetbalshirts met de beste prijs-kwaliteit verhouding." },
  { slug: "voetbalshirt-aanbiedingen", title: "Voetbalshirt Aanbiedingen", description: "Live deals voor shirts, trainingspakken en fan merchandise." },
  { slug: "mystery-box-shirts", title: "Mystery Box Shirts", description: "Vergelijk mystery shirt boxen op prijs, reviews en seller betrouwbaarheid." }
];
