import ReactHooksGame from "@/components/react-hooks";

export default function ReactHooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚛️ React Hooks Memory
          </h1>
          <p className="text-xl text-gray-300">
            Lär dig React Hooks genom att matcha koncept med beskrivningar
          </p>
        </div>
        <ReactHooksGame />
      </div>
    </div>
  );
}
