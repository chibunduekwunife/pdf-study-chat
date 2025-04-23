// app/components/quiz/Quiz.tsx
import { useState } from 'react';
import QuizSettings from "@/app/components/quiz/QuizSettings";
import QuizQuestions from "@/app/components/quiz/QuizQuestions";
import QuizResults from "@/app/components/quiz/QuizResults";
import { QuizData } from "@/app/lib/interfaces";

interface QuizProps {
    pdfText: string;
}

export default function Quiz({ pdfText }: QuizProps) {
    const [stage, setStage] = useState<'settings' | 'questions' | 'results'>('settings');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleStartQuiz = async (settings: any) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pdfText: settings.pdfText,
                    quizSettings: settings
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate quiz');
            }

            const data = await response.json();
            setQuizData(data);
            setStage('questions');
        } catch (error) {
            console.error('Failed to generate quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteQuiz = (userAnswers: Record<number, string>) => {
        setAnswers(userAnswers);
        setStage('results');
    };

    return (
        <div className="quiz-container">
            {stage === 'settings' && (
                <QuizSettings
                    pdfText={pdfText}
                    onStart={handleStartQuiz}
                    isLoading={isLoading}
                />
            )}

            {stage === 'questions' && quizData && (
                <QuizQuestions
                    quizData={quizData}
                    onComplete={handleCompleteQuiz}
                />
            )}

            {stage === 'results' && quizData && (
                <QuizResults
                    quizData={quizData}
                    userAnswers={answers}
                    onRestart={() => setStage('settings')}
                />
            )}
        </div>
    );
}