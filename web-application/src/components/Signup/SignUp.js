import React, { useEffect, useState } from 'react'
import './SignUp.css'
// import axios from '../../axios'
import axios from 'axios'
// import { baseURL } from '../../constants/constants'
import { useNavigate, Link } from "react-router-dom"


function SignUp() {
  const navigate = useNavigate()
  const initialValues = { username: "", email: "", password: "", confirmpassword: "" }
  const [formValues, setForrmValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForrmValues({ ...formValues, [name]: value })
     }

    //  form submit
  const handleSignUp = async (event) => {
    event.preventDefault()
    console.log("inside handlesubmit");


    // validation 
    const errors = {};
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!formValues.username) {
      errors.username = "Username required"
    }
    else if (formValues.username.length < 5) {
      errors.username = "Atleast 5 characters required"
    }
    if (!formValues.email) {
      errors.email = "Email is required "
    }
    else if (!regex.test(formValues.email)) {
      errors.email = "Enter a valid email"
    }
    if (!formValues.password) {
      errors.password = "Please enter a password"
    }
    else if (formValues.password.length < 5) {
      errors.password = "Atleast 5 characters required"
    }
    if (!formValues.confirmpassword) {
      errors.confirmpassword = "Confirm your password"
    }
    else if (formValues.password !== formValues.confirmpassword) {
      errors.confirmpassword = "Enter same password"
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // validation

    // connecting to node
    try {
      console.log("hi e form onnum backend aykkumo")
      await axios.post("http://localhost:9000/users/signup", {
        formValues
      }).then(res => {
        if (res.data.success) {
          console.log(res.data.user.username +"user data");
          const data = res.data.user
          navigate('/signin')
        }
        else {
          const error = {}
          console.log(res.data[0].username + "user");
          console.log(res.data[0].email + "user");
          error.backend=`Email already exist with username  ${res.data[0].username}`
          setFormErrors(error)
        }
      })

     .catch((error) => {
          console.log("Error :", error);
        })


    }
    catch (e) {
      console.log(e);

    }
    // connecting to node
  }




  return (

    <div className='container  d-flex justify-content-center align-items-center'>
      <div className='row  d-flex align-items-center'>

        <div className='form px-4'>


          <div className='row'>
            <div className='col-md-6'>
              <div><h3 className='singnup_head my-4 col-md-5'>SignUp</h3></div>
              <form onSubmit={handleSignUp}>
                <div className='body_signup  '>
                <p className='errors text-danger '>{formErrors.backend}</p>
                  <div>
                    <label className='form-label'>User Name</label>
                    <input onChange={handleChange} value={formValues.username} className='form-control  form-control-sm' htmlFor="username" id='username' name='username' />
                  </div>
                  <p className='errors text-danger '>{formErrors.username}</p>
                  <div>
                    <label className='form-label'>Email</label>
                    <input className='form-control form-control-sm' onChange={handleChange} value={formValues.email} type="text" id="email" name='email' />
                  </div>
                  <p className='errors text-danger '>{formErrors.email}</p>
                  <div>
                    <label className='form-label'>Password</label>
                    <input className='form-control form-control-sm' onChange={handleChange} value={formValues.password} type='password' id='password' name='password' />
                  </div>
                  <p className='errors text-danger '>{formErrors.password}</p>
                  <div>
                    <label className='form-label'>Confirm password</label>
                    <input className='form-control form-control-sm' onChange={handleChange} value={formValues.confirmpassword} type='password' id='confirmpassword' name='confirmpassword' />
                  </div>
                  <p className='errors text-danger '> {formErrors.confirmpassword}</p>
                  <div>
                    <button className='btn  btn-dark my-3' type='submit' >SignUp</button>
                  </div>
                  <div>
                    <p>Already have a Account? <Link to="/signin"><small className='link text-decoration-none'>LOGIN</small></Link> </p>
                  </div>
                </div>
              </form>

            </div>
            <div className='col-md-6'>
              <img className='img_signup' src='https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGRhcmslMjBpbWFnZXMlMjB3aXRoJTIwd2hpdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60' alt='signUp' />

            </div>
          </div>
        </div>



      </div>

    </div>

  )
}

export default SignUp
