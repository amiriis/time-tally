'use client'
import { Container, Stack, Typography, keyframes, styled } from "@mui/material";

const blinkAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    letter-spacing: 8px;
  }
  50% {
    transform: scale(0.6);
    letter-spacing: 0px;
  }
`;

const BlinkingText = styled(Typography)`
  animation: ${blinkAnimation} 2s infinite;
`;

function LoadingPage() {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="xs">
      <Stack
        sx={{ height: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={5}
      >
        <Stack alignItems={"center"} justifyContent={"center"}>
          <BlinkingText variant="h4" fontWeight={"900"} color={"primary.main"}>
            Time Tally
          </BlinkingText>
        </Stack>
      </Stack>
    </Container>
  );
}

export default LoadingPage;
