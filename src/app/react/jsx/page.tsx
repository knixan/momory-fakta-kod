import ReactJSXGame from "@/components/react-jsx";

export default function ReactJSXPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚛️ React JSX Memory
          </h1>
          <p className="text-xl text-gray-300">
            Lär dig JSX genom att matcha koncept med beskrivningar
          </p>
        </div>
        <ReactJSXGame />
      </div>
    </div>
  );
}
