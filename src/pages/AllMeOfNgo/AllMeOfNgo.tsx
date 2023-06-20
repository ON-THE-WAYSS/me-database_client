import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Container, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle/PageTitle';
import TableLoader from '../../components/loading/TableLoader';
import { IMeList } from '../../utils/Type/type';
import MeTableRow from '../ME/MeTableRow';
import { useEffect, useState } from 'react';
import fetcher from '../../utils/Helpers/Fetcher/fetchApi';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';

export default function AllMeOfNgo() {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [meList, setMeList] = useState<IMeList[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetcher.get(`/api/v1/me?ngo=1`, token);
        if (res.success) {
          setMeList(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <Container sx={{ mt: 1 }} maxWidth='xl'>
        <PageTitle title={'ME LIST'} />

        <Grid
          mt={1}
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} mt={1}>
            <Card>
              {/* <Divider /> */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: '700' }}>ID</TableCell>
                      {/* <TableCell sx={{ fontWeight: '700' }}>Photo</TableCell> */}
                      <TableCell sx={{ fontWeight: '700' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>
                        Occupation
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>
                        District name
                      </TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>Address</TableCell>
                      <TableCell sx={{ fontWeight: '700' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading ? (
                      <TableLoader />
                    ) : (
                      meList?.map((singleMe: IMeList, index: number) => {
                        return (
                          <MeTableRow
                            key={singleMe.id}
                            singleMe={singleMe}
                            serial={index + 1}
                          />
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
