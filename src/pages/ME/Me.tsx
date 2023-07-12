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
  Typography,
  Divider,
  Drawer,
  IconButton,
  Pagination,
} from '@mui/material';
import { useState, useEffect } from 'react';
import MeTableRow from './MeTableRow';
import { fetchFilterApi } from '../../components/filterCommonFetch/filterData';
import { filterStatus } from '../../components/filterStatus/filterStatus';
import TableLoader from '../../components/loading/TableLoader';
import PageTitle from '../../components/PageTitle/PageTitle';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { IMeList, IFieldOffice } from '../../utils/Type/type';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate, useSearchParams } from 'react-router-dom';
type IGetIDProps = {
  categoryId: string | null;
  ngoId: string | null;
  fieldId: string | null;
  divisionId: string | null;
  districtId: string | null;
  thanaId: string | null;
  areaId: string | null;
};

interface Props {
  window?: () => Window;
}

interface IMeData {
  total: number;
  meList: IMeList[];
}
const limit = 20;

const drawerWidth = 240;
export default function Me(props: Props) {
  const { window } = props;
  const [meList, setMeList] = useState<IMeData>({ total: 0, meList: [] });
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '0');
  const navigate = useNavigate();
  const [fieldOffice, setFieldOffice] = useState<IFieldOffice[]>([]);
  const { user, token } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [getID, setGetID] = useState<IGetIDProps>({
    categoryId: null,
    divisionId: null,
    ngoId: null,
    fieldId: null,
    districtId: null,
    thanaId: null,
    areaId: null,
  });

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const finalData = await fetchFilterApi({
          token,
          districtId: getID.districtId,
          divisionId: getID.divisionId,
          areaId: getID.thanaId,
        });

        let skip = 0;

        if (page > 1) {
          skip = (page - 1) * limit;
        }

        let uri = `?limit=${limit}&skip=${skip}`;

        if (getID.categoryId && getID.categoryId !== 'all') {
          uri += `&category=${getID.categoryId}`;
        }
        if (user.type === 'admin') {
          if (getID.ngoId && getID.ngoId !== 'all') {
            uri += `&ngo=${getID.ngoId}`;
          }
        } else if (user.type === 'ngo') {
          uri += `&ngo=${user.ngo_id}`;
        }
        if (user.type === 'admin' || user.type === 'ngo') {
          if (getID.fieldId && getID.fieldId !== 'all') {
            uri += `&field_office=${getID.fieldId}`;
          }
        } else {
          uri += `&field_office=${user.field_office_id}`;
        }
        if (getID.divisionId && getID.divisionId !== 'all') {
          console.log(getID.divisionId);
          uri += `&division=${getID.divisionId}`;
        }
        if (getID.districtId && getID.districtId !== 'all') {
          uri += `&district=${getID.districtId}`;
        }
        if (getID.thanaId && getID.thanaId !== 'all') {
          uri += `&thana=${getID.thanaId}`;
        }
        if (getID.areaId && getID.areaId !== 'all') {
          uri += `&area=${getID.areaId}`;
        }

        setFilterData(finalData!);
        const data = await fetcher.get(`/api/v1/me${uri}`, token);

        if (data.success) {
          setMeList({ total: data.total, meList: data.data });

          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
    // fetchFilterApi({ districtId: getID.districtId, divisionId: getID.divisionId, subDistrictId: getID.areaId })
  }, [getID, getID.areaId, token, user, page]);

  useEffect(() => {
    (async () => {
      if (user.type === 'ngo') {
        const data = await fetcher.get(
          `/api/v1/field-office?ngo=${user.ngo_id}`,
          token
        );
        if (data.success) {
          setFieldOffice(data.data);
        }
      }
    })();
  }, [token, user]);

  const getStatusFilterData = filterStatus;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Filter
      </Typography>
      <Divider />
      <Box sx={{ padding: '15px' }}>
        <FormControl
          size='small'
          variant='outlined'
          sx={{ width: '100%', mt: 1 }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            // value={getID.categoryId}
            onChange={(e) => setGetID({ ...getID, categoryId: e.target.value })}
            label='Category'
            autoWidth
            defaultValue={getID.areaId === null ? 'all' : getID.areaId}
          >
            <MenuItem value='all'>All</MenuItem>
            {filterData[0]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size='small'
          variant='outlined'
          sx={{ width: '100%', mt: 1 }}
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
        <FormControl
          size='small'
          variant='outlined'
          sx={{ width: '100%', mt: 1 }}
        >
          <InputLabel>Filed Office</InputLabel>
          <Select
            // value={status}
            onChange={(e) => setGetID({ ...getID, fieldId: e.target.value })}
            label='Filed Office'
            autoWidth
            defaultValue={'all'}
          >
            <MenuItem value='all'>All</MenuItem>
            {filterData[2]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    navigate(`/me?page=${value}`);
  };

  return (
    <Container sx={{ mt: 1, px: 0 }} maxWidth='xl'>
      <PageTitle title={`ME LIST (${meList.total})`} />
      <Grid
        mt={1}
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
      >
        <Grid item xs={12} mt={1}>
          <Card>
            <CardHeader
              action={
                <>
                  <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    edge='start'
                    onClick={handleDrawerToggle}
                    sx={{ display: { sm: 'none' } }}
                  >
                    <TuneIcon />
                  </IconButton>
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
                      {/* <FormControl
                        size='small'
                        variant='outlined'
                        sx={{ width: '110px' }}
                      >
                        <InputLabel>Category</InputLabel>
                        <Select
                          // value={getID.categoryId}
                          onChange={(e) =>
                            setGetID({ ...getID, categoryId: e.target.value })
                          }
                          label='Category'
                          autoWidth
                          defaultValue={
                            getID.areaId === null ? 'all' : getID.areaId
                          }
                        >
                          <MenuItem value='all'>All</MenuItem>
                          {filterData[0]?.data.map((statusOption: any) => (
                            <MenuItem
                              key={statusOption.id}
                              value={statusOption.id}
                            >
                              {statusOption.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}

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
                      {user.type !== 'fo' ? (
                        <FormControl
                          size='small'
                          variant='outlined'
                          sx={{ width: '130px' }}
                        >
                          <InputLabel>Branch</InputLabel>
                          <Select
                            // value={status}
                            onChange={(e) =>
                              setGetID({ ...getID, fieldId: e.target.value })
                            }
                            label='Filed Office'
                            autoWidth
                            defaultValue={'all'}
                          >
                            <MenuItem value='all'>All</MenuItem>
                            {user.type === 'ngo'
                              ? fieldOffice.map((statusOption: any) => (
                                  <MenuItem
                                    key={statusOption.id}
                                    value={statusOption.id}
                                  >
                                    {statusOption.name}
                                  </MenuItem>
                                ))
                              : filterData[2]?.data.map((statusOption: any) => (
                                  <MenuItem
                                    key={statusOption.id}
                                    value={statusOption.id}
                                  >
                                    {statusOption.name}
                                  </MenuItem>
                                ))}
                            {}
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
            {/* <Divider /> */}
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: '700' }}>ME id</TableCell>
                    {/* <TableCell sx={{ fontWeight: '700' }}>PHOTO</TableCell> */}
                    <TableCell sx={{ fontWeight: '700' }}>NAME</TableCell>
                    <TableCell sx={{ fontWeight: '700' }}>OCCUPATION</TableCell>
                    <TableCell sx={{ fontWeight: '700' }}>DISTRICT</TableCell>
                    <TableCell sx={{ fontWeight: '700' }}>ADDRESS</TableCell>
                    <TableCell sx={{ fontWeight: '700' }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableLoader />
                  ) : (
                    <>
                      {meList?.total ? (
                        <>
                          {meList.meList.map(
                            (singleMe: IMeList, index: number) => {
                              return (
                                <MeTableRow
                                  key={singleMe.id}
                                  singleMe={singleMe}
                                  serial={index + 1}
                                />
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
            <Pagination
              count={Math.ceil(meList.total / limit)}
              page={page}
              onChange={handlePageChange}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
