import {
  Button,
  ButtonDropdown,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Icon,
  Input,
  Row,
} from '@autobid247/theme';
import { ButtonProps } from '@autobid247/theme/dist/types/components/Button';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

import FilterIcon from '@/assets/images/icons/Iconawesomefilter.svg';
import RedDotIcon from '@/assets/images/icons/reddot.svg';
import RangeSlider from '@/components/RangeSlider';
import { MILES } from '@/constants';
import { useVehicleYears, useYearData } from '@/hooks/vehicle';
import Sidebar from '@/pages/Inventory/InventoryList/Sidebar';
import { CreateConfigurationPayload } from '@/types/vehicle';

import styles from './styles.module.scss';

interface YMMSSSelectionProps {
  buttonProps?: Partial<Omit<ButtonProps, 'onClick'>> & {
    text?: string;
    onClick: (data: CreateConfigurationPayload) => Promise<void>;
  };
  initialValue: Record<string, string>;
}

const YMMSSSelection: React.FC<YMMSSSelectionProps> = ({ buttonProps, initialValue }) => {
  const [year, setYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<string>();
  const [selectedSeries, setSelectedSeries] = useState<string>();
  const [selectedStyle, setSelectedStyle] = useState<string>();
  const { isLoading: isLoadingYear, data } = useVehicleYears();
  const { isLoading: isLoadingData, data: yearData = [] } = useYearData(year);

  const isLoading = isLoadingData || isLoadingYear;

  const currentModels = useMemo(
    () =>
      yearData.find(({ name }: { name: string }) => name === selectedMake)?.model_list ||
      [],
    [selectedMake, yearData],
  );

  const currentSeries: { name: string; style_list?: { uvc: string; name: string }[] }[] =
    useMemo(
      () =>
        currentModels.find(({ name }: { name: string }) => name === selectedModel)
          ?.series_list || [],
      [selectedModel, currentModels],
    );

  const currentStyles: { name: string; uvc: string }[] = useMemo(
    () =>
      currentSeries.find(({ name }: { name: string }) =>
        selectedSeries === 'base' ? name === '' : name === selectedSeries,
      )?.style_list || [],
    [selectedSeries, currentSeries],
  );

  const isButtonEnabled = Boolean(
    year && selectedMake && selectedModel && selectedSeries && selectedStyle,
  );

  const [showSideBar, setShowSideBar] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    if (initialValue.model_year) {
      setYear(initialValue.model_year);
    }

    if (initialValue.make) {
      setSelectedMake(initialValue.make);
    }

    if (initialValue.model) {
      setSelectedModel(initialValue.model);
    }

    if (initialValue.series) {
      setSelectedSeries(initialValue.series);
    }
    if (initialValue.uvc) {
      setSelectedStyle(initialValue.uvc);
    }
  }, [initialValue]);
  const [radiusOpen, setRadiusOpen] = useState(false);
  const toggle = () => setRadiusOpen((prevState) => !prevState);
  const [radius, setRadius] = useState('');

  return (
    <>
      <Form
        enableReinitialize
        initialValues={initialValue}
        onSubmit={(formData) => {
          buttonProps?.onClick({
            zip: '90001',
            uvc: formData.uvc || String(selectedStyle),
            radius: Number(formData.radius) || 200,
          });
        }}
      >
        <Row className={styles.parentThemeInput}>
          <Col xs={7} md={2} className="d-flex justify-content-between">
            <Row
              className={classNames(styles.otherInput, 'd-flex justify-content-around ')}
            >
              <Col xs={4}>
                <ButtonDropdown
                  isOpen={radiusOpen}
                  className={styles.buttonDropDown}
                  toggle={toggle}
                >
                  <DropdownToggle tag="span">
                    <Button type="button">
                      <Icon icon={RedDotIcon} className="me-3" alt="redDot" />
                      Radius {radius}
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu>
                    {MILES?.map((mile: number, i) => (
                      <DropdownItem
                        key={i}
                        onClick={() => setRadius(String(mile).concat(' ', 'MILES'))}
                      >
                        {mile}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col xs={5} md={8} className={classNames('d-flex justify-content-between')}>
                <div className={styles.searchDeskBtn}>
                  <Button
                    onClick={() => setDropDownOpen(!dropdownOpen)}
                    color="primary"
                    size="sm"
                    type="button"
                  >
                    Search
                  </Button>
                </div>
                <Icon
                  className={styles.filterIcon}
                  onClick={() => setShowSideBar(!showSideBar)}
                  icon={FilterIcon}
                  alt="filterIcon"
                />
              </Col>
            </Row>
          </Col>
          <Col
            xs={12}
            md={9}
            className={classNames('d-flex justify-content-around', styles.ymmContainer)}
          >
            <div
              className={classNames({
                [styles.otherInput]: !dropdownOpen,
                [styles.showHeaderSearch]: !dropdownOpen,
              })}
            >
              <Input
                type="select"
                label=""
                placeholder="Year"
                name="model_year"
                className={styles.smallInput}
                isSearchable={false}
                options={data?.map((year: number) => ({
                  label: String(year),
                  value: String(year),
                }))}
                isLoading={isLoadingYear}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
                  setYear(value)
                }
              />
            </div>
            <div
              className={classNames({
                [styles.otherInput]: !dropdownOpen,
                [styles.showHeaderSearch]: !dropdownOpen,
              })}
            >
              <Input
                type="select"
                label=""
                placeholder="Make"
                name="make"
                className={styles.mediumInput}
                isLoading={isLoading}
                options={yearData.map(({ name }: { name: string }) => ({
                  label: name,
                  value: name,
                }))}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedMake(value)
                }
                isDisabled={!year}
              />
            </div>
            <div
              className={classNames({
                [styles.otherInput]: !dropdownOpen,
                [styles.showHeaderSearch]: !dropdownOpen,
              })}
            >
              <Input
                type="select"
                label=""
                placeholder="Model"
                name="model"
                className={styles.mediumInput}
                isLoading={isLoading}
                options={currentModels.map(({ name }: { name: string }) => ({
                  label: name,
                  value: name,
                }))}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedModel(value)
                }
                isDisabled={!selectedMake}
              />
            </div>
            <div
              className={classNames({
                [styles.otherInput]: !dropdownOpen,
                [styles.showHeaderSearch]: !dropdownOpen,
              })}
            >
              <Input
                type="select"
                label=""
                placeholder="Series"
                name="series"
                className={styles.mediumInput}
                isLoading={isLoading}
                options={currentSeries.map(({ name }: { name: string }) => ({
                  label: name || 'Base',
                  value: name || 'base',
                }))}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedSeries(value)
                }
                isDisabled={!selectedModel}
              />
            </div>

            <div
              className={classNames({
                [styles.otherInput]: !dropdownOpen,
                [styles.showHeaderSearch]: !dropdownOpen,
              })}
            >
              <Input
                type="select"
                label=""
                placeholder="Style"
                name="uvc"
                className={styles.smallInput}
                isLoading={isLoading}
                options={currentStyles.map(
                  ({ name, uvc }: { name: string; uvc: string }) => ({
                    label: name,
                    value: uvc,
                  }),
                )}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedStyle(value)
                }
                isDisabled={!selectedSeries}
              />
            </div>
            <div
              className={classNames({
                [styles.showHeaderSearch]: !dropdownOpen,
                [styles.otherInput]: dropdownOpen,
              })}
            >
              <div className={styles.rangeSlider}>
                <RangeSlider variant="secondary" />
              </div>
            </div>
            <div
              className={classNames({
                [styles.showHeaderSearch]: !dropdownOpen,
                [styles.getResult]: dropdownOpen,
              })}
            >
              <Button
                color="primary"
                className={styles.getResult}
                disabled={!isButtonEnabled}
                loaderSize="sm"
              >
                GET RESULT
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      {showSideBar && (
        <div className={styles.showSideBar}>
          <div className={styles.sliderIcon}>
            <Icon
              className={styles.filterIcon}
              onClick={() => setShowSideBar(!showSideBar)}
              icon={FilterIcon}
              alt="filterIcon"
            />
          </div>
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default YMMSSSelection;
