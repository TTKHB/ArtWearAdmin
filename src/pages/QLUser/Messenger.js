import { createContext, useReducer, useEffect, useState, useContext, useRef } from 'react'
import "./messenger.css"
import Conversation from "../../components/Conservation/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { useLogin } from '../../Context/AuthContext';
import axios from "axios";
import { io } from "socket.io-client"
export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { profile } = useLogin();
    console.log(profile)
    const scrollRef = useRef();
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            dateCreate: Date.now(),
          });
        console.log("gi day",data)
        });
      }, []);

      console.log("???",arrivalMessage)
    
      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

      console.log("tin nhan ne",messages)

    useEffect(() => {
        socket.current.emit("addUser", profile._id);
        socket.current.on("getUsers", (users) => {
            console.log("User socket ne kkk", users)
        });
    }, [profile]);


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/conversation/" + profile._id);
                console.log("list ne", res)
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [profile._id]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    console.log("hihi", messages)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: profile._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== profile._id
        );

        socket.current.emit("sendMessage", {
            senderId: profile._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("http://localhost:3000/api/v1/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={profile} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.sender === profile._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                >
                                </textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                            </div>
                        </>

                    ) : (
                        <span className="noConversationText">Open a conversation to start a chat</span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
    )
}