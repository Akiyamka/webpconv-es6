const exec 	     = require('child_process').execFile;
const cwebpLib   = require('./cwebp.js');   //get cwebp module (converts other image format to webp)
const dwebpLib   = require('./dwebp.js');   //get dwebp module (converts webp format to other image)
const gwebpLib   = require('./gwebp.js');   //get gif2webp module (convert git image to webp)
const webpmuxLib = require('./webpmux.js'); //get webpmux module (convert non animated webp images to animated webp)

/**
 * Convert image to webp format
 * @param {string} inputImage  - path to the image sourse
 * @param {string} outputImage - path for save converted image
 * @param {string} option      - options (quality for example)
 */
module.exports.cwebp = function(inputImage, outputImage, option) {
    let query = inputImage + ' -o ' + outputImage;
    // let query = option + ' ' + inputImage + ' -o ' + outputImage;
    // console.log(query);

    return new Promise((resolve, reject) => {
        exec(cwebpLib(), query.split(/\s+/), function(error, stdout, stderr) {
            if (error) {
                reject({error, stdout, stderr});
            } else {
                resolve(outputImage)
            }
        });
    })

};

/**
 * Convert image from webp format
 * @param {string} inputImage  - path to the image sourse
 * @param {string} outputImage - path for save converted image
 * @param {string} option      - options (quality for example)
 * @param callback
 */
module.exports.dwebp = function(inputImage, outputImage, option) {
    let query = inputImage + ' -o ' + outputImage;

    return new Promise((resolve, reject) => {
        exec(dwebpLib(), query.split(/\s+/), function(error, stdout, stderr) {
            if (error) {
                reject({error, stdout, stderr});
            } else {
                resolve(outputImage)
            }
        });
    })
};

/**
 * Convert .gif image to .webp format
 * @param {string} inputImage  - path to the image sourse
 * @param {string} outputImage - path for save converted image
 * @param {string} option      - options (quality for example)
 * @param callback
 */
module.exports.gwebp = function (inputImage, outputImage, option, callback) {

    let query = (option + ' ' + inputImage + ' -o ' + outputImage).split(/\s+/);
    console.log(query);

    exec(gwebpLib(), query, function (error, stdout, stderr) {
        if (error) {
            callback(false);
            console.log(error)
        } else {
            callback(true)
        }
    });
};

/**
 * Add ICC profile,XMP metadata and EXIF metadata
 * @param {string} inputImage  - path to the image sourse (.webp)
 * @param {string} outputImage - path for save converted image (.webp)
 * @param {string} iccProfile
 * @param {string} option      - options (icc, xmp, exif)
 * @param callback
 */
module.exports.webpmux_add = function (inputImage, outputImage, iccProfile, option, callback) {

    let query = ('-set '+ option +' '+ iccProfile +' '+ inputImage +' -o '+ outputImage).split(/\s+/);
    exec(webpmuxLib(), query, function (error, stdout, stderr) {
            if (error) {
                callback(false);
                console.log(error)
            } else {
                callback(true);
            }
        });
};

/**
 * Extract ICC profile,XMP metadata and EXIF metadata
 * @param {string} inputImage  - path to the image sourse (.webp)
 * @param {string} outputImage - path for save converted image (.webp)
 * @param {string} iccProfile
 * @param {string} option      - options (icc, xmp, exif)
 * @param callback
 */
module.exports.webpmux_extract = function (inputImage,iccProfile,option,callback) {

    let query = ('-get '+ option +' '+ inputImage +' -o '+ iccProfile).split(/\s+/);
    exec(webpmuxLib(), query, function (error, stdout, stderr) {
            if (error) {
                callback(false);
                console.log(error)
            } else {
                callback(true);
            }
        });
};

/**
 * Strip ICC profile,XMP metadata and EXIF metadata
 * @param {string} inputImage  - path to the image sourse (.webp)
 * @param {string} outputImage - path for save converted image (.webp)
 * @param {string} iccProfile
 * @param {string} option      - options (icc, xmp, exif)
 * @param callback
 */
module.exports.webpmux_strip = function (inputImage, outputImage, option, callback) {

    let query = ('-strip '+ option +' '+ inputImage +' -o '+ outputImage).split(/\s+/);
    exec(webpmuxLib(), query, function (error, stdout, stderr) {
            if (error) {
                callback(false);
                console.log(error)
            } else {
                callback(true);
            }
        });
};

/**
 * Create an animated WebP file from Webp images
 * @param {Array}  inputImage  - path to the image sourse (.webp)
 * @param {string} outputImage - path for save converted image (.webp)
 * @param {Number} loop        - number of animation loops
 * @param {string} bgcolor     - Background color of the canvas
 * @param callback
 */
module.exports.webpmux_animate = function (inputImages, outputImage, loop, bgcolor, callback) {

    let files = '-frame ' + inputImages[0];
    let j = inputImages.length;
    for (i = 1; i < j; i++) {
        files = files + ' -frame ' + inputImages[i];
        console.log(files);
    }

    let query = files + ' -loop ' + loop + ' -bgcolor ' + bgcolor + ' -o ' + outputImage;
    exec(webpmuxLib(), query.split(/\s+/), function (error, stdout, stderr) {
        if (error) {
            callback(false);
            console.log(error)
        } else {
            callback(true);
        }
    });
};

/**
 * Get the a frame from an animated WebP file
 * @param {Array}  inputImage  - path to the image sourse (.webp)
 * @param {string} outputImage - path for save converted image (.webp)
 * @param {string} frameNumber
 * @param {Number} loop        - number of animation loops
 * @param {string} bgcolor     - Background color of the canvas
 * @param callback
 */

module.exports.webpmux_getframe = function (inputImage, outputImage, frameNumber, callback) {

    let query = ('-get frame '+ frameNumber +' '+ inputImage +' -o '+ outputImage).split(/\s+/);
    exec(webpmuxLib(), query, function (error, stdout, stderr) {
        if (error) {
            callback(false);
            console.log(error)
        } else {
            callback(true);
        }
    });
};