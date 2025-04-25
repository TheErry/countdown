# Natural Cycles Countdown

A responsive countdown app built with Angular and TypeScript.

The user can set a title and an end date. The countdown starts from the current time and updates live in the format:

> `X days, Y h, Z m, A s`

The countdown text automatically scales to fill the screen width (single line), and both title and date are persisted between reloads.

## Tech

- Angular (standalone components)
- TypeScript
- HTML/CSS
- LocalStorage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Live site

See the site live here: [Countdown](https://errys-countdown.netlify.app/)


## To be improved

The first thing that could (and should) be improved is error handling and concrete unit tests for Countdown, AutoFontSize and LocalStorage, as well as better accessability. A support for changing languages would also be nice if it's going to be used by user globally. Right now it also doesn't have any backend, it's just using localStorage instead of saving data on a server or using API. 
This app is small now so I felt like I have to use a service, but an improvment, especially if it would be used in prod, is to add a service for countdown-logic (and localStorage if it's still needed) to make it reusable as well as easier to test and more prepared for backend. Pipes could also be used for example for the timer, it would once again make it easier to test and format. 
A small this is that the switch of containers with hasData and !hasData is not very smooth, and should probably have a better solution to make it look prettier.
I'd like to add an even for when the time runs out and perhaps a reset-button.