(function () {

    'use strict';

    var COUNT_CHOPSTICKS = 100;
    var PREFIX_BUTTON = 'btn-';
    var PREFIX_MENU = 'menu-';

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

        generateDivider(document.getElementById('menu-divider'));

        http('GET', 'resources/menu.json', generateMenu);
    });

    function clickMenuButton() {
        var clickedId = this.id;
        //var selectedId = PREFIX_BUTTON + menuSections[selectedMenuSectionIndex];

        var selected = menuSections[selectedMenuSectionIndex];
        var selectedButtonId = PREFIX_BUTTON + selected;

        if (clickedId !== selectedButtonId) {
            var selectedSectionId = PREFIX_MENU + selected;

            document.getElementById(selectedButtonId).classList.remove('menu-btn-selected');
            document.getElementById(selectedSectionId).classList.remove('menu-section-selected');

            this.classList.add('menu-btn-selected');

            selectedMenuSectionIndex = menuSections.indexOf(clickedId.substr(PREFIX_BUTTON.length));

            document.getElementById(PREFIX_MENU + menuSections[selectedMenuSectionIndex]).classList.add('menu-section-selected');
        }
    }

    function http(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(this.responseText);
            }
        };
        xhr.send();
    }

    function generateDivider(parent) {
        var content = '';
        for (var i = 0; i < COUNT_CHOPSTICKS; i++) {
            content += 'X ';
        }

        var divider = document.createElement('div');
        divider.classList.add('menu-divider');
        divider.innerText = content;

        parent.appendChild(divider);
    }

    function generateMenu(response) {
        var menu = JSON.parse(response).menu;
        for (var i = 0; i < menu.length; i++) {
            var menuSection = document.getElementById(PREFIX_MENU + menuSections[i]);
            for (var j = 0; j < menu[i].sections.length; j++) {
                var section = menu[i].sections[j];

                var title = document.createElement('h2');
                title.innerText = section.title;
                menuSection.appendChild(title);

                if (section.description) {
                    var description = document.createElement('h3');
                    description.innerText = section.description;
                    menuSection.appendChild(description);
                }

                var table = document.createElement('table');
                for (var k = 0; k < section.items.length; k++) {
                    var item = section.items[k];

                    var row = document.createElement('tr');

                    var name = document.createElement('td');
                    var price = document.createElement('td');

                    var nameText = item.name;
                    if (item.description) {
                        nameText = nameText + ' (' + item.description + ')';
                    }
                    if (item.id) {
                        nameText = item.id + '. ' + nameText;
                    }

                    name.innerText = nameText;
                    price.innerText = item.price.toFixed(2);

                    row.appendChild(name);
                    row.appendChild(price);

                    table.appendChild(row);
                }
                menuSection.appendChild(table);
            }
        }

        generateDivider(document.getElementById('menu-wrapper'));
    }
})();