import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const handleSend = async () => {
        setMessages([...messages, { text: userInput, sender: 'user' }]);
        const response = await axios.post('http://localhost:8000/chatbot/ask/', { prompt: userInput });
        setMessages([...messages, { text: userInput, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
        setUserInput("");
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="Type your message" 
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;