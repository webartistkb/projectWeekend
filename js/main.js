(function () {

    // Boilerplate code to render 150 apps/items on page
    for (var i = 1; i <= 150; i++) {
        var node = document.createElement('LI');
        node.classList.add('flex-item');
        var textnode = document.createTextNode('Item ' + i);
        var span = document.createElement('span');
        span.appendChild(textnode);
        node.appendChild(span);
        document.getElementById('apps').appendChild(node);
    }

var isAltMode = false;
var isMouseMode = false;

var navBar = document.getElementById("sidenav");


    /* Set the width of the side navigation to 80px */
    function openSidebar(keyboard) {
        if(keyboard){
            navBar.classList.add('keyboard');
        }
        navBar.style.width = "80px";
        navBar.classList.add('open');
        navBar.classList.remove('closed');
    }

    /* Helper function to check id an element has a particular class */
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    /* Set the width of the side navigation to 0 */
    function closeSidebar() {
        navBar.style.width = "0";
        navBar.classList.add('closed');
        navBar.classList.remove('open','keyboard');
    }

    // To Open Navbar using Mouse
    document.addEventListener("mouseover", function( e ) {
    if ((e.pageX < 20)&& (!isAltMode)) {
        console.log('Inside mouse enter Condition');
        setTimeout(function () {
            openSidebar();
            isMouseMode = true;
        }, 1000);
    }
    else if((e.pageX > 72)&&(!(isAltMode))){
        console.log('inside mouseout');
        closeSidebar();
        isMouseMode = false;
    }
});

function changeViews(action, sourceOfAction) {
    console.log(action);
    if (sourceOfAction === 'keyboard') {
        action = document.querySelector('button.' + action);
        console.log(action);
    }
    var active_button = document.querySelector('button.active');
    active_button.classList.remove('active');
    action.classList.add('active');
    var _apps = document.getElementById('apps');
    if (hasClass(action, 'grid')) {
        _apps.classList.remove("list", "metro",'animationMetro');
        _apps.classList.add('grid',"gradient-pattern");
    } else if (hasClass(action, 'list')) {
        _apps.classList.remove("grid", "metro","gradient-pattern",'animationMetro');
        _apps.classList.add('list');
    } else if (hasClass(action, 'metro')) {
        _apps.classList.remove("grid", "list","gradient-pattern");
        _apps.classList.add('metro','animationMetro');
    }
}

//TODO: fix event is getting attached to all buttons
var sidebarActions = document.getElementsByTagName('button');
console.log(typeof(sidebarActions), sidebarActions);
for (var i = 0; i < sidebarActions.length; i++) {
    sidebarActions[i].onclick = function (e) {
        console.log(e);
        var action = e.target;
        changeViews(action);
    }
}

// Attaching Event Listener to open/close Navbar using Alt Key
document.addEventListener("keydown", function (event) {
    if(isMouseMode){
        return;
    }
    event.preventDefault();
    // Fire following events only when sidenav is open
    if (hasClass(navBar, 'open')) {
        if (event.keyCode === 16) {
            closeSidebar();
            isAltMode = false;
        }
        else if (event.keyCode === 71) {
            changeViews('grid', 'keyboard');
        } else if (event.keyCode === 76) {
            changeViews('list', 'keyboard');
        } else if (event.keyCode === 77) {
            changeViews('metro', 'keyboard');
        }
    } else if (event.keyCode === 16 && hasClass(navBar, 'closed')) {
        openSidebar('keyboard');
        isAltMode = true;
    }
});

})();

