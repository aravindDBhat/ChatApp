import React from "react";
import MessagesContent from "./messageContent.jsx";
import ScrollableFeed from "react-scrollable-feed";
function Messages({ array, currentUser }) {
  return (
    <div className="msgs">
      <ScrollableFeed>
        {array &&
          array.length > 0 &&
          array.map((msg) => (
            <MessagesContent currentUser={currentUser} content={msg} />
          ))}
      </ScrollableFeed>
    </div>
  );
}
export default Messages;
