import { IContactsForm, IFormValid } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/form';

export class Contacts extends Form<IContactsForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	cleanFieldValues() {
		this.email = '';
		this.phone = '';
	}

	// Override render to include state restoration
	render(state: Partial<IContactsForm> & IFormValid) {
		super.render(state);
		this.email = state.email || '';
		this.phone = state.phone || '';
		this.valid = state.valid;
		this.errors = state.errors.join('; ');
		return this.container;
	}
}
