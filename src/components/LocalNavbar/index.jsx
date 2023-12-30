import { Box, Container, Typography } from "@mui/material";

function LocalNavbar() {
  return (
    <Box sx={{ bgcolor: "secondary.light" }}>
      <Container maxWidth="xs">
        <Typography component={"div"} textAlign={"center"} variant="caption">
          Local changes
        </Typography>
      </Container>
    </Box>
  );
}

export default LocalNavbar;
