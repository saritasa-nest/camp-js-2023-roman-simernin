import { Publisher } from "./publisher";
import { Subscriber } from "../subscribers/subscriber";

/* Publisher who get message for publication from provider (external function).*/
export class ProvidedPublisher<T> implements Publisher<T> {

    private provider: () => T;

    private subscribers: Subscriber<T>[] = [];

    constructor(provider: () => T) {
        this.provider = provider;
    }

    /** @inheritdoc */
    public subscribe(subscriber: Subscriber<T>): void {
        const isExist = this.subscribers.includes(subscriber);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.subscribers.push(subscriber);
    }

    /** @inheritdoc */
    public unsubscribe(subscriber: Subscriber<T>): void {
        const observerIndex = this.subscribers.indexOf(subscriber);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.subscribers.splice(observerIndex, 1);
    }

    /** @inheritdoc */
    public notify(): void {
        for (let subscriber of this.subscribers) {
            subscriber.update(this.provider());
        }
    }
}