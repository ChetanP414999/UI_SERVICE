import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export default function Enquiry() {


            const{register,handleSubmit}=useForm();
  
              const navigate=useNavigate();

                function onsaveEnquiry(data)
                {
                    console.log(data);
                    alert("data saved...!!!!!!")
                    axios.post("http://localhost:7070/saveenquiry",data);
                    navigate("/home")


                }


  
    return (
    <div>

            <div style={{textAlign:'center',margin:'auto',width:"300px",height:'auto' ,borderStyle:'solid',padding:"4px"}}>
            <form onSubmit={handleSubmit(onsaveEnquiry)} >


            <label htmlFor="customerName">NAME</label><br />
            <input type="text" {...register("customerName")} /><br />

              <label htmlFor="age">AGE</label><br />
            <input type="text"     {...register("customerAge")} /><br />

           

              <label htmlFor="customerEmail">EMAIL</label><br />
            <input type="text"  {...register("customerEmail")} /><br />

            <label htmlFor="customerMobileNumber">MOBILE NUMBER</label><br />
            <input type="text"  {...register("customerMobileNumber")} /><br />

                 <label htmlFor="pancardNo">PANCARD NUMBER</label><br />
            <input type="text"   {...register("pancardNo")} /><br />

             <label htmlFor="adharCard">ADHAR NUMBER</label><br />
            <input type="text"  {...register("adharCard")} /><br />


             <label htmlFor="gender">GENDER</label><br />
            <input type="text"  {...register("gender")} /><br />



               <label htmlFor="userName">USERNAME</label><br />
            <input type="text"  {...register("userName")} /><br />



               <label htmlFor="password">PASSWORD</label><br />
            <input type="text"  {...register("password")} /><br />

            

            <br />

        <button type='submit'>Register </button>


            </form>
             </div>

    </div>
  )
}
        