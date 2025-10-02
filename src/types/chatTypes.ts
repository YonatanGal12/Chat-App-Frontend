

export type ChatMessage = {
    content: string,
    sender: string,
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
    getAllMessagesFromGroupchat: (chatName: string) => void
};

export type ChatContextType = {
    handleSendMessage: (data: Omit<ChatMessage, "isMine">) => void,
    messages: ChatMessage[]
}