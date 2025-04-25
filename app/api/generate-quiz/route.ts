import {openai} from "@/app/lib/ai-declarations"
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
                    content: `You are a quiz generator. 
                    Create a unique, high-quality quiz based on the provided text with these strict guidelines:
                    
          1. QUIZ FORMATTING:
          - Style: ${quizSettings.quizStyle}
          - Number of questions: ${quizSettings.quizLength}
          - Difficulty: ${quizSettings.difficulty}
          
          1. QUESTION FORMATTING:
            - Questions must be clear, concise, and free from URLs or external links
            - Avoid opinion-based questions unless specified
            - Phrase questions as complete sentences ending with "?"

          2. ANSWER FORMATTING (for multiple-choice):
            - Provide ONLY the answer text without:
              * Prefix letters (A, B, C, etc.)
              * Numbering (1., 2., etc.)
              * Bullet points
            - All options should be parallel in structure and length
            - Answers must be free from URLs or external links
            - Include exactly 4 options unless specified otherwise
            - Make incorrect options plausible but clearly wrong
          
          3. Return the quiz in JSON format with this structure:
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
          }
          
            - No additional formatting or Markdown in the JSON
            - No preamble or conclusion text - just pure JSON`
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