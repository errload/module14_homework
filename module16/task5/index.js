/*
    Написать скрипт, который при открытии страницы будет делать следующее:
        - Если пользователь зашел в первый раз, вывести окно prompt с сообщением: 
        «Добро пожаловать! Назовите, пожалуйста, ваше имя».
        - После того, как пользователь введет имя, записать имя, дату и время визита в localStorage.
    Если пользователь открывает страницу не впервые (это можно узнать 
    по наличию соответствующих записей в localStorage), 
    вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. 
    В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.
*/

// проверяем наличие имени в localStorage
const localName = localStorage.getItem('localName');

// функция записи последнего посещения
function setLocalDate() {
    // текущая дата
    const d = new Date();
    const dLocal = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}г. в ${d.getHours()}:${d.getMinutes()}`;
    // записываем дату в localStorage
    localStorage.setItem('localDate', dLocal);
}

// если имя не было записано ранее
if (!localName) {
    // просим ввести
    let guestName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя:');
    // записываем имя в localStorage
    localStorage.setItem('localName', guestName ? guestName : 'Неизвестный');
    // записываем дату в localStorage
    setLocalDate();
} else {
    // берем имя и дату из localStorage
    const localName = localStorage.getItem('localName');
    const localDate = localStorage.getItem('localDate');
    // текст приветствия
    const message = `Добрый день, ${localName}! Давно не виделись. В последний раз вы были у нас ${localDate}.`;
    // перезаписываем дату в localStorage
    setLocalDate();
    // выводим текст
    alert(message);
}
