import {
  Box,
  Container,
  MenuItem,
  Grid,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  IconButton,
  Typography,
  Drawer,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateFieldOffice from '../../components/AddMe/CreateFieldOffice';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
// import Avatar from '@mui/material/Avatar';
import { fetchFilterApi } from '../../components/filterCommonFetch/filterData';
import { filterStatus } from '../../components/filterStatus/filterStatus';
import TableLoader from '../../components/loading/TableLoader';
import PageTitle from '../../components/PageTitle/PageTitle';
// import { ImgUrl } from '../../utils/Helpers/Constant';
import TuneIcon from '@mui/icons-material/Tune';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
type IGetIDProps = {
  ngoId: string | null;
  divisionId: string | null;
  districtId: string | null;
  thanaId: string | null;
  areaId: string | null;
};

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
export default function FieldOffice(props: Props) {
  const { window } = props;
  const { user, token } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [allFieldOffice, setAllFieldOffice] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState<any[]>([]);

  const [getID, setGetID] = useState<IGetIDProps>({
    divisionId: null,
    ngoId: null,
    districtId: null,
    thanaId: null,
    areaId: null,
  });

  useEffect(() => {
    try {
      (async () => {
        const finalData = await fetchFilterApi({
          token,
          districtId: getID.districtId,
          divisionId: getID.divisionId,
          areaId: getID.thanaId,
        });
        setFilterData(finalData!);

        let uri = '?';
        if (user.type === 'admin') {
          if (getID.ngoId && getID.ngoId !== 'all') {
            uri += `ngo=${getID.ngoId}&`;
          }
        } else {
          uri += `ngo=${user.ngo_id}&`;
        }

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
        const data = await fetcher.get(`/api/v1/field-office${uri}`, token);

        if (data.success) {
          setAllFieldOffice(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [getID, token, user]);

  const getStatusFilterData = filterStatus;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Filter
      </Typography>
      <Divider />
      <Box sx={{ padding: '15px' }}>
        {user.type === 'admin' ? (
          <FormControl
            size='small'
            variant='outlined'
            sx={{ width: { xs: '100%', sm: '110px' }, marginY: { xs: '8px' } }}
          >
            <InputLabel>NGO</InputLabel>
            <Select
              // value={status}
              onChange={(e) => setGetID({ ...getID, ngoId: e.target.value })}
              label='NGO'
              autoWidth
              defaultValue={'all'}
            >
              <MenuItem value='all'>All</MenuItem>
              {filterData[1]?.data.map((statusOption: any) => (
                <MenuItem key={statusOption.id} value={statusOption.id}>
                  {statusOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ''
        )}
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
      <PageTitle title={'Branch list'} />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
        mt={1}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              action={
                <>
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      variant='contained'
                      onClick={() => setOpen(true)}
                      sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                    >
                      Add field officer
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
                      {user.type === 'admin' ? (
                        <FormControl
                          size='small'
                          variant='outlined'
                          sx={{ width: '110px' }}
                        >
                          <InputLabel>NGO</InputLabel>
                          <Select
                            // value={status}
                            onChange={(e) =>
                              setGetID({ ...getID, ngoId: e.target.value })
                            }
                            label='NGO'
                            autoWidth
                            defaultValue={'all'}
                          >
                            <MenuItem value='all'>All</MenuItem>
                            {filterData[1]?.data.map((statusOption: any) => (
                              <MenuItem
                                key={statusOption.id}
                                value={statusOption.id}
                              >
                                {statusOption.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        ''
                      )}
                      {getStatusFilterData({
                        filterData: filterData,
                        setGetID: setGetID,
                        getID: getID,
                      })}
                      <Button variant='contained' onClick={() => setOpen(true)}>
                        Create Branch
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
            <Divider />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: '700' }}>SERIAL</TableCell>
                    {/* <TableCell sx={{ fontWeight: '700' }}>PHOTO</TableCell> */}
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
                      {allFieldOffice?.length ? (
                        <>
                          {allFieldOffice?.map(
                            (sFieldOffice: any, index: number) => {
                              return (
                                <TableRow
                                  key={sFieldOffice.id}
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component='th' scope='row'>
                                    {index + 1}
                                  </TableCell>
                                  {/* <TableCell align='left'>
                                  <Avatar
                                    variant='circular'
                                    src={
                                      sFieldOffice.image
                                        ? `${ImgUrl}/field_office_files/${sFieldOffice.image}`
                                        : '/src/assets/avatar.png'
                                    }
                                  />
                                </TableCell> */}
                                  <TableCell align='left'>
                                    {sFieldOffice.name}
                                  </TableCell>

                                  <TableCell align='center'>
                                    {sFieldOffice.address}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {sFieldOffice.sub_district_name}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {sFieldOffice.district_name}
                                  </TableCell>
                                  <TableCell align='center'>
                                    {sFieldOffice.division_name}
                                  </TableCell>
                                  <TableCell align='center'>
                                    <Link to={`/branch/${sFieldOffice.id}`}>
                                      <VisibilityIcon color='primary' />
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={8}
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
        </Grid>
      </Grid>
      <CreateFieldOffice
        setAllFieldOffice={setAllFieldOffice}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Container>
  );
}
