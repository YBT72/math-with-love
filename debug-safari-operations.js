const { exec } = require('child_process');
const path = require('path');

// Путь к файлу operations.html
const htmlFile = path.join(__dirname, 'assets/widgets/vectors/operations.html');

console.log('🚀 Запуск отладки operations.html в Safari...');
console.log('📂 Файл:', htmlFile);

// Проверяем, запущен ли Live Server
exec('lsof -i :5500', (error, stdout) => {
    if (stdout && stdout.includes('5500')) {
        console.log('✅ Live Server обнаружен на порту 5500');
        
        // Открываем через Live Server для лучшей отладки
        const liveServerUrl = 'http://127.0.0.1:5500/assets/widgets/vectors/operations.html';
        exec(`open -a Safari "${liveServerUrl}"`, (error) => {
            if (error) {
                console.error('❌ Ошибка при открытии Safari:', error);
                return;
            }
            console.log('🍎 Safari открыт с operations.html через Live Server');
            console.log('🌐 URL:', liveServerUrl);
            console.log('');
            console.log('📋 Инструкции по отладке:');
            console.log('1. В Safari: Разработка → Веб-инспектор');
            console.log('2. Перейдите на вкладку "Sources" для breakpoints');
            console.log('3. Используйте "Console" для логов и debugger;');
            console.log('4. Вкладка "Elements" для инспекции DOM');
        });
    } else {
        console.log('⚠️  Live Server не запущен');
        console.log('💡 Запустите Live Server для лучшей отладки:');
        console.log('   - Правый клик на operations.html → "Open with Live Server"');
        console.log('   - Или нажмите "Go Live" в статус-баре VS Code');
        console.log('');
        console.log('📁 Открываем локальный файл...');
        
        // Открываем локальный файл как резервный вариант
        exec(`open -a Safari "${htmlFile}"`, (error) => {
            if (error) {
                console.error('❌ Ошибка при открытии Safari:', error);
                return;
            }
            console.log('🍎 Safari открыт с локальным файлом');
            console.log('🔧 Для отладки: Разработка → Веб-инспектор');
        });
    }
});