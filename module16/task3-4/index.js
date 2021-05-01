/*
    Дан JSON-файл с информацией о выручке фирмы по кварталам за период с 2017 по 2019 год.
    Вам нужно написать код приложения, интерфейс которого состоит из:
        - Выпадающего списка
        - Кнопки «Загрузить отчет»
    Пользователь выбирает год в списке и нажимает кнопку «Загрузить отчет». 
    Если год не выбран, вывести сообщение «Выберите, пожалуйста, год». 
    Если год выбран, отправить XHR-запрос к JSON-файлу, используя URL, указанный выше, 
    обработать его содержимое и вывести информацию о выручке в выбранном году в виде таблицы.

    Доработайте приложение из предыдущего задания: при нажатии на кнопку 
    «Загрузить отчет» нужно вывести помимо таблицы ссылку «Открыть график», 
    которая будет вести на сервис для динамического создания графиков Quickchart.io.
*/

// url ссылки
const url = 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440';
// select
const resultNode = document.querySelector('.table__report');
// button
const btnNode = document.querySelector('.btn');

// функция AJAX запроса
function useReport(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        // если ошибка ответа от сервера, выводим в консоль
        if(xhr.status != 200) {
            console.log('Status: ', xhr.status);
        } else {
            // иначе возвращаем объект
            const result = JSON.parse(xhr.response);
            if(callback) {
                // и передаем в callback
                callback(result);
            }
        }
    };
    
    xhr.onerror = function() {
        console.log('Error: ', xhr.status);
    };
    
    xhr.send();
}

// функция вывода результата
function displayResult(apiData) {
    // выбранный select
    const selected = document.querySelector('.report').value;
    // ссылка на график
    link = document.querySelector('.link');
    // создаем таблицу
    let table = '';

    // если год не выбран, выводим сообщение и останавливаем функцию
    if(selected === 'null') {
        alert('Выберите, пожалуйста, год.');
        return;
    }

    // перебираем объект
    apiData.forEach(item => {
        // если выбранный select равен году в объекте
        if(item.year == selected) {
            // берем данные конекретного года и выводим таблицей
            table = `
                <table class="table">
                    <tr class="table--bold">
                        <td>1 кв.</td>
                        <td>2 кв.</td>
                        <td>3 кв.</td>
                        <td>4 кв.</td>
                    </tr>
                    <tr>
                        <td>${item.sales.q1}</td>
                        <td>${item.sales.q2}</td>
                        <td>${item.sales.q3}</td>
                        <td>${item.sales.q4}</td>
                    </tr>
                </table>
            `;

            // меняем ссылку на график
            link.href = `https://quickchart.io/chart?c={type:'bar',
                        data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], 
                        datasets:[{label:'Выручка за ${item.year} год',
                        data:[${item.sales.q1},${item.sales.q2},${item.sales.q3},${item.sales.q4}]}]}}`;
            link.textContent = 'Открыть график';
        }
    });

    // пишем в HTML
    resultNode.innerHTML = table;
};

// функция нажатия кнопки
btnNode.addEventListener('click', () => {
    useReport(url, displayResult);
});
