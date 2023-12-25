import { db } from "@/lib/firebase";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import React from "react";
import { useSWRConfig } from "swr";

function EditWorkForm({ work, setOpenDrawer }) {
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={{
        name: work.name,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        try {
            const history = Object.entries(work).reduce(
              (acc, [key, value]) => {
                if (key !== "change_history") {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            );
          await updateDoc(doc(collection(db, "works"), work.id), {
            name: values.name,
            updated_at: serverTimestamp(),
            change_history: work.change_history
              ? [history, ...work.change_history]
              : [history],
          });
          mutate("list_work");
          setOpenDrawer(false);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ py: 5 }}>
            <Stack spacing={3}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">Edit work</Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Update
                </Button>
              </Stack>
              <TextField
                name="name"
                disabled={isSubmitting}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                variant="outlined"
                label={"Enter name"}
              />
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default EditWorkForm;
