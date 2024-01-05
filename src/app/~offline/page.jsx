"use client"
import { Zoom, Stack, Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/icons/timtally-logo.png";

export default function Offline() {
  return (
    <Zoom in={true}>
      <Container sx={{ height: "100vh" }} maxWidth="xs">
        <Stack
          sx={{ height: "100%" }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
        >
          <Box
            component={Image}
            priority
            src={logo}
            alt="Time Tally Logo"
            width={80}
            height={80}
            sx={{ filter: "grayscale(1)" }}
          />
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Typography fontWeight={300} variant="h4">
              You are offline
            </Typography>
            <Typography>Please check your network access</Typography>
          </Stack>
        </Stack>
      </Container>
    </Zoom>
  );
}
