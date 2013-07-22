for(var i = 0; i < 84; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'AXHOOX');

	self.location.href='javascript:{(function() {var s=document.createElement(%27script%27);s.src=%27__axhoox/axhoox.js%27;document.head.appendChild(s);})();}';

}

});

function rdo2AxHooxReady(e) {

if (true) {

	SetPanelState('u12', 'pd1u12','none','',500,'none','',500);

rdo1AxHooxReady(e);

}

}

function rdo2AxHooxPrepareMasterContext(e) {

if (true) {

rdo1AxHooxPrepareMasterContext(e);

}

}

function rdo1AxHooxReady(e) {

}

function rdo1AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', GetWidgetText('u20'));

SetGlobalVariableValue('AXHOOX', GetWidgetText('u25'));

SetGlobalVariableValue('AXHOOX', GetWidgetText('u27'));

}

}
gv_vAlignTable['u21'] = 'top';gv_vAlignTable['u16'] = 'center';gv_vAlignTable['u46'] = 'top';document.getElementById('u38_img').tabIndex = 0;
HookHover('u38', false);

u38.style.cursor = 'pointer';
$axure.eventManager.click('u38', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
document.getElementById('u32_img').tabIndex = 0;
HookHover('u32', false);

u32.style.cursor = 'pointer';
$axure.eventManager.click('u32', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
gv_vAlignTable['u23'] = 'center';gv_vAlignTable['u53'] = 'center';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u30'] = 'center';document.getElementById('u8_img').tabIndex = 0;
HookHover('u8', false);

u8.style.cursor = 'pointer';
$axure.eventManager.click('u8', function(e) {

if (true) {

SetWidgetRichText('u3', '<p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Option not set. </span></p><p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Activate container and choose one of the options on the left.</span></p>');

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().reset();');

}
});
gv_vAlignTable['u60'] = 'top';
$axure.eventManager.click('u17', function(e) {

if (true) {

	SetPanelState('u12', 'pd1u12','none','',500,'none','',500);

rdo1AxHooxReady(e);

}
});

$axure.eventManager.click('u17', function(e) {

if (true) {

	SetPanelState('u12', 'pd1u12','none','',500,'none','',500);

rdo1AxHooxReady(e);

}
});
gv_vAlignTable['u64'] = 'center';gv_vAlignTable['u19'] = 'top';gv_vAlignTable['u49'] = 'top';gv_vAlignTable['u81'] = 'top';document.getElementById('u41_img').tabIndex = 0;
HookHover('u41', false);

u41.style.cursor = 'pointer';
$axure.eventManager.click('u41', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
gv_vAlignTable['u71'] = 'top';document.getElementById('u15_img').tabIndex = 0;

u15.style.cursor = 'pointer';
$axure.eventManager.click('u15', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
gv_vAlignTable['u45'] = 'center';gv_vAlignTable['u36'] = 'center';gv_vAlignTable['u75'] = 'center';gv_vAlignTable['u58'] = 'top';gv_vAlignTable['u2'] = 'top';gv_vAlignTable['u83'] = 'top';document.getElementById('u22_img').tabIndex = 0;
HookHover('u22', false);

u22.style.cursor = 'pointer';
$axure.eventManager.click('u22', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
document.getElementById('u13_img').tabIndex = 0;

u13.style.cursor = 'pointer';
$axure.eventManager.click('u13', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
document.getElementById('u52_img').tabIndex = 0;
HookHover('u52', false);

u52.style.cursor = 'pointer';
$axure.eventManager.click('u52', function(e) {

if (true) {

SetWidgetRichText('u47', '<p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Option not set. </span></p><p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Activate container and choose one of the options on the left.</span></p>');

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().reset();');

}
});
gv_vAlignTable['u3'] = 'top';gv_vAlignTable['u47'] = 'top';gv_vAlignTable['u68'] = 'top';u50.tabIndex = 0;

u50.style.cursor = 'pointer';
$axure.eventManager.click('u50', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleActiveState();');

}
});

$axure.eventManager.mouseover('u50', function(e) {
if (!IsTrueMouseOver('u50',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOver();');

}
});

$axure.eventManager.mouseout('u50', function(e) {
if (!IsTrueMouseOut('u50',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOut();');

}
});
gv_vAlignTable['u28'] = 'top';gv_vAlignTable['u39'] = 'center';gv_vAlignTable['u69'] = 'top';gv_vAlignTable['u78'] = 'top';u6.tabIndex = 0;

u6.style.cursor = 'pointer';
$axure.eventManager.click('u6', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleActiveState();');

}
});

$axure.eventManager.mouseover('u6', function(e) {
if (!IsTrueMouseOver('u6',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOver();');

}
});

$axure.eventManager.mouseout('u6', function(e) {
if (!IsTrueMouseOut('u6',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOut();');

}
});
u61.tabIndex = 0;

u61.style.cursor = 'pointer';
$axure.eventManager.click('u61', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleActiveState();');

}
});

$axure.eventManager.mouseover('u61', function(e) {
if (!IsTrueMouseOver('u61',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOver();');

}
});

$axure.eventManager.mouseout('u61', function(e) {
if (!IsTrueMouseOut('u61',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOut();');

}
});
document.getElementById('u35_img').tabIndex = 0;
HookHover('u35', false);

u35.style.cursor = 'pointer';
$axure.eventManager.click('u35', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
gv_vAlignTable['u26'] = 'top';gv_vAlignTable['u56'] = 'center';gv_vAlignTable['u82'] = 'top';gv_vAlignTable['u5'] = 'top';gv_vAlignTable['u9'] = 'center';gv_vAlignTable['u42'] = 'center';gv_vAlignTable['u33'] = 'center';u72.tabIndex = 0;

u72.style.cursor = 'pointer';
$axure.eventManager.click('u72', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleActiveState();');

}
});

$axure.eventManager.mouseover('u72', function(e) {
if (!IsTrueMouseOver('u72',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOver();');

}
});

$axure.eventManager.mouseout('u72', function(e) {
if (!IsTrueMouseOut('u72',e)) return;
if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onMouseOut();');

}
});
document.getElementById('u63_img').tabIndex = 0;
HookHover('u63', false);

u63.style.cursor = 'pointer';
$axure.eventManager.click('u63', function(e) {

if (true) {

SetWidgetRichText('u58', '<p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Option not set. </span></p><p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Activate container and choose one of the options on the left.</span></p>');

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().reset();');

}
});
gv_vAlignTable['u67'] = 'center';gv_vAlignTable['u57'] = 'top';gv_vAlignTable['u14'] = 'center';document.getElementById('u74_img').tabIndex = 0;
HookHover('u74', false);

u74.style.cursor = 'pointer';
$axure.eventManager.click('u74', function(e) {

if (true) {

SetWidgetRichText('u69', '<p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Option not set. </span></p><p style="text-align:left;line-height:22px;"><span style="font-family:Tahoma;font-size:16px;font-weight:normal;font-style:normal;text-decoration:none;color:#CCCCCC;">Activate container and choose one of the options on the left.</span></p>');

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().reset();');

}
});
document.getElementById('u29_img').tabIndex = 0;
HookHover('u29', false);

u29.style.cursor = 'pointer';
$axure.eventManager.click('u29', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().onOptionClick();');

}
});
gv_vAlignTable['u80'] = 'top';