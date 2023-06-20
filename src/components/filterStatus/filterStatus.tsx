import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export const filterStatus = ({
  filterData,
  setGetID,
  getID,
}: {
  filterData: any;
  setGetID: any;
  getID: any;
}) => {
  return (
    <>
      <FormControl
        size='small'
        variant='outlined'
        sx={{ width: { xs: '100%', sm: '110px' }, marginY: { xs: '8px' } }}
      >
        <InputLabel>Division</InputLabel>
        <Select
          // value={status}
          onChange={(e) => setGetID({ ...getID, divisionId: e.target.value })}
          label='Division'
          autoWidth
          defaultValue={'all'}
        >
          <MenuItem value='all'>All</MenuItem>
          {filterData[3]?.data.map((statusOption: any) => (
            <MenuItem key={statusOption.id} value={statusOption.id}>
              {statusOption.division_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size='small'
        variant='outlined'
        sx={{ width: { xs: '100%', sm: '110px' }, marginY: { xs: '8px' } }}
      >
        <InputLabel>District</InputLabel>
        <Select
          // value={status}
          onChange={(e) => setGetID({ ...getID, districtId: e.target.value })}
          label='District'
          autoWidth
          defaultValue={'all'}
        >
          <MenuItem value='all'>All</MenuItem>
          {filterData[4]?.data.map((statusOption: any) => (
            <MenuItem key={statusOption.id} value={statusOption.id}>
              {statusOption.district_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size='small'
        variant='outlined'
        sx={{ width: { xs: '100%', sm: '110px' }, marginY: { xs: '8px' } }}
      >
        <InputLabel>Thana</InputLabel>
        <Select
          // value={status}
          onChange={(e) => setGetID({ ...getID, thanaId: e.target.value })}
          label='Thana'
          autoWidth
          defaultValue={'all'}
        >
          <MenuItem value='all'>All</MenuItem>
          {filterData[5]?.data.map((statusOption: any) => (
            <MenuItem key={statusOption.id} value={statusOption.id}>
              {statusOption.sub_district_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size='small'
        variant='outlined'
        sx={{ width: { xs: '100%', sm: '110px' }, marginY: { xs: '8px' } }}
      >
        <InputLabel>Union</InputLabel>
        <Select
          value={getID.areaId === null ? 'all' : getID.areaId}
          onChange={(e) => setGetID({ ...getID, areaId: e.target.value })}
          label='Union'
          autoWidth
        >
          <MenuItem value='all'>All</MenuItem>
          {filterData[6]?.data.map((statusOption: any) => (
            <MenuItem key={statusOption.id} value={statusOption.id}>
              {statusOption.area_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
