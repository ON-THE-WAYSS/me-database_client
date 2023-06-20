import Grid from '@mui/material/Grid';
import { Box, Paper, Typography } from '@mui/material';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import { useEffect, useState } from 'react';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import GlobalLoader from '../../components/loading/GlobalLoader';

interface IDashboardData {
  total: number;
}

export default function Dashboard() {
  const { user, token } = useAuthContext();
  const [dashboardData, setDashboardData] = useState<IDashboardData>({
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetcher.get('/api/v1/user/dashboard', token);
      if (data.success) {
        setLoading(false);
        setDashboardData(data.data);
      } else {
        setLoading(false);
      }
    })();
  }, [token]);

  const myDate = new Date();
  const hrs = myDate.getHours();

  let greet = '';

  if (hrs < 12) greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';

  return (
    <>
      <Box>
        <Typography variant='h6' sx={{ color: 'black' }}>
          {greet} {user.name}
        </Typography>
      </Box>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Grid mb={5} container gap={5} justifyContent='center' mt={5}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: '20px', backgroundColor: '#82b1ff' }}>
              <Typography variant='subtitle2' color='#757575' fontWeight='bold'>
                Your Total ME
              </Typography>
              <Typography variant='h4' fontWeight='bolder'>
                {dashboardData.total}
              </Typography>
            </Paper>
          </Grid>

          {/* <Grid item xs={6} md={3}>
          <Paper sx={{ padding: '20px', backgroundColor: '#a5d6a7' }}>
            <Typography variant='subtitle2' color='#757575' fontWeight='bold'>
              Profits
            </Typography>
            <Typography variant='h4' fontWeight='bolder'>
              $15,000
            </Typography>
            <Box display='flex'>
              <NorthIcon fontSize='medium' color='success' />
              <Typography variant='h6'>+10.23%</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ padding: '20px', backgroundColor: '#b2dfdb' }}>
            <Typography variant='subtitle2' color='#757575' fontWeight='bold'>
              Expenses
            </Typography>
            <Typography variant='h4' fontWeight='bolder'>
              $5,150
            </Typography>
            <Box display='flex'>
              <NorthIcon fontSize='medium' color='success' />
              <Typography variant='h6' sx={{ color: 'black' }}>
                +10.23%
              </Typography>
            </Box>
          </Paper>
        </Grid> */}
        </Grid>
      )}
    </>
  );
}
