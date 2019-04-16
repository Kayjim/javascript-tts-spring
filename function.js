The four scopes of ‘this’

- implicit
    - ex: myObj.func( );
          - refers to myObj

- explicit
    - ex: func.bind(myObj)( )
           - refers to myObj

- new
     - ex: var car = new func({ })
	- ‘this’ is inside the function

- global
     - ex: func( )