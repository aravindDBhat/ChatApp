import React from "react"
function Text(props){
        return  <div className="row1">
        <input id="text" className="rowtext" type="text" onKeyPress={(event)=>{
          event.key==="Enter" && props.t()
        }} onChange={(event)=>{props.fun(event.target.value)}} placeholder="Send Chat Message"/>
      </div>
    }
export default Text