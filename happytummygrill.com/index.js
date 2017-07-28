(function () {

    'use strict';

    var PREFIX_BUTTON = 'btn-';
    var PREFIX_TABLE = 'tbl-';

    var menuSections = [
        'teriyaki-combinations',
        'yakisoba-fried-rice',
        'stir-fry-chinese-express',
        'noodle-soup-salads',
        'side-orders'
    ];

    var selectedMenuSectionIndex = 0;

    window.addEventListener('load', function () {
        for (var i = 0; i < menuSections.length; i++) {
            document.getElementById(PREFIX_BUTTON + menuSections[i]).addEventListener('click', clickMenuButton);
        }

        http('GET', 'resources/menu.json', function () {
            console.log(this.responseText);
        });
    });

    function clickMenuButton() {
        var clickedId = this.id;
        var selectedId = PREFIX_BUTTON + menuSections[selectedMenuSectionIndex];

        if (clickedId !== selectedId) {
            document.getElementById(selectedId).classList.remove('menu-btn-selected');
            this.classList.add('menu-btn-selected');
            selectedMenuSectionIndex = menuSections.indexOf(clickedId.substr(PREFIX_BUTTON.length));
        }
    }

    function http(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = callback;
        xhr.send();
    }
})();