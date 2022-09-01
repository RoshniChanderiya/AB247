export const formatNumber = (
  value = 0,
  options: {
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency || "USD",
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  });

  return formattedNumber.format(Number(value));
};

export const getFormattedPhoneNumber = (mobileNumber = "") => {
  if (!mobileNumber) {
    return mobileNumber;
  }
  return `${mobileNumber.substring(0, 3)}-${mobileNumber.substring(
    3,
    6
  )}-${mobileNumber.substring(6, mobileNumber.length)}`;
};
