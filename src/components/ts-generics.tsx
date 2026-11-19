import MemoryGame, { type MemoryPair } from "./memory/memory-game";
import {
  Code,
  Fact,
  FactGrid,
  GamePage,
  Note,
  Section,
  Topic,
  TopicGrid,
} from "./memory/content";

const pairs: MemoryPair[] = [
  {
    term: "function identity<T>(value: T): T",
    match: "Generisk funktion som bevarar typen på argumentet den får in",
  },
  {
    term: "<T extends { length: number }>",
    match: "Generic constraint - begränsar T till typer som har length",
  },
  {
    term: "class Box<T> { value: T }",
    match: "Generisk klass som fungerar med valfri typ",
  },
  {
    term: "<T = string>",
    match: "Default type parameter - används om ingen typ anges explicit",
  },
];

export default function TsGenericsGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Generics"
      subtitle="Matcha generisk syntax med rätt beskrivning."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: syntax och beskrivning. Matchade par försvinner."
        termLabel="Syntax"
        matchLabel="Beskrivning"
        termCode
        completionNote="Generics låter dig skriva återanvändbar kod utan att tappa typsäkerhet - tänk på T som en variabel, fast för typer."
      />

      <Section title="Snabbfakta">
        <FactGrid>
          <Fact title="Type Parameter">
            T, K, V - konventionsnamn för generiska typer
          </Fact>
          <Fact title="Constraint">extends begränsar vilka typer T får vara</Fact>
          <Fact title="Default Type">&lt;T = string&gt; ger ett standardvärde</Fact>
          <Fact title="Generic Interface">
            interface Box&lt;T&gt; {"{ value: T }"}
          </Fact>
          <Fact title="Generic Class">
            class Stack&lt;T&gt; hanterar valfri datatyp
          </Fact>
          <Fact title="Flera parametrar">&lt;K, V&gt; - t.ex. Map&lt;K, V&gt;</Fact>
        </FactGrid>
        <Note label="Tips">
          Om du bara använder T en gång i en funktion behöver du kanske inte
          generics alls - fråga dig om typen faktiskt varierar mellan anrop.
        </Note>
      </Section>

      <Section title="Generics i djupet">
        <TopicGrid>
          <Topic title="Generiska funktioner">
            <p>T bestäms av vilken typ som faktiskt skickas in.</p>
            <Code>{`function identity<T>(value: T): T {
  return value
}

identity<string>("hej") // T = string
identity(42)             // T härleds till number`}</Code>
          </Topic>

          <Topic title="Generiska interfaces">
            <p>Beskriv en form som fungerar för flera typer.</p>
            <Code>{`interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 42 }
const stringBox: Box<string> = { value: "hej" }`}</Code>
          </Topic>

          <Topic title="Constraints med extends">
            <p>Begränsa T till typer som har vissa egenskaper.</p>
            <Code>{`function logLength<T extends { length: number }>(item: T) {
  console.log(item.length)
}

logLength("hej")       // OK - string har length
logLength([1, 2, 3])   // OK - array har length
logLength(42)          // Fel - number har ingen length`}</Code>
          </Topic>

          <Topic title="Generiska klasser">
            <p>En återanvändbar datastruktur, t.ex. en Stack.</p>
            <Code>{`class Stack<T> {
  private items: T[] = []
  push(item: T) { this.items.push(item) }
  pop(): T | undefined { return this.items.pop() }
}

const numbers = new Stack<number>()`}</Code>
          </Topic>

          <Topic title="Default type parameters">
            <p>Ge T ett standardvärde om inget anges.</p>
            <Code>{`interface ApiResponse<T = unknown> {
  data: T
  status: number
}

const res: ApiResponse = { data: "ok", status: 200 }`}</Code>
          </Topic>

          <Topic title="Flera typparametrar">
            <p>Vanligt i inbyggda typer som Map och Record.</p>
            <Code>{`function merge<A, B>(a: A, b: B): A & B {
  return { ...a, ...b }
}

const result = merge({ name: "Elin" }, { age: 30 })
// { name: string } & { age: number }`}</Code>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
