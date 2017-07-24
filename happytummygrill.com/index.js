(function () {

    'use strict';

    var menuButtons = [
        'menu-teriyaki-combinations',
        'menu-yakisoba-fried-rice',
        'menu-stir-fry-chinese-express',
        'menu-noodle-soup-salads',
        'menu-side-orders'
    ];

    var selectedMenuButtonIndex = 0;

    window.addEventListener('load', function () {
        for (var i = 0; i < menuButtons.length; i++) {
            document.getElementById(menuButtons[i]).addEventListener('click', clickMenuButton);
        }
    });

    function clickMenuButton() {
        var clickedId = this.id;
        var selectedMenuButton = document.getElementById(menuButtons[selectedMenuButtonIndex]);
        if (clickedId != selectedMenuButton.id) {
            selectedMenuButton.classList.remove('menu-btn-selected');
            this.classList.add('menu-btn-selected');
            selectedMenuButtonIndex = menuButtons.indexOf(clickedId);
        }
    }
})();