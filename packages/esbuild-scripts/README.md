<div align="center">
<h1>Create Esbuild App / esbuild-scripts 🔥</h1>

<p>An extremely fast create-react-app replacement.</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build](https://github.com/LukeSheard/esbuild-scripts/actions/workflows/node.js.yml/badge.svg)](https://github.com/LukeSheard/esbuild-scripts/actions/workflows/node.js.yml?query=branch%3Amain)
<!-- prettier-ignore-end -->

## What is it?

<img width="15%" align="right" src="https://esbuild.github.io/favicon.svg">

`create-esbuild-app` is a wrapper around `create-react-app` while `esbuild-scripts` is a `react-scripts` compatible CLI which can be dropped in as a replacement. They use the toolchain and development experience already provided by the Create React App ecosystem but provide an faster experience by abstracting esbuild as a bundler and using native esbuild plugins for speed.

`esbuild-scripts` in most cases should be a drop in replacement for `react-scripts`.

## Creating an App

```sh
yarn create @lukesheard/esbuild-app my-app
cd my-app
yarn start
```

If you've previously installed `create-esbuild-app` globally you can run `yarn global remove create-esbuild-app` to remove it - this will ensure that you always use the latest version when creating a new app.

**Note:** The API of `create-esbuild-app` mirrors that of `create-react-app` but will default the template of a new app to _TypeScript_. However if you want to use a custom template you can do so
by supplying a `--template` argument like so

```sh
yarn create @lukesheard/esbuild-app my-app --template my-template
```

Supplying an empty template will default to the JavaScript template from `create-react-app`. This is because in most instances I've noticed users default to this template anyway - so I wanted to abstract this in a way which made it simple to pick convetional defaults.

For more documentation on creating an App refer to the [Create React App documentation](https://create-react-app.dev/docs/folder-structure).
