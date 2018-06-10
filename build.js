const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const { inlineSource } = require('inline-source');

const assetsPath = './assets';
const layoutsPath = './layouts';
const srcPath = './src';
const distPath = './public';

const site = {
    title: 'natty-bot-slack-web',
    description: 'natty bot slack web'
};
  
fse.emptyDirSync(distPath);
fse.copy(`${assetsPath}`, `${distPath}`);

globP('**/*.ejs', { cwd: `${srcPath}` })
.then((files) => {
    files.forEach((file) => {
        const fileData = path.parse(file);
        const destPath = path.join(distPath, fileData.dir);
        console.log(fileData, destPath);
        fse.mkdirs(destPath)
        .then(() => {
            return ejsRenderFile(`${srcPath}/${file}`, Object.assign({}, site));
        })
        .then((pageContents) => {
          return ejsRenderFile(`${layoutsPath}/main.ejs`, Object.assign({}, site, { body: pageContents }));
        })
        .then((contents) => {
            return inlineSource(contents, {compress: true});
        })
        .then((layoutContent) => {
          fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent);
        })
        .catch((err) => { console.error(err) });
    });
});
// // read page templates
// globP('**/*.ejs', { cwd: `${srcPath}/pages` })
//   .then((files) => {
//     files.forEach((file) => {
//       const fileData = path.parse(file)
//       const destPath = path.join(distPath, fileData.dir)

//       // create destination directory
//       fse.mkdirs(destPath)
//         .then(() => {
//           // render page
//           return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))
//         })
//         .then((pageContents) => {
//           // render layout with page contents
//           return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, config, { body: pageContents }))
//         })
//         .then((layoutContent) => {
//           // save the html file
//           fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
//         })
//         .catch((err) => { console.error(err) })
//     })
//   })
// .catch((err) => { console.error(err) })
