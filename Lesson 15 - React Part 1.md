# Lesson 15 - React

## Recap & Intro

- Last class we started to dive into ReactJS and focused on: 
	- What React is (and is not) 
	- Core Concepts
	- React Setup and Configuration
	- React Components
	- JSX
	- Component State (`this.state = {}`)
	- React CLI
- Today we'll continue our deep dive by covering: 
    - Event Handling
    - Updating State (`this.setState()`)
    - Props 
    - Refs
    - Component Composition

## Event Handling

JSX has an event system that is similar to the DOM, yet better.<br>

In fact according to the [React Event System Documentation](https://facebook.github.io/react/docs/events.html) 
> Your event handlers will be passed instances of **SyntheticEvent**, a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.

Meaning... **events are supplied by the React library**, not the web browser, resulting in 100% consistency and no browser quirks!

<center> ![](./images/soccer_celebration.gif)</center>

So, how do use event handlers in React? 

### Wiring up a handler

##### Using the `.bind()` method:

```javascript
class App extends Component {
  constructor() {
     super();
     this.state = {
   		clickCount : 0
   	};
   }

   _handleClick(event) {
   	console.log('clicked!', event)
   }

   render() {
     return (
      <div>
        <h3>{this.state.clickCount}</h3>
        <button onClick={this._handleClick.bind(this)}>Click me!</button>
      </div>
     );
   }
 }

```

##### Using arrow functions: 

```javascript
//...

_handleClick = (event) => {
   	console.log('clicked!', event)
   }

   render() {
     return (
      <div>
        <h3>{this.state.clickCount}</h3>
        <button onClick={this._handleClick}>Click me!</button>
      </div>
     );
   }

//... 
```

Either of the options can be used. However, I would recommend that you choose one and option and use it consistently

One other note, is that you may have noticed the `_` prefixed to our `handleClick` function. This is a pattern used by JavaScript developers to indicate a private method.<br> Be aware however, that this does not actually make the method private.




### Updating state (`this.setState()`)

A user event like a click probably means an update to your state. When updating state make sure to use `this.setState()` and not update state directly.<br> 
This will utilize the React lifecycle (dicussed next class) and allow React to keep track of the fact that state is changing!

```javascript
_handleClick = (event) => {
  	let clicks = this.state.clickCount;
  	this.setState({clickCount: clicks + 1})
 }
 
```

So, what's happening here? 

`setState()` is a React method that can take 2 arguments. 

The first argument can be an object or function that updates the current state of your component. 

The second argument (which is optional) is a callback function that is executed once the component state is updated. 

Please note that you should avoid setting the state manually (outside of your constructor function) 

Why?<br>
Well, according to the [React setState Documentation](https://facebook.github.io/react/docs/component-api.html#setstate): 
> NEVER mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

> `setState()` does not immediately mutate `this.state` but creates a pending state transition. Accessing `this.state` after calling this method can potentially return the existing value.

> `setState()` will always trigger a re-render unless conditional rendering logic is implemented in `shouldComponentUpdate()`...

Another note, you can use some of that fancy new ES6 with your object assignment, by doing something like this: 

```javascript
   _handleClick = (event) => {
   	let clickCount = this.state.clickCount;
    clickCount ++
   	this.setState({clickCount})
  }
```


## Forms and User Input
Forms are where the difference between classic DOM elements and JSX components becomes more evident.

### Controlled Components

Using the "value" property, this text input will ALWAYS have the value "Hello!", no matter what the user does

```javascript
render() {
    return <input type="text" value="Hello!" />;
  }
```

In order to let the user update its value, use the `onChange` event handler to update state.

```javascript
_class App extends Component {
  constructor() {
     super();
     this.state = {
   		value: "hello"
   	};
   }

  _handleChange = (event) => {
 	this.setState({value: event.target.value});
 }

 render() {
  console.log(this.state.value);
 	return (
 	  <input
 	    type="text"
 	    value={this.state.value}
 	    onChange={this._handleChange}
 	  />
 	);
 }
}
```

According to the [React Controlled Component Documentation](https://facebook.github.io/react/docs/forms.html#controlled-components): 
> A Controlled component does not maintain its own internal state; the component renders purely based on props.

These props are usually passed down from a parent component (to be covered later in this lesson)

### Uncontrolled Components

By comparison, **Uncontrolled Components** maintain their own state internally. 

Often when using an uncontrolled component, you will used the `defaultValue` property (instead of `value`)r.

```javascript
// ... 

 render() {
  console.log(this.state.value);
 	return (
 	  <input
 	    type="text"
 	    defaultValue='hi!'
 	    onChange={this._handleChange}
 	  />
 	);
 }
}

// ...
```

This is often used when you don't have properties to initially pass to your component. 

### Refs

Because an uncontrolled component isn't bound to any value in our state, getting its value requires us to name it using a `ref` attribute

```javascript
// ...

   _clickHandler = (event) => {
   	console.log(`refs: ${this.refs.message.value}`)
    console.log(`state: ${this.state.value}`);
   }

   render() {
       return (
       	<div>
       		<input type="text" ref="message" defaultValue="Hello!" />
       		<button onClick={this._clickHandler}>Click me</button>
       	</div>
      );
    }
  }
  
  // ...
  ```

The React team says that refs should be considered an escape hatch, mainly used for when the 1 way, reactive data flow is not an option. 

## Exercise 1: Handling Events

1. Wire up a click event handler to your button. 
2. Clicking the button takes the message from the text input and adds it to the message list.
3. Clicking the button clears the message from the input box.
4. If there is no text in the input box, the button should do nothing.
5. Add an edit button to messages sent by the current user.
6. Clicking the edit button sets a state property to the index of the item being edited


## Composition

Up to now we've done all of our work in a single component, but React's strength is to break up applications into many re-usable components and compose them. React components we define can be used the same way as built-in react components like `<div>` and `<h1>`.

For example, if we define a ToDoItem component, we can re-use it in a ToDoList component.

```javascript
class TodoItem extends React.Component {
	constructor(){
		super();
		this.state = {text: "default text"}
	}
	render() {
   		return (
    		<div>{this.state.text}</div>
    	);
  }
}

class TodoList extends React.Component {
	constructor(){
		super();
		this.state = {listItems: [
			{text: "Gym"},
			{text: "Tan"},
			{text: "Laundry"}
		]}
	}
	render() {
		var items = this.state.listItems.map((item) => <TodoItem />)

		return (
			<div>{items}</div>
		);
	}
}

export default TodoList;
```

## Props

In the previous example, you probably noticed that we didn't pass any data from our `listItems` to our child components. We can do this using Props.

From HTML, we're familiar with the concept of "properties" that configure an element's behavior. For example, an `<a>` tag accepts properties including `href` and `name` that are supplied by user of the element 

```html
<a href="# name="myLink"></a>
```

React components have a similar concept called `props`. **Props are JavaScript objects supplied by the Parent Component**.

Before we get into our TodoList example, let's take an initial look at props

##### A Simple Example
```javascript
// ... 

class HelloMessage extends React.Component(
  render() {
    return <div>Hello {this.props.name}</div>;
  }
);
ReactDOM.render(<HelloMessage name="Shane" />, 
					document.getElementById('root'));
```

In the above example, We have simply setup our single HelloMessage component to recieve props. We then pass the props on our call to instantiate the component. 

### Passing Props to Children

```javascript
class ChildComponent extends React.Component{
  render() {
    return <div style={{
      color      : this.props.color,
      background : this.props.background
    }}>
      I am {this.props.color}
    </div>
  }
}

class ParentComponent extends React.Component{
  render() {
    return (
      <ChildComponent background={this.props.background} color={this.props.color} />
    );
  }
)

ReactDOM.render(
  <ParentComponent color="green" background="red" />, 
  document.getElementById('root'));
```

Here we have now made use of props by passing properties from the parent component down to the child component. 

Getting back to our TodoList, You will see that we can pass data down to our `TodoItems` from our `TodoList` like this:

```javascript
// ... 

class TodoItem extends React.Component {
	constructor(props){
		super(props);

	}
	render() {
   		return (
    		<div>{this.props.name}</div>
    	);
  }
}

class TodoList extends React.Component {
	constructor(){
		super();
		this.state = {listItems: [
			{text: "Gym"},
			{text: "Tan"},
			{text: "Laundry"}
		]}
	}
	render() {
		let items = this.state.listItems.map((item, i) => <TodoItem key={i} name={item.text}/>)

		return (
			<div>{items}</div>
		);
	}
}

// ...
```

### Passing JS Objects as Props
In the previous example we passed a simple string in as the property value like we're used to doing in HTML. With JSX, you can pass any JS object in as a property. This includes objects, arrays, and even functions!

#### todoList.jsx
```javascript

class TodoItem extends React.Component {
 // ... 
 
render() {
   		return (
    		<div>{this.props.item.text}</div>
    	);
  }
}

class TodoList extends React.Component {
  //...
  render() {
		render() {
		let items = this.state.listItems.map((item, i) => <TodoItem key={i} item={item}/>)		
		return (	
			<span>{items}</span>
		);
	}
}

// ...
```

### Passing Functions as Props
Remember, functions are Objects! This means you can pass them in as props as well. This is a very powerful feature.

```javascript
class TodoList extends React.Component {
   // ...
   
     completeItem = (item, event) => {
     // make a shallow copy of listItems (in state)
     let listItems = this.state.listItems.slice()

     // splice -  removes the chosen item from listItems
     // indexOf - find the specific object in listItems
     // 1 - remove only 1 item
     listItems.splice(listItems.indexOf(item.props.todo), 1)

     // update state with the modified listItems array
     this.setState({listItems})
   }


  render() {
    {/* pass completeItem as a prop to the TodoItem component */}

    let items = this.state.listItems.map((item,i) => {
      return <TodoItem key={i} item={item} completeItem={this.completeItem} />
    })

    return (
      <span>{items}</span>
    );
  }
}

class TodoItem extends Component {
  
  render() {
    return (
      <div >
        {/* invoke completeItem as a callback to the Click Event*/}
        {/* pass in the specific item as our argument (this) */}
        <h3 onClick={(e) => (this.props.completeItem(this, e))}>{this.props.todo.text}</h3>
      </div>
    )
  }
}
``` 

Two major things are going on to accomplish this: 

1. In our TodoItem `render` method, we are using an anonymous arrow function to invoke our `completeItem` function 

	```javascript
	render() {
	    return (
	      <div >
	        {/* invoke completeItem as a callback to the Click Event*/}
	        {/* pass in the specific item as our argument (this) */}
	        <h3 onClick={(e) => (this.props.completeItem(this, e))}>{this.props.todo.text}</h3>
	      </div>
	    )
	  }
	``` 
	
	look closely at: ` <h3 onClick={(e) => (this.props.completeItem(this, e))}>{this.props.todo.text}</h3>`
	
	we’ll then pass in the TodoItem,<br>
	a.k.a: **this**,<br>
	as our first argument

2. In our Parent component’s `completeItem` function…
	- making a copy of the listItems array (from state)
	- splicing/removing the specific TodoItem (passed in from the click event)
	- updating the component’s state to render the new changes

	```javascript
	   completeItem = (item, event) => {
	     // make a shallow copy of listItems (in state)
	     let listItems = this.state.listItems.slice()
	
	     // splice -  removes the chosen item from listItems
	     // indexOf - find the specific object in listItems
	     // 1 - remove only 1 item
	     listItems.splice(listItems.indexOf(item.props.todo), 1)
	
	     // update state with the modified listItems array
	     this.setState({listItems})
	   }
	```
	
What if we wanted to add a new ToDo Item? 

```javascript

// ... 

class TodoList extends React.Component {
   constructor() {
    super();
    this.state = {
      listItems: [
        {text: "Gym"},
        {text: "Tan"},
        {text: "Laundry"}
      ],
      newItem: ''
    }
  }
  
  // ... 

  _updateNewItem = (event) => {
    this.setState({newItem: event.target.value})
  }

  _addTodo = (event) => {
    event.preventDefault()
    let listItems = this.state.listItems.slice()
    listItems.push({text: this.state.newItem})
    this.setState({listItems})
  }

  render() {
   
   // ... 

    return (
      <div>
        <span>{items}</span>
        <form onSubmit={this._addTodo}>
          <input value={this.state.newItem} onChange={this._updateNewItem} />
          <button type="submit">Add ToDo</button>
        </form>
      </div>
    );
  }
}

// ... 
```

### Default Props
You can set default values for properties by setting a `defaultProps` property on the class.

```javascript
TodoItem.defaultProps = {text: "default text"}
``` 

### Validating Props
You can also specify the types of properties 
```javascript
TodoItem.propTypes = { item: React.PropTypes.object };
```

### Complete example with defaultProps and propTypes

```javascript
export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick = () => {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  }
}

Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };
```

## Exercise 2: Composition
Let's break apart our monolithic component a bit.

1. Create a component that displays a single message based on a "message" object prop.
2. Validate that the message prop is an object using `propTypes`
3. Refactor your main component to use the message component to display messages.
4. Create a component for your message inputs (text and save button)
5. Refactor your main component to use the messageInputs component
	- Make sure all buttons and events still work as expected.


## Homework

###**Due 9/12/16**

- Work with your partner to decide which application you are going to use
  - rename the chosen repo on github to: `react_message_YOUR_TEAM_INITIALS_HERE`
  - check out a new branch
  - Complete [Exercise 2](https://github.com/ttsJavaScriptAppDevelopmentSummer16/classNotes/blob/master/Lesson%2016%20-%20React%20Part%202.md#exercise-2-composition)
  - Push your branch to GitHub
  - Merge 1 of the branches to master
- Complete the [learnyoureact](https://github.com/tako-black/learnyoureact) module at [Nodeschool](http://nodeschool.io/)
  - Upload a completed screenshot to slack
- Pass the first 4 [React Koans](https://github.com/arkency/reactjs_koans) tests
  - Upload screenshot of passing tests to slack
