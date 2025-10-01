

export type ChatMessage = {
    content: string,
    sender: string,
    isMine?: true
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