import React from "react";
import MessagesContent from "./messageContent.jsx";
import Card from "react-bootstrap/Card";
import ScrollableFeed from "react-scrollable-feed";
function Messages({ array, currentUser }) {
  return (
    <Card
      style={{
        borderRadius: "0",
        backgroundColor: "bg-light",
        position: "absolute",
        height: "86.4%",
        width: "100%",
      }}
    >
      {" "}
      <Card.Body
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ScrollableFeed>
          <Card.Text>
            {" "}
            {array &&
              array.length > 0 &&
              array.map((msg) => (
                <div key={msg._id} className="vstack gap-3 ">
                  <MessagesContent currentUser={currentUser} content={msg} />{" "}
                </div>
              ))}
          </Card.Text>{" "}
        </ScrollableFeed>
      </Card.Body>
    </Card>
  );
}
export default Messages;
