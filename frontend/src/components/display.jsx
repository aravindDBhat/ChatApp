import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Channels from "./channels.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Member from "./member.jsx";
import Messages from "./messages.jsx";
import axios from "axios";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BACKEND_BASEURL;
const socket = io.connect(process.env.REACT_APP_API_BACKEND_BASEURL);
function Display() {
  const [messageArray, setMessageArray] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [searchParams] = useSearchParams();
  const [chatId, setChatId] = useState("");
  const [groupConversations, setGroupConversations] = useState([]);
  const [directConversations, setDirectConversations] = useState([]);
  const [isShowMember, setIsShowMember] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({});

  const getDirectChatName = (chat) => {
    try {
      const name = chat.users.filter((u) => u._id !== user.userId)[0].name;
      console.log("CHatNA=>", name);
      return name;
    } catch (error) {}
  };

  socket.on("newMessage", (data) => {
    setMessageArray([...messageArray, data]);
  });

  const fetchCurrentConversationDetails = async (conversationId) => {
    try {
      const { data: response } = await axios.get(
        `${API_BASE_URL}/api/conversations/${conversationId}`
      );
      setCurrentConversation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllMessages = async ({ conversationId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetchCurrentConversationDetails(conversationId);
      const { data: response } = await axios.get(
        `${API_BASE_URL}/api/messages?conversationId=${conversationId}`,
        config
      );
      setMessageArray(response.data);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const fetchAllChats = async ({ userId, type }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data: response } = await axios.get(
      `${API_BASE_URL}/api/conversations?userId=${userId}&type=${type}`,
      config
    );
    if (type === "group") setGroupConversations(response.data);
    if (type === "direct") setDirectConversations(response.data);
  };

  const handleSendMessage = async () => {
    try {
      const payload = {
        conversationId: chatId,
        user: user.userId,
        text: message,
      };
      socket.emit("newMessage", {
        channelId: chatId,
        messageData: payload,
      });
      setMessageArray([
        ...messageArray,
        {
          user: {
            _id: user.userId,
            name: user.name,
          },
          time: new Date(),
          text: message,
        },
      ]);
      setMessage("");
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    try {
      const token = window.localStorage.getItem("token");
      const user = window.localStorage.getItem("user");
      if (!token || !user) {
        console.log("User is not logged in. Redireting to /signin");
        navigate("/signin");
      }
      const userData = JSON.parse(user);
      fetchAllChats({
        userId: userData.userId,
        type: "group",
      });

      fetchAllChats({
        userId: userData.userId,
        type: "direct",
      });
      setUser(userData);
      const chatId = searchParams.get("chatId");
      if (chatId && user) {
        fetchAllMessages({ conversationId: chatId });
        socket.emit("joinChannel", {
          channelId: chatId,
        });
        setChatId(chatId);
      }
    } catch (error) {
      console.error(error);
      navigate("/signin");
    }
  }, []);

  return (
    <div className="divmargin .container-fluid">
      <div className="container">
        <div className="row ">
          <div className="col-2">
            <div
              style={{
                height: "90vh",

                display: "flex",
                flexDirection: "column",
              }}
            >
              {groupConversations && user && groupConversations.length >= 0 && (
                <Channels
                  heading="Channels"
                  chats={groupConversations}
                  type="group"
                  onNewConversationCreate={(newConversation) => {
                    setGroupConversations([
                      ...groupConversations,
                      newConversation,
                    ]);
                  }}
                  currentUser={user}
                />
              )}
              {user &&
                directConversations &&
                directConversations.length >= 0 && (
                  <>
                    <hr />
                    <Channels
                      heading="Direct Messages"
                      chats={directConversations}
                      currentUser={user}
                      type="direct"
                      onNewConversationCreate={(newConversation) => {
                        setDirectConversations([
                          ...directConversations,
                          newConversation,
                        ]);
                      }}
                    />
                  </>
                )}
            </div>
          </div>
          <div className="col">
            {/* <ScrollToBottom className="scroll-to-bottom"> */}
            <div className="d-flex flex-column justify-content-between h-100 m-0 p-0">
              <div className="pb-4 border-bottom">
                <div className="d-flex  justify-content-between">
                  <div>
                    {currentConversation &&
                    currentConversation?.conversationType === "group"
                      ? currentConversation.conversationName
                      : ""}
                    {currentConversation &&
                    currentConversation?.conversationType === "direct"
                      ? getDirectChatName(currentConversation)
                      : ""}
                  </div>
                  <div onClick={() => setIsShowMember(true)}>
                    <i className="fa-solid fa-users"></i>
                  </div>
                </div>
              </div>
              <div className="h-100">
                <Messages currentUser={user} array={messageArray} />
              </div>
              <div className="d-flex justify-content-between">
                <Form.Control
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="roomName"
                  aria-describedby="roomNameHelp"
                />

                <div className="m-2">
                  <Button
                    onClick={handleSendMessage}
                    className="btn btn-primary"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} size="2xl" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Member
        handleClick={(val) => setIsShowMember(val)}
        isOpen={isShowMember}
      />
    </div>
  );
}
export default Display;
