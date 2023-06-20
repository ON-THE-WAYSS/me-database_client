import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ISingleME } from '../../../utils/Type/type';
import { ImgUrl } from '../../../utils/Helpers/Constant';
import SingleMeProduct from './SingleMeProduct';
import moment from 'moment';

interface IProps {
  meDetails: ISingleME;
}
const SingleMe = ({ meDetails }: IProps) => {
  console.log({ meDetails });
  return (
    <div>
      <Box sx={{ mt: 3 }} className='billing-info'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              ME id:
            </Typography>
            {meDetails.id}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Name:
            </Typography>
            {meDetails.name ? (
              meDetails.name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Gender:
            </Typography>
            {meDetails.gender ? (
              meDetails.gender
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Marital status:
            </Typography>
            {meDetails.maritial_status ? (
              meDetails.maritial_status
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Partner name:
            </Typography>
            {meDetails.partner_name ? (
              meDetails.partner_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Date of birth:
            </Typography>
            {moment(meDetails?.date_of_birth).format('MMM Do YY')}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Father name:
            </Typography>
            {meDetails.father_name ? (
              meDetails.father_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Mother name:
            </Typography>
            {meDetails.mother_name ? (
              meDetails.mother_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Email:
            </Typography>
            {meDetails.email ? (
              meDetails.email
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Phone:
            </Typography>
            {meDetails.phone ? (
              meDetails.phone
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Ngo Connected via:
            </Typography>
            {meDetails.ngo_connection_via ? (
              meDetails.ngo_connection_via
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Membership ID:
            </Typography>
            {meDetails.membership_no ? (
              meDetails.membership_no
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Address:
            </Typography>
            {meDetails.address ? (
              meDetails.address
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Division:
            </Typography>
            {meDetails.division_name ? (
              meDetails.division_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              District:
            </Typography>
            {meDetails.district_name ? (
              meDetails.district_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Thana:
            </Typography>
            {meDetails.sub_district_name ? (
              meDetails.sub_district_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Union:
            </Typography>
            {meDetails.area_name ? (
              meDetails.area_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              NID number:
            </Typography>
            {meDetails.nid_number ? (
              meDetails.nid_number
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Religion:
            </Typography>
            {meDetails.religion ? (
              meDetails.religion
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Ecommerce Connected by:
            </Typography>
            {meDetails.ecommerce_connection ? (
              meDetails.ecommerce_connection
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Ecommerce link:
            </Typography>
            {meDetails.ecommerce_link ? (
              meDetails.ecommerce_link
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Occupation:
            </Typography>
            {meDetails.occupation ? (
              meDetails.occupation
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Blood group:
            </Typography>
            {meDetails.blood ? (
              meDetails.blood
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Created by:
            </Typography>
            {meDetails.created_by_name ? (
              meDetails.created_by_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Created at:
            </Typography>
            {moment(meDetails?.created_at).format('MMM Do YY')}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Business name:
            </Typography>
            {meDetails.business_name ? (
              meDetails.business_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Business type:
            </Typography>
            {meDetails.business_type ? (
              meDetails.business_type
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Business start date:
            </Typography>
            {moment(meDetails?.business_start_date).format('MMM Do YY')}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Business details:
            </Typography>
            {meDetails.business_details ? (
              meDetails.business_details
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Trade license:
            </Typography>
            {meDetails.trade_license ? (
              meDetails.trade_license
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              NID front:
            </Typography>
            {meDetails.nid_front ? (
              <a href={`${ImgUrl}/me_files/${meDetails.nid_front}`}>
                Download NID front
              </a>
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              NID back:
            </Typography>
            {meDetails.nid_back ? (
              <a href={`${ImgUrl}/me_files/${meDetails.nid_back}`}>
                Download NID back
              </a>
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              NGO name:
            </Typography>
            {meDetails.ngo_name ? (
              meDetails.ngo_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              NGO status:
            </Typography>
            {meDetails.ngo_status ? (
              meDetails.ngo_status
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='text.primary'
              display='inline'
              sx={{ pr: 1 }}
              gutterBottom
            >
              Branch:
            </Typography>
            {meDetails.field_office_name ? (
              meDetails.field_office_name
            ) : (
              <span style={{ color: 'red' }}>Not provided</span>
            )}
          </Grid>
        </Grid>
        {/* </Grid>
        </Grid> */}
      </Box>
      <SingleMeProduct meDetails={meDetails} />
    </div>
  );
};

export default SingleMe;
