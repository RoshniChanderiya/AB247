import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import classNames from "classnames";
import React from "react";
import * as yup from "yup";
import styles from "./styles.module.scss";

const forgotPasswordValidation = yup.object({
  email: yup
    .string()
    .required("Please enter email address.")
    .email("Please enter valid email address."),
});

const ForgotPassword: React.FC = () => {
  const onSubmit = (values: { email: string }) => {
    console.log(email);
  };

  return (
    <div>
      <div className="w-75">
        <h3 className="d-flex justify-content-center mt-5 fw-bold">
          Forgot Password
        </h3>
        <p
          className={classNames(
            styles.text,
            "d-flex justify-content-center font-weight-normal"
          )}
        >
          Enter your email and we send a password link.
        </p>
        <Form
          initialValues={{}}
          onSubmit={onSubmit}
          validationSchema={forgotPasswordValidation}
        >
          <Input name="email" label="Email" placeholder="Enter email" />
          <div className={classNames(styles.submit, "w-25")}>
            <Button block size="sm" type="submit">
              Send
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
function email(email: any) {
  throw new Error("Function not implemented.");
}
