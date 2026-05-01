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
  { value: "24h", label: "átlagos visszajelzési idő ajánlatkérésre" },
  { value: "Keszthely", label: "és környéke kiszállási terület" },
  { value: "Rugalmas", label: "egyeztetés otthonokhoz és kisebb irodákhoz" },
];

export const serviceGroups: ServiceItem[] = [
  {
    title: "Lakástakarítás",
    description:
      "Rendszeres vagy alkalmi segítség, hogy az otthonod tiszta, friss és rendezett maradjon a hétköznapokban is.",
    bullets: ["Heti vagy kétheti takarítás", "Konyha és fürdő kiemelt figyelemmel", "Igény szerint alaposabb rendbetétellel kiegészítve"],
  },
  {
    title: "Irodatakarítás",
    description:
      "Kisebb irodák és üzleti terek tisztán tartása diszkréten, a napi működéshez igazodva.",
    bullets: ["Nyitás előtti vagy zárás utáni időpontok", "Közös terek és tárgyalók rendben tartása", "Rendszeres együttműködésre is"],
  },
  {
    title: "Nagytakarítás",
    description:
      "Alapos, részletes takarítás, amikor egy sima heti rendrakás már nem elég.",
    bullets: ["Nehezebben elérhető felületek tisztítása", "Vízkő- és zsíroldás", "Költözéshez, felújítás utánra vagy szezonális felfrissítéshez"],
  },
  {
    title: "Lépcsőház és társasház",
    description:
      "Közös területek rendszeres tisztán tartása kulturált megjelenéssel és megbízható jelenléttel.",
    bullets: ["Bejáratok és folyosók rendben tartása", "Igény szerinti ablaktisztítás", "Hosszabb távú együttműködésre is"],
  },
  {
    title: "Bérbeadás előtti felkészítés",
    description:
      "Gyors, látványos rendrakó és frissítő takarítás vendégfogadás vagy új bérlő érkezése előtt.",
    bullets: ["Lakásfrissítés rövid határidővel", "Tükrök és felületek ápolt megjelenése", "Fotózásra vagy átadásra kész állapot"],
  },
  {
    title: "Ablak- és felülettisztítás",
    description:
      "Külön kérhető üveg-, tükör- és kényesebb felületek részletes, kímélő tisztítása.",
    bullets: ["Ablakok és keretek", "Tükrök és üvegajtók", "Felülethez igazított tisztítás"],
  },
];

export const homeHighlights: FeatureItem[] = [
  {
    title: "Megbízható jelenlét",
    description:
      "Fontos, hogy tudd, mikor érkezem, mire számíthatsz, és hogy a megbeszéltek szerint haladjon minden alkalom.",
  },
  {
    title: "Rugalmas egyeztetés",
    description:
      "Minden otthon és minden munkahely más, ezért az időpontokat és a feladatokat mindig a valódi igényekhez igazítom.",
  },
  {
    title: "Diszkrét, átlátható folyamat",
    description:
      "A cél az, hogy egyszerű legyen az egyeztetés, gyorsan kapj visszajelzést, és végig átlásd, hogyan haladunk.",
  },
];

export const priceItems: PriceItem[] = [
  {
    title: "Rendszeres lakástakarítás",
    price: "Egyedi ajánlat",
    description:
      "Az ár a lakás méretétől, állapotától és a takarítás gyakoriságától függően alakul.",
    bullets: ["Felmérés után pontosítva", "Rendszeres megrendeléshez igazítva", "Igény szerint bővíthető feladatlistával"],
  },
  {
    title: "Nagytakarítás",
    price: "Egyedi ajánlat",
    description:
      "Költözés, felújítás vagy szezonális alaptisztítás esetén részletesebb egyeztetés alapján készül az ajánlat.",
    bullets: ["Munkaidő és felület alapján kalkulálva", "Erősebben igénybevett helyiségekre is", "Előzetes állapotfelméréssel"],
  },
  {
    title: "Irodatakarítás",
    price: "Havidíjas vagy egyedi",
    description:
      "Kisebb irodák és üzleti terek esetén rendszeres vagy alkalmi konstrukcióban is kérhető.",
    bullets: ["Nyitvatartáshoz igazítható", "Hosszabb távú együttműködésre is", "Személyes ajánlat alapján"],
  },
];

export const referenceItems: ReferenceItem[] = [
  {
    title: "Otthoni frissítő takarítás",
    description:
      "Világos, rendezett enteriőrök, ahol a cél a mindennapi kényelem és a nyugodt, tiszta összhatás.",
    imageSrc: "/images/home-clean.jpg",
    imageAlt: "Világos nappali rendezett enteriőrrel",
  },
  {
    title: "Irodai felületek tisztán tartása",
    description:
      "Íróasztalok, közös felületek és gyakran használt terek rendszeres, precíz tisztítása.",
    imageSrc: "/images/hero-cleaning.jpg",
    imageAlt: "Irodai asztal takarítása permetezővel és kendővel",
  },
  {
    title: "Részletes eszköz- és felülettisztítás",
    description:
      "Az apróbb részletek és kényesebb felületek ápolása sokszor itt látványos igazán.",
    imageSrc: "/images/vacuum-detail.jpg",
    imageAlt: "Porszívófej kék szőnyegen",
  },
  {
    title: "Ablak- és felülettisztítás",
    description:
      "Olyan munkákhoz, ahol a tiszta üveg és az igényes összkép különösen sokat számít.",
    imageSrc: "/images/window-cleaning.jpg",
    imageAlt: "Takarítónő felmosással egy lakásban",
  },
];

export const contactDetails = [
  { label: "Telefon", value: "+36 30 123 4567", href: "tel:+36301234567" },
  { label: "E-mail", value: "hello@tisztasagmuhely.hu", href: "mailto:hello@tisztasagmuhely.hu" },
  { label: "Szolgáltatási terület", value: "Keszthely és környéke", href: "/kapcsolat" },
];

export const bookingActions: CtaAction[] = [
  { href: "/ajanlatkeres", label: "Ajánlatkérés indítása" },
  { href: "https://simplybook.me", label: "Online foglalási lehetőségek" },
];

