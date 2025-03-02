import { IObserver } from "../interfaces/IObserver";

class LogObserver implements IObserver {
    update(eventType: string, data: any): void {
        console.log(`[LOG] Event: ${eventType}, Data:`, data);
    }
}

export default new LogObserver();
