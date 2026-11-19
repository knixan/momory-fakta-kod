# 🧠 Memory för Kod

En samling interaktiva minnesspel som hjälper dig lära dig programmeringskoncept genom klassisk memory-kortmatchning. Varje spel kombinerar pedagogiskt innehåll (faktarutor och fördjupade kodexempel) med spelmekanik för repetition inför prov eller läxförhör.

Projektet täcker just nu **12 teknikkategorier** och **48 spel**.

---

## ✨ Funktioner

### Speltyper

| Kategori | Antal spel | Router path | Innehåll |
| :--- | :--- | :--- | :--- |
| 📘 **TypeScript** | 9 | `/ts/*` | Syntax, datatyper, tecken/symboler, huvuddelar, inbyggda objekt, generics, utility types, type narrowing, avancerade typer |
| 🗄️ **Prisma 7** | 3 | `/Prisma/*` | Schema, relationer, queries |
| ⚛️ **Next.js** | 3 | `/nextjs/*` | Routing, data fetching, lifecycle |
| ⚛️ **React** | 4 | `/react/*` | Hooks, components, JSX, state management |
| # **C#** | 7 | `/csharp/*` | Datatyper, OOP, grundsyntax, LINQ, felhantering, async/await, collections |
| 🔐 **Better Auth** | 4 | `/better-auth/*` | Grundkoncept, autentisering, sessions, plugins |
| 🔥 **Firebase** | 3 | `/firebase/*` | Authentication, Firestore, Storage & Hosting |
| 🟢 **Drizzle** | 3 | `/drizzle/*` | Schema, queries, migrations |
| ⚡ **React + Vite** | 3 | `/react-vite/*` | Setup/HMR, routing, build & env |
| 📱 **React Native** | 3 | `/react-native/*` | Komponenter, navigation, styling |
| 🟩 **Node.js** | 3 | `/node/*` | Moduler (CJS/ESM), event loop & async, fs/http |
| 🔷 **Zod** | 3 | `/zod/*` | Schema basics, validation, types & transform |

### Spelupplägg

- **Klassisk memory-mekanik**: klicka på två kort för att hitta matchande par (begrepp ↔ förklaring/kodexempel).
- **Pedagogiska faktarutor** med snabbfakta för varje koncept.
- **Fördjupningssektion** med riktiga kodexempel per spel.
- **Responsiv design** som fungerar på både desktop och mobil.
- **Visuell feedback** för valda och matchade kort.
- **Framstegsspårning** (matchningar/drag) och en avslutande "firande"-skärm.
- **Randomiserad** kortplacering vid varje omgång för hög omspelbarhet.

---

## 🛠️ Teknikstack

| Kategori | Teknik | Användning |
| :--- | :--- | :--- |
| **Ramverk** | **Next.js 16** | App Router, Turbopack, hög prestanda och skalbarhet. |
| **Bibliotek** | **React 19** | UI-komponenter och klient-state (`useState`/`useEffect`). |
| **Språk** | **TypeScript** | Hela applikationen är skriven i TypeScript. |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS för snabb och responsiv design. |
| **Ikoner** | **React Icons** | Riktiga varumärkes-/UI-ikoner (Simple Icons, Font Awesome) för rubriker och navigering. |
| **Build Tool** | **Turbopack** | Snabb utvecklingsserver och produktionsbuilds. |

> Spelen är fristående och pedagogiska - de kräver inte att motsvarande bibliotek (Prisma, Firebase, Drizzle m.fl.) faktiskt är installerade i projektet.

---

## 🚀 Kom igång

### Förutsättningar

- Node.js **18.0** eller senare
- npm, yarn, pnpm, eller bun

### Installation

1. Klona repositoryt:

```bash
git clone <repository-url>
cd memory-for-code
```

2. Installera beroenden:

```bash
npm install
# eller
yarn install
# eller
pnpm install
```

3. Starta utvecklingsservern:

```bash
npm run dev
# eller
yarn dev
# eller
pnpm dev
```

4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### Bygg för produktion

```bash
npm run build
npm start
```

---

## 📂 Projektstruktur

Varje spel följer samma mönster: en tunn route-sida i `src/app/` som renderar en självständig spelkomponent i `src/components/`.

```
src/
├── app/
│   ├── page.tsx                 # Hemsida med alla spelkategorier
│   ├── layout.tsx               # Rotlayout
│   ├── globals.css              # Globala stilar (Tailwind v4)
│   ├── ts/<topic>/page.tsx
│   ├── Prisma/<topic>/page.tsx
│   ├── nextjs/<topic>/page.tsx
│   ├── react/<topic>/page.tsx
│   ├── csharp/<topic>/page.tsx
│   ├── better-auth/<topic>/page.tsx
│   ├── firebase/<topic>/page.tsx
│   ├── drizzle/<topic>/page.tsx
│   ├── react-vite/<topic>/page.tsx
│   ├── react-native/<topic>/page.tsx
│   ├── node/<topic>/page.tsx
│   └── zod/<topic>/page.tsx
└── components/
    ├── ts-syntax-grund.tsx
    ├── ts-generics.tsx
    ├── ts-utility-types.tsx
    ├── ts-type-narrowing.tsx
    ├── ts-avancerade-typer.tsx
    ├── prisma-schema.tsx
    ├── nextjs-routing.tsx
    ├── react-hooks.tsx
    ├── cs-oop.tsx
    ├── better-auth-sessions.tsx
    ├── firebase-auth.tsx
    ├── drizzle-schema.tsx
    ├── react-vite-setup.tsx
    ├── react-native-navigation.tsx
    ├── node-async.tsx
    ├── zod-validation.tsx
    └── ...                      # en komponent per spel, namngiven <kategori>-<ämne>.tsx
```

Vill du lägga till ett nytt spel:

1. Skapa `src/app/<kategori>/<ämne>/page.tsx` - en 5-raders wrapper som importerar och renderar spelkomponenten.
2. Skapa `src/components/<kategori>-<ämne>.tsx` - själva minnesspelet (kort-state, matchningslogik, faktaruta och fördjupning).
3. Lägg till ett nytt `<Link>`-kort i rätt sektion (eller en ny sektion) i `src/app/page.tsx`.

---

## 🧩 Spelmekanik

Varje spel består av:

- Ett antal kortpar (begrepp/syntax + matchande förklaring), utspritt i ett responsivt rutnät.
- Spelaren klickar på två kort för att försöka matcha dem.
- Matchar korten varandra vänds de bort permanent; annars vänds de tillbaka efter en kort fördröjning.
- Antal matchningar och drag räknas löpande.
- Spelet är slutfört när alla par har matchats, vilket visar en gratulationsskärm med ett kort tips.
- Under spelet finns en faktaruta med snabb repetition samt en fördjupningssektion med verkliga kodexempel.

---

## 📚 Pedagogiskt innehåll

Spelen är utformade för att lära ut praktiska koncept inom varje teknik, till exempel:

- Syntax, datatyper och grundstruktur.
- Centrala API:er och metoder (t.ex. Firestore-queries, Drizzle-queries, Zod-scheman).
- Arkitekturkoncept (t.ex. rendering-strategier i Next.js, event loop i Node.js).
- Verkliga, körbara kodexempel för varje koncept.
- Vanliga fallgropar och bästa praxis.

---

## ✍️ Författare

**Joefine Eriksson**

Webbplats: [kodochdesign.se](https://kodochdesign.se)

Syfte: Ett utbildningsverktyg för att öva programmeringskoncept genom lek.
