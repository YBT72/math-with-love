/**
 * emailjs-config.js
 * Конфигурация для EmailJS сервиса
 * 
 * Инструкция по настройке:
 * 1. Зарегистрируйтесь на https://www.emailjs.com
 * 2. Настройте Email Service и получите Service ID
 * 3. Создайте Email Template и получите Template ID  
 * 4. Получите Public Key в настройках аккаунта
 * 5. Замените значения ниже на ваши реальные
 */

// Конфигурация EmailJS
const EMAIL_CONFIG = {
    // Замените на ваши реальные значения из EmailJS
    serviceID: 'YOUR_SERVICE_ID',           // Например: 'service_xyz123'
    templateID: 'YOUR_TEMPLATE_ID',         // Например: 'template_abc789'
    publicKey: 'YOUR_PUBLIC_KEY',           // Например: 'user_def456'
    
    // Настройки отправки
    settings: {
        timeout: 10000,                     // Таймаут в миллисекундах
        retryAttempts: 3,                   // Количество попыток при ошибке
        
        // Тема письма по умолчанию (если не выбрана в форме)
        defaultSubject: 'צור קשר מהאתר',
        
        // Имя получателя (отображается в письме)
        recipientName: 'מתמטיקה באהבה'
    }
};

// Проверка готовности конфигурации
EMAIL_CONFIG.isConfigured = function() {
    return this.serviceID !== 'YOUR_SERVICE_ID' && 
           this.templateID !== 'YOUR_TEMPLATE_ID' && 
           this.publicKey !== 'YOUR_PUBLIC_KEY';
};

// Экспортируем для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAIL_CONFIG;
} else {
    window.EMAIL_CONFIG = EMAIL_CONFIG;
}
