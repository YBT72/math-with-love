/**
 * test-fetch.js - Тестовый скрипт для проверки загрузки HTML через fetch
 */

// Этот скрипт можно запустить из консоли браузера для проверки загрузки файлов
console.log('Testing fetch for home.html...');

fetch('pages/home.html')
  .then(response => {
    console.log('Fetch response:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(html => {
    console.log('Home HTML content length:', html.length);
    console.log('First 100 characters:', html.substring(0, 100));
  })
  .catch(error => {
    console.error('Error fetching home.html:', error);
  });

// Проверяем загрузку about.html
console.log('Testing fetch for about.html...');

fetch('pages/about.html')
  .then(response => {
    console.log('Fetch response for about:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(html => {
    console.log('About HTML content length:', html.length);
    console.log('First 100 characters:', html.substring(0, 100));
  })
  .catch(error => {
    console.error('Error fetching about.html:', error);
  });

// Проверяем вставку HTML в контейнер
console.log('Testing content insertion...');

const testContainer = document.createElement('div');
document.body.appendChild(testContainer);
testContainer.id = 'test-container';
testContainer.style.display = 'none';

fetch('pages/home.html')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(html => {
    testContainer.innerHTML = html;
    console.log('HTML inserted into test container');
    console.log('Container now has children:', testContainer.children.length);
  })
  .catch(error => {
    console.error('Error inserting HTML:', error);
  });
