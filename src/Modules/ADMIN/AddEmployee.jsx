import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {



     const{register,handleSubmit}= useForm();

      const navigate=useNavigate();

     function onSaveEmployee(data)
     {
        console.log(data);
        axios.post('http://localhost:3434/onSaveUser',data);
        navigate("/home")

     }


  return (
    <div>

        <div style={{padding:"4px",textAlign:'center' ,borderStyle:'solid',margin:'auto',width:"300px",height:'auto'}}>
          
        <form onSubmit={handleSubmit(onSaveEmployee)}>

      <label htmlFor="userName">Enter UserName</label><br />
      <input type="text" {...register("userName")} /><br />

      <label htmlFor="password">Enter password</label><br />
      <input type="text" {...register("password")} /><br />

      <label htmlFor="userType">Enter userType</label><br />
      <input type="text" {...register("userType")} /><br />
<br />
      <button  style={{backgroundColor:"blue" ,}}  type='submit'>Add Employee</button>

        </form>


        </div>







    </div>
  )
}
