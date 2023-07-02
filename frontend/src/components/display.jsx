import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Channels from "./channels.jsx";
import Text from "./text.jsx";
import Member from "./member.jsx";
import Messages from "./messages.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Day from "./date.jsx";
import { io } from "socket.io-client";
const API_BASE_URL = process.env.REACT_APP_API_BACKEND_BASEURL;
const socket = io.connect(process.env.REACT_APP_API_BACKEND_BASEURL);
socket.on("connection", (data) => {
  console.log("hello");
});

socket.emit("join", 123);
function Display() {
  const [messageArray, setMessageArray] = useState([]);
  const [to, setTo] = useState("to");
  const [message, setMessage] = useState("");
  const [chatRoom, setChatRoom] = useState("adsfdgfhh767");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const newChatRoom = () => {
    setChatRoom(uuidv4());
    console.log(chatRoom);
  };
  const fetchAllMessages = async ({ conversationId }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${API_BASE_URL}/api/text?conversationId=${conversationId}`,
        config
      );

      setMessageArray(data);
      console.log("message array: ", messageArray);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const fetchAllChats = async ({ userId }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${API_BASE_URL}/api/conversation?userId=${userId}`,
      config
    );
  };

  const handleSendMessage = async () => {
    try {
      const payload = {
        conversationId: chatRoom,
        to: "to",
        from: "from",
        msg: message,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
      console.log("payload is : ", payload);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/api/text`,
        payload,
        config
      );
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
      });
      setUser(userData);
    } catch (error) {
      console.error(error);
      navigate("/signin");
    }
  }, []);

  return (
    <div className="divmargin .container-fluid">
      <div className="container">
        <div className="row ">
          <div className="col-2 ">
            <div>
              <Channels heading="Channels" />
            </div>
            <div>
              <Channels heading="Direct Messages" />
            </div>
          </div>
          <div className="col-8">
            {/* <ScrollToBottom className="scroll-to-bottom"> */}
            <div className=" row ">
              <div className="msgdiv">
                <Day />

                <Messages array={messageArray} />
              </div>
            </div>
            <div className="rowmain">
              <Text t={handleMessageChange} val={message} />
              <div className="row2">
                <button onClick={handleSendMessage} className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">
            {" "}
            <Member fun={newChatRoom} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Display;
