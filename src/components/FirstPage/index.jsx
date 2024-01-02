import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

function FirstPage() {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="xs">
      <Stack
        sx={{ height: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={5}
      >
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant="h2" fontWeight={"900"} color={"primary.main"}>
            Time Tally
          </Typography>
          <Typography variant="subtitle1">
            Make your time
          </Typography>
        </Stack>
        <Button
          component={Link}
          href={`/get-started`}
          passHref
          color="primary"
          variant="outlined"
        >
          {`Get started`}
        </Button>
      </Stack>
    </Container>
  );
}

export default FirstPage;
