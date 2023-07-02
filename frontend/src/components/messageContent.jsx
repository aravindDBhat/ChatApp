import React from "react";
function MessagesContent({ content, currentUser }) {
  return (
    <div className="msgh5">
      <p>
        <b>
          {content.user._id === currentUser.userId ? "You" : content.user.name}{" "}
        </b>
        <b className="time">{new Date(content.time).toISOString()}</b>
      </p>
      <h6 className="msgh6">{content.text} </h6>
    </div>
  );
}
export default MessagesContent;
