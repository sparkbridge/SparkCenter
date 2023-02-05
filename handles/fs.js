const fs = require('fs');

const read = fs.readFileSync;

const mkdir = fs.mkdirSync;

const rm = fs.rmSync;

const rmdir = fs.rmdirSync;

const write = fs.writeFileSync;

module.exports = {
    read,
    mkdir,
    rm,
    rmdir,
    write
}