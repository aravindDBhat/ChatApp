import React from "react";
import MessagesContent from "./messageContent.jsx";
import Card from "react-bootstrap/Card";
import ScrollableFeed from "react-scrollable-feed";
function Messages({ array, currentUser }) {
  return (
    <Card
      className="bg-light"
      style={{ position: "absolute", height: "74%", width: "73%" }}
    >
      <Card.Body style={{ overflowY: "scroll" }}>
        <Card.Text>
          {" "}
          {array &&
            array.length > 0 &&
            array.map((msg) => (
              <MessagesContent currentUser={currentUser} content={msg} />
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Messages;
