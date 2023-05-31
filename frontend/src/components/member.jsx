import React,{useState} from "react";
function Member(){
   const [visible,setVisible]=useState(false)
       const toggle=()=>{
        setVisible(prevvisible=>!prevvisible)   
    }
        return( 
    <div className="clr">
            <p className="member" onClick={toggle}>Members</p>
            {visible===true ? (<div className="toggle"></div>
                ):("")}
    </div>
    )
}
export default Member