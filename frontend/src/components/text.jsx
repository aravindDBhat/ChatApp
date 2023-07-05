import React from "react";
function Text(props) {
  return (
    <div className="row1">
      <input
        id="text"
        className=""
        type="text"
        value={props.val}
        onChange={props.t}
        placeholder="Send Chat Message"
      />
    </div>
  );
}
export default Text;
