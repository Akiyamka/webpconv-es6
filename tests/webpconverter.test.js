const path = require('path');
const converter = require('../webpconverter');
const assert = require('assert');
const checks = require('./checks');
const fse = require('fs-extra');

it('Should convert .png to .webp file and return hex stdout', function() {
    let pathToFile = path.join(__dirname, 'assests/png/simple-test.png');
    let options = '-q 80';

    return converter.cwebp(pathToFile, options)
        .then((res) => {
            assert(res === checks.simpleTestWebp, "Return correct hex");
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

it('Should convert .webp to .png file and return hex stdout', function() {
    let pathToFile = path.join(__dirname, 'assests/webp/simple-test.webp');
    let options = '-q 80';

    return converter.cwebp(pathToFile, options)
        .then((res) => {
            assert(res === checks.simpleTestPng, "Return correct hex");
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});


// it('Should create .webp file from .png and return stdout', function() {
//     let pathToInput = path.join(__dirname, 'assests/png/simple-test.png');
//     let pathToOutput = path.join(__dirname, 'temp/test.webp');
//     let options = '-q 80';

//     // rmDir(path.join(__dirname, 'temp'), false);

//     return converter.cwebp(pathToInput, options)
//         .then((sourse) => {
//             let buff = new Buffer(sourse, 'binary')
//             console.log(buff)
//             fse.writeFile(path.join(__dirname, 'temp/test-utf.webp'), buff, 'utf8');
//             fse.writeFile(path.join(__dirname, 'temp/test-ancii.webp'), buff, 'ascii');
//             fse.writeFile(path.join(__dirname, 'temp/test-binary.webp'), buff, 'binary');
//             fse.writeFile(path.join(__dirname, 'temp/test-hex.webp'), buff, 'hex');
//             fse.writeFile(path.join(__dirname, 'temp/test-base64.webp'), buff, 'base64');
//             fse.writeFile(path.join(__dirname, 'temp/test-utf16le.webp'), buff, 'utf16le');

//             return fse.writeFile(path.join(__dirname, 'temp/dump.txt'), sourse, 'hex').then(() => {
//                 assert(true, "Return stdout");
//             })

//         }).catch((err) => {
//             throw new Error(`Test crash, catch error: ${err}`);
//         });
// });

// it('Should create .png file from .webp', function() {
//     let pathToInput = path.join(__dirname, 'assests/webp/test.webp');
//     let pathToOutput = path.join(__dirname, 'temp/test.png');
//     let quality = '-q 80';

//     rmDir(path.join(__dirname, 'temp'), false);

//     return converter.dwebp(pathToInput, pathToOutput, quality)
//         .then((res) => {
//             assert(res === pathToOutput, "Return correct file path for new file");
//             assert(fse.existsSync(res), "File sucsessful created");
//         }).catch((err) => {
//             throw new Error(`Test crash, catch error: ${err}`);
//         });
// });

// Utilites //

function clearTemp() {
    rmDir(path.join(__dirname, 'temp'), false);
}

function rmDir(dirPath, removeSelf = true) {
    let files = [];

    try { files = fse.readdirSync(dirPath); }
    catch(e) { return; }

    if (files.length > 0) {
        files.forEach((file) => {
            let filePath = dirPath + '/' + file
            if (fse.statSync(filePath).isFile()) {
                fse.unlinkSync(filePath);
            } else {
                rmDir(filePath);
            }
        })
    }

    if (removeSelf) {
        fse.rmdirSync(dirPath);
    }
}
