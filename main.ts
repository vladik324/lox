function показать_Предмет (X: number) {
    if (X == 1) {
        показать_Камень()
    }
    if (X == 2) {
        показать_Ножницы()
    }
    if (X == 3) {
        показать_Бумагу()
    }
}
function показать_Ножницы () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
}
radio.onReceivedNumber(function (receivedNumber) {
    Ответ = receivedNumber
})
function ждать_Ответ () {
    while (Ответ == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
}
function сделать_Ход () {
    radio.sendNumber(Предмет)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
}
function показать_Камень () {
    basic.showLeds(`
        . # # # .
        # . . # #
        # . . # #
        # # # # #
        . # # # .
        `)
}
function показать_Раунд () {
    Пара = Предмет * 10 + Ответ
    if (Предмет == Ответ) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    } else {
        if (Пара == 12 || (Пара == 23 || Пара == 31)) {
            basic.showLeds(`
                . . . . .
                . . # . .
                . # # # .
                . . # . .
                . . . . .
                `)
            Мой_Счет += 1
        } else {
            Его_Счет += 1
            basic.showLeds(`
                . . . . .
                . . . . .
                . # # # .
                . . . . .
                . . . . .
                `)
        }
    }
    basic.pause(200)
    basic.showString(" ")
    basic.showString("" + Мой_Счет + Его_Счет)
    basic.showString(" ")
}
function показать_Бумагу () {
    basic.showLeds(`
        # # # # .
        # . . # #
        # . . . #
        # . . . #
        # # # # #
        `)
}
function выбрать_Предмет () {
    Предмет = randint(1, 3)
    while (!(input.buttonIsPressed(Button.B))) {
        показать_Предмет(Предмет)
        if (input.buttonIsPressed(Button.A)) {
            Предмет += 1
            if (Предмет > 3) {
                Предмет = 1
            }
        }
        basic.pause(200)
    }
}
function показать_Ответ () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    показать_Предмет(Ответ)
    basic.pause(200)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.clearScreen()
    basic.pause(100)
}
let Пара = 0
let Предмет = 0
let Ответ = 0
let Его_Счет = 0
let Мой_Счет = 0
radio.setGroup(1)
radio.sendString("Start!")
Мой_Счет = 0
Его_Счет = 0
basic.forever(function () {
    Ответ = 0
    выбрать_Предмет()
    сделать_Ход()
    ждать_Ответ()
    показать_Ответ()
    показать_Раунд()
})
