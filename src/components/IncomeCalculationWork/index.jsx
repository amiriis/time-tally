import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

function IncomeCalculationWork({ work }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        income_calculation: work?.settings.income_calculation || false,
        income_coefficient: work?.settings.income_coefficient || "1",
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        income_calculation: Yup.boolean().required(),
        income_coefficient: Yup.number().required(),
      })}
      onSubmit={async (values) => {
        const _data = {
          settings: {
            ...work.settings,
            income_calculation: values.income_calculation,
            income_coefficient: values.income_coefficient,
          },
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
            action: "edit work (settings income)",
            params: { old: work, now: _data },
            user: user,
            error: errorData,
            created_at: moment().toDate(),
          });
        }
        router.back();
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ my: 1 }}>
            <Typography variant="subtitle2" color={"primary.main"}>
              Settings / Income calculation
            </Typography>
            <Stack spacing={2} sx={{ py: 1 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <IconButton onClick={() => router.back()}>
                  <ArrowBack fontSize="inherit" />
                </IconButton>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Change
                </Button>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack>
                  <Typography>Activate income calculation</Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    In work analytics
                  </Typography>
                </Stack>
                <Switch
                  name="income_calculation"
                  checked={values.income_calculation}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Stack>
              <TextField
                name="income_coefficient"
                disabled={isSubmitting || !values.income_calculation}
                value={values.income_coefficient}
                onBlur={handleBlur}
                type="number"
                onChange={handleChange}
                autoComplete="off"
                variant="outlined"
                label={"Enter income coefficient (per hour)"}
              />
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default IncomeCalculationWork;
