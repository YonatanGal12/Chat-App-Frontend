export type User = {
    username: string,
}

export type ChatMessage = {
    content: string,
    sender: string,
    isMine?: true
}

export type Groupchat = {
    groupchatName: string,
    sentMessages: ChatMessage[],
    members?: User[]
}