import Logo from "../components/Logo"
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    let Navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function subHandler(e) {
        e.preventDefault();

        let data = {
            email : name,
            password : password,
        }
                   
        async function logincheck(){

            try{

                const response = await axios.post(`http://127.0.0.1:8000/api/auth/login`,data);
            
            if (response) {
                
                sessionStorage.setItem("user",JSON.stringify(response.data));

                if(response.data.user.role==="admin"){
                    Navigate("/dashboard");
                }else{
                    Navigate("/");
                }
                
              }

            }catch(e){
                alert(" Invalid username or password");

            }
            
              
          }
          logincheck();

            setName("")
            setPassword("")
    }



    return (
     
        <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={subHandler}>
        <h4>LOGIN</h4>
            <Logo/>
        <div className=" mt-3 form-group">
            
            <input type="text" value={name} className="form-control mt-1" placeholder="Enter Car" onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="form-group mt-3">
           
            <input type="password" className="mt-1 form-control" value={password} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="text-center">

        <button type="submit" className="mt-3  btn  btn-warning btn-block">Login</button>
        </div>
    </form>
</div>
</div>
    )
}

export default Login
