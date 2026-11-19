import MemoryGame, { type MemoryPair } from "./memory/memory-game";
import {
  Code,
  Fact,
  FactGrid,
  GamePage,
  InlineCode,
  Note,
  Section,
  Topic,
  TopicGrid,
} from "./memory/content";

const pairs: MemoryPair[] = [
  { term: "keyof T", match: "Skapar en union av alla egenskapsnamn i T" },
  {
    term: "T extends U ? X : Y",
    match: "Conditional type - väljer typ X eller Y baserat på ett villkor",
  },
  {
    term: "{ [K in keyof T]: T[K] }",
    match: "Mapped type - transformerar varje egenskap i T till en ny typ",
  },
  {
    term: "as const / satisfies",
    match: "Bevarar literal-typer respektive validerar utan att bredda typen",
  },
];

export default function TsAvanceradeTyperGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Avancerade typer"
      subtitle="Matcha avancerad typsyntax med rätt beskrivning."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: syntax och beskrivning. Matchade par försvinner."
        termLabel="Syntax"
        matchLabel="Beskrivning"
        termCode
        completionNote="satisfies validerar ett värde mot en typ utan att bredda variabelns egen, mer specifika typ - till skillnad från en vanlig typannotering."
      />

      <Section title="Snabbfakta">
        <FactGrid>
          <Fact title="keyof" code>
            Union av alla nyckelnamn i ett objekt
          </Fact>
          <Fact title="Conditional Types">
            Typer som förgrenar sig som ett if-uttryck
          </Fact>
          <Fact title="Mapped Types">Transformerar varje egenskap i en typ</Fact>
          <Fact title="Template Literal Types">
            Bygg strängtyper, t.ex. <InlineCode>{"`on${Event}`"}</InlineCode>
          </Fact>
          <Fact title="infer" code>
            Extraherar en typ inuti en conditional type
          </Fact>
          <Fact title="satisfies" code>
            Validerar värdet utan att bredda dess typ
          </Fact>
        </FactGrid>
        <Note label="Tips">
          Dessa typer används sällan i vardagskod men syns ofta i bibliotekens
          typdefinitioner - bra att känna igen även om du sällan skriver dem
          själv.
        </Note>
      </Section>

      <Section title="Avancerade typer i djupet">
        <TopicGrid>
          <Topic title="keyof">
            <p>Bra tillsammans med generics för typsäker property-access.</p>
            <Code>{`interface User { id: string; name: string }

type UserKeys = keyof User // "id" | "name"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}`}</Code>
          </Topic>

          <Topic title="Template literal types">
            <p>Bygg strängtyper på ett typsäkert sätt.</p>
            <Code>{`type Event = "click" | "hover"
type Handler = \`on\${Capitalize<Event>}\`
// "onClick" | "onHover"`}</Code>
          </Topic>

          <Topic title="Conditional types">
            <p>Typen som väljs beror på ett annat typvillkor.</p>
            <Code>{`type IsString<T> = T extends string ? true : false

type A = IsString<"hej">   // true
type B = IsString<42>      // false`}</Code>
          </Topic>

          <Topic title="infer - extrahera en typ">
            <p>
              Används inuti en conditional type för att &quot;fånga&quot; en
              del.
            </p>
            <Code>{`type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<number>           // number`}</Code>
          </Topic>

          <Topic title="Mapped types">
            <p>Så här är utility types som Partial/Readonly byggda.</p>
            <Code>{`type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}`}</Code>
          </Topic>

          <Topic title="as const & satisfies">
            <p>
              Två sätt att behålla exakta typer utan att förlora
              autokomplettering.
            </p>
            <Code>{`const routes = ["/", "/about"] as const
// typ: readonly ["/", "/about"]

const config = {
  color: "red",
} satisfies Record<string, string>
// config.color är fortfarande "red", inte bara string`}</Code>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
