// @flow
import * as React from "react";
import type { LevelInfoType, TruncatedComponentState } from "./types";

import { truncateLevel, cacheToTree } from "./treeUtils";

const cache: Map<any, Array<number>> = new Map();

function getCachedTree(cacheKey, tree) {
  if (cacheKey) {
    const isCached = cache.has(cacheKey);
    if (isCached) {
      if (cache[cacheKey].length) {
        const nextTree = cacheToTree(tree, cache[cacheKey]);
        return nextTree;
      }
      // no need to truncate. Return tree not truncated
      return tree;
    } else {
      cache.set(cacheKey, []);
    }
  }
  return null;
}

const updater = {
  getInitialState(
    children: React.Node,
    cacheKey?: any,
  ): TruncatedComponentState {
    const cachedTree = getCachedTree(cacheKey, children);

    let currentTree = children;
    let isTruncationCompleted = false;
    let isTruncated = false;

    if (cachedTree) {
      currentTree = cachedTree;
      isTruncationCompleted = true;
      isTruncated = cachedTree === children;
    }

    return {
      currentTree,
      previousTree: children,
      isTruncationCompleted,
      isTruncated,
      level: 0,
      // for binary-search
      startOffset: 0,
      truncatedAt: null,
    };
  },

  truncationCompleted() {
    return { isTruncationCompleted: true };
  },

  truncateTotheMidddle: (levelInfo: LevelInfoType) =>
    function innerTruncateToTheMiddleUpdater({
      startOffset,
      currentTree,
      level,
    }: TruncatedComponentState) {
      const middle = Math.floor((startOffset + levelInfo.length) / 2);
      return {
        isTruncated: true,
        currentTree: truncateLevel(currentTree, level, middle),
        previousTree: currentTree,
        truncatedAt: middle,
      };
    },

  goToDeeperLevel({
    level: currentLevel,
    previousTree,
  }: TruncatedComponentState) {
    return {
      currentTree: previousTree,
      level: currentLevel + 1,
      startOffset: 0,
      truncatedAt: null,
    };
  },

  setStartOffset: ({ previousTree, truncatedAt }: TruncatedComponentState) => {
    return {
      currentTree: previousTree,
      startOffset: truncatedAt,
    };
  },

  setTruncatedTree: (nextTree: React.Node) =>
    function innerSetTruncatedTreeUpdater({
      currentTree,
    }: TruncatedComponentState) {
      return {
        currentTree: nextTree,
        isTruncationCompleted: true,
        isTruncated: true,
      };
    },

  clearCache(cacheKey?: any) {
    if (cache.has(cacheKey)) {
      cache.delete(cacheKey);
    }
  },

  updateLevelCache(cacheKey?: any, level: number, truncatedAt: number) {
    if (cache.has(cacheKey)) {
      const prevCache = cache.get(cacheKey);
      // $FlowFixMe map.has() above should be enough. This is a flow bug I guess.
      prevCache[level] = truncatedAt;
    }
  },
};

export default updater;
