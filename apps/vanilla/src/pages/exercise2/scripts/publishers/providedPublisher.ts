import { Subscriber } from '../subscribers/subscriber';

import { Publisher } from './publisher';

/** Provider function type. */
export type ProviderFunction<T> = () => T;

/** Publisher who get message for publication from provider (external function). */
export class ProvidedPublisher<T> implements Publisher<T> {

	private readonly subscribers: Subscriber<T>[] = [];

	public constructor(private readonly provider: ProviderFunction<T>) {
	}

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<T>): void {
		const isExist = this.subscribers.includes(subscriber);
		if (isExist) {
			throw new Error('Subscriber has already existed.');
		}

		this.subscribers.push(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const observerIndex = this.subscribers.indexOf(subscriber);
		if (observerIndex === -1) {
			throw new Error('Subscriber does not exist.');
		}

		this.subscribers.splice(observerIndex, 1);
	}

	/** @inheritdoc */
	public notify(): void {
		for (const subscriber of this.subscribers) {
			subscriber.update(this.provider());
		}
	}
}
