import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function MyProfile() {
  const [enq, setEnquiries] = useState({});


  const userJson = localStorage.getItem('user');
 const  userType = JSON.parse(userJson);

    console.log(userType);
    console.log(userType.userName);
    console.log(userType.password);

 const getAllEnquiry = () => {
    axios.get(`http://localhost:7079/onLoginCustomer/${userType.userName}/${userType.password}`)
      .then((res) => setEnquiries(res.data));
  };


  useEffect(getAllEnquiry, []);


    function onAcceptLoan(customerId)
    {
        axios.get(`http://localhost:7079/accept/${customerId}`)
        .then((res)=>setEnquiries(res.data));
    }   







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
      <h2 className="text-center mb-4">MY PROFILE</h2>

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
             
             <tr>
                <td>{enq.customerId}</td>
                <td>{enq.customerName}</td>
                <td>{enq.customerAge}</td>
                <td>{enq.customerEmail}</td>
                <td>{enq.customerMobileNumber}</td>
                <td>{enq.pancardNo}</td>
                <td>{enq.adharCard}</td>
                <td>{enq.gender}</td>
                  <td>{enq.userName}</td>
                <td>{enq.password}</td>
                {/* <td>{enq.cibil.cibilScore}</td> */}
                <td>{enq.loanStatus}</td>
                <td>
                  <button
                    className="btn  btn-primary"
                    onClick={() => onAcceptLoan(enq.customerId)}
                  >
                  Accept
                  </button>
                </td>
              </tr>
        
          </tbody>
        </table>
      </div>
    </div>
  );
}
