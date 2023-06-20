import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function TableLoader() {
  return (
    <TableRow>
      <TableCell align='center' colSpan={100}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
}