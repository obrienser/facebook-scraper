# Facebook Scraper :space_invader:

[![GitHub license](https://img.shields.io/github/license/obrienser/Facebook-Scraper)](https://github.com/obrienser/Facebook-Scraper)
[![GitHub stars](https://img.shields.io/github/stars/obrienser/Facebook-Scraper)](https://github.com/obrienser/Facebook-Scraper/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/obrienser/Facebook-Scraper)](https://github.com/obrienser/Facebook-Scraper/network)
[![GitHub issues](https://img.shields.io/github/issues/obrienser/Facebook-Scraper)](https://github.com/obrienser/Facebook-Scraper/issues)
[![visitors](https://visitor-badge.glitch.me/badge?page_id=obrienser.Facebook-Scraper)](https://github.com/obrienser)

Этот скрипт позволяет получить список пользователей, которые оставили свою реакцию (лайк и тд.) на пост в Facebook.<br>
Все результаты сохраняются в .txt файл.

## Использование
Скрипт выполняется через консоль браузера.

1. **Откройте** [xhr-min.js](https://github.com/obrienser/Facebook-Scraper/blob/main/xhr-min.js) и **скопируйте** весь код
2. **Перейдите** на https://www.facebook.com
3. Выберите нужный вам пост и **нажмите** на рекции

![image](https://user-images.githubusercontent.com/50111192/124273235-6d21ec00-db48-11eb-86b1-321dd8f24aab.png)

5. **Откройте** консоль *(F12 -> вкладка Console)*
6. **Вставьте** скопированый код

![image](https://user-images.githubusercontent.com/50111192/124273754-179a0f00-db49-11eb-863e-b38f540e4d4e.png)

8. **Перейдите** о вкладку *Network*, а затем в *XHR*

![image](https://user-images.githubusercontent.com/50111192/124274143-92632a00-db49-11eb-861c-8612b0ee904b.png)

9. **Нажмите** кнопку *Clear*

![image](https://user-images.githubusercontent.com/50111192/124274369-db1ae300-db49-11eb-8241-0245b1f74bcb.png)

10. **Проскрольте** список пользователей несколько раз вниз

![image](https://user-images.githubusercontent.com/50111192/124274811-64321a00-db4a-11eb-97af-f2ab95df6788.png)

11. **Нажмите** на *graphql*

![image](https://user-images.githubusercontent.com/50111192/124274956-917ec800-db4a-11eb-97a0-63f97603e756.png)

12. Проскрольте вниз и **найдите** пункт *Form Data*
13. **Нажмите** на *view source*

![image](https://user-images.githubusercontent.com/50111192/124275278-f0dcd800-db4a-11eb-93df-0865a1375f45.png)

14. Выделите и **скопируйте** весь этот код

![image](https://user-images.githubusercontent.com/50111192/124275382-1a95ff00-db4b-11eb-830b-3af77e427994.png)

15. **Перейдите** в консоль *(вкладка Console)*
16. **Вставьте** скопированный код в это место:

![image](https://user-images.githubusercontent.com/50111192/124275556-5fba3100-db4b-11eb-83e2-70cfb122ee42.png)

![image](https://user-images.githubusercontent.com/50111192/124275673-88422b00-db4b-11eb-8858-1a82d5a1c5b3.png)


17. **Нажмите Enter**

![image](https://user-images.githubusercontent.com/50111192/124275798-b1fb5200-db4b-11eb-95e2-14f81800ea27.png)

>**Готово!** Список пользователей сохранён в .txt файл.


## Ограничения
>Максимальное кол-во пользователей: 10К.

## Требования
* Аккаунт в Facebook
* Браузер Google Chrome, Opera, FireFox

<br><br>
<p align="center">
  <a href="https://www.buymeacoffee.com/obrienser">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="140">
  </a>
</p>

------

Made with :heart: and :coffee:
