'use client';

import React, {useState} from 'react';
import Chat from './components/chat/Chat';
import PdfUploader from './components/chat/PdfUploader';
import PDFViewer from './components/chat/PDFViewer';
import Image from "next/image";
import ModeToggle from "@/app/components/ModeToggle";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import Quiz from "@/app/components/quiz/Quiz";
import { Message, aiMessage } from "@/app/lib/types";
import { aiAuthor, initialMessage } from "@/app/lib/chat-declarations";

export default function Home() {
    const [pdfText, setPdfText] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    //Toogle Mode States
    const [activeMode, setActiveMode] = useState("chat");

    //Chat States
    const [input, setInput] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([initialMessage]);
    const [aiMessages, setAiMessages] = useState<aiMessage[]>([]);


    return (
        <>
            {/*nav bar*/}
            <header className='absolute flex justify-between items-center p-2.5 w-full
          bg-gradient-to-b from-blue-950 to-[#040d17]'>
                {/*logo*/}
                <div className="flex items-center md:flex gap-3">
                    <Image
                        src="/logo2.png"
                        alt="Study Sage logo"
                        width="50"
                        height="25"
                        className="rounded-lg cursor-pointer"
                    />
                    <h1 className='hidden md:block text-white text-3xl font-bold'>
                        Study
                        <span className='text-blue-300'>Sage</span>
                    </h1>
                    <ModeToggle
                        activeMode={activeMode}
                        setActiveMode={setActiveMode}
                    />
                </div>

                {/*clerk sign in/sign up buttons*/}
                <div className="flex space-x-4 justify-center items-center">
                    <SignedIn>
                        <UserButton appearance={{baseTheme: dark}} afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button
                                className="text-blue-300 border border-blue-500 hover:text-white hover:bg-[#2d06ff4a] py-2 px-4 rounded-3xl transition duration-300 ease-in-out">Sign
                                in
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button
                                className="bg-gray-200 py-2 px-4 rounded-3xl transition duration-300 ease-in-out">Sign
                                up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </header>

            {/*Start of App*/}
            <main className="App">
                <div className='container'>
                    <div className="flex flex-col md:flex-row w-full h-full gap-8 px-4 md:p-0">
                        <div className="relative w-full md:w-1/2">
                            {pdfText
                                ? <PDFViewer file={selectedFile as File}/>
                                : <PdfUploader
                                    setPdfText={setPdfText}
                                    setSelectedFile={setSelectedFile}/>
                            }
                        </div>
                        <div className="h-full md:h-auto w-full md:w-1/2">
                            {
                                activeMode === "chat"
                                    ? <Chat
                                        pdfText={pdfText}
                                        input={input}
                                        setInput={setInput}
                                        chatMessages={chatMessages}
                                        setChatMessages={setChatMessages}
                                        aiMessages={aiMessages}
                                        setAiMessages={setAiMessages}
                                        aiAuthor={aiAuthor}/>
                                    : <Quiz/>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}