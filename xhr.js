// Инициализация глобальных переменных
// Предполагается, что переменные fb_dtsg и interval_id уже определены глобально

// Массив для хранения собранных ссылок на профили
let users = [];

// Текущий курсор для пагинации
let cursor = '';

// Счётчик итераций
let loop = 0;

// Максимальное количество итераций, чтобы избежать зацикливания
const maxLoops = 999;

// Количество пользователей на одну итерацию
const count = 10;

// ID поста, реакции на который вы скрапите
const feedbackTargetID = 'ВАШ_FEEDBACK_TARGET_ID'; // Замените на реальный ID поста

// Тип реакции (может быть null, если не требуется)
const reactionID = null; // Или укажите нужный тип реакции

// Масштаб изображения профиля
const scale = 2;

// Проверка существования глобальной переменной fb_dtsg
if (typeof fb_dtsg === 'undefined' || !fb_dtsg) {
    console.error('fb_dtsg не найден. Проверьте наличие токена на странице.');
} else {
    console.log('fb_dtsg найден:', fb_dtsg);
}

// Функция для формирования form_data
function buildFormData(cursor) {
    const variables = {
        count: count,
        cursor: cursor,
        feedbackTargetID: feedbackTargetID,
        reactionID: reactionID,
        scale: scale,
        id: feedbackTargetID
    };

    const formData = new URLSearchParams();
    
    // Заполните следующие поля соответствующими значениями
    formData.append('av', 'ВАШ_USER_ID'); // Замените на ваш user ID
    formData.append('__aaid', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__user', 'ВАШ_USER_ID'); // Замените на ваш user ID
    formData.append('__a', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__req', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__hs', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('dpr', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__ccg', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__rev', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__s', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__hsi', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__dyn', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__csr', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__comet_req', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение

    // Используем глобальный fb_dtsg
    formData.append('fb_dtsg', fb_dtsg); // Убедитесь, что fb_dtsg доступен глобально
    formData.append('jazoest', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('lsd', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__spin_r', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__spin_b', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('__spin_t', 'ВАШ_ЗНАЧЕНИЕ'); // Замените на соответствующее значение
    formData.append('fb_api_caller_class', 'RelayModern'); // Обычно фиксированное значение
    formData.append('fb_api_req_friendly_name', 'CometUFIReactionsDialogTabContentRefetchQuery'); // Обычно фиксированное значение
    formData.append('variables', JSON.stringify(variables));
    formData.append('server_timestamps', 'true');
    formData.append('doc_id', '9069004929826853'); // Проверьте, актуален ли doc_id

    return formData.toString();
}

// Функция для отправки запроса
function sendRequest(formData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.facebook.com/api/graphql/', true); // Асинхронный запрос

        // Установка необходимых заголовков
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Accept', '*/*');
        xhr.setRequestHeader('X-ASBD-ID', '129477'); // Обычно фиксированное значение
        xhr.setRequestHeader('X-FB-Friendly-Name', 'CometUFIReactionsDialogTabContentRefetchQuery'); // Обычно фиксированное значение

        // Установка заголовка X-FB-LSD, если fb_dtsg содержит LSD
        const lsdMatch = fb_dtsg.match(/^[^:]+/);
        if (lsdMatch) {
            xhr.setRequestHeader('X-FB-LSD', lsdMatch[0]);
        } else {
            console.warn('Не удалось извлечь X-FB-LSD из fb_dtsg');
        }

        // Обработчик ответа
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(`Ошибка ответа сервера: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Ошибка сети.');
        };

        // Отправка запроса
        xhr.send(formData);
    });
}

// Функция для обработки и парсинга ответа
function parseResponse(responseText) {
    try {
        const data_parsed = JSON.parse(responseText);
        const edges = data_parsed.data.node.reactors.edges;
        const pageInfo = data_parsed.data.node.reactors.page_info;

        // Извлечение профилей
        edges.forEach(edge => {
            if (edge.node.profile_url) {
                users.push(edge.node.profile_url);
            }
        });

        // Обновление курсора
        cursor = pageInfo.end_cursor;

        return pageInfo.has_next_page;
    } catch (error) {
        throw new Error('Ошибка при парсинге ответа: ' + error.message);
    }
}

// Функция для скачивания результатов
function downloadResults() {
    const result = users.join("\n");
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
    element.setAttribute('download', 'usersFromFacebook.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    users = [];
}

// Основная функция скрапинга
async function scrap() {
    try {
        loop += 1;
        console.log(`Итерация: ${loop}`);

        // Построение form_data
        const form_data = buildFormData(cursor);

        console.log('Отправка запроса...');
        const response = await sendRequest(form_data);
        console.log('Ответ получен. Парсинг данных...');

        const hasNextPage = parseResponse(response);
        console.log(`Найдено пользователей: ${users.length}`);

        if (!hasNextPage || loop >= maxLoops) {
            console.log('Конец списка или превышен лимит итераций.');
            downloadResults();
            clearInterval(interval_id); // Используем глобальную переменную interval_id
            console.log('Данные загружены успешно!');
        } else {
            console.log(`Продолжаем скрапинг. Новый курсор: ${cursor}`);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        downloadResults();
        clearInterval(interval_id); // Используем глобальную переменную interval_id
        console.error('Цикл завершен из-за ошибки.');
    }
}

// Функция для установки интервала с динамическим временем ожидания
function startScraping() {
    const interval = Math.floor(Math.random() * 800) + 21; // Время в миллисекундах
    interval_id = setInterval(scrap, interval); // Используем глобальную переменную interval_id
    console.log('Скрапинг начат...');
}

// Запуск скрапинга
startScraping();
