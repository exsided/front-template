<pre>

 _______  ______  _____  __   _ _______     _    _
 |______ |_____/ |     | | \  |    |    ___  \  / 
 |       |    \_ |_____| |  \_|    |          \/                                                

</pre>
# npm run dev
- сборка проекта в режиме разработки в папку **_dev** (она в **.gitignore**)
# npm run serve
- запуск проекта в режиме разработки
- запуск локального сервера
- создает **html** файл со списокм ссылок на другие страницы
# npm start
- запуск проекта в режиме разработки
- запуск локального сервера, и открытие **index.html** в браузре
- создает **html** файл со списокм ссылок на другие страницы
# npm run build
- сборка и минификация (**js**, **css**) проекта
# pages-list
- создает **html** файл со списокм ссылок на другие страницы
# pages-list-dev
- создает **html** файл со списокм ссылок на другие страницы, и помещает его в папку **_dev**
# Использование
- в **.env** прописываем пути для **css** -> картинок, шрифтов и иконок  
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
- Картинки вставляются **./img/имя**  
**Пример:**
```html
<img src="./img/logo.png" alt="Logo">
```
- **Svg - иконки** вставляются **./img/имя**  
**Пример:**
```html
<img src="./img/logo.png" alt="Logo">
```
