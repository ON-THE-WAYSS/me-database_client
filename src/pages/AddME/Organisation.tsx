import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const Organisation = ({ setMeInfo, meInfo }: any) => {
  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box>
            <FormControl required margin='none' fullWidth>
              <InputLabel required id='demo-simple-select-label'>
                Select Occupation
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Select Occupation'
                value={meInfo.occupation}
                required
                onChange={(e: any) =>
                  setMeInfo({ ...meInfo, occupation: e.target.value })
                }
              >
                <MenuItem value={'job'}>Job Holder</MenuItem>
                <MenuItem value={'business'}>Business</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            {meInfo.occupation === 'business' && (
              <Grid>
                <Typography textAlign={'center'}>
                  Give us more details
                </Typography>
                <Divider />
                <Grid item xs={12} lg={12} sx={{ my: 0 }}>
                  <TextField
                    fullWidth
                    margin='normal'
                    required
                    id='business Name'
                    onChange={(e: any) =>
                      setMeInfo({ ...meInfo, business_name: e.target.value })
                    }
                    label='Business Name'
                    type='text'
                    autoFocus
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    id='details'
                    label='Business Details'
                    type='text'
                    onChange={(e: any) =>
                      setMeInfo({ ...meInfo, business_details: e.target.value })
                    }
                    variant='outlined'
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    fullWidth
                    margin='normal'
                    id='businessType'
                    label='Business Type'
                    onChange={(e: any) =>
                      setMeInfo({ ...meInfo, business_type: e.target.value })
                    }
                    type='text'
                    autoFocus
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    margin='normal'
                    fullWidth
                    id='trade_license'
                    label='Trade license'
                    onChange={(e: any) =>
                      setMeInfo({ ...meInfo, trade_license: e.target.value })
                    }
                    type='text'
                    autoFocus
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} lg={12} mt={2}>
                  <TextField
                    id='date'
                    type='date'
                    label='Business start date'
                    onChange={(e: any) =>
                      setMeInfo({
                        ...meInfo,
                        business_start_date: e.target.value,
                      })
                    }
                    sx={{ width: '100%', pb: 2 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {meInfo.occupation !== 'business' &&
              meInfo.occupation !== 'job' &&
              meInfo.occupation !== '' && (
                <Grid>
                  <Typography textAlign={'center'}>
                    Provide occupation
                  </Typography>
                  <Divider />
                  <Grid item xs={12} lg={12} sx={{ my: 0 }}>
                    <TextField
                      fullWidth
                      margin='normal'
                      id='Occupation name'
                      onChange={(e: any) =>
                        setMeInfo({ ...meInfo, occupation: e.target.value })
                      }
                      label='Occupation Name'
                      type='text'
                      autoFocus
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
              )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box>
            <Grid>
              <Grid item lg={12}>
                <FormControl margin='none' fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    How me connected with NGO
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='How me connected with NGO'
                    value={meInfo.ngo_connection_via}
                    required
                    onChange={(e: any) =>
                      setMeInfo({
                        ...meInfo,
                        ngo_connection_via: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={'loan'}>Loan</MenuItem>
                    <MenuItem value={'savings'}>Savings</MenuItem>
                    <MenuItem value={'potential_me'}>Potential ME</MenuItem>
                  </Select>
                </FormControl>

                {meInfo.ngo_connection_via !== 'potential_me' ? (
                  <TextField
                    fullWidth
                    margin='normal'
                    id='membership_no'
                    value={meInfo.membership_no}
                    onChange={(e: any) =>
                      setMeInfo({
                        ...meInfo,
                        membership_no: e.target.value,
                      })
                    }
                    label='Membership No'
                    type='text'
                    autoFocus
                    variant='outlined'
                  />
                ) : (
                  ''
                )}
              </Grid>
              <Grid item lg={12} mt={2}>
                <FormControl margin='none' fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    How me connected with Ecommerce
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='How me connected with Ecommerce'
                    value={meInfo.ecommerce_connection}
                    onChange={(e: any) =>
                      setMeInfo({
                        ...meInfo,
                        ecommerce_connection: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={'facebook'}>Facebook</MenuItem>
                    <MenuItem value={'me-mart'}>Me Mart</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
                {meInfo.ecommerce_connection !== 'facebook' &&
                  meInfo.ecommerce_connection !== 'me-mart' &&
                  meInfo.ecommerce_connection !== '' && (
                    <Grid>
                      <Divider />
                      <Grid item xs={12} lg={12} sx={{ my: 0 }}>
                        <TextField
                          fullWidth
                          margin='normal'
                          id='ecommerce name'
                          onChange={(e: any) =>
                            setMeInfo({
                              ...meInfo,
                              ecommerce_connection: e.target.value,
                            })
                          }
                          label='Ecommerce connection name'
                          type='text'
                          autoFocus
                          variant='outlined'
                        />
                      </Grid>
                    </Grid>
                  )}
                {meInfo.ecommerce_connection === 'facebook' ? (
                  <TextField
                    fullWidth
                    margin='normal'
                    id='ecommerce_link'
                    value={meInfo.ecommerce_link}
                    onChange={(e: any) =>
                      setMeInfo({
                        ...meInfo,
                        ecommerce_link: e.target.value,
                      })
                    }
                    label='Facebook page link'
                    type='text'
                    autoFocus
                    variant='outlined'
                  />
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Organisation;
