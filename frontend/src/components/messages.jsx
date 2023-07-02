import React from "react";
import MessagesContent from "./messageContent.jsx";
import ScrollableFeed from "react-scrollable-feed";
function Messages({ array }) {
  console.log("array is : ", array);
  return (
    <ScrollableFeed>
      <div className="msgs">
        {array &&
          array.length > 0 &&
          array.map((msg) => <MessagesContent content={msg} />)}
      </div>
    </ScrollableFeed>
  );
}
export default Messages;
