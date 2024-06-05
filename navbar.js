const menuIcon = document.getElementById('menu-icon');
const navList = document.getElementById('nav-list');

// Toggle nav list display on menu icon click
menuIcon.addEventListener('click', function () {
    navList.classList.toggle('active');
    menuIcon.classList.toggle('rotate');
});



