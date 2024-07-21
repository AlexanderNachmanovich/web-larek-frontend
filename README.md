# Проектная работа "Веб-ларек"

## Используемый стек

- **HTML**: Разметка страниц.
- **SCSS**: Стилизация компонентов.
- **TypeScript**: Логика приложения.
- **Webpack**: Инструмент для сборки модулей.

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Архитектура  
Используется парадигма MVP.  

## Базовые классы  

### Класс EventEmitter  
Назначение:  управляет событиями, позволяет подписываться на события и 
уведомлять подписчиков об их наступлении.

Методы:  
`on(event: string, listener: Function): void` — устанавливает обработчик на событие.  
`off(event: string, listener: Function): void` — сбрасывает обработчик с события.  
`emit(event: string, ...args: any[]): void` — уведомляет о наступлении события.  

### Класс Model  
Назначение:  класс, предназначенный для создания моделей данных.

Методы:  
`emitChanges(): void` — сообщает, что модель поменялась.

### Класс Component
Назначение:  класс для отрисовки пользовательского 
интерфейса и работы с DOM-элементами.

Методы:  
`toggleClass(className: string): void` — переключает класс компонента.  
`setText(text: string): void` — устанавливает текстовое содержимое для компонента.  
`setDisabled(disabled: boolean): void` — меняет статус блокировки компонента.  
`setHidden(hidden: boolean): void` — скрывает компонент.  
`setVisible(visible: boolean): void` — делает компонент видимым.  
`setImage(src: string, alt: string): void` — устанавливает изображение для компонента.  
`render(): HTMLElement` — возвращает корневой DOM-элемент.  

## Общие компоненты

### Класс AppState
Назначение:  класс для хранения состояния приложения. Наследуется от `Model`.

Методы:  
`updateBasket(items: CartItem[]): void` — обновляет корзину.  
`addToBasket(item: CartItem): void` — добавляет товар в корзину.  
`removeFromBasket(itemId: number): void` — удаляет товар из корзины.  
`clearBasket(): void` — очищает корзину.  
`setDeliveryForm(data: DeliveryData): void` — устанавливает данные для доставки.  
`setContactsForm(data: ContactsData): void` — устанавливает контактные данные.  
`setCatalog(products: Product[]): void` — устанавливает каталог товаров.  
`setPreview(product: Product): void` — устанавливает предпросмотр продукта.  
`isProductInBasket(productId: number): boolean` — проверяет наличие товара в корзине.  
`validateAddress(address: string): boolean` — проверяет валидность адреса доставки.  
`validateOrder(order: Order): boolean` — проверяет валидность заказа.  
`getTotalResult(): number` — возвращает общую стоимость заказа.  

## Компоненты представления

### Класс Order
Назначение: класс для управления и отображения формы ввода контактов для заказа. Наследуется от `Form`.

Методы:  
`setPhone(phone: string): void` — устанавливает номер телефона.  
`setEmail(email: string): void` — устанавливает email.  

### Класс Delivery
Назначение: класс для управления и отображения формы ввода и 
выбора данных для доставки. Наследуется от `Form`.

Методы:  
`setPaymentMethod(method: string): void` — устанавливает метод оплаты.  
`setAddress(address: string): void` — устанавливает адрес доставки.

### Класс Page
Назначение: класс для отображения страницы с товарами и корзиной. 
Наследуется от `Component`.

Методы:  
`setCounter(counter: number): void` — устанавливает значение счетчика товаров в корзине.  
`setCatalog(products: Product[]): void` — устанавливает каталог продуктов.  
`setLocked(locked: boolean): void` — блокирует прокрутку страницы в модальном окне.  

### Класс Card
Назначение: класс для отображения карточки товара. Наследуется от `Component`.

Методы:  
`setId(id: number): void` — устанавливает идентификатор карточки.  
`setTitle(title: string): void` — устанавливает название товара.  
`setImage(src: string): void` — устанавливает изображение товара.  
`setDescription(description: string): void` — устанавливает описание товара.  
`setCategory(category: string): void` — устанавливает категорию товара.  
`setButton(text: string): void` — устанавливает текст кнопки.  
`setPrice(price: number): void` — устанавливает цену товара и отключает кнопку покупки, 
если товара нет в наличии.

### Класс Basket
Назначение: класс для отображения корзины и товаров в ней. Наследуется от `Component`.

Методы:  
`setItems(items: CartItem[]): void` — устанавливает товары в корзину.  
`setTotal(total: number): void` — устанавливает общую стоимость товаров в корзине.  
`setSelected(selected: boolean): void` — блокирует или разблокирует оформление товара.  

### Класс Modal
Назначение: класс для отображения модального окна. Наследуется от `Component`.

Методы:  
`setContent(content: HTMLElement): void` — устанавливает содержимое модального окна.  
`open(): void` — открывает модальное окно.  
`close(): void` — закрывает модальное окно.  
`render(): HTMLElement` — рендерит модальное окно.  

### Класс Success
Назначение: класс для отображения модального окна успешного оформления заказа. Наследуется от `Component`.

Методы:  
`setTotal(total: number): void` — устанавливает значение общей суммы заказа.

### Класс Form
Назначение: класс для обработки результатов ввода форм и передачи информации о результатах валидации.

## Интерфейсы и типы данных

```
interface Product {
id: number;
name: string;
description: string;
price: number;
category: string;
}

interface CartItem {
product: Product;
}

interface Order {
id: number;
items: CartItem[];
total: number;
address: string;
paymentMethod: string;
contactEmail: string;
contactPhone: string;
}

type DeliveryData = {
address: string;
paymentMethod: string;
};

type ContactsData = {
email: string;
phone: string;
};
```