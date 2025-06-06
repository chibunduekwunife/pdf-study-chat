'use client';

import React, {useState, useEffect} from 'react';
import Chat from './components/chat/Chat';
import PdfUploader from './components/chat/PdfUploader';
import PDFViewer from './components/chat/PDFViewer';
import Quiz from "@/app/components/quiz/Quiz";
import { Message, aiMessage } from "@/app/lib/types";
import { aiAuthor, initialMessage } from "@/app/lib/chat-declarations";
import Header from '@/app/components/Header'

export default function Home() {
    const [pdfText, setPdfText] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    //Toogle Mode States
    const [activeMode, setActiveMode] = useState("chat");

    //Chat States
    const [input, setInput] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([initialMessage]);
    const [aiMessages, setAiMessages] = useState<aiMessage[]>([]);

    // save chat history to localStorage or a database:
    // useEffect(() => {
    //     const savedChat = localStorage.getItem('pdfChatHistory');
    //     if (savedChat) {
    //         setChatMessages(JSON.parse(savedChat));
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     if (chatMessages.length > 1) { // Don't save initial message
    //         localStorage.setItem('pdfChatHistory', JSON.stringify(chatMessages));
    //     }
    // }, [chatMessages]);

    // remove pdf
    const handleRemovePDF = () => {
        setPdfText('');
        setSelectedFile(undefined);

        //reset chat and AI messages
        setChatMessages([initialMessage]);
        setAiMessages([]);
    };


    return (
        <>
            {/*nav bar*/}
            <Header activeMode={activeMode} setActiveMode={setActiveMode}/>

            {/*Start of App*/}
            <main className="App">
                <div className='container'>
                    <div className="flex flex-col md:flex-row w-full h-full gap-8 px-4 md:p-0">
                        <div className="relative w-full md:w-1/2">
                            {pdfText
                                ? <PDFViewer
                                    file={selectedFile as File}
                                    onRemove={handleRemovePDF}/>
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
                                    : <Quiz pdfText={pdfText}/>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}