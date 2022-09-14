import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import { AppRoutes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import classNames from "classnames";
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import styles from "./styles.module.scss";

const loginValidation = yup.object({
  email: yup
    .string()
    .required("Please enter email address.")
    .email("Please enter valid email address."),
  password: yup.string().required("Please enter password."),
});

const Login: React.FC = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const reuturnURL = decodeURIComponent(
    params.get("returnUrl") || AppRoutes.DASHBOARD
  );

  const onLogin = (values: { email: string; password: string }) => {
    login(values, () => {
      navigate(reuturnURL);
    });
  };

  return (
    <Row className={classNames(styles.loginContainer)}>
      <Col
        sm={{
          offset: 4,
          size: 8,
        }}
        lg={{
          offset: 5,
          size: 5,
        }}
        xl={{
          offset: 4,
          size: 5,
        }}
        xs={{
          offset: 1,
          size: 10,
        }}
      >
        <div className="text-center">
          <h2>Dealer Account Login</h2>
          <p className={classNames(styles.text, "font-weight-normal")}>
            Please login to your account below.
          </p>
        </div>
        <Form
          initialValues={{}}
          onSubmit={onLogin}
          validationSchema={loginValidation}
        >
          <Input name="email" label="Email" placeholder="Enter email" />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <div className="d-flex justify-content-center mt-4">
            <Link to="/security/forgotpassword">
              <p className={classNames(styles.fPassword, "mx-1")}>
                Forgot Password?
              </p>
            </Link>
          </div>

          <Button block size="sm" type="submit" isLoading={isLoggingIn}>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
