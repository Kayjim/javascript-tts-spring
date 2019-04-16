# Lesson 5 - Functions - Part 3 - Asynchronous Patterns & Callbacks


## Recap
- Yesterday we talked about functions
	- function
	- scope
	- closures
- Today, we'll cover  
	- Passing functions as arguments
	- Higher Order Functions
	- working with Array data
		- This is important when working with API data
	- Asynchronous programming patterns
		- These are super common in UI development like React, jQuery, or even vanilla JS.

## One more thing on scope...
### Immediately Invoked Function Expressions (IIFE)

Sometimes you want to create a scope so that you can have private variables. One way to do that is to create an anonymous function and immediately execute it.

```javascript
(function(){
	const myVar = "look mom, private variables!";

	//Do some stuff with myVar...
})();

console.log(myVar); //undefined;

```

Another note about IIFE's is that the code is executed immediately, which can serve particular benefits when used at the appropriate time.


## Functions as Function Arguments
Because functions are objects, they can be passed in to other functions as arguments.

### Higher Order Functions

##### A contrived example

```javascript==
==//Declare an add function
function add(number1, number2) {
	return number1 + number2;
}

//Declare a function that takes a function as an argument
function doMath(operation, number1, number2) {
	return operation(number1,number2);
}

//Pass a function into another.
var sum = doMath(add, 1, 2);
```

In the above example, `doMath` is a higher order function<br>
*Higher Order Functions:*<br>
	*- Take another function as an argument<br>or<br>*
	*- Return a function*

Additionally, `add` is considered a *callback function* (more on that later), because it has been passed as an argument to `doMath`


More than likely, in your own development, you've already been using Higher Order Functions. Now you have a name for it!

### Filter
Sometimes you want to filter a data set based on some criteria. The Array object supports a .filter function. It takes a filter function that returns a pass value of true or false.

```javascript
const students = [
	{name: 'Cam Newton', average: 90},
	{name: 'Ted Ginn', average: 58},
	{name: 'Greg Olsen', average: 82}
];

const passingStudents = students.filter(function(student){
	return student.average > 60;
});

passingStudents === [
	{name: 'Cam Newton', average: 90},
	{name: 'Greg Olsen', average: 82}
];

```

### Find
Sometimes you want to find the first item in the array that meets a certain criteria. Its the single version of filter.

```javascript
const students = [
	{name: 'Cam Newton', average: 90},
	{name: 'Ted Ginn', average: 58},
	{name: 'Greg Olsen', average: 82}
];

const passingStudents = students.find(function(student){
	return student.average > 50;
});

passingStudents === [
	{name: 'Cam Newton', average: 90}
];

```

### Map
Sometimes you want to transform data.
The Array's Map function lets you iterate over an array and produce another array with a new value for each item.

```javascript
const students = [
	{firstName: 'Cam', lastName: 'Newton'},
	{firstName: 'Ted', lastName: 'Ginn'},
	{firstName: 'Greg', lastName: 'Olsen'}
]

const fullNames = students.map(function(student){
	return student.firstName + ' ' + student.lastName;
})

fullNames === ["Cam Newton", "Ted Ginn", "Greg Olsen"]

```


### Reduce
Sometimes you want to calculate a single value based on all the items in an array
The Array's Reduce function let's you iterate over an array and calculate a value.

```javascript
const students = [
	{name: 'Cam Newton', assignmentsCompleted: 6},
	{name: 'Ted Ginn', assignmentsCompleted: 10},
	{name: 'Greg Olsen', assignmentsCompleted: 8}
]

const totalAssignments = students.reduce(function(sum,current){
	return sum + current.assignmentsCompleted;
}, 0);

totalAssignments === 24;

```

### Immediately Invoked Function Expressions (IIFE)

Sometimes you want to create a scope so that you can have private variables. One way to do that is to create an anonymous function and immediately execute it.

```javascript

(function(){
	const myConst = "look mom, private variables!";

	//Do some stuff with myVar...
})();

console.log(myVar); //undefined;

```

## Exercise 1 (Using Array Functions)

1. Create an Array named `superHeroes`
	- Inside the superHeroes array create the following arrays: <br>

	```javascript
	["Batman", "Bruce Wayne"],
   ["Spiderman", "Peter Parker"],
   ["The Flash", "Barry Allen"]
   ```
2. Create a `secretIdentity` variable
3. Assign `superHeroes.map()` to the `secretIdentity` variable
4. Assign and anonymous function to `superheroes.map()` as an argument
5. Your anonymous function should have one parameter named `revealArray`
6. Inside the block of your anonymous function:
	- You'll be working with revealArray as an argument
	- Using `revealArray` `return` a string that will `join` the two array items.
	- `join` them together with the string `"is"` <br> *ie: "Batman is Bruce Wayne"*
7. Log the results to the screen and `join` them with a line break.


Exercise Answer:

```javascript
console.log("that's rough")
```
- - - -

## Exercise 2: (Using Array Functions)


Using the following data:

```javascript
const players = [
	{firstName: 'Cam', lastName: 'Newton', position: 'QB', touchdowns: 32},
	{firstName: 'Derek', lastName: 'Anderson', position: 'QB', touchdowns: 0},
	{firstName: 'Jonathan', lastName: 'Stewart', position: 'RB', touchdowns: 12},
	{firstName: 'Mike', lastName: 'Tolbert', position: 'RB', touchdowns: 8},
	{firstName: 'Fozzy', lastName: 'Whittaker', position: 'RB', touchdowns: 3},
	{firstName: 'Ted', lastName: 'Ginn', position: 'WR', touchdowns: 9},
	{firstName: 'Devin', lastName: 'Funchess', position: 'WR', touchdowns: 2}
];
```

- Find a player with the name 'Mike'
- Get an array of all players with position 'RB'
- Get an array of all the players lastNames
- Get an array of the full names of all the runningbacks with more than 5 touchdowns
- Get the number of touchdowns scored by Runningbacks

## Exercise 2: Array Functions Answer

```javascript

console.log("undefined")

```

## Asynchronous Programming

In computer programs, asynchronous operation means that a process operates independently of other processes, whereas synchronous operation means that the process runs only as a result of some other process being completed or handing off operation.

#### _Why_ is this important?
Asynchronus programming:<br>

- Allows for the user to continue interacting with the application while request is being handled
- Improves efficiency
- Saves us from expensive full-page reloads
- Allows for multiple requests to be sent and fulfilled

### Callback pattern
The passing of a function into another function to be run at a later time is called the "callback pattern". It's prominent in event based programming, which is what UI Development is all about.

##### Do something later

```javascript
setTimeout(function(){
	console.log('later')
},2000);

console.log('now');
```

##### Do something if a button gets clicked

```javascript
button.addEventListener('click', function(){
	alert('click');
})
```

##### Do something when an API request comes back (getData is a hypothetical function)

```javascript
getData('/my-api/data', function(data) {
	console.log('got data', data)
});
```

### `this` with async functions
The above example is pretty straight forward, but can get tricky when callback functions are passed around in asynchronous functions. You will, without doubt, make a mistake like this the first time you write a JS application:

```javascript
const teacher = {
	name: 'Shane',
	speak: function() {

		//Maybe you're fetching data from an API, or getting user input
		setTimeout(function(){
			console.log('later my name is ' + this.name);
		},1000)

		//Runs immediately
		console.log('Now my name is ' + this.name);
	}
}

teacher.speak();
```

When you register a function to happen later using something like `setTimeout()`, the window object ends up running the function.



### Assigning Context
Often times, like the example above, you need access to the calling scope or want to assign a specific scope. There are a few different ways to do this.

#### Closure hack
```javascript
const teacher = {
	name: 'Shane',
	speak: function() {

		//Save this to a variable
		const self = this;

		//self is visible inside function because of closure
		setTimeout(function(){
			console.log('later my name is ' + self.name);
		},1000);
	}
}
```

#### function.bind
Explicity sets the `this` value at function defintion time.

```javascript
const teacher = {
	name: 'Shane',
	speak: function() {

		//Bind a function to a specific context
		const boundFunction = function(){
			console.log('later my name is ' + this.name);
		}.bind(this);

		//boundFunction will always run in bound context
		setTimeout(boundFunction,1000);
	}
}
```

#### .call() and .apply()
Explicitly set the `this` value at execution time.

```javascript
const teacher = {name: 'Shane'};

const speak = function(item1, item2){
	console.log(this.name, item1, item2);
}

speak.call(teacher, 'coffee', 'ramen'); //'Shane', 'coffee', 'ramen'
speak.apply(teacher, ['coffee', 'ramen']); //'Shane', 'coffee', 'ramen'
```
The only difference is that `.apply()` takes an array of arguments to pass to the function. `.call()` passes arguments one by one.

## Exercise 3: Async programming

Going back to our slideshow object, let's add some functionality.

1. create an empty property named `playInterval`
2. A `play()` function that moves to the next photo ever 2000ms until the end.<br> *Tip - use `playInterval = setInterval(fn,ms)`*.
3. A `pause()` function that stops the slideshow <br> *Tip - use `clearInterval(playInterval)`*
4. Automatically pause the slideshow if it gets to the end of the photolist while playing.


<!--## Exercise 3 Answer
```javascript

Update after submissions.

```
-->

## Homework
- Complete Exercise #3 [Async Programming](https://github.com/ttsJavaScriptAppDevelopmentSummer16/classNotes/blob/master/Lesson%2005%20-%20Functions%20-%20Part%203.md#exercise-3-async-programming)
	- Create a branch off of your existing slideshow
	- For your branch use the naming convention `async_YOUR_NAME_HERE`
- Complete the [Functional Javascript](https://github.com/timoxley/functional-javascript-workshop) module at [NodeSchool](http://nodeschool.io/)
	- Upload a screenshot to Slack


## Reading
- [http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
