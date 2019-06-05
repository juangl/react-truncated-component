import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import ReactTruncatedComponent from "../";

describe("<ReactTruncatedComponent />", () => {
  afterEach(cleanup);
  test("Using cache key", () => {
    const { container } = render(
      <div style={{ width: 300 }}>
        <ReactTruncatedComponent
          ellipsis="..."
          numberOfLines={5}
          lineHeight={1}
          cacheKey="test-1"
        >
          <p>HELLO!</p>
        </ReactTruncatedComponent>
      </div>,
    );

    const { container: container2 } = render(
      <div style={{ width: 300 }}>
        <ReactTruncatedComponent
          ellipsis="..."
          numberOfLines={5}
          lineHeight={1}
          cacheKey="test-1"
        >
          <p>HELLO!</p>
        </ReactTruncatedComponent>
      </div>,
    );

    expect(container.innerHTML === container2.innerHTML).toBe(true);
  });
});
