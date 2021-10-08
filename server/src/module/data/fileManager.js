const path = require("path");
const fs = require("fs");

function manageUploadFile(fileinfo, uuid) {
    const fileName = fileinfo?.originalname;
    if (fileName === undefined) {
        return undefined;
    }
    return fileName.split(".")?.pop() ? fileName.split(".")?.pop() : "png";
}

function isNormalPath(dataPath) {
    const workspaceRootPath = path.resolve(`${__dirname}/../../../../../`);
    const absPath = path.resolve(path.normalize(dataPath));

    return absPath.indexOf(workspaceRootPath) > -1;
}

function isExists(dataPath) {
    if (!isNormalPath(dataPath)) {
        return false;
    }

    return fs.existsSync(dataPath);
}

module.exports = { manageUploadFile, isNormalPath, isExists };
