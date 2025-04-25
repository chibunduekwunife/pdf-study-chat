export interface PDFViewerProps {
    file: File;
    onRemove: () => void; // Add this prop
}

export interface QuizData {
    questions: QuizQuestion[];
    style: string;
}

export interface QuizQuestion {
    question: string;
    options?: string[]; // Only for multiple-choice
    correctAnswer: string;
    explanation?: string;
}

export interface QuizSettingsProps {
    pdfText: string;
    onStart: (settings: any) => void;
    isLoading: boolean;
}

export interface QuizQuestionsProps {
    quizData: QuizData;
    onComplete: (answers: Record<number, string>) => void;
    onEndQuiz: () => void
}
