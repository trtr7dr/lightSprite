# lightSprite
Простая спрайтовая анимация. Подается список картинок, при скролле они сменяются в выбранном порядке.
## Официальная страница
https://gloagent.ru/category/blog/web/lsprite.html
## Старт
```javascript
var element = new LightSprite(name, urls, start, duration);
```
name — id начального блока/картинки.
urls — список картинок в порядке необходимого следования.
start — Число пикселей элемента, после прокрутки которых начинается смена спрайтов.
duration — продолжительность.
## Пример использования
```javascript
var urls = ['one.png', 'two.png', 'three.png', 'four.png', 'five.png', 'six.png', 'seven.png'];
var a = new LightSprite('#one', urls, 400, 1300); 
jQuery(window).scroll(function () {
    a.sprite(); // длительность
});
```
## Дополнительно
Для создания анимации, которая отработается единажды и при старте будет fixed:
```javascript
var a = new LightSprite(name, urls, start, duration);
a.doFix();
```
