/**
 * Page Navigator - модуль для навигации между страницами
 * Обрабатывает загрузку контента из разных страниц в основной index.html
 */

// Объект для хранения путей к страницам и их обработчиков
const pageNavigator = {
  // Маппинг страниц для загрузки
  pages: {
    'home': 'pages/home.html',
    'about': 'pages/about.html'
  },
  
  // Проверка доступности страниц при инициализации
  checkPages: function() {
    console.log('Checking page availability...');
    
    // Проверяем каждый путь
    Object.entries(this.pages).forEach(([key, path]) => {
      console.log(`Checking ${key} at path ${path}...`);
      
      fetch(path)
        .then(response => {
          if (!response.ok) {
            console.error(`Page ${key} (${path}) not available: ${response.status}`);
          } else {
            console.log(`Page ${key} (${path}) is available`);
          }
        })
        .catch(err => {
          console.error(`Error checking ${key} (${path}):`, err);
        });
    });
  },
  
  // Текущая загруженная страница
  currentPage: null,
  
  // Основной контейнер для контента
  contentContainer: document.getElementById('page-content'),
  
  /**
   * Загружает контент указанной страницы в основной контейнер
   * @param {string} pageName - имя страницы из объекта pages или путь
   * @returns {Promise} - промис, который разрешается после загрузки страницы
   */
  loadPage: function(pageName) {
    console.log('Loading page:', pageName);
    
    // Если это путь к курсу, формируем полный URL
    let pageUrl;
    if (pageName.startsWith('courses/')) {
      pageUrl = `pages/${pageName}.html`;
    } else {
      pageUrl = this.pages[pageName];
    }
    
    console.log('Resolved page URL:', pageUrl);
    
    if (!pageUrl) {
      console.error(`Страница ${pageName} не найдена в конфигурации`);
      return Promise.reject(`Страница ${pageName} не найдена`);
    }
    
    // Сохраняем текущую страницу
    this.currentPage = pageName;
    
    return fetch(pageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Page content fetched successfully');
        return response.text();
      })
      .then(html => {
        console.log('Got HTML content, length:', html.length);
        
        // Убеждаемся, что contentContainer существует
        if (!this.contentContainer) {
          console.error('Content container not found!');
          this.contentContainer = document.getElementById('page-content');
          
          if (!this.contentContainer) {
            console.error('Still could not find page-content element!');
            return Promise.reject('Content container not found');
          }
        }
        
        console.log('Content container found, clearing content...');
        // Сначала полностью очищаем контейнер
        this.contentContainer.innerHTML = '';
        
        // Вставляем содержимое в контейнер
        console.log('Inserting HTML content, length:', html.length);
        this.contentContainer.innerHTML = html;
        
        console.log('HTML content inserted into DOM');
        console.log('Container now has children:', this.contentContainer.children.length);
        console.log('First child:', this.contentContainer.firstElementChild);
        
        if (this.contentContainer.children.length === 0) {
          console.error('No children added to container after setting innerHTML!');
        }
        
        // Загружаем стили для соответствующей страницы
        this.loadPageStyles(pageName);
        
        // Инициализируем события для загруженной страницы
        this.initPageEvents(pageName);
        
        // Обновляем активный пункт в меню
        this.updateActiveMenuItem(pageName);
        
        // Обновляем заголовок страницы
        this.updatePageTitle(pageName);
        
        return html;
      })
      .catch(error => {
        console.error('Ошибка при загрузке страницы:', error);
        this.contentContainer.innerHTML = `<div class="error-message">Ошибка загрузки страницы: ${error.message}</div>`;
      });
  },
  
  /**
   * Загружает стили для указанной страницы
   * @param {string} pageName - имя страницы
   */
  loadPageStyles: function(pageName) {
    // Стили для основных страниц уже загружены в main.css
    console.log(`Страница ${pageName} загружена, стили применены из main.css`);
  },
  
  /**
   * Инициализирует события для загруженной страницы
   * @param {string} pageName - имя загруженной страницы
   */
  initPageEvents: function(pageName) {
    // Инициализация событий в зависимости от страницы
    switch (pageName) {
      case 'home':
        // Вызываем инициализацию событий для домашней страницы, если такая функция существует
        console.log('Инициализация событий для домашней страницы');
        
        // Пробуем новую функцию, с откатом на старую если необходимо
        if (typeof window.initHomePage === 'function') {
          window.initHomePage();
        } else if (typeof window.initHomePageEvents === 'function') {
          window.initHomePageEvents();
        } else {
          console.error('Функции инициализации домашней страницы не найдены!');
        }
        break;
      case 'about':
        // Пока нет специфических событий для страницы About
        console.log('Инициализация событий для страницы About');
        break;
      default:
        // По умолчанию ничего не делаем
    }
  },
  
  /**
   * Обновляет активный пункт в навигационном меню
   * @param {string} pageName - имя активной страницы
   */
  updateActiveMenuItem: function(pageName) {
    // Находим все ссылки в меню и футере
    const allLinks = document.querySelectorAll('nav ul li a, .footer-links ul li a');
    
    // Удаляем класс active у всех ссылок
    allLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Находим соответствующие ссылки по атрибуту data-page и добавляем им класс active
    allLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageName) {
        link.classList.add('active');
      }
    });
  },
  
  /**
   * Обновляет заголовок страницы в зависимости от текущей страницы
   * @param {string} pageName - имя текущей страницы
   */
  updatePageTitle: function(pageName) {
    // Определяем заголовок для каждой страницы
    let pageTitle;
    switch (pageName) {
      case 'home':
        pageTitle = 'מתמטיקה באהבה';
        break;
      case 'about':
        pageTitle = 'אודות | מתמטיקה באהבה';
        break;
      default:
        pageTitle = 'מתמטיקה באהבה';
    }
    
    // Устанавливаем новый заголовок
    document.title = pageTitle;
  },

  /**
   * Инициализирует обработчики для навигационных ссылок
   */
  init: function() {
    // Перехватываем клики по ссылкам на странице
    document.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        // Проверяем наличие атрибута data-page (для ссылок в футере)
        const pageName = event.target.getAttribute('data-page');
        if (pageName && this.pages[pageName]) {
          event.preventDefault();
          this.loadPage(pageName);
          return;
        }
        
        // Проверяем, что клик был по ссылке в навигационном меню шапки
        if (event.target.closest('nav ul') || event.target.closest('.footer-links ul')) {
          const href = event.target.getAttribute('href');
          
          // Обрабатываем только известные нам ссылки
          if (href === 'index.html' || href === '#home') {
            event.preventDefault();
            this.loadPage('home');
          } else if (href === 'pages/about.html' || href === '#about') {
            event.preventDefault();
            this.loadPage('about');
          }
        }
      }
    });
  }
};

// Экспортируем функцию инициализации
window.initPageNavigator = function() {
  console.log('Page navigator initialized');
  
  // Проверяем доступность страниц
  pageNavigator.checkPages();
  
  // Инициализируем обработчики навигации
  pageNavigator.init();
  
  // Всегда загружаем домашнюю страницу при инициализации
  console.log('Loading home page on initialization');
  pageNavigator.loadPage('home')
    .then(() => {
      console.log('Home page loaded successfully, initializing components');
      
      // Вызываем оба метода инициализации для надежности
      if (typeof window.initHomePage === 'function') {
        console.log('Calling initHomePage()');
        window.initHomePage();
      } else if (typeof window.initHomePageEvents === 'function') {
        console.log('Calling initHomePageEvents()');
        window.initHomePageEvents();
      } else {
        console.error('No home page initialization function available!');
      }
    })
    .catch(err => {
      console.error('Failed to load home page:', err);
    });
};

// Делаем pageNavigator доступным глобально
window.pageNavigator = pageNavigator;
