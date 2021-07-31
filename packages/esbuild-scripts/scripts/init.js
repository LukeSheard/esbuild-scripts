"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const { execSync, exec } = require("child_process");

module.exports = function (
  appPath,
  appName,
  verbose,
  originalDirectory,
  templateName
) {
  const useYarn = fs.existsSync(path.join(appPath, "yarn.lock"));

  execSync(useYarn ? "yarn add react-scripts" : "npm install react-scripts", {
    stdio: "inherit",
    cwd: appPath,
  });

  require("react-scripts/scripts/init").apply(null, [
    appPath,
    appName,
    verbose,
    originalDirectory,
    templateName,
  ]);

  execSync(
    useYarn ? "yarn remove react-scripts" : "npm uninstall react-scripts",
    {
      stdio: "inherit",
      cwd: appPath,
    }
  );
  execSync(useYarn ? "yarn install" : "npm install", {
    stdio: "inherit",
    cwd: appPath,
  });
};
