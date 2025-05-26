import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './templates/Header'
import Home from './templates/Home'
import Contact from './templates/Contact'
import Login from './templates/Login'
import About from './templates/about'
import Dashboard from './Dashboard/Dashboard'
import Enquiry from './Dashboard/ENQUIRY/Enquiry'
import AddEnquiry from './Modules/CRM/AddEnquiry'
import VerifyDataForm from './Dashboard/OE/VerifyDataForm'
import CustomerLogin from './templates/CustomerLogin'
function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div>
       

      <BrowserRouter>
      <Header></Header>
      <Routes>
         <Route path='/' element={<Home></Home>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/employeelogin' element={<Login></Login>}></Route>
      <Route path='/customerlogin' element={<CustomerLogin/>}></Route>
      <Route path='/dashboard/*' element={<Dashboard/>}></Route>
       <Route path='/enquiry' element={<Enquiry/>}></Route>
       <Route path='/addenquiery/:customerId' element={<AddEnquiry/>}></Route>
       <Route path='/verifydataform/:customerId' element={<VerifyDataForm/>}></Route>
      </Routes>
      
      
      </BrowserRouter>

      </div>
       
  
  )
}

export default App
