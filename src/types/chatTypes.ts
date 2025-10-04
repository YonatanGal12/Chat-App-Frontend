

export type ChatMessage = {
    id?: number,
    content: string,
    sender: string,
    sentAt?: string,
    isMine?: boolean
}

export type Groupchat = {
    chatName: string,
    sentMessages?: ChatMessage[],
    members: string[]
}

export type AllUsersContextType = {
    allUsers: string[] | null;
    fetchAllUsers: () => void;
    newGroupChatCreated: (name: string, users: string[]) => void,
    groupchats: Groupchat[],
    getAllMessagesFromGroupchat: (chatName: string) => void,
    username: string | null,
    notifications: string[],
    handleLogout: () => void
};

export type ChatContextType = {
    handleSendMessage: (data: Omit<ChatMessage, "isMine">) => void,
    messages: ChatMessage[]
}