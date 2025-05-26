import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function NotApplicableForLoan() {
  const [enquiries, setEnquiries] = useState([]);

  const getAllEnquiry = () => {
    axios.get(`http://localhost:7070/get_enquiry_byStatus/${'Not_Applicable'}`)
      .then((res) => setEnquiries(res.data));
  };

  useEffect(getAllEnquiry, []);



  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Forwarded Enquiries</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>PAN Card</th>
              <th>Aadhar Card</th>
              <th>Gender</th>
              <th>Password</th>
              <th>CIBIL Score</th>
              <th>Status</th>
             
            </tr>
          </thead>

          <tbody>
            {enquiries.map((enq, index) => (
              <tr key={index}>
                <td>{enq.customerId}</td>
                <td>{enq.customerName}</td>
                <td>{enq.customerAge}</td>
                <td>{enq.customerEmail}</td>
                <td>{enq.customerMobileNumber}</td>
                <td>{enq.pancardNo}</td>
                <td>{enq.adharCard}</td>
                <td>{enq.gender}</td>
                <td>{enq.password}</td>
                <td>{enq.cibil?.cibilScore || 'N/A'}</td>
                <td>{enq.enquiryStatus}</td>
                
                 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
