import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from '@mui/material/Modal';
import { TextField } from '@material-ui/core';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Toaster from '../Toaster/Toaster';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import ButtonLoader from '../Spinner/ButtonLoader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export default function ModalForPassword({ open, handleClose }: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem('auth');

  const onSubmit = (inputData: any) => {
    setLoading(true);
    if (inputData.new_password !== inputData.retype_password) {
      Toaster().fire({
        icon: 'error',
        title: 'Password does not match',
      });
      handleClose();
      setLoading(false);
    }
    if (inputData.new_password.length < 8) {
      Toaster().fire({
        icon: 'error',
        title: 'Password must be at least 8 characters',
      });
      handleClose();
      setLoading(false);
    }
    const { retype_password, ...rest } = inputData;

    try {
      (async () => {
        const data = await fetcher.post({
          url: `/api/v1/auth/change-password`,
          body: { ...rest, token },
        });
        if (data.success) {
          Toaster().fire({
            icon: 'success',
            title: data.message,
          });
          handleClose();
          setLoading(false);
        } else {
          Toaster().fire({
            icon: 'error',
            title: data.message,
          });
          handleClose();
          setLoading(false);
        }
      })();
    } catch (error: any) {
      handleClose();
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} onSubmit={handleSubmit(onSubmit)} component='form'>
          <TextField
            id='outlined-password-input'
            label='Enter current password'
            type='text'
            required
            {...register('old_password')}
          />

          <Box pt={2}>
            <FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Enter new password
              </InputLabel>
              <Input
                id='standard-adornment-password'
                type='text'
                required
                {...register('new_password')}
              />
            </FormControl>
          </Box>
          <Box pt={2}>
            <FormControl sx={{ width: '100%' }} variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Retype Password
              </InputLabel>
              <Input
                id='standard-adornment-password'
                type={showPassword ? 'text' : 'password'}
                {...register('retype_password')}
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          {loading ? (
            <ButtonLoader />
          ) : (
            <Button variant='outlined' sx={{ mt: 5 }} type='submit'>
              Change password
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}
