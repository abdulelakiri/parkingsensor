import serial
import requests
from datetime import datetime
from urllib.parse import urlencode

ser = serial.Serial('COM3', 9600)

while True:
    line = ser.readline().decode('utf-8').strip()
    if line == '0':
        print(line)
        time_string = datetime.now().strftime('%m %d %Y %H:%M:%S')
        parameters = urlencode({'username': 'karim', 'time': time_string})
        print(parameters)
        r = requests.get(f'https://hurani.lib.id/parkfind@dev/toggleOn/?{parameters}')
        print(r.json())
    elif line == '1':
        print(line)
        time_string = datetime.now().strftime('%m %d %Y %H:%M:%S')
        parameters = urlencode({'username': 'karim', 'time': time_string})
        print(parameters)
        r = requests.get(f'https://hurani.lib.id/parkfind@dev/toggleOff/?{parameters}')
        print(r.json())


ser.close()
    
