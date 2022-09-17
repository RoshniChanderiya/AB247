import omit from 'lodash/omit';

/**
 *
 * @param value
 * @param options
 * @returns
 */
export const formatNumber = (value = 0, options: Intl.NumberFormatOptions = {}) => {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: options.style ?? 'currency',
    currency: options.currency ?? 'USD',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    ...omit(options, [
      'style',
      'style',
      'minimumFractionDigits',
      'maximumFractionDigits',
    ]),
  });

  return formattedNumber.format(Number(value));
};
/**
 *
 * @param uuid
 * @returns boolean
 */
export const isUUID = (uuid: string): boolean =>
  uuid.replace(new RegExp(' '), '').length === 32;
