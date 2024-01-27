import { useAuth } from '@/contexts/auth';
import { Container, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import * as Yup from "yup";

function IncomeCalculationWork({work}) {
    const { user } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        income_calculation: work?.settings.income_calculation || false,
        income_calculation_coefficient:
          work?.settings.income_calculation_coefficient || "",
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        income_calculation: Yup.boolean().required(),
        income_calculation_coefficient: Yup.number().required(),
      })}
      onSubmit={async (values) => {
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting, isValid, dirty }) => (
        <Form>
          <Container maxWidth={"xs"} sx={{ my: 1 }}>
            <Typography variant="subtitle2" color={"primary.main"}>
              Settings / Income calculation
            </Typography>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default IncomeCalculationWork;