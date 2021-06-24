---
slug: "/post7"
title: "Раньше приложение работало, а сейчас зависает"
sort: "07"
--- 

Лицензии действительные, при попытке доступа к разделам **Подписать и зашифровать**, **Сертификаты**, **Контейнеры** программа зависает на статусе **Пожалуйста, подождите…**

Возможно, установили (потом удалили или нет) другой криптопровайдер (например, VipNet) - будет конфликт. Нужно удалить другой криптопровайдер. Или в настройках VipNet установить флаг "Поддержка работы ViPNet CSP через Microsoft CryptoAPI"

Потом удалить файл настроек. Для этого нужно закрыть программу (**Выход** в меню или в трее), перейти в каталог пользователя в папку \.Trusted\CryptoARM GOST\ и удалить файл settings.json.