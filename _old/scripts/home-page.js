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
      
      // Add event listeners for unit buttons
      unitButtons.forEach(btn => {
        console.log('Adding event listener to button:', btn.textContent);
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          
          const units = this.getAttribute('data-units');
          console.log('Unit button clicked:', units);
          
          // Show popup with exam options
          if (units === '5') {
            console.log('=== Calling showExamPopup ===');
            showExamPopup();
          } else {
            // For other units, show "coming soon" message
            alert(`${units} יח״ל בפיתוח - בקרוב!`);
          }
        });
      });

      this.initialized = true;
      return true;
    }, 300); // Add delay to ensure DOM is updated
    
    return true; // Return success to not block the process
  },
  
  // Показать popup с выбором экзаменов
  showExamPopup: function() {
    console.log('=== showExamPopup called ===');
    const popup = document.getElementById('popup');
    console.log('Popup element found:', popup ? true : false);
    
    if (!popup) {
      console.error('Popup element not found');
      return;
    }
    
    console.log('Updating popup HTML...');
    
    // Обновляем содержимое popup в исходном стиле
    popup.innerHTML = `
      <div class="popup">
        <p>בחר שאלון</p>
        <div class="popup-buttons">
          <button onclick="homePage.navigateToExam('35571'); console.log('35571 button clicked');">35571</button>
          <button onclick="homePage.navigateToExam('35572'); console.log('35572 button clicked');">35572</button>
        </div>
      </div>
    `;
    
    popup.style.display = 'flex';
    
    // Добавляем обработчик клика по overlay для закрытия
    popup.onclick = function(e) {
      if (e.target === popup) {
        homePage.closePopup();
      }
    };
    
    // Автоматическое закрытие через 3 секунды
    this.popupTimer = setTimeout(() => {
      this.closePopup();
    }, 3000);
  },
  
  // Навигация к экзамену
  navigateToExam: function(examNumber) {
    console.log('=== navigateToExam called ===');
    console.log('Exam number:', examNumber);
    console.log('window.pageLoader exists:', typeof window.pageLoader !== 'undefined');
    console.log('window.pageLoader.loadPage exists:', typeof window.pageLoader?.loadPage === 'function');
    
    this.closePopup(); // Закрываем popup и очищаем таймер
    
    if (typeof window.pageLoader !== 'undefined' && typeof window.pageLoader.loadPage === 'function') {
      const pagePath = `courses/5-units/${examNumber}/${examNumber}-index`;
      console.log('Loading exam page with path:', pagePath);
      console.log('Full URL will be: pages/' + pagePath + '.html');
      
      window.pageLoader.loadPage(pagePath)
        .then(() => {
          console.log('Page loaded successfully');
        })
        .catch(error => {
          console.error('Error loading page:', error);
        });
    } else {
      console.error('Page loader not available or loadPage is not a function');
      console.log('window.pageLoader:', window.pageLoader);
    }
  },
  
  // Закрыть popup
  closePopup: function() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
      // Удаляем обработчик клика
      popup.onclick = null;
    }
    
    // Очищаем таймер автоматического закрытия
    if (this.popupTimer) {
      clearTimeout(this.popupTimer);
      this.popupTimer = null;
    }
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

// Глобальная функция для показа popup экзаменов
window.showExamPopup = function() {
  return homePage.showExamPopup();
};

// Функция для тестирования навигации
window.testNavigation = function(examNumber) {
  console.log('=== Testing navigation to exam:', examNumber, '===');
  console.log('pageLoader exists:', typeof window.pageLoader !== 'undefined');
  console.log('pageNavigator exists:', typeof window.pageNavigator !== 'undefined');
  
  if (window.pageLoader && window.pageLoader.loadPage) {
    const path = `courses/5-units/${examNumber}/${examNumber}-index`;
    console.log('Trying to load:', path);
    window.pageLoader.loadPage(path)
      .then(() => console.log('SUCCESS: Page loaded'))
      .catch(err => console.error('ERROR:', err));
  } else {
    console.error('PageLoader not available');
  }
};
