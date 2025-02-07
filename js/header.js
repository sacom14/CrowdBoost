const toggleNavBtn = document.getElementById('toggle-nav-btn');
const navList = document.getElementById('nav-list');
const navLink = document.querySelectorAll('.nav-link');

toggleNavBtn.addEventListener('click', () => {
    navList.classList.toggle("nav-list--visible");
});

navLink.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.toggle("nav-list--visible");
    });
});
