axhoox
======

Just program your Axure prototypes in Java Script !

var w = scriptContext.get("dynamic-panel-1").setNextState(true);

var parent = scriptContext.getParent();
parent.fireEvent('OnSomethingSpecial');

if (scriptContext.page != scriptContext)
  console.log('We are still in some widget scope. The path is: ' + scriptContext.path);
}
