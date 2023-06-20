import { Button, CircularProgress } from '@mui/material';

const ButtonLoader = () => {
  return (
    <div>
      <Button variant='contained' disabled>
        loading
        <CircularProgress size={'20px'} sx={{ ml: 1 }} />
      </Button>
    </div>
  );
};

export default ButtonLoader;
