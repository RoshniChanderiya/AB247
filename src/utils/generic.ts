export const isUUID = (uuid: string): boolean => {
  return uuid.replace(new RegExp(" "), "").length === 32;
};

export const getInitials = (string: string = ""): string => {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
