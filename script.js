const themeSwitch = document.getElementById('header__theme-checkbox');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

const searchInput = document.getElementById('skills__search-input');
const filterBtns = document.querySelectorAll('.skills__btn');
const skillItems = document.querySelectorAll('.skills__item');
const emptyMessage = document.getElementById('skills__empty-msg');

let currentCategory = 'all';
let searchTerm = '';

function filterSkills() {
    let visibleCount = 0;
    let delay = 0;

    skillItems.forEach(item => {
        item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        item.style.transitionDelay = '0s';
        item.classList.remove('is-visible');
    });
    emptyMessage.classList.remove('is-visible');

    setTimeout(() => {
        skillItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemText = item.textContent.toLowerCase();
            
            const categoryMatch = currentCategory === 'all' || itemCategory === currentCategory;
            const searchMatch = itemText.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                item.classList.remove('is-hidden');
                visibleCount++;
            } else {
                item.classList.add('is-hidden');
            }
        });

        if (visibleCount === 0) {
            emptyMessage.classList.remove('is-hidden');
            setTimeout(() => emptyMessage.classList.add('is-visible'), 20);
        } else {
            emptyMessage.classList.add('is-hidden');
        }

        skillItems.forEach(item => {
            if (!item.classList.contains('is-hidden')) {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s, border-color 0.3s, color 0.3s';
                item.style.transitionDelay = `${delay}s, ${delay}s, 0s, 0s, 0s`;
                
                setTimeout(() => item.classList.add('is-visible'), 20);
                delay += 0.05;
            }
        });

    }, 250);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.classList.contains('skills__btn--active')) return;

        filterBtns.forEach(b => b.classList.remove('skills__btn--active'));
        e.target.classList.add('skills__btn--active');
        currentCategory = e.target.getAttribute('data-filter');
        filterSkills();
    });
});

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    filterSkills();
});

filterSkills();