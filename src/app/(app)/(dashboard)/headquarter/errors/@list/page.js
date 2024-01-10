'use client'
import NotFoundData from "@/components/NotFoundData";
import { useApp } from "@/contexts/app";
import { db } from "@/lib/firebase";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from "jalali-moment";

function Page() {
    const { setLocalDb } = useApp();
    const [listErrors, setListErrors] = useState();

    useEffect(() => {
        const q = query(
            collection(db, "logs"),
            orderBy("created_at", "desc")
        );
        const unsubscribe = onSnapshot(
            q,
            { includeMetadataChanges: true },
            (querySnapshot) => {
                const _errors = [];
                querySnapshot.forEach((doc) => {
                    _errors.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setListErrors(_errors);
                setLocalDb(querySnapshot.metadata.fromCache);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [setLocalDb]);

    return (
        <>
            {listErrors && (
                <>
                    {listErrors.length ? (
                        <Stack sx={{ my: 3 }}>
                            {listErrors.map((error) => (
                                <Accordion key={error.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${error.id}-content`}
                                        id={`panel${error.id}-header`}
                                    >
                                        <Typography variant="body2" sx={{ width: '50%', flexShrink: 0 }}>{error.action}</Typography>
                                        <Typography variant="caption">{moment(error.created_at.toDate()).format('jYYYY/jMM/jDD | HH:mm:ss')}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack spacing={2}>
                                            <Stack>
                                                <Divider><Typography variant="caption">Code</Typography></Divider>
                                                <Typography textAlign={'center'} variant="caption">{error.error.code}</Typography>
                                            </Stack>
                                            <Stack>
                                                <Divider><Typography variant="caption">Message</Typography></Divider>
                                                <Typography textAlign={'center'} variant="caption">{error.error.message}</Typography>
                                            </Stack>
                                            <Stack>
                                                <Divider><Typography variant="caption">Stack</Typography></Divider>
                                                <Typography variant="caption">{error.error.stack}</Typography>
                                            </Stack>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    ) : (
                        <NotFoundData width={150} height={150} />
                    )}
                </>
            )}
        </>
    )
}

export default Page