import {
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Copyright from '../../utils/copyright';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import { AUTH_USER_SUCCESS } from '../../utils/Helpers/Constant';
import Toaster from '../../components/Toaster/Toaster';
import { LottiedefaultOptions } from '../../utils/Comibined';
import Lottie from 'react-lottie';

const Login = () => {
  const [creds, setCreds] = useState({ userOrEmail: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!creds.userOrEmail) {
      Toaster().fire({
        icon: 'error',
        title: 'Enter username or email',
      });

      return;
    }

    if (!creds.password) {
      Toaster().fire({
        icon: 'error',
        title: 'Enter password!',
      });

      return;
    }
    setIsLoading(true);
    const data = await fetcher.post({
      url: '/api/v1/auth/login',
      body: creds,
    });
    if (data.success) {
      localStorage.setItem('auth', data.token);
      dispatch?.({
        type: AUTH_USER_SUCCESS,
        payload: { data: data.data, token: data.token },
      });
      setIsLoading(false);
      navigate('/');
    } else {
      setIsLoading(false);
      Toaster().fire({
        icon: 'error',
        title: data.message,
      });
    }
  };

  const defaultOptions2 = LottiedefaultOptions;
  return (
    <Container component='main'>
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={4} md={7}>
          <Lottie options={defaultOptions2} />
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: '#1769aa' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                type='text'
                id='userOrEmail'
                label='Enter Username or Email'
                name='userOrEmail'
                autoComplete='userOrEmail'
                autoFocus
                onChange={(e) =>
                  setCreds({
                    userOrEmail: e.target.value,
                    password: creds.password,
                  })
                }
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPass ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                onChange={(e) =>
                  setCreds({
                    userOrEmail: creds.userOrEmail,
                    password: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e: any) => setShowPass(e.target.checked)}
                    value='remember'
                    color='primary'
                  />
                }
                label='Show password'
              />
              {isLoading ? (
                <Button fullWidth disabled sx={{ mt: 3, mb: 2 }}>
                  Please wait...
                </Button>
              ) : (
                <Button
                  type='submit'
                  fullWidth
                  variant='outlined'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              )}
              <Grid container>
                <Grid item xs textAlign={'center'}>
                  <Link to='/forget-password'>Forgot password?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Copyright />
    </Container>
  );
};

export default Login;
