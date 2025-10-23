import ReactComponentsGame from "@/components/react-components";

export default function ReactComponentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚛️ React Components Memory
          </h1>
          <p className="text-xl text-gray-300">
            Lär dig React Components genom att matcha koncept med beskrivningar
          </p>
        </div>
        <ReactComponentsGame />
      </div>
    </div>
  );
}
