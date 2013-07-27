for(var i = 0; i < 91; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'AXHOOX');

	self.location.href='javascript:{(function() {var s=document.createElement(%27script%27);s.src=%27__axhoox/axhoox.js%27;document.head.appendChild(s);})();}';

}

});

function rdo8OnSelectionChange(e) {

}

function rdo9AxHooxReady(e) {

}

function rdo9AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo3AxHooxReady(e) {

}

function rdo3AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo34OnSelectionChange(e) {

}

function rdo33AxHooxReady(e) {

}

function rdo33AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo35AxHooxReady(e) {

}

function rdo35AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo2OnSelectionChange(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.check();');

}

}

function rdo7AxHooxReady(e) {

}

function rdo7AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo36OnSelectionChange(e) {

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

function rdo28OnSelectionChange(e) {

}

function rdo6OnSelectionChange(e) {

}

function rdo24OnSelectionChange(e) {

}

function rdo25AxHooxReady(e) {

}

function rdo25AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo26OnSelectionChange(e) {

}

function rdo27AxHooxReady(e) {

}

function rdo27AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo20OnSelectionChange(e) {

}

function rdo21AxHooxReady(e) {

}

function rdo21AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo22OnSelectionChange(e) {

}

function rdo23AxHooxReady(e) {

}

function rdo23AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo37AxHooxReady(e) {

}

function rdo37AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo30OnSelectionChange(e) {

}

function rdo31AxHooxReady(e) {

}

function rdo31AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo32OnSelectionChange(e) {

}

function rdo0AxHooxReady(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.check();');

}

}

function rdo0AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var handle;\n\npreparePageContext({\n\n    init : function() {\n        handle = this.get(\'instance-1\');\n    },\n    onButtonClick : function(buttonLabel) {\n        switch(buttonLabel) {\n            case \'button-select-all\' : \n                handle.selectAll();\n                break;\n            case \'button-select-none\' :\n                handle.unSelectAll();\n                break;\n            case \'button-toggle\' :\n                handle.toggleAll();\n                break;\n            case \'button-dice\' :\n                handle.diceAll();\n                break;\n        }\n    },\n    check : function() {\n        var sc = handle.getSelectedCount();\n        var ic = handle.getInstanceCount();\n        var bt = this.get(\'button-select-none\');\n        if (sc === 0) {\n            bt.disable();\n        }\n        else if (bt.isDisabled()) {\n            bt.enable();\n        }\n        bt = this.get(\'button-select-all\');\n        if (sc === ic) {\n            bt.disable();\n        } else if (bt.isDisabled()) {\n            bt.enable();\n        }\n    }\n});');

}

}

function rdo29AxHooxReady(e) {

}

function rdo29AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo5AxHooxReady(e) {

}

function rdo5AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo14OnSelectionChange(e) {

}

function rdo15AxHooxReady(e) {

}

function rdo15AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo16OnSelectionChange(e) {

}

function rdo17AxHooxReady(e) {

}

function rdo17AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo10OnSelectionChange(e) {

}

function rdo11AxHooxReady(e) {

}

function rdo11AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo12OnSelectionChange(e) {

}

function rdo13AxHooxReady(e) {

}

function rdo13AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo18OnSelectionChange(e) {

}

function rdo19AxHooxReady(e) {

}

function rdo19AxHooxPrepareMasterContext(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'var instanceCounter = 0;\nvar selectionCounter = 0;\n\nvar instances = [];\nvar togglers = [\'setNotSelected\', \'setSelected\'];\n\nfunction fireChangeEvent() {\n    // fire on first instance only\n    instances[0].fireEvent(\'OnSelectionChange\', selectionCounter);\n}\n\nfunction writeLabel() {\n    this.get(\'label\').setText(\'Instance number \' + this.instanceNumber);\n}\n\nfunction selectAll() {\n    instances.forEach(function(i) {\n        i.select(true);\n    });\n    fireChangeEvent();\n}\n\nfunction unSelectAll() {\n    instances.forEach(function(i) {\n        i.select(false);\n    });\n    fireChangeEvent();\n}\n\nfunction toggleAll() {\n    instances.forEach(function(i) {\n        i.select(!i.isSelected);\n    });\n    fireChangeEvent();\n}\n\nfunction diceAll() {\n    instances.forEach(function(i) {\n        i.select(Boolean(Math.round(Math.random())));\n    });\n    fireChangeEvent();\n}\n\nfunction select(s) {\n    this.get(\'label\')[togglers[s ? 1 : 0]]();\n    if (!this.isSelected && s) {\n        selectionCounter ++;\n    } else if (this.isSelected && !s) {\n        selectionCounter --;\n    }\n    this.isSelected = s;\n}\n\nfunction toggleSelection() {\n    this.select(!this.isSelected);\n    fireChangeEvent();\n}\n\nfunction getSelectedCount() {\n    return selectionCounter;\n}\n\nfunction getInstanceCount() {\n    return instanceCounter;\n}\n\nfunction init() {\n    this.isSelected = this.get(\'label\').isSelected();\n    this.instanceNumber = ++instanceCounter;\n    instances.push(this);\n    if (this.isSelected) {\n        selectionCounter ++;\n    }\n    this.writeLabel();\n}\n\n$.extend(masterContext, {\n    autostart : true,\n    init : init,\n    writeLabel : writeLabel,\n    toggleSelection : toggleSelection,\n    select : select,\n    getSelectedCount : getSelectedCount,\n    getInstanceCount : getInstanceCount,\n    selectAll : selectAll,\n    unSelectAll : unSelectAll,\n    toggleAll : toggleAll,\n    diceAll : diceAll\n});');

}

}

function rdo4OnSelectionChange(e) {

}
gv_vAlignTable['u21'] = 'center';gv_vAlignTable['u86'] = 'center';gv_vAlignTable['u25'] = 'center';document.getElementById('u16_img').tabIndex = 0;
HookHover('u16', false);

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u68_img').tabIndex = 0;
HookHover('u68', false);

u68.style.cursor = 'pointer';
$axure.eventManager.click('u68', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u76_img').tabIndex = 0;
HookHover('u76', false);

u76.style.cursor = 'pointer';
$axure.eventManager.click('u76', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u48_img').tabIndex = 0;
HookHover('u48', false);

u48.style.cursor = 'pointer';
$axure.eventManager.click('u48', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u8_img').tabIndex = 0;
HookHover('u8', false);

u8.style.cursor = 'pointer';
$axure.eventManager.click('u8', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u53'] = 'center';document.getElementById('u85_img').tabIndex = 0;
HookHover('u85', false);

u85.style.cursor = 'pointer';
$axure.eventManager.click('u85', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.onButtonClick(scriptContext.label);');

}
});

$axure.eventManager.click('u7', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.check();');

}
});

$axure.eventManager.click('u7', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.check();');

}
});
document.getElementById('u60_img').tabIndex = 0;
HookHover('u60', false);

u60.style.cursor = 'pointer';
$axure.eventManager.click('u60', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u89'] = 'top';document.getElementById('u64_img').tabIndex = 0;
HookHover('u64', false);

u64.style.cursor = 'pointer';
$axure.eventManager.click('u64', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u49'] = 'center';document.getElementById('u81_img').tabIndex = 0;
HookHover('u81', false);

u81.style.cursor = 'pointer';
$axure.eventManager.click('u81', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.onButtonClick(scriptContext.label);');

}
});

$axure.eventManager.click('u11', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.check();');

}
});
gv_vAlignTable['u41'] = 'center';gv_vAlignTable['u17'] = 'center';gv_vAlignTable['u45'] = 'center';document.getElementById('u36_img').tabIndex = 0;
HookHover('u36', false);

u36.style.cursor = 'pointer';
$axure.eventManager.click('u36', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u87_img').tabIndex = 0;
HookHover('u87', false);

u87.style.cursor = 'pointer';
$axure.eventManager.click('u87', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.onButtonClick(scriptContext.label);');

}
});
document.getElementById('u2_img').tabIndex = 0;

u2.style.cursor = 'pointer';
$axure.eventManager.click('u2', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
document.getElementById('u83_img').tabIndex = 0;
HookHover('u83', false);

u83.style.cursor = 'pointer';
$axure.eventManager.click('u83', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.page.onButtonClick(scriptContext.label);');

}
});
gv_vAlignTable['u57'] = 'center';gv_vAlignTable['u13'] = 'center';document.getElementById('u52_img').tabIndex = 0;
HookHover('u52', false);

u52.style.cursor = 'pointer';
$axure.eventManager.click('u52', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u3'] = 'center';
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
gv_vAlignTable['u77'] = 'center';gv_vAlignTable['u90'] = 'top';document.getElementById('u28_img').tabIndex = 0;
HookHover('u28', false);

u28.style.cursor = 'pointer';
$axure.eventManager.click('u28', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u20_img').tabIndex = 0;
HookHover('u20', false);

u20.style.cursor = 'pointer';
$axure.eventManager.click('u20', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
document.getElementById('u24_img').tabIndex = 0;
HookHover('u24', false);

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u69'] = 'center';gv_vAlignTable['u84'] = 'center';gv_vAlignTable['u61'] = 'center';document.getElementById('u32_img').tabIndex = 0;
HookHover('u32', false);

u32.style.cursor = 'pointer';
$axure.eventManager.click('u32', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u65'] = 'center';document.getElementById('u56_img').tabIndex = 0;
HookHover('u56', false);

u56.style.cursor = 'pointer';
$axure.eventManager.click('u56', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u5'] = 'center';gv_vAlignTable['u82'] = 'center';document.getElementById('u12_img').tabIndex = 0;
HookHover('u12', false);

u12.style.cursor = 'pointer';
$axure.eventManager.click('u12', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u9'] = 'center';gv_vAlignTable['u33'] = 'center';document.getElementById('u72_img').tabIndex = 0;
HookHover('u72', false);

u72.style.cursor = 'pointer';
$axure.eventManager.click('u72', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u37'] = 'center';gv_vAlignTable['u88'] = 'center';gv_vAlignTable['u80'] = 'top';document.getElementById('u40_img').tabIndex = 0;
HookHover('u40', false);

u40.style.cursor = 'pointer';
$axure.eventManager.click('u40', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u73'] = 'center';document.getElementById('u44_img').tabIndex = 0;
HookHover('u44', false);

u44.style.cursor = 'pointer';
$axure.eventManager.click('u44', function(e) {

if (true) {

SetGlobalVariableValue('AXHOOX', 'scriptContext.getOwner().toggleSelection();');

}
});
gv_vAlignTable['u29'] = 'center';document.getElementById('u4_img').tabIndex = 0;

u4.style.cursor = 'pointer';
$axure.eventManager.click('u4', function(e) {

if (true) {

	NewTab('http://rootnot.github.io/axhoox', "");

}
});
