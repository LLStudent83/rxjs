[![Build status](https://ci.appveyor.com/api/projects/status/ywy6r09sfhdt97aq?svg=true)](https://ci.appveyor.com/project/LLStudent83/geolocation-media)

https://llstudent83.github.io/geolocation-media/


# Webpack5

[Информация о релизе Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)

[Migration Guide](https://webpack.js.org/migrate/5/)



![](./pic/timeline.png)

Правила сдачи задания:

Важно: в рамках этого ДЗ можно использовать любой менеджер пакетов
Всё должно собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
Авто-тесты писать не требуется
Серверная часть должна быть выложена на Heroku (для 1 и 2 задачи, для 3 задачи серверная часть не требуется)

Polling

Легенда
Вы делаете корпоративную систему, в рамках которой есть система обмена сообщениями, аналогичная email. Вам необходимо реализовать периодический опрос сервера о поступлении новых сообщений. Поскольку для работы в вашей организации используестя rxjs, то и сделать вам это нужно с его помощью.

Описание
Серверная часть
Реализуйте простой REST endpoint /messages/unread, который возвращает непрочитанные сообщения. Для генерации случайных данных можете воспользоваться библиотекой faker.

Формат выдаваемых сообщений:

{
  "status": "ok",
  "timestamp": 1553400000,
  "messages": [
    {
      "id": "<uuid>",
      "from": "anya@ivanova",
      "subject": "Hello from Anya",
      "body": "Long message body here" ,
      "received": 1553108200
    }
    {
      "id": "<uuid>",
      "from": "alex@petrov",
      "subject": "Hello from Alex Petrov!",
      "body": "Long message body here",
      "received": 1553107200
    },
    ...
  ]
}
Клиентская часть
На клиенте с помощью rxjs вам нужно реализовать виджет, подписывающийся на "обновления". При получении обновлений они должны добавляться в таблицу сообщений:

![](./img/polling.png)


Сообщения добавляются именно сверху, предыдущие не удаляются.

Для получения данных через определённые промежутки используйте оператор interval.

Для запросов используйте ajax:

import { ajax } from 'rxjs/ajax';

ajax.getJSON(<url>);
Обратите внимание:

Сообщения лежат в свойстве messages
При отображении вам нужно сокращать subject до 15 символов, если длина больше, то последние название сокращается до 15 символов и дополняется символом многоточия
Дата при отображении переводится из timestamp в формат ЧЧ:ММ ДД.ММ.ГГГГ
При получении ошибки (сервер недоступен, либо код ответа не 200), преобразовывайте ошибку так, чтобы это было аналогично отсутствию новых сообщений.