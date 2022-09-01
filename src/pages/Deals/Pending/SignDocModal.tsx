import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Modal from "@/components/Modal";
import Space from "@/components/Space";
import { useBanks } from "@/hooks/bank";
import { useFundDealMutation } from "@/hooks/deals";
import { useTrade } from "@/hooks/trade";
import { Deals, FundDealPayload } from "@/types/deals";
import { isUUID } from "@/utils/generic";
import { formatNumber } from "@/utils/NumberFomatter";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import get from "lodash/get";
import upperFirst from "lodash/upperFirst";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import styles from "./styles.module.scss";

interface SignDocModalProps {
  deal: Deals;
}

const terms = [
  { value: 36, label: "36 Months" },
  { value: 60, label: "60 Months" },
  { value: 72, label: "72 Months" },
  { value: 84, label: "84 Months" },
];

const fundingType = [
  { value: "loan", label: "Loan" },
  { value: "lease", label: "Lease" },
  { value: "cash", label: "Cash" },
];

const signDealValidation = yup.object({
  signed: yup.string().required(),
  type: yup.string().when("signed", {
    is: "yes",
    then: yup.string().required("Please select funding type."),
    otherwise: yup.string().notRequired(),
  }),
  bank: yup.string().when("signed", {
    is: "yes",
    then: yup.string().when("type", {
      is: "cash",
      then: yup.string().notRequired(),
      otherwise: yup.string().required("Please select funded bank."),
    }),
  }),
  price: yup.number().when("signed", {
    is: "yes",
    then: yup.number().when("type", {
      is: "cash",
      then: yup.number().notRequired(),
      otherwise: yup.number().required("Please enter total payment amount."),
    }),
  }),
  funded: yup.number().when("signed", {
    is: "yes",
    then: yup.number().when("type", {
      is: "cash",
      then: yup.number().notRequired(),
      otherwise: yup.number().required("Please enter funded amount."),
    }),
  }),
  terms: yup.number().when("signed", {
    is: "yes",
    then: yup.number().when("type", {
      is: "cash",
      then: yup.number().notRequired(),
      otherwise: yup.number().required("Please select terms for funding."),
    }),
  }),
});

interface SignFormProps {
  showTradeIn: boolean;
  tradeInAmount?: number;
}
const SignForm: React.FC<SignFormProps> = ({ tradeInAmount, showTradeIn }) => {
  const { data: banks = [] } = useBanks();
  const [selectedType, setSelectedType] = useState("");
  return (
    <div className="px-4">
      <Row>
        <Col md={4}>
          <h6 className={styles.title}> Docs Signed</h6>
          <Input
            type="radio"
            name="signed"
            value="no"
            label="No"
            id="signed-yes"
          />
          <Input
            type="radio"
            name="signed"
            value="yes"
            label="Yes"
            id="signed-no"
          />
        </Col>
        {showTradeIn && (
          <Col md={8}>
            <h6 className={styles.title}> Would you like to keep Trade-in?</h6>
            <Input
              type="radio"
              name="tradeIn"
              value="no"
              label="Yes, keep it"
              id="trade-no"
            />
            <Input
              type="radio"
              name="tradeIn"
              value="yes"
              label={`No, Sell it to Accu Trade for ${formatNumber(
                tradeInAmount,
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              )}`}
              id="trade-yes"
            />
          </Col>
        )}
      </Row>
      <h5 className={classNames(styles.title, "my-4")}>Funding Information</h5>
      <Input
        name="type"
        type="select"
        label="Funding Type"
        options={fundingType}
        onChange={(e: any) => setSelectedType(e.target.value)}
      />
      {selectedType !== "cash" && (
        <Input
          name="bank"
          type="select"
          label="Select Funded Bank"
          options={banks.map(({ name }) => ({
            value: name,
            label: name,
          }))}
        />
      )}
      {selectedType !== "cash" && (
        <Input name="price" type="currency" label="Payment" />
      )}
      {selectedType !== "cash" && (
        <Input name="funded" type="currency" label="Amount Funded" />
      )}
      {selectedType !== "cash" && (
        <Input name="terms" type="select" label="Term Funded" options={terms} />
      )}
    </div>
  );
};

const SignDocModal: React.FC<SignDocModalProps> = ({ deal }) => {
  const dealId = deal._id;
  const signed = get(deal, "_source.payload.fundingDeails.signed", "no");
  const tradeInId = get(deal, "_source.payload.trade_in.id", "");

  const isValidTradeIn = isUUID(tradeInId);

  const { data: tradeDetails } = useTrade(tradeInId);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { isLoading, mutateAsync: fundDealMutation } = useFundDealMutation();

  const toggleUpdateModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const onFundDeal = async (value: FundDealPayload) => {
    try {
      await fundDealMutation({ id: dealId, data: value });
      Message.success(
        value.signed === "yes"
          ? "Deal funded successfully."
          : "Deal updated successfully."
      );
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  const tradeAmount = get(tradeDetails, "_source.payload.valaution", 0);
  return (
    <>
      <Space align="center" justify="center" size="small">
        <span className="my-auto"> {upperFirst(signed)}</span>
        <Button onClick={toggleUpdateModal} size="sm">
          UPDATE
        </Button>
      </Space>
      <Modal
        title="Update"
        filledHeader
        isOpen={showUpdateModal}
        toggle={toggleUpdateModal}
        footer={null}
      >
        <Form
          initialValues={{
            signed: "no",
            bank: "",
            type: "",
            price: "",
            funded: "",
            terms: "",
            tradeIn: "no",
          }}
          onSubmit={onFundDeal}
          validationSchema={signDealValidation}
        >
          <SignForm showTradeIn={isValidTradeIn} tradeInAmount={tradeAmount} />

          <Space justify="center">
            <Button type="button" outline onClick={toggleUpdateModal}>
              CANCEL
            </Button>
            <Button type="submit" isLoading={isLoading} loaderSize="sm">
              SUBMIT
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default SignDocModal;
