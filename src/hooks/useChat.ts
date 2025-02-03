import { useState, useEffect } from "react";
import axios from "axios";
import { Message as MessageType } from "../types";

const useChat = (idInstance: string, apiTokenInstance: string) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [recipient, setRecipient] = useState("79124990491");

    const sendMessage = async () => {
        const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
        const data = { chatId: `${recipient}@c.us`, message: newMessage };

        try {
            await axios.post(url, data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: newMessage, sender: "me", id: Date.now() },
            ]);
            setNewMessage("");
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error);
            setMessages([
                {
                    text: newMessage
                        ? "Ошибка: авторизационные данные не корректны"
                        : "Ошибка: нет текста сообщения",
                    sender: "me",
                    id: Date.now(),
                },
            ]);
        }
    };

    useEffect(() => {
        let isActive = true;

        const receiveMessages = async () => {
            if (!isActive) return;

            try {
                const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
                const response = await axios.get(url);

                if (response.data?.receiptId) {
                    const { body, receiptId } = response.data;

                    if (
                        body.typeWebhook === "incomingMessageReceived" &&
                        body.messageData.typeMessage === "textMessage"
                    ) {
                        const message = body.messageData.textMessageData.textMessage;
                        const senderId = body.senderData.chatId;

                        if (senderId === `${recipient}@c.us`) {
                            setMessages((prevMessages) =>
                                prevMessages.some((msg) => msg.id === receiptId)
                                    ? prevMessages
                                    : [
                                        ...prevMessages,
                                        { text: message, sender: "them", id: receiptId },
                                    ]
                            );
                        }
                    }

                    await axios.delete(
                        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
                    );
                }
            } catch (error) {
                console.error("Ошибка получения сообщений:", error);
            }

            setTimeout(receiveMessages, 1000);
        };

        receiveMessages().catch((error) => console.log(`Ошибка ${error.message}`));

        return () => {
            isActive = false;
        };
    }, [recipient]); // Перезапуск при изменении получателя

    return {
        messages,
        newMessage,
        recipient,
        setNewMessage,
        setRecipient,
        sendMessage,
    };
};

export default useChat;
