// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import startsWith from "lodash/startsWith";

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

const originalConsoleWarning = console.warn;

console.warn = (message: string) => {
  if (startsWith(message, "Warning: An update to")) {
    return;
  }
  originalConsoleWarning(message);
};

const originalConsoleError = console.error;

console.error = (message: string) => {
  if (startsWith(message, "Warning: An update to")) {
    return;
  }
  originalConsoleError(message);
};
