import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { type ChatMessage, type Groupchat, type User } from "../types/chatTypes";

export function useSocket()
{
    const socket = useRef<SocketIOClient.Socket | null>(null);

    useEffect(() => {
        socket.current = io("http://localhost:3000/chat", {
            auth: {
                token: sessionStorage.getItem("accessToken")
            }
        });

        socket.current.on("connect", () => {
            console.log("Connected to server with id:", socket.current?.id);

           /* socket.current?.emit("getUsername", (username: string) => {
                setUser({ username });
            });*/
        });

        return () => {
            socket.current?.disconnect();
        };
    }, []);


    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<ChatMessage[] | []>([]);
    const [groupchats, setGroupchats] = useState<Groupchat[] | []>([]);
    const [allUsers, setAllUsers] = useState<string[]>([]);


    useEffect(() => {

        if(!socket.current)
        {
            console.log("Not connected to server.");
            return;
        }


        function handleReceiveMessage(data: Omit<ChatMessage, 'isMine'>){
            console.log(data);
        }
        socket.current.on("recieveMessage", handleReceiveMessage)


        function handleGetAllUsernames(data: string[]) {
            console.log(data)
            setAllUsers(data);
        }
        socket.current.on("getAllUsernames", handleGetAllUsernames);

        return () => {
            socket.current?.off("recieveMessage");
            socket.current?.off("getAllUsernames");
        };

    }, [])


    function handleSendMessage(data: Omit<ChatMessage, 'isMine'>){
        console.log("here")
        socket.current?.emit("newMessage",data);
    }

    function fetchAllUsers() {
        socket.current?.emit("getAllUsernames");
    }   

    function newGroupChatCreated(name: string, users: string[]){
        socket.current?.emit("newGCCreated",{name,users});
    }


    return {
        handleSendMessage,
        messages,
        setMessages,
        groupchats,
        setGroupchats,
        allUsers,
        fetchAllUsers,
        newGroupChatCreated
    }
}