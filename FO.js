let fs = require('fs');
let path = require('path');
let os = require('os');

const help=require('./commands/help')
const organize = require('./commands/organize')
const tree = require('./commands/tree')



let input = process.argv.slice(2);
let command = input[0];

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex",],
    app: ["exe", "dmg", "pkg", "deb"],
    image: ["jpg", "jpeg", "svg", "png"],
};

switch (command) {

    case 'tree':
        tree.treeKey(input[1])
        break;
    case 'organize':
        organize.organizeKey(input[1])
        break;
    case 'help':
        help.helpkey()
        console.log('help implemented');
        break;

    default:
        console.log('Enter a valid command');
        break;
}







