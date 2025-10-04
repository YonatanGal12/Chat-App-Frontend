import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { type ChatMessage, type Groupchat} from "../types/chatTypes";

export function useSocket()
{
    const socket = useRef<SocketIOClient.Socket | null>(null);
    const userRef = useRef<string | null>(null);
    const currentChatNameRef = useRef<string | null>(null);


    const [user, setUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[] | []>([]);
    const [groupchats, setGroupchats] = useState<Groupchat[] | []>([]);
    const [notifications, setNotifications] = useState<string[]>([])
    const [allUsers, setAllUsers] = useState<string[]>([]);

    async function refreshAccessToken() {
        try {
            
            const res = await fetch("http://localhost:3000/auth/refresh", {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({refreshToken: sessionStorage.getItem("refreshToken")}),
            });

            if (!res.ok) 
                throw new Error("Refresh failed");

            const data = await res.json();
            sessionStorage.setItem("accessToken", data.accessToken);
            return data.accessToken;
        } 
        catch (err) {
            console.error("Error refreshing token:", err);
            return null;
        }
    }

    async function connectSocket(token: string) {

        if (socket.current) {
            console.log("here")
            socket.current.removeAllListeners();
            socket.current.disconnect();
        }

        const s = io("http://localhost:3000/chat", {
            auth: { token }
        });

        s.on("connect", () => {
            console.log("Socket connected:", s.id);
        });

        function handleGetUsername(data: string){
            console.log("The user is: " + data)
            setUser(data);
            userRef.current = data;
        }
        s.on("getUsername",handleGetUsername);

        function handleReceiveMessage(data: { username: string; messages: Omit<ChatMessage, "isMine">[] }){
            console.log(userRef.current);

            setMessages(data.messages.map(msg => ({
                ...msg,
                isMine: msg.sender === userRef.current
            })));
        }
        s.on("recieveMessage", handleReceiveMessage)


        function handleGetAllUsernames(data: string[]){
            setAllUsers(data);
        }
        s.on("getAllUsernames", handleGetAllUsernames);


        function handleGetAllGroupchats(data: Groupchat[]){
            setGroupchats(data);
        }
        s.on("userGroupchats", handleGetAllGroupchats);

        function handleGetAllMessagesForChat(data: string[]){

        }
        s.on("allMessagesForChat",handleGetAllMessagesForChat);


        async function handleAuthError(data: {message: string}){
            const newToken = await refreshAccessToken();
            if(!newToken){
                return;
            }
            await connectSocket(newToken);
            s.emit("getUserGroupChats"); 
        }
        s.on('authError', handleAuthError)

        function handleNotification(data: string){
            setNotifications(prev => {
                if(prev.includes(data)) return prev;

                const updated = [...prev, data];
                sessionStorage.setItem("notifications", JSON.stringify(updated));

                return updated;
            })
        }
        s.on('notification', handleNotification)
 
        socket.current = s;
    }

    useEffect(() => {
        const saved = sessionStorage.getItem("notifications");
        if (saved) setNotifications(JSON.parse(saved));
    }, []);
    
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) 
            connectSocket(token);

        return () => {
            socket.current?.removeAllListeners();
            socket.current?.disconnect();
        };
    }, []);


    function handleSendMessage(data: Omit<ChatMessage, 'isMine'>){
        socket.current?.emit("newMessage",data);
        setMessages(prev => [...prev, { ...data, isMine: true }]);
    }

    function fetchAllUsers() {
        socket.current?.emit("getAllUsernames");
    }   

    function newGroupChatCreated(name: string, users: string[]){
        console.log("name: " + name)
        socket.current?.emit("newGCCreated",{ name, users });
    }

    function getAllMessagesFromGroupchat(chatName: string)
    {
        currentChatNameRef.current = chatName;
        setMessages([]); 
        setNotifications(prev => {
            const updated = prev.filter(name => name !== chatName);
            sessionStorage.setItem("notifications",JSON.stringify(updated));
            return updated;
        })
        socket.current?.emit("getAllMessagesFromChat", {chatName: chatName});
    }

    function handleLogout()
    {
        sessionStorage.clear();

        socket.current?.removeAllListeners();
        socket.current?.disconnect();
    }
 

    return {
        handleSendMessage,
        messages,
        setMessages,
        groupchats,
        setGroupchats,
        allUsers,
        fetchAllUsers,
        newGroupChatCreated,
        getAllMessagesFromGroupchat,
        username: userRef.current,
        notifications,
        handleLogout,
        currentChat: currentChatNameRef.current
    }
}