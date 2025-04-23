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
        <div className="quiz-questions">
            <div className="progress">
                Question {currentIndex + 1}/{quizData.questions.length}
            </div>

            <h3 className="question-text">{currentQuestion.question}</h3>

            {quizData.style === 'multiple-choice' ? (
                <div className="options">
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