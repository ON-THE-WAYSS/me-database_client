import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  Box,
  Container,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';
import Copyright from '../../utils/copyright';
import SendIcon from '@mui/icons-material/Send';
import Toaster from '../../components/Toaster/Toaster';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { LottiedefaultOptions } from '../../utils/Comibined';
import Lottie from 'react-lottie';

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOTPField, setShowOTPField] = useState<boolean>(false);
  const [password, setPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: '',
    confirmPassword: '',
  });
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [showNewPasswordField, setShowNewPasswordField] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (email && !otp) {
      try {
        const data = await fetcher.post({
          url: `/api/v1/common/send-email-otp`,
          body: {
            email: email,
            type: 'reset',
          },
        });
        if (data.success) {
          Toaster().fire({
            icon: 'success',
            title: `${data.message}`,
          });
          setIsLoading(false);
          setShowOTPField(!showOTPField);
        } else {
          Toaster().fire({
            icon: 'error',
            title: `${data.message}`,
          });
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        Toaster().fire({
          icon: 'error',
          title: error.response.data.message,
        });
      }
    }
    if (otp && email) {
      try {
        const data = await fetcher.post({
          url: `/api/v1/common/match-email-otp`,
          body: {
            email: email,
            otp: otp,
            type: 'reset',
          },
        });
        if (data.success) {
          Toaster().fire({
            icon: 'success',
            title: `Successfully token verified`,
          });
          setToken(data.token);
          setShowNewPasswordField(!showNewPasswordField);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        Toaster().fire({
          icon: 'error',
          title: error.response.data.message,
        });
      }
    }
    if (password.password && password.confirmPassword && email && token) {
      if (password.password !== password.confirmPassword) {
        Toaster().fire({
          icon: 'error',
          title: 'Passwords do not match',
        });
        return;
      }
      try {
        const data = await fetcher.post({
          url: `/api/v1/auth/reset-password`,
          body: {
            token: token,
            email: email,
            password: password.password,
          },
        });
        if (data.success) {
          Toaster().fire({
            icon: 'success',
            title: `${data.message}`,
          });
          setIsLoading(false);
          navigate(`/login`);
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        Toaster().fire({
          icon: 'error',
          title: error?.response?.data.message,
        });
      }
    }
  };

  const loadingBtn = (
    <LoadingButton
      endIcon={<SendIcon />}
      loading={isLoading}
      loadingPosition='end'
      sx={{ mt: 1.5 }}
      fullWidth
      variant='contained'
      color='primary'
    >
      Loading
    </LoadingButton>
  );

  let content = (
    <>
      <Box
        sx={{
          typography: 'body2',
          position: 'relative',
          top: 10,
          fontWeight: 'light',
        }}
      >
        <small>Enter your email to get OTP:</small>
      </Box>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        prefix='Enter your email to get OTP:'
        label='Email'
        autoComplete='email'
        variant='outlined'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isLoading ? (
        <Button
          sx={{ mt: 1.5 }}
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
        >
          Send OTP
        </Button>
      ) : (
        loadingBtn
      )}
    </>
  );

  const opt = (
    <>
      <Box
        sx={{
          typography: 'body2',
          position: 'relative',
          top: 10,
          fontWeight: 'light',
        }}
      >
        <small>Enter your OTP:</small>
      </Box>
      <TextField
        margin='normal'
        required
        fullWidth
        id='otp'
        label='OTP'
        type='text'
        variant='outlined'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {!isLoading ? (
        <Button
          sx={{ mt: 1.5 }}
          type='submit'
          fullWidth
          variant='outlined'
          color='primary'
        >
          Submit
        </Button>
      ) : (
        loadingBtn
      )}
    </>
  );

  const passwordField = (
    <>
      <Box
        sx={{
          typography: 'body2',
          position: 'relative',
          top: 15,
          fontWeight: 'light',
        }}
      >
        <small>Enter your new password:</small>
      </Box>
      <TextField
        sx={{ mt: 3 }}
        margin='normal'
        required
        fullWidth
        label='New Password'
        variant='outlined'
        type={`${showPassword ? 'text' : 'password'}`}
        id='password'
        value={password.password}
        onChange={(e) => setPassword({ ...password, password: e.target.value })}
      />
      <TextField
        sx={{ mt: 3 }}
        margin='normal'
        required
        fullWidth
        label='Confirm Password'
        variant='outlined'
        type={`${showPassword ? 'text' : 'password'}`}
        id='conform-password'
        value={password.confirmPassword}
        onChange={(e) =>
          setPassword({ ...password, confirmPassword: e.target.value })
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            onClick={() => setShowPassword(!showPassword)}
            value={showPassword}
            color='primary'
          />
        }
        label='Show Password'
      />
      {!isLoading ? (
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Reset Password
        </Button>
      ) : (
        loadingBtn
      )}
    </>
  );

  if (showOTPField) {
    content = opt;
  }
  if (showNewPasswordField) {
    content = passwordField;
  }
  const defaultOptions2 = LottiedefaultOptions;
  return (
    <Container component='main'>
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={4} md={7}>
          <Lottie options={defaultOptions2} />
          {/* <img width='100%' src={loginImg} alt='' /> */}
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Forget Password
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {content}
              <Grid container mt={1}>
                <Grid item xs textAlign={'center'}>
                  <Link to='/login'>Login</Link>
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

export default ForgetPassword;
