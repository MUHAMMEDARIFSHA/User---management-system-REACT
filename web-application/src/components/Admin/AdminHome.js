import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchAppBar from './Navbar';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import AdminBody from './AdminBody';
import { useNavigate,Link } from 'react-router-dom';
import '../Admin/Admin.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';

function AdminHome() {
 const [users,setUsers]= useState([])
 const [src,setSrc] = useState('')
 const navigate = useNavigate()
 const placeholderImage ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
 let count=1
 let imgUrl
    function getUsers() {
        console.log("get user details");
        axios.get("http://localhost:9000/admin/get-users",{headers: { 'x-access-token':localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'}}).then(res => {
            if (res.status == 200) {
                console.log("hi");
                console.log(res.data.users);
                setUsers(res.data.users)
                
            } else {
                console.log('no users found');
            }

        })
    }
   const deleteUser = async(id)=>{
console.log("delete user");
console.log(id);
const data = {id}
console.log(data);
await axios.patch("http://localhost:9000/admin/delete-user",data)
.then(res=>{
  if (res.status == 200) {
    console.log("user deleted");
    window.location.reload();
    } else {
    console.log('user not deleted');
}

})

   }
   const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/admin/signin')
  }

    useEffect(() => {
        getUsers()
        
    }, [])
    console.log(users);
    return (
        <div>
            <SearchAppBar/>
            <div className='d-flex justify-content-end '> 
            {localStorage.length===0 ? <Link to="/admin/signin"><button className='btn btn-outline-secondary m-4'>SignIn</button> </Link>:<button onClick={logout} className='btn btn-outline-danger m-4'>Logout</button> } 
            </div>
          
            <Container>
            <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell className='head '>Sl.No</TableCell>
            <TableCell  className='head'>IMAGE</TableCell>
            <TableCell  className='head'>Name</TableCell>
            <TableCell  className='head'>Email</TableCell>
            <TableCell  className='head'>Created At</TableCell>
           
            <TableCell className='head'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
          {users.map((user) => (
           
            <TableRow className='tableRow'
              key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {count++}
              </TableCell>
              <TableCell > <img style={{ width: '80px', height:'80px', borderRadius: '50%' }}
                src={ user.image ?"http://localhost:9000"+user.image.slice(21): placeholderImage}/></TableCell>
              <TableCell >{user.username} </TableCell>
              <TableCell >{user.email}</TableCell>
              <TableCell >{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell><button className='btn btn-outline-secondary' onClick={()=>navigate(`/admin/edit/${user._id}`)}>Edit</button> 
                <button className='btn btn-outline-danger ml-3' onClick={()=>deleteUser(user._id)}>Delete</button></TableCell>
            </TableRow>
            ))}
        </TableBody>
          
      </Table>
    </TableContainer>
      </Container>
        </div>
    )
}

export default AdminHome
