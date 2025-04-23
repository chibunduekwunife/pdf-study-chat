
import { QuizSchema } from "@/app/lib/schemas";
import { openai } from "@/app/lib/ai-declarations"
// import { pdfToText } from "@/lib/pdf-utils";


export async function POST(request: Request) {
    try {
        const { pdfText, quizSettings } = await request.json();

        // Validate input
        if (!pdfText) {
            return new Response("PDF text is required", { status: 400 });
        }

        // Generate prompt based on quiz settings
        const prompt = `
    Generate a ${quizSettings.quizLength}-question ${quizSettings.quizStyle} quiz 
    at ${quizSettings.difficulty} difficulty level based on the following document:
    
    DOCUMENT:
    ${pdfText.substring(0, 3000)} // Limit to first 3000 chars for demo
    
    INSTRUCTIONS:
    1. Format as JSON matching this schema: ${JSON.stringify(QuizSchema.shape)}
    2. For multiple-choice: provide 4 options, one correct answer
    3. For flashcards: question on front, answer on back
    4. For short-answer: provide a sample correct answer
    5. Difficulty affects question complexity
    `;

        const response = await openai.chat.completions.create({
            model: "mistralai/mixtral-8x7b-instruct-v0.1",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You are a quiz generation expert. Create educational quizzes from documents.",
                },
                { role: "user", content: prompt },
            ],
        });

        const quizData = JSON.parse(<string>response.choices[0].message.content);
        const validatedQuiz = QuizSchema.parse(quizData);

        return new Response(JSON.stringify(validatedQuiz), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Quiz generation error:", error);
        return new Response("Failed to generate quiz", { status: 500 });
    }
}