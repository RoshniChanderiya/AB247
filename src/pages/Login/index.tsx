import { Button, Col, Form, Input, Row } from '@autobid247/theme';
import classNames from 'classnames';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

import { AppRoute } from '@/constants/AppRoutes';
import useAuth from '@/hooks/useAuth';

import styles from './styles.module.scss';

const loginValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address.')
    .email('Please enter valid email address.'),
  password: yup.string().required('Please enter password.'),
});

const Login: React.FC = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const reuturnURL = decodeURIComponent(params.get('returnUrl') || AppRoute.DASHBOARD);

  const onLogin = (values: { email: string; password: string }) => {
    login(values, () => {
      navigate(reuturnURL);
    });
  };

  return (
    <Row className={classNames(styles.loginContainer)}>
      <Col
        sm={{
          offset: 2,
          size: 8,
        }}
        lg={{
          offset: 3,
          size: 6,
        }}
        xl={{
          offset: 4,
          size: 4,
        }}
        xs={{
          size: 12,
        }}
      >
        <div className="text-center">
          <h2>Dealer Account Login</h2>
          <p className={classNames(styles.text, 'font-weight-normal')}>
            Please login to your account below.
          </p>
        </div>
        <Form initialValues={{}} onSubmit={onLogin} validationSchema={loginValidation}>
          <Input name="email" label="Email" placeholder="Enter email" />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
          />

          <Button block size="sm" type="submit" isLoading={isLoggingIn}>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
