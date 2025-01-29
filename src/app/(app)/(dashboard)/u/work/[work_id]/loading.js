"use client";
import { Stack, Skeleton } from "@mui/material";

export default function Loading() {
    return (
        <>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Skeleton animation="wave" variant="text" sx={{ width: "40%", fontSize: "1.5rem" }} />
            </Stack>
            <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                <Skeleton animation="wave" variant="text" sx={{ width: "30%", fontSize: "0.75rem" }} />
                <Skeleton animation="wave" variant="rounded" width={140} height={31} />
            </Stack>
            <Stack sx={{ my: 3 }}>
                <Skeleton animation="wave" variant="rounded" height={58} sx={{ my: 1 }} />
                <Skeleton animation="wave" variant="rounded" height={58} sx={{ my: 1 }} />
                <Skeleton animation="wave" variant="rounded" height={58} sx={{ my: 1 }} />
                <Skeleton animation="wave" variant="rounded" height={58} sx={{ my: 1 }} />
            </Stack>
        </>
    );
}
