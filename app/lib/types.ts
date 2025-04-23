import React from "react";

export type Props = {
    setPdfText: React.Dispatch<React.SetStateAction<string>>;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

export type ChatProps = {
    pdfText: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    chatMessages: Message[];
    setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    aiMessages: aiMessage[];
    setAiMessages: React.Dispatch<React.SetStateAction<aiMessage[]>>;
    aiAuthor: {
        username: string;
        id: number;
        avatarUrl: string;
    }
};

export type Message = {
    author: {
        username: string;
        id: number;
        avatarUrl: string;
    }
    text: string;
    type: string;
    timestamp: number;
}

export type aiMessage = {
    role: string;
    content: string;
}

// Type for quiz questions

export type QuizData = {
    title: string;
    questions: Array<{
        question: string;
        options?: string[];
        correctAnswer: string;
        explanation?: string;
    }>;
};

// quiz settings

export type QuizSettingsProps = {
    onStart: (settings: any) => void;
    isLoading: boolean;
    pdfText: string;
};