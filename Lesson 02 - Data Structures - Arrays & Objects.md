# Lesson 2 - Data Structures - Objects & Arrays

## Review
- Review Homework
- Review `null` and `undefined`

## Recap
- Last class we learned about variables and flow control
- Tonight we'll be learning about Data Structures - Arrays and Objects

## Arrays
* Arrays are ordered lists with methods to traverse and edit.
* Zero based index
* Dynamic length and types

### Creating an Array
```javascript
var teachers = ['Assaf', 'Shane'];
```

### Addressing an Array

```javascript
console.log(teachers[0]) //'Assaf'
```

### Get Array Length
```javascript
var a = [1,2,3]
teachers.length == 3;
```

### Push and Pop (like a pez dispenser)

```javascript
var teachers = ['Assaf', 'Shane'];
teachers.push('Zack'); //['Assaf', 'Shane', 'Zack']
var teacher1 = teachers.pop(); //teacher1 == 'Zack', teachers == ['Assaf', 'Shane']
```

### Shift and Unshift (from the front)

```javascript
var teachers = ['Assaf', 'Shane'];
teachers.unshift('Zack'); // ['Zack', Assaf', 'Shane']
var teacher = teachers.shift(); //teacher == 'Zack', teachers = ['Assaf', Shane']
```

### Arbitrary Adding

```javascript
teachers[4] = 'Cam Newton'; // ['Assaf', 'Shane', 'Zack', undefined, 'CamNewton'];
```

### Finding an item

```javascript
var a = [10,11,20];
a.indexOf(11); //1
a.indexOf(50); //-1
```

### Slicing and Splicing

```javascript
var a = [1,2,3,4];

//Slice - doesn't mutate array, slice(start,end)
a.slice(0,2); //[1,2]

//Splice - splice(start,numToRemove,...items to add) - so dumb
a.splice(1,2,'a','b'); //a is [1,'a','b',4]
```

### Iterating Over an Array

```javascript
//Iterating over Arrays using for loop and forEach
var teachers = ['Assaf', 'Shane', 'Zack']
for(var i = 0; i < teachers.length; i++) {
	console.log(teachers[i]);
}

//Uses a function, more on that next class
teachers.forEach(function(item, index) {
	console.log(item, index);
})
```
### Converting Arrays to Strings

```javascript
//Stringifying
teachers = ['Assaf', 'Shane'];
teachers.toString(); 'Assaf,Shane';
teachers.join('&'); 'Assaf&Shane';
```

### Ordering Sorting

```javascript
//Sorting
var a = [2, 1, 3]
a.sort(); //[1,2,3]

a.reverse(); //[3,2,1]

//Alternatively a.sort(mySortFunction); 
```


## Exercise 1
* Reference [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

You're going to the grocery store and decide to use an array to keep track of your shopping list.

1. Create an array to represent your shopping list with the following items: 'pop tarts', 'ramen noodles', 'chips', 'salsa', and 'coffee'.
2. Add 'fruit loops' to the list.
3. Update 'coffee' to 'fair trade coffee'
4. Replace 'chips' and 'salsa' with 'rice' and 'beans'
5. Create an empty array to represent your shopping cart.
6. Remove the last item from your shopping list and add it to your cart
7. Remove the first item from your shopping list and add it to the cart
8. Write a 'while' loop that takes items from your shopping list and moves them to your cart until there are no items left on the list.
9. Sort the items in your cart alphabetically... backwards
10. Print the list of items in your shopping cart to the console as comma separated string.


### Exercise 1 answer

```javascript
// will be updated after all homework is submitted
```

## Objects

An object is a set of keys and values, like a dictionary. Values can be

```javascript
var course = {
	name: 'JavaScript Applications',
	awesome: true
}
```

Values can be primative objects, arrays, or other objects

```javascript
var course = {
	name: 'JavaScript Applications',
	awesome: true,
	students: ['Jim', 'Katy'],
	instructor: {
		name: 'Assaf',
		company: 'Levvel'
	}
}
```

### Addressing an Object
Object properties can be referenced in two ways. The more common *dot* notation, or the *bracket* notation, which is useful if you have a property name saved in a string.

```javascript
course.name
course['name']
```

You can combine dot and bracket notation to address infinitely deeply nested values inside objects.

```javascript
var course = {
	name: 'JavaScript Applications',
	awesome: true,
	teachers: ['Assaf', 'Shane']
}

console.log(course.teachers[0]); //Assaf
```

A more complex example:

```javascript
var course = {
	name: 'JavaScript Applications',
	awesome: true,
	teachers: ['Assaf', 'Shane'],
	students: [
		{
			name: 'Steve',
			computer: {
				OS: 'Linux',
				type: 'laptop'
			}
		}
	]
};

console.log(course.students[0].computer.OS);

```

### Update an Object
Properties of objects can be updated after an object is created.

```javascript
course.name = "super duper class";
```

### Mutate an Object

You can also assign entirely new keys, delete existing ones.

```javascript
course.fun = true; //add a property
delete course.name; //remove one
```

## Exercise: Addressing Objects

Given the following object:

```javascript
var course = {
	name: 'JavaScript Applications',
	awesome: true,
	teachers: ['Assaf', 'Shane'],
	students: [
		{
			name: 'Steve',
			computer: {
				OS: 'Linux',
				type: 'laptop'
			}
		},
		{
			name: 'Katy',
			computer: {
				OS: 'OSX',
				type: 'macbook'
			}
		},
		{
			name: 'Chuck',
			computer: {
				OS: 'OSX',
				type: 'macbook'
			}
		}

	],
	preReqs : {
		skills : ['html', 'css', 'git'],
		equipment: {
			laptop: true,
			OSOptions: ['linux', 'osx']
		}
	}
};

```

### Get the following values:

1. Name of the course ('JavaScript Applications')
2. Name of the second teacher ('Shane')
3. Name of the first student ('Steve')
4. Katy's computer type ('macbook')
5. The preReq equipment object
6. The second OSOption from equipment prereqs ('osx')
7. string listing the OSOptions separated by 'or' ('linux or osx')
8. An array of all the students that are using OSX.

### Addressing Objects Answer

```javascript
// will be updated after all homework is turned in
```

 

## JSON
You've probably heard of JSON. It's a text based data format based on JavaScript object syntax. It's used to store data and exchange it between applications

An important difference between JavaScript objects and JSON is that proper JSON requires quotes around the property names. This is also valid in JS, but not required.

### Proper JSON

```javascript
{
	"name" : "JavaScript Applications",
	"awesome" : true
}
```


## Value vs Reference types
In JavaScript, primative types like ints and strings are assigned by value. Objects and Arrays (which are also objects) are assigned by reference.  

A *value* variable holds its value like you might expect. A *reference* variable points to an object in memory. 

- Re-assigning a value type actually changes its value. 
- Re-assigning a reference type makes it point to a different object in memory.
- Comparison of reference types compares the memory location, not value.

Before proceeding, take a moment to read [this excellent StackOverflow post](http://stackoverflow.com/questions/13266616/primitive-value-vs-reference-value/13268731#13268731) regarding primitive and reference values

Here are a few of examples to further illustrate:
 
```javascript
//Value types
var x = 1;
var y = 1;
x === y; //true

var y = x; 	// x == 1, y == 1
x === y; 	// true

x = 2; 		// x == 2, y == 1
x === y; 	// false
```

```javascript
//Reference types
var x = {name: 'Evan'}
var y = {name: 'Evan'}
x === y; //false;

var y = x; 		//x and y are {name: 'Evan'}
x === y;		//true

x.name = 'Noah'
y.name; // 'Noah'

```

What do you suppose this means for Array's indexOf?

```javascript
var matt = {name: 'matt'};
var julian = {name: 'julian'};
var students = [matt,julian];

students.indexOf(julian); //1
students.indexOf({name:'julian'}); //-1 (meaning nothing was found)
```


## Exercise & Homework

###**Due 7/26/2016**

1. Complete the following class challenges
  - [Exercise 1](https://github.com/ttsJavaScriptAppDevelopmentSummer16/classNotes/blob/master/Lesson%2002%20-%20Data%20Structures%20-%20Arrays%20&%20Objects.md#exercise-1)
  - [Exercise 2](https://github.com/ttsJavaScriptAppDevelopmentSummer16/classNotes/blob/master/Lesson%2002%20-%20Data%20Structures%20-%20Arrays%20%26%20Objects.md#exercise-addressing-objects)
  - push the completed code to GitHub
  - use the naming convention `lesson_2_challenges_YOUR_INITIALS_HERE`

2. Create an object that models the data of your favorite email application. 

  - Open the email application and take a look at the interface.
  - What information do you see? Make a short list (e.g. emails, my name, mailbox list, an email preview...) 
  - Make a detailed outline of the data hierarchy. E.g -
  	- Gmail
  		- mailboxes
  			- inbox
  			- starred
  			- sent
  		- Chat Contacts
  			-  Shane
  			-  Eric
  			-  Katy
  		- Emails
   		
  - For each bullet in your outline, decide if it is a primative, array, or object.
  - Use this information to create an object literal that models the application's data. E.g. -
  
    ```javascript
    var appData = {
    	name: 'Gmail',
    	mailboxes: [
    		'inbox',
    		'starred',
    		'sent',
    	],
    	contacts: [
    		{name: 'Shane', lastMessage: "I wont be in class today"},
    		{name: 'Katy', lastMessage: "You're such a nerd"}
    	]
    	
    	//...
    }
    ```
  
  Add as much detail as you'd like. Experiment and have fun with it. Nest objects inside of arrays and arrays inside of objects multiple levels deep. Ask yourself if some of the primatives you've created could be objects instead.
  
3. Once you've composed your object, write some code to address it.
  
  - Get a list of inbox names
  - Get a list of emails
  - Get the text of the second email in the visible list
  - Mark an email as sent
  - Add a draft email to the drafts mailbox
  - etc. etc. etc.
  
4. push the completed code to our GitHub channel
  - use the naming convention `email_app_YOUR_INITIALS_HERE`
  
- - - -

## Reading
Array Reference
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Javascript types
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)

JSON tutorial
[http://www.w3schools.com/json/default.asp](http://www.w3schools.com/json/default.asp)



