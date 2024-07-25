# Проектная работа "Веб-ларек"

## Используемый стек

- **HTML**: Разметка страниц.
- **SCSS**: Стилизация компонентов.
- **TypeScript**: Логика приложения.
- **Webpack**: Инструмент для сборки модулей.

## Структура проекта:
- src/ --- исходные файлы проекта
- src/common.blocks/ --- общие блоки проекта
- src/components/ --- папка с компонентами
- src/components/base/ --- базовые компоненты и утилиты
- src/components/common/ --- общие компоненты

## Важные файлы:
- src/pages/index.html --- HTML-файл главной страницы
- src/types/index.ts --- файл с типами
- src/index.ts --- точка входа приложения
- src/scss/styles.scss --- корневой файл стилей
- src/utils/constants.ts --- файл с константами
- src/utils/utils.ts --- файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды:

npm install  
npm run start 

или

`yarn start`

Сборка
------

`npm run build`

или

Копировать код

`yarn build`

Архитектура
-----------

Используется парадигма MVP.

### Model (Модель)

#### Классы:

1.  **ProductModel**

    -   **Описание**: Класс управляет данными товаров, получаемыми с сервера.
    -   **Поля**:
        -   `products` (Product[]) --- массив объектов товаров, получаемых с сервера.
    -   **Методы**:
        -   `getProductById(id: number): Product | undefined` --- возвращает товар по его идентификатору.
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
        -   `basket` (CartModel) --- состояние корзины.
        -   `deliveryForm` (DeliveryData) --- данные формы доставки.
        -   `contactsForm` (ContactsData) --- контактные данные.
        -   `catalog` (Product[]) --- каталог товаров.
        -   `preview` (Product) --- предпросмотр продукта.
    -   **Методы**:
        -   `setDeliveryForm(data: DeliveryData): void` --- устанавливает данные для доставки.
        -   `setContactsForm(data: ContactsData): void` --- устанавливает контактные данные.
        -   `setCatalog(products: Product[]): void` --- устанавливает каталог товаров.
        -   `setPreview(product: Product): void` --- устанавливает предпросмотр продукта.

### View (Представление)

#### Абстрактные классы:

1.  **Component**

    -   **Описание**: Абстрактный класс для всех компонентов отображения.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент компонента.
    -   **Методы**:
        -   `render(data: any): void` --- рендерит компонент, используя `Object.assign` для заполнения атрибутов.
2.  **Form**

    -   **Описание**: Абстрактный класс для всех форм.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
        -   `_submit` (HTMLButtonElement) --- кнопка отправки формы.
        -   `_errors` (HTMLElement) --- элемент для отображения ошибок.
    -   **Методы**:
        -   `render(data: any): void` --- рендерит форму, используя `Object.assign`.
        -   `onSubmit(callback: (data: any) => void): void` --- устанавливает обработчик события отправки формы.

#### Классы:

1.  **ProductCard**

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
        -   `render(): void` --- рендерит карточку товара.
    -   **Наследуется от**: `Component`
2.  **Cart**

    -   **Описание**: Класс отображает корзину и товары в ней.
    -   **Поля**:
        -   `items` (CartItem[]) --- массив элементов в корзине.
        -   `element` (HTMLElement) --- корневой элемент корзины.
    -   **Методы**:
        -   `setItems(items: CartItem[]): void` --- устанавливает товары в корзину.
        -   `setTotal(total: number): void` --- устанавливает общую стоимость товаров в корзине.
        -   `setSelected(selected: boolean): void` --- блокирует или разблокирует оформление товара.
        -   `render(): void` --- рендерит корзину.
    -   **Наследуется от**: `Component`
3.  **CheckoutFormView**

    -   **Описание**: Класс отображает форму оформления заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
    -   **Методы**:
        -   `render(): void` --- рендерит форму оформления заказа.
        -   `onSubmit(callback: (order: Order) => void): void` --- устанавливает обработчик события отправки формы.
    -   **Наследуется от**: `Component`
4.  **OrderConfirmationView**

    -   **Описание**: Класс отображает подтверждение заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент подтверждения.
    -   **Методы**:
        -   `render(): void` --- рендерит подтверждение заказа.
    -   **Наследуется от**: `Component`
5.  **Page**

    -   **Описание**: Класс отображает страницу с товарами и корзиной.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент страницы.
    -   **Методы**:
        -   `setCounter(counter: number): void` --- устанавливает значение счетчика товаров в корзине.
        -   `setCatalog(products: Product[]): void` --- устанавливает каталог продуктов.
        -   `setLocked(locked: boolean): void` --- блокирует прокрутку страницы в модальном окне.
    -   **Наследуется от**: `Component`
6.  **Modal**

    -   **Описание**: Класс отображает модальное окно.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент модального окна.
    -   **Методы**:
        -   `setContent(content: HTMLElement): void` --- устанавливает содержимое модального окна.
        -   `open(): void` --- открывает модальное окно.
        -   `close(): void` --- закрывает модальное окно.
        -   `render(data: IModalData): HTMLElement` --- рендерит модальное окно и открывает его.
    -   **Наследуется от**: `Component`
7.  **Success**

    -   **Описание**: Класс отображает успешное оформление заказа.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент успешного оформления заказа.
    -   **Методы**:
        -   `setTotal(total: number): void` --- устанавливает значение общей суммы заказа.
    -   **Наследуется от**: `Component`
8.  **DeliveryForm**

    -   **Описание**: Класс отображает форму с вводом адреса доставки.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
        -   `_submit` (HTMLButtonElement) --- кнопка отправки формы.
        -   `_errors` (HTMLElement) --- элемент для отображения ошибок.
    -   **Методы**:
        -   `render(data: DeliveryData & IFormState): void` --- рендерит форму, используя `Object.assign`.
        -   `onSubmit(callback: (data: DeliveryData) => void): void` --- устанавливает обработчик события отправки формы.
    -   **Наследуется от**: `Form`
9.  **ContactsForm**

    -   **Описание**: Класс отображает форму с контактными данными.
    -   **Поля**:
        -   `element` (HTMLElement) --- корневой элемент формы.
        -   `_submit` (HTMLButtonElement) --- кнопка отправки формы.
        -   `_errors` (HTMLElement) --- элемент для отображения ошибок.
    -   **Методы**:
        -   `render(data: ContactsData & IFormState): void` --- рендерит форму, используя `Object.assign`.
        -   `onSubmit(callback: (data: ContactsData) => void): void` --- устанавливает обработчик события отправки формы.
    -   **Наследуется от**: `Form`

### Пример интерфейсов

````
interface IProductCard {
  product: Product;
  setId(id: number): void;
  setTitle(title: string): void;
  setImage(src: string): void;
  setDescription(description: string): void;
  setCategory(category: string): void;
  setButton(text: string): void;
  setPrice(price: number): void;
  render(): void;
}

interface ICart {
  setItems(items: CartItem[]): void;
  setTotal(total: number): void;
  setSelected(selected: boolean): void;
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

interface IModal {
  setContent(content: HTMLElement): void;
  open(): void;
  close(): void;
  render(data: IModalData): HTMLElement;
}

interface ISuccess {
  setTotal(total: number): void;
}

interface IForm {
  element: HTMLElement;
  render(data: any): void;
  onSubmit(callback: (data: any) => void): void;
}
````

### Common компоненты

#### EventEmitter

**Описание**: Класс управляет событиями в приложении.

-   **Поля**:
    -   `events` (Map<string, Function[]>) --- карта событий и их слушателей.
-   **Методы**:
    -   `on(event: string, listener: Function): void` --- устанавливает обработчик на событие.
    -   `off(event: string, listener: Function): void` --- сбрасывает обработчик с события.
    -   `emit(event: string, ...args: any[]): void` --- уведомляет подписчиков о наступлении события.

#### CloneTemplate

**Описание**: Функция клонирует HTML-шаблон.

-   **Параметры**:
    -   `templateId` (string) --- идентификатор шаблона.
-   **Возвращает**: HTMLElement --- клонированный элемент.

#### CreateElement

**Описание**: Функция создает HTML-элемент с указанными параметрами.

-   **Параметры**:
    -   `tagName` (string) --- имя тега.
    -   `attributes` (object) --- атрибуты элемента.
-   **Возвращает**: HTMLElement --- созданный элемент.

#### EnsureElement

**Описание**: Функция гарантирует существование элемента в документе.

-   **Параметры**:
    -   `selector` (string) --- селектор элемента.
    -   `container` (HTMLElement) --- контейнер для поиска элемента.
-   **Возвращает**: HTMLElement --- найденный элемент.

#### FormatNumber

**Описание**: Функция форматирует число в строку с разделителями.

-   **Параметры**:
    -   `number` (number) --- число для форматирования.
-   **Возвращает**: string --- отформатированное число.

### Пример использования компонентов

Пример использования `EventEmitter`, `CloneTemplate`, `CreateElement`, `EnsureElement`, `FormatNumber` можно найти в следующих файлах:

-   **basket.ts**
-   **form.ts**
-   **modal.ts**
-   **success.ts**