import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { collection, doc, runTransaction } from "firebase/firestore";
import { Form, Formik } from "formik";
import { useSWRConfig } from "swr";
import * as Yup from "yup";

function StartFromForm({
  work,
  setOpenDrawer,
  setDisabled = () => {},
  default_started_at = "",
}) {
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={{
        started_at: default_started_at,
      }}
      validationSchema={Yup.object().shape({
        started_at: Yup.date().required(),
      })}
      onSubmit={async (values) => {
        setDisabled(true);
        const documentRef = doc(collection(db, "works"), work.id);
        try {
          await runTransaction(db, async (transaction) => {
            const documentSnapshot = await transaction.get(documentRef);
            if (documentSnapshot.exists()) {
              const _work = documentSnapshot.data();

              transaction.update(documentRef, {
                is_time_tracking: true,
                time_tracking_started_at: values.started_at.toDate(),
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  ampm={false}
                  disabled={isSubmitting}
                  disableFuture
                  value={values.started_at !== "" ? values.started_at : null}
                  onChange={(newValue) => {
                    setFieldValue("started_at", newValue);
                  }}
                  label="Enter start"
                />
              </LocalizationProvider>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default StartFromForm;
