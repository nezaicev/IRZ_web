## IRZ_web
Приложение REST API, сохраняет и отображает данные из SO,
на основе заданных параметров. Можно подключить любой открыйтый API

### Backend
- Django
- Django Ninja

### Frontend
- React
- MUI
- Axios

### Запуск в режиме develop
pyhton 3.10.8

install pyenv (https://github.com/pyenv/pyenv)
```$ pip install --upgrade pip
$ mkdir irz && cd ./irz
$ pyenv install 3.10.8
$ pyenv local 3.10.8
$ pyenv virtualenv irz
$ pyenv activate irz
$ git clone https://github.com/nezaicev/IRZ_web.git
$ cd ./IRZ_web
$ pip install -r requirements.txt
$ ./manage runserver
```
open in browser 127.0.0.1:8000 


