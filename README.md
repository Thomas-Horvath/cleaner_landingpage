# Cleaner Frontend

Next.js alapú frontend a takarítási szolgáltatás publikus oldalához és a kapcsolódó admin felület UI-jához.

## Fejlesztői indítás

A projekt dev szervere most stabilabb, webpack alapú módban indul.
Ez azért került be, mert a Turbopackos dev folyamat időnként túl sok memóriát használt Windows alatt.

Indítás:

```bash
npm run dev
```

Ez jelenleg ezt használja a háttérben:

- webpack alapú dev mód
- 4096 MB Node memória limit

Ha valamiért mégis a sima új dev módot szeretnéd kipróbálni, van külön script is:

```bash
npm run dev:turbo
```

## Ha a dev szerver furcsán viselkedik

Érdemes törölni a Next cache-t és újraindítani:

```bash
Remove-Item -Recurse -Force .next
npm run dev
```

## Fontos útvonalak

- publikus frontend: `http://localhost:3000`
- ajánlatkérés oldal: `http://localhost:3000/ajanlatkeres`
- admin belépés: `http://localhost:3000/muhely-belepes`

## API kapcsolat

A frontend a `NEXT_PUBLIC_API_URL` alapján kapcsolódik a backendhez.
Ha nincs elérhető backend, több felület bemutató / fallback módban is tud működni.
