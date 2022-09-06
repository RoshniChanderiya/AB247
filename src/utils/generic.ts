import snakeCase from "lodash/snakeCase";

export const isUUID = (uuid: string): boolean => {
  return uuid.replace(new RegExp(" "), "").length === 32;
};
/**
 * get initials from the given string
 * @param string
 * @returns
 */
export const getInitials = (string: string = ""): string => {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

/**
 * convert the given object's keys to snake case deeply
 * @param form form values to convert
 * @returns form values in snake case
 */
export const getSnakeCaseVersion = (
  form: Record<string, any>
): Record<string, any> => {
  const reqObject: Record<string, any> = {};
  Object.keys(form).forEach((key) => {
    if (typeof form[key] === "object") {
      reqObject[snakeCase(key)] = getSnakeCaseVersion(form[key]);
    } else {
      reqObject[snakeCase(key)] = form[key];
    }
  });

  return reqObject;
};
