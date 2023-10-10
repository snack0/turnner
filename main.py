def Time_Calc():
    global hms
    hms[0] = hms[0] + 0.5
    if hms[0] >= 60:
        hms[0] = 0
        hms[1] = hms[1] + 1
    if hms[1] >= 60:
        hms[1] = 0
        hms[2] = hms[2] + 1
    if hms[2] >= 24:
        hms = [0, 0, 0]
def Time_Set(num: number):
    global status
    status = "Time_Set"
    basic.show_string("T")
    basic.pause(100)
    basic.clear_screen()

def on_received_number(receivedNumber):
    리스트: List[number] = []
    if receivedNumber == 1 and 리스트[2] >= 6:
        servos.P0.set_angle(180)
    elif receivedNumber == 0 and 리스트[2] >= 23:
        servos.P0.set_angle(0)
    else:
        servos.P0.set_angle(90)
radio.on_received_number(on_received_number)

def on_logo_pressed():
    global status
    if status == "Settings" or status == "Time_Set":
        status = "Start_Menu"
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def Timer_Count():
    global delay
    while input.logo_is_pressed():
        delay += 1
        basic.pause(1000)
        if delay >= 3:
            delay = 0
            setiings()
    delay = 0

def on_button_pressed_a():
    if status == "Settings":
        On_A_Pressed_setting()
    if status == "Time_Set":
        On_A_Pressed_Time()
input.on_button_pressed(Button.A, on_button_pressed_a)

def On_A_Pressed_Time():
    if hms[count] > 0:
        hms[count] = hms[count] - 1
        basic.pause(200)
        basic.show_number(hms[count])
    else:
        hms[count] = 59
        basic.pause(200)
        basic.show_number(hms[count])
def On_B_Pressed_Setting():
    global count
    if count < 2:
        count += 1
        basic.show_number(count)
    else:
        count = 0
        basic.show_number(count)

def on_button_pressed_ab():
    if status == "Settings":
        Time_Set(count)
    else:
        if status == "Time_Set":
            setiings()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    if status == "Settings":
        On_B_Pressed_Setting()
    if status == "Time_Set":
        On_B_Pressed_Time()
input.on_button_pressed(Button.B, on_button_pressed_b)

def On_B_Pressed_Time():
    if hms[count] < 59:
        hms[count] = hms[count] + 1
        basic.pause(200)
        basic.show_number(hms[count])
    else:
        hms[count] = 0
        basic.pause(200)
        basic.show_number(hms[count])
def setiings():
    global status, count
    status = "Settings"
    count = 0
    basic.show_icon(IconNames.GHOST)
    basic.clear_screen()
    basic.show_number(count)
def On_A_Pressed_setting():
    global count
    if count > 0:
        count += -1
        basic.show_number(count)
    else:
        count = 2
        basic.show_number(count)

def on_logo_touched():
    if status == "Start_Menu":
        Timer_Count()
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

count = 0
delay = 0
hms: List[number] = []
status = ""
status = "Start_Menu"
radio.set_group(128)
radio.set_transmit_power(7)
hms = [0, 0, 0]
delay = 0

def on_every_interval():
    if status == "Start_Menu":
        basic.show_string("" + convert_to_text(hms[2]) + ":" + convert_to_text(hms[1]))
loops.every_interval(60000, on_every_interval)

def on_forever():
    if status == "Start_Menu":
        basic.pause(500)
        Time_Calc()
basic.forever(on_forever)
