// search.js
// Handles header search box open/close logic

function initSearchScripts() {
  const searchBtn = document.getElementById('search-btn');
  const searchWrapper = document.getElementById('search-wrapper');
  const searchBox = document.getElementById('search-container');
  const searchInput = document.getElementById('search-input');
  
  if (searchBtn && searchWrapper && searchInput && searchBox) {
    // Определяем направление текста
    const isRTL = document.documentElement.dir === 'rtl';
    
    // Определяем направление для поля поиска
    if (isRTL) {
      // RTL-специфичные настройки
      searchInput.style.direction = 'rtl';
    }
    
    // Обработчик клика по иконке поиска
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Переключаем класс открытия
      if (!searchWrapper.classList.contains('open')) {
        // Открываем поле
        searchWrapper.classList.add('open');
        
        // Сначала устанавливаем стиль перехода до изменения свойств
        searchBox.style.transition = 'width 0.3s ease-out, opacity 0.3s ease-out';
        
        // Устанавливаем фокус после небольшой задержки
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      } else {
        // Закрываем поле
        searchWrapper.classList.remove('open');
      }
    });
    
    // Закрываем при клике вне области поиска
    document.addEventListener('click', (e) => {
      if (!searchWrapper.contains(e.target)) {
        searchWrapper.classList.remove('open');
      }
    });
  }
}
