import fs from "fs-extra";
import * as path from "path";

import getPublicUrlOrPath from "./get-public-url-or-path";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

interface AppPackageJson {
  homepage?: string;
}

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
export const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  (fs.readJSONSync(resolveApp("package.json")) as AppPackageJson).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || "build";

export const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

// Resolve file paths in the same order as webpack
export const resolveModule = (
  resolveFn: (relativePath: string) => string,
  filePath: string
): string => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

export const ownPath = path.dirname(path.join(__dirname, "..", ".."));

const resolveOwn = (relativePath: string) =>
  path.resolve(ownPath, relativePath);

export const dotenv = resolveApp(".env");
export const appPath = resolveApp(".");
export const appBuild = resolveApp(buildPath);
export const appPublic = resolveApp("public");
export const appHtml = resolveApp("public/index.html");
export const appIndexJs = resolveModule(resolveApp, "src/index");
export const appPackageJson = resolveApp("package.json");
export const appSrc = resolveApp("src");
export const appTsConfig = resolveApp("tsconfig.json");
export const yarnLockFile = resolveApp("yarn.lock");
export const testsSetup = resolveModule(resolveApp, "src/setupTests");
export const proxySetup = resolveApp("src/setupProxy.js");
export const appNodeModules = resolveApp("node_modules");
export const swSrc = resolveModule(resolveApp, "src/service-worker");
export const ownNodeModules = resolveOwn("node_modules");
export const appTypeDeclarations = resolveApp("src/react-app-env.d.ts");
export const ownTypeDeclarations = resolveOwn("react-app.d.ts");

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
export const NODE_PATH = (process.env.NODE_PATH || "")
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder));
