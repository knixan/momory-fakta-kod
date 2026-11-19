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
    term: "string",
    match: "Textsträngar - \"hej\", 'text', `template string`",
  },
  { term: "number", match: "Alla tal - 42, 3.14, -10 (heltal, decimaltal)" },
  { term: "boolean", match: "Sant eller falskt - true, false" },
  { term: "null", match: "Inget värde (avsiktligt tomt)" },
  { term: "undefined", match: "Ej definierat (värdet saknas)" },
  { term: "array", match: "Lista av element av samma typ - number[], string[]" },
  { term: "object", match: "Samling av egenskaper (nyckel-värde)" },
  { term: "any", match: "Stänger av typkontrollen (kan vara vad som helst)" },
  { term: "void", match: "Används när funktion inte returnerar något" },
  {
    term: "Union ( | )",
    match: "Kombinerar flera möjliga typer - string | number",
  },
];

export default function DataTypesGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Datatyper"
      subtitle="Matcha TypeScript-datatyper med deras förklaringar."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: datatyp och dess förklaring. Matchade par försvinner."
        termLabel="Datatyp"
        matchLabel="Förklaring"
        termCode
        completionNote="Att förstå olika datatyper är grundläggande för att skriva säker och förutsägbar kod."
      />

      <Section title="Snabbfakta">
        <FactGrid columns={4}>
          <Fact title="Primära typer">string, number, boolean</Fact>
          <Fact title="Sammansatta">array, object, tuple</Fact>
          <Fact title="Speciella">any, void, never</Fact>
          <Fact title="Kombinationer">Union, Intersection</Fact>
        </FactGrid>

        <div>
          <SubHeading>Viktiga datatyper</SubHeading>
          <FactGrid>
            <Fact title="string" code>
              Textsträngar - &quot;hej&quot;, &apos;text&apos;, `template`
            </Fact>
            <Fact title="number" code>
              Alla tal - 42, 3.14, -10
            </Fact>
            <Fact title="boolean" code>
              Sant eller falskt - true/false
            </Fact>
            <Fact title="array" code>
              Lista av samma typ - number[], string[]
            </Fact>
            <Fact title="object" code>
              Samling av egenskaper - {`{name: string}`}
            </Fact>
            <Fact title="any" code>
              Stänger av typkontroll - använd sparsamt
            </Fact>
            <Fact title="void" code>
              Funktion returnerar inget värde
            </Fact>
            <Fact title="Union (|)" code>
              Kombinerar typer - string | number
            </Fact>
            <Fact title="null" code>
              Inget värde (avsiktligt tomt)
            </Fact>
          </FactGrid>
        </div>

        <Note label="Reflektion">
          Datatyper är byggstenarna i programmering - rätt typ säkerställer att
          din kod fungerar som förväntat.
        </Note>
      </Section>

      <Section title="Datatyper i djupet">
        <TopicGrid>
          <Topic title="Primära datatyper">
            <List>
              <li>
                <Term>string:</Term> Textsträngar (&quot;hej&quot;,
                &apos;text&apos;, `template`)
              </li>
              <li>
                <Term>number:</Term> Alla tal (42, 3.14, -10)
              </li>
              <li>
                <Term>boolean:</Term> Sant/falskt (true/false)
              </li>
              <li>
                <Term>null:</Term> Avsiktligt tomt värde
              </li>
              <li>
                <Term>undefined:</Term> Värde som saknas
              </li>
            </List>
          </Topic>

          <Topic title="Speciella datatyper">
            <List>
              <li>
                <Term>any:</Term> Stänger av typkontroll - använd sparsamt
              </li>
              <li>
                <Term>unknown:</Term> Okänd typ - måste kontrolleras innan
                användning
              </li>
              <li>
                <Term>void:</Term> Funktion returnerar inget värde
              </li>
              <li>
                <Term>never:</Term> Funktion som aldrig avslutas normalt
              </li>
            </List>
          </Topic>

          <Topic title="Sammansatta datatyper">
            <p>
              <Term>Array:</Term> Lista av samma typ
              <br />
              <InlineCode>let numbers: number[] = [1, 2, 3];</InlineCode>
            </p>
            <p>
              <Term>Tuple:</Term> Fast ordning av olika typer
              <br />
              <InlineCode>
                let person: [string, number] = [&quot;Anna&quot;, 25];
              </InlineCode>
            </p>
            <p>
              <Term>Object:</Term> Egenskaper och värden
              <br />
              <InlineCode>{`let user = {name: "Tom", age: 28};`}</InlineCode>
            </p>
          </Topic>

          <Topic title="Varför förstå datatyper?">
            <p>Rätt datatyper förhindrar många programmeringsfel:</p>
            <List>
              <li>
                <Term>Felförebyggande:</Term> Upptäck fel tidigt
              </li>
              <li>
                <Term>Bättre IDE-stöd:</Term> Autokomplettering och
                refactoring
              </li>
              <li>
                <Term>Kodförståelse:</Term> Självdokumenterande kod
              </li>
              <li>
                <Term>Prestanda:</Term> Effektivare kompilering
              </li>
            </List>
            <p>
              Datatyper är som byggstenar - rätt typ på rätt plats skapar
              stabila applikationer.
            </p>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
