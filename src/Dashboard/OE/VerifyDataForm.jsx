import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VerifyDataForm() {
  const { register, setValue } = useForm();
  const [customer, setCustomer] = useState({});
  const { customerId } = useParams();
  const [preview, setPreview] = useState({ show: false, type: '', data: '', title: '' });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7073/getBycustomerId/${customerId}`)
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          for (let prop in data) {
            setValue(prop, data[prop]);
          }
          setCustomer(data);
        }
      })
      .catch(error => console.error(error));
  }, [customerId, setValue]);

  const openPreview = (base64Data, label) => {
    let type = '';
    if (base64Data.startsWith('/9j')) type = 'image';
    else if (base64Data.startsWith('JVBER')) type = 'pdf';
    else type = 'download';
    setPreview({ show: true, type, data: base64Data, title: label });
  };

  const closePreview = () => setPreview({ show: false, type: '', data: '', title: '' });

  function ontransfertocm(customerId) {
    console.log(customerId);
    axios.get(`http://localhost:7075/documentverified/${customerId}`)
      .then((res) => {
        console.log(res.data);
        navigate('/sanctionalletter');
      })
      .catch((err) => {
        console.error("Verification error:", err);
      });
  }

  const renderDocument = (base64Data, label) => {
    if (!base64Data) return <p>{label}: No Document</p>;

    return (
      <div className="mb-3" style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => openPreview(base64Data, label)}>
        <label className="form-label">{label}</label><br />
        {base64Data.startsWith('/9j') ? (
          <img
            src={`data:image/jpeg;base64,${base64Data}`}
            alt={label}
            style={{ width: "100%", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
          />
        ) : base64Data.startsWith('JVBER') ? (
          <iframe
            src={`data:application/pdf;base64,${base64Data}`}
            title={label}
            style={{ width: "100%", height: "100px", border: "1px solid #ccc" }}
          />
        ) : (
          <p style={{ fontSize: "14px", color: "blue", textDecoration: "underline" }}>Download {label}</p>
        )}
      </div>
    );
  };

  const docs = customer.allPersonalDocuments || {};

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Customer Details</h3>
      <form>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Customer ID</label>
            <input type="number" className="form-control" {...register("customerId")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Customer Name</label>
            <input type="text" className="form-control" {...register("customerName")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" {...register("customerDateOfBirth")} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" {...register("customerAge")} disabled />
          </div>

          <div className="col-md-3">
            <label className="form-label">Gender</label>
            <input type="text" className="form-control" {...register("gender")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("customerEmail")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Primary Mobile Number</label>
            <input type="tel" className="form-control" {...register("customerMobileNumber")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Additional Mobile Number</label>
            <input type="tel" className="form-control" {...register("customerAdditionalMobileNumber")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Amount Paid for Car Loan</label>
            <input type="number" className="form-control" {...register("customerAmmountPaidForCarloan")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Total Loan Amount Required</label>
            <input type="number" className="form-control" {...register("customerTotalLoanRequiredAmmount")} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" {...register("password")} disabled />
          </div>

          <div className="col-md-4">
            <label className="form-label">Loan Tenure (Months)</label>
            <input type="number" className="form-control" {...register("loanTentureInMonth")} disabled />
          </div>
        </div>

        <h5 className="mt-4">Uploaded Documents</h5>
        <div className="row">
          <div className="col-md-3">{renderDocument(docs.addressProof, "Address Proof")}</div>
          <div className="col-md-3">{renderDocument(docs.panCard, "PAN Card")}</div>
          <div className="col-md-3">{renderDocument(docs.incomeTax, "Income Tax")}</div>
          <div className="col-md-3">{renderDocument(docs.adharCard, "Aadhar Card")}</div>
          <div className="col-md-3">{renderDocument(docs.photo, "Photo")}</div>
          <div className="col-md-3">{renderDocument(docs.signature, "Signature")}</div>
          <div className="col-md-3">{renderDocument(docs.bankCheque, "Bank Cheque")}</div>
          <div className="col-md-3">{renderDocument(docs.salarySlip, "Salary Slip")}</div>
        </div>
      </form>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-success" onClick={() => ontransfertocm(customer.customerId)}>VERIFY</button>
        <button className="btn btn-danger" onClick={() => navigate('/')}>Reject</button>
      </div>

      {/* Preview Modal */}
      <Modal show={preview.show} onHide={closePreview} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview - {preview.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {preview.type === 'image' && (
            <img src={`data:image/jpeg;base64,${preview.data}`} alt={preview.title} style={{ width: "100%" }} />
          )}
          {preview.type === 'pdf' && (
            <iframe src={`data:application/pdf;base64,${preview.data}`} title={preview.title} style={{ width: "100%", height: "500px" }} />
          )}
          {preview.type === 'download' && (
            <a
              href={`data:application/octet-stream;base64,${preview.data}`}
              download={`${preview.title}.file`}
              className="btn btn-primary"
            >
              Download {preview.title}
            </a>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePreview}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}




































// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function VerifyDataForm() {
//   const { register, setValue } = useForm();
//   const [customer, setCustomer] = useState({});
//   const { customerId } = useParams();
//   const [preview, setPreview] = useState({ show: false, type: '', data: '', title: '' });

//   useEffect(() => {
//     axios.get(`http://localhost:7073/getBycustomerId/${customerId}`)
//       .then(res => {
//         if (res.status === 200) {
//           const data = res.data;
//           for (let prop in data) {
//             setValue(prop, data[prop]);
//           }
//           setCustomer(data);
//         }
//       })
//       .catch(error => console.error(error));
//   }, [customerId, setValue]);

//   const openPreview = (base64Data, label) => {
//     let type = '';
//     if (base64Data.startsWith('/9j')) type = 'image';
//     else if (base64Data.startsWith('JVBER')) type = 'pdf';
//     else type = 'download';
//     setPreview({ show: true, type, data: base64Data, title: label });
//   };

//   const closePreview = () => setPreview({ show: false, type: '', data: '', title: '' });

//   const renderDocument = (base64Data, label) => {
//     if (!base64Data) return <p>{label}: No Document</p>;


//     //  const navigate =useNavigate();


//     function ontransfertocm(data){
//         console.log(data.customerId);
        
//       axios.get(`http://localhost:7075/documentverified/${data.customerId}`)
//       .then((res)=>console.log(res.data)
//       )
//     }

//     return (
//       <div className="mb-3" style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => openPreview(base64Data, label)}>
//         <label className="form-label">{label}</label><br />
//         {base64Data.startsWith('/9j') ? (
//           <img
//             src={`data:image/jpeg;base64,${base64Data}`}
//             alt={label}
//             style={{ width: "100%", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
//           />
//         ) : base64Data.startsWith('JVBER') ? (
//           <iframe
//             src={`data:application/pdf;base64,${base64Data}`}
//             title={label}
//             style={{ width: "100%", height: "100px", border: "1px solid #ccc" }}
//           />
//         ) : (
//           <p style={{ fontSize: "14px", color: "blue", textDecoration: "underline" }}>Download {label}</p>
//         )}
//       </div>
//     );
//   };

//   const docs = customer.allPersonalDocuments || {};

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Customer Details</h3>
//       <form>
//         <div className="row g-3">
//           <div className="col-md-6">
//             <label className="form-label">Customer ID</label>
//             <input type="number" className="form-control" {...register("customerId")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Customer Name</label>
//             <input type="text" className="form-control" {...register("customerName")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Date of Birth</label>
//             <input type="date" className="form-control" {...register("customerDateOfBirth")} disabled />
//           </div>

//           <div className="col-md-3">
//             <label className="form-label">Age</label>
//             <input type="number" className="form-control" {...register("customerAge")} disabled />
//           </div>

//           <div className="col-md-3">
//             <label className="form-label">Gender</label>
//             <input type="text" className="form-control" {...register("gender")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Email</label>
//             <input type="email" className="form-control" {...register("customerEmail")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Primary Mobile Number</label>
//             <input type="tel" className="form-control" {...register("customerMobileNumber")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Additional Mobile Number</label>
//             <input type="tel" className="form-control" {...register("customerAdditionalMobileNumber")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Amount Paid for Car Loan</label>
//             <input type="number" className="form-control" {...register("customerAmmountPaidForCarloan")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Total Loan Amount Required</label>
//             <input type="number" className="form-control" {...register("customerTotalLoanRequiredAmmount")} disabled />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Password</label>
//             <input type="text" className="form-control" {...register("password")} disabled />
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Loan Tenure (Months)</label>
//             <input type="number" className="form-control" {...register("loanTentureInMonth")} disabled />
//           </div>
//         </div>

//         <h5 className="mt-4">Uploaded Documents</h5>
//         <div className="row">
//           <div className="col-md-3">{renderDocument(docs.addressProof, "Address Proof")}</div>
//           <div className="col-md-3">{renderDocument(docs.panCard, "PAN Card")}</div>
//           <div className="col-md-3">{renderDocument(docs.incomeTax, "Income Tax")}</div>
//           <div className="col-md-3">{renderDocument(docs.adharCard, "Aadhar Card")}</div>
//           <div className="col-md-3">{renderDocument(docs.photo, "Photo")}</div>
//           <div className="col-md-3">{renderDocument(docs.signature, "Signature")}</div>
//           <div className="col-md-3">{renderDocument(docs.bankCheque, "Bank Cheque")}</div>
//           <div className="col-md-3">{renderDocument(docs.salarySlip, "Salary Slip")}</div>
//           <br /><br />

          
//         </div>
//       </form>


// <div className="d-flex justify-content-center gap-3">
//   <button className="btn btn-success" onClick={() => ontransfertocm(data.customerId)}>Accept</button>
//   {/* <button className="btn btn-danger" onClick={() => navigate(customerId)}>Reject</button> */}
// </div>



//       {/* Modal for preview */}
//       <Modal show={preview.show} onHide={closePreview} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Preview - {preview.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {preview.type === 'image' && (
//             <img src={`data:image/jpeg;base64,${preview.data}`} alt={preview.title} style={{ width: "100%" }} />
//           )}
//           {preview.type === 'pdf' && (
//             <iframe src={`data:application/pdf;base64,${preview.data}`} title={preview.title} style={{ width: "100%", height: "500px" }} />
//           )}
//           {preview.type === 'download' && (
//             <a
//               href={`data:application/octet-stream;base64,${preview.data}`}
//               download={`${preview.title}.file`}
//               className="btn btn-primary"
//             >
//               Download {preview.title}
//             </a>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closePreview}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }



