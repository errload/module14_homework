/* 
    Ваша задача — создать JS-объект, который при преобразовании в JSON 
    будет возвращать в качестве результата такую же JSON-строку, как в образце. 
    Получившуюся строку вывести в консоль.
*/

// объект JS
let person = {
    name: 'Anton',
    age: 36,
    skills: [
        'Javascript',
        'HTML',
        'CSS'
    ],
    "salary": 80000
}

// преобразование в JSON
person = JSON.stringify(person);

console.log(person);