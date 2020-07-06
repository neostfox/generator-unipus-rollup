const path = require("path");
const fs = require("fs");
const loadPath = path.resolve(__dirname, "./templates");
let filePaths = [];
/**
 * 递归获取模板文件夹下的模板
 * @param {string} currentDirPath 当前文件路径
 */
function walk(currentDirPath) {
  const paths = fs.readdirSync(currentDirPath);
  paths.forEach((item) => {
    const fpath = path.join(currentDirPath, item);
    if (fs.statSync(fpath).isFile())
      filePaths.push(
        process.cwd(),
        fpath.replace(path.resolve(__dirname, "templates") + "/", "")
      );
    else walk(fpath);
  });
}
const Generator = require("yeoman-generator");
module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "project_name",
        message: "要初始化的项目地址",
        default: this.appname,
      },
      {
        type: "input",
        name: "className",
        message: "输出类名",
        default: "UNIPUS_WEBRTC",
      },
      {
        type: "input",
        name: "publish_path",
        message: "编译后生成地址",
        default: "./dist",
      },
    ]).then((anwsers) => {
      this.anwsers = anwsers;
    });
  }
  writing() {
    walk(loadPath);
    filePaths.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.anwsers
      );
    });
  }
};
