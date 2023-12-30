import { db } from "@/lib/firebase";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";

function EditWorkForm({ work, setOpenDrawer }) {
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
          const history = Object.entries(work).reduce((acc, [key, value]) => {
            if (key !== "change_history") {
              acc[key] = value;
            }
            return acc;
          }, {});
          updateDoc(doc(collection(db, "works"), work.id), {
            name: values.name.toUpperCase(),
            updated_at: moment().toDate(),
            change_history: work.change_history
              ? [history, ...work.change_history]
              : [history],
          });
        } catch (error) {
          console.error(error);
        }
        setOpenDrawer(false);
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
