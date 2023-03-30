import React, { useState } from 'react'
import './SignIn.css'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setAuth } from '../../actions/authActions'


function SignIn() {
const navigate = useNavigate()
const [email,setEmail] = useState("")
const [password,setPassword ] =useState("")
const [formErrors,setFormErrors] = useState({})
const dispatch = useDispatch()

  const handleSignIn =async (event)=>{
    event.preventDefault()
    console.log("user sign in");

    try{
    await axios.post("http://localhost:9000/users/signin",{
email,password
    }).then(res=>{
      if(res.data.success){
        localStorage.setItem('token',res.data.user)
      dispatch(setAuth())
        navigate('/')
      }
      else if(res.data=="not signup"){
        const error={}
        error.backend = `Invalid Email`
        setFormErrors(error)
     }
      else if (res.data==="password"){
        const error={}
        error.backend = `Password not correct`
        setFormErrors(error)
      }
    })
  }
  catch (error){
console.log(error);
  }
  }
  return (
    <div className='container  d-flex justify-content-center align-items-center'>
    <div className='row  d-flex align-items-center'>

    <div className='form px-4'>
   
 
   <div className='row'>

  
   <div className='col-md-6'>
   <div><h3 className='singnup_head my-5  col-md-5'>SignIn</h3></div>
   <form onSubmit={handleSignIn}>
     <div className='body_signin '>

     <p className='errors text-danger '>{formErrors.backend}</p>
        <div>
            <label className='form-label'>Email</label>
            <input className='form-control form-control-xl' onChange={(event)=>setEmail(event.target.value)} type="email" id="email" name='email'/>
        </div>
        <div>
            <label className='form-label'>Password</label>
            <input className='form-control form-control-xl' onChange={(event)=>setPassword(event.target.value)} type='password' id='password' name='password'/>
        </div>
       
        <div>
            <button className='btn  btn-dark  my-3' type='submit'>SignIn</button>
        </div>
        <div>
            <p>Don't have a Account ? <Link to="/signup"> <small className='link text-decoration-none'>SignUp</small></Link> </p>
        </div>
    </div>
    </form>
   
</div>
<div className='col-md-6'>
<img className='img_signup' src='https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGRhcmslMjBpbWFnZXMlMjB3aXRoJTIwd2hpdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60' alt='SignIn' />

   </div>
   </div>
</div>
 
   

</div>

</div>
  )
}

export default SignIn
