import {colord} from "colord";

const theme = {
    palette: {
        primary: {
            main: process.env.NEXT_PUBLIC_PRIMARY_MAIN,
            contrastText: "#FFFFFF",
            light: colord(process.env.NEXT_PUBLIC_PRIMARY_MAIN).lighten(0.1).toHex(),
            dark: colord(process.env.NEXT_PUBLIC_PRIMARY_MAIN).darken(0.1).toHex(),
        },
        secondary: {
            main: process.env.NEXT_PUBLIC_SECONDARY_MAIN,
            contrastText: "#FFFFFF",
            light: colord(process.env.NEXT_PUBLIC_SECONDARY_MAIN).lighten(0.1).toHex(),
            dark: colord(process.env.NEXT_PUBLIC_SECONDARY_MAIN).darken(0.1).toHex(),
        },
    },
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: colord(process.env.NEXT_PUBLIC_PRIMARY_MAIN).darken(0.2).alpha(0.7).toHex(),
                },
            },
        },
    },
};

export default theme;
