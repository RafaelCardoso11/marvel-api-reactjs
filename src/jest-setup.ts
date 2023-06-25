import "@testing-library/jest-dom";
import React from "react";

/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation((error) => {
    if (
      error
        .toString()
        .includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    console.error(error);
  });
});

global.React = React;
