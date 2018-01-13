const path = require('path');
const converter = require('../webpconverter');
const assert = require('assert');
const checks = require('./assests/checks');
const fse = require('fs-extra');

clearTemp();
it('Should convert .png to .webp file and return hex stdout', function() {
    let pathToFile = path.join(__dirname, 'assests/png/test.png');
    let options = '-q 80';

    return converter.cwebp(pathToFile, options)
        .then((res) => {
            assert(res === checks.simpleTestWebp, "Return correct hex");
            fse.writeFile(path.join(__dirname, 'temp/test-output-png-to.webp'), res, 'hex');
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

it('Should convert .webp to .png file and return hex stdout', function() {
    let pathToFile = path.join(__dirname, 'assests/webp/test.webp');

    return converter.dwebp(pathToFile)
        .then((res) => {
            assert(res === checks.simpleTestPng, "Return correct hex");
            fse.writeFile(path.join(__dirname, 'temp/test-output-webp-to.png'), res, 'hex');
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

it('Should convert animated gif to animated webp file and return hex stdout', function() {
    let pathToFile = path.join(__dirname, 'assests/gif/test.gif');

    return converter.gif2webp(pathToFile)
        .then((res) => {
            assert(res, "Return correct hex");
            fse.writeFile(path.join(__dirname, 'temp/test-output-gif-to.webp'), res, 'hex');
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

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
