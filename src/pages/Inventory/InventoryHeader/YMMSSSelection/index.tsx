import Button, { ButtonProps } from "@/components/Button";
import CustomSelect from "@/components/ThemeInput/CustomSelect";
import { useVehicleYears, useYearData } from "@/hooks/vehicle";
import { omit } from "lodash";
import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";

interface YMMSSSelectionProps {
  buttonProps?: Partial<Omit<ButtonProps, "onClick">> & {
    text?: string;
    onClick: (uvc: string) => Promise<void>;
  };
}
const YMMSSSelection: React.FC<YMMSSSelectionProps> = ({ buttonProps }) => {
  const [year, setYear] = useState<number>();
  const [selectedMake, setSelectedMake] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedSeries, setSelectedSeries] = useState<string>();
  const [selectedStyle, setSelectedStyle] = useState<string>();

  const { isLoading: isLoadingYear, data } = useVehicleYears();
  const { isLoading: isLoadingData, data: yearData = [] } = useYearData(
    year as number
  );

  const isLoading = isLoadingData || isLoadingYear;

  const currentModels = useMemo(
    () =>
      yearData.find(({ name }: { name: string }) => name === selectedMake)
        ?.model_list || [],
    [selectedMake, yearData]
  );

  const currentSeries: any[] = useMemo(
    () =>
      currentModels.find(({ name }: { name: string }) => name === selectedModel)
        ?.series_list || [],
    [selectedModel, currentModels]
  );

  const currentStyles: any[] = useMemo(
    () =>
      currentSeries.find(({ name }: { name: string }) =>
        selectedSeries === "base" ? name === "" : name === selectedSeries
      )?.style_list || [],
    [selectedSeries, currentSeries]
  );

  const isButttonEnabled =
    Boolean(year) &&
    Boolean(selectedMake) &&
    Boolean(selectedModel) &&
    Boolean(selectedSeries) &&
    Boolean(selectedStyle);

  return (
    <>
      <CustomSelect
        label="year"
        placeholder="Year"
        className={styles.smallInput}
        options={data?.map((year: number) => ({
          label: year,
          value: year,
        }))}
        isLoading={isLoadingYear}
        onChange={({ target: { value } }: any) => setYear(value)}
        value={year}
      />
      <CustomSelect
        label="make"
        placeholder="Make"
        className={styles.mediumInput}
        isLoading={isLoading}
        options={yearData.map(({ name }: { name: string }) => ({
          label: name,
          value: name,
        }))}
        value={selectedMake}
        onChange={({ target: { value } }: any) => setSelectedMake(value)}
        isDisabled={!Boolean(year)}
      />
      <CustomSelect
        label="model"
        placeholder="Model"
        className={styles.mediumInput}
        isLoading={isLoading}
        options={currentModels.map(({ name }: { name: string }) => ({
          label: name,
          value: name,
        }))}
        value={selectedModel}
        onChange={({ target: { value } }: any) => setSelectedModel(value)}
        isDisabled={!Boolean(selectedMake)}
      />
      <CustomSelect
        label="series"
        placeholder="Series"
        className={styles.mediumInput}
        isLoading={isLoading}
        options={currentSeries.map(({ name }: { name: string }) => ({
          label: name || "Base",
          value: name || "base",
        }))}
        value={selectedSeries}
        onChange={({ target: { value } }: any) => setSelectedSeries(value)}
        isDisabled={!Boolean(selectedModel)}
      />
      <CustomSelect
        label="style"
        placeholder="Style"
        className={styles.mediumInput}
        isLoading={isLoading}
        options={currentStyles.map(
          ({ name, uvc }: { name: string; uvc: string }) => ({
            label: name,
            value: uvc,
          })
        )}
        value={selectedStyle}
        onChange={({ target: { value } }: any) => setSelectedStyle(value)}
        isDisabled={!Boolean(selectedSeries)}
      />
      <Button
        color="secondary"
        variant="black"
        disabled={!isButttonEnabled}
        onClick={() => buttonProps?.onClick(selectedStyle as string)}
        loaderSize="sm"
        {...omit(buttonProps, [
          "text",
          "variant",
          "color",
          "disabled",
          "onClick",
        ])}
      >
        {buttonProps?.text || "UPDATE INVENTORY"}
      </Button>
    </>
  );
};

export default YMMSSSelection;
