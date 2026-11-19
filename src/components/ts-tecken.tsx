import MemoryGame, { type MemoryPair } from "./memory/memory-game";
import {
  Fact,
  FactGrid,
  GamePage,
  InlineCode,
  List,
  Note,
  Section,
  SubHeading,
  Term,
  Topic,
  TopicGrid,
} from "./memory/content";

const pairs: MemoryPair[] = [
  {
    term: ":",
    match: "Typangivelse – visar vilken typ en variabel eller parameter har",
  },
  { term: "=", match: "Tilldelning av värde" },
  {
    term: ";",
    match: "Avslutar ett uttryck (valfritt i TypeScript, men bra stil)",
  },
  { term: ".", match: "Åtkomst till objektets egenskap" },
  { term: "|", match: "Union type – en variabel kan ha flera möjliga typer" },
  { term: "?", match: "Valfri egenskap – kan finnas eller utelämnas" },
  { term: "=>", match: "Arrow function (pilfunktion)" },
  { term: "{}", match: "Objekt eller block av kod" },
  { term: "[]", match: "Array av en viss typ" },
  {
    term: "< >",
    match: "Generics – gör funktioner/klasser flexibla för flera typer",
  },
];

export default function SymbolsGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Tecken och symboler"
      subtitle="Matcha TypeScript-symboler med deras betydelser."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: symbol och dess betydelse. Matchade par försvinner."
        termLabel="Symbol"
        matchLabel="Betydelse"
        termCode
        completionNote="Att förstå dessa symboler är grundläggande för att skriva tydlig och säker TypeScript-kod."
      />

      <Section title="Snabbfakta">
        <FactGrid columns={4}>
          <Fact title="Grundsymboler">
            <InlineCode>: = ; . ,</InlineCode>
          </Fact>
          <Fact title="Typ-symboler">
            <InlineCode>| &amp; ? ! as</InlineCode>
          </Fact>
          <Fact title="Funktionssymboler">
            <InlineCode>() {`{}`} [] =&gt; &lt; &gt;</InlineCode>
          </Fact>
          <Fact title="Specialsymboler">
            <InlineCode>... ? : == ===</InlineCode>
          </Fact>
        </FactGrid>

        <div>
          <SubHeading>Viktiga symboler</SubHeading>
          <FactGrid>
            <Fact title=":" code>
              Typangivelse - anger typen av en variabel
            </Fact>
            <Fact title="=" code>
              Tilldelning - ger ett värde till en variabel
            </Fact>
            <Fact title="." code>
              Egenskapsåtkomst - når egenskaper i objekt
            </Fact>
            <Fact title="|" code>
              Union - flera möjliga typer
            </Fact>
            <Fact title="?" code>
              Valfritt - egenskapen kan utelämnas
            </Fact>
            <Fact title="=>" code>
              Arrow function - kompakt funktionssyntax
            </Fact>
            <Fact title="[]" code>
              Array - lista av värden av samma typ
            </Fact>
            <Fact title="{}" code>
              Objekt - samling av egenskaper
            </Fact>
            <Fact title="< >" code>
              Generics - typ-parametrar för flexibilitet
            </Fact>
          </FactGrid>
        </div>

        <Note label="Reflektion">
          Symboler är byggstenarna i programmeringsspråk - att förstå dem
          öppnar dörren till effektiv kodning.
        </Note>
      </Section>

      <Section title="Symboler i djupet">
        <TopicGrid>
          <Topic title="Grundläggande symboler">
            <List>
              <li>
                <InlineCode>:</InlineCode> Typangivelse - anger vilken typ en
                variabel har
              </li>
              <li>
                <InlineCode>=</InlineCode> Tilldelning - ger värde till
                variabel
              </li>
              <li>
                <InlineCode>;</InlineCode> Avslutar uttryck (rekommenderas)
              </li>
              <li>
                <InlineCode>.</InlineCode> Åtkomst till objektegenskaper
              </li>
            </List>
          </Topic>

          <Topic title="Funktions- och datastrukturer">
            <List>
              <li>
                <Term>() Parenteser:</Term> Funktionsanrop eller parametrar
              </li>
              <li>
                <Term>{"{}"} Klamrar:</Term> Objekt eller kodblock
              </li>
              <li>
                <Term>[] Hakparenteser:</Term> Array-syntax
              </li>
              <li>
                <Term>=&gt; Arrow:</Term> Arrow functions:{" "}
                <InlineCode>(x) =&gt; x * 2</InlineCode>
              </li>
              <li>
                <Term>&lt; &gt; Vinkelparenteser:</Term> Generics:{" "}
                <InlineCode>Array&lt;string&gt;</InlineCode>
              </li>
            </List>
          </Topic>

          <Topic title="Typ-relaterade symboler">
            <List>
              <li>
                <Term>| (Union):</Term> <InlineCode>string | number</InlineCode>
              </li>
              <li>
                <Term>&amp; (Intersection):</Term>{" "}
                <InlineCode>A &amp; B</InlineCode> - kombinerar flera typer
              </li>
              <li>
                <Term>? (Optional):</Term>{" "}
                <InlineCode>age?: number</InlineCode>
              </li>
              <li>
                <Term>! (Non-null):</Term>{" "}
                <InlineCode>user!.name</InlineCode> - säkerställer att värdet
                inte är null
              </li>
            </List>
          </Topic>

          <Topic title="Varför förstå symboler?">
            <p>
              Varje symbol har en specifik betydelse som formar hur koden
              fungerar:
            </p>
            <List>
              <li>
                <Term>Läsa kod:</Term> Förståelse av andras kod
              </li>
              <li>
                <Term>Skriva kod:</Term> Rätt användning förhindrar fel
              </li>
              <li>
                <Term>Debugging:</Term> Snabbare hitta problem
              </li>
              <li>
                <Term>TypeScript-specifik:</Term> Utnyttja språkets fulla
                potential
              </li>
            </List>
            <p>
              Symboler är som alfabetet - nödvändiga för att uttrycka komplexa
              idéer i kod.
            </p>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
