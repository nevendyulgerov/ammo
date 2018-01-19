# AmmoJS
## General purpose utility belt for building front-end applications with JavaScript

Ammo is a light-weight general-purpose utility belt for building front-end applications. It offers declarative constructs and functionality for DOM and data manipulation, template rendering, UI state management, event buffering, promises, polling. This library can replace heavy-in-size libraries like jQuery, as it offers similar functionality without the size/initialization overhead.

Ammo is built on top of the ESMAScript 2015 standard.
The library is ~40KB in size and about ~1200 lines of code.

## Requirements
* Just a browser, supporting ES6.

## How to Run:

1. [Download](https://github.com/nevendyulgerov/ammo/archive/master.zip) or [Clone](https://github.com/nevendyulgerov/ammo.git) the Repository.
2. Copy ammo/dist/ammo.js to your project's js folder.
3. Use the lib's API

## Notes
* Ammo is transpile-compatible. You can transpile it to ES5 by using babel and other js transpilers.

## Demo App
This repo contains a demo application which demonstrates several ammo methods, including ammo.app (app building construct), ammo.template (html lists compilator), ammo.sequence (promise implementation), ammo.selectAll (DOM manipulation API). The app's assets reside in ./assets.

## Demo App Requirements
* npm

## How to Run the Demo App:

1. Run `npm install` to install the project dependencies.
2. Run the app using `npm run server`.
3. App becomes available at: `http://localhost:3000`.
