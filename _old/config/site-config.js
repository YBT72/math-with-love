/**
 * site-config.js
 * Общие настройки сайта
 */

const SITE_CONFIG = {
    // Основные настройки сайта
    siteName: 'מתמטיקה באהבה',
    siteDescription: 'לימוד מדויק, פשוט ואישי!',
    siteUrl: window.location.origin,
    
    // Языковые настройки
    language: 'he',
    direction: 'rtl',
    
    // Образовательные уровни
    educationLevels: {
        '3-units': {
            name: '3 יח״ל',
            exams: ['35371', '35372'],
            description: 'מתמטיקה לרמת 3 יחידות לימוד'
        },
        '4-units': {
            name: '4 יח״ל', 
            exams: ['35471', '35472'],
            description: 'מתמטיקה לרמת 4 יחידות לימוד'
        },
        '5-units': {
            name: '5 יח״ל',
            exams: ['35571', '35572'],
            description: 'מתמטיקה לרמת 5 יחידות לימוד'
        }
    },
    
    // Пути к ресурсам
    paths: {
        pages: 'pages/',
        courses: 'pages/courses/',
        assets: 'assets/',
        scripts: 'scripts/',
        styles: 'styles/',
        config: 'config/'
    },
    
    // Настройки отладки
    debug: {
        enabled: true,
        showLoadingTimes: true,
        logLevel: 'info' // 'error', 'warn', 'info', 'debug'
    }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
} else {
    window.SITE_CONFIG = SITE_CONFIG;
}
