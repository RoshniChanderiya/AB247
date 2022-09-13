import Button from "@/components/Button";
import Form from "@/components/Form";
import Input, { InputProps } from "@/components/Form/Input";
import Link from "@/components/Link";
import React, { useState } from "react";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import * as yup from "yup";
import { UserInfoProps } from "../TransportVehicleModal";
import styles from "./styles.module.scss";

interface TransportFormProps {
  title: React.ReactNode;
  fields: { label: React.ReactNode; value: React.ReactNode }[];
  editable?: {
    title?: React.ReactNode;
    onSave: (data: UserInfoProps) => void;
    fields: (InputProps | InputProps[])[];
    validations?: yup.AnySchema;
  };
  initialValues?: UserInfoProps;
}
const TransportForm: React.FC<TransportFormProps> = ({
  title,
  fields,
  editable,
  initialValues,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const onEdit = () => {
    setShowEditForm(true);
  };
  const onCancel = () => {
    setShowEditForm(false);
  };
  const onSave = (values: UserInfoProps) => {
    setShowEditForm(false);
    if (editable) editable.onSave(values);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>{title}:</h5>
        {editable && !showEditForm && (
          <Link variant="primary" onClick={onEdit} to="">
            {editable.title || "Edit Details"}
          </Link>
        )}
      </div>
      {!showEditForm && (
        <Row>
          {fields.map((field) => (
            <React.Fragment key={field.label?.toString()}>
              <Col md={6} className={styles.title}>
                {field.label}
              </Col>
              <Col md={6} className={styles.titleDetail}>
                {field.value}
              </Col>
            </React.Fragment>
          ))}
        </Row>
      )}
      {editable && showEditForm && (
        <>
          <Form
            initialValues={initialValues}
            onSubmit={onSave}
            validationSchema={editable.validations}
          >
            <Card>
              <CardBody>
                <CardText>
                  {editable.fields.map((field) =>
                    Array.isArray(field) ? (
                      <Row className="d-flex">
                        {field.map((field) => (
                          <Col md={4} key={field.name?.toString()}>
                            <Input {...field} />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Input key={field.name?.toString()} {...field} />
                    )
                  )}
                </CardText>
                <Row className="d-flex justify-content-around">
                  <Col md={6}>
                    <Button onClick={onCancel} className="w-100" type="button">
                      Cancel
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button className="w-100 mx-2" type="submit">
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        </>
      )}
    </>
  );
};

export default TransportForm;
