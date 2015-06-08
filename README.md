#Markdown Note - a Simple Note Manager

In this project we'll develop a hybrid mobile app, using test-driven development approach, developing in [Ionic Framework](ionicframework.com).

The app is a note manager. You can **store** your notes locally, you can **update** the content of notes and you can **filter** them by any keyword. You can also use **markdown language** to style and structure the body of your notes. As regards markdown editing we use the [Pagedown](https://code.google.com/p/pagedown/wiki/PageDown) library and [Pagedown-Extra plugin](https://github.com/jmcmanus/pagedown-extra).

If you are curious about the development work flow, just check out the [**development.log.md**](https://github.com/tompascall/markdownNote/blob/master/development.log.md) file for the details.

##Prerequisites of building the app

- [Node.js](nodejs.org)
- Install Ionic and Cordova globally: ```$ npm install -g ionic cordova```
- Clone the project
- Install Node packages: ```$ npm install```
- Install Bower packages: ```$ bower install```
- You need [Grunt](http://gruntjs.com/) globally: ```$ npm install -g grunt```
- Follow the [Android]() and [iOS]() platform guides to install required platform dependencies
- Check out [Ionic Generator documentation](https://github.com/diegonetto/generator-ionic/tree/master/docs)
- I recommend checking out [my blogpost](http://js-workout.tompascall.com/lets-create-hybrid-mobile-apps-with-ionic-framework/) about creating hybrid mobile apps with Ionic framework and [this post](http://js-workout.tompascall.com/lets-develop-hybrid-mobile-apps-with-ionic-framework-ii/) about setting up dev framework for developing ionic app with TDD.

##Build the app

- Add platform: ```$ grunt platform:add:<platform>``` (ios / android)
- Build the project from the project library: ```$ grunt build```

##Run the app

You can 

- emulate a device: ```$ grunt emulate:<platform>```
- run the app on a device: attach your device and ```$ grunt run```
- share the app via [Ionic View](http://view.ionic.io/)

For more information check out [Ionic Generator](https://github.com/diegonetto/generator-ionic#usage).

##Test the app

The test runs on [PhantomJS](http://phantomjs.org/), using the [Karma](http://karma-runner.github.io/0.12/index.html) test runner.

Run your tests with ```$ grunt test```.



