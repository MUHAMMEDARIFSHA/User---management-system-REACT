import React, { useEffect, useState,useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



function AdminUserAdd() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [password,setPassword] =useState("")
  const [error, setError] = useState('');
  const theme = createTheme();
  const fileRef = useRef()
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    console.log("add user in admin side");
    const file = fileRef.current.files[0]
    console.log(file)
    let formData = new FormData();
    formData.append("image",file, file?.name)
    formData.append('username',username);
    formData.append('email',email)
    formData.append("password",password)
    console.log(formData+"form data");
   await axios.post('http://localhost:9000/admin/adduser', formData, {headers: { 'x-access-token':localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'}})
   .then(res=>{
    console.log("then");
    if(res.status===200){
      console.log("user saved");
      navigate('/admin')
    }
   })
 }
//  const searchHandler = (e) => {
//     console.log("search");
//     const data = {
//       search
//     }
//     axios.post('http://localhost:9000/admin/search', data, {headers: {'x-access-token': localStorage.getItem('token')}})
//     .then(res=>{
//       console.log(res.data.users+"  users");
     
//     })
    
    
//   }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" sx={{ marginTop: '7rem' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}style={{ width: '80px', height:'80px', borderRadius: '50%' }} src={image} >
          <LockOutlinedIcon />
        </Avatar>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={submitHandler}
        >
          <p className="error" style={{ marginBottom: '1rem' }}>
            {error}
          </p>
          <Grid container spacing={2}>
            {/* <p className='error'>{registerState.error.error && registerState.error.error}</p> */}
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Profile Picture
                <input
                  type="file"
                  name="image"
                  hidden
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          
          >
            Submit

         
        </Button>
      </Box>
    </Box>
  </Container>
</ThemeProvider>
  )
}

export default AdminUserAdd
