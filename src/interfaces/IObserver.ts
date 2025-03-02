export interface IObserver {
    update(eventType: string, data: any): void;
}
