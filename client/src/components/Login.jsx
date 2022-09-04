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
import { loginRoute } from '../utils/APIRoutes';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const theme = createTheme();

export const Login=({notify})=>{

  const navigate=useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const values={
      email:data.get('email'),
      password:data.get('password'),
    }
    if(handleValidation(values)){
      const {data} = await axios.post(loginRoute,values);
      if(data.status===false){
        notify("warn",data.msg);
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
        notify(false,"Successfully Loged in");
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
      if(values.email==="" || values.password===""){
        notify(true,"No Field should be Empty");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="emial"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}