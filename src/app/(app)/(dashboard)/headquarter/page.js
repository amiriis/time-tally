import { Button, Stack } from "@mui/material";
import Link from "next/link";

export const metadata = {
    title: "Headquarter",
};

function HeadquarterPage() {
    return (
        <Stack spacing={2}>
            <Button component={Link} href={`/headquarter/errors`} passHref size="large" variant="outlined">
                Errors
            </Button>
        </Stack>
    );
}

export default HeadquarterPage;
