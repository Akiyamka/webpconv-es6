# webpconv-es6 (work in progress)
A small [node.js](http://nodejs.org) library for working with [WebP](https://developers.google.com/speed/webp/docs/using) format. Supports the Promise API.

### Example
Convert .png image to .webp format
```js
const converter = require('webpconverter');

converter.cwebp(pathToPng, pathToSaveWebp, quality)
  .then(function(response) {
    console.log(response); // response === pathToOutput
  })
  .catch(function(error) {
    console.log(error);
  });
```
### API
  - [cwebp](https://developers.google.com/speed/webp/docs/cwebp)  - image to webp.
  - [dwebp](https://developers.google.com/speed/webp/docs/dwebp)  - webp to image.
  - [gwebp](https://developers.google.com/speed/webp/docs/gif2webp) - work in progress! Not supproted yet. Convert a GIF image to WebP.
  - [webpmux](https://developers.google.com/speed/webp/docs/webpmux)  - work in progress! Not supproted yet. Create animated WebP files from non-animated WebP images, extract frames from animated WebP images, and manage XMP/EXIF metadata and ICC profile.


## License
  [MIT](LICENSE)
