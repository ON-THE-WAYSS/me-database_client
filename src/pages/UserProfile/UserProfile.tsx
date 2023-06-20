import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import profilePhoto from '../../assets/profile_img.jpg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@material-ui/core';

export default function UserProfile() {
  return (
    <>
      <Grid container alignItems='center' justifyContent='center' spacing={2}>
        <Grid container justifyContent='center' xs={12} md={6}>
          <Box alignSelf='center'>
            <img
              src={profilePhoto}
              style={{
                border: '1px solid gray',
                padding: '2px',
                borderRadius: '50%',
                marginLeft: '30px',
              }}
              width='120'
              height='120'
              alt=''
            />

            <Typography align='center'>
              <Typography variant='h6'> John Doe</Typography>
              <Typography> Web Developer</Typography>
              <Typography>Company: M360ICT</Typography>
              <Typography>Banani,Dhaka,Bangladesh</Typography>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 500 }} aria-label='simple table'>
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>Name:</TableCell>
                  <TableCell align='right'>Jhon Doe</TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>Father Name:</TableCell>
                  <TableCell align='right'>SR. Jhon Doe</TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>Mother Name:</TableCell>
                  <TableCell align='right'>Ms. Doe</TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='right'>DOB:</TableCell>
                  <TableCell align='right'>10/5/1990</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
