import React from "react";
import MessagesContent from "./messageContent.jsx";
import ScrollableFeed from "react-scrollable-feed";
function Messages(props) {
  const all = props.array.map((ele) => {
    return <MessagesContent content={ele} />;
  });
  return (
    <ScrollableFeed>
      <div className="msgs">{all}</div>
    </ScrollableFeed>
  );
}
export default Messages;
