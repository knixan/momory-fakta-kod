"use client";

import MemoryGame from "../../../components/ts-syntax-grund";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            💻 TypeScript Syntax Memory 💻
          </h1>
          <p className="text-gray-200 text-lg">
            Matcha TypeScript-koncept med deras kodexempel
          </p>
        </header>

        <MemoryGame />
      </div>
    </div>
  );
}