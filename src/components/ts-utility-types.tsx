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
  { term: "Partial<T>", match: "Gör alla egenskaper i T valfria (optional)" },
  {
    term: "Pick<T, K>",
    match: "Skapar en ny typ med bara de valda egenskaperna K från T",
  },
  {
    term: "Omit<T, K>",
    match: "Skapar en ny typ utan de angivna egenskaperna K",
  },
  {
    term: "Record<K, T>",
    match: "Bygger ett objekt med nycklar av typ K och värden av typ T",
  },
];

export default function TsUtilityTypesGame() {
  return (
    <GamePage
      category="TypeScript"
      title="Utility Types"
      subtitle="Matcha inbyggda utility types med vad de gör."
    >
      <MemoryGame
        pairs={pairs}
        instructions="Klicka på två kort som hör ihop: utility type och beskrivning. Matchade par försvinner."
        termLabel="Utility type"
        matchLabel="Beskrivning"
        termCode
        completionNote="Utility types låter dig återanvända en typ istället för att skriva om samma fält i flera interfaces."
      />

      <Section title="Snabbfakta">
        <FactGrid>
          <Fact title="Partial" code>
            Alla fält blir valfria - bra för PATCH/uppdateringar
          </Fact>
          <Fact title="Required" code>
            Motsatsen till Partial - alla fält blir obligatoriska
          </Fact>
          <Fact title="Pick" code>
            Plocka ut ett fåtal fält från en större typ
          </Fact>
          <Fact title="Omit" code>
            Ta bort ett fåtal fält från en större typ
          </Fact>
          <Fact title="Record" code>
            Bygg upp objekt-typer med kända nycklar
          </Fact>
          <Fact title="Readonly" code>
            Gör fälten skrivskyddade efter skapande
          </Fact>
        </FactGrid>
        <Note label="Tips">
          Kombinera gärna utility types:{" "}
          <InlineCode>
            Partial&lt;Pick&lt;User, &quot;name&quot; | &quot;email&quot;&gt;&gt;
          </InlineCode>{" "}
          ger en typ med bara namn och e-post, båda valfria.
        </Note>
      </Section>

      <Section title="Utility Types i djupet">
        <TopicGrid>
          <Topic title="Partial & Required">
            <p>Gör allt valfritt respektive obligatoriskt.</p>
            <Code>{`interface User {
  name: string
  email: string
}

type UserUpdate = Partial<User>
// { name?: string; email?: string }

function updateUser(id: string, data: UserUpdate) { ... }`}</Code>
          </Topic>

          <Topic title="Record - bygga objekt-typer">
            <p>Praktiskt för lookup-tabeller och caches.</p>
            <Code>{`type Role = "admin" | "user" | "guest"

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
}`}</Code>
          </Topic>

          <Topic title="Pick - plocka ut fält">
            <p>Bra för att bygga smala DTO:er från en stor typ.</p>
            <Code>{`interface User {
  id: string
  name: string
  email: string
  passwordHash: string
}

type PublicUser = Pick<User, "id" | "name" | "email">`}</Code>
          </Topic>

          <Topic title="Readonly">
            <p>Förhindrar oavsiktlig mutation efter skapande.</p>
            <Code>{`const config: Readonly<{ apiUrl: string }> = {
  apiUrl: "https://api.example.com",
}

config.apiUrl = "annan-url" // Fel vid kompilering`}</Code>
          </Topic>

          <Topic title="Omit - exkludera fält">
            <p>Motsatsen till Pick - ta bort känsliga fält.</p>
            <Code>{`type PublicUser = Omit<User, "passwordHash">
// { id: string; name: string; email: string }`}</Code>
          </Topic>

          <Topic title="ReturnType & Parameters">
            <p>Härled typer direkt från befintliga funktioner.</p>
            <Code>{`function createUser() {
  return { id: "1", name: "Elin" }
}

type User = ReturnType<typeof createUser>
type CreateUserArgs = Parameters<typeof createUser>`}</Code>
          </Topic>
        </TopicGrid>
      </Section>
    </GamePage>
  );
}
