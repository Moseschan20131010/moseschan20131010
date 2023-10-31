function linefollwer () {
    if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        while (true) {
            if (pins.digitalReadPin(DigitalPin.P14) == 0) {
                break;
            } else {
                Turn_right()
            }
        }
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        while (true) {
            if (pins.digitalReadPin(DigitalPin.P15) == 0) {
                break;
            } else {
                Turn_left()
            }
        }
    } else {
        middle()
    }
}
function middle () {
    wuKong.setMotorSpeed(wuKong.MotorList.M2, -50)
    wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 90)
}
function Turn_left () {
    wuKong.setMotorSpeed(wuKong.MotorList.M2, -30)
    wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 10)
}
function Turn_right () {
    wuKong.setMotorSpeed(wuKong.MotorList.M2, -30)
    wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 150)
}
input.onButtonPressed(Button.B, function () {
    wuKong.stopAllMotor()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Card)
    while (true) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.trafficCard(PlanetX_AILens.trafficCards.stop)) {
            while (true) {
                strip.showColor(neopixel.colors(NeoPixelColors.Red))
                strip.show()
                wuKong.stopAllMotor()
            }
        } else if (PlanetX_AILens.trafficCard(PlanetX_AILens.trafficCards.turnleft)) {
            Turn_left()
            basic.pause(1000)
        } else if (PlanetX_AILens.trafficCard(PlanetX_AILens.trafficCards.turnright)) {
            Turn_right()
            basic.pause(1000)
        } else if (PlanetX_AILens.trafficCard(PlanetX_AILens.trafficCards.forward)) {
            middle()
            basic.pause(1000)
        } else {
            linefollwer()
        }
    }
})
input.onButtonPressed(Button.A, function () {
    wuKong.stopAllMotor()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Color)
    while (true) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.green)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.show()
        } else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.show()
        } else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.yellow)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            strip.show()
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            strip.show()
        }
    }
})
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
wuKong.stopAllMotor()
wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 90)
PlanetX_AILens.initModule()
