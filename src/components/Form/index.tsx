import { Form as NativeForm, Formik, FormikConfig } from "formik";
import React from "react";

interface FormProps extends FormikConfig<any> {
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues = {},
  validationSchema,
  children,
  ...props
}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      {...props}
    >
      <NativeForm>{children}</NativeForm>
    </Formik>
  );
};

export default Form;
