import Button from "@/components/Button";
import ThemeInput from "@/components/ThemeInput";
import classNames from "classnames";
import React, { useEffect, useImperativeHandle, useState } from "react";
import styles from "./styles.module.scss";

export interface FloorPriceInputProps {
  label?: string;
  size?: "sm" | "lg";
  buttonText?: string;
  hideButton?: boolean;
  floorPrice?: number;
  isPlacingBid?: boolean;
  center?: boolean;
  onPlaceBid?: (amount: number) => void | Promise<void>;
  className?: string;
}
export interface FloorPriceRef {
  setBidAmount: (amount: number) => void;
}

const FloorPriceInput: React.ForwardRefRenderFunction<
  FloorPriceRef,
  FloorPriceInputProps
> = (
  {
    floorPrice,
    label = "",
    size = "sm",
    buttonText = "UPDATE",
    hideButton,
    isPlacingBid,
    center,
    className,
    onPlaceBid,
  },
  ref
) => {
  const [floorBid, setFloorBid] = useState(floorPrice);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setFloorBid(floorPrice);
    }
    // we don't need to update the floor price on every focus or blur
    // eslint-disable-next-line
  }, [floorPrice]);

  useImperativeHandle(ref, () => ({
    setBidAmount: (amount: number) => setFloorBid(amount),
  }));
  return (
    <div
      className={classNames("d-flex gap-2", className, {
        "justify-content-center": center,
      })}
    >
      <div
        className={classNames(
          "my-auto",
          "py-1",
          "w-50",
          "floor-input",
          styles.floorInputContainer
        )}
      >
        <ThemeInput
          type="currency"
          value={floorBid}
          onChange={(e: any) => setFloorBid(e.target.value)}
          label={label}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
      </div>

      {!hideButton && (
        <div
          className={classNames("my-auto button-container", { "p-4": label })}
        >
          <Button
            isLoading={isPlacingBid}
            onClick={(e) => {
              e.stopPropagation();
              if (onPlaceBid) {
                onPlaceBid(floorBid as number);
              }
            }}
            size={size}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(FloorPriceInput);
