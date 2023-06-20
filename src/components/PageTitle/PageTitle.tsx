import { Typography, Grid, Divider } from "@mui/material";

export default function PageTitle({ title }: { title: string }) {
  return (
    <>
      <Grid item xs={12} textAlign={"left"}  p={1} pl={2}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Grid>
      <Divider />
    </>
  );
}
