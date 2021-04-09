---
slug: "/post1"
title: "Документы"
sort: "1"
---

Для сохранения копии результатов выполнения операций подписи, снятия подписи,
архивирования, шифрования и расшифрования используется каталог **Документы**.
Файлы данного каталога располагаются в каталоге пользователя в папке
\\.Trusted\\CryptoARM GOST\\Documents\\. Просмотреть документы в каталоге можно,
выбрав пункт меню **Документы**.

![docs_list.png](./images/docs_list.png "Список документов")


По умолчанию файлы в списке сортируются по дате создания - от новых к старым. Отсортировать файлы можно по любому столбцу, нажав на название столбца.

Для списка доступно контекстное меню, состоящее из пунктов:

-   **Обновить** – для обновления списка;

-   **Выделить все** - выделяются все файлы в списке;

-   **Сбросить выделение** – для сброса выделения документов в списке;

-   **Перейти в каталог** - выполняется открытие каталога документов.

![docs_context.png](./images/docs_context.png "Контекстное меню списка Документов")


Для каждого файла списка доступны кнопки операции, всплывающие при наведении на файл курсором мыши:

-   **Просмотр** - выполняется открытие файла через приложение, которое
    ассоциировано с его расширением;

-   **Перейти к файлу** - выполняется открытие каталога, в котором располагается файл.

![docs_buttons.png](./images/docs_buttons.png "Кнопки операций документа")


В приложении реализован поиск документов по символьному совпадению.

![docs_search.png](./images/docs_search.png "Поиск документов")


Список документов можно отфильтровать, задав настройки фильтрации.

![docs_filter.png](./images/docs_filter.png "Настройки критериев фильтра документов")


Применение фильтрации выполняется по нажатию кнопки **Применить**. В зависимости от выставленных критериев фильтра в списке документов остаются только те записи, которые удовлетворяют (суммарно) этим критериям.

![docs_after_filter.png](./images/docs_after_filter.png "Результат применения фильтрации документов")


Для сброса заданных критериев фильтрации служит кнопка **Сбросить** в окне
настроек фильтрации.

Для списка файлов в разделе **Документы** доступны операции:

-   **Открыть в мастере подписи и шифрования** – выбранные документы открываются в мастере **Подписи и шифрования** для выполнения других операций

-   **Удалить** – происходит физическое удаление файлов из каталога в папке пользователя \\.Trusted\\CryptoARM GOST\\Documents\\.

![docs_operations.png](./images/docs_operations.png "Доступные операции для документов")
