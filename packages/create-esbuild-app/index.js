#!/usr/bin/env node

"use strict";

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split(".");
var major = semver[0];

if (major < 12) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create ESBuild App requires Node 12 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
} else {
  const chalk = require("chalk");
  const { execSync } = require("child_process");
  const commander = require("commander");
  const packageJson = require("./package.json");
  const createReactApp = require.resolve("create-react-app");

  function exec(command) {
    return execSync(`${createReactApp} ${command}`, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }

  const SCRIPTS_VERSION = "@lukesheard/esbuild-scripts";

  new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)

    // * NOTE this is copied from Create React App to allow parity //
    .option("--verbose", "print additional logs")
    .option("--info", "print environment debug info")
    .option(
      "--template [path-to-template]",
      "specify a template for the created project",
      "typescript"
    )
    .option("--use-npm")
    .option("--use-pnp")
    .allowUnknownOption()

    .action((name, options) => {
      if (options.info) {
        return exec(`--info`);
      } else {
        return exec(
          `${name} --scripts-version=${SCRIPTS_VERSION} ${
            options.useNpm ? "--use-npm" : ""
          } ${options.useNpm ? "--use-pnpm" : ""} ${
            options.template ? `--template ${options.template}` : ""
          }`
        );
      }
    })
    .on("--help", () => {
      // * NOTE * Copied and modified from create-react-app to remove the
      // --scripts-version information since that is hard coded to esbuild-scripts

      console.log(
        `    Only ${chalk.green("<project-directory>")} is required.`
      );
      console.log();
      console.log(`    A custom ${chalk.cyan("--template")} can be one of:`);
      console.log(
        `      - a custom template published on npm: ${chalk.green(
          "cra-template-typescript"
        )}`
      );
      console.log(
        `      - a local path relative to the current working directory: ${chalk.green(
          "file:../my-custom-template"
        )}`
      );
      console.log(
        `      - a .tgz archive: ${chalk.green(
          "https://mysite.com/my-custom-template-0.8.2.tgz"
        )}`
      );
      console.log(
        `      - a .tar.gz archive: ${chalk.green(
          "https://mysite.com/my-custom-template-0.8.2.tar.gz"
        )}`
      );
      console.log();
      console.log(
        `    If you have any problems, do not hesitate to file an issue:`
      );
      console.log(
        `      ${chalk.cyan(
          "https://github.com/facebook/create-react-app/issues/new"
        )}`
      );
      console.log();
    })
    .parse(process.argv);
}
