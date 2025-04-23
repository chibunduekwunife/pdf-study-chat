import { useState } from 'react';

export default function QuizSettings() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [quizStyle, setQuizStyle] = useState('flashcards');
    const [quizLength, setQuizLength] = useState(5);
    const [pageRange, setPageRange] = useState([1, 10]);
    const [difficulty, setDifficulty] = useState('elementary');

    const handleStartQuiz = () => {
        if (!fileUploaded) {
            alert('Please upload a file first!');
            return;
        }
        // Start quiz logic here
        console.log({ quizStyle, quizLength, pageRange, difficulty });
    };

    return (
        <div className={`p-6 max-w-md mx-auto bg-white rounded-lg shadow-md ${!fileUploaded ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold mb-4">Quiz Settings</h2>

            {/*<div className="mb-6">*/}
            {/*    <label className="block mb-2 font-medium">Upload File</label>*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        onChange={(e) => setFileUploaded(e.target.files.length > 0)}*/}
            {/*        className="block w-full text-sm text-gray-500*/}
            {/*file:mr-4 file:py-2 file:px-4*/}
            {/*file:rounded-md file:border-0*/}
            {/*file:text-sm file:font-semibold*/}
            {/*file:bg-blue-50 file:text-blue-700*/}
            {/*hover:file:bg-blue-100"*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="space-y-4">
                {/* Quiz Style */}
                <div>
                    <label className="block mb-2 font-medium">Quiz Style:</label>
                    <select
                        value={quizStyle}
                        onChange={(e) => setQuizStyle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        disabled={!fileUploaded}
                    >
                        <option value="flashcards">Flashcards</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="short-answer">Short Answer</option>
                    </select>
                </div>

                {/* Quiz Length */}
                <div>
                    <label className="block mb-2 font-medium">Quiz Length:</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={quizLength}
                        onChange={(e) => setQuizLength(parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                        disabled={!fileUploaded}
                    />
                </div>

                {/* Page Range */}
                <div>
                    <label className="block mb-2 font-medium">Page Range:</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            min="1"
                            value={pageRange[0]}
                            onChange={(e) => setPageRange([parseInt(e.target.value), pageRange[1]])}
                            className="w-full p-2 border rounded-md"
                            disabled={!fileUploaded}
                        />
                        <span className="flex items-center">to</span>
                        <input
                            type="number"
                            min={pageRange[0] + 1}
                            value={pageRange[1]}
                            onChange={(e) => setPageRange([pageRange[0], parseInt(e.target.value)])}
                            className="w-full p-2 border rounded-md"
                            disabled={!fileUploaded}
                        />
                    </div>
                </div>

                {/* Difficulty Level */}
                <div>
                    <label className="block mb-2 font-medium">Difficulty Level:</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        disabled={!fileUploaded}
                    >
                        <option value="elementary">Elementary</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="sage">Sage Level</option>
                    </select>
                </div>

                {/* Start Quiz Button */}
                <button
                    onClick={handleStartQuiz}
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                        fileUploaded
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}