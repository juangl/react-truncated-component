# How it works

This library works by traversing the React tree (unlike other libraries that directly manipulate the DOM tree) to find the longest text string that fits in the number of lines specified. It uses a binary search-like algorithm to speed up the proccess.

# Install

```bash
npm install --save react-truncated-component
```

# Basic Example

The following code is a minimal example of how your implementation would look like. To see a more advanced example see [this page source code](https://github.com/juangl/react-truncated-component/blob/master/website/pages/index/liveResult.js).

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
