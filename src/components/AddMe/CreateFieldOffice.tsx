import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Grid,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import Toaster from '../Toaster/Toaster';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import ButtonLoader from '../Spinner/ButtonLoader';
import FilterAddressForModal from './FilterAddressForModal';
import { fetchFilterApi } from '../filterCommonFetch/filterData';

type IGetIDProps = {
  divisionId: string | null;
  districtId: string | null;
  thanaId: string | null;
  areaId: string | null;
};

const CreateFieldOffice = ({ open, handleClose, setAllFieldOffice }: any) => {
  const { user, token } = useAuthContext();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [ngo, setngo] = useState([]);
  const [photo, setPhoto] = useState('');
  const [filterData, setFilterData] = useState<any[]>([]);
  const [getID, setGetID] = useState<IGetIDProps>({
    divisionId: null,
    districtId: null,
    thanaId: null,
    areaId: null,
  });

  useEffect(() => {
    // setLoading(true);
    try {
      (async () => {
        const finalData = await fetchFilterApi({
          token,
          districtId: getID.districtId,
          divisionId: getID.divisionId,
          areaId: getID.thanaId,
        });
        setFilterData(finalData!);
        const data = await fetcher.get('/api/v1/ngo', token);
        if (data.success) {
          setLoading(false);

          setngo(data.data);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [getID]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.area_id = getID.areaId;

    if (user.type === 'ngo') {
      data.ngo_id = user.ngo_id;
    }

    const formData = new FormData();
    formData.append('image', photo);
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    const res = await fetcher.post({
      token,
      url: `/api/v1/field-office`,
      body: formData,
    });

    if (res.success) {
      setAllFieldOffice((list: any) => {
        return [
          {
            id: res.data.id,
            image: res.data.image,
            name: data.name,
            address: data.address,
          },
          ...list,
        ];
      });
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
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Create branch'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  id='name'
                  label='Enter branch name'
                  {...register('name')}
                  type='text'
                  variant='outlined'
                />
              </Grid>
              {/* <Grid item xs={12} lg={4}>
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
              </Grid> */}
              <Grid item xs={12} lg={4}>
                <TextField
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Enter email (optional)'
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
              {user.type === 'admin' ? (
                <Grid item xs={12} lg={4}>
                  <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Select NGO</InputLabel>
                    <Select
                      label='Select NGO'
                      autoWidth
                      required
                      {...register('ngo_id')}
                    >
                      {ngo.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                ''
              )}
              <FilterAddressForModal
                filterData={filterData}
                setGetID={setGetID}
                getID={getID}
              />
              {/* <Grid item xs={12} lg={4}>
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
              </Grid> */}
            </Grid>
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

export default CreateFieldOffice;
