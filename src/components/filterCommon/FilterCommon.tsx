// import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
// import React from 'react'

// function FilterCommon() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         gap: 2,
//         alignItems: "center",
//         marginX: "10px",
//       }}
//     >
//       <FormControl
//         size="small"
//         variant="outlined"
//         sx={{ width: "110px" }}
//       >
//         <InputLabel>NGO</InputLabel>
//         <Select
//           // value={status}
//           onChange={(e) =>
//             setGetID({ ...getID, ngoId: e.target.value })
//           }
//           label="NGO"
//           autoWidth
//           defaultValue={"all"}
//         >
//           <MenuItem value="all">All</MenuItem>
//           {filterData[1]?.data.map((statusOption: any) => (
//             <MenuItem key={statusOption.id} value={statusOption.id}>
//               {statusOption.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {getStatusFilterData({
//         filterData: filterData,
//         setGetID: setGetID,
//         getID: getID,
//       })}
//       <Button variant="contained" onClick={() => setOpen(true)}>
//         Add field office
//       </Button>
//     </Box>
//   )
// }

// export default FilterCommon