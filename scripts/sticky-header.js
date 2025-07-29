/**
 * sticky-header.js
 * Добавляет динамическую тень к header при скролле
 */

document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.querySelector('.header-container');
    
    if (!headerContainer) {
        console.log('Header container not found');
        return;
    }

    // Функция для добавления/удаления класса scrolled
    function handleHeaderScroll() {
        if (window.scrollY > 20) { // Начинаем показывать тень после 20px скролла
            headerContainer.classList.add('scrolled');
        } else {
            headerContainer.classList.remove('scrolled');
        }
    }

    // Обработчик события скролла с оптимизацией через requestAnimationFrame
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleHeaderScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Проверяем начальное состояние (если страница уже прокручена при загрузке)
    handleHeaderScroll();
    
    console.log('Sticky header initialized');
});
