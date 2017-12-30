const libName = 'cwebp'

const Paths = {
    darwin: '/lib/libwebp_osx/bin/' + libName,
    linux: '/lib/libwebp_linux/bin/' + libName,
    win32: {
        x64: '/lib/libwebp_win64/bin/' + libName + '.exe',
        x86: '/lib/libwebp_win32/bin/' + libName + '.exe'
    }
};

var knowos = function () {
    let pathToLib = Paths[process.platform] === 'win32' ? Paths[process.platform][process.arch] : Paths[process.platform];

    if (pathToLib !== undefined) {
        return __dirname + pathToLib;
    } else {
        console.log('Unsupported platform:', process.platform, process.arch); //show unsupported platform message
    }
};

module.exports = knowos;