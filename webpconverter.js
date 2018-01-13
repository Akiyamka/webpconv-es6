const getLib = require('./lib-resolver.js');
const caller = require('./caller.js');

/**
 * Convert image from webp format
 * @param {String} inputImage - path to the sourse image
 * @param {String=} option - command options (-q 80 for example)
 * @param {String=} [outputImage = '-'] - path for save converted image.
 * @return {Promise}
 */
module.exports.cwebp = function(inputImage, options, outputImage = '-') {
    let query = { options, inputImage, outputImage };
    return caller(getLib('cwebp'), query);
};

/**
 * Convert image from webp format
 * @param {String} inputImage - path to the sourse image
 * @param {String=} option - command options (-q 80 for example)
 * @param {String=} [outputImage = '-'] - path for save converted image.
 * @return {Promise}
 */
module.exports.dwebp = function(inputImage, options, outputImage = '-') {
    const query = { options, inputImage, outputImage };
    return caller(getLib('dwebp'), query);
};

/**
 * Convert image from webp format
 * @param {String} inputImage - path to the sourse image
 * @param {String=} option - command options (-q 80 for example)
 * @param {String=} [outputImage = '-'] - path for save converted image.
 * @return {Promise}
 */
module.exports.gif2webp = function(inputImage, options, outputImage = '-') {
    const query = { options, inputImage, outputImage };
    return caller(getLib('gif2webp'), query);
};