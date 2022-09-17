import { AppRoute } from '@/constants/AppRoutes';
import { Button, Col, Form, Input, Row } from '@autobid247/theme';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import styles from './styles.module.scss';
const SetPasswordValidation = yup.object({
  password: yup.string().required('Please enter password.'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password.')
    .oneOf([yup.ref('password'), null], 'Confirm password must be match!'),
});

const SetPassword = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const reuturnURL = decodeURIComponent(params.get('returnUrl') || AppRoute.DASHBOARD);

  const onSetPassword = (values: { newPassword: string; confirmPassword: string }) => {
    console.log('values', values);
    navigate(reuturnURL);
  };
  return (
    <>
      <Row className={styles.resetSection}>
        <div className={styles.resetInn}>
          <Col className={styles.resetLeftsection}>
            <h3>Set Password</h3>
            <p
              className={classNames(
                styles.text,
                'd-flex justify-content-center font-weight-normal',
              )}
            ></p>
            <Form
              initialValues={{ password: "", confirmPassword: "" }}
              onSubmit={onSetPassword}
              validationSchema={SetPasswordValidation}
            >
              <Input
                name="password"
                label="Create Password"
                placeholder="Enter create password"
                type="password"
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter confirm  password"
              />

              <Button block size="sm" type="submit">
                VERIFY & CONTINUE
              </Button>
            </Form>
          </Col>
          <Col className={styles.resetRightsection}></Col>
        </div>
      </Row>
    </>
  );
};
export default SetPassword;
