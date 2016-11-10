// Boilerplate code to render 150 apps/items on page
(function() {
    for (let i = 1; i <= 150; i++) {
        var node = document.createElement('LI');
        node.classList.add('flex-item');
        var textnode = document.createTextNode('Item ' + i);
        var span = document.createElement('span');
        span.appendChild(textnode);
        node.appendChild(span);
        document.getElementById('apps').appendChild(node);
    }
})();

function openNav(e) {

    if (e.pageX < 20) {
        setTimeout(function() {
            openSidebar();
        }, 2000);

    }
}

function closeNav(e) {
    if (e.pageX > 20) {
        closeSidebar();
        // Show the menu if mouse is within 20 pixels from the left or we are hovering over it
    }
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function changeViews(action, sourceOfAction) {
    console.log(action);
    if (sourceOfAction === 'keyboard') {
        action = document.querySelector('button.' + action);
        console.log(action);
    }
    let active_button = document.querySelector('button.active');
    active_button.classList.remove('active');
    action.classList.add('active');
    var _apps = document.getElementById('apps');
    if (hasClass(action, 'grid')) {
        _apps.classList.remove("list", "metro");
        _apps.classList.add('grid');
    } else if (hasClass(action, 'list')) {
        _apps.classList.remove("grid", "metro");
        _apps.classList.add('list');
    } else if (hasClass(action, 'metro')) {
        _apps.classList.remove("grid", "list");
        _apps.classList.add('metro');
    }
}

//TODO: fix event is getting attached to all buttons
let sidebarActions = document.getElementsByTagName('button');
console.log(typeof(sidebarActions), sidebarActions);
for (var i = 0; i < sidebarActions.length; i++) {
    sidebarActions[i].onclick = function(e) {
        console.log(e);
        var action = e.target;
        changeViews(action);
    }
}

/* Set the width of the side navigation to 150px */
function openSidebar() {
    console.log('open called');
    let navBar = document.getElementById("sidenav");
    navBar.style.width = "80px";
    navBar.classList.add('open');
    navBar.classList.remove('closed');
}

/* Set the width of the side navigation to 0 */
function closeSidebar() {
    console.log('close called');
    let navBar = document.getElementById("sidenav");
    navBar.style.width = "0";
    navBar.classList.add('closed');
    navBar.classList.remove('open');
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    console.log(event);
    // Fire following events only when sidenav is open
    let navBar = document.getElementById("sidenav");
    if (hasClass(navBar, 'open')) {
        if (event.keyCode === 16)
            closeSidebar();
        else if (event.keyCode === 71) {
            changeViews('grid', 'keyboard');
        } else if (event.keyCode === 76) {
            changeViews('list', 'keyboard');
        } else if (event.keyCode === 77) {
            changeViews('metro', 'keyboard');
        }
    } else if (event.keyCode === 16 && hasClass(navBar, 'closed')) {
        openSidebar();
    }
});