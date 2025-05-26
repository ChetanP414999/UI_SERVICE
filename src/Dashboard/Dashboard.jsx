
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Profile from './Profile';
import SideNav from './SideNav';
import AddEmployee from '../Modules/ADMIN/AddEmployee';
import AddEnquiry from '../Modules/CRM/AddEnquiry';
import ViewEmployee from '../Modules/ADMIN/ViewEmployee';
import ViewEnquiry from '../Modules/CRM/ViewEnquiry';
import ViewCustomer from './OE/ViewCustomer';
import { Route, Routes } from 'react-router-dom';
import ForwordToOe from '../Modules/CRM/ForwardToOe';
import ApplicableForLoan from '../Modules/CRM/ApplicableForLoan';
import NotApplicableForLoan from '../Modules/CRM/NotApplicableForLaon';
import PendingLoanStatus from '../Modules/CRM/PendingLoanStatus';
import VerifyCustomer from './OE/VerifyCustomer';
import ViewVerifiedCustomer from '../CM/ViewVerifiedCustomer';
import ViewSanctionedCustomer from '../CM/ViewSanctionedCustomer';
import MyProfile from '../CUSTOMER/MyProfile';
import LoanAcceptedCustomer from '../AH/LoanAcceptedCustomer';
import Loandisbursedcustomer from '../AH/LoanDisbursedCustomer';
import PayEmi from '../CUSTOMER/PayEmi';

export default function Dashboard() {

  const userJson = localStorage.getItem('user');

  const { userType } = JSON.parse(userJson);
  console.log(userType);

  const appRoute = {
    ADMIN: [
      { path: 'addemployee', componant: <AddEmployee /> },
      { path: 'viewemployee', componant: <ViewEmployee /> },
    ],
    CRM: [
      { path: 'addenquiry', componant: <AddEnquiry /> },
      { path: 'viewenquiry', componant: <ViewEnquiry /> },
      {path:'forwaordtooe',componant:<ForwordToOe/>},
      {path:'applicableforloan',componant:<ApplicableForLoan/>}
      ,
      {path:'notapplicableforloan',componant:<NotApplicableForLoan/>},
      {path:'pendinfloanstatus',componant:<PendingLoanStatus/>}
    ],
    OE: [
      { path: 'viewcustomer', componant: <ViewCustomer /> },
      {path:'verifycustomer',componant:<VerifyCustomer/>}
    
    ],
    CM:[
      {path:'viewverifiedcustomer', componant:<ViewVerifiedCustomer/>},
      {
        path:'viewsanctionededcustomer',componant:<ViewSanctionedCustomer/>
      }
      
    ],
    AH:[
        {path:'loanacceptedcustomer',componant:<LoanAcceptedCustomer/>},
         {path:'loandisbursedcustomer',componant:<Loandisbursedcustomer/>},
    ],


    CUSTOMER:[
      {path:'viewdetails',componant:<MyProfile/>},
      {path:'payemi',componant:<PayEmi/>}
    ]

  };

  return (
    <div className="container-fluid p-0">
      {/* Top Header/Profile */}
      <div className="bg-dark text-white py-3 px-4">
        <Profile />
      </div>

      {/* Main Body */}
      <div className="row g-0" style={{ height: '85vh' }}>
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-success text-white p-3">
          <SideNav />
        </div>

        {/* Content */}
        <div className="col-md-9 col-lg-10 bg-light p-4 overflow-auto">
          <div className="card shadow-sm">
            <div className="card-body bg-white rounded">
              <Routes>
                {appRoute[userType]?.map((mapping, index) => (
                  <Route
                    key={index}
                    path={mapping.path}
                    element={mapping.componant}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


















// import React from 'react'
// import "../../node_modules/bootstrap/dist/css/bootstrap.css"
// import Profile from './Profile'
// import SideNav from './SideNav'
// import AddEmployee from '../Modules/ADMIN/AddEmployee'
// import AddEnquiry from '../Modules/CRM/AddEnquiry'
// import ViewEmployee from '../Modules/ADMIN/ViewEmployee'
// import ViewEnquiry from '../Modules/CRM/ViewEnquiry'
// import ViewCustomer from './OE/ViewCustomer'
// import { Route, Routes } from 'react-router-dom'

// export default function () {


//     const userJson=localStorage.getItem("user");
//     // console.log(userJson);

//    const {userType}=JSON.parse(userJson);
// console.log(userType);



//     const appRoute={
//         ADMIN:[{path:"addemployee" ,componant:<AddEmployee/>}
//             ,{
//                 path:"viewemployee",componant:<ViewEmployee/>
//             }
//         ],
//         CRM:[{path:"addenquiry",componant:<AddEnquiry/>}
//             ,{path:"viewenquiry",componant:<ViewEnquiry/>}
//         ],
//         OE:[
          
//              {path:"viewcustomer",componant:<ViewCustomer/>}
//         ],
//     }



//   return (
//     <div >
        
//  <div style={{backgroundColor:"lightgrey"}}>
//          <Profile/>
//         </div>

// <div style={{display:"flex", height:"80vh"}}>

//           <div style={{backgroundColor:'lightgreen', width:"30%", flexDirection:"column",height:"100%"}}>
//             <SideNav/>
//           </div>

//       <div  className='d-flex' style={{backgroundColor:'lightblue', width:"100%"}}>
//         <Routes>
//           {
//             appRoute[userType].map((mapping,index)=><Route key={index} path={mapping.path} element={mapping.componant}></Route>)
//           }
//         </Routes>
//         </div>
//         </div>

        
//     </div>
//   )
// }


















