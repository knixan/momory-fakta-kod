# 🧠 Memory för Pluggande - TypeScript Learning Games

En samling interaktiva minnesspel designade för att hjälpa studenter att lära sig **TypeScript**-koncept genom engagerande spel. Varje spel fokuserar på olika aspekter av TypeScript och kombinerar pedagogiskt innehåll med klassisk memory-kortmatchning.

---

## ✨ Funktioner

### Speltyper

| Spelnamn | Beskrivning | Router Path | Kortpar |
| :--- | :--- | :--- | :--- |
| **TypeScript Syntax Grunder** | Lär dig grundläggande syntax, variabler, typer, funktioner och mer. | `/ts/syntax-grund` | 10 |
| **TypeScript Tecken** | Bemästra TypeScript-operatorer och symboler (aritmetik, jämförelse, logiska operatorer, etc.). | `/ts/tecken` | 10 |
| **TypeScript Datatyper** | Förstå TypeScript-typsystemet, inklusive primitiva typer, objekt, unioner och mer. | `/ts/datatyper` | 10 |

### Spelupplägg

- **Klassisk memory-mekanik** för kortmatchning.
- **Pedagogiska fakta** och förklaringar för varje koncept.
- **Responsiv design** som fungerar utmärkt på både desktop och mobil.
- **Visuell feedback** för matchade par.
- **Framstegsspårning** och en avslutande "firande"-skärm.
- **Randomiserad** kortplacering för hög omspelbarhet.

---

## 🛠️ Teknikstack

| Kategori | Teknik | Användning |
| :--- | :--- | :--- |
| **Ramverk** | **Next.js 15** | App Router, hög prestanda och skalbarhet. |
| **Språk** | **TypeScript** | Hela applikationen är skriven i TypeScript. |
| **Styling** | **Tailwind CSS** | Utility-first CSS för snabb och responsiv design. |
| **Ikoner** | **React Icons** | Används sparsamt för UI-element. |
| **Build Tool** | **Turbopack** | Snabb utvecklingsserver och produktionsbuilds. |

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

Installera beroenden:

Bash

npm install
# eller
yarn install
# eller
pnpm install
Starta utvecklingsservern:

Bash

npm run dev
# eller
yarn dev
# eller
pnpm dev
Öppna http://localhost:3000 i din webbläsare.

Bygg för Produktion
Bash

npm run build
npm start
📂 Projektstruktur
src/
├── app/
│   ├── page.tsx                    # Hemsida med spelval
│   ├── ts/
│   │   ├── syntax-grund/
│   │   │   └── page.tsx           # Syntax-spelet
│   │   ├── tecken/
│   │   │   └── page.tsx           # Tecken/Symbol-spelet
│   │   └── datatyper/
│   │       └── page.tsx           # Datatyp-spelet
│   ├── globals.css                # Globala stilar
│   └── layout.tsx                 # Rotlayout
└── components/
    ├── ts-syntax-grund.tsx        # Komponent för Syntax-spelet
    ├── ts-tecken.tsx              # Komponent för Tecken-spelet
    └── ts-datatyper.tsx           # Komponent för Datatyp-spelet
🧩 Spelmekanik
Varje spel består av:

20 kort arrangerade i ett 4x5 rutnät.

10 matchande par (koncept + förklaring/kodexempel).

Spelaren klickar på två kort för att matcha dem.

Om de matchar, vänds de bort.

Om de inte matchar, får man prova igen.

Spelet är slutfört när alla par har matchats.

📚 Pedagogiskt Innehåll
Spelen är utformade för att lära ut:

TypeScript-syntax och -struktur.

Datatyper och deras korrekta användning.

Operatorer och symboler.

Bästa praxis och vanliga mönster.

Verkliga kodexempel.


📄 Licens
Detta projekt är licensierat under MIT-licensen – se filen LICENSE för detaljer.

✍️ Författare
Joefine Eriksson

Webbplats: kodochdesign.se

Syfte: Ett utbildningsverktyg för TypeScript-inlärning.
