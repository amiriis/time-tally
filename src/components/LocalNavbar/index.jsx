"use client";
import useOnlineStatus from "@/hooks/useOnlineState";
import { Box, Container, Typography } from "@mui/material";

function LocalNavbar() {
    const isOnline = useOnlineStatus();

    return (
        <Box sx={{ bgcolor: "secondary.light" }}>
            <Container maxWidth="xs">
                <Typography component={"div"} textAlign={"center"} variant="caption">
                    Local changes {!isOnline && `in offline mode`}
                </Typography>
            </Container>
        </Box>
    );
}

export default LocalNavbar;
