import React from "react";
import MessagesContent from "./messageContent.jsx";
import ScrollableFeed from "react-scrollable-feed";
function Messages(props){
    // function al(ele){

    // }
        const all=props.array.map(ele=>{
            console.log(ele.time);
            console.log(ele.name);
            console.log(ele.msg);
            return <MessagesContent key={ele.key} content={ele}/>
        })
        return <ScrollableFeed>
            <div className="msgs">
            {all}
        </div>
            </ScrollableFeed>

}
export default Messages