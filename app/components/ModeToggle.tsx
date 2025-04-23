"use client"
import { useState } from "react";

export default function ModeToggle({ activeMode, setActiveMode }:
{
    activeMode: string,
    setActiveMode: React.Dispatch<React.SetStateAction<string>>
}) {
     // Default: Chat mode

    return (
        <div className="flex items-center space-x-2 p-4 rounded-lg">
            {/*<span className="font-medium text-white">Mode:</span>*/}

            <button
                onClick={() => setActiveMode("chat")}
                className={`px-4 py-1 rounded-l-lg transition-colors ${
                    activeMode === "chat"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
            >
                Chat
            </button>

            <button
                onClick={() => setActiveMode("quiz")}
                className={`px-4 py-1 rounded-r-lg transition-colors ${
                    activeMode === "quiz"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
            >
                Quiz
            </button>
        </div>
    );
}