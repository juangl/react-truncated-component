// @flow
import * as React from "react";

type visitorCallback = (
  Node: React.Node,
  parent: React.Node,
  level: number,
) => void;

type visitorObject = {|
  enter?: visitorCallback,
  exit?: visitorCallback,
|};

export function isIterableChildren(node: React.Node): boolean %checks {
  return Array.isArray(node) || typeof node === "string";
}

export function getChildren(node: React.Node): Array<React.Node> | null {
  if (
    node &&
    React.isValidElement(node) &&
    // in the next line node.props couldn't be
    // access because props is missing in React.Portal
    // $FlowFixMe
    node.props &&
    node.props.children
  ) {
    // `toArray` will flatten the array. We need that for consistency
    return React.Children.toArray(node.props.children);
  }

  // no children
  return null;
}

// function to traverse only the right-most branch of the tree
// the visitor callback receives `node` which is:
// 1. `currentNode.props.children` if currentNode is an element
// 2. `currentNode` otherwise (string, in most cases).
// this means that `node` is expected to be either `Array` or `string`.
// TODO: Are we running into unexpected edge cases when currentNode is e.g `boolean`?
export function traverseToTheRight(tree: React.Node, visitor: visitorObject) {
  function traverseChildren(
    node: React.Node,
    parent: React.Node,
    levelCount: number,
  ) {
    let children = getChildren(node);

    let nodeToVisit = children ? children : node;

    if (visitor.enter) {
      visitor.enter(nodeToVisit, parent, levelCount);
    }

    if (Array.isArray(children)) {
      if (children.length > 0) {
        traverseChildren(children[children.length - 1], node, levelCount + 1);
      }
    }

    if (visitor.exit) {
      visitor.exit(node, parent, levelCount);
    }
  }

  traverseChildren(<>{tree}</>, null, 0);
}

// traverses the right-most branch and return the number of
// children on a specific level
export function getLevelInfo(tree: React.Node, level: number) {
  let result = { length: 0 };
  traverseToTheRight(tree, {
    enter(node, parent, currentLevel) {
      if (currentLevel === level) {
        const children = getChildren(node);
        let length = 0;
        if (children) {
          length = children.length;
        } else if (isIterableChildren(node)) {
          length = node.length;
        }
        result = { length };
      }
    },
  });
  return result;
}

export function truncateLevel(
  tree: React.Node,
  level: number,
  index: number = -1,
) {
  function truncateNode(node: React.Node, currentLevel: number) {
    let newChildren = React.isValidElement(node) ? getChildren(node) : node;

    if (currentLevel === level) {
      if (isIterableChildren(newChildren)) {
        newChildren = newChildren.slice(0, index);
      }
    } else if (Array.isArray(newChildren) && newChildren.length > 0) {
      newChildren = [
        ...newChildren.slice(0, -1),
        truncateNode(newChildren[newChildren.length - 1], currentLevel + 1),
      ];
    }

    if (React.isValidElement(node)) {
      // children array is empty
      if (Array.isArray(newChildren) && newChildren.length < 1) {
        return null;
      }

      // children is an array
      if (Array.isArray(newChildren)) {
        return React.cloneElement(
          // $FlowFixMe
          node,
          { children: undefined },
          ...newChildren,
        );
      }

      // no children present
      if (!newChildren) {
        return null;
      }

      // children is a single element
      return React.cloneElement(
        // $FlowFixMe
        node,
        { children: undefined },
        newChildren,
      );
    } else {
      return newChildren;
    }
  }

  const truncatedRoot = truncateNode(<>{tree}</>, 0);
  // $FlowFixMe
  return truncatedRoot && truncatedRoot.props
    ? truncatedRoot.props.children
    : null;
}

export function cacheToTree(
  currentTree: React.Node,
  currentCache: Array<number>,
) {
  return currentCache.reduce((previousTree, offset, level) => {
    return truncateLevel(previousTree, level, offset);
  }, currentTree);
}
