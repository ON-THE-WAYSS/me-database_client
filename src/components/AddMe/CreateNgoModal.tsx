import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField, Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Toaster from '../Toaster/Toaster';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import ButtonLoader from '../Spinner/ButtonLoader';
import { fetchFilterApi } from '../filterCommonFetch/filterData';
import FilterAddressForModal from './FilterAddressForModal';

type IGetIDProps = {
  divisionId: string | null;
  districtId: string | null;
  thanaId: string | null;
  areaId: string | null;
};

const CreateNgoModal = ({ open, handleClose, allNgo, setAllNgo }: any) => {
  const { register, handleSubmit } = useForm();
  const { user, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [filterData, setFilterData] = useState<any[]>([]);
  const [getID, setGetID] = useState<IGetIDProps>({
    divisionId: null,
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
      })();
    } catch (error) {
      console.log(error);
    }
  }, [getID, token]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.area_id = getID.areaId;
    data.ngo_id = 2;
    data.created_by = user.user_id;

    const formData = new FormData();
    if (photo) {
      formData.append('image', photo);
    }
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await fetcher.post({
      token,
      url: `/api/v1/ngo`,
      body: formData,
    });

    if (res.success) {
      setAllNgo([
        {
          id: res.data.id,
          name: data.name,
          image: res.data.image,
          address: data.address,
        },
        ...allNgo,
      ]);
      Toaster().fire({
        icon: 'success',
        title: res.message,
      });
      setLoading(false);
      handleClose();
    } else {
      Toaster().fire({
        icon: 'error',
        title: res.message,
      });
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Create new Ngo'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* register your input into the hook by invoking the "register" function */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='name'
                  label='Enter NGO Name'
                  {...register('name')}
                  type='text'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='nid'
                  label='Enter user name'
                  {...register('user_name')}
                  type='text'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='email'
                  label='Enter email'
                  {...register('email')}
                  type='email'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='phone'
                  label='Enter phone number'
                  {...register('phone')}
                  type='text'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='address'
                  label='Enter address'
                  {...register('address')}
                  type='text'
                  variant='outlined'
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  id='photo'
                  label='Select photo'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e: any) => setPhoto(e.target.files[0])}
                  type='file'
                  variant='outlined'
                />
              </Grid>
              <FilterAddressForModal
                filterData={filterData}
                setGetID={setGetID}
                getID={getID}
              />
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  sx={{ mt: -0.1 }}
                  id='password'
                  label='Enter password'
                  {...register('password')}
                  type='text'
                  variant='outlined'
                />
              </Grid>

              {/* nfjkahhfahf */}
              {/* <Grid item xs={12} lg={4}>
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    Religion
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Religion'
                    required
                    {...register('Religion')}
                  >
                    <MenuItem value='other'>others</MenuItem>
                    <MenuItem value='islam'>Islam</MenuItem>
                    <MenuItem value='hindu'>Hindu</MenuItem>
                    <MenuItem value='christian'>Christian</MenuItem>
                    <MenuItem value='buddha'>Buddha</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Blood Group'
                    required
                    {...register('Blood Group')}
                  >
                    <MenuItem value={'a+'}>A+</MenuItem>
                    <MenuItem value={'a-'}>A-</MenuItem>
                    <MenuItem value={'b+'}>B+</MenuItem>
                    <MenuItem value={'b-'}>B-</MenuItem>
                    <MenuItem value={'ab+'}>AB+</MenuItem>
                    <MenuItem value={'ab-'}>AB-</MenuItem>
                    <MenuItem value={'o+'}>O+</MenuItem>
                    <MenuItem value={'o-'}>O-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Typography variant='h6' fontSize={14}>
                  Address
                </Typography>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    Division
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Division'
                    value={maritalStatus}
                    required
                    onChange={(e: any) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value={'Dhaka'}>Dhaka</MenuItem>
                    <MenuItem value={'Syhlet'}>Syhlet</MenuItem>
                    <MenuItem value={'Kholna'}>Kholna</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    District
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='District'
                    value={maritalStatus}
                    required
                    onChange={(e: any) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value={'Dhaka'}>Tangail</MenuItem>
                    <MenuItem value={'Syhlet'}>Dhaka</MenuItem>
                    <MenuItem value={'Kholna'}>Savar</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    Thana
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Thana'
                    value={maritalStatus}
                    required
                    onChange={(e: any) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value={'Dhaka'}>Sakhipur</MenuItem>
                    <MenuItem value={'Syhlet'}>Tangail Sadar</MenuItem>
                    <MenuItem value={'Kholna'}>Madhupur</MenuItem>
                  </Select>
                </FormControl>
                <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                  <InputLabel required id='demo-simple-select-label'>
                    Area
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Area'
                    value={maritalStatus}
                    required
                    onChange={(e: any) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value={'Dhaka'}>Sakhipur</MenuItem>
                    <MenuItem value={'Syhlet'}>Tangail Sadar</MenuItem>
                    <MenuItem value={'Kholna'}>Madhupur</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
            {/* <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={(e: any) => {
                      if (e.target.checked) {
                        setPassWordType('text');
                      } else {
                        setPassWordType('password');
                      }
                    }}
                  />
                }
                label='Show password'
              />
            </FormGroup> */}
          </DialogContent>

          <Box textAlign='center'>
            {loading ? (
              <ButtonLoader />
            ) : (
              <Button type='submit' variant='outlined' sx={{ width: '20%' }}>
                submit
              </Button>
            )}
          </Box>
        </form>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateNgoModal;
