// @flow
import * as React from "react";

export type onTruncateEvent = (isTruncated: boolean) => void;

export type TruncatedComponentState = {|
  previousTree: React.Node,
  currentTree: React.Node,
  isTruncationCompleted: boolean,
  isTruncated: boolean,
  level: number,
  // for binary-search
  startOffset: number,
  truncatedAt: ?number,
|};

export type TruncatedComponentProps = {|
  numberOfLines?: ?number,
  children: React.Node,
  ellipsis: React.Node,
  onTruncate: onTruncateEvent,
  voidElements: Array<React.ElementType>,
  cacheKey?: any,
  lineHeight: number,
|};

export type LevelInfoType = {| length: number |};
