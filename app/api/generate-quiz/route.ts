import { openai } from "@/app/lib/ai-declarations"
import {NextResponse} from 'next/server';


export async function POST(request: Request) {
    try {
        const {pdfText, quizSettings} = await request.json();

        // Generate quiz using OpenAI
        const response = await openai.chat.completions.create({
            model: "mistralai/mixtral-8x7b-instruct-v0.1",
            messages: [
                {
                    role: 'system',
                    content: `You are a quiz generator. Create a quiz based on the provided text with the following settings:
          - Style: ${quizSettings.quizStyle}
          - Number of questions: ${quizSettings.quizLength}
          - Difficulty: ${quizSettings.difficulty}
          
          Return the quiz in JSON format with this structure:
          {
            "questions": [
              {
                "question": "question text",
                "options": ["option1", "option2", ...], // only for multiple-choice
                "correctAnswer": "correct answer",
                "explanation": "optional explanation"
              },
              ...
            ],
            "style": "quiz style"
          }`
                },
                {
                    role: 'user',
                    content: pdfText
                }
            ],
            temperature: 0.7,
        });

        const quizData = JSON.parse(response.choices[0].message.content || '{}');
        return NextResponse.json(quizData);
    } catch (error) {
        console.error('Error generating quiz:', error);
        return NextResponse.json(
            {error: 'Failed to generate quiz'},
            {status: 500}
        );
    }
}