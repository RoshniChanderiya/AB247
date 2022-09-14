import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import { AppRoutes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import classNames from "classnames";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import styles from "./styles.module.scss";

const ResetPasswordValidation = yup.object({
  newPassword: yup.string().required("Please enter new password."),
  confirmPassword: yup
    .string()
    .required("Please enter confirm password.")
    .oneOf([yup.ref("newpassword"), null], "Confirm password must be match!"),
});

const ResetPassword: React.FC = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const reuturnURL = decodeURIComponent(
    params.get("returnUrl") || AppRoutes.LOGIN
  );

  const onResetPassword = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    navigate(reuturnURL);
  };

  return (
    <div className={classNames(styles.resetPwdContainer)}>
      <div className={classNames(styles.resetPwdSection)}>
        <div className="text-center">
          <h2>Reset Password</h2>
          <p className={classNames(styles.text, "font-weight-normal", "mb-5")}>
            Please reset your password.
          </p>
        </div>
        <Form
          initialValues={{}}
          onSubmit={onResetPassword}
          validationSchema={ResetPasswordValidation}
        >
          <Input
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Enter confirm  password"
          />
          <Button block size="sm" type="submit" isLoading={isLoggingIn}>
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
