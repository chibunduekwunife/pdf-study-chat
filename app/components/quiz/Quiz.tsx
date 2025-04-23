import QuizSettings from "@/app/components/quiz/QuizSettings";

export default function Quiz () {
    return (
        <div
            className="flex flex-col overflow-auto box-border text-black
            items-center justify-center w-full h-full gap-y-5"
            style={{ height: 'calc(100vh - 230px)' }}>
            <h1 className='text-2xl font-bold text-white'>Quiz Generator</h1>
            <QuizSettings />
        </div>
    )
}
