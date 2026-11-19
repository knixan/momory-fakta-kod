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
  { term: "Math", match: "Matematik" },
  { term: "String", match: "Text" },
  { term: "Array", match: "Listor" },
  { term: "Number", match: "Tal" },
  { term: "Date", match: "Datum och tid" },
  { term: "Object", match: "Objekt och data" },
  { term: "Set", match: "Unika värden" },
  { term: "Map", match: "Nycklar och värden" },
  { term: "JSON", match: "Omvandla data till/från JSON" },
  { term: "RegExp", match: "Söka med mönster i text" },
  { term: "Promise", match: "Asynkron programmering" },
];

export default function TsInbyggdaObjektGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Inbyggda objekt"
      subtitle="Matcha JavaScripts inbyggda objekt med vad de används till."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: objekt och användningsområde. Matchade par försvinner."
        termLabel="Objekt"
        matchLabel="Används till"
        termCode
        completionNote="De inbyggda objekten kommer från JavaScript - TypeScript lägger bara till typer ovanpå, t.ex. Map<string, number> eller Promise<User>."
      />

      <Section title="Snabbfakta">
        <FactGrid>
          <Fact title="Math" code>
            Math.round, Math.floor, Math.max, Math.random
          </Fact>
          <Fact title="String" code>
            toUpperCase, trim, split, includes, slice, replace
          </Fact>
          <Fact title="Array" code>
            map, filter, find, reduce, includes, push
          </Fact>
          <Fact title="Number" code>
            Number(&quot;42&quot;), toFixed, Number.isNaN, parseInt
          </Fact>
          <Fact title="Date" code>
            new Date(), getFullYear, toISOString, toLocaleDateString
          </Fact>
          <Fact title="Object" code>
            Object.keys, Object.values, Object.entries, Object.freeze
          </Fact>
          <Fact title="Set" code>
            add, has, delete, size
          </Fact>
          <Fact title="Map" code>
            set, get, has, delete, size
          </Fact>
          <Fact title="JSON" code>
            JSON.stringify, JSON.parse
          </Fact>
          <Fact title="RegExp" code>
            test, match, replace med /mönster/g
          </Fact>
          <Fact title="Promise" code>
            async/await, then, catch, Promise.all
          </Fact>
          <Fact title="Statiskt eller instans?">
            Math och JSON används direkt. Date, Set, Map och RegExp skapas
            oftast med <InlineCode>new</InlineCode>.
          </Fact>
        </FactGrid>
        <Note label="Tips">
          Flera metoder kan returnera <InlineCode>undefined</InlineCode>, t.ex.{" "}
          <InlineCode>array.find()</InlineCode> och{" "}
          <InlineCode>map.get()</InlineCode>. TypeScript tvingar dig att hantera
          det fallet - det är en av de vanligaste källorna till buggar som
          typerna fångar.
        </Note>
      </Section>

      <Section title="Inbyggda objekt i djupet">
        <TopicGrid>
          <Topic title="Math - matematik">
            <p>
              Ett statiskt objekt: du skapar aldrig ett eget Math, du anropar
              metoderna direkt.
            </p>
            <Code>{`Math.round(4.6)      // 5
Math.floor(4.6)      // 4
Math.max(3, 9, 2)    // 9
Math.abs(-7)         // 7

// Slumpat heltal 1-6
const dice: number = Math.floor(Math.random() * 6) + 1`}</Code>
          </Topic>

          <Topic title="String - text">
            <p>
              Strängar är oföränderliga - metoderna returnerar alltid en ny
              sträng.
            </p>
            <Code>{`const name: string = "  Anna Svensson "

name.trim()               // "Anna Svensson"
name.toUpperCase()        // "  ANNA SVENSSON "
name.includes("Anna")     // true
name.trim().split(" ")    // ["Anna", "Svensson"]

const greeting = \`Hej \${name.trim()}!\``}</Code>
          </Topic>

          <Topic title="Array - listor">
            <p>
              Typen anges som <InlineCode>number[]</InlineCode> eller{" "}
              <InlineCode>Array&lt;number&gt;</InlineCode>.
            </p>
            <Code>{`const scores: number[] = [12, 7, 20]

scores.map((s) => s * 2)        // [24, 14, 40]
scores.filter((s) => s > 10)    // [12, 20]
scores.reduce((a, b) => a + b)  // 39

const high = scores.find((s) => s > 15)
// typ: number | undefined`}</Code>
          </Topic>

          <Topic title="Number - tal">
            <p>
              Omvandla text till tal och formatera tal. Ogiltig input blir{" "}
              <InlineCode>NaN</InlineCode>.
            </p>
            <Code>{`Number("42")          // 42
Number("hej")         // NaN
Number.isNaN(NaN)     // true
parseInt("42px")      // 42

const price = 19.5
price.toFixed(2)      // "19.50" (en string!)`}</Code>
          </Topic>

          <Topic title="Date - datum och tid">
            <p>
              Obs: månader räknas från 0, så januari är 0 och december är 11.
            </p>
            <Code>{`const now: Date = new Date()
const birthday = new Date(2000, 0, 15) // 15 januari 2000

now.getFullYear()                // t.ex. 2026
now.toISOString()                // "2026-11-19T10:30:00.000Z"
now.toLocaleDateString("sv-SE")  // "2026-11-19"`}</Code>
          </Topic>

          <Topic title="Object - objekt och data">
            <p>Hjälpmetoder för att läsa och kopiera vanliga objekt.</p>
            <Code>{`const user = { name: "Elin", age: 30 }

Object.keys(user)     // ["name", "age"]  (typ: string[])
Object.values(user)   // ["Elin", 30]
Object.entries(user)  // [["name", "Elin"], ["age", 30]]

const copy = { ...user, age: 31 }       // ny kopia
const locked = Object.freeze(user)      // kan inte ändras`}</Code>
          </Topic>

          <Topic title="Set - unika värden">
            <p>
              Samma värde kan bara finnas en gång. Snabbt att kolla om något
              finns.
            </p>
            <Code>{`const tags = new Set<string>()
tags.add("ts")
tags.add("react")
tags.add("ts")       // ignoreras, finns redan

tags.has("react")    // true
tags.size            // 2

// Ta bort dubletter ur en array
const unique = [...new Set([1, 2, 2, 3])] // [1, 2, 3]`}</Code>
          </Topic>

          <Topic title="Map - nycklar och värden">
            <p>
              Som ett objekt, men nycklar kan vara vilken typ som helst och
              ordningen behålls.
            </p>
            <Code>{`const stock = new Map<string, number>()
stock.set("äpple", 12)
stock.set("päron", 4)

stock.get("äpple")   // 12  (typ: number | undefined)
stock.has("banan")   // false
stock.size           // 2

for (const [fruit, count] of stock) {
  console.log(fruit, count)
}`}</Code>
          </Topic>

          <Topic title="JSON - omvandla data">
            <p>
              <InlineCode>JSON.parse</InlineCode> returnerar{" "}
              <InlineCode>any</InlineCode> - ange typen själv eller validera
              med t.ex. Zod.
            </p>
            <Code>{`interface User { name: string; age: number }

const user: User = { name: "Elin", age: 30 }

const text = JSON.stringify(user)
// '{"name":"Elin","age":30}'

const parsed = JSON.parse(text) as User`}</Code>
          </Topic>

          <Topic title="RegExp - mönster i text">
            <p>Används för att validera, söka och ersätta text.</p>
            <Code>{`const postnummer = /^\\d{3} ?\\d{2}$/

postnummer.test("123 45")   // true
postnummer.test("12a45")    // false

"a-b-c".replace(/-/g, " ")  // "a b c"
"Tel: 070-123".match(/\\d+/g) // ["070", "123"]`}</Code>
          </Topic>

          <Topic title="Promise - asynkron programmering">
            <p>
              Ett värde som kommer senare. Typen anger vad det blir:{" "}
              <InlineCode>Promise&lt;User&gt;</InlineCode>.
            </p>
            <Code>{`async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
}

const user = await getUser("1")

// Kör flera samtidigt
const [a, b] = await Promise.all([getUser("1"), getUser("2")])`}</Code>
          </Topic>

          <Topic title="Map vs Object, Set vs Array">
            <p>
              <strong className="font-semibold text-fg">Map</strong> passar när
              nycklar läggs till och tas bort ofta, eller inte är strängar.{" "}
              <strong className="font-semibold text-fg">Object</strong> passar
              för data med fasta fält, som en User.
            </p>
            <p>
              <strong className="font-semibold text-fg">Set</strong> passar när
              varje värde bara ska finnas en gång och du ofta kollar{" "}
              <InlineCode>has()</InlineCode>.{" "}
              <strong className="font-semibold text-fg">Array</strong> passar när
              ordning, index och dubletter spelar roll.
            </p>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
