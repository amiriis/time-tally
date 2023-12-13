import {createTheme} from "@mui/material/styles";
import theme from "./theme";

const themeRtl = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: `IRANSansFaNum, sans-serif`,
    },
    ...theme,
});

export default themeRtl;
