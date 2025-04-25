// app/components/quiz/QuizResults.tsx
export default function QuizResults({ quizData, userAnswers, onRestart }: {
    quizData: any,
    userAnswers: Record<number, string>,
    onRestart: () => void
}) {
    const score = Object.entries(userAnswers).reduce((acc, [index, answer]) => {
        return acc + (answer === quizData.questions[Number(index)].correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / quizData.questions.length) * 100);

    return (
        <div className="quiz-results">
            <h2>Quiz Complete!</h2>
            <div className="score">
                You scored {score} out of {quizData.questions.length} ({percentage}%)
            </div>

            <div className="feedback">
                {quizData.questions.map((q: any, i: number) => (
                    <div key={i} className={`question-feedback ${
                        userAnswers[i] === q.correctAnswer ? 'correct' : 'incorrect'
                    }`}>
                        <p><strong>Q:</strong> {q.question}</p>
                        <p><strong>Your answer:</strong> {userAnswers[i] || 'No answer'}</p>
                        <p><strong>Correct answer:</strong> {q.correctAnswer}</p>
                        {q.explanation && <p><strong>Explanation:</strong> {q.explanation}</p>}
                    </div>
                ))}
            </div>

            <button onClick={onRestart} className="restart-btn">
                Start New Quiz
            </button>
        </div>
    );
}