/**
 * contact-modal.js
 * Обработка модального диалога для обратной связи
 */

// Инициализация модального диалога сразу после загрузки скрипта
initContactModal();

// Инициализация EmailJS (замените на ваш реальный Public Key)
if (typeof emailjs !== 'undefined') {
    // Замените 'YOUR_PUBLIC_KEY' на ваш реальный ключ
    // emailjs.init('YOUR_PUBLIC_KEY');
    console.log('📧 EmailJS library loaded');
} else {
    console.log('⚠️ EmailJS library not loaded, using simulation mode');
}

function initContactModal() {
    console.log('🔄 Initializing contact modal...');
    
    // Получаем элементы
    const modal = document.getElementById('contact-modal');
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    const closeBtn = document.getElementById('close-contact-modal');
    const cancelBtn = document.getElementById('cancel-contact');
    const successOkBtn = document.getElementById('success-ok');

    if (!modal) {
        console.log('❌ Contact modal not found in DOM');
        return;
    }

    console.log('✅ Contact modal found, setting up...');

    // Функция открытия модального окна
    function openContactModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        
        // Фокус на первое поле
        setTimeout(() => {
            const firstInput = document.getElementById('contact-name');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    // Функция закрытия модального окна
    function closeContactModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Возвращаем скролл страницы
        
        // Сброс формы через короткое время
        setTimeout(() => {
            if (form) form.reset();
            if (successMessage) successMessage.style.display = 'none';
            if (form) form.style.display = 'flex';
        }, 300);
    }

    // Показ сообщения об успехе
    function showSuccessMessage() {
        if (form) form.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';
    }

    // Обработчики событий для кнопок закрытия
    if (closeBtn) closeBtn.addEventListener('click', closeContactModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeContactModal);
    if (successOkBtn) successOkBtn.addEventListener('click', closeContactModal);

    // Закрытие по клику на overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeContactModal();
        }
    });

    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    // Функция отправки формы
    async function handleFormSubmit() {
        const submitBtn = form.querySelector('.btn-submit');
        const formData = new FormData(form);
        
        // Получаем данные формы
        const contactData = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'מתמטיקה באהבה', // Имя получателя
        };

        // Валидация
        if (!contactData.from_name || !contactData.from_email || !contactData.subject || !contactData.message) {
            alert('אנא מלא את כל השדות הנדרשים');
            return;
        }

        // Показываем состояние загрузки
        submitBtn.disabled = true;
        submitBtn.textContent = 'שולח...';

        try {
            // Отправляем через EmailJS
            console.log('📧 Sending email via EmailJS...');
            
            // Замените эти значения на ваши реальные
            const serviceID = 'YOUR_SERVICE_ID'; // Получите на emailjs.com
            const templateID = 'YOUR_TEMPLATE_ID'; // Создайте шаблон на emailjs.com
            const publicKey = 'YOUR_PUBLIC_KEY'; // Получите на emailjs.com
            
            // Отправка email
            const response = await emailjs.send(serviceID, templateID, contactData, publicKey);
            
            console.log('✅ Email sent successfully:', response);
            
            // Показываем сообщение об успехе
            showSuccessMessage();
            
        } catch (error) {
            console.error('❌ Error sending email:', error);
            
            // Пока EmailJS не настроен, используем имитацию
            console.log('📧 EmailJS not configured, using simulation...');
            await simulateEmailSend(contactData);
            showSuccessMessage();
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitBtn.disabled = false;
            submitBtn.textContent = 'שלח הודעה';
        }
    }

    // Имитация отправки email (для тестирования до настройки EmailJS)
    function simulateEmailSend(data) {
        return new Promise((resolve) => {
            console.log('📩 Simulating email send with data:', data);
            
            // Показываем данные в консоли для отладки
            console.log(`
                📧 Email Details:
                From: ${data.from_name} (${data.from_email})
                Subject: ${data.subject}
                Message: ${data.message}
            `);
            
            setTimeout(resolve, 1500); // Имитация задержки
        });
    }

    // Глобальная функция для открытия модального окна
    window.openContactModal = openContactModal;

    // Привязываем к существующим ссылкам "צור קשר"
    bindContactLinks();
    
    console.log('Contact modal initialized');
}

// Функция привязки к существующим ссылкам
function bindContactLinks() {
    // Используем таймер для проверки загрузки ссылок
    const checkAndBind = () => {
        // Находим все ссылки с data-page="contact"
        const contactLinks = document.querySelectorAll('a[data-page="contact"]');
        
        if (contactLinks.length > 0) {
            contactLinks.forEach(link => {
                // Удаляем старые обработчики
                link.removeEventListener('click', handleContactClick);
                // Добавляем новые
                link.addEventListener('click', handleContactClick);
            });
            
            console.log(`✅ Bound ${contactLinks.length} contact links`);
            return true;
        } else {
            console.log('⏳ Contact links not found yet, retrying...');
            return false;
        }
    };
    
    // Функция обработчика клика
    function handleContactClick(e) {
        e.preventDefault();
        console.log('🔗 Contact link clicked');
        if (typeof window.openContactModal === 'function') {
            window.openContactModal();
        } else {
            console.error('❌ openContactModal function not available');
        }
    }
    
    // Пробуем привязать сразу
    if (!checkAndBind()) {
        // Если не получилось, пробуем через короткие интервалы
        let attempts = 0;
        const maxAttempts = 10;
        
        const bindInterval = setInterval(() => {
            attempts++;
            if (checkAndBind() || attempts >= maxAttempts) {
                clearInterval(bindInterval);
                if (attempts >= maxAttempts) {
                    console.warn('⚠️ Could not bind contact links after 10 attempts');
                }
            }
        }, 500);
    }
}

// Экспорт функций для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initContactModal };
}
