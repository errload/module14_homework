/*
    Напишите функцию, которая принимает в качестве аргумента объект 
    и выводит в консоль все ключи и значения только собственных свойств. 
    Данная функция не должна возвращать значение.
*/

const obj1 = {
    one: 1,
    two: 'console'
}

const obj2 = Object.create(obj1);
obj2.three = 800;

function getValue(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`);
        }
    }
}

getValue(obj2);
