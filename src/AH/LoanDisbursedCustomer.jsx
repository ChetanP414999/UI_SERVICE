import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Loandisbursedcustomer() {
  const [enq, setEnquiries] = useState([]);


  const userJson = localStorage.getItem('user');
 const  userType = JSON.parse(userJson);

    console.log(userType);
    console.log(userType.userName);
    console.log(userType.password);

 const getAllEnquiry = () => {
    axios.get(`http://localhost:7078/getloan_loan_loandisbursed_customer/${'Paid'}`)
      .then((res) => setEnquiries(res.data));
  };


  useEffect(getAllEnquiry, []);


    // function onLoanDisbursed(customerId)
    // {
    //     axios.get(`http://localhost:7078/getloan_loan_loandisbursed_customer/${customerId}`)
    //     .then((res)=>console.log(res.data));
    // }   







//   const genrateCibil = (customerId) => {
//     axios.get(`http://localhost:7075/UpdateCibilStatus/${customerId}`)
//       .then(res => {
//         if (res.status === 200) {
//           getAllEnquiry();
//         }
//       });
//   };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">LOAN DISBURSED CUSTOMER</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>PAN</th>
              <th>Aadhaar</th>
              <th>Gender</th>
             <th>UserName</th>
              <th>Password</th> 
              {/* <th>CIBIL Score</th> */}
              <th>Loan Status</th>
              <th>loanAmtSanctioned</th>
              <th>totalAmountWithInterest</th>
              <th>rateOfInterest</th>
              <th>loanTentureInMonth</th>
              <th>monthlyEmiAmount</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
             {
             enq.map((e,index)=>
              <tr key={index}>
                <td>{e.customerId}</td>
                <td>{e.customerName}</td>
                <td>{e.customerAge}</td>
                <td>{e.customerEmail}</td>
                <td>{e.customerMobileNumber}</td>
                <td>{e.pancardNo}</td>
                <td>{e.adharCard}</td>
                <td>{e.gender}</td>
                 <td>{e.userName}</td>
                <td>{e.password}</td>
                {/* <td>{enq.cibil.cibilScore}</td> */}
                <td>{e.loanStatus}</td>
                <td>{e.sanctionLetter.loanAmtSanctioned}</td>
                     <td>{e.sanctionLetter.totalAmountWithInterest}</td>
                      <td>{e.sanctionLetter.rateOfInterest}</td>
                       <td>{e.sanctionLetter.loanTentureInMonth}</td>
                       <td>{e.sanctionLetter.monthlyEmiAmount}</td>
                {/* <td>
                  <button
                    className="btn  btn-primary"
                    onClick={() => onLoanDisbursed(e.customerId)}
                  >
                  Disbursed
                  </button>
                </td> */}
              </tr>
        
             )
             }
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
