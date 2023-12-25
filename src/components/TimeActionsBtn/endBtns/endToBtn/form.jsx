import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  collection,
  deleteField,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import moment from "jalali-moment";

function EndToForm({ work, setOpenDrawer, setDisabled }) {
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={{
        ended_at: "",
      }}
      validationSchema={Yup.object().shape({
        ended_at: Yup.date().required(),
      })}
      onSubmit={async (values) => {
        setDisabled(true);
        const documentRef = doc(collection(db, "works"), work.id);
        try {
          await runTransaction(db, async (transaction) => {
            const documentSnapshot = await transaction.get(documentRef);
            if (documentSnapshot.exists()) {
              const _work = {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              };

              const started_at = _work.time_tracking_started_at.toDate();
              const ended_at = values.ended_at;

              const durationInMilliseconds = ended_at.diff(started_at);
              const duration = moment.duration(durationInMilliseconds);

              const total_time = {
                duration: durationInMilliseconds,
                hours: Math.floor(duration.asHours()),
                minutes: duration.minutes(),
                seconds: duration.seconds(),
              };

              transaction.set(doc(collection(db, "times")), {
                started_at,
                ended_at: ended_at.toDate(),
                total_time,
                wid: _work.id,
                uid: _work.uid,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
              });

              transaction.update(documentRef, {
                is_time_tracking: false,
                time_tracking_started_at: deleteField(),
              });
            } else {
              setDisabled(false);
              throw new Error("Document not found.");
            }
          });
        } catch (error) {
          setDisabled(false);
          console.error(error);
        }
        mutate(`get_work_${work.id}`);
        mutate(`list_time_${work.id}`);
        setOpenDrawer(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        isValid,
        dirty,
        setFieldValue,
      }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ py: 5 }}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">End to</Typography>
                <Button
                  variant="text"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  send
                </Button>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  ampm={false}
                  disabled={isSubmitting}
                  value={values.ended_at !== "" ? values.ended_at : null}
                  onChange={(newValue) => {
                    setFieldValue("ended_at", newValue);
                  }}
                  minDateTime={moment(work.time_tracking_started_at.toDate())}
                  label="Enter DateTime"
                />
              </LocalizationProvider>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default EndToForm;
