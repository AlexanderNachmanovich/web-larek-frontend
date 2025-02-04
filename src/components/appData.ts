import {
	ContactsFormErrors,
	FormName,
	IAnyForm,
	IAppState,
	IProduct,
	IOrder,
	OrderFormErrors,
} from '../types';
import { Model } from './base/model';
import { IEvents } from './base/events';

export class AppState extends Model<IAppState> {
	catalog: IProduct[] = [];
	basket: IProduct[] = [];
	order: IOrder = {
		address: '',
		payment: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	orderFormErrors: OrderFormErrors = {};
	contactsFormErrors: ContactsFormErrors = {};

	private savedOrderState: Partial<IOrder> = {};
	private savedOrderFormErrors: OrderFormErrors = {};
	private savedContactsFormErrors: ContactsFormErrors = {};

	constructor(data: Partial<IAppState>, protected events: IEvents) {
		super(data, events);
		this.catalog = [];
		this.basket = [];
		this.cleanOrder();
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed');
	}

	addBasket(item: IProduct) {
		this.basket.push(item);
		this.emitChanges('basket:changed');
	}

	removeBasket(item: IProduct) {
		this.basket = this.basket.filter((basketItem) => basketItem.id !== item.id);
		this.emitChanges('basket:changed');
	}

	isInBasket(item: IProduct) {
		return this.basket.some((basketItem) => {
			return basketItem.id === item.id;
		});
	}

	getNumberBasket(): number {
		return this.basket.length;
	}

	getTotalBasket(): number {
		return this.basket.reduce((a, b) => {
			return a + b.price;
		}, 0);
	}

	setField(field: keyof IAnyForm, value: string) {
		this.order[field] = value;

		if (this.validate('order')) {
			this.events.emit('order:ready', this.order);
		}

		if (this.validate('contacts')) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	validate(formType: FormName) {
		const errors =
			formType === 'order' ? this.setOrderErrors() : this.setContactsErrors();
		this.events.emit(formType + 'FormErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	setOrderErrors() {
		const errors: OrderFormErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}
		this.orderFormErrors = errors;
		return errors;
	}

	setContactsErrors() {
		const errors: ContactsFormErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex =
			/^\+?[1-9]\d{0,2}?[-\s.]?\(?\d{1,4}?\)?[-\s.]?\d{1,4}[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/;

		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		} else if (!phoneRegex.test(this.order.phone)) {
			errors.phone = 'Некорректный телефон';
		}

		if (!this.order.email) {
			errors.email = 'Укажите емейл';
		} else if (!emailRegex.test(this.order.email)) {
			errors.email = 'Некорректный емейл';
		}

		this.contactsFormErrors = errors;
		return errors;
	}

	cleanOrder() {
		this.order = {
			address: '',
			payment: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
		this.orderFormErrors = {};
		this.contactsFormErrors = {};
	}

	cleanBasketState() {
		this.basket = [];
		this.emitChanges('basket:changed');
	}

	prepareOrder() {
		this.order.total = this.getTotalBasket();
		this.basket.forEach((item) => {
			if (item.price) {
				this.order.items.push(item.id);
			}
		});
	}

	getOrderData() {
		return structuredClone(this.order);
	}

	getAddress() {
		return this.order.address;
	}

	getPayment() {
		return this.order.payment;
	}

	getEmail() {
		return this.order.email;
	}

	getPhone() {
		return this.order.phone;
	}

	// New methods for saving and restoring form state
	saveOrderState() {
		this.savedOrderState = { ...this.order };
		this.savedOrderFormErrors = { ...this.orderFormErrors };
		this.savedContactsFormErrors = { ...this.contactsFormErrors };
	}

	restoreOrderState() {
		this.order = { ...this.savedOrderState } as IOrder;
		this.orderFormErrors = { ...this.savedOrderFormErrors };
		this.contactsFormErrors = { ...this.savedContactsFormErrors };
		this.emitChanges('order:restore');
		this.emitChanges('contacts:restore');
	}
}
