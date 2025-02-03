import React from 'react';
import Message from './Message';
import useChat from '../hooks/useChat';
import { ChatProps } from '../types';

const Chat: React.FC<ChatProps> = ({ idInstance, apiTokenInstance }) => {
    const { messages, newMessage, recipient, setNewMessage, setRecipient, sendMessage } = useChat(idInstance, apiTokenInstance);

    return (
        <div className="chat-container">
            <div className="chat-header">{recipient}</div>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
            </div>
            <div className="chat-input">
                <input
                    className="chat-phone-input"
                    type="text"
                    placeholder="Введите номер телефона получателя.."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <div className="chat-text-input">
                    <input
                        type="text"
                        placeholder="Введите свое сообщение.."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
