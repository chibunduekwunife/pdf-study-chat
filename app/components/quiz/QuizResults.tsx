import {useRef} from "react";

export default function QuizResults({ quizData, userAnswers, onRestart }: {
    quizData: any,
    userAnswers: Record<number, string>,
    onRestart: () => void
}) {
    const score = Object.entries(userAnswers).reduce((acc, [index, answer]) => {
        return acc + (answer === quizData.questions[Number(index)].correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / quizData.questions.length) * 100);
    const chatContainer = useRef<HTMLDivElement>(null);

    return (
        <div className="
            flex flex-col h-screen md:h-[calc(100vh-10rem)] bg-gray-900"> {/* Outer container */}
            {/* Scrollable area */}
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">Quiz Complete!</h2>

                    <div className={`text-center text-2xl font-semibold mb-8 ${
                        percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-400' : 'text-red-500'
                    }`}>
                        You scored {score} out of {quizData.questions.length} ({percentage}%)
                    </div>

                    <div className="space-y-6 mb-8 text-left">
                        {quizData.questions.map((q: any, i: number) => (
                            <div
                                key={i}
                                className={`p-4 rounded-lg border ${
                                    userAnswers[i] === q.correctAnswer
                                        ? 'bg-gray-800 border-green-500'
                                        : 'bg-gray-800 border-red-500'
                                }`}
                            >
                                <p className="font-bold text-lg mb-2 text-gray-100">Q: {q.question}</p>

                                <p className={`mb-1 ${
                                    userAnswers[i] === q.correctAnswer
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                }`}>
                                    <span className="font-semibold">Your answer:</span> {userAnswers[i] || 'No answer'}
                                </p>

                                <p className="text-green-400 mb-1">
                                    <span className="font-semibold">Correct answer:</span> {q.correctAnswer}
                                </p>

                                {q.explanation && (
                                    <p className="mt-2 text-gray-300 italic">
                                        <span className="font-semibold">Explanation:</span> {q.explanation}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky button at bottom */}
            <div className="shrink-0 sticky bottom-0 bg-gray-900 py-4 px-4 sm:px-6 border-t border-gray-700">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition duration-200"
                    >
                        Start New Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}