/*
    Перепишите консольное приложение из предыдущего юнита (task4) на классы.
*/

// функция родитель с методами включения/отключения из розетки
// и вычисления потребляемой мощности во включенном состоянии
class Appliance {
    constructor(name, energy, state) {
        this.name = name;
        this.energy = energy;
        this.state = state;
    }

    isPower() {
        let energyCount = this.energy * 24;
        if(this.state) {
            console.log(`прибор ${this.name} включен в розетку и потребляет ${energyCount}Вт в сутки`);
        }
        else {
            console.log(`прибор ${this.name} выключен из розетки`);
        }
    }
}

// создаем объекты со своими собственными свойствами и методами
class Lamp extends Appliance {
    constructor(name, energy, state, color, ourCountry) {
        super(name, energy, state);
        this.color = color;
        this.ourCountry = ourCountry;
    }

    // является ли лампа российского производства
    isOurCountry = function() {
        if(this.ourCountry) {
            console.log(`прибор ${this.name} российского производства, цвет ${this.color}`);
        }
        else {
            console.log(`прибор ${this.name} привезен из-за границы`);
        }
    }
}

class Computer extends Appliance {
    constructor(name, energy, state, gaming) {
        super(name, energy, state);
        this.gaming = gaming;
    }

    // является ли компьютер игровым
    isGamer = function() {
        if(this.gaming) {
            console.log(`прибор ${this.name} обладает игровыми характеристиками`);
        }
        else {
            console.log(`прибор ${this.name} предназначен только для офисной рутины`);
        }
    }
}

// инициируем непосредственно два объекта
const lamp = new Lamp('лампа', 95, true, 'черный', true);
const computer = new Computer('компьютер', 300, false, false);

// вызываем методы
lamp.isPower();
lamp.isOurCountry();

computer.isPower();
computer.isGamer();
