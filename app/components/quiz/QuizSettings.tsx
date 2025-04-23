import { useState } from 'react';
import { QuizSettingsProps } from "@/app/lib/types";

export default function QuizSettings({ onStart, isLoading, pdfText }: QuizSettingsProps) {
    const [quizStyle, setQuizStyle] = useState('multiple-choice');
    const [quizLength, setQuizLength] = useState(5);
    const [pageRange, setPageRange] = useState([1, 10]);
    const [difficulty, setDifficulty] = useState('elementary');

    const handleStartQuiz = () => {
        if (!pdfText) {
            alert('Please upload a PDF first!');
            return;
        }

        onStart({
            pdfText,
            quizStyle,
            quizLength,
            pageRange,
            difficulty
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Quiz Settings</h2>
            <div className={`p-6 max-w-md mx-auto bg-white rounded-lg shadow-md ${!pdfText ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="text-black space-y-6">
                    {/* Quiz Style */}
                    <div>
                        <label className="block mb-2 font-medium">Quiz Style:</label>
                        <select
                            value={quizStyle}
                            onChange={(e) => setQuizStyle(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            disabled={!pdfText}
                        >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="short-answer">Short Answer</option>
                            <option value="flashcards" disabled>Flashcards</option>
                        </select>
                    </div>

                    {/* Quiz Length */}
                    <div>
                        <label className="block mb-2 font-medium">Quiz Length:</label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={quizLength}
                            onChange={(e) => setQuizLength(parseInt(e.target.value))}
                            className="w-full p-2 border rounded-md"
                            disabled={!pdfText}
                        />
                    </div>

                    {/* Page Range */}
                    <div>
                        <label className="block mb-2 font-medium">Page Range:</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                min="1"
                                value={pageRange[0]}
                                onChange={(e) => setPageRange([parseInt(e.target.value), pageRange[1]])}
                                className="w-full p-2 border rounded-md"
                                disabled={!pdfText}
                            />
                            <span className="flex items-center">to</span>
                            <input
                                type="number"
                                min={pageRange[0] + 1}
                                value={pageRange[1]}
                                onChange={(e) => setPageRange([pageRange[0], parseInt(e.target.value)])}
                                className="w-full p-2 border rounded-md"
                                disabled={!pdfText}
                            />
                        </div>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                        <label className="block mb-2 font-medium">Difficulty Level:</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            disabled={!pdfText}
                        >
                            <option value="elementary">Elementary</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="sage">Sage Level</option>
                        </select>
                    </div>

                    {/* Start Quiz Button */}
                    <button
                        onClick={handleStartQuiz}
                        disabled={!pdfText || isLoading}
                        className={`w-full py-2 px-4 rounded-md font-medium ${
                            pdfText
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isLoading ? 'Generating Quiz...' : 'Start Quiz'}

                    </button>
                </div>
            </div>
        </div>
    );
}