import React, { useEffect, useState } from "react";

class LoginFrom extends React.Component{
    render(){
        return (
            <form>
                <div><input type="email"></input></div>
                <div><input type="password"></input></div>
                 <button type="submit"> Submit</button>
            </form>
        )
    }
}


export default LoginFrom;