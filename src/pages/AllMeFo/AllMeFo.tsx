import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

const rows = [
  {
    id: 1,
    name: "John Doe",
    ngo: "Brac",
    fo: "Jack",
    address: "73/7,Block-H,Banani,Dhaka",
  },
  {
    id: 2,
    name: "John Doe1",
    ngo: "Bra2c",
    fo: "Jack2",
    address: "73/7,Block-H,Banani,Dhaka1",
  },
  {
    id: 3,
    name: "John Doe2",
    ngo: "Brac3",
    fo: "Jack3",
    address: "73/7,Block-H,Banani,Dhaka2",
  },
  {
    id: 4,
    name: "John Doe3",
    ngo: "Brac4",
    fo: "Jack4",
    address: "73/7,Block-H,Banani,Dhaka3",
  },
  {
    id: 5,
    name: "John Doe4",
    ngo: "Brac5",
    fo: "Jack5",
    address: "73/7,Block-H,Banani,Dhaka4",
  },
  {
    id: 6,
    name: "John Doe5",
    ngo: "Brac6",
    fo: "Jack6",
    address: "73/7,Block-H,Banani,Dhaka5",
  },
  {
    id: 7,
    name: "John Doe6",
    ngo: "Brac7",
    fo: "Jack7",
    address: "73/7,Block-H,Banani,Dhaka6",
  },
];

export default function AllMeFo() {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} elevation={5}>
            <Box p={3}>
              <Typography variant="caption" fontWeight={"bold"} marginLeft={-1}>
                All ME FO
              </Typography>
            </Box>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "700" }} colSpan={1}>
                    ID
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: "700" }} colSpan={1}>
                    NGO-ME
                  </TableCell> */}
                  <TableCell sx={{ fontWeight: "700" }} colSpan={1}>
                    ME
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "700" }}
                    colSpan={1}
                    align="left"
                  >
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    {/* <TableCell align="left">{row.name}</TableCell> */}
                    <TableCell align="left">{row.ngo}</TableCell>
                    <TableCell>
                      {/* <Link to={`/ngo/${row.id}`}> */}
                      <VisibilityIcon color="primary" />
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
