/*
    Написать код приложения, интерфейс которого состоит из поля ввода и кнопки 
    «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью 
    fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. 
    Число 3 представляет собой id пользователя, вместо него нужно подставить число, 
    введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя.
    Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), 
    выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с 
    введенным id не существует, вывести сообщение:
        - «Пользователь с указанным id не найден».
*/

// нопка
const btn = document.querySelector('.btn');
// отчет
let report = document.querySelector('.report');

// функция нажатия кнопки
btn.addEventListener('click', () => {
    // input value в числовом формате
    const inputValue = +document.querySelector('.input').value;
    const url = `https://jsonplaceholder.typicode.com/users/${inputValue}/todos`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            // обнуляем вывод
            report.innerHTML = '';

            // если юзера с указанным в input id нет
            if (!json.length) {
                // сообщаем об этом
                report.innerHTML = 'Пользователь с указанным <i>id</i> не найден';
                return;
            }

            // перебираем полученный объект
            for (let key in json) {
                // выводим результат
                report.innerHTML += json[key].completed ?
                    `
                        <ul class="report__ul">
                            <li>userId: ${json[key].userId}</li>
                            <li>id: ${json[key].id}</li>
                            <li>title: <s>"${json[key].title}"</s></li>
                            <li>completed: ${json[key].completed}</li>
                        </ul>
                    ` :
                    `
                        <ul class="report__ul">
                            <li>userId: ${json[key].userId}</li>
                            <li>id: ${json[key].id}</li>
                            <li>title: "${json[key].title}"</li>
                            <li>completed: ${json[key].completed}</li>
                        </ul>
                    `;
            }
        });
});
