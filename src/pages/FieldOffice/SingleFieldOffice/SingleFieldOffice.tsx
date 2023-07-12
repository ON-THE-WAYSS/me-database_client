import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import fetcher from '../../../utils/Helpers/Fetcher/fetchApi';
import { IMeList, ISingleNgo } from '../../../utils/Type/type';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableLoader from '../../../components/loading/TableLoader';
import { ImgUrl } from '../../../utils/Helpers/Constant';
import { useAuthContext } from '../../../Context/AuthContext/AuthContext';

const SingleFieldOffice = () => {
  const { id } = useParams();
  const [singleNgo, setSingleNgo] = useState<ISingleNgo>({} as ISingleNgo);
  const [loading, setLoading] = useState(false);
  const [meList, setMeList] = useState<IMeList[]>([]);
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
  } = singleNgo;

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(`/api/v1/me?field_office=${id}`, token);
        if (res.success) {
          setMeList(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(`/api/v1/field-office/${id}`, token);

        if (res.success) {
          setSingleNgo(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [id]);
  console.log({ singleNgo });
  return (
    <>
      <Container>
        {' '}
        <Typography pl={2}>Branch id: {id}</Typography>
      </Container>

      <Container sx={{ marginY: 5 }}>
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
              <Typography variant='h5' color='text.primary'>
                Information
              </Typography>
              <Avatar
                sx={{ width: '90px', height: '90px' }}
                variant='square'
                src={
                  image
                    ? `${ImgUrl}/field_office_files/${image}`
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
              {/* <Grid item xs={12} md={4} lg={4}>
                <Typography
                  fontWeight='bold'
                  color='text.primary'
                  gutterBottom
                  display='inline'
                >
                  Username:{' '}
                </Typography>
                {user_name}
              </Grid> */}
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
                {status ? 'Active' : 'Deactivated'}
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
      <Container>
        <Grid mx={'auto'} container xs={12}>
          <TableContainer component={Paper} elevation={5}>
            <Box py={2}>
              <Typography
                variant='subtitle1'
                fontWeight={'bold'}
                marginLeft={2}
              >
                Branch ME
              </Typography>
            </Box>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '700' }}>SERIAL</TableCell>
                  {/* <TableCell sx={{ fontWeight: '700' }}>PHOTO</TableCell> */}
                  <TableCell sx={{ fontWeight: '700' }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: '700' }} align='center'>
                    OCCUPATION
                  </TableCell>
                  <TableCell sx={{ fontWeight: '700' }} align='center'>
                    DISTRICT NAME
                  </TableCell>
                  <TableCell sx={{ fontWeight: '700' }} align='center'>
                    ADDRESS
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
                    {meList.map((me: IMeList, index: number) => {
                      return (
                        <TableRow
                          key={me.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {index + 1}
                          </TableCell>
                          {/* <TableCell align='left'>
                            <Avatar
                              variant='circular'
                              src={
                                me.photo
                                  ? `${ImgUrl}/me_files/${me.photo}`
                                  : '/src/assets/avatar.png'
                              }
                            />
                          </TableCell> */}
                          <TableCell align='left'>{me.name}</TableCell>
                          <TableCell align='center'>{me.occupation} </TableCell>
                          <TableCell align='center'>
                            {me.district_name}
                          </TableCell>
                          <TableCell align='center'>{me.address}</TableCell>
                          <TableCell>
                            <Link to={`/me/${me.id}`}>
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
        </Grid>
      </Container>
    </>
  );
};

export default SingleFieldOffice;
