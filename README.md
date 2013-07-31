# ![axhoox](http://content.screencast.com/users/rootnot/folders/Default/media/112b6f5f-18ca-463b-b892-3a4708f16463/logo-200px.png)

### Just program your Axure prototypes in Java Script !
```javascript

		scriptContext.get("dynamic-panel-1").setNextState(true);

		var parent = scriptContext.getParent();
		parent.fireEvent('OnSomethingSpecial');

		if (scriptContext.page != scriptContext) {
			console.log('We are still in some widget scope. The path is: ' + scriptContext.path);
		}
  
		scriptContext.data.YourOwnVariable = 'This is important';
```		
		
### Read more in [The Wiki](https://github.com/rootnot/axhoox/wiki) or play with [Demo](http://rootnot.github.io/axhoox/demo/index.html)

#### License and distribution

All software and documents (located in the _/source_, _/dev-tools_ and _/axure-rp-files_ directories) 
are licensed under the [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/). 
If you use them please  add a link to AXHOOX (http://rootnot.github.io/axhoox/) somewhere in your prototype or web page.

