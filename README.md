# webpconv-es6
A small [node.js](http://nodejs.org) library for working with [WebP](https://developers.google.com/speed/webp/docs/using) format. Supports the Promise API.

### Example

Convert .png image to .webp and save

```js
const converter = require('webpconverter');
const fs = require('fs');

let options = '-q 80';
converter.cwebp('path/to/image.png', options, 'path/to/output.webp')
    .then((res) => {
        console.log(res) // 'path/to/output.webp'
    }).catch((err) => {
        throw new Error(err);
    });
```

Convert .png image to .webp without saving

```js
const converter = require('webpconverter');
const fs = require('fs');

let options = '-q 80';
converter.cwebp('path/to/image.png', options)
    .then((res) => {
        // Do something with data
        fs.writeFile(path.join(__dirname, 'path/to/output.webp'), res, 'hex');
    }).catch((err) => {
        throw new Error(err);
    });
```

Convert .webp image to .png format without saving

```js
const converter = require('webpconverter');
const fs = require('fs');

return converter.dwebp('path/to/image.webp')
    .then((res) => {
        // Do something with data
        fse.writeFile(path.join(__dirname, 'path/to/output.png'), res, 'hex');
    }).catch((err) => {
        throw new Error(err);
    });


```

### API
  - [cwebp](https://developers.google.com/speed/webp/docs/cwebp)  - image to webp.
  - [dwebp](https://developers.google.com/speed/webp/docs/dwebp)  - webp to image.
  - [gif2webp](https://developers.google.com/speed/webp/docs/gif2webp) - gif animated image to animated WebP.
  - [webpmux](https://developers.google.com/speed/webp/docs/webpmux)  - work in progress! Not supproted yet. Create animated WebP files from non-animated WebP images, extract frames from animated WebP images, and manage XMP/EXIF metadata and ICC profile.

### Converter version
   libwebp 0.6.1 (2017, November)

## License
https://developers.google.com/speed/webp/download?hl=ru
  [MIT](LICENSE)
