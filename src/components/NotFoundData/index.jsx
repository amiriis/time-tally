import NoData from "@/svgs/NoData";
import { Stack } from "@mui/material";

function NotFoundData({ width, height }) {
    return (
        <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
            <NoData width={width} height={height} />
        </Stack>
    );
}

export default NotFoundData;
