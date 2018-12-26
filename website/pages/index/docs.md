# How it works

This library works by traversing the React tree (unlike other libraries that directly manipulate the DOM tree) to find the longest text string that fits in the number of lines specified. It uses a binary search-like algorithm to speed up the proccess.

The number of lines being rendered is measured based on the line-height.

# Install

```bash
npm install --save react-truncated-component
```

# Usage

The following code is a minimal example of how your implementation would look like. To see a more advanced example go to [this page source code](https://github.com/juangl/react-truncated-component/blob/master/website/pages/index/liveResult.js).

```javascript
function TruncatedText() {
  return (
    <ReactTruncateFormat ellipsis="..." numberOfLines={5} lineHeight={23}>
      <p>{/*


    put your long text right here


    */}</p>
    </ReactTruncateFormat>
  );
}
```

# API

**numberOfLines: ?number**<br />
it can be a number of null if you want disable the truncation.

**children: React.Node (Required)**<br />
This should be a React tree that reflects the document format. Direct children are considered to be paragraphs. See the craveats sections to know more about this.

**lineHeight: number (Required)**<br />
`line-height` in pixels.

**ellipsis: ?React.Node**<br />
It can be anything that can be render. The default value is `...`.

**onTruncate: function(isTruncated: boolean)**<br />
A callback function. Receives a boolean value that is `true` when the content is truncated, `false` if the content fits without truncate it.

**cacheKey: ?string**<br />
If cacheKey is passed, stores lightweight cache. Useful if you're using it in a virtualized list and you want to make sure that the truncation is calculated only once.

# Caveats

If you're running into some strange behavior, read the next section to make sure that you're using the library properly.

- ** In order to support paragraphs, direct children are considered to be paragraphs.** If you don't need paragraphs just make sure to wrap your content in a single paragraph.
- ** Use margin to separate paragraphs.** If you using padding instead, the padding will be measured as part of the content since we are measuring with `clientHeight`.
- **Children should reflect the document format.** all the text that you want to truncate must be children of an element.

```javascript
<ReactTruncateFormat {...}>

  {/* ✅ the following children is a valid because all the text is children of an element */}
  <StyledParagraph>
   the rest of the content... <SomeLink>go to somewhere</SomeLink>
  </StyledParagraph>

   {/* ✅ you can call functions too that returns a valid children format*/}
  {renderParagraph()}


  {/* 🚫 the next children won't be truncated propertly
      bacause the property name is not `children` but `value`*/ }
  <Paragraph value="here some text" />

  {/* 🚫 the next component won't be truncated truncate
      because we can't see inside its render function */}
  <ThisRenderContent />

</ReactTruncateFormat>
```
