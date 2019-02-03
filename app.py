import serial
import requests
from datetime import datetime

ser = serial.Serial('COM3', 9600)

while True:
    line = ser.readline().decode('utf-8').strip()
    if line == '0':
        print(line)
        time_string = datetime.now().strftime('%d/%m')
        r = requests.get('https://hurani.lib.id/parkfind@dev/toggleOff/?username=karim')
        print(r.json())
    elif line == '1':
        print(line)
        r = requests.get('https://hurani.lib.id/parkfind@dev/toggleOn/?username=karim')
        print(r.json())


ser.close()
    
