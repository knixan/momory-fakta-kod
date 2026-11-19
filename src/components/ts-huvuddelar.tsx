import type { ReactNode } from "react";
import MemoryGame, { type MemoryPair } from "./memory/memory-game";
import {
  Code,
  Fact,
  FactGrid,
  GamePage,
  InlineCode,
  List,
  Note,
  Section,
  Term,
  Topic,
  TopicGrid,
} from "./memory/content";

const pairs: MemoryPair[] = [
  { term: "Syntax", match: "Hur koden skrivs\n{ }, ;, if, for" },
  { term: "Datatyper", match: "string, number, boolean\narray, object" },
  { term: "Operatorer", match: "+, -, *, /\n&&, ||, ===" },
  { term: "Variabler", match: "let name = 'Anna'\nconst age = 25" },
  { term: "Funktioner", match: "function greet()\n=> arrow functions" },
  { term: "Objekt & Klasser", match: "class Person {}\n{ name, age }" },
  { term: "Interface", match: "interface User {}\ntype Shape = ..." },
  { term: "Generics", match: "Array<T>\nfunction<T>(value: T)" },
  { term: "Moduler", match: "import { ... }\nexport default" },
  { term: "Kontrollstrukturer", match: "if/else, switch\nfor, while loops" },
];

function Purpose({ children }: { children: ReactNode }) {
  return (
    <p>
      <Term>Syfte:</Term> {children}
    </p>
  );
}

export default function HuvuddelarGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Huvuddelar"
      subtitle="Matcha TypeScripts huvuddelar med beskrivningar och exempel."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på ett begrepp och matcha det med rätt beskrivning eller exempel. Matchade par försvinner."
        termLabel="Begrepp"
        matchLabel="Exempel"
        completionNote="Nu känner du till huvuddelarna i TypeScript och hur de används i praktiken."
      />

      <Section title="Så fungerar matchningen">
        <FactGrid columns={2}>
          <Fact title="Begreppskort">
            Märkt &quot;Begrepp&quot; - visar namnet på TypeScript-konceptet
          </Fact>
          <Fact title="Exempelkort">
            Märkt &quot;Exempel&quot; - visar exempel eller förklaring
          </Fact>
        </FactGrid>
        <Note label="Tips">
          Varje begrepp har sitt eget exempel. Försök koppla samman vad du vet
          om TypeScript för att hitta rätt matchningar.
        </Note>
      </Section>

      <Section title="Huvuddelarna i djupet">
        <TopicGrid>
          <Topic title="1. Syntax och struktur">
            <p>Hur koden skrivs och organiseras.</p>
            <List>
              <li>
                <Term>Variabler:</Term> let, const
              </li>
              <li>
                <Term>Satser:</Term> if, for, while
              </li>
              <li>
                <Term>Funktioner:</Term> function keyword
              </li>
              <li>
                <Term>Block:</Term> {"{ ... }"}
              </li>
              <li>
                <Term>Kommentarer:</Term> {"//"}, /* */
              </li>
            </List>
            <Purpose>definiera programflöde och logik.</Purpose>
          </Topic>

          <Topic title="2. Datatyper">
            <p>Vilken sorts information som lagras eller hanteras.</p>
            <List>
              <li>
                <Term>Grundtyper:</Term> string, number, boolean, null,
                undefined
              </li>
              <li>
                <Term>Samlings- och specialtyper:</Term> array, tuple, object,
                any, unknown
              </li>
              <li>
                <Term>Avancerat:</Term> union, intersection, literal types,
                enum, generic
              </li>
            </List>
            <Purpose>skapa struktur, minska fel och ge tydlighet.</Purpose>
          </Topic>

          <Topic title="3. Operatorer och tecken">
            <p>Symboler som styr hur data behandlas.</p>
            <List>
              <li>
                <Term>Aritmetiska:</Term> <InlineCode>+, -, *, /</InlineCode>
              </li>
              <li>
                <Term>Jämförelser:</Term>{" "}
                <InlineCode>==, ===, &lt;, &gt;</InlineCode>
              </li>
              <li>
                <Term>Logiska:</Term> <InlineCode>&amp;&amp;, ||, !</InlineCode>
              </li>
              <li>
                <Term>Typrelaterade:</Term>{" "}
                <InlineCode>:, |, &amp;, as, typeof</InlineCode>
              </li>
              <li>
                <Term>Ternära och spread:</Term> <InlineCode>? :, ...</InlineCode>
              </li>
            </List>
            <Purpose>utföra operationer och styra logik.</Purpose>
          </Topic>

          <Topic title="4. Variabler och konstanter">
            <p>Hur man lagrar värden.</p>
            <List>
              <li>
                <Term>let</Term> - ändringsbar variabel
              </li>
              <li>
                <Term>const</Term> - konstant värde
              </li>
              <li>
                <Term>var</Term> - äldre variant (undviks oftast i TS)
              </li>
            </List>
            <Purpose>hålla data i minnet för senare användning.</Purpose>
          </Topic>

          <Topic title="5. Funktioner">
            <p>Block av kod som går att återanvända.</p>
            <Code>{`function greet(name: string): string {
  return \`Hej, \${name}!\`;
}`}</Code>
            <Purpose>
              återanvänd logik, dela upp programmet i mindre delar.
            </Purpose>
          </Topic>

          <Topic title="6. Objekt och klasser">
            <p>Grunden för objektorienterad programmering (OOP).</p>
            <p>
              <Term>Objekt:</Term> strukturerad data
            </p>
            <Code>{`const user = { name: "Anna", age: 25 };`}</Code>
            <p>
              <Term>Klasser:</Term> mallar för att skapa objekt
            </p>
            <Code>{`class Person {
  constructor(public name: string) {}
  greet() { console.log(\`Hej \${this.name}\`); }
}`}</Code>
            <Purpose>strukturera och modellera verkliga saker.</Purpose>
          </Topic>

          <Topic title="7. Interface & Type">
            <p>Sätt att beskriva form och struktur på objekt och data.</p>
            <Code>{`interface User {
  id: number;
  name: string;
}`}</Code>
            <Purpose>skapa tydliga &quot;mallar&quot; för data.</Purpose>
          </Topic>

          <Topic title="8. Generics">
            <p>
              Kod som kan användas med olika datatyper utan att tappa
              typkontroll.
            </p>
            <Code>{`function identity<T>(value: T): T {
  return value;
}`}</Code>
            <Purpose>återanvändbar och flexibel kod.</Purpose>
          </Topic>

          <Topic title="9. Moduler och import/export">
            <p>Hur man delar upp kod i flera filer.</p>
            <Code>{`// user.ts
export interface User { name: string; }

// app.ts
import { User } from "./user";`}</Code>
            <Purpose>strukturera större projekt.</Purpose>
          </Topic>

          <Topic title="10. Felhantering">
            <p>Hanterar oväntade situationer.</p>
            <Code>{`try {
  throw new Error("Något gick fel");
} catch (e) {
  console.log(e.message);
}`}</Code>
            <Purpose>förhindra att program kraschar vid fel.</Purpose>
          </Topic>

          <Topic title="11. Kontrollstrukturer">
            <p>Styr programflödet.</p>
            <List>
              <li>
                <Term>if / else:</Term> Villkorlig körning
              </li>
              <li>
                <Term>switch:</Term> Flera alternativ
              </li>
              <li>
                <Term>for, while, for...of, for...in:</Term> Loopar
              </li>
              <li>
                <Term>return, break, continue:</Term> Kontrollflöde
              </li>
            </List>
            <Purpose>styra ordningen som koden körs i.</Purpose>
          </Topic>

          <Topic title="12. Kommentarer och dokumentation">
            <p>Förklarar koden.</p>
            <Code>{`// En enkel kommentar

/**
 * Dokumentationskommentar för funktioner
 */`}</Code>
            <Purpose>gör koden lättare att förstå och underhålla.</Purpose>
          </Topic>

          <Topic title="13. Typdeklarationer och bibliotek">
            <p>
              TypeScript använder ofta typer från externa bibliotek
              (.d.ts-filer).
            </p>
            <Code>npm install --save-dev @types/express</Code>
            <Purpose>lägga till typstöd för tredjepartspaket.</Purpose>
          </Topic>

          <Topic title="14. Konfigurationsfiler">
            <p>
              <InlineCode>tsconfig.json</InlineCode> styr hur TypeScript
              kompilerar projektet.
            </p>
            <Code>{`{
  "compilerOptions": {
    "target": "ES6",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}`}</Code>
            <Purpose>kontrollera hur koden översätts till JavaScript.</Purpose>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
