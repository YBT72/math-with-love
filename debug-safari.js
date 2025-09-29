const { exec } = require('child_process');
const path = require('path');

// Путь к вашему HTML файлу operations.html
const htmlFile = path.join(__dirname, 'assets/widgets/vectors/operations.html');

// Проверяем, запущен ли Live Server
exec('lsof -i :5500', (error, stdout) => {
    if (stdout && stdout.includes('5500')) {
        console.log('✅ Live Server запущен на порту 5500');
        
        // Открываем через Live Server
        const liveServerUrl = 'http://127.0.0.1:5500/assets/widgets/vectors/operations.html';
        exec(`open -a Safari "${liveServerUrl}"`, (error) => {
            if (error) {
                console.error('❌ Ошибка при открытии Safari:', error);
                return;
            }
            console.log('🍎 Safari открыт с Live Server URL');
            console.log('📍 URL:', liveServerUrl);
            console.log('🔧 Для отладки: Разработка → Веб-инспектор');
        });
    } else {
        console.log('⚠️  Live Server не запущен. Открываем локальный файл...');
        
        // Открываем локальный файл
        exec(`open -a Safari "${htmlFile}"`, (error) => {
            if (error) {
                console.error('❌ Ошибка при открытии Safari:', error);
                return;
            }
            console.log('🍎 Safari открыт с локальным файлом');
            console.log('📁 Файл:', htmlFile);
            console.log('🔧 Для отладки: Разработка → Веб-инспектор');
            console.log('💡 Рекомендуется запустить Live Server для лучшей отладки');
        });
    }
});