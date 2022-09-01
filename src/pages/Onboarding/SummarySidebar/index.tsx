import { Edit, PlusCircle, Trash } from "@/assets/images";
import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

interface SummarySidebarData {
  handleStepItemClick: (property: string) => void;
}
const SummarySidebar: React.FC<SummarySidebarData> = ({
  handleStepItemClick,
}) => {
  const representatives = [
    {
      id: "1",
      name: "Larry Davis",
      email: "example@gmail.com",
      role: "Developer",
      businessTitle: "General Manager / Administrator",
      phone: "123465798",
    },
    {
      id: "2",
      name: "Billy Bags",
      email: "billy.bags@gmail.com",
      role: "Developer",
      businessTitle: "New Car Manager",
      phone: "987456321",
    },
    {
      id: "3",
      name: "Larry Davis",
      email: "example@gmail.com",
      role: "Developer",
      businessTitle: "Used Car Manager",
      phone: "741852963",
    },
  ];
  return (
    <div className={styles.summarySidebar}>
      <div
        className={classNames(
          "py-3",
          "px-2",
          "d-flex",
          styles.header,
          "align-items-center",
          "justify-content-between"
        )}
      >
        <h4 className="text-white ms-4 ms-md-5 ms-lg-0 my-3 ps-3">
          Dealer Rep's
        </h4>
        <PlusCircle color="#fff" size={30} />
      </div>
      <div className={styles.profileCard}>
        {representatives.map((data: any) => {
          return (
            <>
              <div className="d-flex my-4 justify-content-between">
                <h3 className={classNames(styles.bidderNumber)}>
                  BW-Bidder-#{data.id}
                </h3>
                <div className="d-flex mx-5 mt-3">
                  <div>
                    <Edit color="#888888" />
                  </div>
                  <div className={styles.actionDelete}>
                    <Trash color="#888888" />
                  </div>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h4>
                  {data.name}{" "}
                  <span className="mx-3">| {data.businessTitle}</span>
                </h4>
                <h4>
                  <span> Email</span>
                  <br />
                  {data.email}
                </h4>
                <h4>
                  <span>phone</span>
                  <br />
                  {data.phone}
                </h4>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SummarySidebar;
