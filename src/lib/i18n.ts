import type { CurrencyCode, LocaleCode } from "@/types";

export const locales: { code: LocaleCode; label: string; dir?: "rtl" }[] = [
  { code: "nl", label: "Nederlands" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Francais" },
  { code: "es", label: "Espanol" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Portugues" },
  { code: "tr", label: "Turkce" },
  { code: "pl", label: "Polski" },
  { code: "ar", label: "العربية", dir: "rtl" }
];

export const currencies: CurrencyCode[] = ["EUR", "USD", "GBP", "AED", "TRY", "PLN"];

export const currencyRates: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  AED: 4,
  TRY: 35.2,
  PLN: 4.31
};

export const currencySymbols: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  AED: "د.إ",
  TRY: "₺",
  PLN: "zł"
};

export const defaultCurrencyByLocale: Record<LocaleCode, CurrencyCode> = {
  nl: "EUR",
  en: "GBP",
  de: "EUR",
  fr: "EUR",
  es: "EUR",
  it: "EUR",
  pt: "EUR",
  tr: "TRY",
  pl: "PLN",
  ar: "AED"
};

export const dictionary = {
  navDeals: { nl: "Deals", en: "Deals", de: "Deals", fr: "Offres", es: "Ofertas", it: "Offerte", pt: "Ofertas", tr: "Firsatlar", pl: "Okazje", ar: "العروض" },
  navTrending: { nl: "Trending", en: "Trending", de: "Trends", fr: "Tendances", es: "Tendencias", it: "Tendenze", pt: "Tendencias", tr: "Trend", pl: "Trendy", ar: "الرائج" },
  navSellers: { nl: "Verkopers", en: "Sellers", de: "Verkaufer", fr: "Vendeurs", es: "Vendedores", it: "Venditori", pt: "Vendedores", tr: "Saticilar", pl: "Sprzedawcy", ar: "البائعون" },
  navAlerts: { nl: "Alerts", en: "Alerts", de: "Alarme", fr: "Alertes", es: "Alertas", it: "Avvisi", pt: "Alertas", tr: "Uyarilar", pl: "Alerty", ar: "التنبيهات" },
  navAdmin: { nl: "Admin", en: "Admin", de: "Admin", fr: "Admin", es: "Admin", it: "Admin", pt: "Admin", tr: "Admin", pl: "Admin", ar: "الإدارة" },
  heroBadge: { nl: "Live marketplace radar voor voetbalshirts", en: "Live marketplace radar for football kits", de: "Live-Marktplatzradar fur Fussballtrikots", fr: "Radar marketplace live pour maillots", es: "Radar marketplace en vivo para camisetas", it: "Radar marketplace live per maglie", pt: "Radar marketplace ao vivo para camisas", tr: "Forma pazar yerleri icin canli radar", pl: "Radar marketplace dla koszulek", ar: "رادار مباشر لأسواق قمصان كرة القدم" },
  heroTitle: { nl: "Vind de beste voetbalshirt deal voordat hij weg is.", en: "Find the best football shirt deal before it disappears.", de: "Finde den besten Trikot-Deal bevor er weg ist.", fr: "Trouvez le meilleur deal maillot avant qu'il disparaisse.", es: "Encuentra la mejor oferta antes de que desaparezca.", it: "Trova il miglior affare prima che sparisca.", pt: "Encontre o melhor negocio antes que desapareca.", tr: "En iyi forma firsatini kaybolmadan bul.", pl: "Znajdz najlepsza okazje zanim zniknie.", ar: "اعثر على أفضل صفقة قبل أن تختفي." },
  heroCopy: { nl: "Vergelijk echte totaalprijs, verkoperstrust, levering, reviews en AI-kwaliteitsscore.", en: "Compare total price, seller trust, delivery, reviews and AI quality score.", de: "Vergleiche Gesamtpreis, Vertrauen, Lieferung, Bewertungen und KI-Qualitat.", fr: "Comparez prix total, confiance vendeur, livraison, avis et score IA.", es: "Compara precio total, confianza, envio, opiniones y calidad IA.", it: "Confronta prezzo totale, fiducia, consegna, recensioni e qualita IA.", pt: "Compare preco total, confianca, entrega, avaliacoes e qualidade IA.", tr: "Toplam fiyat, guven, teslimat, yorum ve AI kalite skorunu karsilastir.", pl: "Porownaj cene, zaufanie, dostawe, opinie i jakosc AI.", ar: "قارن السعر والثقة والشحن والمراجعات وجودة الذكاء الاصطناعي." },
  bestToday: { nl: "beste prijs vandaag", en: "best price today", de: "bester Preis heute", fr: "meilleur prix du jour", es: "mejor precio hoy", it: "miglior prezzo oggi", pt: "melhor preco hoje", tr: "bugunun en iyi fiyati", pl: "najlepsza cena dzis", ar: "أفضل سعر اليوم" },
  compareOffers: { nl: "Vergelijk aanbieders", en: "Compare offers", de: "Anbieter vergleichen", fr: "Comparer les offres", es: "Comparar ofertas", it: "Confronta offerte", pt: "Comparar ofertas", tr: "Teklifleri karsilastir", pl: "Porownaj oferty", ar: "قارن العروض" },
  quality: { nl: "Kwaliteit", en: "Quality", de: "Qualitat", fr: "Qualite", es: "Calidad", it: "Qualita", pt: "Qualidade", tr: "Kalite", pl: "Jakosc", ar: "الجودة" },
  trust: { nl: "Trust", en: "Trust", de: "Vertrauen", fr: "Confiance", es: "Confianza", it: "Fiducia", pt: "Confianca", tr: "Guven", pl: "Zaufanie", ar: "الثقة" },
  delivery: { nl: "Levering", en: "Delivery", de: "Lieferung", fr: "Livraison", es: "Envio", it: "Consegna", pt: "Entrega", tr: "Teslimat", pl: "Dostawa", ar: "الشحن" },
  searchPlaceholder: { nl: "Zoek club, speler, seizoen, retro of landenteam", en: "Search club, player, season, retro or national team", de: "Suche Verein, Spieler, Saison, Retro oder Nationalteam", fr: "Cherchez club, joueur, saison, retro ou equipe nationale", es: "Busca club, jugador, temporada, retro o seleccion", it: "Cerca club, giocatore, stagione, retro o nazionale", pt: "Procure clube, jogador, temporada, retro ou selecao", tr: "Kulup, oyuncu, sezon, retro veya milli takim ara", pl: "Szukaj klubu, gracza, sezonu, retro lub reprezentacji", ar: "ابحث عن نادي أو لاعب أو موسم أو منتخب" },
  findDeals: { nl: "Vind deals", en: "Find deals", de: "Deals finden", fr: "Trouver", es: "Buscar", it: "Trova", pt: "Encontrar", tr: "Firsat bul", pl: "Szukaj", ar: "ابحث" }
} satisfies Record<string, Record<LocaleCode, string>>;

export type TranslationKey = keyof typeof dictionary;

export function t(key: TranslationKey, locale: LocaleCode = "en") {
  return dictionary[key][locale] ?? dictionary[key].en;
}
