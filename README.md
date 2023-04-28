# RideshareFrontend

Ride-Share is a ride-sharing web application built on Angular. It allows users to request rides from drivers. It has a plat for drivers to create accounts and accept requests. 



https://user-images.githubusercontent.com/46534854/235141122-7d66348a-8789-44fa-a195-a88d9e4fb7c1.mov


## Features

- User can create an account
- User can log in
- User can request a ride
- Driver can create an account
- Driver can log in
- Driver can register his car


## Build and Run
- Get a google maps API Key from [Google console](https://console.cloud.google.com/) and add it to the `environments.ts` && `environments.ts` files.
- Ensure the `auth_api_url` && `request_api_url` are pointed to the right services

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `ng build --prod` flag for a production build.
- To run the project locally, run `ng serve` and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


