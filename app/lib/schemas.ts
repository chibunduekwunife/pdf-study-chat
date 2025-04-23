// app/lib/quiz-schema.ts
import { z } from "zod";

export const QuizQuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()).length(4), // For multiple choice
    correctAnswer: z.string(),
    explanation: z.string().optional(),
});

export const QuizSchema = z.object({
    title: z.string(),
    questions: z.array(QuizQuestionSchema),
    difficulty: z.enum(["elementary", "intermediate", "advanced", "sage"]),
    style: z.enum(["flashcards", "multiple-choice", "short-answer"]),
});