import React from "react";
function Channels({ chats, heading, type }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <h4>{capitalizeFirstLetter(type)} chats</h4>
      {chats &&
        chats.length > 0 &&
        chats.map((chat) => (
          <div className="" key={chat._id}>
            <a href={`/text?chatId=${chat.conversationId}`}>
              {chat.conversationName}
            </a>
          </div>
        ))}
    </div>
  );
}
export default Channels;
