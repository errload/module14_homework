/*
    Реализуйте следующее консольное приложение подобно примеру, который разбирался в видео. 
    Реализуйте его на прототипах.
    Определите иерархию электроприборов. Включите некоторые в розетку. 
    Посчитайте потребляемую мощность.
    Таких приборов должно быть как минимум два (например, настольная лампа и компьютер). 
    Выбрав прибор, подумайте, какими свойствами он обладает.
*/

// функция родитель с методами включения/отключения из розетки
// и вычисления потребляемой мощности во включенном состоянии
function Appliance(name, energy, state) {
    this.name = name.toUpperCase();
    this.energy = energy;
    this.state = state;
}

Appliance.prototype.isPower = function() {
    let energyCount = this.energy * 24;
    if(this.state) {
        console.log(`прибор ${this.name} включен в розетку и потребляет ${energyCount}Вт в сутки`);
    }
    else {
        console.log(`прибор ${this.name} выключен из розетки`);
    }
}

// создаем объекты со своими собственными свойствами и методами
function Lamp(color, ourCountry) {
    this.color = color;
    this.ourCountry = ourCountry;
}

function Computer(gaming) {
    this.gaming = gaming;
}

// делегирующая связь с функцией родителем
Lamp.prototype = new Appliance('лампа', 95, true);
Computer.prototype = new Appliance('компьютер', 300, false);

// является ли лампа российского производства
Lamp.prototype.isOurCountry = function() {
    if(this.ourCountry) {
        console.log(`прибор ${this.name} российского производства, цвет ${this.color}`);
    }
    else {
        console.log(`прибор ${this.name} привезен из-за границы`);
    }
}

// является ли компьютер игровым
Computer.prototype.isGamer = function() {
    if(this.gaming) {
        console.log(`прибор ${this.name} обладает игровыми характеристиками`);
    }
    else {
        console.log(`прибор ${this.name} предназначен только для офисной рутины`);
    }
}

// инициируем непосредственно два объекта
const lamp = new Lamp('черный', true);
const computer = new Computer(false);

// вызываем методы
lamp.isPower();
lamp.isOurCountry();

computer.isPower();
computer.isGamer();
