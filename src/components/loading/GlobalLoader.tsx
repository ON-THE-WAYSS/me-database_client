import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function GlobalLoader() {
  return (
    <Box sx={{ display: 'flex', width: "100%", height: "80vh", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}