type Message = {
  role: string;
  content: string;
}

type Error = {
  message: string;
  status: number;
}

type Props = {
  messages: Message[];
  setMessage: (msg: string) => void;
  setError: (error: Error) => void;
}

//this async function sends a chat conversation to an API endpoint, streams
//the response in real-time, updates the UI with the incoming text chunks, and handles
//errors like authentication failures or server issues

export async function fetchOpenAIResponse({ messages, setMessage, setError }: Props) {
  try {
    const response = await fetch(`/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (response.status === 401) {
      setError({message: 'Please log in to continue.', status: 401});
      return '';
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    // text=stream handling
    const reader = response.body.getReader();
    let chunks = [];

    const decoder = new TextDecoder('utf-8');
    let text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      text = chunks.map(chunk => decoder.decode(chunk)).join('');
      setMessage(text);
    }

    return text;
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    setError({message: 'An error occurred while processing your request. Please try again.', status: 500});
    return '';
  }
}