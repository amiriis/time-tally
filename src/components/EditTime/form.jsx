import { useAuth } from "@/contexts/auth";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import * as Yup from "yup";

function EditTimeForm({ time, setOpenDrawer }) {
    const { user } = useAuth();

    return (
        <Formik
            initialValues={{
                started_at: moment(time.started_at.toDate()),
                ended_at: moment(time.ended_at.toDate()),
            }}
            validationSchema={Yup.object().shape({
                started_at: Yup.date().required(),
                ended_at: Yup.date().required(),
            })}
            onSubmit={async (values) => {
                const started_at = values.started_at;
                const ended_at = values.ended_at;

                const durationInMilliseconds = ended_at.diff(started_at);
                const duration = convertDurationToTime(durationInMilliseconds);

                const total_time = {
                    duration: durationInMilliseconds,
                    hours: duration.hours,
                    minutes: duration.minutes,
                    seconds: duration.seconds,
                };

                const _data = {
                    started_at: started_at.toDate(),
                    ended_at: ended_at.toDate(),
                    total_time,
                    updated_at: moment().toDate(),
                };
                try {
                    updateDoc(doc(collection(db, "times"), time.id), _data);
                } catch (error) {
                    const errorData = {
                        code: error.code,
                        message: error.message,
                        stack: error.stack,
                    };
                    addDoc(collection(db, "logs"), {
                        action: "edit time",
                        params: { old: time, now: _data },
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
                                <Typography variant="h5">Edit time</Typography>
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
                                value={values.started_at !== "" ? values.started_at.toDate() : null}
                                onChange={(newValue) => {
                                    setFieldValue("started_at", moment(newValue));
                                }}
                                maxDateTime={values.ended_at.toDate()}
                                label="Enter start"
                            />
                            <DateTimePicker
                                ampm={false}
                                disabled={isSubmitting}
                                value={values.ended_at !== "" ? values.ended_at.toDate() : null}
                                onChange={(newValue) => {
                                    setFieldValue("ended_at", moment(newValue));
                                }}
                                minDateTime={values.started_at.toDate()}
                                label="Enter end"
                            />
                        </Stack>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}

export default EditTimeForm;
