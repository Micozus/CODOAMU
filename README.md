# Webpack/Babel starter

Starter package for creating js applications. Include MVC pattern for js folder structure and custom folder structure for sass styles.

## Getting Started

1. Clone this repo.

```
git clone git@github.com:bartstc/webpack-babel-starter.git
```

2. Install node modules.

```
npm i
```

3. For run in development mode, run command:

```
npm run start (webpack-dev-server --config webpack.dev.js --open)
```

4. For building app, run command:

```
npm run build (webpack --config webpack.prod.js)
```

## Software Used

- [Webpack](https://webpack.js.org/) - JavaScript bundler
- [Babel](https://babeljs.io/) - JavaScript compiler
- [SASS](https://sass-lang.com/) - CSS extension language

## Description of Contents

```
|-- src
|   |-- assets // images, icons, movies etc.
|   |
|   |
|   |-- icons-manifest // Manifest icons
|   |
|   |
|   |-- js // MVC pattern
|   |   |-- controllers
|   |   |-- models
|   |   |-- views
|   |
|   |
|   |-- sass
|   |   |-- modules // util styles like colors, typography, mixins etc.
|   |   |-- normalize // normalize.scss
|   |   |-- partials // divided styles responsible for individual sections of the application
|   |
|   |
|   |-- static // robos.txt, sitemap.xml etc.
|   |
|   |
|   |-- templates // all html files
|   |
|
|-- favicon.ico // -
|-- index.js // entry js point for webpack
|-- main.scss // styles main file
|-- template.html // entry html structure of app
|-- src-sw.js // Service Worker setup
|-- vendor.js // libraries like bootstrap, jquery, lodash
```

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
