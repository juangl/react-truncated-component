import React from "react";
import { getLevelInfo, truncateLevel } from "../treeUtils";

describe("TruncateLevel", () => {
  const tree = (
    <>
      <p />
      <p>{["text", <p key="a">text</p>]}</p>
    </>
  );

  const childrenArray = tree.props.children;

  test("level 0", () => {
    expect(getLevelInfo(childrenArray, 0)).toEqual({ length: 2 });
    expect(truncateLevel(childrenArray, 0)).toMatchInlineSnapshot(`<p />`);
  });

  test("level 1", () => {
    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 2 });
    expect(truncateLevel(childrenArray, 1)).toMatchInlineSnapshot(`
Array [
  <p />,
  <p>
    text
  </p>,
]
`);
  });

  test("level 2", () => {
    expect(getLevelInfo(childrenArray, 2)).toEqual({ length: 1 });
    expect(truncateLevel(childrenArray, 2)).toMatchInlineSnapshot(`
Array [
  <p />,
  <p>
    text
  </p>,
]
`);
  });

  test("level 3", () => {
    expect(getLevelInfo(childrenArray, 3)).toEqual({ length: 4 });
    expect(truncateLevel(childrenArray, 3)).toMatchInlineSnapshot(`
Array [
  <p />,
  <p>
    text
    <p>
      tex
    </p>
  </p>,
]
`);
  });

  test("Truncating an array shound always keep the children array", () => {
    const tree = (
      <>
        <p>{["text", "test"]}</p>
      </>
    );

    const childrenArray = tree.props.children;

    expect(getLevelInfo(childrenArray, 1)).toEqual({ length: 2 });
    const truncate1 = truncateLevel(childrenArray, 1);
    expect(getLevelInfo(truncate1, 1)).toEqual({ length: 1 });
  });

  test("truncateLevel to specific index ", () => {
    const tree = (
      <>
        <p>
          <p>text</p>
        </p>
      </>
    );

    const childrenArray = tree.props.children;

    expect(truncateLevel(childrenArray, 3, 1)).toMatchInlineSnapshot(`
<p>
  <p>
    t
  </p>
</p>
`);
  });
});
