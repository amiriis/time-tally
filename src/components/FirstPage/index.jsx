"use client";
import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/icons/timtally-logo.png";
import Box from "@mui/material/Box";

function FirstPage() {
    return (
        <Container sx={{ height: "100vh" }} maxWidth="xs">
            <Stack sx={{ height: "100%" }} alignItems={"center"} justifyContent={"center"} spacing={10}>
                <Stack alignItems={"center"} justifyContent={"center"}>
                    <Box component={Image} priority src={logo} alt="Time Tally Logo" width={80} height={80} />
                    <Typography component={"h1"} variant="h3" fontWeight={"900"} color={"primary.main"}>
                        Time Tally
                    </Typography>
                    <Typography variant="subtitle1">Make your time</Typography>
                </Stack>
                <Button
                    component={Link}
                    href={`/login`}
                    passHref
                    size="large"
                    fullWidth
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
