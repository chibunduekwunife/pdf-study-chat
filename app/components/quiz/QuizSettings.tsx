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
        <div className="max-w-2xl mx-auto text-gray-600">
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Quiz Settings</h2>
            <div className={`p-8 bg-white rounded-xl shadow-lg transition-all duration-200 ${!pdfText ? 'opacity-60' : ''}`}>
                <div className="space-y-6">
                    {/* Quiz Style */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Style:</label>
                        <select
                            value={quizStyle}
                            onChange={(e) => setQuizStyle(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                !pdfText ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                            }`}
                            disabled={!pdfText}
                        >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="short-answer">Short Answer</option>
                            <option value="flashcards" disabled>Flashcards</option>
                        </select>
                    </div>

                    {/* Quiz Length */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Length:</label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={quizLength}
                            onChange={(e) => setQuizLength(parseInt(e.target.value))}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                !pdfText ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                            }`}
                            disabled={!pdfText}
                        />
                    </div>

                    {/* Page Range */}
                    {/*<div>*/}
                    {/*    <label className="block text-sm font-semibold text-gray-700 mb-2">Page Range:</label>*/}
                    {/*    <div className="flex items-center space-x-3">*/}
                    {/*        <input*/}
                    {/*            type="number"*/}
                    {/*            min="1"*/}
                    {/*            value={pageRange[0]}*/}
                    {/*            onChange={(e) => setPageRange([parseInt(e.target.value), pageRange[1]])}*/}
                    {/*            className={`flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${*/}
                    {/*                !pdfText ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'*/}
                    {/*            }`}*/}
                    {/*            disabled={!pdfText}*/}
                    {/*        />*/}
                    {/*        <span className="text-gray-500 font-medium">to</span>*/}
                    {/*        <input*/}
                    {/*            type="number"*/}
                    {/*            min={pageRange[0] + 1}*/}
                    {/*            value={pageRange[1]}*/}
                    {/*            onChange={(e) => setPageRange([pageRange[0], parseInt(e.target.value)])}*/}
                    {/*            className={`flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${*/}
                    {/*                !pdfText ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'*/}
                    {/*            }`}*/}
                    {/*            disabled={!pdfText}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Difficulty Level */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level:</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                !pdfText ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                            }`}
                            disabled={!pdfText}
                        >
                            <option value="elementary">Rookie</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="sage">Professional</option>
                        </select>
                    </div>

                    {/* Start Quiz Button */}
                    <button
                        onClick={handleStartQuiz}
                        disabled={!pdfText || isLoading}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                            !pdfText || isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Quiz...
          </span>
                        ) : (
                            'Start Quiz'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}