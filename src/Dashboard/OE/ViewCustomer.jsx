import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function ViewCustomer() {
  const [enquiries, setEnquiries] = useState([]);

 const getAllEnquiry = () => {
    axios.get(`http://localhost:7075/get_enquiry_byStatus/${'forwardToOE'}`)
      .then((res) => setEnquiries(res.data));
  };


  useEffect(getAllEnquiry, []);

  const genrateCibil = (customerId) => {
    axios.get(`http://localhost:7075/UpdateCibilStatus/${customerId}`)
      .then(res => {
        if (res.status === 200) {
          getAllEnquiry();
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Customer Enquiries</h2>

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
              <th>Password</th>
              <th>CIBIL Score</th>
              <th>Enquiry Status</th>
              <th>Action</th>
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
                <td>{enq.cibil?.cibilScore ?? 'Not Checked'}</td>
                <td>{enq.enquiryStatus}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => genrateCibil(enq.customerId)}
                  >
                    CIBIL Check
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
