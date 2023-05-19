import React, { useEffect, useState } from "react";
import Channels from "./channels.jsx";
import Text from "./text.jsx";
import Member from "./member.jsx";
import Messages from "./messages.jsx";
import Day from "./date.jsx";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");
socket.on("connection", (data) => {
  console.log("hello");
});

socket.emit("join", 123);
function Display() {
  const [texts, setTexts] = useState("");
  const [array, setArray] = useState([]);
  console.log("text value is : ", texts);
  const t = () => {
    if (texts !== "") {
      const msgs = {
        key: array.length,
        msg: texts,
        name: "name",
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
      socket.emit("msg", msgs);
      setTexts("");
    } else {
      console.log("text is null");
    }
  };
  useEffect(() => {
    socket.on("receive", (data) => {
      setArray((prevarray) => [...prevarray, data]);
      document.getElementById("text").value = "";
    });
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

                <Messages array={array} />
              </div>
            </div>
            <div className="rowmain">
              <Text t={t} fun={setTexts} />
              <div className="row2">
                <button onClick={t} className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">
            {" "}
            <Member />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Display;
