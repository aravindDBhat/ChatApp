import React from "react";
function MessagesContent({ content, currentUser }) {
  console.log("content is : ", content.time);

  const time = new Date(content.time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="p-2 ">
      {content.user._id === currentUser.userId ? (
        <div className="float-end ">
          {" "}
          <div>
            <b>
              {content.user._id === currentUser.userId
                ? "You"
                : content.user.name}{" "}
            </b>
            <b className="time">{time}</b>
          </div>
          <div>
            <div
              style={{
                display: "block",
                float: "right",
                maxWidth: "800px",
                borderRadius: "8px",
                padding: "10px",
                paddingRight: "50px",
              }}
              className="bg-light"
            >
              {content.text}{" "}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <div>
            <b>
              {content.user._id === currentUser.userId
                ? "You"
                : content.user.name}{" "}
            </b>
            <b className="time">{time}</b>
          </div>
          <div>
            <div className="bg-light msgh6"> {content.text} </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MessagesContent;
