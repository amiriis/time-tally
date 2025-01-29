import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import * as Yup from "yup";
function StartFromForm({ work, setOpenDrawer, default_started_at = "" }) {
    const { user } = useAuth();
    return (
        <Formik
            initialValues={{
                started_at: default_started_at,
            }}
            validationSchema={Yup.object().shape({
                started_at: Yup.date().required(),
            })}
            onSubmit={async (values) => {
                const _data = {
                    is_time_tracking: true,
                    time_tracking_started_at: values.started_at.toDate(),
                };
                try {
                    updateDoc(doc(collection(db, "works"), work.id), _data);
                } catch (error) {
                    const errorData = {
                        code: error.code,
                        message: error.message,
                        stack: error.stack,
                    };
                    addDoc(collection(db, "logs"), {
                        action: "edit work (start now)",
                        params: { old: work, now: _data },
                        user: user,
                        error: errorData,
                        created_at: moment().toDate(),
                    });
                }
                setOpenDrawer(false);
            }}
        >
            {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty, setFieldValue }) => (
                <Form>
                    <Container maxWidth={"xs"} sx={{ py: 5 }}>
                        <Stack spacing={3}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography variant="h5">Start from</Typography>
                                <Button
                                    variant="text"
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting || !isValid || !dirty}
                                >
                                    send
                                </Button>
                            </Stack>
                            <DateTimePicker
                                ampm={false}
                                disabled={isSubmitting}
                                disableFuture
                                value={values.started_at !== "" ? values.started_at.toDate() : null}
                                onChange={(newValue) => {
                                    setFieldValue("started_at", moment(newValue));
                                }}
                                label="Enter start"
                            />
                        </Stack>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}

export default StartFromForm;
