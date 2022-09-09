import Sidebar, { ItemProperties, SidebarProps } from "@/components/Sidebar";
import OnboardingProvider, {
  OnboardingContext,
} from "@/providers/OnboardingProvider";
import classNames from "classnames";
import trimStart from "lodash/trimStart";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import AccountDetails from "./Form/AccountDetails";
import BusinessDetails from "./Form/BusinessDetails";
import Representatives from "./Form/Representatives";
import styles from "./styles.module.scss";

const options: SidebarProps["items"] = [
  {
    completed: false,
    enabled: false,
    active: false,
    title: "Business Details",
    subtitle: "About 1 minute",
    property: "BUSINESS_DETAILS",
    path: "/business",
    requires: [],
  },
  {
    completed: false,
    enabled: true,
    active: false,
    title: "Account Details",
    subtitle: "About 1 minute",
    property: "DEALER_BILLING_COSTS",
    requires: ["BUSINESS_DETAILS"],
    path: "/account",
  },
  {
    completed: false,
    enabled: true,
    active: false,
    title: "Add Dealer Representatives",
    subtitle: "About 4 minute",
    property: "DEALER_REPRESENTATIVES",
    requires: ["BUSINESS_DETAILS", "DEALER_BILLING_COSTS"],
    path: "/representative",
  },
];

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [query] = useSearchParams();
  const dealerId = query.get("dealer");
  const { dealer, admin } = useContext(OnboardingContext);
  const [dealerData, setDealerData] = useState<Record<string, any>>({
    BUSINESS_DETAILS: admin,
    DEALER_BILLING_COSTS: dealer?._source.payload.dms_account_number,
  });

  const goToStep = useCallback(
    (step: string) => {
      const q = dealerId ? `?dealer=${dealerId}` : "";
      navigate(`/onboarding/${trimStart(step, "/")}${q}`);
    },
    [navigate, dealerId]
  );

  const sidebarOptions: SidebarProps["items"] = useMemo(() => {
    const { step } = params;

    return options.map((option, index) => {
      const enabled = option.requires?.every((key) => Boolean(dealerData[key]));

      return {
        ...option,
        enabled: index === 0 || enabled,
        active: trimStart(option.path, "/") === step,
        completed: Boolean(dealerData[option.property]),
        onClick: () => {
          goToStep(option.path);
        },
      };
    });
  }, [dealerData, params, goToStep]);

  const activeStep: ItemProperties = useMemo(() => {
    const { step } = params;
    const activeProperty = options.find(
      ({ path }) => trimStart(path, "/") === step
    )?.property;

    return activeProperty as ItemProperties;
  }, [params]);

  const onNext = (key: ItemProperties, data: Record<string, any>) => {
    setDealerData((prev) => {
      prev[key] = data;
      return prev;
    });
    const index = options.findIndex(({ property }) => property === key);
    const next = options[index + 1];
    if (next) {
      goToStep(next.path);
    } else {
      navigate("/profile");
    }
  };

  return (
    <Row>
      <Col lg={9}>
        <Card className={classNames(styles.contactForm, "p-3")}>
          {activeStep === "BUSINESS_DETAILS" && (
            <BusinessDetails onNext={onNext} />
          )}
          {activeStep === "DEALER_BILLING_COSTS" && (
            <AccountDetails onNext={onNext} />
          )}
          {activeStep === "DEALER_REPRESENTATIVES" && (
            <Representatives onNext={onNext} />
          )}
        </Card>
      </Col>
      <Col lg={3} className="d-none d-sm-block">
        <Sidebar
          title="Dealer Profile Registration"
          activeStep={activeStep}
          items={sidebarOptions.filter(({ visible }) => visible ?? true)}
        />
      </Col>
    </Row>
  );
};

const Onboarding = () => {
  return (
    <OnboardingProvider>
      <Onboard />
    </OnboardingProvider>
  );
};

export default Onboarding;
