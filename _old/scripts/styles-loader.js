/**
 * styles-loader.js - Утилита для динамической загрузки стилей
 */

// Объект для управления стилями
const StylesLoader = {
  /**
   * Загружает CSS-файл
   * @param {string} href - Путь к CSS-файлу
   * @param {string} [id] - Опциональный ID для элемента link
   * @param {Object} [attributes] - Дополнительные атрибуты для элемента link
   * @returns {Promise} - Promise, который разрешается, когда стиль загружен
   */
  loadStyles: function(href, id, attributes = {}) {
    return new Promise((resolve, reject) => {
      // Проверяем, не загружен ли уже этот файл
      if (id && document.getElementById(id)) {
        resolve(); // Файл уже загружен
        return;
      }
      
      if (!id && document.querySelector(`link[href="${href}"]`)) {
        resolve(); // Файл уже загружен (проверка по href)
        return;
      }
      
      // Создаем элемент link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      
      if (id) {
        link.id = id;
      }
      
      // Добавляем дополнительные атрибуты
      for (const [key, value] of Object.entries(attributes)) {
        link.setAttribute(key, value);
      }
      
      // Обработчик загрузки
      link.onload = () => {
        resolve();
      };
      
      // Обработчик ошибки
      link.onerror = () => {
        console.error(`Не удалось загрузить стиль: ${href}`);
        reject(new Error(`Не удалось загрузить стиль: ${href}`));
      };
      
      // Добавляем элемент в head
      document.head.appendChild(link);
    });
  },
  
  /**
   * Удаляет CSS-файл
   * @param {string} id - ID элемента link или href
   */
  removeStyles: function(id) {
    // Сначала пытаемся найти по ID
    let linkElement = document.getElementById(id);
    
    // Если не нашли по ID, ищем по href
    if (!linkElement) {
      linkElement = document.querySelector(`link[href="${id}"]`);
    }
    
    // Если нашли, удаляем
    if (linkElement) {
      linkElement.parentNode.removeChild(linkElement);
    }
  },
  
  /**
   * Загружает группу стилей
   * @param {string[]} styles - Массив путей к CSS-файлам
   * @param {string} [prefix] - Префикс для ID
   * @returns {Promise} - Promise, который разрешается, когда все стили загружены
   */
  loadStylesGroup: function(styles, prefix = '') {
    const promises = styles.map((href, index) => {
      const id = prefix ? `${prefix}-style-${index}` : '';
      return this.loadStyles(href, id);
    });
    
    return Promise.all(promises);
  },
  
  /**
   * Удаляет все стили с определенным атрибутом
   * @param {string} attributeName - Имя атрибута
   * @param {string} attributeValue - Значение атрибута (опционально)
   */
  removeStylesByAttribute: function(attributeName, attributeValue) {
    let selector = `link[${attributeName}]`;
    
    if (attributeValue) {
      selector = `link[${attributeName}="${attributeValue}"]`;
    }
    
    const links = document.querySelectorAll(selector);
    links.forEach(link => {
      link.parentNode.removeChild(link);
    });
  }
};

// Экспортируем для использования в других скриптах
window.StylesLoader = StylesLoader;
