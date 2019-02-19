const { app } = require("electron");
const chokidar = require("chokidar");
const path = require("path");

const appPath = app.getAppPath();
const config = require(path.join(appPath, "package.json"));
const mainFile = path.join(appPath, config.main || "index.js");

module.exports = () => {
  const watcher = chokidar.watch(mainFile, { ignoreInitial: true });

  watcher.on("change", () => {
    app.relaunch();
    app.exit();
  });
};
