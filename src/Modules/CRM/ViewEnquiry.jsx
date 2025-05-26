import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);

  const getAllEnquiry = () => {
    axios.get(`http://localhost:7070/get_enquiry_byStatus/${'enquired'}`)
      .then((res) => setEnquiries(res.data));
  };

  useEffect(getAllEnquiry, []);

  const onForwordToOe = (customerId) => {
    axios.get(`http://localhost:7070/forwordingtoOe/${customerId}`)
      .then(res => {
        if (res.status === 200) {
          getAllEnquiry();
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Customer Enquiries</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
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
                <td>{enq.cibil?.cibilScore}</td>
                <td>{enq.enquiryStatus}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onForwordToOe(enq.customerId)}
                  >
                    Forward to OE
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
