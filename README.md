```bash
 _______  ______  _____  __   _ _______     _    _
 |______ |_____/ |     | | \  |    |    ___  \  / 
 |       |    \_ |_____| |  \_|    |          \/                                                
```

# npm start
- запуск проекта в режиме разработки
- запуск локального сервера, и открытие **index.html** в браузре
- создает **html** файл со списокм ссылок на другие страницы
# npm run build
- сборка и минификация (**js**, **css**) проекта
# npm run dev
- сборка проекта в режиме разработки в папку **_dev** (она в **.gitignore**)
# npm run serve
- запуск проекта в режиме разработки
- запуск локального сервера
- создает **html** файл со списокм ссылок на другие страницы
# pages-list
- создает **html** файл со списокм ссылок на другие страницы
# pages-list-dev
- создает **html** файл со списокм ссылок на другие страницы, и помещает его в папку **_dev**
# Использование
```bash

{\__/}
(●_●)
( > 🍪 Want a cookie?   
{\__/}
(●_●)
( 🍪< No my cookie.
```
- в **.env** прописываем пути для **css** -> картинок, шрифтов и иконок.  
Все **.env** необходимые для использования в **js** должны начинаться с **APP** (**APP_BASE=/**)  
**Пример:**  
```bash
CSS_IMG=/img  
CSS_SVG=/svg  
CSS_FONTS=../fonts  
```  
Эти три перменные передаются в **scss** и используются так:
```scss
.logo
{
	background-image: url(#{$img}/logo.png);
	background-image: url(#{$svg}/logo.svg);
}
@font-face
{
	font-family: 'Inter';
	src: url(#{$fonts}/Inter/Inter-Thin.ttf);
}
```  
###### > когда-нибудь это станет легче и красивее...  
- в **.env.prod** прописываем пути для **css** -> картинок, шрифтов и иконок. Для боевого сайта.  
**Пример:**  
```bash
CSS_IMG=../img  
CSS_SVG=../svg  
CSS_FONTS=../fonts  
```
- Фронтендеры могут сами отправлять запросы на тестовые **JSON файлы**.  
**Пример ответа:**
```json
{
	"success": false,
	"errors": {
		"fio": "Error: invalid fio",
		"phone": "Error: invalid phone",
		"age": "Error: invalid age",
		"comment": "Error: invalid comment",
		"test": "Error: invalid test"
	}
}
```
**Пример запроса:**  
```javascript
o2.form =
{
	submit(e)
	{
		let params =
		{
			url: process.env.APP_URL + 'requests/request.json',
			method: 'GET',
			dataType: 'json',
			success: (msg, instance) =>
			{
				console.log(msg, instance);
			}
		};

		O2Validator.handleSubmit(e, params, true, true, this.callbacks);
	},
	callbacks:
	{
		test($field)
		{
			let $input = $field.find('input');

			if($input.val() === 'test')
				return true;

			O2Validator.setMessage(field,'Test');
			return false;
		}
	},
};
```
**Пример html:**
```html
<form onsubmit="o2.form.submit(event)">
  ...
</form>
```
В папке **src/requests/** создаете **.json** файлы которые при сборке переносятся в папку куда идет сборка проекта.  
В **.env** и **.env.prod** добавляем перменную **APP_URL**
- Все файлы скрипвто идут в **src/assets/js/main.js/main.ts**  
Для особых случаев есть файлы **src/assets/js/critical.js/critical.ts**
- Все файлы стилей идут в **src/assets/scss/main.scss**  
Для особых случаев есть файлы **src/assets/scss/critical.scss**
- Компонеты создаются в папке **src/blocks/**  
```bash
├── src  
│    ├── blocks  
│    │   └── component  
│    │       ├── component.twig  
│    │       ├── component.scss  
│    │       └── component.js  
```
- Страницы создаются в папке **src/pages/**
```bash
├── src  
│    ├── pages  
│    │   ├── catalog  
│    │   │   ├── catalog.scss  
│    │   │   └── catalog.js  
│    │   │  
│    │   └── catalog.twig  
```
**Пример страницы catalog.twig**
```twig
{% extends "@layouts/layout.twig" %}

{% block page %}
{#
	Пример подключения файла
	{% include '@blocks/component/component.twig' %}
	Пример подключения svg
	{% include '@assets/svg/component.svg' %}
#}
{% endblock %}
```
- Картинки вставляются **./img/имя**  
**Пример:**
```html
<img src="./img/logo.png" alt="Logo">
```
###### > когда-нибудь картинкам тоже надо будет менять пути для разработки и для их отображения на сайте
- **SVG - иконки** вставляются **./svg/имя**, либо кодом -> **twig include**  
**Пример:**
```twig
<img src="./svg/logo.svg" alt="Logo">
{% include "@assets/svg/logo.svg" %}
```
- **Typescript** изначально **.ts** импортируется в **src/assets/js/main.ts**.  
В особых случаях его можно весь импортировать в отдельный **.ts файл**, но тогда надо будет указать файлы в который все собираеться в **src/tsconfig.json**  
```json
{
	"files": [
		"общийфайл-для-ts.ts"
	],
}
```  
[TypeScript по русский](https://github.com/EbookFoundation/free-programming-books/blob/main/books/free-programming-books-ru.md#typescript)  
[tsconfig.json - ru](https://gist.github.com/KRostyslav/82a25c469ffa6652825d58537ac6bc22)  

P.S
Если что я вложил в этот сборщик свою душу, пот, слезы и друшие жидкости моего организма
