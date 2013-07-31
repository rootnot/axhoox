/**
 * Universal scrollbar controller example.
 * 
 * Contents of this file should be attached
 * to AxHooxPrepareMasterContext event of 
 * axhoox-status or axhoox starter masters
 * 
 * Controller instance when placed somewhere 
 * inside the controled scrollbar master examines
 * if it's horizontal or vertical scrollbar
 * 
 **/ 

// constants
// methods to attach to scrollbar
var _ownerApi = ['attachContent', 'getScroll', 'onHandleHover', 'onHandleOut', 'onHandleDragStart', 'onHandleDragDrop'];
// names of dimmensioning properties
var _dimmensions = ['width', 'height', 'x', 'y'];
// a time to wait after mouseouts before deactivation 
var deactivationDelay = 500;
// debouncing function / object to release load
function debounce(fn, delay) {
    if (!(this instanceof debounce)) {
        var _self = new debounce(fn, delay);
        return function() {
            _self._();
        };
    }
    var id;
    this._ = function() {
        if (!id) {
            id = setTimeout(function() {
                id = null;
                fn();
            }, delay);
        }
    };
}

function activate() {
    if (!this.data.active) {
        console.log('Scrollbar activation');
        this.data.active = true;
        this.data.bar.get('dp-main').setState('active', 'fade', '', 300, 'fade', '', 300);
    }
    return this;
}

function deactivate(force) {
    if (this.data.active || force) {
        console.log('Scrollbar deactivation');
        this.data.active = false;
        this.data.bar.get('dp-main').setState('idle', 'fade', '', 300, 'fade', '', 300);
    }
    return this;
}

function delayedDeactivation() {
    this.cancelDelayedDeactivation();
    this.deactivate();
}

function cancelDelayedDeactivation() {
    if (this.data.ddId) {
        clearTimeout(this.data.ddId);
        this.data.ddId = null;
    }
}

function onHandleHover() {
    if (this.data.handleDrag) {
        this.data.shouldDeactivateOnDrop = false;
    } else {
        this.cancelDelayedDeactivation();
    }
    return this;
}

function onHandleOut() {
    if (this.data.handleDrag) {
        this.data.shouldDeactivateOnDrop = true;
    } else {
        this.cancelDelayedDeactivation();
        this.data.ddId = setTimeout(delayedDeactivation.bind(this), deactivationDelay);
    }
    return this;
}

function onHandleDragStart() {
    this.data.handleDrag = true;
}

function onHandleDrag() {
    var coord = _dimmensions[this.data.barType + 2];
    var pos = this.data.bar.get('dp-main/handle-active').getRect()[coord];
    pos = Math.min(this.data.barMaxScroll, Math.max(0, pos));
    var val = Math.round(pos / this.data.barMaxScroll * this.data.maxScroll);
    if (val !== this.data.scroll) {
    	
        console.log('Handle drag : ' + val);
        this.data.scroll = val;
        if (this.data.content) {
            var moveByParams = [0, 0];
            moveByParams[this.data.barType] = val - this.data.content.getRect()[coord];
            this.data.content.moveBy.apply(this.data.content, moveByParams);
        }

        this.data.bar.fireEvent('OnChange', val);
    }
}

function onHandleDragDrop() {
    this.data.handleDrag = false;

    var h = this.data.bar.get('dp-main/handle-active');
    var hl = h.getRect()[_dimmensions[this.data.barType + 2]]; // handle location
    var d = hl < 0 ? -hl : hl > this.data.barMaxScroll ? this.data.barMaxScroll - hl : 0;

    if (d !== 0) {
        var moveByParams = [0, 0];
        moveByParams[this.data.barType] = d;
        // move handle in appropriate direction
        h.moveBy.apply(h, moveByParams);
        // reflect the same on an invisible idle handle
        h.moveBy.apply(this.data.bar.get('dp-main/handle-idle'), moveByParams);
    }

    if (this.data.shouldDeactivateOnDrop) {
        // run condition is happening sometimes and that's why we have forced deactivation
        this.deactivate(true);
    }

    return this;
}

function attachContent(cnt) {
    if (cnt.type !== 'dynamicPanel') {
        return;
    }
    this.data.content = cnt;
    var dim = _dimmensions[this.data.barType];
    this.data.maxScroll = cnt.getParent().getRect()[dim] - cnt.getRect()[dim];
}

function getScroll() {
    return this.data.scroll || 0;
}

function init() {

    // assign owner as bar
    var bar = this.data.bar = this.getOwner();

    // set up internals
    // main rectangle
    var mr = bar.get('dp-main').getRect();
    // handle rectangle
    var hr = bar.get('dp-main/handle-active').getRect();
    if (mr.width > mr.height) {
        // horizontal scrollbars
        this.data.barType = 0;
        this.data.barMaxScroll = mr.width - hr.width;
    } else {
        // vertical scrollbars
        this.data.barType = 1;
        this.data.barMaxScroll = mr.height - hr.height;
    }

    this.data.maxScroll = 100;

    // debounce to gain better performance
    this.onHandleDrag = debounce(onHandleDrag.bind(this), 100);
 
   // provide visible API to owner
    _ownerApi.forEach(function(method) {
        bar[method] = this[method].bind(this);
    }, this);

    // enable control
    bar.get('dp-main/bs-activator').enable();
}
// depending on place where used
// for a AxHooxPrepareMasterContext of axhoox-status
// inside this master use:
$.extend(masterContext, {
// in every other case use:
// prepareMasterContext('master-name', {
// prepareMasterContext('axx:scrollbar-controller', {

    autostart : true,
    activate : activate,
    deactivate : deactivate,
    delayedDeactivation : delayedDeactivation,
    cancelDelayedDeactivation : cancelDelayedDeactivation,
    onHandleHover : onHandleHover,
    onHandleOut : onHandleOut,
    onHandleDragStart : onHandleDragStart,
    onHandleDragDrop : onHandleDragDrop,
    attachContent : attachContent,
    getScroll : getScroll,
    init : init

});