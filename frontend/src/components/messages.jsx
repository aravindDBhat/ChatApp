import React from "react";
import MessagesContent from "./messageContent.jsx";
import ScrollableFeed from "react-scrollable-feed";
function Messages({ array, currentUser }) {
  return (
    <ScrollableFeed>
      <div className="msgs">
        {array &&
          array.length > 0 &&
          array.map((msg) => (
            <MessagesContent currentUser={currentUser} content={msg} />
          ))}
      </div>
    </ScrollableFeed>
  );
}
export default Messages;
