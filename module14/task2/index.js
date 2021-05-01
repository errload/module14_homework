/*
    Напишите функцию, которая принимает в качестве аргументов строку и объект, 
    а затем проверяет, есть ли у переданного объекта свойство с данным именем. 
    Функция должна возвращать true или false.
*/

const obj1 = {
    one: 1,
    two: 'console'
}

const getString = (string, obj) => string in obj ? true : false;

getString('two', obj1);
