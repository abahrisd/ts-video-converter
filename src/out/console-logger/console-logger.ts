import {IStreamLogger} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static instance: ConsoleLogger;

    private constructor() {
        if (this instanceof ConsoleLogger) {
            return this;
        }
    }

    public static get (): ConsoleLogger {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }

        return ConsoleLogger.instance;
    }

    log(...args: any[]): void {
        console.log(...args);
    };

    error(...args: any[]): void {
        console.log(...args);
    };

    end(): void {
        console.log('End!',)
    };
}