import { Box, Typography } from '@mui/material';
import { ISingleME } from '../../../utils/Type/type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface IProps {
  meDetails: ISingleME;
}

const SingleMeProduct = ({ meDetails }: IProps) => {
  return (
    <Box mt={5}>
      <TableContainer component={Paper}>
        {meDetails.product.length ? (
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ fontWeight: '700' }}>
                  ID
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: '700' }}>
                  Me Name
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: '700' }}>
                  Name
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: '700' }}>
                  Category Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meDetails?.product?.map((sProduct) => (
                <TableRow
                  key={sProduct.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row' align='center'>
                    {sProduct.id}
                  </TableCell>
                  <TableCell align='center'>{sProduct.me_name}</TableCell>
                  <TableCell align='center'>{sProduct.name}</TableCell>
                  <TableCell align='center'>{sProduct.category_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color='red' textAlign='center'>
            No product found
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default SingleMeProduct;
