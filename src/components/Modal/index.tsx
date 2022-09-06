import { Cross } from "@/assets/images";
import classNames from "classnames";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";
import omit from "lodash/omit";
import { Fragment } from "react";
import {
  Modal as NativeModal,
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalHeader,
  ModalProps as NativeModalProps,
} from "reactstrap";
import Button, { ButtonProps } from "../Button";
import Space from "../Space";
import styles from "./styles.module.scss";

export interface ModalProps extends Omit<NativeModalProps, "title"> {
  title?: string | React.ReactNode;
  footer?: React.ReactNode | null;
  okText?: string;
  okButtonProps?: Partial<ButtonProps>;
  onOk?: () => void;
  cancelText?: string;
  cancelButtonProps?: Partial<ButtonProps>;
  onCancel?: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
  toggle: () => void;
  filledHeader?: boolean;
  noHeader?: boolean;
  centered?: boolean;
  bodyProps?: ModalBodyProps;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  children,
  footer,
  okText,
  cancelText,
  onOk,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  filledHeader,
  noHeader,
  centered = true,
  bodyProps = {},
  ...props
}) => {
  const FooterComponent = !isNull(footer) ? ModalFooter : Fragment;

  return (
    <NativeModal
      isOpen={isOpen}
      centered={centered}
      {...props}
      unmountOnClose
      toggle={toggle}
      className={styles.modal}
    >
      {!noHeader && (
        <ModalHeader
          toggle={toggle}
          className={classNames({
            [styles.filledHeader]: filledHeader,
          })}
          close={
            <span onClick={toggle} className={styles.closeIcon}>
              {<Cross />}
            </span>
          }
        >
          {title}
        </ModalHeader>
      )}
      <ModalBody {...bodyProps}>{children}</ModalBody>

      <FooterComponent>
        {isUndefined(footer) && (
          <Space>
            <Button
              onClick={onCancel}
              className={classNames(
                cancelButtonProps?.className,
                styles.footerButton
              )}
              {...omit(cancelButtonProps, "className")}
              outline
            >
              {cancelText || "Cancel"}
            </Button>
            <Button
              color="secondary"
              className={classNames(
                okButtonProps?.className,
                styles.footerButton
              )}
              onClick={onOk}
              {...omit(okButtonProps, "className")}
            >
              {okText || "Ok"}
            </Button>
          </Space>
        )}
        {!isUndefined(footer) ? footer : null}
      </FooterComponent>
    </NativeModal>
  );
};

export default Modal;
