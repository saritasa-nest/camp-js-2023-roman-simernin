import { Subscriber } from '../subscribers/subscriber';

/**
 * Provides subscriber management and notification for them.
 */
export interface Publisher<T> {

	/**
	 * Subscribe.
	 * @param subscriber - Subscriber.
	 */
	subscribe(observer: Subscriber<T>): void;

	/**
	 * Unsubscribe.
	 * @param subscriber - Subscriber.
	 */
	unsubscribe(observer: Subscriber<T>): void;

	/**
	 * Notify all subscribers.
	 */
	notify(): void;
}
