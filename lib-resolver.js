const path = require('path');

function getBinForCurrentOs(libName) {
    const Paths = {
        darwin: `/lib/libwebp_osx/bin/${libName}`,
        linux: `/lib/libwebp_linux/bin/${libName}`,
        win32: {
            x64: `/lib/libwebp_win64/bin/${libName}.exe`,
            x86: `/lib/libwebp_win32/bin/${libName}.exe`
        },
        other: `/lib/other/bin/'${libName}`
    };

    let pathToLib;
    if (process && process.platform !== undefined) {
        pathToLib = Paths[process.platform] === 'win32' ? Paths[process.platform][process.arch] : Paths[process.platform];
    } else {
        console.log('Cannot detect current platform, please specify your platform directly in options');
        // TODO: add support for options
    }

    if (pathToLib !== undefined) {
        return path.join(__dirname, pathToLib);
    } else {
        console.log('Unsupported platform:', process.platform, process.arch);
        return path.join(__dirname, Paths.other);
    }
};

module.exports = getBinForCurrentOs;