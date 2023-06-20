import { Typography, Box } from '@mui/material';

const Copyright = () => {
  return (
    <Box my={2}>
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        ME-DATABASE {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant='body2' color='textSecondary' align='center'>
        Tech Support{' '}
        <a target='_blank' href='https://m360ict.com'>
          M360ICT
        </a>
      </Typography>
    </Box>
  );
};

export default Copyright;
