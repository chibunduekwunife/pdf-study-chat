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