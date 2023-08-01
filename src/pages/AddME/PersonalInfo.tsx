import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import moment from 'moment';
import { ISingleFieldOffice } from '../../utils/Type/type';

interface IDivision {
  id: number;
  division_name: string;
}
interface IDistrict {
  id: number;
  district_name: string;
}
interface IThana {
  id: number;
  sub_district_name: string;
}
interface IArea {
  id: number;
  area_name: string;
}

interface IAddress {
  division: IDivision[];
  district: IDistrict[];
  thana: IThana[];
  area: IArea[];
}

const initAddressValue: IAddress = {
  district: [],
  division: [],
  thana: [],
  area: [],
};

const PersonalInfo = ({ setMeInfo, meInfo }: any) => {
  const [address, setAddress] = useState<IAddress>(initAddressValue);
  const [fieldOffice, setFieldOffice] = useState([]);
  const [singleFo, setSingleFo] = useState<ISingleFieldOffice | null>(null);
  const [ngoList, setNgoList] = useState([]);
  const { user, token } = useAuthContext();

  useEffect(() => {
    if (user.ngo_id) {
      (async () => {
        const data = await fetcher.get(
          `/api/v1/field-office?ngo=${user.ngo_id}`,
          token
        );

        if (data.success) {
          setFieldOffice(data.data);
        }
      })();
    } else {
      (async () => {
        const data = await fetcher.get(`/api/v1/ngo`, token);
        if (data.success) {
          setNgoList(data.data);
        }
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetcher.get('/api/v1/address/division', token);
      if (data.success) {
        setAddress({ ...address, division: data.data });
      }
    })();
  }, []);

  const fetchAddress = async (type: string, id: number) => {
    if (type === 'division') {
      const data = await fetcher.get(
        `/api/v1/address/district?division=${id}`,
        token
      );
      if (data.success) {
        setAddress({ ...address, district: data.data, thana: [], area: [] });
      }
    } else if (type === 'district') {
      const data = await fetcher.get(
        `/api/v1/address/thana?district=${id}`,
        token
      );
      if (data.success) {
        setAddress({ ...address, thana: data.data, area: [] });
      }
    } else if (type === 'thana') {
      const data = await fetcher.get(
        `/api/v1/address/area?sub_district=${id}`,
        token
      );
      if (data.success) {
        setAddress({ ...address, area: data.data });
      }
    }
  };

  const fetchFieldOffice = async (id: number) => {
    const data = await fetcher.get(`/api/v1/field-office?ngo=${id}`, token);

    if (data.success) {
      setSingleFo(null);
      setFieldOffice(data.data);
    }
  };

  const fetchSingleFo = async (id: number) => {
    const data = await fetcher.get(`/api/v1/field-office/${id}`, token);

    if (data.success) {
      setSingleFo(data.data);
    }
  };

  return (
    <Box>
      <Grid mt={1} container spacing={2}>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='none'
            fullWidth
            required
            value={meInfo.name}
            id='name'
            label='Full Name'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMeInfo({ ...meInfo, name: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        {user.type === 'admin' ? (
          <Grid item xs={12} lg={4}>
            <Select
              margin='none'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Division'
              defaultValue='select'
              fullWidth
              required
              onChange={(e: any) => fetchFieldOffice(e.target.value)}
            >
              <MenuItem value='select' disabled>
                Select NGO
              </MenuItem>
              {ngoList.map((item: any) => {
                return (
                  <MenuItem value={item.id}>
                    {item.name} ({item.total_field_office} Branch)
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        ) : (
          ''
        )}
        {user.type !== 'fo' ? (
          <Grid item xs={12} lg={4}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Field office'
              defaultValue='select'
              fullWidth
              required
              onChange={(e: any) => {
                fetchSingleFo(e.target.value);
                setMeInfo({ ...meInfo, field_office: e.target.value });
              }}
            >
              <MenuItem value='select' disabled>
                Select Branch
              </MenuItem>
              {fieldOffice.map((item: any) => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
            </Select>
            {singleFo ? (
              <Typography>
                District: {singleFo.district_name}, Upazilla:{' '}
                {singleFo.sub_district_name}
              </Typography>
            ) : (
              ''
            )}
          </Grid>
        ) : (
          ''
        )}
        <Grid item xs={12} lg={4}>
          <TextField
            margin='none'
            fullWidth
            id='nid'
            value={meInfo.nid_number}
            label='NID No (optional)'
            onChange={(e: any) =>
              setMeInfo({ ...meInfo, nid_number: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='none'
            fullWidth
            id='fathersName'
            label="Father's Name (optional)"
            value={meInfo.father_name}
            onChange={(e: any) =>
              setMeInfo({ ...meInfo, father_name: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='none'
            fullWidth
            id='MothersName'
            label="Mother's Name (optional)"
            value={meInfo.mother_name}
            onChange={(e: any) =>
              setMeInfo({ ...meInfo, mother_name: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='none'
            id='date'
            type='date'
            label='Date of birth'
            onChange={(e: any) =>
              setMeInfo({ ...meInfo, date_of_birth: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {meInfo.date_of_birth ? (
            <Typography fontWeight='bold' mx={1} fontSize={18}>
              {moment().diff(meInfo.date_of_birth, 'years', false)} years
            </Typography>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
            <InputLabel id='demo-simple-select-label'>
              Marital Status
            </InputLabel>
            <Select
              margin='none'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Marital Status'
              value={meInfo.maritial_status}
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, maritial_status: e.target.value })
              }
            >
              <MenuItem value={'married'}>Married</MenuItem>
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'divorced'}>Divorced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          {meInfo.maritial_status === 'married' ? (
            <TextField
              margin='none'
              required
              id='spouseName'
              label='Spouse Name'
              value={meInfo.partner_name}
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, partner_name: e.target.value })
              }
              type='text'
              autoFocus
              fullWidth
              variant='outlined'
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='normal'
            fullWidth
            required
            id='phone-no'
            value={meInfo.phone}
            label='Phone No'
            onChange={(e: any) =>
              setMeInfo({ ...meInfo, phone: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            margin='normal'
            fullWidth
            id='email'
            value={meInfo.email}
            label='Enter email (optional)'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMeInfo({ ...meInfo, email: e.target.value })
            }
            type='text'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} lg={4} mt={2}>
          <FormControl margin='none' fullWidth sx={{ m: 0 }}>
            <InputLabel id='demo-simple-select-label'>Select gender</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={meInfo.gender}
              label='Gender'
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, gender: e.target.value })
              }
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl margin='none' fullWidth sx={{ m: 0 }}>
            <InputLabel id='demo-simple-select-label'>
              Select religion
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Religion'
              value={meInfo.religion}
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, religion: e.target.value })
              }
            >
              <MenuItem value='islam'>Islam</MenuItem>
              <MenuItem value='hindu'>Hindu</MenuItem>
              <MenuItem value='christian'>Christian</MenuItem>
              <MenuItem value='buddha'>Buddha</MenuItem>
              <MenuItem value='other'>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl margin='none' fullWidth sx={{ m: 0 }}>
            <InputLabel id='demo-simple-select-label'>
              Select Blood Group (optional)
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Blood Group  (optional)'
              value={meInfo.blood}
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, blood: e.target.value })
              }
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
        <Grid item xs={12} lg={4}>
          <FormControl required fullWidth sx={{ m: 0 }}>
            <TextField
              margin='normal'
              id='filled-size-small'
              variant='outlined'
              sx={{ m: 0 }}
              type='file'
              label='Upload photo (optional)'
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, photo: e.target.files[0] })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl required fullWidth sx={{ m: 0 }}>
            <TextField
              margin='normal'
              id='filled-size-small'
              variant='outlined'
              sx={{ m: 0 }}
              type='file'
              label='Nid front (optional)'
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, nid_front: e.target.files[0] })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={4}>
          <FormControl required fullWidth sx={{ m: 0 }}>
            <TextField
              margin='normal'
              id='filled-size-small'
              variant='outlined'
              sx={{ m: 0 }}
              type='file'
              label='Nid back (optional)'
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, nid_back: e.target.files[0] })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required margin='none'>
            <TextField
              margin='none'
              id='email'
              rows={4}
              value={meInfo.address}
              label='Village and address'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMeInfo({ ...meInfo, address: e.target.value })
              }
              type='text'
              variant='outlined'
              fullWidth
              multiline
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid my={2} item lg={12}>
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
            flexWrap: 'wrap',
          }}
        >
          <FormControl required margin='none' sx={{ m: 0 }}>
            <InputLabel required id='demo-simple-select-label'>
              Division
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Division'
              defaultValue='select'
              required
              onChange={(e: any) => {
                fetchAddress('division', e.target.value);
                setMeInfo({ ...meInfo, area_id: 0 });
              }}
            >
              <MenuItem value='select' disabled>
                Select division
              </MenuItem>
              {address.division.map((item) => {
                return (
                  <MenuItem value={item.id}>{item.division_name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required margin='none' sx={{ m: 0 }}>
            <InputLabel required id='demo-simple-select-label'>
              District
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='District'
              defaultValue='select'
              required
              onChange={(e: any) => {
                fetchAddress('district', e.target.value);
                setMeInfo({ ...meInfo, area_id: 0 });
              }}
            >
              <MenuItem value='select' disabled>
                Select district
              </MenuItem>
              {address.district.map((item) => {
                return (
                  <MenuItem value={item.id}>{item.district_name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required margin='none' sx={{ m: 0 }}>
            <InputLabel required id='demo-simple-select-label'>
              Thana
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue='select'
              label='Thana'
              required
              onChange={(e: any) => {
                fetchAddress('thana', e.target.value);
                setMeInfo({ ...meInfo, area_id: 0 });
              }}
            >
              <MenuItem value='select' disabled>
                Select thana
              </MenuItem>
              {address.thana.map((item) => {
                return (
                  <MenuItem value={item.id}>{item.sub_district_name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {meInfo.area_id ? <h2>Area id: {meInfo.area_id}</h2> : ''}
          <FormControl required margin='none' sx={{ m: 0 }}>
            <InputLabel required id='demo-simple-select-label'>
              Union
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Union'
              defaultValue='select'
              required
              onChange={(e: any) =>
                setMeInfo({ ...meInfo, area_id: e.target.value })
              }
            >
              <MenuItem value='select' disabled>
                Select area
              </MenuItem>
              {address.area.map((item) => {
                return <MenuItem value={item.id}>{item.area_name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
