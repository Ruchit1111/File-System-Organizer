const fs = require('fs');
const path = require('path')
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex",],
    app: ["exe", "dmg", "pkg", "deb"],
    image: ["jpg", "jpeg", "svg", "png"],
};

function organizefn(dirpath) {
    let destpath;
    if (dirpath == undefined) {
        console.log('Enter a valid path');
        return;
    } else {
        let doesExist = fs.existsSync(dirpath);
        console.log(doesExist);

        if (doesExist == true) {
            destpath = path.join(dirpath, 'organized_files');

            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);
            } else {
                console.log('This folder already exists');
            }
        }
        else { console.log('Enter a valid path'); }
    }
    organizeHelper(dirpath, destpath);
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);


    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();

        if (isFile == true) {
            let filecategory = getCategory(childNames[i]);
            // console.log(childNames[i]+" belongs to "+filecategory);
            sendFiles(childAddress, dest, filecategory);
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name);

    ext = ext.slice(1);


    for (let type in types) {
        let cTypeArr = types[type];

        for (let i = 0; i < cTypeArr.length; i++)
        
        {
            if (ext == cTypeArr[i]) {
                return type;
            }
        }
    }
    return 'others';
}


function sendFiles(srcFilePath, destPath, fileCategory) {
    let catPath = path.join(destPath, fileCategory);
    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catPath, fileName);

    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);

    console.log(fileName + ' is copied to ' + fileCategory);

}

module.exports = {
   organizeKey: organizefn
}