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

### Model (Модель)

#### Классы:

1.  **ProductModel**

    -   **Описание**: Класс управляет данными товаров.
    -   **Поля**:
        -   `products` (Product[]) --- массив объектов товаров.
    -   **Методы**:
        -   `addProduct(product: Product): void` --- добавляет товар в массив товаров.
        -   `getProductById(id: number): Product | undefined` --- возвращает товар по его идентификатору.
        -   `removeProductById(id: number): void` --- удаляет товар из массива по его идентификатору.
2.  **CartModel**

    -   **Описание**: Класс описывает корзину покупателя и управляет товарами в корзине.
    -   **Поля**:
        -   `items` (CartItem[]) --- массив элементов в корзине.
    -   **Методы**:
        -   `addItem(product: Product): void` --- добавляет товар в корзину.
        -   `removeItem(productId: number): void` --- удаляет товар из корзины по его идентификатору.
        -   `getTotalPrice(): number` --- возвращает общую стоимость товаров в корзине.
3.  **OrderModel**

    -   **Описание**: Класс описывает заказы покупателей и управляет ими.
    -   **Поля**:
        -   `orders` (Order[]) --- массив заказов.
    -   **Методы**:
        -   `createOrder(order: Order): void` --- создает новый заказ.
        -   `getOrderById(id: number): Order | undefined` --- возвращает заказ по его идентификатору.
4.  **AppState**

    -   **Описание**: Класс хранит текущее состояние приложения, включая корзину, формы и каталог товаров.
    -   **Поля**:
        -   `basket` (CartItem[]) --- состояние корзины.
        -   `deliveryForm` (DeliveryData) --- данные формы доставки.
        -   `contactsForm` (ContactsData) --- контактные данные.
        -   `catalog` (Product[]) --- каталог товаров.
        -   `preview` (Product) --- предпросмотр продукта.
    -   **Методы**:
        -   `updateBasket(items: CartItem[]): void` --- обновляет состояние корзины.
        -   `addToBasket(item: CartItem): void` --- добавляет товар в корзину.
        -   `removeFromBasket(itemId: number): void` --- удаляет товар из корзины.
        -   `clearBasket(): void` --- очищает корзину.
        -   `setDeliveryForm(data: DeliveryData): void` --- устанавливает данные для доставки.
        -   `setContactsForm(data: ContactsData): void` --- устанавливает контактные данные.
        -   `setCatalog(products: Product[]): void` --- устанавливает каталог товаров.
        -   `setPreview(product: Product): void` --- устанавливает предпросмотр продукта.
        -   `isProductInBasket(productId: number): boolean` --- проверяет наличие товара в корзине.
        -   `validateAddress(address: string): boolean` --- проверяет валидность адреса доставки.
        -   `validateOrder(order: Order): boolean` --- проверяет валидность заказа.
        -   `getTotalResult(): number` --- возвращает общую стоимость заказа.

### View (Представление)

#### Классы:

1.  **ProductCardView**

    -   **Описание**: Класс отображает карточку товара.
    -   **Поля**:
        -   `product` (Product) --- объект товара.
        -   `element` (HTMLElement) --- корневой элемент карточки товара.
    -   **Методы**:
        -   `render(): void` --- рендерит карточку товара.
2.  **CartView**

    -   **Описание**: Класс отображает корзину.
    -   **Поля**:
        -   `cart` (CartModel) --- объект корзины.
        -   `element` (HTMLElement) --- корневой элемент корзины.
    -   **Методы**:
        -   `render(): void` --- рендерит корзину.
3.  **CheckoutFormView**

    -   **Описание**: Класс отображает форму оформления заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
    -   **Методы**:
        -   `render(): void` --- рендерит форму оформления заказа.
        -   `onSubmit(callback: (order: Order) => void): void` --- устанавливает обработчик события отправки формы.
4.  **OrderConfirmationView**

    -   **Описание**: Класс отображает подтверждение заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент подтверждения.
    -   **Методы**:
        -   `render(): void` --- рендерит подтверждение заказа.
5.  **Page**

    -   **Описание**: Класс отображает страницу с товарами и корзиной.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент страницы.
    -   **Методы**:
        -   `setCounter(counter: number): void` --- устанавливает значение счетчика товаров в корзине.
        -   `setCatalog(products: Product[]): void` --- устанавливает каталог продуктов.
        -   `setLocked(locked: boolean): void` --- блокирует прокрутку страницы в модальном окне.
6.  **Card**

    -   **Описание**: Класс отображает карточку товара и её данные.
    -   **Поля**:
        -   `product` (Product) --- объект товара.
        -   `element` (HTMLElement) --- корневой элемент карточки товара.
    -   **Методы**:
        -   `setId(id: number): void` --- устанавливает идентификатор карточки.
        -   `setTitle(title: string): void` --- устанавливает название товара.
        -   `setImage(src: string): void` --- устанавливает изображение товара.
        -   `setDescription(description: string): void` --- устанавливает описание товара.
        -   `setCategory(category: string): void` --- устанавливает категорию товара.
        -   `setButton(text: string): void` --- устанавливает текст кнопки.
        -   `setPrice(price: number): void` --- устанавливает цену товара.
7.  **Basket**

    -   **Описание**: Класс отображает корзину и товары в ней.
    -   **Поля**:
        -   `items` (CartItem[]) --- массив элементов в корзине.
        -   `element` (HTMLElement) --- корневой элемент корзины.
    -   **Методы**:
        -   `setItems(items: CartItem[]): void` --- устанавливает товары в корзину.
        -   `setTotal(total: number): void` --- устанавливает общую стоимость товаров в корзине.
        -   `setSelected(selected: boolean): void` --- блокирует или разблокирует оформление товара.
8.  **Modal**

    -   **Описание**: Класс отображает модальное окно.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент модального окна.
    -   **Методы**:
        -   `setContent(content: HTMLElement): void` --- устанавливает содержимое модального окна.
        -   `open(): void` --- открывает модальное окно.
        -   `close(): void` --- закрывает модальное окно.
        -   `render(): HTMLElement` --- рендерит модальное окно.
9.  **Success**

    -   **Описание**: Класс отображает успешное оформление заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент успешного оформления заказа.
    -   **Методы**:
        -   `setTotal(total: number): void` --- устанавливает значение общей суммы заказа.
10. **Form**

    -   **Описание**: Класс обрабатывает результаты ввода форм и передает информацию о результатах валидации.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
    -   **Методы**:
        -   (будут реализованы в дочерних классах)

### Presenter (Презентер)

#### Классы:

1.  **EventEmitter**

    -   **Описание**: Класс управляет событиями в приложении.
    -   **Поля**:
        -   `events` (Map<string, Function[]>) --- карта событий и их слушателей.
    -   **Методы**:
        -   `on(event: string, listener: Function): void` --- устанавливает обработчик на событие.
        -   `off(event: string, listener: Function): void` --- сбрасывает обработчик с события.
        -   `emit(event: string, ...args: any[]): void` --- уведомляет подписчиков о наступлении события.


### Пример интерфейсов
````
interface IProductCardView {
  product: Product;
  render(): void;
}

interface ICartView {
  cart: CartModel;
  render(): void;
}

interface ICheckoutFormView {
  render(): void;
  onSubmit(callback: (order: Order) => void): void;
}

interface IOrderConfirmationView {
  render(): void;
}

interface IPage {
  setCounter(counter: number): void;
  setCatalog(products: Product[]): void;
  setLocked(locked: boolean): void;
}

interface ICard {
  product: Product;
  setId(id: number): void;
  setTitle(title: string): void;
  setImage(src: string): void;
  setDescription(description: string): void;
  setCategory(category: string): void;
  setButton(text: string): void;
  setPrice(price: number): void;
}

interface IBasket {
  setItems(items: CartItem[]): void;
  setTotal(total: number): void;
  setSelected(selected: boolean): void;
}

interface IModal {
  setContent(content: HTMLElement): void;
  open(): void;
  close(): void;
  render(): HTMLElement;
}

interface ISuccess {
  setTotal(total: number): void;
}

interface IForm {
  element: HTMLElement;
}
````