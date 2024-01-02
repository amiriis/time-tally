import { Container, Stack, Typography, keyframes, styled } from "@mui/material";

const blinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const BlinkingText = styled(Typography)`
  animation: ${blinkAnimation} 1.5s infinite;
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
          <BlinkingText variant="h2" fontWeight={"900"} color={"primary.main"}>
            Time Tally
          </BlinkingText>
        </Stack>
      </Stack>
    </Container>
  );
}

export default LoadingPage;
