// @flow
import * as React from "react";

import { didContentChange } from "./utils";

const getChildrenInArray = element => {
  const { children } = element.props;
  return React.Children.toArray(children);
};

const addEllipsis = (children, ellipsis) => {
  const paragraphs = React.Children.toArray(children);

  if (!paragraphs.length) {
    return null;
  }

  const lastParagraph = paragraphs[paragraphs.length - 1];
  const lastParagraphChildren = getChildrenInArray(lastParagraph);

  // add the ellipsis at the end of the last paragraph
  paragraphs[paragraphs.length - 1] = React.cloneElement(
    lastParagraph,
    undefined,
    ...lastParagraphChildren,
    ellipsis,
  );

  return paragraphs;
};

const NESTED_UPDATE_LIMIT = 50;

type Props = {|
  ellipsis: React.Node,
  children: React.Node,
  onMeasure: (Array<number>) => void,
  shouldMeasure: boolean,
  isTruncated: boolean,
|};

class ResultBox extends React.Component<Props> {
  paragraphRefs = [];
  containerRef: ?React.ElementRef<"div"> = null;
  nestedUpdatesCount = 0;

  shouldComponentUpdate(nextProps: Props) {
    return didContentChange(this.props, nextProps);
  }

  componentDidMount() {
    if (this.props.shouldMeasure) {
      this.measureParagraphs();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (didContentChange(this.props, prevProps) && this.props.shouldMeasure) {
      this.measureParagraphs();
    }
  }

  measureParagraphs = () => {
    const measureByParagraph = [];
    const children = this.containerRef ? this.containerRef.children : [];

    for (const paragraph of children) {
      let containerheight = Math.floor(
        paragraph.getBoundingClientRect().height,
      );
      measureByParagraph.push(containerheight);
    }

    this.nestedUpdatesCount++;
    if (this.nestedUpdatesCount === NESTED_UPDATE_LIMIT) {
      requestAnimationFrame(() => {
        this.nestedUpdatesCount = 0;
        this.props.onMeasure(measureByParagraph);
      });
    } else {
      this.props.onMeasure(measureByParagraph);
    }
  };

  render() {
    const { isTruncated, ellipsis, children } = this.props;

    let newChildren = children;
    if (isTruncated) {
      newChildren = addEllipsis(children, ellipsis);
    }

    return <div ref={ref => (this.containerRef = ref)}>{newChildren}</div>;
  }
}

export default ResultBox;
