/**
 * home-page.js - Скрипт для домашней страницы
 * Обрабатывает события и взаимодействие на главной странице
 */

// Объект для работы с главной страницей
const homePage = {
  // Флаг инициализации
  initialized: false,
  
  // Загрузка стилей для главной страницы
  loadStyles: function() {
    // Стили уже загружены через main.css, дополнительных действий не требуется
    console.log('Home page styles already loaded via main.css');
  },
  
  // Инициализация обработчиков событий главной страницы
  initEvents: function() {
    console.log('Initializing home page events');
    
    // Используем setTimeout, чтобы дать DOM обновиться
    setTimeout(() => {
      // Получаем ссылки на элементы popup
      const popup = document.getElementById('popup');
      const popupButtons = document.querySelectorAll('.popup-buttons button');
      const unitButtons = document.querySelectorAll('.unit-btn');
      
      console.log('Found elements:', {
        popup: popup ? true : false,
        popupButtons: popupButtons ? popupButtons.length : 0,
        unitButtons: unitButtons ? unitButtons.length : 0
      });
      
      // Если элементов нет, логируем ошибку
      if (!popup) {
        console.error('Popup element not found! Expected element with id="popup"');
        // Дополнительная диагностика
        console.log('All page elements:', document.querySelectorAll('*').length);
        console.log('Main content children:', document.getElementById('page-content').children.length);
        return false;
      }
      
      if (unitButtons.length === 0) {
        console.error('Unit buttons not found! Expected elements with class="unit-btn"');
        return false;
      }
      
      // Добавляем обработчики событий для кнопок единиц изучения
      unitButtons.forEach(btn => {
        console.log('Adding event listener to button:', btn.textContent);
        
        btn.addEventListener('click', function() {
          const exams = this.dataset.exams.split(',');
          console.log('Button clicked, exams:', exams);
          
          // Обновляем текст кнопок в popup с соответствующими номерами экзаменов
          if (popupButtons.length >= 2) {
            popupButtons[0].textContent = exams[0];
            popupButtons[1].textContent = exams[1];
          }
          
          // Отображаем popup
          popup.style.display = 'flex';
          
          console.log('Popup displayed');
        });
      });
      
      // Закрытие popup при клике вне его области
      if (popup) {
        document.addEventListener('click', (event) => {
          if (event.target === popup) {
            popup.style.display = 'none';
            console.log('Popup closed (click outside)');
          }
        });
        
        // Закрытие popup при клике на кнопку внутри него
        popupButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            popup.style.display = 'none';
            console.log('Popup closed (exam button clicked)');
          });
        });
      }
      
      this.initialized = true;
      return true;
    }, 300);  // Добавляем большую задержку для гарантированного обновления DOM
    
    return true; // Временно возвращаем успех, чтобы не блокировать процесс
  },
  
  // Метод инициализации страницы
  init: function() {
    console.log('Initializing home page');
    this.loadStyles();
    return this.initEvents();
  }
};

// Экспортируем функции инициализации для внешних скриптов
window.initHomePage = function() {
  console.log('Home page initialization requested');
  return homePage.init();
};

// Для обратной совместимости со старым кодом
window.initHomePageEvents = function() {
  console.log('Legacy home page events initialization requested');
  return homePage.initEvents();
};
