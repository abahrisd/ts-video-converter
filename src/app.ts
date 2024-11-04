import {FFMPEGExecutor} from "./commands/ffmpeg/ffmpeg.executor";
import {ConsoleLogger} from "./out/console-logger/console-logger";

export class App {
    async run() {
        new FFMPEGExecutor(ConsoleLogger.get()).execute();
    }
}

const app = new App();
app.run();