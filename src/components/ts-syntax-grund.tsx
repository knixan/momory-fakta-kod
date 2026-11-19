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
    term: "Variabler och typer",
    match: `let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;`,
  },
  {
    term: "Type inference",
    match: "Om du inte anger typen, försöker TypeScript gissa",
    matchCode: false,
  },
  {
    term: "Arrayer",
    match: `let numbers: number[] = [1, 2, 3];
let names: string[] = ["Anna", "Björn"];`,
  },
  { term: "Tuples", match: `let person: [string, number] = ["Sara", 30];` },
  {
    term: "Funktioner",
    match: `function greet(name: string): string {
  return "Hej, " + name;
}`,
  },
  {
    term: "Objekt",
    match: `let user: { name: string; age: number } = {
  name: "Erik",
  age: 28,
};`,
  },
  {
    term: "Interfaces",
    match: `interface User {
  name: string;
  age: number;
}
const user: User = { name: "Erik", age: 28 };`,
  },
  {
    term: "Klasser",
    match: `class Person {
  constructor(public name: string, private age: number) {}
  greet() {
    console.log(\`Hej, jag heter \${this.name}\`);
  }
}`,
  },
  {
    term: "Union & Optional types",
    match: `let id: number | string;
function printName(name: string, nickname?: string) {}`,
  },
  {
    term: "Enums",
    match: `enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let move: Direction = Direction.Up;`,
  },
];

export default function MemoryGameSyntax() {
  return (
    <GamePage
      category="TypeScript"
      title="Grundläggande syntax"
      subtitle="Matcha TypeScript-koncept med deras kodexempel."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: begrepp och kodexempel. Matchade par försvinner."
        termLabel="Begrepp"
        matchLabel="Exempel"
        matchCode
        completionNote="TypeScript hjälper till att skriva säkrare och mer förutsägbar kod genom att lägga till typer. Det minskar buggar och förbättrar utvecklarupplevelsen."
      />

      <Section title="Snabbfakta">
        <FactGrid columns={4}>
          <Fact title="Utgiven">2012 av Microsoft</Fact>
          <Fact title="Superset">Utökar JavaScript</Fact>
          <Fact title="Typer">Statisk typning</Fact>
          <Fact title="Kompilering">Till JavaScript</Fact>
          <Fact title="Säkerhet">Fångar fel tidigt</Fact>
          <Fact title="Popularitet">Används av stora företag</Fact>
          <Fact title="IDE-stöd">Autokomplettering</Fact>
          <Fact title="Öppen källkod">GitHub-projekt</Fact>
        </FactGrid>

        <div>
          <SubHeading>TypeScript-begrepp</SubHeading>
          <FactGrid>
            <Fact title="Interface">
              Definierar strukturen för ett objekt, som en mall för vilka
              egenskaper och metoder ett objekt ska ha.
            </Fact>
            <Fact title="Type Inference">
              TypeScript gissar automatiskt typen baserat på värdet, utan att
              du behöver ange den explicit.
            </Fact>
            <Fact title="Union Types">
              En variabel kan ha flera möjliga typer, t.ex. string | number.
            </Fact>
            <Fact title="Generics">
              Tillåter att skapa återanvändbara komponenter som fungerar med
              olika typer.
            </Fact>
            <Fact title="Optional Properties">
              Egenskaper som inte behöver vara definierade, markerade med ?.
            </Fact>
            <Fact title="Type Guards">
              Funktioner som hjälper TypeScript att förstå vilken typ en
              variabel har vid runtime.
            </Fact>
            <Fact title="Enums">
              Uppräknade typer som gör det lättare att arbeta med namngivna
              konstanter.
            </Fact>
            <Fact title="Modules">
              Organiserar kod i separata filer som kan importeras och
              exporteras.
            </Fact>
            <Fact title="Decorators">
              Funktioner som kan modifiera klasser, metoder eller egenskaper
              vid design-time.
            </Fact>
          </FactGrid>
        </div>

        <Note label="Reflektion">
          TypeScript hjälper utvecklare att skriva bättre kod genom att fånga
          fel tidigt och förbättra utvecklarupplevelsen.
        </Note>
      </Section>

      <Section title="TypeScript-grunderna">
        <TopicGrid>
          <Topic title="Vad är TypeScript?">
            <List>
              <li>
                TypeScript är ett programmeringsspråk som är en{" "}
                <Term>superset</Term> av JavaScript.
              </li>
              <li>
                Det lägger till <Term>statisk typning</Term> och andra
                funktioner till JavaScript.
              </li>
              <li>
                Kod kompileras till vanlig JavaScript som kan köras i
                webbläsaren.
              </li>
            </List>
          </Topic>

          <Topic title="Avancerade funktioner">
            <List>
              <li>
                <Term>Interfaces:</Term> Definierar strukturen för objekt.
              </li>
              <li>
                <Term>Generics:</Term> Återanvändbara komponenter som fungerar
                med olika typer.
              </li>
              <li>
                <Term>Union Types:</Term> En variabel kan ha flera möjliga
                typer.
              </li>
              <li>
                <Term>Enums:</Term> Namngivna konstanter för bättre
                kodläsbarhet.
              </li>
              <li>
                <Term>Type Guards:</Term> Hjälper TypeScript att förstå typer
                vid runtime.
              </li>
              <li>
                <Term>Decorators:</Term> Modifierar klasser och metoder.
              </li>
            </List>
          </Topic>

          <Topic title="Varför TypeScript?">
            <List>
              <li>
                <Term>Tidig felupptäckt:</Term> Fångar många fel innan koden
                körs.
              </li>
              <li>
                <Term>Bättre IDE-stöd:</Term> Autokomplettering och
                intellisense, och refactoring blir säkrare.
              </li>
              <li>
                <Term>Kodkvalitet:</Term> Tvingar bättre kodningsvanor.
              </li>
              <li>
                <Term>Större projekt:</Term> Lättare att underhålla och utöka,
                och bättre samarbete i team.
              </li>
            </List>
          </Topic>

          <Topic title="Komma igång med TypeScript">
            <p>För att börja använda TypeScript i ditt projekt:</p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-fg-muted/60">
              <li>
                Installera TypeScript:{" "}
                <InlineCode>npm install typescript</InlineCode>
              </li>
              <li>
                Skapa en <InlineCode>tsconfig.json</InlineCode>
              </li>
              <li>
                Byt filändelse från <InlineCode>.js</InlineCode> till{" "}
                <InlineCode>.ts</InlineCode>
              </li>
              <li>
                Kompilera: <InlineCode>tsc</InlineCode>
              </li>
            </ol>
          </Topic>

          <Topic title="Grundläggande typer">
            <p>TypeScript har samma typer som JavaScript plus några extra:</p>
            <List>
              <li>
                <Term>boolean:</Term> true/false
              </li>
              <li>
                <Term>number:</Term> alla nummer
              </li>
              <li>
                <Term>string:</Term> text
              </li>
              <li>
                <Term>array:</Term> listor av värden
              </li>
              <li>
                <Term>object:</Term> komplexa datastrukturer
              </li>
              <li>
                <Term>null/undefined:</Term> frånvaro av värde
              </li>
            </List>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
