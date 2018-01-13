# webpconv-es6 (work in progress)
A small [node.js](http://nodejs.org) library for working with [WebP](https://developers.google.com/speed/webp/docs/using) format. Supports the Promise API.

### Example
Convert .png image to .webp format

```js
const converter = require('webpconverter');
const fs = require('fs');

let options = '-q 80';
converter.cwebp(pathToFile, options)
    .then((res) => {
        fs.writeFile(path.join(__dirname, 'temp/test-output-png-to.webp'), res, 'hex');
    }).catch((err) => {
        throw new Error(err);
    });
```

### API
  - [cwebp](https://developers.google.com/speed/webp/docs/cwebp)  - image to webp.
  - [dwebp](https://developers.google.com/speed/webp/docs/dwebp)  - webp to image.
  - [gwebp](https://developers.google.com/speed/webp/docs/gif2webp) - gif animated image to animated WebP.
  - [webpmux](https://developers.google.com/speed/webp/docs/webpmux)  - work in progress! Not supproted yet. Create animated WebP files from non-animated WebP images, extract frames from animated WebP images, and manage XMP/EXIF metadata and ICC profile.

### Converter version
   libwebp 0.6.1 (2017, November)

## License
https://developers.google.com/speed/webp/download?hl=ru
  [MIT](LICENSE)
