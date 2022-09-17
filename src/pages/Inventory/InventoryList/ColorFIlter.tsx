import { ThemeCheckBox } from '@autobid247/theme';
import React from 'react';

import { ColorFilter as ColorFilterInterface } from '@/types/generic';

import styles from './styles.module.scss';

interface ColorFilterProps {
  colors: ColorFilterInterface[];
  type: string;
  onChange?: (checked: boolean, type: string, index: number) => void;
}

const FilterCheckbox = ({
  id,
  text,
  count,
  checked,
  onChange,
}: {
  id: string;
  text: string;
  count: number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <li className="d-flex align-items-center justify-content-between">
    {text && (
      <div className="d-flex align-items-center">
        <ThemeCheckBox
          checked={checked}
          onChange={onChange}
          label=""
          name={text}
          id={id}
          color="primary"
          className="me-2"
        />
        <label htmlFor={id} className="d-flex">
          <span className={styles.colorDisplayBox} style={{ backgroundColor: text }} />
          {text}
        </label>
      </div>
    )}
    <p>{count}</p>
  </li>
);

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, type, onChange }) => {
  return (
    <ul className="list-none filter-list custom-scroll">
      {colors?.map(({ text, count, checked }, index) => (
        <FilterCheckbox
          key={text}
          text={text || ''}
          id={`${text}-${index}`}
          count={count || 0}
          checked={Boolean(checked)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(Boolean(e?.target?.checked), type, index)
          }
        />
      ))}
    </ul>
  );
};

export default ColorFilter;
