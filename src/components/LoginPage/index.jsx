"use client";
import React from "react";
import { Container, Stack, Button, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@/contexts/auth";
import LoadingPage from "../Loading";

function LoginPage() {
  const { initAuth, user, signInWithGoogle } = useAuth();

  if (!initAuth) return <LoadingPage />;
  return (
    <Container sx={{ height: "100vh" }} maxWidth="xs">
      <Stack
        sx={{ height: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={5}
      >
        <Stack>
          <Typography variant="subtitle1">To use</Typography>
          <Typography variant="h3" color={"primary.main"}>
            Time Tally
          </Typography>
          <Typography variant="subtitle1" textAlign={"right"}>
            you must first
          </Typography>
        </Stack>
        <Button
          sx={{ px: 4 }}
          onClick={signInWithGoogle}
          variant="contained"
          size={'large'}
          color="error"
          startIcon={<GoogleIcon />}
        >
          sign in With Google
        </Button>
      </Stack>
    </Container>
  );
}

export default LoginPage;
