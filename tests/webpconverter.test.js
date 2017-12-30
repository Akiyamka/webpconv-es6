const path = require('path');
const converter = require('../webpconverter');
const assert = require('assert');
const fs = require('fs');

it('Should create .webp file from .png', function() {
    let pathToInput = path.join(__dirname, 'assests/png/test.png');
    let pathToOutput = path.join(__dirname, 'temp/test.webp');
    let quality = '-q 80';

    rmDir(path.join(__dirname, 'temp'), false);

    return converter.cwebp(pathToInput, pathToOutput, quality)
        .then((res) => {
            assert(res === pathToOutput, "Return correct file path for new file");
            assert(fs.existsSync(res), "File sucsessful created");
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

it('Should create .png file from .webp', function() {
    let pathToInput = path.join(__dirname, 'assests/png/test.webp');
    let pathToOutput = path.join(__dirname, 'temp/test.png');
    let quality = '-q 80';

    rmDir(path.join(__dirname, 'temp'), false);

    return converter.dwebp(pathToInput, pathToOutput, quality)
        .then((res) => {
            assert(res === pathToOutput, "Return correct file path for new file");
            assert(fs.existsSync(res), "File sucsessful created");
        }).catch((err) => {
            throw new Error(`Test crash, catch error: ${err}`);
        });
});

// Utilites //

function rmDir(dirPath, removeSelf = true) {
    let files = [];

    try { files = fs.readdirSync(dirPath); }
    catch(e) { return; }

    if (files.length > 0) {
        files.forEach((file) => {
            let filePath = dirPath + '/' + file
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                rmDir(filePath);
            }
        })
    }

    if (removeSelf) {
        fs.rmdirSync(dirPath);
    }
}
