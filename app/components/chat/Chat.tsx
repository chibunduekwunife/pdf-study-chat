'use client';

import { useRef, useEffect } from 'react';
import { fetchOpenAIResponse } from '../../utils/fetchOpenAIResponse';
import Image from 'next/image';
import MarkdownRenderer from './MarkdownRenderer';
import { useUser, useClerk } from '@clerk/nextjs';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { ChatProps } from '../../lib/types';
import { MAX_MESSAGES_PER_DAY, userAuthor } from '../../lib/chat-declarations';

const Chat: React.FC<ChatProps> = ({
                                       pdfText,
                                       input,
                                       setInput,
                                       chatMessages,
                                       setChatMessages,
                                       aiMessages,
                                       setAiMessages,
                                       aiAuthor
                                   }) => {
    const chatContainer = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const { openSignUp } = useClerk();

    const scrollToBottom = () => {
        if (chatContainer.current) {
            chatContainer.current.scrollTo({
                top: chatContainer.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleOnSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            openSignUp();
            return;
        }

        const message = e.currentTarget['input-field'].value.trim();
        if (!message) return;

        setInput('');

        const currentDate = new Date().toISOString().slice(0, 10);
        const storedDate = localStorage.getItem('lastMessageDate');
        const messageCount = parseInt(localStorage.getItem('messageCount') || '0');

        if (storedDate !== currentDate) {
            localStorage.setItem('lastMessageDate', currentDate);
            localStorage.setItem('messageCount', '0');
        } else if (messageCount >= MAX_MESSAGES_PER_DAY) {
            alert('Sorry, you have reached the maximum number of messages for today.');
            return;
        }

        // Add user message
        const userMessage = {
            author: userAuthor,
            text: message,
            type: 'text',
            timestamp: +new Date()
        };

        // Add temporary AI loading message
        const aiLoadingMessage = {
            author: aiAuthor,
            text: 'Thinking...',
            type: 'text',
            timestamp: +new Date()
        };

        setChatMessages(messages => [...messages, userMessage, aiLoadingMessage]);

        const messageToSend = [...aiMessages, {
            role: 'user',
            content: `ROLE: You are an expert at analyzing text and answering questions on it.
-------
TASK:
1. The user will provide a text from a PDF. Take the personality of the character that
would be the most fitting to be an expert on the material of the text.
(e.g. if you get a text about chemistry, your personality should be that of a chemistry teacher.)
2. Answer to the user's questions based on it. Your replies are short (less than 150 characters) and to the point, unless
specified otherwise.
-------
PDF TEXT: ${pdfText}
-------
USER MESSAGE: ${message}`
        }];

        try {
            const response = await fetchOpenAIResponse({
                messages: messageToSend,
                setMessage: (msg) => setChatMessages(messages =>
                    [...messages.slice(0, -1), {
                        author: aiAuthor,
                        text: msg,
                        type: 'text',
                        timestamp: +new Date()
                    }]
                ),
                setError: (error) => {
                    if (error.status === 401) {
                        openSignUp();
                    }
                }
            });

            setAiMessages(messages => [...messages,
                { role: 'user', content: message },
                { role: 'assistant', content: response }
            ]);
            localStorage.setItem('messageCount', (messageCount + 1).toString());
        } catch (error) {
            setChatMessages(messages => [...messages.slice(0, -1)]);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat messages container */}
            <div
                ref={chatContainer}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            >
                {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p className="text-lg">Ask questions about your PDF</p>
                        <p className="text-sm mt-2">Upload a PDF to start chatting</p>
                    </div>
                ) : (
                    chatMessages.map((m, index) => (
                        <div
                            key={index}
                            className={`flex ${m.author.username === 'User' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-3xl ${m.author.username === 'User' ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                    <Image
                                        className="rounded-full"
                                        alt="avatar"
                                        src={m.author.avatarUrl}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                {/*AI text box*/}
                                <div
                                    className={`mx-2 p-3 rounded-lg text-left ${m.author.username === 'User'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-white'}`}
                                >
                                    <MarkdownRenderer>{m.text}</MarkdownRenderer>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input form */}
            <form
                onSubmit={handleOnSendMessage}
                className="p-4"
            >
                <div className="flex items-center">
                    <input
                        name="input-field"
                        type="text"
                        placeholder="Ask me anything..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={!pdfText}
                    />
                    <button
                        type="submit"
                        disabled={!input || !pdfText}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowUpIcon className="h-5 w-5" />
                    </button>
                </div>
                {!pdfText && (
                    <p className="mt-2 text-sm text-gray-400">
                        Upload a PDF to enable chat
                    </p>
                )}
            </form>
        </div>
    );
};

export default Chat;