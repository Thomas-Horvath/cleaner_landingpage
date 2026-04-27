import type {
  CtaAction,
  FeatureItem,
  NavigationItem,
  PriceItem,
  ReferenceItem,
  ServiceItem,
  StatItem,
} from "@/types/site";

export const companyName = "Tisztaság Műhely";

export const navigationItems: NavigationItem[] = [
  { label: "Főoldal", href: "/" },
  { label: "Szolgáltatások", href: "/szolgaltatasok" },
  { label: "Árak", href: "/arak" },
  { label: "Referenciák", href: "/referenciak" },
  { label: "Kapcsolat", href: "/kapcsolat" },
  { label: "Ajánlatkérés", href: "/ajanlatkeres", highlight: true },
];

export const topbarActions: CtaAction[] = [
  { href: "tel:+36301234567", label: "+36 30 123 4567" },
  { href: "mailto:hello@tisztasagmuhely.hu", label: "hello@tisztasagmuhely.hu" },
];

export const homeStats: StatItem[] = [
  { value: "48h", label: "átlagos visszajelzési idő ajánlatkérésre" },
  { value: "6+", label: "kiemelt szolgáltatási kategória" },
  { value: "100%", label: "statikus hosztingra optimalizált felépítés" },
];

export const serviceGroups: ServiceItem[] = [
  {
    title: "Lakástakarítás",
    description:
      "Rendszeres vagy eseti otthoni takarítás, ahol a cél a nyugodt, átlátható és rendezett élettér.",
    bullets: ["Heti vagy kétheti ütemezés", "Konyha és fürdő kiemelt figyelemmel", "Külön egyeztethető nagytakarítás"],
  },
  {
    title: "Irodatakarítás",
    description:
      "Kisebb irodák és üzleti terek takarítása diszkrét jelenléttel, rugalmas időpontokban.",
    bullets: ["Nyitás előtti vagy zárás utáni munkavégzés", "Pultok, tárgyalók és közös terek tisztán tartása", "Megbízható, hosszabb távú együttműködés"],
  },
  {
    title: "Nagytakarítás",
    description:
      "Alapos, mély tisztítás költözés, felújítás vagy szezonális frissítés előtt és után.",
    bullets: ["Nehezebben elérhető felületek takarítása", "Vízkőoldás és zsíroldás", "Eseti, intenzív munkafolyamatokra szabva"],
  },
  {
    title: "Lépcsőház és társasház",
    description:
      "Rendszeres közös területi takarítás kulturált megjelenéssel és kiszámítható menetrenddel.",
    bullets: ["Bejáratok és folyosók rendben tartása", "Igény szerint ablaktisztítás", "Hosszabb távú üzemeltetési ritmus"],
  },
  {
    title: "Bérbeadás előtti felkészítés",
    description:
      "Airbnb vagy hosszú távú kiadás előtt gyors, látványos rendrakó és frissítő takarítás.",
    bullets: ["Gyors fordulás két vendég között", "Tükrök és textilek vizuális rendbetétele", "Fotózásra kész állapot"],
  },
  {
    title: "Ablak- és felülettisztítás",
    description:
      "Külön kérhető üveg, magasfényű vagy kényesebb felületek részletes tisztítása.",
    bullets: ["Ablakok és keretek", "Tükrök és üvegajtók", "Kímélő, felülethez igazított tisztítás"],
  },
];

export const homeHighlights: FeatureItem[] = [
  {
    title: "Többoldalas felépítés",
    description:
      "A látogató külön oldalon tudja megnézni a szolgáltatásokat, árakat, referenciákat és az ajánlatkérést.",
  },
  {
    title: "Szellős, világos megjelenés",
    description:
      "A kékes, tiszta színvilág azonnal takarítási márkát sugall, de kevésbé zsúfolt, mint a hagyományos versenytársak.",
  },
  {
    title: "Külső foglalásra előkészítve",
    description:
      "A későbbi SimplyBook.me vagy más külső rendszer könnyen integrálható a meglévő CTA-útvonalakba.",
  },
];

export const priceItems: PriceItem[] = [
  {
    title: "Alap otthoni takarítás",
    price: "Egyedi ajánlat",
    description:
      "Rendszeres lakástakarítás 1-2 szobás lakásokhoz, személyre szabott felméréssel.",
    bullets: ["Állapotfelmérés után pontosítva", "Rendszeres megrendelésre optimalizálva", "Kezdő csomagként jól kommunikálható"],
  },
  {
    title: "Nagytakarítás",
    price: "Egyedi ajánlat",
    description:
      "Felújítás, költözés vagy szezonális teljes takarítás esetén részletesebb árazással.",
    bullets: ["Munkaidő és felület alapján kalkulálva", "Erősebben igénybevett helyiségekre is", "Külön előzetes egyeztetéssel"],
  },
  {
    title: "Irodatakarítás",
    price: "Havidíjas vagy egyedi",
    description:
      "Kisebb irodák és céges terek esetén rendszeres vagy eseti konstrukcióval.",
    bullets: ["Hosszabb távú partneri együttműködéshez", "Nyitvatartáshoz igazítható", "Személyes ajánlatkéréssel pontosítva"],
  },
];

export const referenceItems: ReferenceItem[] = [
  {
    title: "Otthoni frissítő takarítás",
    description:
      "Világos, rendezett enteriőr kommunikációjához jól használható referenciahangulat.",
    imageSrc: "/images/home-clean.jpg",
    imageAlt: "Világos nappali rendezett enteriőrrel",
  },
  {
    title: "Felületfertőtlenítés irodában",
    description:
      "Közelképes vizuál, ami professzionális és modern szolgáltatási benyomást kelt.",
    imageSrc: "/images/hero-cleaning.jpg",
    imageAlt: "Irodai asztal takarítása permetezővel és kendővel",
  },
  {
    title: "Részletfotó eszközökről",
    description:
      "A szolgáltatási aloldalakon és árblokkok mellett jól használható támogató vizuál.",
    imageSrc: "/images/vacuum-detail.jpg",
    imageAlt: "Porszívófej kék szőnyegen",
  },
  {
    title: "Ablak- és felülettisztítás",
    description:
      "Személyesebb, emberközelibb fotó, amely a márkát közvetlenebbé teszi.",
    imageSrc: "/images/window-cleaning.jpg",
    imageAlt: "Takarítónő felmosással egy lakásban",
  },
];

export const contactDetails = [
  { label: "Telefon", value: "+36 30 123 4567", href: "tel:+36301234567" },
  { label: "E-mail", value: "hello@tisztasagmuhely.hu", href: "mailto:hello@tisztasagmuhely.hu" },
  { label: "Szolgáltatási terület", value: "Budapest és környéke", href: "/kapcsolat" },
];

export const bookingActions: CtaAction[] = [
  { href: "/ajanlatkeres", label: "Ajánlatkérés indítása" },
  { href: "https://simplybook.me", label: "SimplyBook.me megtekintése" },
];
