# To-Do Board

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

* [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

* Chromium-based browsers (Chrome, Edge, Brave, etc.):
  * [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  * [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
* Firefox:
  * [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  * [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Capacitor and Plugins Setup

This project uses Capacitor alongside the Camera and Filesystem plugins. To ensure everything functions correctly, you must install the following dependencies:

```sh
npm install -D @capacitor/cli
npm install @capacitor/core
@ionic/pwa-elements
@capacitor/camera
@capacitor/filesystem 
```

Because the application provides web compatibility, the `@ionic/pwa-elements` package is necessary to supply the web-based user interface for the Camera component. This initialization is already configured within your application entry point.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
