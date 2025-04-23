// app/components/quiz/QuizQuestions.tsx
import { useState } from 'react';
import {
    QuizQuestionsProps,
    QuizQuestion,
    QuizData
} from "@/app/lib/interfaces";

export default function QuizQuestions({ quizData, onComplete }: QuizQuestionsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

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

    return (
        <div className="flex flex-col items-center justify-center bg-[#001428] p-5 gap-4
        h-full overflow-y-scroll">
            <div className='flex flex-col items-center'>
                <div className="text-blue-300">
                    Question {currentIndex + 1}/{quizData.questions.length}
                </div>

                <h2 className="font-bold text-lg w-[70%]">{currentQuestion.question}</h2>
            </div>

            {quizData.style === 'multiple-choice' ? (
                <>
                    <div className="flex flex-col gap-2 items-start">
                        {currentQuestion.options?.map((option: string, i: number) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option)}
                                className="option"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button>
                        Submit
                    </button>
                </>
            ) : (
                <div className="short-answer">
          <textarea
              placeholder="Your answer..."
              onChange={(e) => setAnswers(prev => ({...prev, [currentIndex]: e.target.value}))}
              value={answers[currentIndex] || ''}
          />
                    <button
                        onClick={() => handleAnswer(answers[currentIndex] || '')}
                        disabled={!answers[currentIndex]}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}