import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import { registerRoute } from '../utils/APIRoutes';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const theme = createTheme();

export const Register=({notify})=>{

  const navigate=useNavigate();


  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const values={
      email:data.get('email'),
      password:data.get('password'),
      username:data.get('username'),
      confirmpswd:data.get('confirmpassword')
    }
    if(handleValidation(values)){
      const {data} = await axios.post(registerRoute,values);
      if(data.status===false){
        notify("warn",data.msg);
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
        notify(false,"Successfully Registered");
        navigate("/");
      }
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate('/');
    }
  })

  const handleValidation=(values)=>{
      if(values.email==="" || values.password==="" || values.username==="" || values.confirmpswrd===""){
        notify(true,"No Field should be Empty");
        return false
      }
      else if(values.password !== values.confirmpswd ){
        notify(true,"Password Doesn't match");
        return false
      }
      else{
        return true
      }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="given-name"
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="confirmPassword"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}