import { useState, useRef, useEffect } from 'react';
import {
    QuizQuestionsProps,
    QuizQuestion,
    QuizData
} from "@/app/lib/interfaces";

export default function QuizQuestions({ quizData, onComplete, onEndQuiz }: QuizQuestionsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToTop();
    }, [currentIndex]);

    const handleAnswer = (answer: string) => {
        const newAnswers = { ...answers, [currentIndex]: answer };
        setAnswers(newAnswers);

        if (currentIndex < quizData.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete(newAnswers);
        }
    };

    const currentQuestion = quizData.questions[currentIndex];
    const currentAnswer = answers[currentIndex];

    return (
        <div className="flex flex-col h-full">
            {/* Progress indicator */}
            <div className="w-full flex justify-between items-center p-4 bg-[#001428] sticky top-0 z-10">
                <span className="text-blue-300 font-medium">
                    Question {currentIndex + 1} of {quizData.questions.length}
                </span>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mx-4">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex) / (quizData.questions.length - 1)) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Questions container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-4 bg-[#001428]"
            >
                <div className="max-w-2xl mx-auto">
                    {/* Question */}
                    <div className="w-full bg-gray-800/50 rounded-xl p-6 shadow-lg mb-4">
                        <h2 className="text-xl font-bold mb-6 text-center">
                            {currentQuestion.question}
                        </h2>

                        {/* Answer options */}
                        {quizData.style === 'multiple-choice' ? (
                            <div className="grid gap-3 w-full">
                                {currentQuestion.options?.map((option: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(option)}
                                        className={`w-full p-4 text-left rounded-lg transition-all duration-200 border
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        ${
                                            currentAnswer === option
                                                ? 'bg-blue-600 border-blue-400'
                                                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-blue-400'
                                        }`}
                                    >
                                        <span className="font-medium mr-2 text-blue-300">{String.fromCharCode(65 + i)}.</span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <textarea
                                    placeholder="Type your answer here..."
                                    onChange={(e) => setAnswers(prev => ({...prev, [currentIndex]: e.target.value}))}
                                    value={currentAnswer || ''}
                                    className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    placeholder-gray-400 resize-none min-h-[120px]"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="w-full p-4 bg-[#001428] sticky bottom-0">
                <div className="max-w-2xl mx-auto flex gap-4 justify-between">
                    <button
                        onClick={onEndQuiz}
                        className="py-2 px-6 bg-red-800 hover:bg-red-900 rounded-lg transition-colors"
                    >
                        End Quiz
                    </button>

                    {currentIndex > 0 && (
                        <button
                            onClick={() => setCurrentIndex(prev => prev - 1)}
                            className="py-2 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            Previous
                        </button>
                    )}

                    <div className="flex-1"></div>

                    {currentIndex < quizData.questions.length - 1 ? (
                        <button
                            onClick={() => handleAnswer(currentAnswer || '')}
                            disabled={!currentAnswer}
                            className={`py-2 px-6 rounded-lg transition-colors
                            ${currentAnswer
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                        >
                            Next Question
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAnswer(currentAnswer || '')}
                            disabled={!currentAnswer}
                            className={`py-2 px-6 rounded-lg transition-colors
                            ${currentAnswer
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                        >
                            Finish Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}