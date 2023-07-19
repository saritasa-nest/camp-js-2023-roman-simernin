/**
 * Provides handling of received message by subscription.
 */
export interface Subscriber<T> {

	/**
	 * Handle received message.
	 */
	update(message: T): void;
}
