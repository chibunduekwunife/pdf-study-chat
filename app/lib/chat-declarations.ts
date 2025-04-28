export const aiAuthor = {
    username: 'Study Sage',
    id: 2,
    avatarUrl: '/owl.png',
};

export const initialMessage = {
    author: aiAuthor,
    text: 'Hello, I am Study Sage, your Text Chatter & Tutor. ' +
        'To start a conversation, please upload a PDF file.',
    type: 'text',
    timestamp: +new Date(),
};

export const initialAiMessage = {
  role: 'assistant',
  content: 'Hello, I am Study Sage, your Text Chatter & Tutor. How can I help you?',
};

export const userAuthor = {
    username: 'User',
    id: 1,
    avatarUrl: '/user.png',
};

export const MAX_MESSAGES_PER_DAY = 100;