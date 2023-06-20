import { useState } from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';

import ModalForPassword from '../../components/ModalComponent/ModalForPassword';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import { ImgUrl } from '../../utils/Helpers/Constant';
function Profile() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: '900px', padding: '15px', margin: '0 auto' }}
    >
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        my={1}
        p={3}
      >
        <Typography variant='h5'>Personal Details</Typography>
        <img
          src={
            user.image
              ? `${ImgUrl}/ngo_files/${user.image}`
              : '/src/assets/MaleAvatar.jpg'
          }
          width='100px'
          style={{ borderRadius: '50%' }}
          height='100px'
          alt=''
        />
      </Grid>
      <Divider />
      <Grid container justifyContent='space-between' gap={2} p={3} mt={2}>
        <Grid container item xs={6} md={3} alignItems='center'>
          <Typography fontWeight='600' variant='subtitle1' pr={1}>
            Name:
          </Typography>
          {user.name}
        </Grid>
        <Grid container item xs={6} md={3} alignItems='center'>
          <Typography fontWeight='600' variant='subtitle1' pr={1}>
            User name:
          </Typography>
          {user.user_name ? user.user_name : 'Not provided'}
        </Grid>
        <Grid container item xs={6} md={4} alignItems='center'>
          <Typography fontWeight='600' variant='subtitle1' pr={1}>
            E-mail:
          </Typography>
          {user.email}
        </Grid>
        {user.address ? (
          <Grid container item xs={6} md={3} alignItems='center'>
            <Typography fontWeight='600' variant='subtitle1' pr={1}>
              Address:
            </Typography>
            {user.address}
          </Grid>
        ) : (
          ''
        )}
        {user.thana_name ? (
          <Grid container item xs={6} md={3} alignItems='center'>
            <Typography fontWeight='600' variant='subtitle1' pr={1}>
              Thana:
            </Typography>
            {user.thana_name}
          </Grid>
        ) : (
          ''
        )}
        {user.district_name ? (
          <Grid container item xs={6} md={3} alignItems='center'>
            <Typography fontWeight='600' variant='subtitle1' pr={1}>
              District :
            </Typography>
            {user.district_name}
          </Grid>
        ) : (
          ''
        )}
        {user.division_name ? (
          <Grid container item xs={6} md={3} alignItems='center'>
            <Typography fontWeight='600' variant='subtitle1' pr={1}>
              Division :
            </Typography>
            {user.division_name}
          </Grid>
        ) : (
          ''
        )}
        {user.area_name ? (
          <Grid container item xs={6} md={3} alignItems='center'>
            <Typography fontWeight='600' variant='subtitle1' pr={1}>
              Union name :
            </Typography>
            {user.area_name}
          </Grid>
        ) : (
          ''
        )}
        <Grid container item xs={6} md={3} alignItems='center'>
          <Typography fontWeight='600' variant='subtitle1' pr={1}>
            Type:
          </Typography>
          {user.type}
        </Grid>
      </Grid>

      <Button onClick={() => setOpen(true)} variant='contained' sx={{ mt: 4 }}>
        Change Password
      </Button>
      <ModalForPassword open={open} handleClose={() => setOpen(false)} />
    </Paper>
  );
}

export default Profile;
