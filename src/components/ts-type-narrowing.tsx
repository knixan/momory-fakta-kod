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
  {
    term: 'typeof x === "string"',
    match: "Typeof-guard - smalnar av typen till string i den grenen",
  },
  {
    term: "x instanceof Dog",
    match: "Instanceof-guard - kontrollerar om x är en instans av klassen",
  },
  {
    term: '"paws" in animal',
    match: "In-guard - kontrollerar om en egenskap finns på objektet",
  },
  {
    term: "function isFish(pet): pet is Fish",
    match: "Custom type predicate - egen funktion som smalnar av en union",
  },
];

export default function TsTypeNarrowingGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Type Narrowing & Guards"
      subtitle="Matcha type guards med vad de kontrollerar."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: guard och beskrivning. Matchade par försvinner."
        termLabel="Guard"
        matchLabel="Beskrivning"
        termCode
        completionNote="Type guards körs vid runtime - TypeScript använder resultatet för att smalna av typen bara inom den if-grenen."
      />

      <Section title="Snabbfakta">
        <FactGrid>
          <Fact title="typeof" code>
            Fungerar för primitiver: string, number, boolean m.fl.
          </Fact>
          <Fact title="instanceof" code>
            Fungerar för klasser och deras instanser
          </Fact>
          <Fact title="in" code>
            Kollar om en egenskap existerar på objektet
          </Fact>
          <Fact title="Discriminated Union">
            En gemensam &quot;tag&quot;-egenskap skiljer varianterna åt
          </Fact>
          <Fact title="Type Predicate">
            Egen funktion: <InlineCode>param is Typ</InlineCode>
          </Fact>
          <Fact title="never" code>
            Exhaustiveness check fångar ohanterade fall
          </Fact>
        </FactGrid>
        <Note label="Tips">
          Lägg till ett <InlineCode>default</InlineCode>-fall som tilldelar
          värdet till en <InlineCode>never</InlineCode>-variabel - då varnar
          TypeScript dig om du glömmer hantera en ny variant i en union.
        </Note>
      </Section>

      <Section title="Type Narrowing & Guards i djupet">
        <TopicGrid>
          <Topic title="typeof-guard">
            <p>Smalnar av unioner av primitiver.</p>
            <Code>{`function print(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()) // id är string här
  } else {
    console.log(id.toFixed(2))    // id är number här
  }
}`}</Code>
          </Topic>

          <Topic title="Discriminated unions">
            <p>Den tydligaste och säkraste formen av narrowing.</p>
            <Code>{`type Result =
  | { status: "success"; data: string }
  | { status: "error"; message: string }

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data)
  } else {
    console.log(result.message)
  }
}`}</Code>
          </Topic>

          <Topic title="instanceof-guard">
            <p>Fungerar för klasser, inte plain objects.</p>
            <Code>{`class Dog { bark() {} }
class Cat { meow() {} }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()
  } else {
    animal.meow()
  }
}`}</Code>
          </Topic>

          <Topic title="Egna type predicates">
            <p>Kapsla in komplex kontrollogik i en återanvändbar funktion.</p>
            <Code>{`type Fish = { swim: () => void }
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet
}

if (isFish(pet)) pet.swim()`}</Code>
          </Topic>

          <Topic title="in-guard">
            <p>Praktiskt för plain objects utan klasser.</p>
            <Code>{`type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    pet.swim()
  } else {
    pet.fly()
  }
}`}</Code>
          </Topic>

          <Topic title="Exhaustiveness med never">
            <p>Fångar upp när du glömt ett fall i en switch.</p>
            <Code>{`function assertNever(x: never): never {
  throw new Error("Ohanterat fall: " + x)
}

switch (result.status) {
  case "success": return result.data
  case "error": return result.message
  default: return assertNever(result)
}`}</Code>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
