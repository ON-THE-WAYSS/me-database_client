import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Divider,
  Drawer,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateNgoModal from '../../components/AddMe/CreateNgoModal';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
// import Avatar from '@mui/material/Avatar';
import { filterStatus } from '../../components/filterStatus/filterStatus';
import { fetchFilterApi } from '../../components/filterCommonFetch/filterData';
import PageTitle from '../../components/PageTitle/PageTitle';
import TableLoader from '../../components/loading/TableLoader';
// import { ImgUrl } from '../../utils/Helpers/Constant';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import TuneIcon from '@mui/icons-material/Tune';
type IGetIDProps = {
  divisionId: string | null;
  districtId: string | null;
  thanaId: string | null;
  areaId: string | null;
};

interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
export default function Ngo(props: Props) {
  const [allNgo, setAllNgo] = useState([]);
  const { window } = props;
  const { token } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [getID, setGetID] = useState<IGetIDProps>({
    divisionId: null,
    districtId: null,
    thanaId: null,
    areaId: null,
  });

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const finalData = await fetchFilterApi({
          token,
          districtId: getID.districtId,
          divisionId: getID.divisionId,
          areaId: getID.thanaId,
        });
        let uri = '?';
        if (getID.divisionId && getID.divisionId !== 'all') {
          uri += `division=${getID.divisionId}&`;
        }
        if (getID.districtId && getID.districtId !== 'all') {
          uri += `district=${getID.districtId}&`;
        }
        if (getID.thanaId && getID.thanaId !== 'all') {
          uri += `thana=${getID.thanaId}&`;
        }
        if (getID.areaId && getID.areaId !== 'all') {
          uri += `area=${getID.areaId}&`;
        }
        setFilterData(finalData!);
        const res = await fetcher.get(`/api/v1/ngo${uri}`, token);
        if (res.success) {
          setAllNgo(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [getID, token]);
  const getStatusFilterData = filterStatus;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Filter
      </Typography>
      <Divider />
      <Box sx={{ padding: '15px' }}>
        {getStatusFilterData({
          filterData: filterData,
          setGetID: setGetID,
          getID: getID,
        })}
      </Box>
    </Box>
  );
  const containers =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Container sx={{ mt: 1 }} maxWidth='xl'>
      <PageTitle title={'NGO LIST'} />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
        mt={1}
      >
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              action={
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Button
                      variant='contained'
                      onClick={() => setOpen(true)}
                      sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                    >
                      Add Ngo
                    </Button>

                    <IconButton
                      color='inherit'
                      aria-label='open drawer'
                      edge='start'
                      onClick={handleDrawerToggle}
                      sx={{ display: { sm: 'none' } }}
                    >
                      <TuneIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        alignItems: 'center',
                        marginX: '10px',
                      }}
                    >
                      {getStatusFilterData({
                        filterData: filterData,
                        setGetID: setGetID,
                        getID: getID,
                      })}
                      <Button variant='contained' onClick={() => setOpen(true)}>
                        Add Ngo
                      </Button>
                    </Box>
                  </Box>
                  <Box component='nav'>
                    <Drawer
                      container={containers}
                      variant='temporary'
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                      sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                          boxSizing: 'border-box',
                          width: drawerWidth,
                        },
                      }}
                    >
                      {drawer}
                    </Drawer>
                  </Box>
                </>
              }
            />
            <TableContainer>
              <Table aria-label='simple table' sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: '700' }} align='center'>
                      Serial
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: '700' }} align='center'>
                      PHOTO
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: '700' }} align='center'>
                      NAME
                    </TableCell>
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

                    <TableCell sx={{ fontWeight: '700' }} align='center'>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableLoader />
                  ) : (
                    <>
                      {allNgo?.length ? (
                        <>
                          {allNgo?.map((sNgo: any, index: number) => {
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
                                  {index + 1}
                                </TableCell>
                                {/* <TableCell align='center'>
                                  <Avatar
                                    variant='circular'
                                    src={
                                      sNgo.image
                                        ? `${ImgUrl}/ngo_files/${sNgo.image}`
                                        : '/src/assets/avatar.png'
                                    }
                                  />
                                </TableCell> */}
                                <TableCell align='center'>
                                  {sNgo.name}
                                </TableCell>

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

                                <TableCell align='center'>
                                  <Link to={`/ngo/${sNgo.id}`}>
                                    <VisibilityIcon color='primary' />
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={100}
                            align='center'
                            sx={{ fontWeight: 'bold', pt: 3, fontSize: '18px' }}
                          >
                            No data found
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <CreateNgoModal
            open={open}
            handleClose={() => setOpen(false)}
            setAllNgo={setAllNgo}
            allNgo={allNgo}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
