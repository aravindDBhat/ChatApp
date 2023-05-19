import React,{Component} from "react";
function MessagesContent(props){
        return <div className="msgh5">
             <p><b>{props.content.name} </b><b className="time">{props.content.time}</b></p>
            <h6 className="msgh6">{props.content.msg} </h6>
        </div>
    }
export default MessagesContent 