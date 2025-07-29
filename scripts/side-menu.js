// side-menu.js
// Handles sidebar menu logic and navigation

function initSideMenuScripts() {
  const toggleButton = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  if (toggleButton && sideMenu) {
    toggleButton.addEventListener('click', () => {
      renderMainMenu();
      sideMenu.style.display = 'block';
      toggleButton.classList.add('active');
      // Скрываем scrollbar при открытии меню
      document.body.style.overflow = 'hidden';
    });
  }

  function renderMainMenu() {
    sideMenu.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'submenu-title';
    title.innerHTML = 'שלום לך <span id="submenu-close">✕</span>';
    sideMenu.appendChild(title);
    document.getElementById('submenu-close').onclick = closeMenu;

    const ul = document.createElement('ul');
    const menuItems = [
      { label: '3 יח"ל', submenu: [ { label: '35371', topics: ['נושא א', 'נושא ב'] }, { label: '35372', topics: ['נושא ג', 'נושא ד'] } ] },
      { label: '4 יח"ל', submenu: [ { label: '35471', topics: ['נושא ה'] }, { label: '35472', topics: ['נושא ו'] } ] },
      { label: '5 יח"ל', submenu: [ { label: '35571', topics: ['נושא ה'] }, { label: '35572', topics: ['נושא ו'] } ] },
      { label: 'עזרה' }
    ];
    for (const item of menuItems) {
      const li = document.createElement('li');
      li.innerHTML = item.label + (item.submenu ? ' <span>&rsaquo;&nbsp;&nbsp;</span>' : '');
      li.onclick = item.submenu ? () => renderSubmenu(item.label, item.submenu) : closeMenu;
      ul.appendChild(li);
    }
    sideMenu.appendChild(ul);
  }

  function renderSubmenu(titleText, subItems) {
    sideMenu.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'submenu-title';
    title.innerHTML = `<span dir="rtl" class="back-arrow">&lsaquo;&nbsp;&nbsp;${titleText}</span><span id="submenu-close">✕</span>`;
    sideMenu.appendChild(title);
    document.getElementById('submenu-close').onclick = closeMenu;
    title.querySelector('.back-arrow').addEventListener('click', () => renderMainMenu());

    const ul = document.createElement('ul');
    for (const item of subItems) {
      const li = document.createElement('li');
      li.innerHTML = item.label + (item.topics ? ' <span>&rsaquo;&nbsp;&nbsp;</span>' : '');
      li.onclick = item.topics ? () => renderSubSubmenu(item.label, item.topics, { titleText, subItems }) : closeMenu;
      ul.appendChild(li);
    }
    sideMenu.appendChild(ul);
  }

  function renderSubSubmenu(titleText, topics, prevSubmenu) {
    sideMenu.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'submenu-title';
    title.innerHTML = `<span dir="rtl" class="back-arrow">&lsaquo;&nbsp;&nbsp;${titleText}</span><span id="submenu-close">✕</span>`;
    sideMenu.appendChild(title);
    document.getElementById('submenu-close').onclick = closeMenu;
    // חזרה לרמת submenu האחרונה
    title.querySelector('.back-arrow').addEventListener('click', function() {
      if (prevSubmenu && prevSubmenu.titleText && prevSubmenu.subItems) {
        renderSubmenu(prevSubmenu.titleText, prevSubmenu.subItems);
      } else {
        renderMainMenu();
      }
    });

    const ul = document.createElement('ul');
    for (const topic of topics) {
      const li = document.createElement('li');
      li.textContent = topic;
      ul.appendChild(li);
    }
    sideMenu.appendChild(ul);
  }

  function closeMenu() {
    sideMenu.style.display = 'none';
    toggleButton.classList.remove('active');
    // Возвращаем scrollbar при закрытии меню
    document.body.style.overflow = '';
  }
}
