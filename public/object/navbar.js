const menuIcon = document.getElementById('menu-icon');
const navList = document.getElementById('nav-list');
const navbarObject = document.getElementById('navbarObject');


menuIcon.addEventListener('click', function () {
    navList.classList.toggle('active');
    menuIcon.classList.toggle('rotate');
    window.parent.document.getElementById('navbarObject').classList.toggle('active');
    window.parent.document.getElementById('navbarObject').height = "500"
});



