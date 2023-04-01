import React, { useEffect, useState ,useRef} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate,Link } from 'react-router-dom'
import Avatar from "react-avatar-edit"
import { Dialog } from 'primereact/dialog';
import axios from 'axios'

import { Button } from 'primereact/button';
import './Home.css'
        
        


import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../actions/authActions';



function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileRef = useRef()
  const [user,setUser] = useState('')
  const [email,setEmail]= useState('')
  const [created,setCreated]=useState('')
  const [image,setImage]=useState('')
  const [imageCrop,setImageCrop] = useState("")
  const [src,setSrc]=useState(false)
  const [profile,setProfile]=useState([])
  const [pview,setPview]=useState(false)
  const [error,setError] = useState("")
  const img ='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'

  const profileFinal = profile.map((item)=> item.pview)
  // setImage(profileFinal)
  
  
  const placeholderImage ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"

  const onClose=()=>{
    setPview(null)
  }

  const onCrop =(view)=>{
setPview(view)
  }

  const saveCropImage=()=>{
    setProfile([...profile,{pview}])
   
    setImageCrop(false)
  }

  let userData
  let imgUrl
  // fetch user details 
  async function populateUser(){
     await fetch('http://localhost:9000/users/quote',{

    headers:{
      'x-access-token':localStorage.getItem('token')
    }
   }) .then(response => response.json())
   .then(data => 
    
   userData =data.user[0] )
   .catch(error => console.error(error));
   setUser(userData.username)
   setEmail(userData.email)
   setCreated(new Date(userData.createdAt).toLocaleDateString())
   setSrc("http://localhost:9000"+userData.image.slice(21))
   
   
  }
  console.log(src +" image src 1");
  console.log(email);
  
  useEffect(()=>{
    console.log("inside useeffect in home");
  const token = localStorage.getItem('token')
  if(token){
    const email= jwt_decode(token);
    console.log(email+"email in useeffect");
    console.log(email);
    if (!email){
      localStorage.removeItem('token')
      dispatch(clearAuth())
  navigate('/signin')
    }
    else{
      populateUser()
    }
  }
  },[])
  const handleDp = async(e)=>{
    e.preventDefault()
    const file = fileRef.current.files[0]
    console.log(file)
    let formData = new FormData();
    formData.append("image",file, file?.name)
   await axios.patch('http://localhost:9000/users/update', formData, {headers: { 'x-access-token':localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'}})
   .then(res => {
    if (res.data.success) {
      console.log("profile updated");
      const url = res.data.url
      console.log(url+" url of image updated");
      setSrc(url)
      }
    })
  
  }
  const logout = ()=>{
    localStorage.removeItem('token')
    dispatch(clearAuth())
    navigate('/signin')
      }
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <p className="navbar-brand cursor-pointer"> Welcome ,{user}</p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
  </div>
  <div className='d-flex'>


   {localStorage.length===0 ? <Link to="/signin"><button className='btn btn-outline-secondary'>SignIn</button> </Link>:<button onClick={logout} className='btn btn-outline-danger'>Logout</button> }  
   
   {localStorage.length===0 ? <Link to='/signup'><button className='btn btn-outline-secondary ml-3'>SignUp</button></Link>:"" }  
  </div>
</nav>
<div className='Card_div'>

    

    <div className="total" style={{ backgroundColor:'black' }}>
      {user? 
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard className='card_profile' style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', height:'180px', borderRadius: '50%' }}
                      // src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      // src={profileFinal.length ? profileFinal:img}
                      src= {src.length ? src : placeholderImage}
                      alt='Generic placeholder image'
                      onClick={()=>setImageCrop(true)}
                      fluid />
                     
                  </div>
                 
                  <div className="flex-grow-1 ml-4">
                    <MDBCardTitle>{user}</MDBCardTitle>
                    <MDBCardText>{email}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef', width:'200px' }}>
                      <div>
                        <p className="xl text-muted mb-1">Account Created</p>
                        <p className="mb-0">{created}</p>
                      </div>
                     
                     
                    </div>

                    {/* Dialog content for crop */}
                    <Dialog className="dialog"
                    visible={imageCrop}
                    header={()=>{

                      <p htmlFor="" className='text-2xl font-semibold textColor' >Update profile</p>
                    }}
                    onHide={()=>setImageCrop(false)} 
                    >
                      <div className='confirmation-content flex flex-column align-items-center'>
                        <Avatar  
                        width={500}
                        height={400}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                        shadingColor={'#ffffff'}
                        backgroundColor={'#ffffff' }
                      
                        />

                        <div className='flex flex-column align-items-center mt-5 w12'>
                        <div className='flex justify-content-around w-12  mt-2'>
                          <Button className='btn  btn-primary'
                          onClick={saveCropImage}
                        label="Save"
                          icon="pi pi-check" />
                      </div>
                         </div>
                         </div>
                   </Dialog>
                    {/* Dialog content for crop */}

                 <form onSubmit={handleDp} encType='multipart/form-data' >
                    <input ref={fileRef}  className='img_button 'onChange={(event)=>{ setImage(URL.createObjectURL(event.target.files[0]));
                    
                      }} type="file" accept='/image/*' />
                    <button className='btn btn-outline-secondary btn-sm mt-2 ' type='submit'>Add profile photo </button>
                    </form>
                  </div>
                </div>
                <div>
                  <small className='text-secondary'>Click profile to change image</small>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    : <h1>LOGIN</h1>}
    </div>



</div>

    </div>
  )
}

export default Home
