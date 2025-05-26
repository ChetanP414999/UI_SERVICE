import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form'
import { createSessionStorage, useNavigate } from 'react-router-dom';

export default function Login()
{

    const{register,handleSubmit}  =useForm();

    const  navigate=useNavigate();

        function onLogin(data)
        {
            //    console.log(data);
                axios.get(`http://localhost:3434/ongetuser/${data.userName}/${data.password}`)
               .then((res)=>{

                // localStorage.setItem("user","CUSTOMER")
                 console.log(res.data)
                 navigate("/dashboard")
               localStorage.setItem("user",JSON.stringify(res.data));
        })

               .catch((error)=>console.log(error))
      }



  return (
    <div>


    <div style={{borderStyle:'solid', margin:'auto',width:"300px",textAlign:'center'}}>
         <form onSubmit={handleSubmit(onLogin)}>
    <label htmlFor="userName">Username</label><br />
    <input type="text"  {...register("userName")}/>
        <br />
    <label htmlFor="password">Password</label><br />
    <input type="text" {...register("password")} />
<br />
    <br />
    <button type='submit'>Login</button>
    {/* <a href="/enquiry">signup</a> */}
    </form>
    </div>


   
    </div>
  )
}
