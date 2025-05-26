import React from 'react';
import { Link } from 'react-router-dom';
import ViewEnquiry from '../Modules/CRM/ViewEnquiry';
import 'bootstrap/dist/css/bootstrap.css';

export default function SideNav() {
  const userJson = localStorage.getItem('user');
  const { userType } = JSON.parse(userJson);


  console.log(userType);




    





  const options = {
    ADMIN: [
      { label: 'Add Employee', to: '/dashboard/addemployee' },
      { label: 'View Employee', to: '/dashboard/viewemployee' },
    ],
    CRM: [
      { label: 'ADD ENQUIRY', to: '/dashboard/addenquiry' },
      { label: 'PENDING ENQUIRY', to: '/dashboard/viewenquiry' },
         {label: 'FORWARD TO OE',  to: '/dashboard/forwaordtooe', onclick:()=>{ViewEnquiry.onForwordToOe(customerId)}},
        {label: 'APPLICABLE FOR LOAN', to: '/dashboard/applicableforloan'},
         {label: 'REJECTED ENQUIRY', to: '/dashboard/notapplicableforloan'},
          {label: 'PENDING  LOAN', to: '/dashboard/pendinfloanstatus'},

    ],
    OE: [
      { label: 'VIEW CUSTOMER', to: '/dashboard/viewcustomer' },
        { label: 'VERIFY CUSTOMER', to: '/dashboard/verifycustomer' }
    ],
     CM: [
      { label: 'VIEW VERIFIED CUSTOMER', to: '/dashboard/viewverifiedcustomer' },
        { label: 'VERIFY CUSTOMER', to: '/dashboard/verifycustomer' },
          { label: 'VIEW SANCTIONED CUSTOMER', to: '/dashboard/viewsanctionededcustomer' }
    ],
      AH:[
      { label: 'LOAN ACCEPTED CUSTOMER', to: '/dashboard/loanacceptedcustomer' },
      { label: 'LOAN DISBURSED CUSTOMER', to: '/dashboard/loandisbursedcustomer' }
       
      ],
    CUSTOMER: [
      { label: 'MY PROFILE', to: '/dashboard/viewdetails' },
      { label: 'PAY EMI', to: '/dashboard/payemi' }
       
       
    ]
  };




  return (
    <div className="d-flex flex-column">
      {options[userType]?.map((btn, index) => (
        <Link
          key={index}
          to={btn.to}
          className="btn btn-outline-light mb-2 text-start"
        >
          {btn.label}
        </Link>
      ))}
    </div>
  );
}

























































// import React from 'react'
// import { Link } from 'react-router-dom'
// import "../../node_modules/bootstrap/dist/css/bootstrap.css"
// export default function SideNav() {



    
//     const userJson=localStorage.getItem("user");
//     // console.log(userJson);

//    const {userType}=JSON.parse(userJson);
// console.log(userType);

//     const options={
//         ADMIN:[
//             {lable:"add employee",to:"/dashboard/addemployee"},
//              {lable:"view employee",to:"/dashboard/viewemployee"}
//         ],
//          CRM:[
//             {lable:"add enquiry",to:"/dashboard/addenquiry"},
//              {lable:"view enquiry",to:"/dashboard/viewenquiry"}
//         ],
//           OE:[
           
//              {lable:"view customer",to:"/dashboard/viewcustomer"}
//         ],
//     }




//   return (
//     <div>


// {
//     options[userType].map((btn,index)=> <Link className='btn btn-dark me-2' key={index}  to={btn.to}>{btn.lable}</Link> )
// }

//     </div>
//   )
// }
