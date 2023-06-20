import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

const FilterAddressForModal = ({
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
      <Grid item xs={12} lg={4}>
        <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Division</InputLabel>
          <Select
            onChange={(e) => setGetID({ ...getID, divisionId: e.target.value })}
            label='Select Division'
            autoWidth
          >
            {filterData[3]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.division_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={4}>
        <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select District</InputLabel>
          <Select
            // value={status}
            onChange={(e) => setGetID({ ...getID, districtId: e.target.value })}
            label='Select District'
            autoWidth
          >
            {filterData[4]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.district_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={4}>
        <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Thana</InputLabel>
          <Select
            // value={status}
            onChange={(e) => setGetID({ ...getID, thanaId: e.target.value })}
            label='Select Thana'
            autoWidth
          >
            {filterData[5]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.sub_district_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={4}>
        <FormControl variant='outlined' fullWidth>
          <InputLabel>Select Union</InputLabel>
          <Select
            value={getID.areaId}
            onChange={(e) => setGetID({ ...getID, areaId: e.target.value })}
            label='Select Union'
            autoWidth
          >
            {filterData[6]?.data.map((statusOption: any) => (
              <MenuItem key={statusOption.id} value={statusOption.id}>
                {statusOption.area_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default FilterAddressForModal;
