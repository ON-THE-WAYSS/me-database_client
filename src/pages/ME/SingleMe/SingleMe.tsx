import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router';
import { ISingleME } from '../../../utils/Type/type';
import SingleMeDetails from './SingleMeDetails';
import { ImgUrl } from '../../../utils/Helpers/Constant';
import GlobalLoader from '../../../components/loading/GlobalLoader';
import fetcher from '../../../utils/Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../../Context/AuthContext/AuthContext';
import SingleMeAddProduct from './SingleMeAddProduct';

const style = {
  position: 'absolute' as `absolute`,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '90%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SingleMe = () => {
  const [meDetails, setMeDetails] = useState<ISingleME>({} as ISingleME);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    (async function () {
      try {
        const uri = `/api/v1/me/${id}`;
        const data = await fetcher.get(uri, token);
        console.log({ data });
        if (data.success) {
          setMeDetails(data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [id, token]);

  return (
    <Container sx={{ mt: 4 }} maxWidth='xl'>
      <Card>
        <CardContent>
          <Button variant='contained' onClick={handleOpen}>
            Add Product
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <Typography variant='h4' color='text.primary'>
              ME Information
            </Typography>
            <Avatar
              sx={{ width: 90, height: 90 }}
              variant='square'
              src={
                meDetails.photo
                  ? `${ImgUrl}/me_files/${meDetails.photo}`
                  : '/src/assets/avatar.png'
              }
            />
          </Box>
          <Divider />
          {loading ? (
            <GlobalLoader />
          ) : (
            <SingleMeDetails meDetails={meDetails} />
          )}
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <SingleMeAddProduct meId={id} />
        </Box>
      </Modal>
    </Container>
  );
};

export default SingleMe;
