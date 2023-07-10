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
              {content.user._id === currentUser.userId ? (
                ""
              ) : (
                <h6 style={{ fontSize: "14px", display: "inline-block" }}>
                  {content.user.name}
                </h6>
              )}{" "}
            </b>
            <h6
              className="time"
              style={{ fontSize: "14px", display: "inline-block" }}
            >
              {time}
            </h6>
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
              {content.user._id === currentUser.userId ? (
                <p style={{ fontSize: "14px", display: "inline-block" }}>You</p>
              ) : (
                <h6 style={{ fontSize: "14px", display: "inline-block" }}>
                  {content.user.name}
                </h6>
              )}{" "}
            </b>
            <h6
              className="time"
              style={{ fontSize: "14px", display: "inline-block" }}
            >
              {time}
            </h6>
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
