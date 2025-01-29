import { Skeleton, Stack } from "@mui/material"

const LoadingTimes = () => {
    return (
        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={100} height={20} />
                    <Skeleton variant="rounded" width={100} height={20} />
                </Stack>
                <Stack spacing={1}>
                    <Skeleton variant="rounded" width={100} height={20} />
                    <Skeleton variant="rounded" width={100} height={20} />
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Skeleton variant="rounded" height={70} />
                <Skeleton variant="rounded" height={70} />
            </Stack>
        </Stack>
    )
}
export default LoadingTimes