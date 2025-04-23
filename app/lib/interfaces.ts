export interface PDFViewerProps {
    file: File;
    onRemove: () => void; // Add this prop
}

export interface QuizQuestion {
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
}

export interface QuizData {
    title: string;
    questions: QuizQuestion[];
    style: 'flashcards' | 'multiple-choice' | 'short-answer';
}

export interface QuizQuestionsProps {
    quizData: QuizData;
    onComplete: (answers: Record<number, string>) => void;
}
