# Cleaner Frontend

A `cleaner_frontend` a Tiszta Műhely publikus weboldala és a hozzá tartozó admin felület frontend rétege. A projekt Next.js alapú, statikus buildre van hangolva, miközben a dinamikus funkciókat a PHP backend API végpontjai szolgálják ki.

Ez a frontend két nagy területet fed le:

- publikus marketing és kapcsolatfelvételi oldalak
- admin belépés és foglaláskezelő felület

## Fő cél

A frontend feladata, hogy:

- bemutassa a szolgáltatást ügyféloldalon
- lehetővé tegye az ajánlatkérést és időpontválasztást
- admin oldalon kezelhetővé tegye a beérkező foglalásokat
- statikus buildként is biztonságosan deployolható maradjon

## Technológiai alapok

- `Next.js 16`
- `React 19`
- `TypeScript`
- `App Router`
- `Tailwind CSS 4`
- `react-icons`

## Működési modell

A frontend statikus oldalakat renderel, majd a böngészőből API hívásokkal kapcsolódik a backendhez.

Ez gyakorlatban azt jelenti, hogy:

- az oldalak előre buildelhetők
- a publikus tartalom gyorsan kiszolgálható
- az admin és a foglalási naptár kliensoldalon hívja a PHP API-t
- a frontend backend nélkül sem esik szét, mert bizonyos részek fallback módban is működnek

## Fontos route-ok

### Publikus oldalak

- `/`
- `/szolgaltatasok`
- `/arak`
- `/referenciak`
- `/kapcsolat`
- `/ajanlatkeres`
- `/impresszum`
- `/adatvedelem`
- `/cookie-tajekoztato`

### Admin oldalak

- `/muhely-belepes`
- `/muhely-felulet`

## Frontend struktúra röviden

### `src/app`

Az App Router route-jai és a globális layout itt vannak.

Fontosabb oldalak:
- `page.tsx` – főoldal
- `ajanlatkeres/page.tsx` – ügyfél oldali foglalási felület
- `muhely-belepes/page.tsx` – admin login
- `muhely-felulet/page.tsx` – admin dashboard

### `src/components`

Újrafelhasználható UI és oldalépítő komponensek.

Főbb részek:
- `layout` – fejléc, footer, konténer
- `marketing` – publikus oldalak szekciói
- `booking` – ügyfél oldali foglalási planner
- `admin` – admin login és dashboard komponensek

### `src/lib`

Itt vannak az API kliensek és a frontend üzleti segédek.

Fontos fájlok:
- `booking-api.ts` – publikus foglalási API hívások
- `admin-api.ts` – admin session és admin műveletek

### `src/types`

Közös TypeScript típusok a frontend különböző részei között.

## Kapcsolat a backenddel

A frontend a `NEXT_PUBLIC_API_URL` környezeti változó alapján éri el a PHP API-t.

Példa helyi fejlesztéshez:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Példa éles Nethelyes backendhez:

```env
NEXT_PUBLIC_API_URL=https://te-domain.hu/cleaner_backend/api
```

A frontend ebből építi fel a konkrét végpontokat, például:

- `/booking-slots.php`
- `/bookings-create.php`
- `/admin-login.php`
- `/admin-bookings.php`

## Foglalási flow röviden

Az ügyféloldali foglalási rendszer a `/ajanlatkeres` oldalon működik.

A frontend itt:

1. lekéri a heti foglaltságot a backendből
2. megjeleníti a szabad / pending / foglalt állapotokat
3. engedi kiválasztani a szabad időpontot
4. az űrlap elküldésekor `pending` állapotú foglalást hoz létre

Védelmi és UX részletek:
- múltbeli és aznapi időpont nem foglalható
- a nem elérhető slotok tiltottak maradnak
- backend nélküli környezetben a frontend fallback módban fut tovább

## Admin működés röviden

Az admin frontend session alapú backend hitelesítéssel működik.

A folyamat:

1. belépés a `/muhely-belepes` oldalon
2. a backend létrehoz egy admin sessiont
3. a frontend lekéri a session állapotot
4. a dashboard a backendből tölti a foglalásokat

Az admin jelenleg tudja:
- a foglalások listázását
- státusz szerinti szűrést
- oldalszámozott lapozást
- `pending -> confirmed` elfogadást
- `pending -> cancelled` törlést
- időpont áthelyezését
- új időpont hozzáadását meglévő foglaláshoz

## Fallback működés

A frontend több ponton fel van készítve arra, hogy a backend ideiglenesen ne legyen elérhető.

Ez különösen hasznos:
- Vercel preview környezetben
- statikus demózásnál
- korai UI fejlesztésnél

A fallback jelenleg főleg a publikus foglalási felületet érinti.
Az admin működéshez viszont tényleges backend kapcsolat szükséges.

## Fejlesztői indítás

A dev szerver stabilabb, webpack alapú módban indul, mert a Turbopack fejlesztés közben korábban túl sok memóriát használt.

Indítás:

```bash
npm run dev
```

Ez jelenleg:
- webpack alapú dev módot használ
- megemelt Node memória limittel fut

Ha a sima új dev módot akarod kipróbálni:

```bash
npm run dev:turbo
```

## Ha a dev szerver furcsán viselkedik

Érdemes törölni a Next cache-t és újraindítani:

```bash
Remove-Item -Recurse -Force .next
npm run dev
```

## Build és ellenőrzés

Lint futtatása:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

A projekt statikus export-kompatibilis, ezért a publikus felületek buildelhetők és hosztolhatók statikus környezetben is.

## Helyi URL-ek fejlesztéskor

- frontend: `http://localhost:3000`
- ajánlatkérés: `http://localhost:3000/ajanlatkeres`
- admin belépés: `http://localhost:3000/muhely-belepes`
- admin dashboard: `http://localhost:3000/muhely-felulet`

## Fontos tervezési döntések

### Statikus frontend + külön backend

A frontend szándékosan külön marad a PHP backendet futtató rétegtől.
Ez azért jó, mert:
- a marketing oldalak egyszerűen deployolhatók
- a backend külön cserélhető vagy Nethelyre tehető
- a publikus UI és az admin logika nem keveredik össze

### Booking slot alapú modell

A frontend már úgy van felépítve, hogy egy foglaláshoz több időblokk is tartozhat.
Ez fontos a takarítási projektek valós működése miatt, mert egy ügyfélhez több napszak vagy több nap is tartozhat.

### Adminbarát bővíthetőség

Az admin dashboard nem csak státuszváltásra készült, hanem szerkeszthető foglalási rendszerként működik. Ez később még tovább bővíthető például:
- slot törléssel
- kereséssel
- részletesebb szűrésekkel
- naptárnézetes admin kezeléssel

## Ajánlott fejlesztői workflow

1. indítsd el a PHP backendet külön
2. indítsd el a Next frontendet `npm run dev`-vel
3. ellenőrizd a `.env` API címet
4. dolgozz oldalszinten vagy komponensszinten
5. futtasd a `lint` és `build` parancsokat nagyobb módosítás után


