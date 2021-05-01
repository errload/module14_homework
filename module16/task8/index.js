/*
    Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
    В input можно ввести любое число.
        - Заголовок первого input — «номер страницы».
        - Заголовок второго input — «лимит».
        - Заголовок кнопки — «запрос».
    При клике на кнопку происходит следующее:
        - Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится 
        ниже текст «Номер страницы вне диапазона от 1 до 10»;
        - Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится 
        ниже текст «Лимит вне диапазона от 1 до 10»;
        - Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже 
        текст «Номер страницы и лимит вне диапазона от 1 до 10»;
        - Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL 
        https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, 
        а GET-параметр limit — это введённое число второго input. 
    После получения данных вывести список картинок на экран.
    Если пользователь перезагрузил страницу, то ему должны показываться картинки из 
    последнего успешно выполненного запроса (использовать localStorage).
*/

// хватаем теги со страницы
const inputPage = document.querySelector('#inputPage');
const inputLimit = document.querySelector('#inputLimit');
const btn = document.querySelector('.btn');
const errorWrapper = document.querySelector('.error__wrapper');
const imgWrapper = document.querySelector('.img__wrapper');

// данные из localStorage
const urlStorage = localStorage.getItem('urlStorage');

// функция вывода картинок
function showImage(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => {
        // обнуляем содержимое контента
        imgWrapper.innerHTML = '';

        // перебор объекта
        for (let key in json) {
            // вывод в теги картинки и автора
            imgWrapper.innerHTML += `
                <p class="author">автор: ${json[key].author}</p>
                <img class="img" src="${json[key].download_url}" />
            `;
        }
    });
}

// если в localStorage ранее была запись, выводим картинки
if (urlStorage) showImage(urlStorage);

// функция проверки inputPage
function isInputPage() {
    inputPageNumber = +inputPage.value;

    if (inputPageNumber < 1 || inputPageNumber > 10 || isNaN(inputPageNumber)) {
        return false;
    }
    
    return true;
}

// функция проверки inputLimit
function isInputLimit() {
    inputLimitNumber = +inputLimit.value;

    if (inputLimitNumber < 1 || inputLimitNumber > 10 || isNaN(inputLimitNumber)) {
        return false;
    }
    
    return true;
}

// функция нажатия кнопки
btn.addEventListener('click', () => {
    // обнуляем вывод ошибок
    errorWrapper.textContent = '';

    /* функция проверки input'ов */
    // если оба некорректны
    if (!isInputPage() && !isInputLimit()) {
        // выводим сообщение об ошибке ввода
        errorWrapper.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
        // обнуляем содержимое контента
        imgWrapper.innerHTML = '';
        return false;
      // если некорректен номер страницы
    } else if (!isInputPage()) {
        errorWrapper.textContent = 'Номер страницы вне диапазона от 1 до 10';
        imgWrapper.innerHTML = '';
        return false;
      // если некорректен лимит
    } else if (!isInputLimit()) {
        errorWrapper.textContent = 'Лимит вне диапазона от 1 до 10';
        imgWrapper.innerHTML = '';
        return false;
    }

    // url
    const url = `https://picsum.photos/v2/list?page=${inputPage.value}&limit=${inputLimit.value}`;
    // записываем новый url в localStorage
    localStorage.setItem('urlStorage', url);
    // вывод картинок
    showImage(url);
    // обнуляем формы
    inputPage.value = '';
    inputLimit.value = '';
});
