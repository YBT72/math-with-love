/**
 * page-loader.js - Центральный скрипт для координации загрузки и инициализации страницы
 */

// Объект для управления загрузкой всех компонентов страницы
const pageLoader = {
  // Флаги состояния загрузки компонентов
  loaded: {
    homeScript: false,
    navigatorScript: false
  },

  // Загружает скрипт и возвращает промис, который разрешается, когда скрипт загружен
  loadScript: function(src) {
    return new Promise((resolve, reject) => {
      console.log(`Loading script: ${src}`);
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log(`Script loaded successfully: ${src}`);
        resolve(script);
      };
      script.onerror = () => {
        console.error(`Failed to load script: ${src}`);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.body.appendChild(script);
    });
  },

  // Загружает компоненты в правильном порядке
  init: function() {
    console.log('Page loader initializing...');

    // Загружаем скрипты в строгом порядке
    Promise.resolve()
      .then(() => this.loadScript('scripts/home-page.js'))
      .then(() => {
        console.log('Home page script loaded');
        // Проверяем загруженную функцию
        console.log('initHomePage available:', typeof window.initHomePage === 'function');
        
        return this.loadScript('scripts/page-navigator.js');
      })
      .then(() => {
        console.log('Page navigator script loaded');
        // Проверяем загруженную функцию
        console.log('initPageNavigator available:', typeof window.initPageNavigator === 'function');
        
        if (typeof window.initPageNavigator === 'function') {
          // Даём небольшую паузу для стабилизации DOM
          setTimeout(() => {
            console.log('Initializing page navigator...');
            window.initPageNavigator();
            
            // Активируем отладчик
            if (document.getElementById('debug-info')) {
              document.getElementById('debug-info').style.display = 'block';
            }
          }, 100);
        } else {
          console.error('Page navigator initialization function not found!');
        }
      })
      .then(() => {
        console.log('All scripts loaded and initialized successfully');
      })
      .catch(error => {
        console.error('Failed to load scripts:', error);
      });
  }
};

// Запускаем загрузку сразу при загрузке скрипта
pageLoader.init();
