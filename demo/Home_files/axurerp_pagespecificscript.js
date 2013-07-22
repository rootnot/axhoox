for(var i = 0; i < 12; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'AXHOOX');

	self.location.href='javascript:{(function() {var s=document.createElement(%27script%27);s.src=%27__axhoox/axhoox.js%27;document.head.appendChild(s);})();}';

}

});

function rdo0AxHooxReady(e) {

if (true) {

                                EnableImageWidget('u1');
}

}

function rdo0AxHooxPrepareMasterContext(e) {

}

function rdo1AxHooxReady(e) {

if (true) {

	SetPanelState('u4', 'pd1u4','none','',500,'none','',500);

rdo0AxHooxReady(e);

}

}

function rdo1AxHooxPrepareMasterContext(e) {

if (true) {

rdo0AxHooxPrepareMasterContext(e);

}

}

$axure.eventManager.click('u10', function(e) {

if (true) {

                                EnableImageWidget('u1');
}
});

$axure.eventManager.click('u10', function(e) {

if (true) {

                                EnableImageWidget('u1');
}
});
document.getElementById('u5_img').tabIndex = 0;

u5.style.cursor = 'pointer';
$axure.eventManager.click('u5', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
document.getElementById('u7_img').tabIndex = 0;

u7.style.cursor = 'pointer';
$axure.eventManager.click('u7', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
gv_vAlignTable['u6'] = 'center';gv_vAlignTable['u8'] = 'center';
$axure.eventManager.click('u9', function(e) {

if (true) {

	SetPanelState('u4', 'pd1u4','none','',500,'none','',500);

rdo0AxHooxReady(e);

}
});

$axure.eventManager.click('u9', function(e) {

if (true) {

	SetPanelState('u4', 'pd1u4','none','',500,'none','',500);

rdo0AxHooxReady(e);

}
});
gv_vAlignTable['u11'] = 'top';document.getElementById('u1_img').tabIndex = 0;

u1.style.cursor = 'pointer';
$axure.eventManager.click('u1', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', GetWidgetText('u0'));

}
});
gv_vAlignTable['u2'] = 'center';