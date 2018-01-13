const exec = require('child_process').execFile;

/**
 * Convert wrapper
 * @param {String} converter - path to the image sourse
 * @param {Object} query
 * @param {String} query.inputImage
 * @param {String=} query.options
 * @param {String=} query.outputImage
 * @return {Promise}
 */
function defaultCaller(converter, query) {
    if (query.inputImage.slice(0, 1) === '-') {
        return Promise.reject({error: 'Please do not use file name starts with "-"'})
    }

    return new Promise((resolve, reject) => {
        const options = query.options ? query.options.split(/\s+/) : [];
        const command = [...options, query.inputImage, '-o', query.outputImage];
        exec(converter, command, { encoding:'hex' }, (error, stdout, stderr) => {
            if (error) {
                console.log(error, stdout, stderr)
                reject({error, stdout, stderr});
            } else {
                resolve(query.outputImage === '-' || !query.outputImage ? stdout : query.outputImage);
            }
        });
    })
}

module.exports = defaultCaller;