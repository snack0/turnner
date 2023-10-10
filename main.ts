function Time_Calc () {
    hms[0] = hms[0] + 0.5
    if (hms[0] >= 60) {
        hms[0] = 0
        hms[1] = hms[1] + 1
    }
    if (hms[1] >= 60) {
        hms[1] = 0
        hms[2] = hms[2] + 1
    }
    if (hms[2] >= 24) {
        hms = [0, 0, 0]
    }
}
function Time_Set (num: number) {
    status = "Time_Set"
    basic.showString("T")
    basic.pause(100)
    basic.clearScreen()
}
radio.onReceivedNumber(function (receivedNumber) {
    let 리스트: number[] = []
    if (receivedNumber == 1 && 리스트[2] >= 6) {
        servos.P0.setAngle(180)
    } else if (receivedNumber == 0 && 리스트[2] >= 23) {
        servos.P0.setAngle(0)
    } else {
        servos.P0.setAngle(90)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (status == "Settings" || status == "Time_Set") {
        status = "Start_Menu"
    }
})
function Timer_Count () {
    while (input.logoIsPressed()) {
        delay += 1
        basic.pause(1000)
        if (delay >= 3) {
            delay = 0
            setiings()
        }
    }
    delay = 0
}
input.onButtonPressed(Button.A, function () {
    if (status == "Settings") {
        On_A_Pressed_setting()
    }
    if (status == "Time_Set") {
        On_A_Pressed_Time()
    }
})
function On_A_Pressed_Time () {
    if (hms[count] > 0) {
        hms[count] = hms[count] - 1
        basic.pause(200)
        basic.showNumber(hms[count])
    } else {
        hms[count] = 59
        basic.pause(200)
        basic.showNumber(hms[count])
    }
}
function On_B_Pressed_Setting () {
    if (count < 2) {
        count += 1
        basic.showNumber(count)
    } else {
        count = 0
        basic.showNumber(count)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (status == "Settings") {
        Time_Set(count)
    } else {
        if (status == "Time_Set") {
            setiings()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (status == "Settings") {
        On_B_Pressed_Setting()
    }
    if (status == "Time_Set") {
        On_B_Pressed_Time()
    }
})
function On_B_Pressed_Time () {
    if (hms[count] < 59) {
        hms[count] = hms[count] + 1
        basic.pause(200)
        basic.showNumber(hms[count])
    } else {
        hms[count] = 0
        basic.pause(200)
        basic.showNumber(hms[count])
    }
}
function setiings () {
    status = "Settings"
    count = 0
    basic.showIcon(IconNames.Ghost)
    basic.clearScreen()
    basic.showNumber(count)
}
function On_A_Pressed_setting () {
    if (count > 0) {
        count += -1
        basic.showNumber(count)
    } else {
        count = 2
        basic.showNumber(count)
    }
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (status == "Start_Menu") {
        Timer_Count()
    }
})
let count = 0
let delay = 0
let hms: number[] = []
let status = ""
status = "Start_Menu"
radio.setGroup(128)
radio.setTransmitPower(7)
hms = [0, 0, 0]
delay = 0
loops.everyInterval(60000, function () {
    if (status == "Start_Menu") {
        basic.showString("" + convertToText(hms[2]) + ":" + convertToText(hms[1]))
    }
})
basic.forever(function () {
    if (status == "Start_Menu") {
        basic.pause(500)
        Time_Calc()
    }
})
