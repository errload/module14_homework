/*
    Вам дана заготовка и результат, который вы должны получить. 
    Ваша задача — написать код, который будет преобразовывать 
    XML в JS-объект и выводить его в консоль.
*/

// XML, который парсим
const xmlString = `
<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>
`;

// парсинг xml
const xmlDom = new DOMParser().parseFromString(xmlString, 'text/xml');
let list = [];

// получение всех dom-node
const listNode = xmlDom.querySelectorAll('student');
listNode.forEach(val => {
    const nameNode = val.querySelector('name');
    const firstNode = val.querySelector('first');
    const secondNode = val.querySelector('second');
    const ageNode = val.querySelector('age');
    const profNode = val.querySelector('prof');
    // получение данных из атрибутов
    const langAttr = nameNode.getAttribute('lang');

    // добавляем содержимое каждого student в массиво объектом
    list.push({
        name: `${firstNode.textContent} ${secondNode.textContent}`,
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
        lang: langAttr
    });
});

// создаем объект с массивом
const result = {
    list: list
}

console.log(result);
