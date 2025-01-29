"use client";
import { useAuth } from "@/contexts/auth";
import { GitHub } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, CircularProgress, Container, Stack, Typography } from "@mui/material";

function LoginPage() {
    const { loginWithGoogle, loginWithGithub, loginIsLoading } = useAuth();

    return (
        <Container sx={{ height: "100vh" }} maxWidth="xs">
            <Stack sx={{ height: "100%" }} alignItems={"center"} justifyContent={"center"} spacing={5}>
                <Stack>
                    <Typography variant="subtitle1">To use</Typography>
                    <Typography variant="h3" color={"primary.main"}>
                        Time Tally
                    </Typography>
                    <Typography variant="subtitle1" textAlign={"right"}>
                        you must first
                    </Typography>
                </Stack>
                <Stack alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <Button
                        sx={{ px: 4 }}
                        onClick={loginWithGoogle}
                        variant="contained"
                        size={"large"}
                        disabled={loginIsLoading}
                        color="error"
                        startIcon={!loginIsLoading ? <GoogleIcon /> : <CircularProgress color="inherit" size={16} />}
                    >
                        sign in With Google
                    </Button>
                    <Typography>or</Typography>
                    <Button
                        sx={{ px: 4 }}
                        onClick={loginWithGithub}
                        variant="contained"
                        size={"large"}
                        disabled={loginIsLoading}
                        color="black"
                        startIcon={!loginIsLoading ? <GitHub /> : <CircularProgress color="inherit" size={16} />}
                    >
                        sign in With Github
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}

export default LoginPage;
