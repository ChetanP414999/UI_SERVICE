import React from 'react'
import { Link } from 'react-router-dom'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
export default function Header() {
  return (
    <div    className='bg-primary p-3 d-flex justify-content-end' style={{ width:"100%"}} >


<Link  className='btn btn-dark me-2' to={'home'}> Home </Link>
<Link  className='btn btn-dark me-2' to={'about'}> About </Link>
<Link  className='btn btn-dark me-2' to={'contact'}> Contact </Link>
<Link  className='btn btn-dark me-2' to={'employeelogin'}>Employee Login </Link>
 <Link className='btn btn-dark me-2' to={'customerlogin'}>Customer login</Link>



    </div>
  )
}
