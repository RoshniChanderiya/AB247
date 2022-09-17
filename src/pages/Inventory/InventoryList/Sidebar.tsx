import { Button, Radio, Space } from '@autobid247/theme';
import classNames from 'classnames';
import pick from 'lodash/pick';
import snakeCase from 'lodash/snakeCase';
import React, { useContext } from 'react';

import { InventoryContext } from '@/providers/InventoryProvider';
import { FilterSectionString } from '@/types/vehicle';

import ColorFilter from './ColorFIlter';
import styles from './styles.module.scss';

const Sidebar: React.FC = () => {
  const {
    selectedVehicles: selected,
    onColorFilterUpdated,
    interiorColorCategories,
    exteriorColorCategories,
    engines,
    drivetrain,
    fuelType,
    onFilterUpdate,
    searchVehicle,
  } = useContext(InventoryContext);

  const vehicleDetail = pick(searchVehicle, ['model_year', 'make', 'model', 'series']);

  const filters = [engines, drivetrain, fuelType].filter(
    (filter) => filter && filter.length > 0,
  );

  return (
    <>
      <h4 className="mt-2 p-2 py-4 center">{`${vehicleDetail.model_year} ${vehicleDetail.make} ${vehicleDetail.model} ${vehicleDetail.series}`}</h4>
      <div className={classNames('text-white mt-2 p-2 py-4 ', styles.selectedCount)}>
        <div className={styles.countContainer}>
          <h1>{selected?.length}</h1>
          <h5 className={classNames('my-auto', styles.selectedText)}>
            Selected <br />
            Auction <br />
            Inventory
          </h5>
        </div>
      </div>
      <div className="sidebar-middle-content">
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="secondary" className="w-100">
            Update
          </Button>
        </div>
        <Space direction="vertical" size="medium">
          {filters.length > 0 && <h6 className="m-2">Filters:</h6>}
          <div className="customAccordion accordion accordion-flush" id="other-filters">
            <Space size={20} direction="vertical">
              {filters.map((filter, index) => (
                <div className="accordion-item" key={`filter-${index}`}>
                  <h2 className="accordion-header" id={`#filter-head-${index}`}>
                    <button
                      type="button"
                      aria-expanded="true"
                      data-bs-toggle="collapse"
                      className="accordion-button"
                      data-bs-target={`#filter-${index}`}
                    >
                      {index === 0 && 'Engines'}
                      {index === 1 && 'Drivetrain'}
                      {index === 2 && 'Fuel Type'}
                    </button>
                  </h2>
                  <div
                    id={`filter-${index}`}
                    aria-labelledby={`filter-head-${index}`}
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      {filter?.map((engine, filterIndex) => {
                        let type: FilterSectionString = 'engine';
                        if (index === 1) {
                          type = 'drivetrain';
                        }
                        if (index === 2) {
                          type = 'fuelType';
                        }
                        const text = engine.text || '';
                        return (
                          <div key={engine.text} className={styles.radioContainer}>
                            <Radio
                              name={type}
                              id={snakeCase(`${engine.text}-${filterIndex}`)}
                              label={engine.text || ''}
                              checked={engine.checked}
                              onChange={() => {
                                onFilterUpdate?.(type, text);
                              }}
                              className={styles.radioInput}
                            />
                            {engine.count}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </Space>
          </div>
          <h6 className="mb-2">Available Colors:</h6>
          <div className=" customAccordion accordion accordion-flush" id="color-filter">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-heading-2">
                <button
                  type="button"
                  aria-expanded="true"
                  data-bs-toggle="collapse"
                  className="accordion-button"
                  aria-controls="exterior-color-filter"
                  data-bs-target="#exterior-color-filter"
                >
                  Exterior
                </button>
              </h2>
              <div
                id="exterior-color-filter"
                aria-labelledby="flush-heading-2"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <ColorFilter
                    type="exterior"
                    colors={exteriorColorCategories || []}
                    onChange={onColorFilterUpdated}
                  />
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-heading-3">
                <button
                  type="button"
                  aria-expanded="true"
                  data-bs-toggle="collapse"
                  className="accordion-button"
                  aria-controls="interior-color-filter"
                  data-bs-target="#interior-color-filter"
                >
                  Interior
                </button>
              </h2>
              <div
                id="interior-color-filter"
                aria-labelledby="flush-heading-3"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <ColorFilter
                    type="interior"
                    colors={interiorColorCategories || []}
                    onChange={onColorFilterUpdated}
                  />
                </div>
              </div>
            </div>
          </div>
        </Space>
      </div>
    </>
  );
};

export default Sidebar;
