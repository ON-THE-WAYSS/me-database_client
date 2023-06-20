import { useState } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const BankDetails = ({ setMeInfo, meInfo }: any) => {
  const [bank, setBank] = useState<boolean>(false);
  const [mobileBanking, setMobileBankig] = useState<boolean>(false);
  const [mobileBankingValue] = useState<string>('');

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Typography variant='h6' fontSize={14}>
            Bank details
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={6} lg={6}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='saveCard' value='yes' />}
            label='Mobile banking'
            onClick={() => setMobileBankig(!mobileBanking)}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <FormControlLabel
            onClick={() => setBank(!bank)}
            control={<Checkbox color='secondary' name='saveCard' value='yes' />}
            label='Bank'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          {mobileBanking && (
            <Box>
              <FormControl required margin='none' fullWidth sx={{ m: 0 }}>
                <InputLabel required id='demo-simple-select-label'>
                  Select operator
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='zone'
                  value={mobileBankingValue}
                  required
                  onChange={(e: any) =>
                    setMeInfo({ ...meInfo, nid_number: e.target.value })
                  }
                >
                  <MenuItem value={'bkash'}>Bkash</MenuItem>
                  <MenuItem value={'nagat'}>Nagat</MenuItem>
                  <MenuItem value={'rocket '}>Rocket </MenuItem>
                </Select>
              </FormControl>
              {mobileBankingValue !== '' && (
                <TextField
                  fullWidth
                  margin='normal'
                  required
                  id='mobileNo'
                  onChange={(e: any) =>
                    setMeInfo({ ...meInfo, nid_number: e.target.value })
                  }
                  label='Provide Mobile No'
                  type='text'
                  autoFocus
                  variant='outlined'
                />
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          {bank && (
            <Grid>
              <Typography textAlign={'center'}>
                Give us more details about bank
              </Typography>
              <Divider />
              <Grid item lg={12} sx={{ my: 0 }}>
                <TextField
                  fullWidth
                  margin='normal'
                  required
                  id='bankName'
                  onChange={(e: any) =>
                    setMeInfo({ ...meInfo, nid_number: e.target.value })
                  }
                  label='Bank Name'
                  type='text'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  margin='normal'
                  required
                  id='accountNo'
                  onChange={(e: any) =>
                    setMeInfo({ ...meInfo, nid_number: e.target.value })
                  }
                  label='Account No'
                  type='text'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  margin='normal'
                  required
                  id='branch'
                  onChange={(e: any) =>
                    setMeInfo({ ...meInfo, nid_number: e.target.value })
                  }
                  label='Branch Name'
                  type='text'
                  variant='outlined'
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default BankDetails;
