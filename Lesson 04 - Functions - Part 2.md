##Lesson 4 - Functions - Part 2 - Scopes, Closures, & this

## Recap & Agenda

- Over the past 3 lessons, we've seen all the major building blocks of JS
	- variables 
	- arrays 
	- objects
	- the basics of functions
- Tonight we'll be covering the more advanced parts of functions
	- Scope
	- Closures
	- this



### Functions (a slight review)

What are functions? 

- A function is a reusable piece of code that performs a task
- A function is an object, just like objects and arrays
- A function and its return value are not the same thing.
- Defining a function requires PBR (Parameters, body, return value)
![PBR](http://i.huffpost.com/gen/2079828/images/n-PABST-BLUE-RIBBON-628x314.jpg)
	- **Parameters** - What input does the function need in order to run?
	- **Body** - What will the function do with that information?
	- **Return** - What output will executing the function give back?

```javascript
function nameOfMyFunction(list, of, parameters) {

	//BODY: Logic and operations based on parameters e.g.

	//RETURN: Value returned to the caller of the function;
	return list;
}

nameOfMyFunction(1,2,3); // 1
```

## Scope
- Scope is the set of variables a piece of code has access to. 
- Only functions create scope
- Parameters and variables declared inside a function are LOCAL to that function's scope
  - Variables are only visible inside that scope they are defined in and in its child scopes


So, what is a lexical scope? Lexical scoping simply means that variables refer to their local environment.

```javascript
function add() {
	const a = "This variable is only visible inside the add function";
}

console.log(a) // Undefined
```

```javascript
function getGreeting(name) {
	const greeting = "hello ";
	return greeting + name;
}
getGreeting('Shane'); // 'Hello Shane'
console.log(greeting) //undefined
```

Blocks do have their own scope when let and const are used.

```javascript
for(let i = 0; i < 10; i++) {
	let x = i;
}

console.log(i,x); //9,9
```

Scope lets you create private variables in a JS program, but be careful, variables defined without the 'var' keyword are global.

```javascript
function greet(name) {
	greeting = "hello ";
	return greeting + name
}
greet('Shane');
greeting //'hello'!
```

## Scope Chain and Closures
- When a scope is created, it is nested inside another scope. 
- To resolve a variable, JS looks at the immediate scope, then parent scopes in order. 
- A **closure** is an inner function that has access to the outer function’s variables. Both scopes together are the **scope chain**.

![](images/Inception-Turning-the-City-2.gif)

For example, the `city` variable is visible inside the `greet` function because the greet function creates a closure.

```javascript
var city = 'Charlotte';
var greet = function() {
	console.log('Hello ' + city);
}

greet(); // Hello Charlotte
```
Accessing `city` inside the greet function will first look for a variable named `city` in the greet function, then to the parent scope, and so on up the scope chain. 

##### Nested scope Example 1

```javascript
function outer() {
	var x = 'x';
	function inner() {
		var y = 'y';
		console.log(x); //'x'
	}
	console.log(x); // 'x'
	console.log(y); // ReferenceError: y is not defined
}
```

##### Nested scope Example 2
```javascript
var landscape = function() {
    var result = "";
    
    var flat = function(size) {
        for (var count = 0; count < size; count++)
            result += " _ ";
    };
    
    var mountain = function(size) {
        result += "/";
        for (var count = 0; count < size; count++)
            result += " '";
        result += "\\";
    };
    
    flat(3);
    mountain(4);
    flat(6);
    mountain(1);
    flat(1);
    return result;
};

console.log(landscape());
```

- `flat` and `mountain` are functions only available within `landscape`
- The `result` variable is available inside `flat` and `mountain` because

### Variable name conflicts
Sometimes parent scopes have variables with the same name.

```javascript
var name = 'Shane';
var greet = function() {
	var name = 'Matt'
	console.log(name);
}
console.log(name); // Shane
console.log(greet(name)); // Matt
```

Declaring the variable `name` in the inner scope hides the variable with the same name in the outer scope. This is a new variable, so assigning to the inner variable won't affect the outer. 

Sometimes a function defines argument names with the same name as variables in the parent scope. This works the same way as the example above.

```javascript
var name = 'Shane';
var greet = function(name) {
	console.log(name);
}
greet('joe'); // 'joe'

//equivalant to 

var name = 'Shane';
var greet = function(mySuperUniqueVariableName) {
	var name = mySuperUniqueVariableName;
	console.log(name);
}
greet('joe'); // 'joe'


```

## Exercise 1 (Scope & Closures)

Start with the following code template. After each step, run the program and see how the output changes.

```javascript
function outer(){
  
  function inner() {
   
  }

  inner();
}

outer();
```

1. Declare two variables, `a` and `b` in the outer function's scope and set them to a string and an object respectively. Log their values immediately.
2. Log the values of `a` and `b` in the inner function.
3. Update the inner function to take two parameters named `a` and `b`.
4. Pass `a` and `b` in as arguments when you execute inner().
5. Inside the inner function, assign new values to `a` and `b` and log them at the end of the function AND after the execution of `inner(a,b)`.
6. Inside the inner function, update a property of the `b` object.

- - - - 

### One more thing on Scope and Closures...

- A Function has access to the variables that were in scope when it was defined, *not executed*.
- Sorry, this next example is just evil...

```javascript
//Scope, closure, and hoisting, oh my!

function createFunction() {
	var a = "Hans Zimmer Rules!";
	inception = function() {
		console.log(a);
	}
}

var inception;
createFunction();
inception(); // "Hans Zimmer Rules!"
```

## This Keyword
Inside a function, the keyword `this` refers to the executor of the function.

- PAPER EXERCISE

Again, think of a function as a piece of paper with instructions, a procedure of sorts. One of those instructions might say "touch your nose". But who is this "you" it speaks of? Obviously, the person executing the instructions. Similarly, the keyword 'this' refers to the object that's executing the function.

```javascript
const teacher = {
	name: 'Assaf',
	sayName: function() {
		console.log(this.name);
	}
}
teacher.sayName(); //'Assaf'
```

Different objects can execute the same function, can produce different results because `this` is different.

```javascript
function sayName() {
	console.log(this.name);
}

const teacher1 = {
	name: 'Assaf',
	speak: sayName
}

const teacher2 = {
	name: 'Shane',
	speak: sayName
}

teacher1.speak(); // 'Assaf'
teacher2.speak(); // 'Shane'
```

## Exercise: This

Create a single object named `slideshow` that represents the data and functionality of a picture slideshow. There should be NO VARIABLES OUTSIDE THE OBJECT. The object should have properties for:

1. An array called `photoList` that contains the names of the photos as strings
2. An integer `currentPhotoIndex` that represents which photo in the `photoList` is currently displayed
3. A `nextPhoto()` function that moves `currentPhotoIndex` to the next index `if `there is one, and:
	4. logs the current photo name.
	4. Otherwise, log "End of slideshow";
4. A `prevPhoto()` function that does the same thing, but backwards.
5. A function `getCurrentPhoto()` that returns the current photo from the list.

### Exercise Answer

```javascript
// Have fun :)
```

## Homework

###**Due 4/08/2019**:

 - Complete the [Scope Chain & Closures](https://www.github.com/jesstelford/scope-chains-closures) Module at [NodeSchool](http://nodeschool.io/)
 	- Upload a completed screenshot to slack 
 - Complete the [Slideshow](https://github.com/Kayjim/javascript-tts-spring/blob/master/Lesson%2004%20-%20Functions%20-%20Part%202.md#exercise-this) challenge
 	- Push the finished code to GitHub using the naming convetion: `slideshow_YOUR_TEAM_INTIALS_HERE`
 	- Paste a link to the finished code in Slack
 - Read [this](http://javascriptissexy.com/understand-javascript-closures-with-ease/) article on Scope and Closure
 
 - Read the [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures) book on closures. (chapters 1 - 5)
	- Complete the code examples
	- push to github with the name: YDKJS_closures_YOUR_INITIALS_HERE
- Watch [this](https://teamtreehouse.com/library/understanding-this-in-javascript-2) TeamTreehouse video on scope
