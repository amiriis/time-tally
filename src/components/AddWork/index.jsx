"use client";
import { Button } from "@mui/material";
import Link from "next/link";

function AddWork() {
    return (
        <>
            <Button component={Link} href={`/u/add-work`} variant="outlined">
                Add
            </Button>
        </>
    );
}

export default AddWork;
