import { IObserver } from "../interfaces/IObserver";

class NotificationService {
    private observers: IObserver[] = [];

    // Add observer to the list
    addObserver(observer: IObserver): void {
        this.observers.push(observer);
    }

    // Notify all observers about an event
    notify(eventType: string, data: any): void {
        this.observers.forEach(observer => observer.update(eventType, data));
    }
}

export default new NotificationService(); // Singleton instance
