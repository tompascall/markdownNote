#Work Flow of Developing simpleNote App

In this log I'd like to document the work flow of developing the simpleNote app.

##Project management method

In this project we will use [Trello](https://trello.com/about). It is free, flexible and really useful tool for managing your projects.

We create 5 tables in [the simpleNote board](https://trello.com/b/zlgPDTj4/simplenote):

- **Backlog**: these cards contains features in user stories and acceptance criteria form
- **Sprint backlog**: backlog cards being in the given sprint
- **Todo**: the tasks that we can hammer out the features with
- **In progress**: tasks in progress
- **Done**: done tasks

For now we created the following cards in Backlog:

- **Setting up developing environment**
- **Create a list of notes (show title)**
- **Show details of notes (title, text, tags)**
- **Add note**
- **Remove note**
- **Edit note**
- **Filter note by search term**
- **Synchronize note data with database**

In the following we'll walk through the cards above and realize them.

##1. Setting up the developing environment

###1.1. Using Ionic Framework

We develop this app in [Ionic](http://ionicframework.com/) framework. I wrote a [blogpost](http://js-workout.tompascall.com/lets-create-hybrid-mobile-apps-with-ionic-framework/) on setting up your environment for an ionic project.

###1.2. Using Yeoman

We generate the template using [Yeoman](http://yeoman.io/), especially the Yeoman [Ionic Generator](https://github.com/diegonetto/generator-ionic):

```bash
$ npm install -g generator-ionic
```

Then scaffold the project:

```bash
$ yo ionic simpleNote
```

- didn't use Sass with Compass now
- no additional Cordova plugins than defaults
- *Blank* starter template

In Windows you need to install Python 2.7.~, and Visual Studio Express to get the build.

###1.3 Project Structure

```
├── Gruntfile.js            - Configuration of all Grunt tasks
├── package.json            - Dev dependencies and required Cordova plugins
├── bower.json              - Lists front-end dependencies
├── config.xml              - Global Cordova configuration
├── .gitignore              - Best practices for checking in Cordova apps
├── resources/              - Scaffolded placeholder Icons and Splashscreens
│   ├── ios/
│   ├── android/
├── app/
│   ├── index.html          - Main Ionic app entry point
│   ├── lib/                - Libraries managed by Bower
│   ├── scripts/            - Custom AngularJS Scripts
│   ├── styles/             - Stylesheets
│   ├── templates/          - HTML views
├── platforms/              - Targeted operating systems
├── plugins/                - Native plugins
├── hooks/                  - Cordova lifecycle hooks
├── merges/                 - Platform specific overrides
├── coverage/               - Istanbul reports
├── test/                   - Unit tests
│   ├── spec/
├── www/                    - Copied from app/ to be used by Cordova

Source: https://github.com/diegonetto/generator-ionic
```
###1.4. Workflow commands

For all commands check out the [Ionic Generator](https://github.com/diegonetto/generator-ionic) page (but first your Gruntfile.js)

####grunt serve

Run a local development server with built in file system watching support integrated with LiveReload so you can develop your Ionic app in a browser. It also does linting your code.

####grunt test

Watch for changes and run your tests, using ```karma```, ```mocha```, ```chai```.

###1.5. Cleaning up the template

- ```app/scripts/app.js```: changing the main module name (simpleNote), removing unwanted comments and adding ```'use strict'```
- ```app/index.html```: adding title (simpleNote), updating the module name and the header title

###1.6. Editorconfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.

The content of .editorconfig file:
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

###1.7. Setting up test environment

Running ```grunt test``` launches [Karma](http://karma-runner.github.io/0.12/index.html) testing tool. This grunt task watches *.js file changing in the following libraries (and their sub-libraries)

- app/scripts
- test/mock
- test/spec

The latter two libraries doesn't exist, so we have to create them. After creating the folders you need rerun ```grunt test``` for correct watching.

####1.7.1. Create a sample test

Let's create a sample test to see if our testing tool works:

```js
// test/spec/sample.spec.js

'use strict';

describe('Sample test for setting up development framework', function () {
  it('should be ok', function () {
    expect(true).to.equal(true);
  });
});
```
Let's test a sample angular directive. First install [karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor). As its documentation says

>This preprocessor converts HTML files into JS strings and generates Angular modules. These modules, when loaded, puts these HTML files into the $templateCache and therefore Angular won't try to fetch them from the server.

```bash
$ npm install karma-ng-html2js-preprocessor --save-dev
```
We need update our ```Gruntfile.js```'s karma task. Add the correct path to files array:

```js
files: [
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.drv.html': ['ng-html2js']
        ],
```

**Add preprocessor** to karma task's options:

```js
preprocessors: {
          (...)
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.drv.html': ['ng-html2js']
        },
ngHtml2JsPreprocessor: {
  // strip this from the file path
  stripPrefix: 'app/scripts/', // to get the correct path regards building
  
  // setting this option will create only a single module that contains templates
  // from all the files, so you can load them all with module('templates')
  moduleName: 'templates'
},
```

Now we can create our second test in sample.spec.js:

```js
describe('Directive: sample-directive', function () {
  var $compile;
  var scope;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  it('should get the appropriate content', function () {
    var element = $compile('<sample-directive></sample-directive>')(scope);
    scope.$digest();
    expect(element.html()).to.contain('<h1>Sample</h1>');
  });
});

```

And write the sample directive:

- create a ```sample``` folder in ```app/scripts```
- create a file in ```app/scripts/sample/sample.drv.js```

```js
// sample.drv.js

'use strict';

angular.module('simpleNote').directive('sampleDirective', function () {
  return {
    restrict: 'E',
    templateUrl: 'sample/sample.drv.html'
  };
});

```

Finally, create the test template ```app/scripts/sample/sample.drv.html```:

```html
<h1>Sample</h1>

```

####1.7.2. Extending test framework with karma-jquery and chai-jquery

If you want to write tests for Angular directives, you need tools for testing DOM elements. This is where [karma-jquery](https://github.com/scf2k/karma-jquery) and [karma-chai-jquery](https://www.npmjs.com/package/karma-chai-jquery) come into play. Let's install them:

```bash
$ npm install karma-jquery karma-chai-jquery --save-dev
```

We need to update the karma task in ```Gruntfile.js```:

```js
options: {
  frameworks: ['chai-jquery', 'chai', 'jquery-1.8.3', 'mocha'],
  (...)
}
```

Check out the order of frameworks. As of this writing you need to keep this order (from the most specified to the less specified), otherwise you'll get an error.

Let's write a test that uses these frameworks. We'd like to develop a button element with a *sample-class* css class, and an inner ```<h1>``` element:

```js
describe('Directive: sample-directive', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<sample-directive></sample-directive>')(scope);
    scope.$digest();
  }));

  it('gets the appropriate content', function () {
    expect(element.html()).to.contain('<h1>Sample</h1>');
  });

  it('should get button element and check its css class', function () {
    var buttons = element.find('button');
    expect(buttons.eq(0)).to.have.class('sample-class');
  });
});
  
```

##2. Create a list of notes (show title)

###2.1. USER STORY

>AS I customer I WANT to see a list of my notes SO THAT I can read their title

###2.2. ACCEPTANCE CRITERIA

GIVEN I am a user
WHEN I open the app
THEN I can see a list of my notes (its title)

###2.3. Todos

- **Create mock data of notes**
- **Create directive for note list**
- **Deploy and test app on multiple devices**

###2.4. Create mock data of notes

The data of notes will be stored as Angular value (noteData), in the following format:

```js
[
  {
    title: noteTitle1
  },
  {
    title: noteTitle2
  }
]
```

####2.4.1. Unit test for noteData service

```js
// mock-data.spec.js

'use strict';

describe('Service: noteData', function () {

  beforeEach(module('simpleNote'));
    var noteData;

  beforeEach(inject(function ($injector) {
    noteData = $injector.get('noteData');
  }));

  it('should get noteData service', function () {
    expect(noteData).to.not.equal(undefined);
    expect(noteData.notes).to.be.an('array');
    expect(noteData.notes[0].title).to.be.a('string');
  });
});
```

####2.4.2. Create noteData service

```js
// noteData.srv.js

'use strict';

angular.module('simpleNote')

.factory('noteData', function noteDataFactory() {
  return {
    notes: [
      {
        title: 'noteTitle1'
      }
    ]
  };
});
```

**note:** I  tried to save my service to ```app/scripts/01_list-of-notes directory, but Karma or Angular didn't like its name, I had to remove the number tag.

###2.5. Create directive for note list

Show the list of notes using Angular directive. Populate data form the noteData service.

####2.5.1. Test for noteList directive

```js
// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
  }));

  it('contains the appropriate content', function () {
    expect(element.html()).to.contain('ng-repeat="note in notes"');
  });
});
```

####2.5.2. Create noteList directive


```js
// noteList.drv.js

'use strict';

angular.module('simpleNote').directive('noteList', noteList);

function noteList () {
  return {
    restrict: 'E',
    templateUrl: 'list-of-notes/note-list.drv.html',
  };
}
```

####2.5.3. Create the template for noteList directive

We give a temporary ```notes``` array for ng-repeat. Without this we would get an assertion error message as running test.

```html
<ul ng-init="notes = [1,2,3]">
  <li ng-repeat="note in notes"></li>
</ul>
```

####2.5.4. Test for noteData injection

We use the [component pattern](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html) while developing directives, i.e. we ban the use of ```ng-controller``` completely, use ```controllerAs```, isolate scopes and ```bindToController``` provided by the Angular 1.3.

```js
// noteList.drv.spec.js

'use strict';

describe('Directive: noteList', function () {
  var $compile;
  var scope;
  var element;
  var isolated;
  var noteData;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<note-list></note-list>')(scope);
    scope.$digest();
    isolated = element.isolateScope();
  }));

  beforeEach(inject(function (_noteData_) {
    noteData = _noteData_;
  }));

  it('contains the appropriate content', function () {
    expect(element.html()).to.contain('ng-repeat="note in ctrl.notes"');
  });

  it('injected the noteData service', function () {
    console.log(noteData.notes[0]);
    expect(isolated.ctrl.notes).to.deep.equal(noteData.notes);
  });
});
```

####2.5.5. Inject data from noteData service

```js
// noteList.drv.js

'use strict';

angular.module('simpleNote').directive('noteList', noteList);

function noteList () {
  return {
    restrict: 'E',
    templateUrl: 'list-of-notes/note-list.drv.html',
    controller: noteListCtrl,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true
  };

  function noteListCtrl (noteData) {
    this.notes = noteData.notes;
  }
}
```

####2.5.6. Update the tepmlate

```html
<ul>
  <li ng-repeat="note in ctrl.notes"></li>
</ul>
```

####2.5.7. Test for exposing noteData.notes to DOM

```js
it('should contain the title of the note', function () {
  expect(element.html()).to.contain(noteData.notes[0].title);
});
```

####2.5.8. Expose noteData.notes to DOM

Let`s update the directive's template:

```html
<ul>
  <li ng-repeat="note in ctrl.notes">
    {{note.title}}
  </li>
</ul>
```

now we also have to update the ```index.html```, in order to include the proper scripts and use the ```noteList``` directive.

```html
<body ng-app="simpleNote">
  <ion-pane>
    <ion-header-bar class="bar-stable">
      <h1 class="title">simpleNote</h1>
    </ion-header-bar>
    <ion-content>
      <note-list></note-list>
    </ion-content>
  </ion-pane>
</body>

```

####2.5.9. Test for styling

Ionic layouts based on flexbox technology. We have to use prefixes for flexbox, because it is not fully supported by Phantomjs (it supports ```-webkit-box``` prefix).

We use ```<ion-list>``` and ```<ion-item>``` ionic directive for our list.

```js
it('should be an ion-list', function () {
  var list =  element.find('ion-list');
  expect(list.length).to.equal(1);
  var items = element.find('ion-list ion-item');
  expect(items.length).to.equal(noteData.notes.length);
});

```

We heaviliy use ```karma-jquery``` and ```jquery-chai``` for testing css:

```js
it('ion-item should have note css class', function () {
    var titleRow = element.find('ion-item div');
    expect(titleRow).to.have.class('row');
    var noteTitleContainer = titleRow.eq(0).children('div').eq(0);
    expect(noteTitleContainer).to.have.class('note-title-container col col-80');
    expect(noteTitleContainer).to.have.css('display').match(/-webkit-box|-ms-flexbox-webkit-flex|flex/);
    var noteTitle = noteTitleContainer.children('h2');
    expect(noteTitle).to.have.class('note-title');
    expect(noteTitle).to.have.css('color','rgb(255, 0, 0)');
    expect(noteTitle.children('span')).to.have.class('wordwrap');
  });
```

**Note:** For testing css we have to inculde our css file path in karma task, and have to instantiate our element in the browser by the following line in our testfile:

```js
angular.element(document).find('body').append(element);
```

This is really important, you won't get the proper css values without this step.

####2.5.10. Add styling

```css
/* app/styles/style.css */

div.note-title-container {
  display: -webkit-box;  /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox;  /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
  align-items: center;
}

.note-title {
  color: rgb(255, 0, 0);
}

.wordwrap {
  white-space: normal;
  line-height: 30px;
}

```

####2.5.11. Update the template

```html
<!-- noteList.drv.html -->

<ion-list>
  <ion-item ng-repeat="note in ctrl.notes">
    <div class="row">
      <div class="note-title-container col col-80">
        <h2 class='note-title'>
          <span class="wordwrap" ng-bind="note.title"></span>
        </h2>
      </div>
    </div>
  </ion-item>
</ion-list>
```

##3. STORY: Show details of notes (title, text, tags)

###3.1. USER STORY

>AS I customer I WANT to see the detail of my notes SO THAT I can read them

###3.2. ACCEPTANCE CRITERIA

GIVEN I am a user
WHEN I see the list of notes
THEN I can see the first 5 words of their text (excerpt)

GIVEN I am a user
WHEN I tap on the note
THEN I can see the whole text, and the tags

GIVEN I am a user
WHEN I tap on a note
THEN I can see the text excerpt again

###3.3. Todos

- **Add mock data to noteData service**
- **Populate data to noteList directive**
- **Add tap handler to noteList directive**
- **Add styling to noteList as regards text and tags**

###3.4. Add mock data to noteData service

####3.4.1. Test: new data structure in noteData service

Data structure:

```js
{
  notes: [
    {
      title: string
      text: string
      tags: [strings]
    },
    ...
  ]
}
```
```js
describe('Add more mock data to noteData service', function () {
  it('should have the correct properties', function () {
    expect(noteData.notes[0]).to.have.property('text');
    expect(noteData.notes[0].text).to.be.a('string');
    expect(noteData.notes[0]).to.have.property('tags');
    expect(noteData.notes[0].tags).to.be.an('array');
  });
});
```

####3.4.2. Create new data structure in noteData sevice

```js
notes: [
  {
    title: 'Quite extremely long long long long long long title for testing purpose',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
      'do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
      'culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['first note', 'testing purpose', 'lorem ipsum', 'Cicero', 'de Finibus Bonorum et Malorum',
      'long title', 'a lot of tags']
  },
  ...
```

###3.5. Populate data to noteList directive

####3.5.1. Test: data injection to noteList directive

```js
describe('Show details of notes', function () {
  it('should contain all property of notes of noteData service', function () {
    var notes = element.find('ion-list ion-item').eq(0);
    expect(notes).to.contain(noteData.notes[0].title);
    expect(notes).to.contain(noteData.notes[0].text);
    expect(notes.html()).to.contain('ng-repeat="tag in note.tags"');
    expect(notes).to.contain(noteData.notes[0].tags[0]);
  })
});
```

###3.5.2 Data injection to noteList directive

```html
<!-- noteList.drv.html -->

<ion-list>
  <ion-item ng-repeat="note in ctrl.notes">
    <div class="row">
      <div class="note-title-container col col-80">
        <h2 class='note-title'>
          <span class="wordwrap" ng-bind="note.title"></span>
        </h2>
      </div>
    </div>
    <p>{{note.text}}</p>
    <p><span ng-repeat="tag in note.tags" ng-bind="tag + ' '"><span></p>
  </ion-item>
</ion-list>

```

###3.6. Add tap handler to noteList directive

####3.6.1. Test: initial state of a note (closed)

I decided to extend the noteData service to store the state of the notes. I didn't want to store the state in the ```notes``` array, but created an other array, ```stateOfNotes```. It has to have one to one parallelizm with the ```notes``` array, so I added ids to ```notes``` and ```stateOfNotes``` elements:

```js
notes: [
  {
    id: 0,
    title: ...,
    text: ...,
    tags: [...]
  },
  ...
],
initStateOfNotes: function () {
  this.stateOfNotes = [];
  var self = this;
  this.notes.forEach(function (note) {
    self.stateOfNotes.push({
      id: note.id,
      opened: false
    });
  });
}
```

Here comes the tests:

```js
describe('Set initial state (closed) in noteList directive', function () {

  it('should set the state of notes in noteData to closed', function () {
    var firstNote = isolated.ctrl.notes[0];
    noteData.stateOfNotes[firstNote.id].opened = true;
    isolated.ctrl.noteData.initStateOfNotes();
    expect(noteData.stateOfNotes[firstNote.id].opened).to.equal(false);
  });

  it('initial state of note should be closed', function () {
    var firstNote = isolated.ctrl.notes[0];
    expect(isolated.ctrl.stateOfNotes[firstNote.id].opened).to.equal(false);
  });
});
```

####3.6.2. Set initial state (closed) in noteList directive

I had to modify ```noteList``` directive:

```js
function noteListCtrl (noteData) {
  /*jshint validthis: true */
  var controller = this;
  noteData.initStateOfNotes();
  controller.noteData = noteData;
  controller.notes = noteData.notes;
  controller.stateOfNotes = noteData.stateOfNotes;
}
```

####.3.6.3. Test: tap handler toggle the state

```js
describe('Tap handler to toggle the state of a note', function () {

  it('should toggle state', function () {
    var note = isolated.ctrl.notes[0];
    isolated.ctrl.toggleNoteState(note);
    expect(isolated.ctrl.noteData.stateOfNotes[note.id].opened).to.equal(true);
    isolated.ctrl.toggleNoteState(note);
    expect(isolated.ctrl.noteData.stateOfNotes[note.id].opened).to.equal(false);
  });

  it('should toggle state when note element is clicked', function () {
     var note = element.find('ion-list ion-item').eq(0);
     note.click();
     expect(isolated.ctrl.noteData.stateOfNotes[0].opened).to.equal(true);
     var secondNote = element.find('ion-list ion-item').eq(1);
     expect(isolated.ctrl.noteData.stateOfNotes[1].opened).to.equal(false);
     note.click();
     expect(isolated.ctrl.noteData.stateOfNotes[0].opened).to.equal(false);
  });
});
```

####3.6.4. Add tap handler

```js
controller.toggleNoteState = function (note) {
  noteData.stateOfNotes[note.id].opened = !noteData.stateOfNotes[note.id].opened;
};
```

We have to pass the actual note to the ```toggleNoteState``` method, and call the handler with ```ng-click```:

```html
<ion-item ng-repeat="note in ctrl.notes" ng-click="ctrl.toggleNoteState(note)">
```

####3.6.5. Test: connect tap handler with ng-show

```js
describe('Connect tap handler with ng-show', function () {
  it('should add and remove ng-hide class', function () {
    var note = element.find('ion-list ion-item').eq(0);
    var textAndTags = element.find('#note-text-and-tags').eq(0);
    expect(textAndTags).to.have.class('ng-hide');
    note.click();
    expect(textAndTags).to.not.have.class('ng-hide');
  });
});
```

####3.6.6. Connect tap handler with ng-show

```html
<div id="note-text-and-tags" ng-show="ctrl.stateOfNotes[note.id].opened">
  <p>{{note.text}}</p>
  <p><span ng-repeat="tag in note.tags" ng-bind="tag + ' '"><span></p>
</div>
```


###3.7. Add styling to noteList as regards text and tags

####3.7.1. Test: place text to a paragraph

```js
describe('Place text to a paragraph', function () {
  beforeEach(function () {
    text = textAndTags.find('.text-title');
  });

  it('text should be in a p element', function () {
    expect(text.html()).to.contain(noteData.notes[0].text);
  });
});
```

####3.7.2. Place text to a paragraph

```html
<div class="text-title-container">
  <p class="text-title"><span class="text-title-wordwrap" ng-bind="note.text"></span></p>
</div>
```

####3.7.3. Test: show tags separately

```js
describe('Show tags separately', function () {

  beforeEach(function () {
    tagsRow = textAndTags.find('#tags-row');
  });

  it('should be placed in a row', function () {
    expect(tagsRow).to.have.class('row');
  });

  it('should have a tag-container, a col and a col-80 class', function () {
    expect(tagsRow.find('p#tag-container')).to.have.class('col col-80');
  });

  it('should contain #tag-title with given css', function () {
    var tag = tagsRow.find('span.tag-title');
    expect(tag.html()).to.contain(isolated.ctrl.notes[0].tags[0])
    expect(tag).to.have.css('background-color', 'rgb(153, 153, 153)');
    expect(tag).to.have.css('color', 'rgb(255, 255, 255)');
  });
});
```

####3.7.4. Show tags separately

```html
 <div id="tags-row" class="row">
  <p id="tag-container" class="col col-80">
    <span class="tag-title" ng-repeat="tag in note.tags" ng-bind="tag + ' '"><span>
  </p>
</div>
```
I haven't tested all the css just a few properties, but here are the whole css code:

```css
#tag-container {
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex;
  align-items: center;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.tag-title {
  background-color: rgb(153, 153, 153);
  display: inline-block;
  color: rgb(255, 255, 255);
  margin: 2px 3px 2px 3px;
  padding: 0 5px 0 5px;
  border-radius: 3px;
  line-height: 25px;
}
```

####3.7.5. Test: add decorator icon to tags

```js
describe('Add decorator icon to tags', function () {

  beforeEach(function () {
    tagsRow = textAndTags.find('#tags-row');
  });

  it('should have tags icon', function () {
    expect(tagsRow.find('p i')).to.have.class('icon ion-pricetags');
  });
});
```

####3.7.6. Add decorator icon to tags

```html
 <p id="tag-container" class="col col-80"><i class="icon ion-pricetag"></i>&nbsp;
    <span class="tag-title" ng-repeat="tag in note.tags" ng-bind="tag + ' '"><span>
  </p>
```

##4. STORY: Add New Note

###4.1. ###USER STORY

>AS I customer I WANT to see a + button in the header SO THAT I can add new notes

###4.2. ACCEPTANCE CRITERIA

GIVEN I am a user
WHEN I see the app header
I can see a + button

GIVEN I am a user
WHEN I tap the + button
THEN I can see a popped up new note form with a title, text and tags input fields, a cancel and an add button

GIVEN I am a user
WHEN I tap on the cancel button
THEN the form disappears without adding a new note

GIVEN I am a user
WHEN I don't fill the title field
THEN I cannot add the new note

GIVEN I am a user
WHEN I fill title and text and/or tags
THEN I can add a new note by pushing the add button

GIVEN I am a user
WHEN I type the same words separated by commas
THEN the new note will only keep the different tags

###4.3. Todos

- **Add + button to the header**
- **Add new note modal**
- **Add tap handler to the + button**
- **Create helper service to filter out the useless white spaces and the same tags**
- **Connect modal data to noteData service**

###4.4. Add + button to the header

A + icon button must be placed on the right side of the header.

**NOTE** If you create a directory in the ```scripts``` folder which name is before alphabetically than the ```app.js```, your test will be failed, because it won't be able to find the main module and cannot inject it.

####4.4.1. Test: place a + button to the app-header directive

```js
// appHeader.drv.js

'use strict';

describe('Directive: appHeader', function () {
  var $compile;
  var scope;
  var element;
  var noteData;

  beforeEach(module('simpleNote'));

  beforeEach(module('templates')); // from ngHtml2JsPreprocessor karma task

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
    element = $compile('<app-header></app-header>')(scope);
    scope.$digest();
    angular.element(document).find('body').append(element); // for rendering css
  }));

  describe('Test directive existence ', function () {
    it('should have an ion-header-bar', function () {
      expect(element.find('ion-header-bar'))
        .to.have.attr('align-title', 'center');
    });

    it('should have a h1 with a notes-header id', function () {
      expect(element.find('h1#notes-header'))
        .to.have.class('title');
    });

    it('should have a button with class button button-icon', function () {
      expect(element.find('button#add-button'))
        .to.have.class('button button-icon');
    });

    it('should have a plus icon', function () {
      expect(element.find('button#add-button').children('i'))
        .to.have.class('icon ion-plus-round');
    });
  });
});

```

####4.4.2. Place a + button to the app-header directive

```js
// appHeader.drv.js

'use strict';

function appHeaderDirective () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/newNote/app-header.drv.html'
  };
}

angular.module('simpleNote').directive('appHeader', appHeaderDirective);
```

###4.5. Add new note modal

We use Ionic [```$ionicModal```](http://ionicframework.com/docs/api/service/$ionicModal/) functionalitly for the add new note form.

####4.5.1. Test: create minimal ```newNoteModal``` modal from template and attach it to ```noteList``` directive

```js

// add-in for noteList.drv.spec.js

 describe('Add newNoteModal', function () {
  it('should be an $ionicModal', function () {
    var isolated.ctrl.newNoteModal;
    newNoteModal.show();
    expect(newNoteModal.isShown()).to.equal(true);
    newNoteModal.hide();
    expect(newNoteModal.isShown()).to.equal(false);
    newNoteModal.remove();
  });
});
```

####4.5.2. Create minimal ```newNoteModal``` modal from template and attach it to ```noteList``` directive

We have to place it to the controller:

```js
$ionicModal.fromTemplateUrl('scripts/new-note/new-note-modal.html', {
    scope: $scope,
    focusFirstInput: true
  })
.then(function (modal) {
  controller.newNoteModal = modal;
});
```
And the minimal template is:

```html
<!-- new-note-modal.html -->

<div class="modal"></div>
```

####4.5.3. Test: create ```hideModal()``` and ```showModal()``` method

```js
describe('Show and hide newNoteModal', function () {
  it('should sow and hide modal', function () {
    isolated.ctrl.showModal(newNoteModal);
    expect(newNoteModal.isShown()).to.equal(true);
    isolated.ctrl.hideModal(newNoteModal);
    expect(newNoteModal.isShown()).to.equal(false);
    newNoteModal.remove();
  });
});
```

####4.5.4. Create ```hideModal()``` and ```showModal()``` method

```js
controller.showModal = function (modal) {
  modal.show();
};

controller.hideModal = function (modal) {
  modal.hide();
};
```

####5.4.5. Test: add input fields to modal

**NOTE** There was a hitch when I tried to test the template of the modal. The Ionic [```$ionicModal```](http://ionicframework.com/docs/api/service/$ionicModal/) doesn't have a functionality to get the template. I decided to mak a mock directive with the help of the templete of the modal, and test the template through the directive. It was quite tricky.

First, I have to modify the main module in the fly, just before get the module for testing:

```js
 angular.module('simpleNote').directive('mockNewNoteModal', function () {
  return {
    resrict: 'E',
    templateUrl: 'scripts/new-note/new-note-modal.html'
  };
});

beforeEach(module('simpleNote'));
```

THen I had to compile the mock element:

```js
  testDirective = $compile('<mock-new-note-modal></mock-new-note-modal>')(scope);
  scope.$digest();
```

And here comes the tests:

```js
it('should have a title input field', function () {
  expect(testDirective.find('div')).to.have.class('modal');
});

it('should contain ion-header-bar', function () {
  var headerBar = testDirective.find('ion-header-bar');
  expect(headerBar).to.have.class('secondary');
  expect(headerBar.children('h1')).to.have.class('title');
  expect(headerBar.children('h1').text())
    .to.contain('Your New Note');
  expect(headerBar.children('button'))
    .to.have.class('button button-clear button-positive');
});

it('should have input fields', function () {
  var inputList = testDirective.find('ion-content form div.list label');
  expect(inputList.children('input'))
    .to.have.attr('placeholder', 'Title of your note');
  expect(inputList.children('textarea'))
    .to.have.attr('placeholder', 'Enter your note here');
   expect(inputList.children('input').eq(1))
    .to.have.attr('placeholder', 'Tags (separated by commas)');
});

it('should have a padding area', function () {
  var button = testDirective.find('ion-content form div.padding button');
  expect(button).to.have.attr('type', 'submit');
  expect(button.text()).to.contain('Create Note');
});
```

**NOTE**

I realaized that there is a sipler method of testing modal. Here is my solution:

[test modal template](http://stackoverflow.com/questions/29954669/how-to-test-the-template-of-an-ionic-modal/29983186#29983186)

So I refactored the tests followed the new method like this:

```js
var modalElement = newNoteModal.$el;
expect(modalElement.find('div')).to.have.class('modal');
```

####5.4.6. Add input fields to modal

```html
<!-- new-note-modal.html -->

<div class="modal">
  <!-- Modal header bar -->
  <ion-header-bar class="secondary">
    <h1 class="title">Your New Note</h1>
    <button class="button button-clear button-positive">Cancel</button>
  </ion-header-bar>
  <!-- Modal content area -->
  <ion-content>
    <form>
      <div class="list">
        <label class="item item-input">
          <input type="text" placeholder="Title of your note">
        </label>

        <label class="item item-input">
          <textarea rows="10" placeholder="Enter your note here"></textarea>
        </label>

        <label class="item item-input">
          <input type="text" placeholder="Tags (separated by commas)">
        </label>
      </div>
      <div class="padding">
        <button type="submit" class="button button-block button-positive">Create Note</button>
      </div>
    </form>
  </ion-content>
</div>
```

###4.6. Add tap handler to the + button to show newNote modal

Now I realized that It was a bad decision to put the modal to the noteList directive. I must move the modal to the appHeader directive. So before adding handler to + button I have to implement this move.

####4.6.1. Test: add handler to the + button

```js
describe('Add tap handler to + button', function () {
  it('should show the modal', function () {
    element.find('button#add-button').click();
    expect(newNoteModal.isShown()).to.equal(true);
    newNoteModal.remove();
  });
});
```

####4.6.2. Add handler to the + button

```html
<button id="add-button" class="button button-icon" ng-click="ctrl.showModal(ctrl.newNoteModal)">
  <i class="icon ion-plus-round"></i>
</button>
```

####4.6.3. Test: add tap handler to the cancel button of the modal

```js
describe('Add tap handler to Cancel button', function () {
  it('should hide the modal', function () {
    modalElement.find('#new-note-modal-cancel-button').click();
    expect(newNoteModal.isShown()).to.equal(false);
    newNoteModal.remove();
  });
});
```

####4.6.4. Add tap handler to the cancel button of the modal

```html
<button id="new-note-modal-cancel-button" class="button button-clear button-positive" ng-click="ctrl.hideModal(ctrl.newNoteModal)">Cancel</button>
```

###4.7. Create helper service to filter out the useless white spaces and the same tags

####4.7.1. Test: create `tagsFactory` service that serves an object

```js
'use strict';

describe('Service: tags', function () {
  var tagsFactory;

  beforeEach(function () {
    module('simpleNote');

    inject(function ($injector) {
      tagsFactory = $injector.get('tagsFactory');
    });
  });

  it('should split a string with commas to an array', function () {
    var tagsString = 'one,two,three';
    var tagsArray = [];
    tagsArray = tagsFactory.tagsStringToArray(tagsString);
    expect(tagsArray.length).to.equal(3);
    expect(tagsArray[0]).to.equal('one');
    expect(tagsArray[2]).to.equal('three');
  });
});
```

####4.7.2. Create `tagsFactory` service that serves an object

```js
'use strict';

function tagsFactory () {
  return {
    tagsStringToArray: function (tagsString) {
      var tagArr = [];
      if (tagsString) {
        tagArr = tagsString.split(',').filter(function(tag) {
            return tag !== '';
        });
      }
      return tagArr;
    }
  };
}

angular.module('simpleNote').factory('tagsFactory', tagsFactory);
```

####4.7.3. Test: create filterTagsString method

###4.7.4. Create filterTagsString method

  
###4.8. Connect modal data to noteData service
