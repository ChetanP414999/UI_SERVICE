import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEnquiry() {

  const { register, reset,setValue, handleSubmit, formState: { errors } } = useForm();

 const{customerId}=useParams();

 const navigate = useNavigate();      

    const getData=()=>
    {
            axios.get(`http://localhost:7070/getenquirybyenquiryId/${customerId}`)
            .then(res=>{
                if(res.status===200)
                {
                    for(let prop in res.data)   
                    {
                        setValue(prop,res.data[prop])
                    }
            }
    })
    }
    useEffect(getData,[]);






  function addCustomer(data) {
    const formData = new FormData();
// console.log("Form Data:", data)
    // Customer JSON object
    const customer = {
      customerId: data.customerId,
      customerName: data.customerName,
      customerDateOfBirth: data.customerDateOfBirth,
      customerAge: data.customerAge,
      gender: data.gender,
      customerEmail: data.customerEmail,
      customerMobileNumber: data.customerMobileNumber,
      customerAdditionalMobileNumber: data.customerAdditionalMobileNumber,
      customerAmmountPaidForCarloan: data.customerAmmountPaidForCarloan,
      customerTotalLoanRequiredAmmount: data.customerTotalLoanRequiredAmmount,
      userName:data.userName,
      password: data.password,
      loanTentureInMonth: data.loanTentureInMonth,
     customerAddress: {
        permanentAddress: {
          areaName:data.areaName,
          cityName:data.cityName,
          district:data.district,
          state:data.state,
          pincode:data.pincode,
           houseNumber:data.houseNumber,
            streetName:data.streetName
         

        }
       
      },
       accountDetails:{
          accountNumber:data.accountNumber,
          accountType:data.accountType,
          accountBalance:data.accountBalance,
          accountHolderName:data.accountHolderName,
          accountStatus:data.accountStatus,
          bankName:data.bankName,
          ifscCode:data.ifscCode

        }
    };

    console.log(customer);

    formData.append("customer", JSON.stringify(customer));

    //Append files
    formData.append("addressProof", data.addressProof[0]);
    formData.append("panCard", data.panCard[0]);
    formData.append("incomeTax", data.incomeTax[0]);
    formData.append("adharCard", data.adharCard[0]);
    formData.append("photo", data.photo[0]);
    formData.append("signature", data.signature[0]);
    formData.append("bankCheque", data.bankCheque[0]);
    formData.append("salarySlip", data.salarySlip[0]);

    
    axios.post(`http://localhost:7073/saveCustomer/${data.customerId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(console.log(data))
    .catch((error)=>console.log(error))
      reset(); 
      navigate("/home")

    
      
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Customer Loan Enquiry Form</h3>
      <form onSubmit={handleSubmit(addCustomer)} encType="multipart/form-data">
        <div className="row g-3">

          {/* Customer Details */}
          <div className="col-md-6">
            <label className="form-label">Customer ID</label>
            <input type="number" className="form-control" {...register("customerId")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Customer Name</label>
            <input type="text" className="form-control" {...register("customerName")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" {...register("customerDateOfBirth")} />
          </div>

          <div className="col-md-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" {...register("customerAge")} />
          </div>

          <div className="col-md-3">
            <label className="form-label">Gender</label>
            <select className="form-select" {...register("gender")}>
              <option value="">Choose...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("customerEmail")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Primary Mobile Number</label>
            <input type="tel" className="form-control" {...register("customerMobileNumber")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Additional Mobile Number</label>
            <input type="tel" className="form-control" {...register("customerAdditionalMobileNumber")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Amount Paid for Car Loan</label>
            <input type="text" step="0.01" className="form-control" {...register("customerAmmountPaidForCarloan")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Total Loan Amount Required</label>
            <input type="text" step="0.01" className="form-control" {...register("customerTotalLoanRequiredAmmount")} />
          </div>

           <div className="col-md-4">
            <label className="form-label">Loan Tenure (Months)</label>
            <input type="text" className="form-control" {...register("loanTentureInMonth")} />
          </div>

        


         

            {/* <div className="col-md-6">
            <label className="form-label">customerAddress</label>
            <input type="text" className="form-control" {...register("customerAddress")} />
          </div> */}

          <div className="col-md-6">
            <label className="form-label">areaName</label>
            <input type="text" className="form-control" {...register("areaName")} />
          </div>

         <div className="col-md-6">
            <label className="form-label">cityName</label>
            <input type="text" className="form-control" {...register("cityName")} />
          </div>

           <div className="col-md-6">
            <label className="form-label">district</label>
            <input type="text" className="form-control" {...register("district")} />
          </div>

            <div className="col-md-6">
            <label className="form-label">state</label>
            <input type="text" className="form-control" {...register("state")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">pincode</label>
            <input type="text" className="form-control" {...register("pincode")} />
          </div>


          <div className="col-md-6">
            <label className="form-label">houseNumber</label>
            <input type="text" className="form-control" {...register("houseNumber")} />
          </div>


          <div className="col-md-6">
            <label className="form-label">streetName</label>
            <input type="text" className="form-control" {...register("streetName")} />
          </div>

          

                <div className="col-md-6">
            <label className="form-label">Account-Number</label>
            <input type="text" className="form-control" {...register("accountNumber")} />
          </div>

           <div className="col-md-6">
            <label className="form-label">Account Type</label>
            <input type="text" className="form-control" {...register("accountType")} />
          </div>

               <div className="col-md-6">
            <label className="form-label">Account-Balance</label>
            <input type="text" className="form-control" {...register("accountBalance")} />
          </div>

           <div className="col-md-6">
            <label className="form-label">Account Holder Name</label>
            <input type="text" className="form-control" {...register("accountHolderName")} />
          </div>

                  <div className="col-md-6">
            <label className="form-label">Account-Status</label>
            <input type="text" className="form-control" {...register("accountStatus")} />
          </div>

           <div className="col-md-6">
            <label className="form-label">Bank Name</label>
            <input type="text" className="form-control" {...register("bankName")} />
          </div>

            <div className="col-md-6">
            <label className="form-label">IFSC CODE</label>
            <input type="text" className="form-control" {...register("ifscCode")} />
          </div>















            <div className="col-md-6">
            <label className="form-label">PASSWORD</label>
            <input type="text" className="form-control" {...register("password")} />
          </div>

           <div className="col-md-6">
            <label className="form-label">USERNAME</label>
            <input type="text" className="form-control" {...register("userName")} />
          </div>



          {/* Documents Section */}
          <h5 className="mt-4">Upload Documents</h5>

          <div className="col-md-6">
            <label className="form-label">Address Proof</label>
            <input type="file" className="form-control" {...register("addressProof")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">PAN Card</label>
            <input type="file" className="form-control" {...register("panCard")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Income Tax</label>
            <input type="file" className="form-control" {...register("incomeTax")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhar Card</label>
            <input type="file" className="form-control" {...register("adharCard")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Photo</label>
            <input type="file" className="form-control" {...register("photo")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Signature</label>
            <input type="file" className="form-control" {...register("signature")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Bank Cheque</label>
            <input type="file" className="form-control" {...register("bankCheque")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Salary Slip</label>
            <input type="file" className="form-control" {...register("salarySlip")} />
          </div>
        </div>

        <div className="col-12 mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}





