export interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
}

export interface LoginProps {
    onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

export interface ChatProps {
    idInstance: string;
    apiTokenInstance: string;
}

export interface MessageProps {
    text: string;
    sender: 'me' | 'them';
}