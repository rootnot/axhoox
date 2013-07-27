for(var i = 0; i < 20; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'AXHOOX');

	self.location.href='javascript:{(function() {var s=document.createElement(%27script%27);s.src=%27__axhoox/axhoox.js%27;document.head.appendChild(s);})();}';

}

});

function rdo0AxHooxReady(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', GetWidgetText('u16'));

}

}

function rdo0AxHooxPrepareMasterContext(e) {

}

function rdo1AxHooxReady(e) {

if (true) {

	SetPanelState('u1', 'pd1u1','none','',500,'none','',500);

rdo0AxHooxReady(e);

}

}

function rdo1AxHooxPrepareMasterContext(e) {

if (true) {

rdo0AxHooxPrepareMasterContext(e);

}

}
gv_vAlignTable['u3'] = 'center';gv_vAlignTable['u13'] = 'center';document.getElementById('u4_img').tabIndex = 0;

u4.style.cursor = 'pointer';
$axure.eventManager.click('u4', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
gv_vAlignTable['u19'] = 'top';gv_vAlignTable['u10'] = 'center';gv_vAlignTable['u17'] = 'top';gv_vAlignTable['u5'] = 'center';document.getElementById('u14_img').tabIndex = 0;
HookHover('u14', false);

u14.style.cursor = 'pointer';
$axure.eventManager.click('u14', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var orbit = scriptContext.page.get(\'orbit\');\nif (!orbit.data.orbiting) {\n    orbit.startOrbit();\n} else {\n    orbit.stopOrbit();\n}');

}
});
gv_vAlignTable['u15'] = 'center';
$axure.eventManager.click('u6', function(e) {

if (true) {

	SetPanelState('u1', 'pd1u1','none','',500,'none','',500);

rdo0AxHooxReady(e);

}
});

$axure.eventManager.click('u6', function(e) {

if (true) {

	SetPanelState('u1', 'pd1u1','none','',500,'none','',500);

rdo0AxHooxReady(e);

}
});
document.getElementById('u2_img').tabIndex = 0;

u2.style.cursor = 'pointer';
$axure.eventManager.click('u2', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
gv_vAlignTable['u18'] = 'top';
$axure.eventManager.click('u7', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', GetWidgetText('u16'));

}
});

$axure.eventManager.click('u7', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', GetWidgetText('u16'));

}
});
