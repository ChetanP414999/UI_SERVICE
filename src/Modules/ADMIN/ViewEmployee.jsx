import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function () {


  const [allUser,setallUser]=useState([]);


    const getAllUser =()=>
      {
          axios.get("http://localhost:3434/onget_All_user")
          .then(res=>setallUser(res.data));
         
      }

        useEffect(getAllUser,[]);




  return (
    <div>
<table className='table table-hover'>
<thead>
  <tr>
    <th>UID</th>
     <th>USER NAME</th>
      <th>PASSWORD</th>
       <th>USER TYPE</th>

  </tr>
</thead>
<tbody>
    {
      allUser.map((user,index)=>
      <tr>
        <td>{user.uid}</td>
        <td>{user.userName}</td>
        <td>{user.password}</td>
        <td>{user.userType}</td>
      </tr>

      )
    }

</tbody>




</table>







    </div>
  )
}
