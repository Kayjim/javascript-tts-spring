# Lesson 12 - Compilation with Webpack

## Recap & Intro
- Last time we talked about
	- Defining application
	- Managing dependencies
	- Running an app

## Agenda:
- Today we're going to talk about compiling an application
- Discuss JS Build Tools (specifically WebPack)
	- What is a build tool?
	- How to use build tools effectively
- Configure our local environments for rapid application development

## Src vs Build
Even though JS is interpreted, there is still a distinction between source code and compiled code.

- **src**
	- Code developer writes and edits
	- What you'll check into source control
	- The raw code before minification (or concatenation)

- **build**
	- Final code that gets executed
	- minified/concatented for speed
	- The actual code used on production applications
	- In a web app, this code is all the server needs.

You can name the directories whatever you want, so long as you make the distinction. (app vs dist is common)

## Compilation
In Java or C#, a compiler processes human readable code and outputs machine code files.
In JS, the idea is similar, but more subtle.

- Less/Sass -> css
- Haml/Jade -> html
- Big JS files -> Minified JS files
- Multiple JS files -> single JS file
- ES6 -> ES5
- ANYTHING ELSE!!!

There is a large ecosystem of modules that transform (compile) html, css and js files in different ways.<br>*It's up to the developer to decide what kind of compilation steps the application needs.*

## Webpack
So how does compilation happen?

- Gulp/grunt - task runners
- Webpack - bundler/compiler

So what is a task runner?<br> Well, according to [Grunt's](http://www.gruntjs.com) website:
> In one word: **automation**. <br>The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes... **a task runner can do most of that mundane work for you**.

While this is great, [RisingStack](https://blog.risingstack.com/using-react-with-webpack-tutorial/) presents a very good point:
> The input to a Grunt task or a Gulp pipeline is filepaths (globs). The matching files can be run through different processes. Typically transpile, concat, minify, etc. This is a really great concept, but neither Grunt or Gulp understands the structure of your project.

_This is where webpack comes in_

*...(continued from [RisingStack](https://blog.risingstack.com/using-react-with-webpack-tutorial/)):*
> If we compare this to Webpack, you could say that Gulp and Grunt handle files, **while Webpack handles projects**.

> With Webpack, you give a single path. The path to your entry point. This is typically index.js or main.js. Webpack will now investigate your application. It will figure out how everything is connected through require, import, etc. statements, url values in your CSS, href values in image tags, etc. It creates a complete dependency graph of all the assets your application needs to run. All of this just pointing to one single file.

In summary:<br>
**webpack is a module bundler.**

webpack takes modules with dependencies, and generates static assets representing those modules.<br>**webpack's job is to create the _'/dist'_ directory from scratch.**<br>
![](images/what-is-webpack.png)

Additionally, you can [split](https://webpack.github.io/docs/code-splitting.html) bundles in various ways and load them dynamically as your application is executed. <br> *(this is great for larger applications, as you can load dependencies only when needed)*<br>

So, in terms of code, what does this mean?

Take the following example:

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>webpack</title>
  </head>
  <body>
    <div id="greeting"></div>

    <script type="text/javascript" src="uno.js" charset="utf-8"></script>
    <script type="text/javascript" src="dos.js" charset="utf-8"></script>
    <script type="text/javascript" src="tres.js" charset="utf-8"></script>
    <script type="text/javascript" src="quatro.js" charset="utf-8"></script>

  </body>
</html>
```

In a larger application, you could end up needing to load several different JS files. Webpack compiles all of your JS files into one file.

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>webpack</title>
  </head>
  <body>
    <div id="greeting"></div>

    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

Doesn't that just feel better?

## Getting Started

### Installing

So, now that you've been convinced of the benefits of webpack, let's install it!

First, you'll want to initialize the your `package.json` file.

`npm init`

next, save webpack as a dev dependency.

`npm install webpack --save-dev`

Go check your `package.json` file and you should see something like this has been added:

```json
"devDependencies": {
    "webpack": "^1.12.13"
  }
```

### Create your structure

`mkdir src`
`mkdir src/javascript`
`touch src/javascript/index.js`

`mkdir dist`
`touch dist/index.html`

`open dist/index.html`


### Render Something

In your html:

```html
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="greeting"></div>

    <script src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

in your index.js

```javascript
function sayHello(){
  var header = document.querySelector("#greeting");
  var hello = ("<h1> hello world </h1>");
    header.innerHTML = hello;
}

sayHello();
```
looking at our `<script>` tag, you're probably thinking "this won't work", and you're right.

Let's go ahead and start utilizing webpack <br> *note: Webpack offers the abilility to compile your app from the command-line, you can run it by typing `webpack` at the root of your app.*

`webpack`

Now, refresh your page and you should see that it actually worked!<br>
If you're thinking this is some sort of black magic, we're going to work to demistify that.

Looking back at your file structure in atom, you'll find that a `main.js` file has been created at the root of your project. In this file you'll see some boiler-plate code. However, if you scroll to the bottom, you'll see our function has been loaded into the file! <br>
pretty nifty, right?

### Another JS file

As we continue to move into React (which is component based) you're going to start splitting your code into separate files. Let's go ahead and do that

`touch src/javascript/another.js`

Now, move your code from `index.js` to `another.js` with the following modification:

```javascript
// /app/javascript/another.js

function sayHello(){
  var header = document.querySelector("#greeting");
  var hello = ("<h1> hello world </h1>");
    header.innerHTML = hello;
}

module.exports = sayHello();
```

We are now going to export `sayHello` function as a module.

in your `index.js` file, write the following require statement

```javascript
// app/javascript/index.js

require('./another.js');
```
Finally, re-compile your application using the `webpack app/javascript/index.js dist/bundle.js` command.

Refresh your page, and you'll see that our function still works!

### Loaders (add some style)

Let's add a little bit of style *the webpack way* by using css and style loaders.

Run `npm install css-loader style-loader --save-dev` to add css-loader and style-loader as dev dependencies.

Next, create an app.css file: `mkdir app/css && touch app/css/app.css`

In your app.css, make a couple of changes.

```css
body {
  background-color: aqua;
  font-family: sans-serif;
}

#greeting {
  color: #9a9a9a;
}
```
Now, in your `index.js` file, load your css file:

```javascript
// app/javascript/index.js

require("style!css!../css/app.css");
require('./another.js');
```

Re-compile the application `webpack .app/javascript/index.js dist/bundle.js` and refresh your page.


We'll discuss loaders in depth a little later.



# Exercise 1 - Install and Configure webpack

- Take the existing code (found below) and add a button to your `index.html`
- add [jQuery](https://www.npmjs.com/package/jquery/tutorial) to your project as a dev dependency
	- add a click handler to the button that:
	- reveals the greeting `<div>`
	- hides the button
- hints:
	- *don't forget to compile webpack*
	- *make sure to require jQuery in the appropriate file*
	- *pay attention to the console messages*

*index.html*

```html
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="greeting"></div>

    <script src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

*css/app.css*

```
body {
  background-color: aqua;
  font-family: sans-serif;
}

#greeting {
  color: #9a9a9a;
}
```

*javascript*

```javascript
// do you think we'd actually give you the JS???
```


# Exericse 1 Answer:

- Install jQuery: `npm install jquery --save-dev`

- In your `javascript/another.js` file:

	```javascript
	var $ = require('jquery');

	module.exports = $("#reveal").on('click', function(){
	  $("#greeting").html("<h1> hello world!</h1>");
	  $(this).hide();
	});
	```

- recompile webpack: `webpack ./javascript/index.js bundle.js`



## webpack.config.js

Okay, so this is pretty cool so far, but if you're like me, you're probably thinking "Do I really have to compile webpack everytime I make a change?". And you're absolutely right to ask that question.

The good news is that webpack offers a cofiguration file, one of the benefits is you can design specific configuration instructions.


By default, webpack looks for a file named `webpack.config.js` in the root directory

Lets look at the simplest webpack config:

```javascript
module.exports = {
	entry: {
		myApp: "./src/index",
	},
	output: {
		filename: 'bundle.js',
		path: 'dist/'
	}
}
```


**entry**

- The name of the file (or set of files) that we want to include in our build
- This can be a single file or an array of files.

**output**

- contains your output config.
- we provide *filename* as the **key**
- while the **value** is *bundle.js*
- this creates the name of the file that webpack will build for us


Now that you've got an idea of what the config file looks like, let's build our own.

### start

To create the file simply run `$ touch webpack.config.js`

Let's go ahead and restructure our application to have `app` and `dist` directories

Open your webpack config and add the following code:

```javascript
module.exports = {
  entry: {
    app: "./app/javascript/"
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  }
};
```

Now you can simply run the command `$ webpack` to compile. Go ahead and give it a try to insure that everything is working properly

***note: `__dirname` is a node.js global variable containing the name of the directory that the currently executing script resides in.***

## Transformations with Loaders
Now that we have an application being built, let's look at some transformations we can apply during the build step.

- Transformations are done with loaders, which process the files you 'import' in your app
- Different loaders are applied to different files based on file type
- Loaders are their own NPM packages that need to be installed and configured

You'll remember that in our index.js file, we have the following require statement: `require("style!css!../css/app.css");`

We can shorten the require statement and move the loader into our webpack.config.js

First, modify the existing require statement in your index.js:

```javascript
// remove
require("style!css!../css/app.css");

//add
require("../css/app.css");
```

Now, in your webpack config, add the following code after your `output` statement:

```javascript
module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"}
    ]
  }
```

Now our style loader can be located in the webpack config. Which is much better.
<center>![](images/high_five.gif)</center>

Here's an example of a more complete webpack config with a couple of loaders:


```javascript
 module.exports = {
  entry: "./app/javascript",
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jade$/, loader: "jade"},
      {test: /\.css$/, loader: "style!css"}
    ]
  }
};
```


## Webpack --watch

Its pretty annoying to run webpack every time you change a file to build your app. <br> Thankfully webpack offers a `--watch` option, that monitors your module files and automatically runs every time a file changes.

Alternatively, you can add `watch: true` to your webpack config.

```javascript
module.exports = {
  entry: "./app/javascript",
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
   watch: true,
```



## ES6 Modules
So far, webpack has been a glorified file copier, how can it help us?

Webpack implements ES6 modules, which let you structure your application modularly by defining what each file exposes or requires. For example:

##### File: students.js
```javascript
var students = ['Jim', 'Rebecca', 'Corey' ];

export default students;
```

##### File: class.js
```javascript
import students from './students';

var class = {
	name: "JavaScript Application Development",
	students: students
};

export default class;
```

**The format is `import [variable name] from [file path]`**

Webpack starts with the **entry** file, and pulls in all the imports (*and their imports*). This is called the **Dependency Tree**. <br>
Webpack then outputs the build file

That's all the ES6 you get until next week.


## NPM Modules

If you take a look at the Node Modules directory, you'll see all the modules installed on the project.

With ES6 importing/exporting, we can import those now as well.

```javascript
// app/javascript/index.js

import $ from 'jquery'
```

```javascript
import moment from 'moment';

console.log(moment().add(7, 'days').format());
```

Note: You don't need to specify paths for node_modules, because webpack is smart enough to look there by default.  You can also specify how to find modules in the webpack.config.js.

```javascript
resolve: {
		extensions: ['', '.js', '.json', '.jsx', '.css'],
		modulesDirectories: [
			'./node_modules',
			'./app'
		]
	},
```


## Exercise #2

- Create a new app using 'npm init'
- Install webpack
- Create **app** and **dist** directories
- Build your webpack.config.js file
- Create a simple index.js dice rolling application
- Install jQuery and lodash
- Within the application
	- Create a button for rolling the die
	- create an array for the die with the numbers 1 - 6
	- When the button is clicked
		- use lodash to shuffle throught the die array and select a random number
		- print that number to the screen
		- ask the user if they'd like to play again


<!--
## Exercise Answer


```javascript
var $ = require('jquery');
var _ = require('lodash');

var dice = [1,2,3,4,5,6];

module.exports = $("#roll").on('click', function(){

  var outcome = _.shuffle(dice).pop();
  $("#score").html("<h1> "+ outcome +"</h1>");
  $(this).text('Roll Again?');

});
```
-->
## Webpack Dev Server

Webpack also offers the ability for us to create a server on our local machine

First, install webpack-dev-server by running `npm install webpack-dev-server -g` <br>
Then, run `webpack-dev-server` and navigate to [http://localhost:8080](http://localhost:8080)

webpack-dev-server can be configured in webpack like so:

```javascript
  devServer: {
    contentBase: './dist',
    port: '3000',
    colors: true,
    inline: true,
  }
```

`contentBase` defaults to serving files from our root directory. In our case, we want to serve files from our `./dist` directory
`port` specifies the port being used for development (defaults to 8080)
`colors` adds additional color to our terminal output
`inline` replaces `watch: true`, allowing webpack-dev-server to swap out modules on the fly (great for rapid development)

## ES Lint

Linting is a huge time and life saver. In essence, a linter will run through your code and check for syntax errors.<br>
Think of it as spell-check for your code

With webpack, we can configure a number of ES Linters to watch our code and warn us of potential issues.

For now, we'll be using [eslint-loader](https://github.com/MoOx/eslint-loader).

To install, simply run `npm install eslint-loader --save-dev`<br>
Then add ` {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}` to the loaders section of your webpack config.
You'll also want to install eslint globally by running `npm install -g eslint`
Finally, use the command `eslint --init` to create a `.eslintrc` file.

Start your webserver up and you'll see that now you have linting with webpack!

*to learn more about ESLint, head over to the [eslint.org](http://eslint.org/)*

### Exercise


- Install webpack-dev-server and eslint-loader
- Run webpack-dev-server server
- Make a few syntax errors and save to insure that your linter is functioning properly




## Babel Loader
ES6 vs ES5

- ES6 is the latest version of JS (TC39)
- Most browsers don't support it yet, so we must use transpilation
- Every year a new version will come out. Browsers will never keep up. Transpilation is a must.
- Specifics of ES6 are in the homework.

To use babel, run `npm install babel-core babel-loader --save-dev` and specify it like so:

```javascript
{ test: /\.js$/, loader: 'babel-loader', exclude: ['./node_modules/'] },
```

## JSX
React, which we haven't gotten to yet is written in JSX syntax, which isn't technically valid JavaScript. We use a JSX loader to transform it to browser readable JS. Babel loader handles this too

```javascript
{ test: /\.jsx$/, loader: 'babel-loader', exclude: ['./node_modules/'] },
```

## Full Config

Let's take a look at our finished `webpack.config.js` file

```javascript
module.exports = {
  entry: __dirname + '/app/javascript/index.js',

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css'],
    modulesDirectories: [
           './node_modules',
           './app'
       ]
  },
  devServer: {
    contentBase: './dist',
    port: '3000',
    colors: true,
    inline: true,
  }
}
```

You can see that this is simply a JavaScript configuration object.

Congrats! You've just learned the basics of webpack!

## Homework



- Complete [Exercise #2](#exercise-#2)
    - push completed code to GitHub using naming convention: `webpack_dice_YOUR_TEAM_INITIALS_HERE`
- Find a blog on webpack and post it to the main slack channel
    - Your blog post has to be unique
    - All posts will be added to this lesson's footnotes
- Complete the Pro React [Webpack](http://www.pro-react.com/materials/appendixA/) tutorial
    - Follow along, writing all the code in the examples
    - push to GitHub using the naming convention: `rp_webpack_YOUR_INITIALS_HERE`

## Reading
- [Webpack Documentation](https://webpack.github.io/docs/)
