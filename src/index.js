// @flow
import * as React from "react";

import ResultBox from "./resultBox";
import { getLevelInfo } from "./treeUtils";
import updater from "./updater";
import type { TruncatedComponentProps, TruncatedComponentState } from "./types";

class TruncatedComponent extends React.Component<
  TruncatedComponentProps,
  TruncatedComponentState,
> {
  static defaultProps = {
    numberOfLines: undefined,
    onTruncate: () => {},
    voidElements: [],
    ellipsis: "...",
  };

  state = updater.getInitialState(this.props.children, this.props.cacheKey);

  containerRef: ?React.ElementRef<"div">;

  componentDidMount() {
    if (this.state.isTruncationCompleted) {
      this.callOnTruncate();
    }
  }

  componentDidUpdate(
    prevProps: TruncatedComponentProps,
    prevState: TruncatedComponentState,
  ) {
    const { isTruncationCompleted } = this.state;
    if (isTruncationCompleted && !prevState.isTruncationCompleted) {
      this.callOnTruncate();
    }
  }

  componentWillUnmount() {
    const { cacheKey } = this.props;
    if (!this.state.isTruncationCompleted) {
      updater.clearCache(cacheKey);
    }
  }

  callOnTruncate() {
    this.props.onTruncate(this.state.isTruncated);
  }

  getCurrentNumberOfLines(heightByParagraph: Array<number>) {
    const { lineHeight } = this.props;
    return heightByParagraph.reduce((acc, measure) => {
      return acc + measure / lineHeight;
    }, 0);
  }

  // this thing works by implementing something like a binary-serch through
  // the tree to find the most amount of text to fits in the desired number
  // of lines.
  // We can think of a React tree as a structure where React.Node is the type
  // of the node and it could have and array of children (`node.props.children`)
  // and leaf nodes are usually are usually `string`.
  onMeasure = (heightByParagraph: Array<number>) => {
    const { numberOfLines, cacheKey } = this.props;
    const { currentTree, previousTree, level, startOffset } = this.state;

    const currentLines = this.getCurrentNumberOfLines(heightByParagraph);
    const currentLevelInfo = getLevelInfo(currentTree, level);

    // $FlowFixMe suppresses the curretLines error since it could be null
    if (currentLines <= numberOfLines) {
      if (this.state.isTruncated) {
        // this is not the first measurement
        const deeperLevelInfo = getLevelInfo(previousTree, level + 1);
        const lastLevelInfo = getLevelInfo(previousTree, level);

        if (startOffset + 1 >= lastLevelInfo.length) {
          // this level is done
          updater.updateLevelCache(
            cacheKey,
            level,
            deeperLevelInfo.length
              ? lastLevelInfo.length
              : currentLevelInfo.length,
          );

          if (deeperLevelInfo.length) {
            this.setState(updater.goToDeeperLevel);
          } else {
            // we can't go deeper. Truncation has done
            this.setState(updater.truncationCompleted);
          }
        } else {
          // reduce the range of search

          // $FlowFixMe at this point, truncatedAt shouldn't be null
          this.setState(updater.setStartOffset);
        }
      } else {
        // first measurement. Fits without truncate
        this.setState(updater.truncationCompleted);
      }
    } else {
      if (currentLevelInfo.length) {
        this.setState(updater.truncateTotheMidddle(currentLevelInfo));
      }
    }
  };

  render() {
    const shouldMeasure =
      !this.state.isTruncationCompleted && !!this.props.numberOfLines;

    return (
      <div
        ref={ref => {
          this.containerRef = ref;
        }}
        style={{
          lineHeight: `${this.props.lineHeight}px`,
        }}
      >
        {
          <ResultBox
            isTruncated={this.state.isTruncated}
            ellipsis={this.props.ellipsis}
            onMeasure={this.onMeasure}
            shouldMeasure={shouldMeasure}
          >
            {this.state.currentTree}
          </ResultBox>
        }
      </div>
    );
  }
}

export default TruncatedComponent;
