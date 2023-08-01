import { Link, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import fetcher from '../../../utils/Helpers/Fetcher/fetchApi';
import { ISingleNgo } from '../../../utils/Type/type';
import TableLoader from '../../../components/loading/TableLoader';
import { ImgUrl } from '../../../utils/Helpers/Constant';
import {
  Box,
  CardContent,
  Container,
  Divider,
  Typography,
  Card,
  CardHeader,
} from '@mui/material';
import { useAuthContext } from '../../../Context/AuthContext/AuthContext';

export default function SingleNgo() {
  const { id } = useParams();
  const [singleNgo, setSingleNgo] = useState<ISingleNgo>({} as ISingleNgo);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const {
    address,
    area_name,
    district_name,
    division_name,
    image,
    name,
    phone,
    status,
    sub_district_name,
    user_name,
  } = singleNgo;

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(`/api/v1/ngo/${id}`, token);
        if (res.success) {
          console.log({ res });
          setSingleNgo(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [id, token]);

  return (
    <>
      <Container>
        {' '}
        <Typography pl={2}>Single NGO ID: {id}</Typography>
      </Container>
      <Container sx={{ mt: 4 }} maxWidth='xl'>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              <Link to={`all-me-ngo`}>
                <Button variant='outlined' size='small'>
                  All ME of this NGO
                </Button>
              </Link>
              <Typography variant='h5' color='text.primary'>
                Information
              </Typography>
              <Avatar
                sx={{ width: '90px', height: '90px' }}
                variant='square'
                src={
                  image
                    ? `${ImgUrl}/ngo_files/${image}`
                    : '/src/assets/avatar.png'
                }
              />
            </Box>
            <Divider />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              pt={2}
            >
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  display='inline'
                  gutterBottom
                >
                  Name:{' '}
                </Typography>
                {name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Username:{' '}
                </Typography>
                {user_name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Phone:{' '}
                </Typography>
                {phone}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Division:{' '}
                </Typography>
                {division_name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  District:{' '}
                </Typography>
                {district_name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Upazila:{' '}
                </Typography>
                {sub_district_name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Union:{' '}
                </Typography>
                {area_name}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Status:{' '}
                </Typography>
                {status ? 'Active' : 'Deactivate'}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Address:{' '}
                </Typography>
                {address}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mt: 4 }} maxWidth='xl'>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Branch' />
              <Divider />
              <TableContainer>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: '700' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>PHOTO</TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>NAME</TableCell>
                      <TableCell sx={{ fontWeight: '700' }} align='center'>
                        ADDRESS
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }} align='center'>
                        THANA
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }} align='center'>
                        DISTRICT
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }} align='center'>
                        DIVISION
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }} align='left'>
                        ACTION
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableLoader />
                    ) : (
                      <>
                        {singleNgo?.fieldOffice?.map((sNgo: any) => {
                          return (
                            <TableRow
                              key={sNgo.id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                {sNgo.id}
                              </TableCell>
                              <TableCell align='left'>
                                <Avatar
                                  variant='circular'
                                  src={
                                    sNgo.image
                                      ? `${ImgUrl}/field_office_files/${sNgo.image}`
                                      : '/src/assets/avatar.png'
                                  }
                                />
                              </TableCell>
                              <TableCell align='left'>{sNgo.name}</TableCell>

                              <TableCell align='center'>
                                {sNgo.address}
                              </TableCell>
                              <TableCell align='center'>
                                {sNgo.sub_district_name}
                              </TableCell>
                              <TableCell align='center'>
                                {sNgo.district_name}
                              </TableCell>
                              <TableCell align='center'>
                                {sNgo.division_name}
                              </TableCell>

                              <TableCell>
                                <Link to={`/branch/${sNgo.id}`}>
                                  <VisibilityIcon color='primary' />
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

/*
address,
area_name,
district_name
division_name,
image,
name,
phone,
status,
sub_district_name,
user_name
*/
