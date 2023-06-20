import {
  // Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { IMeList } from '../../utils/Type/type';
// import { ImgUrl } from '../../utils/Helpers/Constant';
interface IProps {
  singleMe: IMeList;
  serial: number;
}

const MeTableRow = ({ singleMe, serial }: IProps) => {
  return (
    <>
      <TableRow hover>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            {serial}
          </Typography>
        </TableCell>
        {/* <TableCell>
          <Avatar
            variant='circular'
            src={
              singleMe.photo
                ? `${ImgUrl}/me_files/${singleMe.photo}`
                : '/src/assets/avatar.png'
            }
          />
        </TableCell> */}

        <TableCell>
          <Link to={`/me/${singleMe.id}`}>
            <Typography
              sx={{ maxWidth: 200 }}
              variant='body1'
              color='text.primary'
              gutterBottom
            >
              {singleMe.name ? (
                singleMe.name
              ) : (
                <Typography sx={{ color: 'red' }}>Not provided</Typography>
              )}
            </Typography>
          </Link>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            {singleMe.occupation ? (
              singleMe.occupation
            ) : (
              <Typography sx={{ color: 'red' }}>Not provided</Typography>
            )}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
            {singleMe.district_name ? (
              singleMe.district_name
            ) : (
              <Typography sx={{ color: 'red' }}>Not provided</Typography>
            )}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography
            sx={{ maxWidth: 200 }}
            variant='body1'
            color='text.primary'
            gutterBottom
          >
            {singleMe.address ? (
              singleMe.address
            ) : (
              <Typography sx={{ color: 'red' }}>Not provided</Typography>
            )}
          </Typography>
        </TableCell>

        <TableCell>
          <Link to={`/me/${singleMe.id}`}>
            <Tooltip title='view' arrow>
              <IconButton color='primary' size='small'>
                <VisibilityIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MeTableRow;
