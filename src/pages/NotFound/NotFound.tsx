import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const primary = '#9e9e9e';

export default function NotFound() {
  return (
    <Box
      sx={{
        margin: '0',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '97vh',
        minWidth: '98vw',
        backgroundColor: primary,
      }}
    >
      <Typography variant='h1' style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant='outlined'>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
          Back Home
        </Link>
      </Button>
    </Box>
  );
}
