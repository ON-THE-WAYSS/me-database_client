import * as React from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import Organisation from './Organisation';
import PersonalInfo from './PersonalInfo';
import ProductFieldsBox from './ProductFieldsBox';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import Toaster from '../../components/Toaster/Toaster';
import GlobalLoader from '../../components/loading/GlobalLoader';

const initMeInfo = {
  name: '',
  address: '',
  area_id: 0,
  nid_number: '',
  photo: '',
  date_of_birth: '',
  gender: '',
  phone: '',
  religion: '',
  email: '',
  blood: '',
  occupation: '',
  nid_front: '',
  nid_back: '',
  maritial_status: 'single',
  father_name: '',
  mother_name: '',
  partner_name: '',
  business_name: '',
  trade_license: '',
  business_start_date: '',
  ngo_connection_via: '',
  membership_no: '',
  business_details: '',
  ecommerce_connection: '',
  ecommerce_link: '',
  other_association: '',
  created_by: 0,
  field_office: 0,
};

const steps = ['Personal info', 'Occupation info', 'Add product'];

const AddME = () => {
  const { user, token } = useAuthContext();
  const [meInfo, setMeInfo] = React.useState<any>(initMeInfo);
  const [loading, setLoading] = React.useState(false);
  const [meId, setMeId] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(meInfo).forEach((key: string) => {
      if (meInfo[key]) {
        formData.append(key, meInfo[key]);
      }
    });

    if (user.user_id) {
      formData.append('created_by', user.user_id.toString());
    }

    if (user.type === 'fo') {
      formData.append('field_office', user.field_office_id?.toString() || '');
    }
    setLoading(true);
    const data = await fetcher.post({
      url: '/api/v1/me',
      body: formData,
      token,
    });
    if (data.success) {
      Toaster().fire({
        icon: 'success',
        title: data.message,
      });
      setLoading(false);
      setMeId(data.data.id);
      setActiveStep(activeStep + 1);
    } else {
      Toaster().fire({
        icon: 'error',
        title: data.message,
      });
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setActiveStep(0);
    setMeInfo(initMeInfo);
  };

  return (
    <>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <React.Fragment>
            <Box>
              {activeStep === 0 ? (
                <PersonalInfo setMeInfo={setMeInfo} meInfo={meInfo} />
              ) : (
                ''
              )}
              {activeStep === 1 ? (
                <Organisation setMeInfo={setMeInfo} meInfo={meInfo} />
              ) : (
                ''
              )}
              {/* {activeStep === 2 ? (
            <BankDetails setMeInfo={setMeInfo} meInfo={meInfo} />
          ) : (
            ''
          )} */}
              {activeStep === 2 ? (
                <ProductFieldsBox meId={meId} setLoading={setLoading} />
              ) : (
                ''
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  variant='outlined'
                  color='inherit'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === 1 ? (
                  <Button variant='outlined' onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : activeStep === 2 ? (
                  <Button variant='outlined' onClick={handleFinish}>
                    Finish
                  </Button>
                ) : (
                  <Button variant='outlined' onClick={handleNext}>
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </React.Fragment>
        </Box>
      )}
    </>
  );
};

export default AddME;
