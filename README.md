# Стартовий шаблон для HTML/CSS/JS розробки
Стартовий шаблон.
***

## Структура
`/src/` - папка для source коду

`/build/` -  тут буде кінцей зібраний проект

`/gulp/` - папка з задачами для [gulp](http://gulpjs.com/)
***

## Структура src
`/fonts/` - шрифти -> копіюються в `build/css/fonts`

`/img/` -  картинки -> копіюються в `build/img`

`/img/icons/` - генерується спрайт із всіх картнок що містяться у папці -> спрайт зберігається `build/img`, стилі та міксіни для спрайтів зберігаються в `/scss/lib/_sprite.sass`

`/img/svg/` -  генерується svg шрифт із всіх картнок що містяться у папці --> шрифт зберігається в `build/css/fonts`

`/js/` - js код

`/lib/` - зберігаються всі bower залежності

`/partials/` - html шаблони, можна інклудити за допомогою коментарів, [детально тут](https://www.npmjs.com/package/gulp-include)

`/scss/` - scss, [scss документація](http://sass-lang.com/)
***

## Установка
+   Установити [Ruby](https://www.ruby-lang.org/ru/downloads/) 
+   Установити gem залежності [sass](http://sass-scss.ru/install/) i [scss-lint](https://github.com/brigade/scss-lint)

		$ gem install sass
		$ gem install scss_lint

+   Установити [node.js](https://github.com/creationix/nvm)
+   Установити глобально bower, gulp
+   Скачати репозиторій і установити npm i bower залежності, виконавши в папці проекту команди

		$ bower install
		$ npm install

+   Зібрати проект та запустити gulp

		$ gulp build
		$ gulp

***

## Gulp задачі

задачі gulp-cli описані тут [gulp cli doc](https://github.com/gulpjs/gulp/blob/master/docs/CLI.md)

Назва задачі  | Команда для запуску  | Опис
------------- | -------------------- | -----
**copy**      | `gulp copy`          | Копіювання фалів `src -> build`
**html**      | `gulp html`          | Збирання `html` файлів
**svgFont**   | `gulp svgFont`       | Генерування іконочного шрифту з svg картинок
**js**        | `gulp js`            | Збиранні компілювання та мінімізація `js` файлів
**jsLint**    | `gulp jsLint`        | Лінтинг `js` коду
**sass**      | `gulp sass`          | Компілювання та мінімізація `scss` та `sass`
**scssLint**  | `gulp scssLint`      | Лінтинг `scss` коду
**server**    | `gulp server`        | Запуск сервера
**sprite**    | `gulp sprite`        | Генерування спрайтів з папки `src/icons`, та генерування стилів та міксінів для них `/scss/lib/_sprite.sass`
**clean**     | `gulp clean`         | Очищення папки `build`
**default**   | `gulp`               | Запуск спостерігачів за всіма файлами та перекомпіляція вразі зміни
**build**     | `gulp build`         | Запуск всіх задач для повної збірки проекту

