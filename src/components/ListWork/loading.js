"use client";
import { Skeleton, Stack } from "@mui/material";

export default function Loading() {
    return (
        <>
            <Stack
                sx={{
                    my: 3,
                    border: 1,
                    borderRadius: 1,
                    borderColor: "divider",
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{
                        py: 2,
                        pl: 2,
                        pr: 1,
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <Skeleton animation="wave" variant="text" sx={{ width: "40%", fontSize: "1.5rem" }} />
                    <Stack direction={"row"} spacing={2}>
                        <Skeleton animation="wave" variant="circular" width={24} height={24} />
                        <Skeleton animation="wave" variant="circular" width={24} height={24} />
                        <Skeleton animation="wave" variant="circular" width={24} height={24} />
                    </Stack>
                </Stack>
                <Stack spacing={1} sx={{ p: 2 }}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Skeleton animation="wave" variant="text" sx={{ width: "20%", fontSize: "1rem" }} />
                        <Skeleton animation="wave" variant="text" sx={{ width: "10%", fontSize: "1rem" }} />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Skeleton animation="wave" variant="text" sx={{ width: "40%", fontSize: "1rem" }} />
                        <Skeleton animation="wave" variant="text" sx={{ width: "10%", fontSize: "1rem" }} />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Skeleton animation="wave" variant="text" sx={{ width: "30%", fontSize: "1rem" }} />
                        <Skeleton animation="wave" variant="text" sx={{ width: "10%", fontSize: "1rem" }} />
                    </Stack>
                </Stack>
                <Skeleton animation="wave" variant="rectangular" height={40} />
            </Stack>
        </>
    );
}
