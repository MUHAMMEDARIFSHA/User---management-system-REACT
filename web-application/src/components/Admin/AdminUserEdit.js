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

function AdminUserEdit() {
  const navigate = useNavigate();
  const imageRef = useRef()
  const fileRef = useRef()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const theme = createTheme();
  let { id } = useParams();
  let userData

  const submitHandler =async (e) => {
   e.preventDefault()
   const user = {
    username,
    email
   }
   const formData = new FormData()
   formData.append('username', username)
   formData.append('email', email)
     
  await axios.put(`http://localhost:9000/admin/user-edit/${id}`,{email,username})
   .then(response => {
    console.log(response)
    if(response.status===200){
        console.log("user updated");
      navigate('/admin')
    }else{
      setError(response.data.error)
    }
   })
   .catch(error => {
    console.log(error)
   })

  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/admin/user-edit/${id}`)
      .then((response) => {
        if (response.status===200) {
         console.log("data");
         userData = response.data.user
         console.log(userData[0]);
         setUsername(userData[0].username)
         setEmail(userData[0].email)
         setImage(userData[0].image)
        } else {
          navigate('/admin')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, navigate]);
console.log(username +" username");
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}style={{ width: '80px', height:'80px', borderRadius: '50%' }} src={image ?"http://localhost:9000"+image.slice(21):""}>
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
                  id="name"
                  label="Name"
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

              {/* <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Profile Picture
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                </Button>
              </Grid> */}
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

export default AdminUserEdit
