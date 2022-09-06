import { Edit, PlusCircle, Trash } from "@/assets/images";
import Modal from "@/components/Modal";
import Space from "@/components/Space";
import {
  useDealerRePresentatives,
  useRemoveRepresentativeMutation,
} from "@/hooks/dealer";
import { OnboardingContext } from "@/providers/OnboardingProvider";
import { User } from "@/types/user";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import classNames from "classnames";
import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import styles from "./styles.module.scss";

const SummarySidebar: React.FC = () => {
  const navigate = useNavigate();
  const { dealer } = useContext(OnboardingContext);
  const { isLoading, data: representatives } = useDealerRePresentatives({
    id: dealer?._id as string,
    limit: 10000,
  });
  const { isLoading: isDeleting, mutateAsync: removeRepresentativeMutation } =
    useRemoveRepresentativeMutation();
  const [selectedId, setSelectedId] = useState<string>();

  const onEdit = (id?: string) => {
    let url = `/onboarding/representative?dealer=${dealer?._id}`;
    if (id) {
      url = `${url}&user=${id}`;
    }
    navigate(url);
  };

  const onDelete = async () => {
    try {
      await removeRepresentativeMutation({
        dealerId: dealer?._id as string,
        id: selectedId as string,
      });
      setSelectedId(undefined);
      Message.success("Representative deleted successfully.");
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };

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
        <PlusCircle color="#fff" size={30} onClick={() => onEdit()} />
      </div>
      <div className={styles.profileCard}>
        {isLoading && (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        )}
        {representatives?.data?.map((user: User, index: number) => {
          const name = [
            user._source.payload.first_name,
            user._source.payload.last_name,
          ]
            .filter(Boolean)
            .join(" ")
            .trim();
          return (
            <React.Fragment key={user._id}>
              <div className="d-flex mt-4 justify-content-between align-items-center">
                <h3 className={styles.bidderNumber}>
                  <Space align="center">
                    <Avatar round alt={name} name={name} size="40px" />
                    <span>
                      BW-Bidder-#
                      {index + 1}
                    </span>
                  </Space>
                </h3>
                <div className={styles.action}>
                  <Edit
                    className={styles.editUser}
                    onClick={() => onEdit(user._id)}
                  />
                  <Trash
                    className={styles.deleteIcon}
                    onClick={() => setSelectedId(user._id)}
                  />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.nameAndTitle}>
                  <Space>
                    {name}
                    <span>|</span>
                    <span className={styles.title}>
                      {user._source.payload.title}
                    </span>
                  </Space>
                </h4>
                <h4>
                  <span className={styles.label}> Email</span>
                  <br />
                  <span className={styles.nameAndTitle}>
                    {user._source.payload.email}
                  </span>
                </h4>
                <h4>
                  <span className={styles.label}>Phone</span>
                  <br />
                  <span className={styles.nameAndTitle}>
                    {user._source.payload.phone}
                  </span>
                </h4>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>

      <Modal
        title="Delete Representative?"
        isOpen={Boolean(selectedId)}
        toggle={() => setSelectedId(undefined)}
        onCancel={() => setSelectedId(undefined)}
        cancelText="No"
        onOk={onDelete}
        okText="Yes"
        okButtonProps={{
          isLoading: isDeleting,
          loaderSize: "sm",
        }}
      >
        Are you sure you want to delete this representative?
      </Modal>
    </div>
  );
};

export default SummarySidebar;
