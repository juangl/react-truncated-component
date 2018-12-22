import React from "react";
import { getLevelInfo } from "../treeUtils";

describe("getLevelInfo", () => {
  test("basic usage", () => {
    const tree = (
      <>
        <p />
        <p>text</p>
      </>
    );

    const childrenArray = tree.props.children;

    expect(getLevelInfo(childrenArray, 0)).toEqual({ length: 2 });
    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 1 });
    expect(getLevelInfo(childrenArray, 2)).toEqual({ length: 4 });
    expect(getLevelInfo(childrenArray, 3)).toEqual({ length: 0 });
  });

  test("getLevelInfo with falsy children", () => {
    const tree = (
      <>
        <p />
        <p children={undefined} />
      </>
    );

    const childrenArray = tree.props.children;

    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 0 });
  });

  test("getLevelInfo with arrays as children", () => {
    const tree = (
      <>
        <p />
        <p>{["text", <p key="a">text</p>]}</p>
      </>
    );

    const childrenArray = tree.props.children;

    expect(getLevelInfo(childrenArray, 0)).toEqual({ length: 2 });
    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 2 });
    expect(getLevelInfo(childrenArray, 2)).toEqual({ length: 1 });
    expect(getLevelInfo(childrenArray, 3)).toEqual({ length: 4 });
  });

  test("getLevelInfo with arrays as children and text", () => {
    const tree = (
      <>
        <p>
          <p>{["text"]} text</p>
        </p>
      </>
    );

    const childrenArray = tree.props.children;

    expect(getLevelInfo(childrenArray, 0)).toEqual({ length: 1 });
    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 1 });
    expect(getLevelInfo(childrenArray, 2)).toEqual({ length: 2 });
    expect(getLevelInfo(childrenArray, 3)).toEqual({ length: 5 });
  });
});
