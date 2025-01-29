import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0fa3b1",
        },
        secondary: {
            main: "#eddea4",
        },
        black: {
            main: "#0d1117",
            contrastText: "#ffffff",
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === "info" && {
                        backgroundColor: "#60a5fa",
                    }),
                }),
            },
        },
    },
});

export default theme;
