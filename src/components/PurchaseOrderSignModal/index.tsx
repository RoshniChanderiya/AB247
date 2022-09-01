import Button from "@/components/Button";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import styles from "./styles.module.scss";
interface PandadocIframeProps {
  link: string;
  buttonText: string;
}
const PurchaseOrderSignModal: React.FC<PandadocIframeProps> = ({
  link,
  buttonText,
}) => {
  const [openIFrame, setOpenIFrame] = useState(false);

  const toggle = () => setOpenIFrame((prev) => !prev);

  return (
    <>
      <Button onClick={toggle} size="sm">
        {buttonText}
      </Button>
      <Modal
        noHeader
        size="lg"
        isOpen={openIFrame}
        toggle={toggle}
        bodyProps={{
          className: styles.modalContainer,
        }}
        footer={
          <div className="text-center">
            <Button
              size="lg"
              className={styles.closeButton}
              onClick={toggle}
              outline
            >
              Close
            </Button>
          </div>
        }
      >
        <iframe title="sign the deal" src={link} width="100%" height="100%" />
      </Modal>
    </>
  );
};

export default PurchaseOrderSignModal;
