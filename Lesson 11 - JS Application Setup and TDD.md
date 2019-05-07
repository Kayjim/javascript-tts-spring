# Lesson 11 - JS Application Setup and Test Driven Development

## Recap & Intro
- Up to this point we've covered basic JS
	- Lanuage syntax
	- Object orientation
	- DOM / Browser / jQuery
	- API concepts
- The apps we've created are enhanced HTML pages
- Today we talk about what it means to create a JS app

## Node

- Node lets you run JavaScript in your terminal.
- Based on Chrome's V8 JS engine
- It's the basis of the JS ecosystem. All command-line tools for creating and managing JS applications require node.

## NPM
NPM is the Node Package Manager. It is installed for you with Node.

- Define an application
- Install open source packages (dependencies)
- Define how to run your application.

[https://docs.npmjs.com/getting-started/what-is-npm](https://docs.npmjs.com/getting-started/what-is-npm)

### NPM Init
Lets you create an application, give it a name, version, etc.

Run `npm init` in a directory and it will walk you through a wizard to define all the metadata for your app.

### package.json
NPM init creates a package.json file. Take a look at it.

It's JSON file that defines metadata about the application like Name, version, author, etc. It also includes information about running the app.

```javascript
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "My first app",
  "main": "index.js",
  "scripts": {
    "test": "test",
    "start" : "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### Semantic Versioning
Semantic versioning is a guideline for how you should set the version numbers of your application. This is especially important if you're going to share it with others.

- If a project is going to be shared with others, it should start at 1.0.0
- Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.1
- New features which don't break existing features: Minor release, increment the middle number, e.g. 1.1.0
- Changes which break backwards compatibility: Major release, increment the first number, e.g. 2.0.0

#### Scripts section
Defines how to compile, test, and run your application. Let's focus on `start` for now.

1. Create a simple index.js file

	```javascript
	console.log('my application just ran');
	```
2. Tell npm to run the index.js file with the start command.

	```javascript
	"scripts": {
	  "test": "test",
	  "start" : "node index.js"
	 }
	```
3. Run your app by typing **npm start** in the command-line

## Exercise:
Let's make sure your environment works. On your own computer:

1. Make sure Node is installed
2. Create an app with NPM install
3. Add an 'npm start' script
4. Run your app and check the output

## Dependency Management
Developers create NPM packages, just like the one you just created and publish them to the NPM registry for others to use.  


These packages solve many common problems for you. Think of them as scripts you'd include on a webpage (like jQuery).

You can browse a listing of those packages here:
[https://www.npmjs.com/](https://www.npmjs.com/)

Keep in mind, not all open source packages are created equal. When selecting a package to include in your project, look at the github repo for:

- Recent commits to prove it is being maintained.
- High number of stars as social proof that others like this package.

### Install a Dependency
From the commandline, use the `npm install some-cool-package` command to download and save a package. This will download the some-cool-package package and save it in the **node_modules** directory.

Most of the time, you want to use `npm install --save some-cool-package`. This adds the package name to package.json. for example:

```shell
npm install moment --save
```

Adds a section called "dependencies" to you package.json

```javascript
"dependencies": {
	"moment": "^2.10.6"
}
```

**Rubyists**: This is analagous to Ruby 'gems'. Think of the package.json file is your gemfile.

### Using your Dependencies

You can now get access to the installed dependency by using a `require` statement.

```javascript
const Moment = require('moment');

const a = new Moment();
console.log(a.format('h:mm:ss a')); //logs the current time
```

### Dependency Versions
Notice that your dependencies specify a version number. Using compatible versions of dependencies is important. There are a number of ways to specify dependency versions:

- You can specify a specific version e.g. `2.10.6`
- Minimum version number `>=2.10.6`
- Tilde version `~2.10.6` includes this version and future patches. (up to but not including 2.11.0)
- Caret version `^2.10.6`includes all updates in the major version (up to but not including 3.0.0)

### node_modules directory
Contains all the modules you've downloaded from open source repositories.

- Is not checked in to source control
- Should be delete-able

When someone (or something) downloads your package, they will need to run `npm install`. This will create a `node_modules` directory and download all the packages you've specified into it.

**Rubyists**: This is analagous to 'bundle install'.

In this way, the Package.json file has the following benefits:

- It serves as documentation for what packages your project depends on
- It allows you to specify the versions of a package that your project can use using semantic versioning rules
- Makes your build reproducable which means that its way easier to share with other developers.

### Dependencies vs devDependencies
Some packages, like a web server are required for your app to run. Other packages, like linting or test tools are only required for developers. To save a package that doesn't need to be installed on the server, run `--save-dev`


```javascript
npm install lodash --save
```

Adds a section called "devDependencies" to you package.json

```javascript
"devDependencies": {
	"lodash": "^3.10.1"
}
```

### Uninstalling
You can always manually edit your package.json and delete folders from node modules, but npm uninstall is more convenient:

```javascript
npm uninstall moment --save
```

## Exercise 2: using Packages
1. Install the 'request-promise' package
2. Install the 'moment' package
4. Examine the directory structures and effects on package.json
5. Delete node_modules folder and run npm install again
6. Create an index.js file and update package.json so that `npm start` will run it
7. Require the 'request' and 'moment' modules in your application.
8. Use 'request-promise' to get data from http://jsonplaceholder.typicode.com/posts/1. Log the response
9. Use 'moment' to output a timestamp for when response arrives using the format `h:mm:ss a`.
10. Have your application fetch data every 3 seconds.

### Exercise 2 Answer:

```javascript
console.log("tough luck kiddo");
```


## Creating Your Own Modules
When writing an application, you'll want to keep your code organized in modules.

- Modules allow for encapsulation (privacy)
- Makes your code easier to maintain
- Makes your code re-usable and composable.
- Modules should do one thing (single responsibility)

To define a module, create a file and assign a value to the keyword module.exports. e.g.

```javascript
const myModule = {
	sayHi: function(){
		console.log('hi');
	}
}

module.exports = myModule;
```

### Requiring your own modules
Import your module in much the same way you do your node_modules

```javascript
const myMod = require('./myModule');

myMod.sayHi();
```

### Encapsulation
For a module, being able to hide const variables and state and only exposing a deliberate API to its consumers is important. Modules let you achieve this.

```javascript
const myGreeting = "hi"; //Private!

const myModule = {
	sayHi: function(name){
		console.log(myGreeting + ' ' + name);
	}
}

module.exports = myModule;
```

## Exercise 3: Modular code
Take the previous exercise and factor out some reusable functionality.

1. Create a `DataAccess` module
	- Export an object with a function `getPost(postId)`
2. Create a `TimeStamp` module
	- Export an object with a function `getTime()` that returns a timestamp string in the format `h:mm:ss a`
3. Update your index.js file to use `DataAccess` and `TimeStamp`.

## Exercise 3: Answers
#### index.js
```JavaScript
const DataAccess = require('./module').DataAccess;
const TimeStamp = require('./module').TimeStamp;

const timeStamp = new TimeStamp();
const dataAccess = new DataAccess();

setInterval(function() {
  dataAccess.getPost(1);
  timeStamp.getTime();
}, 300);

```
#### module.js
```JavaScript
const Moment = require("moment");
const Request = require("request-promise");

class DataAccess {
  getPost(postId) {
    return Request("http://jsonplaceholder.typicode.com/posts/" + postId).then(
      response => console.log(response)
    );
  }
}
class TimeStamp {
  getTime() {
    console.log(new Moment().format("h:mm:ss a"));
  }
}

module.exports = {
  DataAccess,
  TimeStamp
};

```


## Testing

Real applications need automated tests, and JS apps are no different. There are many open source assertion frameworks and test runners that let you test your code.

### Assertion Framework
An assertion framework simply lets you test if something is true, false, equal, etc and throw an error if its not. Let's use the 'assert' package.

```bash
npm install assert --save-dev
```

Create a directory called 'test' with a `test.js` file. In that file create a test suite

```javascript
const assert = require('assert');

assert(true);
assert(false);
});
```

### npm test
Remember the scripts section of on package.json file? It specifies how to run your tests.

```javascript
"scripts": {
    "test": "node test/test.js",
    "start": "node index.js"
  },
```

Run `npm test` and your script runs


### Test Runner
A test runner manages all the work around running your tests like defining your test suites, and performing setup tasks. Let's use 'Mocha' for now.

Install Mocha

```bash
npm install mocha --save-dev
```

Update test.js to use a Mocha test suite

```javascript
const assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(2));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
```

Update the `npm test` script to run mocha. (Note, mocha knows to look for your tests in /test/test.js by default, but you can configure it otherwise).

```javascript
"scripts": {
    "test": "mocha",
    "start": "node index.js"
  },
```

Run the test

```bash
npm test
```

Ka-ching!

### Testing Async code
A lot of our code in JS is going to be asynchronous. Luckily, promises make testing async code easy. Simply return the promise.

```javascript
const dataModule = require('../dataModule.js');

const assert = require('assert');
describe('DataModule', function() {
    it('should return the right data', function () {
      return dataModule.getTodos().then(function(todo){
        assert(post);
      })
    });
});
```


## Homework

- Complete the [how-to-npm](https://github.com/npm/how-to-npm) module and post a screenshot to slack
    - Some notes about this particular module
    - On Challenge 03:<br> make sure to follow the steps exactly <br> run: `npm init --scope=<username>` entering the username created from the previous step<br>*note: if this is not done correctly, later challenges will NOT pass*
    - For Challenge 11:<br> make sure you are using the a version number that has been published<br> the answer should look something like this `npm dist-tag add @yourusername/how-to-npm@1.1.6 ['stuff']`<br> *note: replace `@yourusername` with the Username supplied in Challenge 02, replace the version number with a version number previously published*
- Watch [Importing and exporting modules with Node.js](https://youtu.be/P51O_PT7NUg)
- Complete [Exercise 3](#exercise-3-modular-code) on Modular code
    - Push the completed code to GitHub using the naming convention: `module_exercise_YOUR_INTIALS_HERE`
- Read (and follow along with) the [Learn TDD](https://github.com/dwyl/learn-tdd) tutorial
    - Do not clone the repo (feel free to fork it though!)
    - complete each step
    - complete the bonus steps *skipping Bonus Step 3 on Continuous Integration*.<br> *note: feel free to read the section, continuous integration is awesome!*
    - push the completed code to our class GitHub using the naming convetion: `always_write_tests_YOUR_INITIALS_HERE`


## Reading:

- [https://docs.npmjs.com/getting-started/what-is-npm](https://docs.npmjs.com/getting-started/what-is-npm)

- [https://nodesource.com/blog/semver-tilde-and-caret/](https://nodesource.com/blog/semver-tilde-and-caret/)

- [http://www.sitepoint.com/beginners-guide-node-package-manager/](http://www.sitepoint.com/beginners-guide-node-package-manager/)

Read about popular packages on [https://www.npmjs.com/](https://www.npmjs.com/)
