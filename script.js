// === 1. Логика переключения тем ===
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем, есть ли сохраненная тема в localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️ Светлая тема';
}

themeToggleBtn.addEventListener('click', () => {
    // Переключаем класс на body
    body.classList.toggle('dark-theme');
    
    // Сохраняем выбор и меняем текст кнопки
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️ Светлая тема';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙 Тёмная тема';
    }
});


// === 2. Логика фильтрации и поиска навыков ===
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const skillsList = document.querySelectorAll('#skills-list li');
const noResultsMsg = document.getElementById('no-results');

// Функция, которая применяет фильтры
function filterSkills() {
    // Получаем текущую активную категорию
    const activeBtn = document.querySelector('.filter-btn.active');
    const selectedCategory = activeBtn.getAttribute('data-category');
    
    // Получаем текст из поиска в нижнем регистре
    const searchText = searchInput.value.toLowerCase();
    
    let visibleCount = 0; // Счетчик видимых навыков

    // Проходимся по каждому элементу списка навыков
    skillsList.forEach(skill => {
        const skillCategory = skill.getAttribute('data-category');
        const skillName = skill.textContent.toLowerCase();

        // Проверяем совпадение по категории (или если выбрано "Все")
        const matchesCategory = (selectedCategory === 'all' || skillCategory === selectedCategory);
        // Проверяем совпадение по тексту поиска
        const matchesSearch = skillName.includes(searchText);

        // Если навык подходит и под категорию, и под поиск — показываем его
        if (matchesCategory && matchesSearch) {
            skill.classList.remove('hidden');
            visibleCount++;
        } else {
            skill.classList.add('hidden');
        }
    });

    // Если ни один навык не показан, выводим сообщение "Ничего не найдено"
    if (visibleCount === 0) {
        noResultsMsg.classList.remove('hidden');
    } else {
        noResultsMsg.classList.add('hidden');
    }
}

// Слушаем клики по кнопкам категорий
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем класс active у всех кнопок и вешаем на нажатую
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        // Запускаем пересчет фильтров
        filterSkills();
    });
});

// Слушаем ввод текста в поле поиска
searchInput.addEventListener('input', () => {
    // Запускаем пересчет фильтров при каждом введенном символе
    filterSkills();
});