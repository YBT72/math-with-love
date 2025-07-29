/**
 * Скрипт для диагностики проблем с отображением контента
 */
(function() {
  // Функция для добавления отладочной информации
  function addDebugInfo(message) {
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) {
      const newLine = document.createElement('div');
      newLine.textContent = message;
      debugInfo.appendChild(newLine);
      
      // Показываем панель, если она скрыта
      debugInfo.style.display = 'block';
    } else {
      console.log('Debug panel not found:', message);
    }
  }
  
  // Функция для анализа DOM после загрузки
  function analyzeDOM() {
    // Проверяем наличие скриптов и функций
    addDebugInfo(`pageNavigator: ${typeof pageNavigator !== 'undefined' ? '✓' : '✗'}`);
    addDebugInfo(`homePage: ${typeof homePage !== 'undefined' ? '✓' : '✗'}`);
    addDebugInfo(`initPageNavigator: ${typeof window.initPageNavigator === 'function' ? '✓' : '✗'}`);
    addDebugInfo(`initHomePage: ${typeof window.initHomePage === 'function' ? '✓' : '✗'}`);
    
    // Проверяем DOM элементы
    const mainContent = document.getElementById('page-content');
    if (!mainContent) {
      addDebugInfo('⚠️ Main content container not found!');
      return;
    }
    
    addDebugInfo(`Main content: ${mainContent.children.length} children`);
    console.log('Main content children:', mainContent.children);
    
    // Проверяем наличие контента домашней страницы
    const homeContent = mainContent.querySelector('.home-content');
    if (!homeContent) {
      addDebugInfo('⚠️ Home content not found!');
    } else {
      addDebugInfo(`Home content OK: ${homeContent.children.length} children`);
      
      // Проверяем наличие контейнера
      const container = homeContent.querySelector('.container');
      if (!container) {
        addDebugInfo('⚠️ Container not found!');
      } else {
        addDebugInfo(`Container OK: ${container.children.length} children`);
        
        // Проверяем наличие текстового контента
        const content = container.querySelector('.content');
        if (!content) {
          addDebugInfo('⚠️ Content section not found!');
        } else {
          addDebugInfo(`Content OK: ${content.children.length} children`);
          
          // Проверяем заголовок
          const heading = content.querySelector('h1');
          if (!heading) {
            addDebugInfo('⚠️ H1 not found!');
          } else {
            addDebugInfo(`H1 OK: "${heading.innerText}"`);
          }
          
          // Проверяем кнопки
          const btns = content.querySelector('.btns');
          if (!btns) {
            addDebugInfo('⚠️ Buttons container not found!');
          } else {
            const buttons = btns.querySelectorAll('button');
            addDebugInfo(`Buttons OK: ${buttons.length} buttons`);
          }
        }
      }
    }
    
    // Проверяем popup
    const popup = document.getElementById('popup');
    if (!popup) {
      addDebugInfo('⚠️ Popup not found!');
    } else {
      addDebugInfo('Popup OK');
      
      // Проверяем кнопки внутри popup
      const popupButtons = popup.querySelectorAll('.popup-buttons button');
      addDebugInfo(`Popup buttons: ${popupButtons.length}`);
    }
  }
  
  // Запускаем анализ DOM через 2 секунды после загрузки
  window.addEventListener('load', () => {
    setTimeout(() => {
      addDebugInfo('DOM analysis started');
      analyzeDOM();
      
      // Включаем консоль-панель разработчика (по F12)
      addDebugInfo('Press F12 to see console output');
    }, 2000);
  });
})();
