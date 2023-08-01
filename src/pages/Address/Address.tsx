import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ISingleFieldOffice } from '../../utils/Type/type';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
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
export default function Address() {
  const [address, setAddress] = useState<IAddress>(initAddressValue);
  const [area, setArea] = useState(0);
  const { token } = useAuthContext();

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
  return (
    <Box>
      <Card variant='outlined'>
        <CardHeader title='Find area id' />
        <Divider />
        <CardContent>
          <Grid container>
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
              <FormControl fullWidth required margin='none' sx={{ my: 2 }}>
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
                    setArea(0);
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
              <FormControl fullWidth required margin='none' sx={{ mb: 2 }}>
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
                    setArea(0);
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
              <FormControl fullWidth required margin='none' sx={{ mb: 2 }}>
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
                    setArea(0);
                  }}
                >
                  <MenuItem value='select' disabled>
                    Select thana
                  </MenuItem>
                  {address.thana.map((item) => {
                    return (
                      <MenuItem value={item.id}>
                        {item.sub_district_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth required margin='none' sx={{ m: 0 }}>
                <InputLabel required id='demo-simple-select-label'>
                  Union
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Union'
                  defaultValue='select'
                  fullWidth
                  required
                  onChange={(e: any) => setArea(e.target.value)}
                >
                  <MenuItem value='select' disabled>
                    Select area
                  </MenuItem>
                  {address.area.map((item) => {
                    return (
                      <MenuItem value={item.id}>{item.area_name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Box mt={3}>{area ? <h2>Area id: {area}</h2> : ''}</Box>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
