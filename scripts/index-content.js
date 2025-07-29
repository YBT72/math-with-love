/* JavaScript для обработки интерактивных элементов главной страницы */

// Функция инициализации, которая будет вызвана, когда скрипт загрузится
function initIndexContent() {
  // Получаем ссылки на элементы popup
  const popup = document.getElementById('popup');
  const popupButtons = document.querySelectorAll('.popup-buttons button');
  const unitButtons = document.querySelectorAll('.unit-btn');
  
  // Добавляем обработчики событий для кнопок единиц изучения
  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const exams = btn.dataset.exams.split(',');
      // Обновляем текст кнопок в popup с соответствующими номерами экзаменов
      if (popupButtons.length >= 2) {
        popupButtons[0].textContent = exams[0];
        popupButtons[1].textContent = exams[1];
      }
      // Отображаем popup
      popup.style.display = 'flex';
    });
  });
  
  // Закрытие popup при клике вне его области
  if (popup) {
    document.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
    
    // Закрытие popup при клике на кнопку внутри него
    popupButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    });
  }
}

// Выполняем инициализацию при загрузке скрипта
initIndexContent();
