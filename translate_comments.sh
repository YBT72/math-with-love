#!/bin/bash

# Script to translate Russian comments to English in operations.html

FILE="assets/widgets/vectors/operations.html"

# Create backup
cp "$FILE" "${FILE}.backup"

# CSS comments translations
sed -i '' 's|/\* Кнопки очистки \*/|/* Clear buttons */|g' "$FILE"
sed -i '' 's|/\* Увеличиваем ширину \*/|/* Increase width */|g' "$FILE"
sed -i '' 's|/\* Контейнер для обоих переключателей \*/|/* Container for both toggles */|g' "$FILE"
sed -i '' 's|/\* Уменьшаем зазор с 30px до 15px \*/|/* Reduce gap from 30px to 15px */|g' "$FILE"
sed -i '' 's|/\* Центрируем кнопку \*/|/* Center button */|g' "$FILE"
sed -i '' 's|/\* Заголовок не сжимается \*/|/* Header doesn'\''t shrink */|g' "$FILE"

# JavaScript comments translations
sed -i '' 's|// 3 секунды на этап|// 3 seconds per step|g' "$FILE"
sed -i '' 's|// Векторы, созданные в процессе операции|// Vectors created during operation|g' "$FILE"
sed -i '' 's|// Пунктирные линии для геометрических фигур|// Dashed lines for geometric figures|g' "$FILE"
sed -i '' 's|// Переменные для сравнения методов|// Variables for method comparison|g' "$FILE"
sed -i '' 's|// Результирующие векторы обоих методов|// Result vectors of both methods|g' "$FILE"
sed -i '' 's|// Предыдущий результат для сравнения методов|// Previous result for method comparison|g' "$FILE"
sed -i '' 's|// Функция подсчета использования каждой точки|// Function to count usage of each point|g' "$FILE"
sed -i '' 's|// Подсчитываем использование каждой точки|// Count usage of each point|g' "$FILE"
sed -i '' 's|// Считаем сколько векторов используют эту точку как начальную или конечную|// Count how many vectors use this point as start or end|g' "$FILE"
sed -i '' 's|// Функция получения смещения ярлыка для точки с несколькими векторами|// Function to get label offset for point with multiple vectors|g' "$FILE"
sed -i '' 's|// Стандартное смещение|// Standard offset|g' "$FILE"
sed -i '' 's|// Смещение по спирали для нескольких векторов|// Spiral offset for multiple vectors|g' "$FILE"
sed -i '' 's|// Увеличиваем радиус для каждого следующего ярлыка|// Increase radius for each next label|g' "$FILE"
sed -i '' 's|// Функция для генерации уникального имени точки с учетом уже существующих|// Function to generate unique point name considering existing ones|g' "$FILE"
sed -i '' 's|// Если базовое имя не занято, используем его|// If base name is not taken, use it|g' "$FILE"
sed -i '' 's|// Если занято, добавляем дополнительные апострофы|// If taken, add additional apostrophes|g' "$FILE"
sed -i '' 's|// Функция поиска ближайшей точки в заданном радиусе|// Function to find nearest point within given radius|g' "$FILE"
sed -i '' 's|// Функция поиска существующего результирующего вектора с такими же координатами|// Function to find existing result vector with same coordinates|g' "$FILE"
sed -i '' 's|// Функция для удаления дублирующих результирующих точек|// Function to remove duplicate result points|g' "$FILE"
sed -i '' 's|// Находим все точки в том же месте, что и конечная точка существующего вектора|// Find all points at same location as existing vector end point|g' "$FILE"
sed -i '' 's|// Не удаляем исходную точку|// Do not remove original point|g' "$FILE"
sed -i '' 's|// Удаляем дублирующие точки из основного массива|// Remove duplicate points from main array|g' "$FILE"
sed -i '' 's|// Проверяем операционные векторы, которые могли ссылаться на удаленные точки|// Check operation vectors that might reference deleted points|g' "$FILE"
sed -i '' 's|// Обновляем ссылки на конечные точки, если они указывали на удаленную точку|// Update end point references if they pointed to deleted point|g' "$FILE"
sed -i '' 's|// ОБНОВЛЯЕМ СЧЕТЧИК ИСПОЛЬЗОВАНИЯ ТОЧЕК|// UPDATE POINT USAGE COUNTER|g' "$FILE"
sed -i '' 's|// Цвета|// Colors|g' "$FILE"
sed -i '' 's|// Очищаем все массивы|// Clear all arrays|g' "$FILE"
sed -i '' 's|// Останавливаем анимацию|// Stop animation|g' "$FILE"
sed -i '' 's|// Сбрасываем состояние|// Reset state|g' "$FILE"
sed -i '' 's|// Скрываем контекстное меню если оно открыто|// Hide context menu if open|g' "$FILE"
sed -i '' 's|// Обновляем список векторов и интерфейс|// Update vectors list and interface|g' "$FILE"
sed -i '' 's|// Перерисовываем пустой канвас|// Redraw empty canvas|g' "$FILE"
sed -i '' 's|// Перерисовываем для обновления подсветки|// Redraw to update highlighting|g' "$FILE"

echo "Translation completed. Original file backed up as ${FILE}.backup"
echo "Remaining Russian text lines:"
grep -c "[а-яё]" "$FILE"